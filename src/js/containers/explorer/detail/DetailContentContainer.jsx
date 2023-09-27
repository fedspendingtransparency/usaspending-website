/**
 * DetailContentContainer.jsx
 * Created by Kevin Li 8/16/17
 */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { isCancel } from 'axios';
import { List } from 'immutable';

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

const DetailContentContainer = (props) => {
    const [data, setData] = useState(new List());
    const [lastUpdate, setLastUpdate] = useState('');
    const [filters, setFilters] = useState({});
    const [transitionSteps, setTransitionSteps] = useState(0);
    const [inFlight, setInFlight] = useState(true);
    const [isTruncated, setIsTruncated] = useState(false);
    const [transition, setTransition] = useState('');
    let request = null;
    const parseRootDataTimeout = useEffect((dataInput, activeScreen) => window.setTimeout(() => {
        if (transition === 'start') {
            console.debug("1");
            props.setExplorerActive(activeScreen);

            // save the data as an Immutable object for easy change comparison within
            // the treemap
            setData(new List(dataInput.results));
            setLastUpdate(dataInput.end_date);
            setInFlight(false);
            setIsTruncated(false);
            setTransition('end');
        }
    }, 250), [transition]);
    const parseRootData = (dataInput) => {
        console.debug("2");
        const total = dataInput.total;

        // build the active screen root object
        const activeScreen = {
            total,
            within: 'root',
            subdivision: props.explorer.root
        };
        // update the trail to consist of only this screen (since we are at the root, there cannot
        //  be anything else in the trail)
        const trail = [
            {
                total,
                within: 'root',
                subdivision: props.explorer.root,
                title: '',
                id: ''
            }
        ];

        props.overwriteExplorerTrail(trail);

        props.resetExplorerTable();

        if (transitionSteps !== 0) {
            // there is going to be a transition, so trigger the exit animation
            // then, 250ms later (after the exit animation completes), apply the props and state
            // so the entry animation occurs with the new data
            setTransition('start');
            parseRootDataTimeout(activeScreen, dataInput);
        }
        else {
            // there are no transition steps, so apply changes immediate
            props.setExplorerActive(activeScreen);

            // save the data as an Immutable object for easy change comparison within
            // the treemap
            setData(new List(dataInput?.results));
            setLastUpdate(dataInput.end_date);
            setInFlight(false);
            setIsTruncated(false);
            setTransition('');
        }
    };
    const parseDataTimeout = useEffect((activeScreen, isTruncatedTemp, parsedResults, dataInput) => window.setTimeout(() => {
        if (transition === 'start') {
            console.debug("3");
            props.setExplorerActive(activeScreen);

            // save the data as an Immutable object for easy change comparison within
            // the treemap
            setIsTruncated(isTruncatedTemp);
            setData(new List(parsedResults));
            setLastUpdate(dataInput?.end_date);
            setInFlight(false);
            setTransition('end');
        }
    }, 250), [transition]);
    const parseData = (dataInput, requestInput, isRewindInput) => {
        console.debug("4");
        const total = dataInput.total;

        let isTruncatedTemp = false;
        let parsedResults = ExplorerHelper.truncateDataForTreemap(dataInput?.results);

        if (requestInput.subdivision === 'award') {
            // link to award page using new human readable id
            parsedResults = parsedResults.map((obj) => ({ ...obj, id: encodeURIComponent(obj.generated_unique_award_id) }));
        }

        if (requestInput.subdivision === 'award' || requestInput.subdivision === 'recipient') {
            isTruncatedTemp = dataInput?.results.length > 500;
        }

        if (isTruncatedTemp) {
            parsedResults = ExplorerHelper.appendCellForDataOutsideTree(parsedResults, total, request.subdivision)
                .sort((a, b) => b.amount - a.amount);
        }
        // build the trail item of the last applied filter using the request object
        const trailItem = Object.assign({}, requestInput, {
            total
        });

        // add it to the sidebar trail, but only if the "within" value has changed
        // otherwise, we're simply cutting the data up in a different way (ie, only the subdivision
        // unit has changed), so we shouldn't add anything to the trail.
        // Also, if the data load was part of a rewind operation (going back up the path via
        // the sidebar), the sidebar is already rendered with the correct items, so don't add
        // anything
        if (requestInput.within !== props.explorer.active.within && !isRewindInput) {
            props.addExplorerTrail(trailItem);
        }

        // update the active screen within and subdivision values using the request object
        const activeScreen = {
            total,
            within: requestInput.within,
            subdivision: requestInput.subdivision,
            accountNumber: requestInput.accountNumber || ''
        };

        if (transitionSteps !== 0) {
            // there is going to be a transition, so trigger the exit animation
            // then, 250ms later (after the exit animation completes), apply the props and state
            // so the entry animation occurs with the new data
            setTransition('start');
            parseDataTimeout(activeScreen, isTruncatedTemp, parsedResults, dataInput);
        }
        else {
            // no animation required if there are 0 transition steps
            props.setExplorerActive(activeScreen);

            // save the data as an Immutable object for easy change comparison within the treemap
            setIsTruncated(isTruncatedTemp);
            setData(new List(parsedResults));
            setLastUpdate(dataInput.end_date);
            setInFlight(false);
            setTransition('');
        }

        Analytics.event({
            category: 'Spending Explorer - Data Type',
            action: requestInput.subdivision
        });
    };

    const loadData = (requestInput, isRootInput = false, isRewindInput = false) => {
        setInFlight(true);
        console.debug("5");
        if (request) {
            request.cancel();
        }

        if (!props.explorer.fy || (!props.explorer.period && !props.explorer.quarter)) {
            return Promise.resolve();
        }

        // perform the API request
        const requestFilters = Object.assign({}, filters);
        console.debug("REQUEST: ", requestFilters, filters);
        if (requestFilters.quarter == null) {
            delete requestFilters.quarter;
        }
        if (requestFilters.period == null) {
            delete requestFilters.period;
        }
        request = ExplorerHelper.fetchBreakdown({
            type: requestInput.subdivision,
            filters: requestFilters
        });

        return request.promise
            .then((res) => {
                if (isRootInput) {
                    parseRootData(res.data);
                }
                else {
                    parseData(res.data, requestInput, isRewindInput);
                }
                request = null;
            })
            .catch((err) => {
                if (!isCancel(err)) {
                    console.error(err);
                    request = null;
                }
            });
    };
    const loadFilters = ((requestTemp, boolValue) => {
        console.debug("6");
        loadData(requestTemp, boolValue);
    });
    const prepareRootRequest = (rootType, fy, quarter, period) => {
        // we need to make a root request
        // at the root level, ignore all filters except for the root
        // in fact, just to be safe, let's overwrite the filter props
        const resetFilters = {
            fy,
            quarter,
            period
        };

        // make the request
        const requestTemp = {
            within: 'root',
            subdivision: rootType
        };
        console.debug("7");
        console.debug("reset filters: ", resetFilters);
        setFilters(resetFilters);
        console.debug("this is what filters should be now: ", filters);
        const boolValue = true;
        loadFilters(requestTemp, boolValue);
        // log the analytics event for a Spending Explorer starting point
        Analytics.event({
            category: 'Spending Explorer - Starting Point',
            action: rootType
        });
    };

    useEffect(() => {
        if (props.explorer.fy && (props.explorer.period || props.explorer.quarter)) {
            console.debug("is this running first? 8");
            prepareRootRequest(
                props.explorer.root,
                props.explorer.fy,
                props.explorer.quarter,
                props.explorer.period
            );
        }
    }, [props.explorer]);

    const goDeeper = (idInput, dataInput) => {
        if (inFlight) {
            // API call is in progress, don't allow clicks
            return;
        }
        console.debug("9");
        // determine how we are currently subdividing the data
        // determine the data element we should filter by
        // this is equal to how we are currently subdividing the spending
        const filterBy = props.explorer.active.subdivision;
        if (filterBy === 'award') {
            // we are at the bottom of the path, go to the award page
            // and open in new tab
            window.open(`/award/${idInput}`, "_blank");

            Analytics.event({
                category: 'Spending Explorer - Exit',
                action: `/award/${idInput}`
            });
            return;
        }

        const newFilter = {
            [filterBy]: idInput
        };

        // generate a trail object representing the current filter that is being applied
        // the new "within" value is the old subdivision unit
        // given this, determine how far down the path we are
        const path = dropdownScopes[props.explorer.root];
        const currentDepth = path.indexOf(props.explorer.active.subdivision);

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
                if (props.explorer.root === 'agency') {
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
        const requestTemp = {
            within: props.explorer.active.subdivision,
            subdivision: nextSubdivision,
            title: dataInput.name,
            id: dataInput.id,
            accountNumber: dataInput.account_number || '',
            link: dataInput.link
        };

        props.resetExplorerTable();

        setTransitionSteps(1);
        setFilters(Object.assign({}, filters, newFilter));
        const boolValue = false;
        console.debug("pre load filters: ", requestTemp);
        loadFilters(requestTemp, boolValue);

        Analytics.event({
            category: 'Spending Explorer - Drilldown',
            action: filterBy,
            label: `${dataInput.name} - ${dataInput.id}`
        });
    };

    const changeSubdivisionType = (typeInput) => {
        console.debug("10");
        // if we're skipping levels, then we are not adding filters, we're simply revisualizating
        // the data that is already filtered.
        // This means we don't need to modify the trail or the redux filter set.
        // This also means we shouldn't show an animation.
        // To do this, clone the current active screen object and change only the subdivision to
        // the selected type. We'll pass this on as the request object to loadData.
        // loadData has internal logic that will just change the redux Active Screen and not add
        // anything to the sidebar trail
        const requestTemp = Object.assign({}, props.explorer.active.toJS(), {
            subdivision: typeInput
        });

        props.resetExplorerTable();

        setTransitionSteps(0);
        loadData(requestTemp, false);
    };

    const rewindToFilter = (input) => {
        console.debug("11");
        const trail = props.explorer.trail.toJS();
        const oldFilters = filters;
        // don't do anything if this is the current filter (ie, the last one in the trail)
        if (input === trail.length - 1) {
            return;
        }

        // determine how many steps we need to rewind
        const steps = input - (trail.length - 1);


        if (input === 0) {
            // we are going all the way back to the start
            setTransitionSteps(steps);
            prepareRootRequest(props.explorer.root, props.explorer.fy, props.explorer.quarter, props.explorer.period);
            return;
        }

        // iterate through the trail to rebuild the filter set
        const newFilters = {
            fy: props.explorer.fy,
            quarter: props.explorer.quarter,
            period: props.explorer.period
        };
        const newTrail = [];
        // iterate through the trail and include only those filters up to the point we are rewinding
        // to
        for (let i = 0; i <= input; i++) {
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
        const isRoot = input === 0;

        // the request object will essentially match the trail item from the selected index
        const selectedTrailItem = trail[input];

        props.overwriteExplorerTrail(newTrail);
        props.resetExplorerTable();

        setTransitionSteps(steps);
        setFilters(newFilters);
        loadData(selectedTrailItem, isRoot, true);
    };
    const goToUnreportedTimeout = useEffect((activeScreen, dataArr) => window.setTimeout(() => {
        if (transition === 'start') {
            console.debug("12");
            props.setExplorerActive(activeScreen);

            // save the data as an Immutable object for easy change comparison within
            // the treemap
            setData(new List(dataArr));
            setLastUpdate(lastUpdate);
            setInFlight(false);
            setTransition('end');
        }
    }, 250), [transition]);
    const goToUnreported = (input) => {
        console.debug("13");
        const dataArr = [input];

        // generate a trail object representing the current filter that is being applied
        // the new "within" value is the old subdivision unit
        // given this, determine how far down the path we are
        const path = dropdownScopes[props.explorer.root];
        const currentDepth = path.indexOf(props.explorer.active.subdivision);

        const currentSubdivision = path[currentDepth];

        const trailDisplay = {
            within: props.explorer.active.subdivision,
            title: input.name,
            subdivision: currentSubdivision
        };

        let total;
        if (!input.obligated_amount) {
            total = input.amount;
        }
        else {
            total = input.obligated_amount;
        }

        const trailItem = Object.assign({}, trailDisplay, {
            total
        });

        props.addExplorerTrail(trailItem);
        // update the active screen within and subdivision values using the request object
        const activeScreen = {
            total
        };

        setTransitionSteps(1);

        // there is going to be a transition, so trigger the exit animation
        // then, 250ms later (after the exit animation completes), apply the props and state
        // so the entry animation occurs with the new data
        setTransition('start');
        goToUnreportedTimeout(activeScreen, dataArr);
        props.resetExplorerTable();
    };

    return (
        <div className="explorer-detail">
            <ExplorerSidebar
                fy={props.explorer.fy}
                quarter={props.explorer.quarter}
                period={props.explorer.period}
                trail={props.explorer.trail}
                setExplorerPeriod={props.setExplorerPeriod}
                rewindToFilter={rewindToFilter} />
            <DetailContent
                isRoot={props.explorer.active.within === 'root'}
                isLoading={inFlight || props.error}
                isTruncated={isTruncated}
                root={props.explorer.root}
                fy={props.explorer.fy}
                active={props.explorer.active}
                trail={props.explorer.trail.toJS()}
                total={props.explorer.active.total}
                data={data}
                lastUpdate={lastUpdate}
                transitionSteps={transitionSteps}
                transition={transition}
                goDeeper={goDeeper}
                changeSubdivisionType={changeSubdivisionType}
                showTooltip={props.showTooltip}
                hideTooltip={props.hideTooltip}
                rewindToFilter={rewindToFilter}
                goToUnreported={goToUnreported} />
        </div>
    );
};

DetailContentContainer.propTypes = propTypes;
const DetailContentContainerSlugs = withAgencySlugs(DetailContentContainer);

export default connect(
    (state) => ({ explorer: state.explorer }),
    (dispatch) => bindActionCreators(explorerActions, dispatch)
)(DetailContentContainerSlugs);
