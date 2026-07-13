/**
 * DetailContentContainer.jsx
 * Created by Kevin Li 8/16/17
 */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { List } from 'immutable';

import { dropdownScopes } from '../../../dataMapping/explorer/dropdownScopes';
import {
    addExplorerTrail,
    overwriteExplorerTrail,
    resetExplorerTable,
    setExplorerActive,
    setExplorerPeriod
} from "redux/actions/explorer/explorerActions";
import Analytics from '../../../helpers/analytics/Analytics';
import {
    appendCellForDataOutsideTree, truncateDataForTreemap
} from "../../../helpers/explorerHelper";
import useFetchBreakdown from "../../../hooks/useFetchBreakdown";
import DetailContent from '../../../components/explorer/detail/DetailContent';
import ExplorerSidebar from '../../../components/explorer/detail/sidebar/ExplorerSidebar';
import withAgencySlugs from "../../../containers/agency/WithAgencySlugs";

const trackSpendingEvent = ({
    event, category, action, label = false
}) => Analytics.event({
    event: `Spending Explorer - ${event}`,
    category: `Spending Explorer - ${category || event}`,
    action,
    ...(label ? { label } : {})
});

const propTypes = {
    showTooltip: PropTypes.func,
    hideTooltip: PropTypes.func,
    error: PropTypes.bool
};

