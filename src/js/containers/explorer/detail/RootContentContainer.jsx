/**
 * RootContentContainer.jsx
 * Created by Kevin Li 8/16/17
 */

import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { isCancel } from 'axios';

import * as explorerActions from 'redux/actions/explorer/explorerActions';
import * as ExplorerHelper from 'helpers/explorerHelper';

import RootContent from 'components/explorer/detail/RootContent';

const propTypes = {
    explorer: PropTypes.object,
    setExplorerActive: PropTypes.func,
    overwriteExplorerTrail: PropTypes.func
};

export class RootContentContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            total: 0,
            data: [],
            inFlight: true
        };

        this.request = null;
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

    render() {
        if (this.state.inFlight) {
            return null;
        }

        return (
            <RootContent
                root={this.props.explorer.root}
                fy={this.props.explorer.fy}
                total={this.state.total}
                data={this.state.data} />
        );
    }
}

RootContentContainer.propTypes = propTypes;

export default connect(
    (state) => ({ explorer: state.explorer }),
    (dispatch) => bindActionCreators(explorerActions, dispatch)
)(RootContentContainer);
