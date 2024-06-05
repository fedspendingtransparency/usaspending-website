/**
 * AccountAwardsContainer.jsx
 * Created by Kevin Li 4/13/17
 */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { isCancel } from 'axios';
import { uniqueId } from 'lodash';

import { measureTableHeader } from 'helpers/textMeasurement';

import { awardTableColumnTypes } from 'dataMapping/search/awardTableColumnTypes';
import { awardTypeGroups } from 'dataMapping/search/awardType';
import * as SearchHelper from 'helpers/searchHelper';
import { defaultColumns, defaultSort } from 'dataMapping/search/awardTableColumns';
import AccountAwardSearchOperation from 'models/v1/account/queries/AccountAwardSearchOperation';
import ResultsTableSection from 'components/search/table/ResultsTableSection';
import { tableTypes, subTypes } from 'containers/search/table/ResultsTableContainer';

const propTypes = {
    account: PropTypes.object,
    filters: PropTypes.object,
    subaward: PropTypes.bool
};

const AccountAwardsContainer = (props) => {
    let tabCountRequest = null;
    let searchRequest = null;
    const [tableInstance, setTableInstance] = useState(`${uniqueId()}`);
    const [columns, setColumns] = useState({});
    const [sort, setSort] = useState({
        field: 'Award Amount',
        direction: 'desc'
    });
    const [counts, setCounts] = useState({});
    const [tableType, setTableType] = useState('contracts');
    const [inFlight, setInFlight] = useState(true);
    const [lastPage, setLastPage] = useState(true);
    const [page, setPage] = useState(1);
    const [results, setResults] = useState([]);
    const [error, setError] = useState(false);
    const [total, setTotal] = useState(0);
    const [resultLimit, setResultLimit] = useState(10);
    const [isLoadingNextPage, setLoadNextPage] = useState(false);
    // eslint-disable-next-line no-unused-vars
    const [searchParams, setSearchParams] = useState(new AccountAwardSearchOperation());

    const performSearch = (newSearch = false) => {
        if (searchRequest) {
            // a request is currently in-flight, cancel it
            searchRequest.cancel();
        }

        // create a search operation instance from the Redux filters using the account ID
        const searchOperation = new AccountAwardSearchOperation(props.account.id);
        searchOperation.fromState(props.filters);
        searchOperation.awardType = awardTypeGroups[tableType];
        const newParams = searchOperation.spendingByAwardTableParams(props);
        // indicate the request is about to start
        setInFlight(true);
        setError(false);
        let pageNumber = page;
        if (newSearch) {
            // a new search (vs just getting more pages of an existing search) requires resetting
            // the page number
            pageNumber = 1;
        }
        newParams.filters.award_type_codes = awardTypeGroups[tableType];

        const requestFields = [];

        // Request fields for visible columns only
        const columnVisibility = columns[tableType].visibleOrder;

        columnVisibility.forEach((field) => {
            if (!requestFields.includes(field)) {
                // Prevent duplicates in the list of fields to request
                requestFields.push(field);
            }
        });

        requestFields.push('recipient_id');

        newParams.fields = requestFields;
        newParams.limit = resultLimit;
        newParams.order = sort.direction;
        newParams.page = pageNumber;
        // sort field
        newParams.sort = sort.field;

        // Set the params needed for download API call
        searchRequest = SearchHelper.performSpendingByAwardSearch(newParams);
        searchRequest.promise
            .then((res) => {
                const newState = {
                    inFlight: false
                };
                const parsedResults = res.data.results.map((result) => ({
                    ...result,
                    generated_internal_id: encodeURIComponent(result.generated_internal_id)
                }));
                // don't clear records if we're appending (not the first page)
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
            })
            .catch((err) => {
                if (!isCancel(err)) {
                    setInFlight(false);
                    setError(true);
                    searchRequest = null;
                    console.log(err);
                }
            });
    };
    const updateFilters = () => {
        // the searchParams state var is now only used in the
        // block using intersection in performSearch
        const newSearch = new AccountAwardSearchOperation();
        newSearch.fromState(props.filters);
        setSearchParams(newSearch);

        setPage(1);
        performSearch(true);
    };
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

        const searchOperation = new AccountAwardSearchOperation(props.account.id);
        searchOperation.fromState(props.filters);
        searchOperation.awardType = awardTypeGroups[tableType];
        const searchParamsTemp = searchOperation.spendingByAwardTableParams(props);
        const filters = { ...searchParamsTemp.filters };
        tabCountRequest = SearchHelper.performSpendingByAwardTabCountSearch({
            filters,
            subawards: false
        });

        tabCountRequest.promise
            .then((res) => {
                parseTabCounts(res.data);
                tabCountRequest = null;
            })
            .catch((err) => {
                if (!isCancel(err)) {
                    setInFlight(false);
                    setError(true);
                    tabCountRequest = null;
                    console.log(err);
                }
            });
    };

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
            defaultDirection: direction
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
        setSort(Object.assign({
            field,
            direction
        }));
        performSearch(true);
    };

    useEffect(() => {
        loadColumns();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        pickDefaultTab();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.filters]);

    useEffect(() => {
        if (isLoadingNextPage) {
            performSearch();
            setLoadNextPage(false);
        }
    }, [isLoadingNextPage]);

    useEffect(() => {
        performSearch();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tableType, resultLimit, page]);

    if (Object.keys(columns).length === 0) {
        return null;
    }
    const tabsWithCounts = tableTypes.map((type) => ({
        ...type,
        count: counts[type.internal],
        disabled: inFlight || counts[type.internal] === 0
    }));
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
            page={page}
            setPage={setPage}
            total={total}
            resultsLimit={resultLimit}
            setResultLimit={setResultLimit}
            resultsCount={counts[tableType]} />
    );
};

AccountAwardsContainer.propTypes = propTypes;

export default connect(
    (state) => ({
        account: state.account.account,
        filters: state.account.filters
    })
)(AccountAwardsContainer);
