/**
 * DetailContentContainer.jsx
 * Created by Kevin Li 8/16/17
 */

import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { isCancel } from 'axios';

import { dropdownScopes } from 'dataMapping/explorer/dropdownScopes';

import * as explorerActions from 'redux/actions/explorer/explorerActions';
import * as ExplorerHelper from 'helpers/explorerHelper';

import DetailContent from 'components/explorer/detail/DetailContent';

const propTypes = {
    explorer: PropTypes.object,
    setExplorerActive: PropTypes.func,
    overwriteExplorerTrail: PropTypes.func,
    addExplorerFilter: PropTypes.func,
    addExplorerTrail: PropTypes.func
};

export class DetailContentContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            total: 0,
            data: [],
            nextChild: {
                id: 0,
                title: '',
                total: 0
            },
            inFlight: true
        };

        this.request = null;

        this.goDeeper = this.goDeeper.bind(this);
    }

    componentWillMount() {
        this.loadData(this.props);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.explorer.root !== this.props.explorer.root) {
            // root changed, reload everything
            this.loadData(nextProps);
        }
        else if (nextProps.explorer.fy !== this.props.explorer.fy) {
            // fy changed, also reload everything
            this.loadData(nextProps);
        }
    }

    loadData(props) {
        this.setState({
            inFlight: true
        });
        // at the root level, ignore all filters except for the root
        // in fact, just to be safe, let's overwrite the filter props
        const resetFilters = {
            fy: props.explorer.fy
        };

        // update the redux filters
        props.overwriteExplorerFilters(resetFilters);

        if (this.request) {
            this.request.cancel();
        }

        // perform the API request
        this.request = ExplorerHelper.fetchBreakdown({
            type: props.explorer.root,
            filters: resetFilters
        });

        this.request.promise
            .then((res) => {
                this.parseData(res.data);
                this.request = null;
            })
            .catch((err) => {
                if (!isCancel(err)) {
                    console.log(err);
                    this.request = null;
                }
            });
    }

    parseData(data) {
        const total = data.total;

        // build the active screen object
        const activeScreen = {
            total,
            type: 'root',
            subtype: this.props.explorer.root
        };
        // update the trail to consist of only this screen (since we are at the root, there cannot
        //  be anything else in the trail)
        const trail = [
            activeScreen
        ];

        this.props.setExplorerActive(activeScreen);
        this.props.overwriteExplorerTrail(trail);

        this.setState({
            total,
            data: data.results,
            inFlight: false
        });
    }

    loadChildData() {
        this.setState({
            inFlight: true
        });

        if (this.request) {
            this.request.cancel();
        }

        // perform the API request
        const nextLevel = dropdownScopes[this.props.explorer.root][1];
        this.request = ExplorerHelper.fetchBreakdown({
            type: nextLevel,
            filters: this.props.explorer.filters.toJS()
        });

        this.request.promise
            .then((res) => {
                this.prepareChild(res.data);
                this.request = null;
            })
            .catch((err) => {
                if (!isCancel(err)) {
                    console.log(err);
                    this.request = null;
                }
            });
    }

    prepareChild(data) {
        const total = data.total;

        // build the active screen object
        const activeScreen = {
            total,
            type: this.props.explorer.root,
            title: this.state.nextChild.title
        };

        this.props.setExplorerActive(activeScreen);

        this.setState({
            total,
            data: data.results,
            inFlight: false
        });
    }

    goDeeper(id, data) {
        if (this.state.inFlight) {
            // API call is in progress, don't allow clicks
            return;
        }

        // add the filter
        let nextLevel = this.props.explorer.active.type;
        if (nextLevel === 'root') {
            nextLevel = this.props.explorer.root;
        }

        this.props.addExplorerFilter({
            type: nextLevel,
            value: id
        });

        this.setState({
            nextChild: {
                type: this.props.explorer.root,
                title: data.name,
                total: data.amount
            }
        }, () => {
            // prep the breadcrumb while the API is in flight
            this.props.addExplorerTrail(this.state.nextChild);
            this.loadChildData();
        });
    }

    render() {
        if (this.state.inFlight && this.state.data.length < 1) {
            return null;
        }

        return (
            <DetailContent
                isRoot={this.props.explorer.active.type === 'root'}
                root={this.props.explorer.root}
                fy={this.props.explorer.fy}
                active={this.props.explorer.active}
                total={this.state.total}
                data={this.state.data}
                goDeeper={this.goDeeper} />
        );
    }
}

DetailContentContainer.propTypes = propTypes;

export default connect(
    (state) => ({ explorer: state.explorer }),
    (dispatch) => bindActionCreators(explorerActions, dispatch)
)(DetailContentContainer);
