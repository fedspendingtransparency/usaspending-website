/**
 * DetailContentContainer.jsx
 * Created by Kevin Li 8/16/17
 */

import React, { useRef, useState, useEffect } from 'react';
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

const DetailContentContainer = ({
    explorer,
    setExplorerActive,
    setExplorerPeriod,
    overwriteExplorerTrail,
    addExplorerTrail,
    showTooltip,
    hideTooltip,
    resetExplorerTable,
    history,
    agencySlugs,
    loading,
    error
}) => {
    const [data, setData] = useState(new List());
    const [lastUpdate, setLastUpdate] = useState('');
    const [filters, setFilters] = useState({});
    const [transitionSteps, setTransitionSteps] = useState(0);
    const [inFlight, setInFlight] = useState(true);
    const [isTruncated, setIsTruncated] = useState(false);
    const [transition, setTransition] = useState('');
    const requestRef = useRef(null);

    const parseRootData = ({ total, results, end_date: endDate }) => {
        // build the active screen root object
        const activeScreen = {
            total,
            within: 'root',
            subdivision: explorer.root
        };

        // update the trail to consist of only this screen (since we are at the root, there cannot
        //  be anything else in the trail)
        const trail = [
            {
                total,
                within: 'root',
                subdivision: explorer.root,
                title: '',
                id: ''
            }
        ];

        overwriteExplorerTrail(trail);

        resetExplorerTable();

        const updateState = () => {
            setData(new List(results));
            setLastUpdate(endDate);
            setInFlight(false);
            setIsTruncated(false);
        };

        if (transitionSteps !== 0) {
            // there is going to be a transition, so trigger the exit animation
            // then, 250ms later (after the exit animation completes), apply the props and state
            // so the entry animation occurs with the new data
            setTransition('start');
            window.setTimeout(() => {
                setExplorerActive(activeScreen);

                // save the data as an Immutable object for easy change comparison within
                // the treemap
                updateState();
                setTransition('end');// root will never be truncated
            }, 250);
        }
        else {
            // there are no transition steps, so apply changes immediately
            setExplorerActive(activeScreen);

            // save the data as an Immutable object for easy change comparison within
            // the treemap
            updateState();
            setTransition('');// root will never be truncated
        }
    };

    const parseData = ({ total, results, end_date: endDate }, request, isRewind) => {
        let truncated = false;
        let parsedResults = ExplorerHelper.truncateDataForTreemap(results);

        if (request.subdivision === 'award') {
            // link to award page using new human legible id
            parsedResults = parsedResults.map(
                (obj) => ({ ...obj, id: encodeURIComponent(obj.generated_unique_award_id) })
            );
        }

        if (request.subdivision === 'award' || request.subdivision === 'recipient') {
            truncated = results.length > 500;
        }

        if (truncated) {
            parsedResults = ExplorerHelper.appendCellForDataOutsideTree(
                parsedResults, total, request.subdivision
            )
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
        if (request.within !== explorer.active.within && !isRewind) {
            addExplorerTrail(trailItem);
        }

        // update the active screen within and subdivision values using the request object
        const activeScreen = {
            total,
            within: request.within,
            subdivision: request.subdivision,
            accountNumber: request.accountNumber || ''
        };

        const updateState = () => {
            setIsTruncated(truncated);
            setData(new List(parsedResults));
            setLastUpdate(endDate);
            setInFlight(false);
        };

        if (transitionSteps !== 0) {
            // there is going to be a transition, so trigger the exit animation
            // then, 250ms later (after the exit animation completes), apply the props and state
            // so the entry animation occurs with the new data
            setTransition('start');
            window.setTimeout(() => {
                setExplorerActive(activeScreen);

                // save the data as an Immutable object for easy change comparison within
                // the treemap
                updateState();
                setTransition('end');
            }, 250);
        }
        else {
            // no animation required if there are 0 transition steps
            setExplorerActive(activeScreen);

            // save the data as an Immutable object for easy change comparison within the treemap
            updateState();
            setTransition('');
        }

        Analytics.event({
            event: 'Spending Explorer - Data Type',
            category: 'Spending Explorer - Data Type',
            action: request.subdivision
        });
    };

    const loadData = (
        request,
        isRoot = false,
        isRewind = false,
        tempFilters = filters
    ) => {
        setInFlight(true);

        if (requestRef.current) {
            requestRef.current.cancel();
        }

        if (
            !explorer.fy ||
            (
                !explorer.period &&
                !explorer.quarter
            )
        ) {
            return Promise.resolve();
        }

        // perform the API request
        const requestFilters = Object.assign({}, tempFilters);

        if (requestFilters.quarter == null) {
            delete requestFilters.quarter;
        }
        if (requestFilters.period == null) {
            delete requestFilters.period;
        }
        requestRef.current = ExplorerHelper.fetchBreakdown({
            type: request.subdivision,
            filters: requestFilters
        });

        return requestRef.current.promise
            .then((res) => {
                if (isRoot) {
                    parseRootData(res.data);
                }
                else {
                    parseData(res.data, request, isRewind);
                }
                requestRef.current = null;
            })
            .catch((err) => {
                if (!isCancel(err)) {
                    console.error(err);
                    requestRef.current = null;
                }
            });
    };

    const prepareRootRequest = (rootType, fy, quarter, period) => {
        // we need to make a root request
        // at the root level, ignore all filters except for the root
        // in fact, just to be safe, let's overwrite the filter props
        const resetFilters = { fy, quarter, period };

        setFilters(resetFilters);
        loadData(
            { within: 'root', subdivision: rootType },
            true,
            false,
            resetFilters
        );

        // log the analytics event for a Spending Explorer starting point
        Analytics.event({
            event: 'Spending Explorer - Starting Point',
            category: 'Spending Explorer - Starting Point',
            action: rootType
        });
    };

    useEffect(() => {
        prepareRootRequest(
            explorer.root,
            explorer.fy,
            explorer.quarter,
            explorer.period
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        explorer.root,
        explorer.fy,
        explorer.quarter,
        explorer.period
    ]);

    const goDeeper = (id, {
        name, id: dataId, account_number: accountNumber, link
    }) => {
        if (inFlight) {
            // API call is in progress, don't allow clicks
            return;
        }

        // determine how we are currently subdividing the data
        // determine the data element we should filter by
        // this is equal to how we are currently subdividing the spending
        const filterBy = explorer.active.subdivision;
        if (filterBy === 'award') {
            // we are at the bottom of the path, go to the award page
            // and open in new tab
            window.open(`/award/${id}`, "_blank");

            Analytics.event({
                event: 'Spending Explorer - Award Click Exit',
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
        const path = dropdownScopes[explorer.root];
        const currentDepth = path.indexOf(explorer.active.subdivision);

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
                if (explorer.root === 'agency') {
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
            within: explorer.active.subdivision,
            subdivision: nextSubdivision,
            title: name,
            id: dataId,
            accountNumber: accountNumber || '',
            link
        };

        resetExplorerTable();

        setTransition(1);
        setFilters((state) => Object.assign({}, state, newFilter));
        loadData(request, false, false, Object.assign({}, filters, newFilter));

        Analytics.event({
            event: 'Spending Explorer - Drilldown',
            category: 'Spending Explorer - Drilldown',
            action: filterBy,
            label: `${name} - ${dataId}`
        });
    };

    const changeSubdivisionType = (type) => {
        // if we're skipping levels, then we are not adding filters, we're simply revisualizating
        // the data that is already filtered.
        // This means we don't need to modify the trail or the redux filter set.
        // This also means we shouldn't show an animation.
        // To do this, clone the current active screen object and change only the subdivision to
        // the selected type. We'll pass this on as the request object to loadData.
        // loadData has internal logic that will just change the redux Active Screen and not add
        // anything to the sidebar trail
        const request = Object.assign({}, explorer.active.toJS(), {
            subdivision: type
        });

        resetExplorerTable();
        setTransitionSteps(0);
        loadData(request, false);
    };

    const rewindToFilter = (index) => {
        const trail = explorer.trail.toJS();
        const oldFilters = filters;
        // don't do anything if this is the current filter (ie, the last one in the trail)
        if (index === trail.length - 1) {
            return;
        }

        // determine how many steps we need to rewind
        const steps = index - (trail.length - 1);


        if (index === 0) {
            // we are going all the way back to the start
            setTransitionSteps(steps);
            prepareRootRequest(explorer.root, explorer.fy, explorer.quarter, explorer.period);
            return;
        }

        // iterate through the trail to rebuild the filter set
        const newFilters = {
            fy: explorer.fy,
            quarter: explorer.quarter,
            period: explorer.period
        };
        const newTrail = [];

        // iterate through the trail and include only those filters up to the point we are rewinding
        // to
        for (let i = 0; i <= index; i++) {
            const filterType = trail[i].within;
            if (filterType !== 'root') {
                // root filters are not real filters, so ignore them
                // get the filter type and fetch its ID from the current filter set
                newFilters[filterType] = oldFilters[filterType];
            }

            // add the old item back into the new trail
            newTrail.push(trail[i]);
        }

        // determine if we are jumping back to the root
        const isRoot = index === 0;

        // the request object will essentially match the trail item from the selected index
        const selectedTrailItem = trail[index];

        overwriteExplorerTrail(newTrail);

        resetExplorerTable();

        setTransitionSteps(steps);
        setFilters(newFilters);
        loadData(selectedTrailItem, isRoot, true, newFilters);
    };

    const goToUnreported = (d) => {
        const dataArr = [d];

        // generate a trail object representing the current filter that is being applied
        // the new "within" value is the old subdivision unit
        // given this, determine how far down the path we are
        const path = dropdownScopes[explorer.root];
        const currentDepth = path.indexOf(explorer.active.subdivision);

        const currentSubdivision = path[currentDepth];

        const trailDisplay = {
            within: explorer.active.subdivision,
            title: d.name,
            subdivision: currentSubdivision
        };

        let total;
        if (!d.obligated_amount) {
            total = d.amount;
        }
        else {
            total = d.obligated_amount;
        }

        const trailItem = Object.assign({}, trailDisplay, {
            total
        });

        addExplorerTrail(trailItem);

        // update the active screen within and subdivision values using the request object
        const activeScreen = {
            total
        };

        setTransitionSteps(1);

        // there is going to be a transition, so trigger the exit animation
        // then, 250ms later (after the exit animation completes), apply the props and state
        // so the entry animation occurs with the new data
        setTransition('start');

        window.setTimeout(() => {
            setExplorerActive(activeScreen);

            // save the data as an Immutable object for easy change comparison within
            // the treemap
            setData(new List(dataArr));
            setLastUpdate((state) => state);
            setInFlight(false);
            setTransition('end');
        }, 250);

        resetExplorerTable();
    };

    return (
        <div className="explorer-detail">
            <ExplorerSidebar
                fy={explorer.fy}
                quarter={explorer.quarter}
                period={explorer.period}
                trail={explorer.trail}
                setExplorerPeriod={setExplorerPeriod}
                rewindToFilter={rewindToFilter} />
            <DetailContent
                isRoot={explorer.active.within === 'root'}
                isLoading={inFlight || error}
                isTruncated={isTruncated}
                root={explorer.root}
                fy={explorer.fy}
                active={explorer.active}
                trail={explorer.trail.toJS()}
                total={explorer.active.total}
                data={data}
                lastUpdate={lastUpdate}
                transitionSteps={transitionSteps}
                transition={transition}
                goDeeper={goDeeper}
                changeSubdivisionType={changeSubdivisionType}
                showTooltip={showTooltip}
                hideTooltip={hideTooltip}
                rewindToFilter={rewindToFilter}
                goToUnreported={goToUnreported} />
        </div>
    );
};

DetailContentContainer.propTypes = propTypes;
const DetailContentContainerWithSlugs = withAgencySlugs(DetailContentContainer);

export default connect(
    (state) => ({ explorer: state.explorer }),
    (dispatch) => bindActionCreators(explorerActions, dispatch)
)(DetailContentContainerWithSlugs);
