/**
  * ResultsTableContainer.jsx
  * Created by Kevin Li 11/8/16
  **/

import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { isCancel } from 'axios';
import { uniqueId, intersection, throttle } from 'lodash';
import SearchAwardsOperation from 'models/v1/search/SearchAwardsOperation';
import { subAwardIdClicked } from 'redux/actions/search/searchSubAwardTableActions';
import * as SearchHelper from 'helpers/searchHelper';
import Analytics from 'helpers/analytics/Analytics';
import { awardTypeGroups, subawardTypeGroups } from 'dataMapping/search/awardType';
import {
    defaultColumns,
    defaultSort,
    apiFieldByTableColumnName
} from 'dataMapping/search/awardTableColumns';
import { awardTableColumnTypes } from 'dataMapping/search/awardTableColumnTypes';
import { measureTableHeader } from 'helpers/textMeasurement';
import ResultsTableSection from 'components/search/table/ResultsTableSection';
import searchActions from 'redux/actions/searchActions';
import * as appliedFilterActions from 'redux/actions/search/appliedFilterActions';

const propTypes = {
    filters: PropTypes.object,
    setAppliedFilterCompletion: PropTypes.func,
    noApplied: PropTypes.bool,
    subaward: PropTypes.bool,
    subAwardIdClicked: PropTypes.func
};
export const tableTypes = [
    {
        label: 'Contracts',
        internal: 'contracts'
    },
    {
        label: 'Contract IDVs',
        internal: 'idvs'
    },
    {
        label: 'Grants',
        internal: 'grants'
    },
    {
        label: 'Direct Payments',
        internal: 'direct_payments'
    },
    {
        label: 'Loans',
        internal: 'loans'
    },
    {
        label: 'Other',
        internal: 'other'
    }
];
export const subTypes = [
    {
        label: 'Sub-Contracts',
        internal: 'subcontracts'
    },
    {
        label: 'Sub-Grants',
        internal: 'subgrants'
    }
];

