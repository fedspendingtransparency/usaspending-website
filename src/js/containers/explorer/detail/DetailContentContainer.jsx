/**
 * DetailContentContainer.jsx
 * Created by Kevin Li 8/16/17
 */

import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { isCancel } from 'axios';
import { List } from 'immutable';

import Router from 'containers/router/Router';

import { dropdownScopes } from 'dataMapping/explorer/dropdownScopes';

import * as explorerActions from 'redux/actions/explorer/explorerActions';
import * as ExplorerHelper from 'helpers/explorerHelper';

import DetailContent from 'components/explorer/detail/DetailContent';
import ExplorerSidebar from 'components/explorer/detail/sidebar/ExplorerSidebar';

const propTypes = {
    explorer: PropTypes.object,
    setExplorerActive: PropTypes.func,
    setExplorerYear: PropTypes.func,
    overwriteExplorerFilters: PropTypes.func,
    overwriteExplorerTrail: PropTypes.func,
    addExplorerFilter: PropTypes.func,
    addExplorerTrail: PropTypes.func
};

export class DetailContentContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: new List(),
            transitionSteps: 0,
            inFlight: true
        };

        this.request = null;

        this.goDeeper = this.goDeeper.bind(this);
        this.jumpToLevel = this.jumpToLevel.bind(this);
        this.rewindToFilter = this.rewindToFilter.bind(this);
    }

    componentWillMount() {
        this.prepareRootRequest(this.props.explorer.root, this.props.explorer.fy);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.explorer.root !== this.props.explorer.root) {
            // root changed, reload everything
            this.prepareRootRequest(nextProps.explorer.root, nextProps.explorer.fy);
        }
        else if (nextProps.explorer.fy !== this.props.explorer.fy) {
            // fy changed, also reload everything (and rewind to the root)
            this.prepareRootRequest(nextProps.explorer.root, nextProps.explorer.fy);
        }
    }

    prepareRootRequest(rootType, fy) {
        // we need to make a root request
        // at the root level, ignore all filters except for the root
        // in fact, just to be safe, let's overwrite the filter props
        const resetFilters = {
            fy
        };

        this.props.overwriteExplorerFilters(resetFilters);

        // make the request
        this.loadData(rootType, true);
    }

    loadData(type, isRoot = false) {
        this.setState({
            inFlight: true
        });

        if (this.request) {
            this.request.cancel();
        }

        // perform the API request
        this.request = ExplorerHelper.fetchBreakdown({
            type,
            filters: this.props.explorer.filters.toJS()
        });

        this.request.promise
            .then((res) => {
                if (isRoot) {
                    this.parseRootData(res.data);
                }
                else {
                    this.parseData(res.data, type);
                }
                this.request = null;
            })
            .catch((err) => {
                if (!isCancel(err)) {
                    console.log(err);
                    this.request = null;
                }
            });
    }

    parseRootData(data) {
        const total = data.total;

        // build the active screen root object
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

        // save the data as an Immutable object for easy change comparison within the treemap
        this.setState({
            data: new List(data.results),
            inFlight: false
        });
    }

    parseData(data, type) {
        const total = data.total;

        // build the active screen root object
        const activeScreen = {
            total,
            type
        };

        this.props.setExplorerActive(activeScreen);

        // save the data as an Immutable object for easy change comparison within the treemap
        this.setState({
            data: new List(data.results),
            inFlight: false
        });
    }

    goDeeper(id, data) {
        if (this.state.inFlight) {
            // API call is in progress, don't allow clicks
            return;
        }

        // add the filter
        // to do this, determine the first filter type and the path we are following
        const path = dropdownScopes[this.props.explorer.root];
        let currentType = this.props.explorer.active.type;
        if (currentType === 'root') {
            currentType = this.props.explorer.root;
        }
        else if (currentType === 'award') {
            // we are at the bottom of the path, go to the award page
            Router.history.push(`/award/${id}`);
            return;
        }
        const pathDepth = path.indexOf(currentType);
        // TODO: Kevin Li - check if we're at the end
        // get the next data type
        const nextType = path[pathDepth + 1];

        this.props.addExplorerFilter({
            type: currentType,
            value: id
        });

        // generate a trail object representing the current filter that is being applied
        const trailItem = {
            type: currentType,
            title: data.name,
            total: data.amount
        };

        this.setState({
            transitionSteps: -3
        }, () => {
            this.props.addExplorerTrail(trailItem);
            this.loadData(nextType, false);
        });
    }

    jumpToLevel(level) {
        // if we're skipping levels, then we are not adding filters, we're simply revisualizating
        // the data that is already filtered
        // this means we don't need to modify the trail or the redux filter set
        // this also means we shouldn't show an animation
        this.setState({
            transitionSteps: 0
        }, () => {
            this.loadData(level, false);
        });
    }

    rewindToFilter(index) {
        const trail = this.props.explorer.trail.toJS();
        const oldFilters = this.props.explorer.filters;
        // don't do anything if this is the current filter (ie, the last one in the trail)
        if (index === trail.length - 1) {
            return;
        }

        // determine how many steps we need to rewind
        const steps = index - (trail.length - 1);

        // iterate through the trail to rebuild the filter set
        const newFilters = {
            fy: this.props.explorer.fy
        };
        const newTrail = [];

        for (let i = 0; i <= index; i++) {
            const filterType = trail[i].type;
            if (filterType !== 'root') {
                // root filters are not real filters
                // get the filter type and fetch its ID from the current filter set
                const filterValue = oldFilters.get(filterType);
                newFilters[filterType] = filterValue;
            }

            // do not include the last filter in the trail
            if (i < index) {
                // this is because the last trail is always one item ahead of the number of filters
                newTrail.push(trail[i]);
            }
        }

        // overwrite the redux filters with the new filters
        this.props.overwriteExplorerFilters(newFilters);
        // overwrite the redux trail with the spliced trail at the index
        this.props.overwriteExplorerTrail(newTrail);

        // determine if we are jumping back to the root
        const isRoot = index === 0;

        // determine the data type that was being displayed at the index point of the original trail
        let dataType = trail[index].type;
        if (isRoot) {
            // in the event that this is a root object, use the explorer root value
            dataType = this.props.explorer.root;
        }

        this.setState({
            transitionSteps: steps
        }, () => {
            this.loadData(dataType, isRoot);
        });
    }

    render() {
        return (
            <div className="explorer-detail">
                <ExplorerSidebar
                    fy={this.props.explorer.fy}
                    trail={this.props.explorer.trail}
                    setExplorerYear={this.props.setExplorerYear}
                    rewindToFilter={this.rewindToFilter} />
                <DetailContent
                    isRoot={this.props.explorer.active.type === 'root'}
                    isLoading={this.state.inFlight}
                    root={this.props.explorer.root}
                    fy={this.props.explorer.fy}
                    active={this.props.explorer.active}
                    trail={this.props.explorer.trail.toJS()}
                    total={this.props.explorer.active.total}
                    data={this.state.data}
                    transitionSteps={this.state.transitionSteps}
                    goDeeper={this.goDeeper}
                    jumpToLevel={this.jumpToLevel} />
            </div>
        );
    }
}

DetailContentContainer.propTypes = propTypes;

export default connect(
    (state) => ({ explorer: state.explorer }),
    (dispatch) => bindActionCreators(explorerActions, dispatch)
)(DetailContentContainer);
