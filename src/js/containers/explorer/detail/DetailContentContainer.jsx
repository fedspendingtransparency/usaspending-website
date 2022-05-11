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
import { withRouter } from 'react-router-dom';

import Analytics from 'helpers/analytics/Analytics';

import { dropdownScopes } from 'dataMapping/explorer/dropdownScopes';

import * as explorerActions from 'redux/actions/explorer/explorerActions';
import * as ExplorerHelper from 'helpers/explorerHelper';

import DetailContent from 'components/explorer/detail/DetailContent';
import ExplorerSidebar from 'components/explorer/detail/sidebar/ExplorerSidebar';
import withAgencySlugs from "containers/agency/WithAgencySlugs";

const propTypes = {
    explorer: PropTypes.object,
    setExplorerActive: PropTypes.func,
    setExplorerPeriod: PropTypes.func,
    overwriteExplorerTrail: PropTypes.func,
    addExplorerTrail: PropTypes.func,
    showTooltip: PropTypes.func,
    hideTooltip: PropTypes.func,
    resetExplorerTable: PropTypes.func,
    history: PropTypes.object,
    agencySlugs: PropTypes.object,
    loading: PropTypes.bool,
    error: PropTypes.bool
};

export class DetailContentContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: new List(),
            lastUpdate: '',
            filters: {},
            transitionSteps: 0,
            inFlight: true,
            isTruncated: false,
            transition: ''
        };

        this.request = null;

        this.goDeeper = this.goDeeper.bind(this);
        this.goToUnreported = this.goToUnreported.bind(this);
        this.changeSubdivisionType = this.changeSubdivisionType.bind(this);
        this.rewindToFilter = this.rewindToFilter.bind(this);
    }

    componentDidMount() {
        if (this.props.explorer.fy && (this.props.explorer.period || this.props.explorer.quarter)) {
            this.prepareRootRequest(
                this.props.explorer.root,
                this.props.explorer.fy,
                this.props.explorer.quarter,
                this.props.explorer.period
            );
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.explorer.root !== this.props.explorer.root ||
            prevProps.explorer.fy !== this.props.explorer.fy ||
            prevProps.explorer.quarter !== this.props.explorer.quarter ||
            prevProps.explorer.period !== this.props.explorer.period) {
            // root changed, reload everything
            this.prepareRootRequest(
                this.props.explorer.root,
                this.props.explorer.fy,
                this.props.explorer.quarter,
                this.props.explorer.period
            );
        }
    }

    prepareRootRequest(rootType, fy, quarter, period) {
    // we need to make a root request
    // at the root level, ignore all filters except for the root
    // in fact, just to be safe, let's overwrite the filter props
        const resetFilters = {
            fy,
            quarter,
            period
        };

        // make the request
        const request = {
            within: 'root',
            subdivision: rootType
        };

        this.setState({
            filters: resetFilters
        }, () => {
            this.loadData(request, true);
        });

        // log the analytics event for a Spending Explorer starting point
        Analytics.event({
            category: 'Spending Explorer - Starting Point',
            action: rootType
        });
    }

    loadData(request, isRoot = false, isRewind = false) {
        this.setState({
            inFlight: true
        });

        if (this.request) {
            this.request.cancel();
        }

        if (!this.props.explorer.fy || (!this.props.explorer.period && !this.props.explorer.quarter)) {
            return Promise.resolve();
        }

        // perform the API request
        const requestFilters = Object.assign({}, this.state.filters);
        if (requestFilters.quarter == null) {
            delete requestFilters.quarter;
        }
        if (requestFilters.period == null) {
            delete requestFilters.period;
        }
        this.request = ExplorerHelper.fetchBreakdown({
            type: request.subdivision,
            filters: requestFilters
        });

        return this.request.promise
            .then((res) => {
                if (isRoot) {
                    this.parseRootData(res.data);
                }
                else {
                    this.parseData(res.data, request, isRewind);
                }
                this.request = null;
            })
            .catch((err) => {
                if (!isCancel(err)) {
                    console.error(err);
                    this.request = null;
                }
            });
    }

    parseRootData(data) {
        const total = data.total;

        // build the active screen root object
        const activeScreen = {
            total,
            within: 'root',
            subdivision: this.props.explorer.root
        };
        // update the trail to consist of only this screen (since we are at the root, there cannot
        //  be anything else in the trail)
        const trail = [
            {
                total,
                within: 'root',
                subdivision: this.props.explorer.root,
                title: '',
                id: ''
            }
        ];

        this.props.overwriteExplorerTrail(trail);

        this.props.resetExplorerTable();

        if (this.state.transitionSteps !== 0) {
            // there is going to be a transition, so trigger the exit animation
            // then, 250ms later (after the exit animation completes), apply the props and state
            // so the entry animation occurs with the new data
            this.setState({
                transition: 'start'
            }, () => {
                window.setTimeout(() => {
                    this.props.setExplorerActive(activeScreen);

                    // save the data as an Immutable object for easy change comparison within
                    // the treemap
                    this.setState({
                        data: new List(data.results),
                        lastUpdate: data.end_date,
                        inFlight: false,
                        isTruncated: false, // root will never be truncated
                        transition: 'end'
                    });
                }, 250);
            });
        }
        else {
            // there are no transition steps, so apply changes immediate
            this.props.setExplorerActive(activeScreen);

            // save the data as an Immutable object for easy change comparison within
            // the treemap
            this.setState({
                data: new List(data.results),
                lastUpdate: data.end_date,
                inFlight: false,
                isTruncated: false, // root will never be truncated
                transition: ''
            });
        }
    }

    parseData(data, request, isRewind) {
        const total = data.total;

        let isTruncated = false;
        let parsedResults = ExplorerHelper.truncateDataForTreemap(data.results);

        if (request.subdivision === 'award') {
            // link to award page using new human readable id
            parsedResults = parsedResults.map((obj) => ({ ...obj, id: encodeURIComponent(obj.generated_unique_award_id) }));
        }

        if (request.subdivision === 'award' || request.subdivision === 'recipient') {
            isTruncated = data.results.length > 500;
        }

        if (isTruncated) {
            parsedResults = ExplorerHelper.appendCellForDataOutsideTree(parsedResults, total, request.subdivision)
                .sort((a, b) => b.amount - a.amount);
        }
        // build the trail item of the last applied filter using the request object
        const trailItem = Object.assign({}, request, {
            total
        });

        // add it to the sidebar trail, but only if the "within" value has changed
        // otherwise, we're simply cutting the data up in a different way (ie, only the subdivision
        // unit has changed), so we shouldn't add anything to the trail.
        // Also, if the data load was part of a rewind operation (going back up the path via
        // the sidebar), the sidebar is already rendered with the correct items, so don't add
        // anything
        if (request.within !== this.props.explorer.active.within && !isRewind) {
            this.props.addExplorerTrail(trailItem);
        }

        // update the active screen within and subdivision values using the request object
        const activeScreen = {
            total,
            within: request.within,
            subdivision: request.subdivision,
            accountNumber: request.accountNumber || ''
        };

        if (this.state.transitionSteps !== 0) {
            // there is going to be a transition, so trigger the exit animation
            // then, 250ms later (after the exit animation completes), apply the props and state
            // so the entry animation occurs with the new data
            this.setState({
                transition: 'start'
            }, () => {
                window.setTimeout(() => {
                    this.props.setExplorerActive(activeScreen);

                    // save the data as an Immutable object for easy change comparison within
                    // the treemap
                    this.setState({
                        isTruncated,
                        data: new List(parsedResults),
                        lastUpdate: data.end_date,
                        inFlight: false,
                        transition: 'end'
                    });
                }, 250);
            });
        }
        else {
            // no animation required if there are 0 transition steps
            this.props.setExplorerActive(activeScreen);

            // save the data as an Immutable object for easy change comparison within the treemap
            this.setState({
                isTruncated,
                data: new List(parsedResults),
                lastUpdate: data.end_date,
                inFlight: false,
                transition: ''
            });
        }

        Analytics.event({
            category: 'Spending Explorer - Data Type',
            action: request.subdivision
        });
    }

    goDeeper(id, data) {
        if (this.state.inFlight) {
            // API call is in progress, don't allow clicks
            return;
        }

        // determine how we are currently subdividing the data
        // determine the data element we should filter by
        // this is equal to how we are currently subdividing the spending
        const filterBy = this.props.explorer.active.subdivision;
        if (filterBy === 'award') {
            // we are at the bottom of the path, go to the award page
            // TODO: fix for BrowserRouter
            this.props.history.push(`/award/${id}`);

            Analytics.event({
                category: 'Spending Explorer - Exit',
                action: `/award/${id}`
            });
            return;
        }

        const newFilter = {
            [filterBy]: id
        };

        // generate a trail object representing the current filter that is being applied
        // the new "within" value is the old subdivision unit
        // given this, determine how far down the path we are
        const path = dropdownScopes[this.props.explorer.root];
        const currentDepth = path.indexOf(this.props.explorer.active.subdivision);

        // By default, the next subdivision unit is the next step down the path
        let nextSubdivision = path[currentDepth + 1];

        // Add Program Activity as an option if a Federal Account has been picked
        const accountDepth = path.indexOf('federal_account');
        const programActivityIndex = path.indexOf('program_activity');

        if (currentDepth >= accountDepth) {
            // A federal account has been picked, add program activity to the
            // scope if it's not already there
            if (programActivityIndex === -1) {
                let index = 3;
                if (this.props.explorer.root === 'agency') {
                    index = 2;
                }
                // Insert program activity
                path.splice(index, 0, 'program_activity');
                if (currentDepth === (index - 1)) {
                    // We've just inserted a new element at the federal account level,
                    // so the next subdivision should be program activity
                    nextSubdivision = path[index];
                }
            }
        }

        // create the request object
        // this is also used as the basis for the sidebar trail, so cache the title if available
        // for the next request, the current subdivision will be the "within" (data field that
        // the total amount represents)
        // the next item in the path will be the new subdivision unit
        const request = {
            within: this.props.explorer.active.subdivision,
            subdivision: nextSubdivision,
            title: data.name,
            id: data.id,
            accountNumber: data.account_number || '',
            link: data.link
        };

        this.props.resetExplorerTable();

        this.setState({
            transitionSteps: 1,
            filters: Object.assign({}, this.state.filters, newFilter)
        }, () => {
            this.loadData(request, false);
        });

        Analytics.event({
            category: 'Spending Explorer - Drilldown',
            action: filterBy,
            label: `${data.name} - ${data.id}`
        });
    }

    changeSubdivisionType(type) {
    // if we're skipping levels, then we are not adding filters, we're simply revisualizating
    // the data that is already filtered.
    // This means we don't need to modify the trail or the redux filter set.
    // This also means we shouldn't show an animation.
    // To do this, clone the current active screen object and change only the subdivision to
    // the selected type. We'll pass this on as the request object to loadData.
    // loadData has internal logic that will just change the redux Active Screen and not add
    // anything to the sidebar trail
        const request = Object.assign({}, this.props.explorer.active.toJS(), {
            subdivision: type
        });

        this.props.resetExplorerTable();

        this.setState({
            transitionSteps: 0
        }, () => {
            this.loadData(request, false);
        });
    }

    rewindToFilter(index) {
        const trail = this.props.explorer.trail.toJS();
        const oldFilters = this.state.filters;
        // don't do anything if this is the current filter (ie, the last one in the trail)
        if (index === trail.length - 1) {
            return;
        }

        // determine how many steps we need to rewind
        const steps = index - (trail.length - 1);


        if (index === 0) {
            // we are going all the way back to the start
            this.setState({
                transitionSteps: steps
            }, () => {
                this.prepareRootRequest(this.props.explorer.root, this.props.explorer.fy, this.props.explorer.quarter, this.props.explorer.period);
            });
            return;
        }

        // iterate through the trail to rebuild the filter set
        const newFilters = {
            fy: this.props.explorer.fy,
            quarter: this.props.explorer.quarter,
            period: this.props.explorer.period
        };
        const newTrail = [];
        // iterate through the trail and include only those filters up to the point we are rewinding
        // to
        for (let i = 0; i <= index; i++) {
            const filterType = trail[i].within;
            if (filterType !== 'root') {
                // root filters are not real filters, so ignore them
                // get the filter type and fetch its ID from the current filter set
                const filterValue = oldFilters[filterType];
                newFilters[filterType] = filterValue;
            }
            // add the old item back into the new trail
            newTrail.push(trail[i]);
        }

        // determine if we are jumping back to the root
        const isRoot = index === 0;

        // the request object will essentially match the trail item from the selected index
        const selectedTrailItem = trail[index];

        this.props.overwriteExplorerTrail(newTrail);

        this.props.resetExplorerTable();

        this.setState({
            transitionSteps: steps,
            filters: newFilters
        }, () => {
            this.loadData(selectedTrailItem, isRoot, true);
        });
    }

    goToUnreported(data) {
        const dataArr = [data];

        // generate a trail object representing the current filter that is being applied
        // the new "within" value is the old subdivision unit
        // given this, determine how far down the path we are
        const path = dropdownScopes[this.props.explorer.root];
        const currentDepth = path.indexOf(this.props.explorer.active.subdivision);

        const currentSubdivision = path[currentDepth];

        const trailDisplay = {
            within: this.props.explorer.active.subdivision,
            title: data.name,
            subdivision: currentSubdivision
        };

        let total;
        if (!data.obligated_amount) {
            total = data.amount;
        }
        else {
            total = data.obligated_amount;
        }

        const trailItem = Object.assign({}, trailDisplay, {
            total
        });

        this.props.addExplorerTrail(trailItem);

        // update the active screen within and subdivision values using the request object
        const activeScreen = {
            total
        };


        this.setState({
            transitionSteps: 1
        });

        // there is going to be a transition, so trigger the exit animation
        // then, 250ms later (after the exit animation completes), apply the props and state
        // so the entry animation occurs with the new data
        this.setState({
            transition: 'start'
        }, () => {
            window.setTimeout(() => {
                this.props.setExplorerActive(activeScreen);

                // save the data as an Immutable object for easy change comparison within
                // the treemap
                this.setState({
                    data: new List(dataArr),
                    lastUpdate: this.state.lastUpdate,
                    inFlight: false,
                    transition: 'end'
                });
            }, 250);
        });

        this.props.resetExplorerTable();
    }

    render() {
        return (
            <div className="explorer-detail">
                <ExplorerSidebar
                    fy={this.props.explorer.fy}
                    quarter={this.props.explorer.quarter}
                    period={this.props.explorer.period}
                    trail={this.props.explorer.trail}
                    setExplorerPeriod={this.props.setExplorerPeriod}
                    rewindToFilter={this.rewindToFilter} />
                <DetailContent
                    isRoot={this.props.explorer.active.within === 'root'}
                    isLoading={this.state.inFlight || this.props.error}
                    isTruncated={this.state.isTruncated}
                    root={this.props.explorer.root}
                    fy={this.props.explorer.fy}
                    active={this.props.explorer.active}
                    trail={this.props.explorer.trail.toJS()}
                    total={this.props.explorer.active.total}
                    data={this.state.data}
                    lastUpdate={this.state.lastUpdate}
                    transitionSteps={this.state.transitionSteps}
                    transition={this.state.transition}
                    goDeeper={this.goDeeper}
                    changeSubdivisionType={this.changeSubdivisionType}
                    showTooltip={this.props.showTooltip}
                    hideTooltip={this.props.hideTooltip}
                    rewindToFilter={this.rewindToFilter}
                    goToUnreported={this.goToUnreported} />
            </div>
        );
    }
}

DetailContentContainer.propTypes = propTypes;
const DetailContentContainerWithRouter = withRouter(withAgencySlugs(DetailContentContainer));

export default connect(
    (state) => ({ explorer: state.explorer }),
    (dispatch) => bindActionCreators(explorerActions, dispatch)
)(DetailContentContainerWithRouter);