const ResultsTableContainer = (props) => {
    let tabCountRequest = null;
    let searchRequest = null;
    const location = useLocation();
    const [searchParams, setSearchParams] = useState(new SearchAwardsOperation());
    const [page, setPage] = useState(0);
    const [lastPage, setLastPage] = useState(true);
    const [counts, setCounts] = useState({});
    const [tableType, setTableType] = useState('contracts');
    const [columns, setColumns] = useState({});
    const [sort, setSort] = useState({
        field: 'Award Amount',
        direction: 'desc'
    });
    const [inFlight, setInFlight] = useState(true);
    const [error, setError] = useState(false);
    const [results, setResults] = useState([]);
    const [total, setTotal] = useState(0);
    const [resultLimit, setResultLimit] = useState(10);
    const [tableInstance, setTableInstance] = useState(`${uniqueId()}`);
    const [isLoadingNextPage, setLoadNextPage] = useState(false);
    const initialRender = useRef(true);

    const performSearch = throttle((newSearch = false) => {
        if (searchRequest) {
            // a request is currently in-flight, cancel it
            searchRequest.cancel();
        }

        props.setAppliedFilterCompletion(false);
        const tableTypeTemp = tableType;

        // get searchParams from state
        const searchParamsTemp = new SearchAwardsOperation();
        searchParamsTemp.fromState(props.filters);

        // if subawards is true, newAwardsOnly cannot be true, so we remove
        // dateType for this request; also has to be done for the tabCounts request
        if (props.subaward && searchParamsTemp.dateType) {
            delete searchParamsTemp.dateType;
        }

        // generate an array of award type codes representing the current table tab we're showing
        // and use a different mapping if we're showing a subaward table vs a prime award table
        const groupsFromTableType =
            props.subaward ? subawardTypeGroups[tableTypeTemp] : awardTypeGroups[tableTypeTemp];

        if (searchParams.awardType.length === 0) {
            searchParamsTemp.awardType = groupsFromTableType;
        }
        else {
            let intersectingTypes = intersection(groupsFromTableType,
                searchParams.awardType);
            if (!intersectingTypes || intersectingTypes.length === 0) {
                // the filtered types and the table type do not align
                // in this case, send an array of non-existent types because the endpoint requires
                // an award type parameter
                intersectingTypes = ['no intersection'];
            }
            searchParamsTemp.awardType = intersectingTypes;
        }

        // indicate the request is about to start
        setInFlight(true);
        setError(false);

        let pageNumber = page;
        if (newSearch) {
            // a new search (vs just getting more pages of an existing search) requires resetting
            // the page number
            pageNumber = 1;
        }

        const requestFields = [];

        // Request fields for visible columns only
        const columnVisibility = columns[tableTypeTemp]?.visibleOrder;
        if (!columnVisibility) {
            return null;
        }
        columnVisibility.forEach((field) => {
            if (!requestFields.includes(field) && field !== "Action Date") {
                // Prevent duplicates in the list of fields to request
                if (Object.keys(apiFieldByTableColumnName).includes(field)) {
                    requestFields.push(apiFieldByTableColumnName[field]);
                }
                else {
                    requestFields.push(field);
                }
            }
            else if (field === "Action Date") {
                requestFields.push('Sub-Award Date');
            }
        });

        requestFields.push('recipient_id', 'prime_award_recipient_id');

        // parse the redux search order into the API-consumable format
        const searchOrder = sort;
        let sortDirection = searchOrder.direction;
        if (!sortDirection) {
            sortDirection = 'desc';
        }
        const params = {
            filters: searchParamsTemp.toParams(),
            fields: requestFields,
            page: pageNumber,
            limit: resultLimit,
            sort: searchOrder.field,
            order: sortDirection,
            subawards: props.subaward
        };
        // Set the params needed for download API call
        if (!params.filters.award_type_codes) {
            return null;
        }
        searchRequest = SearchHelper.performSpendingByAwardSearch(params);
        return searchRequest.promise
            .then((res) => {
                const newState = {
                    inFlight: false
                };

                const parsedResults = res.data.results.map((result) => ({
                    ...result,
                    generated_internal_id: encodeURIComponent(result.generated_internal_id)
                }));

                // don't clear records if we're appending (not the first page)
                newState.tableInstance = `${uniqueId()}`;
                newState.results = parsedResults;

                if (newSearch) {
                    setTotal(newState.results.length);
                }

                // request is done
                searchRequest = null;
                newState.page = res.data.page_metadata.page;
                newState.lastPage = !res.data.page_metadata.hasNext;
                setInFlight(newState.inFlight);
                setTableInstance(newState.tableInstance);
                setResults(newState.results);
                setPage(newState.page);
                setLastPage(newState.lastPage);

                props.setAppliedFilterCompletion(true);
            })
            .catch((err) => {
                if (!isCancel(err)) {
                    setInFlight(false);
                    setError(true);
                    props.setAppliedFilterCompletion(true);
                    console.log(err);
                }
            });
    }, 250);

    const createColumn = (col) => {
        // create an object that integrates with the expected column data structure used by
        // the table component

        // BODGE: Temporarily only allow descending columns
        const direction = 'desc';
        const width = col.customWidth || measureTableHeader(col.displayName || col.title);

        return {
            columnName: col.title,
            displayName: col.displayName || col.title,
            subtitle: col.subtitle || '',
            width,
            background: col.background || '',
            defaultDirection: direction,
            right: col.right || false
        };
    };

    const loadColumns = () => {
        // in the future, this will be an API call, but for now, read the local data file
        // load every possible table column up front, so we don't need to deal with this when
        // switching tabs
        const columnsTemp = tableTypes.concat(subTypes).reduce((cols, type) => {
            const visibleColumns = defaultColumns(type.internal).map((data) => data.title);
            const parsedColumns = defaultColumns(type.internal).reduce((parsedCols, data) => Object.assign({}, parsedCols, {
                [data.title]: createColumn(data)
            }), {});

            return Object.assign(cols, {
                [type.internal]: {
                    visibleOrder: visibleColumns,
                    data: parsedColumns
                }
            });
        }, {});
        setColumns(Object.assign(columns, columnsTemp));
    };

    const updateFilters = throttle(() => {
        // the searchParams state var is now only used in the
        // block using intersection in performSearch
        const newSearch = new SearchAwardsOperation();
        newSearch.fromState(props.filters);
        setSearchParams(newSearch);

        setPage(1);
        performSearch(true);
    }, 350);

    const switchTab = (tab) => {
        const newState = {
            tableType: tab
        };

        const currentSortField = sort.field;
        // check if the current sort field is available in the table type
        const availableFields = columns[tab].data;
        if (!Object.prototype.hasOwnProperty.call(availableFields, currentSortField)) {
            // the sort field doesn't exist, use the table type's default field
            const field = defaultSort(tab);
            const fieldType = awardTableColumnTypes[field];
            let direction = 'desc';
            if (fieldType === 'number') {
                direction = 'asc';
            }
            newState.sort = {
                field,
                direction
            };
        }
        setTableType(tab);
        if (newState.sort) {
            setSort(Object.assign(newState.sort));
        }
        setPage(1);
        Analytics.event({
            event: 'search_table_tab',
            category: 'Advanced Search - Table Tab',
            action: tab,
            gtm: true
        });
    };

    const parseTabCounts = (data) => {
        const awardCounts = data.results;
        let firstAvailable = '';
        let i = 0;

        const availableTabs = props.subaward ? subTypes : tableTypes;

        // Set the first available award type to the first non-zero entry in the
        while (firstAvailable === '' && i < availableTabs.length) {
            const tableTypeTemp = availableTabs[i].internal;

            if (awardCounts[tableTypeTemp] > 0) {
                firstAvailable = tableTypeTemp;
            }

            i += 1;
        }

        // If none of the award types are populated, set the first available tab to be the
        // first tab in the table
        if (firstAvailable === '') {
            firstAvailable = availableTabs[0].internal;
        }

        setCounts(Object.assign({}, counts, awardCounts));
        switchTab(firstAvailable);
        updateFilters();
    };

    const pickDefaultTab = () => {
        // get the award counts for the current filter set
        if (tabCountRequest) {
            tabCountRequest.cancel();
        }

        setInFlight(true);
        setError(false);

        const searchParamsTemp = new SearchAwardsOperation();
        searchParamsTemp.fromState(props.filters);

        // if subawards is true, newAwardsOnly cannot be true, so we remove dateType for this request
        // also has to be done for the main request, in performSearch
        if (props.subaward && searchParamsTemp.dateType) {
            delete searchParamsTemp.dateType;
        }

        tabCountRequest = SearchHelper.performSpendingByAwardTabCountSearch({
            filters: searchParamsTemp.toParams(),
            subawards: props.subaward,
            auditTrail: 'Award Table - Tab Counts'
        });

        tabCountRequest.promise
            .then((res) => {
                parseTabCounts(res.data);
            })
            .catch((err) => {
                if (!isCancel(err)) {
                    setInFlight(false);
                    setError(true);
                    console.log(err);
                }
            });
    };

    const loadNextPage = () => {
    // check if request is already in-flight
        if (inFlight) {
            // in-flight, ignore this request
            return;
        }

        // check if more pages are available
        if (!lastPage) {
            // more pages are available, load them
            setPage(page + 1);
            setLoadNextPage(true);
        }
    };

    const updateSort = (field, direction) => {
        if (field === 'Action Date') {
            setSort(Object.assign({
                field: 'Sub-Award Date',
                direction
            }));
            performSearch(true);
        }
        else {
            setSort(Object.assign({
                field,
                direction
            }));
            performSearch(true);
        }
    };

    const awardIdClick = (id) => {
        Analytics.event({
            event: 'search_award_click',
            category: 'Advanced Search - Spending by Prime Award',
            action: `Clicked ${id}`,
            label: new URLSearchParams(location.search).get('hash'),
            gtm: true
        });
    };

    const subAwardIdClick = (id) => {
        Analytics.event({
            event: 'search_subaward_click',
            category: 'Advanced Search - Link',
            action: 'Subaward ID Clicked',
            label: id,
            gtm: true
        });
        props.subAwardIdClicked(true);
    };

    const availableTypes = props.subaward ? subTypes : tableTypes;
    const tabsWithCounts = availableTypes.map((type) => ({
        ...type,
        count: counts[type.internal],
        disabled: inFlight || counts[type.internal] === 0
    }));

    useEffect(throttle(() => {
        if (initialRender.current) {
            initialRender.current = false;
        }
        else if (!props.subaward) {
            performSearch();
        }
        else if (props.subaward) {
            performSearch(true);
        }
    }, 400), [tableType, sort]);

    useEffect(throttle(() => {
        if (initialRender.current === false) {
            if (props.subaward && !props.noApplied) {
                // subaward toggle changed, update the search object
                pickDefaultTab();
            }
            else if (SearchHelper.isSearchHashReady(location) && location.search) {
                // hash is (a) defined and (b) new
                pickDefaultTab();
            }
            else if (!props.subaward) {
                pickDefaultTab();
            }
        }
        return () => {
            if (searchRequest) {
                searchRequest.cancel();
            }
            if (tabCountRequest) {
                tabCountRequest.cancel();
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, 400), [props]);

    useEffect(throttle(() => {
        if (isLoadingNextPage) {
            performSearch();
            setLoadNextPage(false);
        }
    }, 400), [isLoadingNextPage]);

    useEffect(throttle(() => {
        loadColumns();
        if (SearchHelper.isSearchHashReady(location)) {
            pickDefaultTab();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, 400), []);

    useEffect(throttle(() => {
        performSearch();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, 400), [tableType, resultLimit, page]);

    if (!columns[tableType]) {
        return null;
    }

    return (
        <ResultsTableSection
            error={error}
            inFlight={inFlight}
            results={results}
            columns={columns[tableType]}
            sort={sort}
            tableTypes={tabsWithCounts}
            currentType={tableType}
            tableInstance={tableInstance}
            switchTab={switchTab}
            updateSort={updateSort}
            loadNextPage={loadNextPage}
            subaward={props.subaward}
            awardIdClick={awardIdClick}
            subAwardIdClick={subAwardIdClick}
            page={page}
            setPage={setPage}
            total={total}
            resultsLimit={resultLimit}
            setResultLimit={setResultLimit}
            resultsCount={counts[tableType]} />
    );
};

ResultsTableContainer.propTypes = propTypes;

export default connect(
    (state) => ({
        filters: state.appliedFilters.filters,
        noApplied: state.appliedFilters._empty,
        subaward: state.searchView.subaward
    }),
    (dispatch) => bindActionCreators(
        // access multiple redux actions
        Object.assign(
            {},
            searchActions,
            appliedFilterActions,
            { subAwardIdClicked }
        ),
        dispatch
    )
)(ResultsTableContainer);