const DetailContentContainer = ({
    showTooltip,
    hideTooltip,
    error
}) => {
    // TODO: is quarter being set or used anywhere???
    const {
        root, active, fy, period, quarter, trail
    } = useSelector((state) => state.explorer);
    const dispatch = useDispatch();
    const [data, setData] = useState(new List());
    const [lastUpdate, setLastUpdate] = useState('');
    const [transitionSteps, setTransitionSteps] = useState(0);
    const [isTruncated, setIsTruncated] = useState(false);
    const [transition, setTransition] = useState('');
    const [requestObj, setRequestObject] = useState({});
    const [rootLocal, setRootLocal] = useState(true);
    const [rewind, setRewind] = useState(false);
    const [params, setParams] = useState({});
    const {
        data: fetchData, loading
    } = useFetchBreakdown(params);

    const setActive = (state) => dispatch(setExplorerActive(state));
    const overwriteTrail = (state) => dispatch(overwriteExplorerTrail(state));
    const addTrail = (state) => dispatch(addExplorerTrail(state));
    const resetTable = () => dispatch(resetExplorerTable());
    // TODO: Move setExplorerPeriod down to child component? It's not used in this component
    const setPeriod = (state) => dispatch(setExplorerPeriod(state));

    const parseRootData = ({ total, results, end_date: endDate }) => {
        // build the active screen root object
        const activeScreen = {
            total,
            within: 'root',
            subdivision: root
        };

        // update the trail to consist of only this screen (since we are at the root, there cannot
        // be anything else in the trail)
        const explorerTrail = [
            {
                total,
                within: 'root',
                subdivision: root,
                title: '',
                id: ''
            }
        ];

        overwriteTrail(explorerTrail);

        resetTable();

        const updateState = () => {
            setData(new List(results));
            setLastUpdate(endDate);
            setIsTruncated(false);
        };

        if (transitionSteps !== 0) {
            // there is going to be a transition, so trigger the exit animation
            // then, 250ms later (after the exit animation completes), apply the props and state
            // so the entry animation occurs with the new data
            setTransition('start');

            setActive(activeScreen);
            // save the data as an Immutable object
            // for easy change comparison within the treemap
            updateState();
        }
        else {
            // there are no transition steps, so apply changes immediately
            setActive(activeScreen);

            // save the data as an Immutable object for easy change comparison within
            // the treemap
            updateState();
            setTransition('');// root will never be truncated
        }
    };

    const parseData = ({ total, results, end_date: endDate }, request, isRewind) => {
        let truncated = false;
        let parsedResults = truncateDataForTreemap(results);

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
            parsedResults = appendCellForDataOutsideTree(
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
        if (request.within !== active.within && !isRewind) {
            addTrail(trailItem);
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
        };

        if (transitionSteps !== 0) {
            // there is going to be a transition, so trigger the exit animation
            // then, 250ms later (after the exit animation completes), apply the props and state
            // so the entry animation occurs with the new data
            setTransition('start');

            // save the data as an Immutable object for
            // easy change comparison within the treemap
            setActive(activeScreen);
            updateState();
        }
        else {
            // no animation required if there are 0 transition steps
            setActive(activeScreen);

            // save the data as an Immutable object for easy change comparison within the treemap
            updateState();
            setTransition('');
        }

        trackSpendingEvent({ event: 'Data Type', action: request.subdivision });
    };

    useEffect(() => {
        if (fetchData?.results.length > 0) {
            if (rootLocal) parseRootData(fetchData);
            else parseData(fetchData, requestObj, rewind);
        }
        // eslint-disable-next-line
    }, [rootLocal, fetchData, params, rewind, requestObj]);

    const prepareRootRequest = (rootType, newFy, newQuarter, newPeriod) => {
        // we need to make a root request
        // at the root level, ignore all filters except for the root
        // in fact, just to be safe, let's overwrite the filter props
        const resetFilters = { fy: newFy, quarter: newQuarter, period: newPeriod };

        delete resetFilters.quarter;

        setRequestObject({ within: 'root', subdivision: rootType });
        setRootLocal(true);
        setRewind(false);
        setParams({ type: rootType, filters: resetFilters });

        // log the analytics event for a Spending Explorer starting point
        trackSpendingEvent({ event: 'Starting Point', action: rootType });
    };

    useEffect(() => {
        prepareRootRequest(
            root,
            fy,
            quarter,
            period
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        root,
        fy,
        quarter,
        period
    ]);

    const goDeeper = (id, {
        name, id: dataId, account_number: accountNumber, link
    }) => {
        if (loading) {
            // API call is in progress, don't allow clicks
            return;
        }

        // determine how we are currently subdividing the data
        // determine the data element we should filter by
        // this is equal to how we are currently subdividing the spending
        const filterBy = active.subdivision;
        if (filterBy === 'award') {
            // we are at the bottom of the path, go to the award page
            // and open in new tab
            window.open(`/award/${id}`, "_blank");

            trackSpendingEvent({
                event: 'Award Click Exit', category: 'Exit', action: `/award/${id}`
            });

            return;
        }

        const newFilter = {
            [filterBy]: id
        };

        // generate a trail object representing the current filter that is being applied
        // the new "within" value is the old subdivision unit
        // given this, determine how far down the path we are
        const path = dropdownScopes[root];
        const currentDepth = path.indexOf(active.subdivision);

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
                if (root === 'agency') {
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
            within: active.subdivision,
            subdivision: nextSubdivision,
            title: name,
            id: dataId,
            accountNumber: accountNumber || '',
            link
        };

        resetTable();

        setTransitionSteps(1);

        setRequestObject(request);
        setRootLocal(false);
        setRewind(false);
        setParams((prevState) =>
            ({
                ...prevState,
                type: request.subdivision,
                filters: Object.assign({}, prevState.filters, newFilter)
            })
        );


        trackSpendingEvent({
            event: 'Drilldown', action: filterBy, label: `${name} - ${dataId}`
        });
    };

    const changeSubdivisionType = (type) => {
        // if we're skipping levels, then we are not adding filters, we're simply re-visualizing
        // the data that is already filtered.
        // This means we don't need to modify the trail or the redux filter set.
        // This also means we shouldn't show an animation.
        // To do this, clone the current active screen object and change only the subdivision to
        // the selected type. We'll pass this on as the request object to loadData.
        // loadData has internal logic that will just change the redux Active Screen and not add
        // anything to the sidebar trail
        const request = Object.assign({}, active.toJS(), {
            subdivision: type
        });

        resetTable();
        setTransitionSteps(0);

        setRequestObject(request);
        setRootLocal(false);
        setRewind(false);
        setParams((prevState) => ({ ...prevState, type }));
    };

    const rewindToFilter = (index) => {
        const trailJS = trail.toJS();
        const oldFilters = params.filters;
        // don't do anything if this is the current filter (ie, the last one in the trail)
        if (index === trailJS.length - 1) {
            return;
        }

        // determine how many steps we need to rewind
        const steps = index - (trailJS.length - 1);


        if (index === 0) {
            // we are going all the way back to the start
            setTransitionSteps(steps);
            prepareRootRequest(root, fy, quarter, period);
            return;
        }

        // iterate through the trail to rebuild the filter set
        const newFilters = {
            fy,
            quarter,
            period
        };
        const newTrail = [];

        // iterate through the trail and include only those filters up to the point we are rewinding
        // to
        for (let i = 0; i <= index; i++) {
            const filterType = trailJS[i].within;
            if (filterType !== 'root') {
                // root filters are not real filters, so ignore them
                // get the filter type and fetch its ID from the current filter set
                newFilters[filterType] = oldFilters[filterType];
            }

            // add the old item back into the new trail
            newTrail.push(trailJS[i]);
        }

        // determine if we are jumping back to the root
        const isRoot = index === 0;

        // the request object will essentially match the trail item from the selected index
        const selectedTrailItem = trailJS[index];

        overwriteTrail(newTrail);

        resetTable();

        setTransitionSteps(steps);

        delete newFilters.quarter;

        setRequestObject(selectedTrailItem);
        setRootLocal(isRoot);
        setRewind(true);
        setParams({ type: selectedTrailItem.subdivision, filters: newFilters });
    };

    const goToUnreported = (d) => {
        const dataArr = [d];

        // generate a trail object representing the current filter that is being applied
        // the new "within" value is the old subdivision unit
        // given this, determine how far down the path we are
        const path = dropdownScopes[root];
        const currentDepth = path.indexOf(active.subdivision);

        const currentSubdivision = path[currentDepth];

        const trailDisplay = {
            within: active.subdivision,
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

        addTrail(trailItem);

        // update the active screen within and subdivision values using the request object
        const activeScreen = {
            total
        };

        setTransitionSteps(1);

        // there is going to be a transition, so trigger the exit animation
        // then, 250ms later (after the exit animation completes), apply the props and state
        // so the entry animation occurs with the new data
        setTransition('start');

        setActive(activeScreen);
        // save the data as an Immutable object for
        // easy change comparison within the treemap
        setData(new List(dataArr));
        setLastUpdate((state) => state);

        resetTable();
    };

    useEffect(() => {
        if (transition === 'start') {
            window.setTimeout(() => setTransition('end'), 250);
        }
    }, [transition]);

    return (
        <div className="explorer-detail">
            <ExplorerSidebar
                fy={fy}
                quarter={quarter}
                period={period}
                trail={trail}
                setExplorerPeriod={setPeriod}
                rewindToFilter={rewindToFilter} />
            <DetailContent
                isRoot={active.within === 'root' || active.within === ''}
                isLoading={loading || error}
                isTruncated={isTruncated}
                root={root}
                fy={fy}
                active={active}
                trail={trail.toJS()}
                total={active.total}
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
export default DetailContentContainerWithSlugs;
