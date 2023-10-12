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
import { uniqueId, intersection } from 'lodash';
import { withRouter } from 'react-router-dom';

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
    subAwardIdClicked: PropTypes.func,
    location: PropTypes.object
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
    const [tableInstance, setTableInstance] = useState(`${uniqueId()}`);
    const initialRender = useRef(true);
    const performSearch = throttle((newSearch = false) => {
        if (searchRequest) {
            // a request is currently in-flight, cancel it
            searchRequest.cancel();
        }

        props.setAppliedFilterCompletion(false);
        const tableTypeTemp = tableType;

        // Append the current tab's award types to the search params if the Award Type filter
        // isn't populated. If it is, perform a search on the intersection of the current tab's
        // award types and the Award Type filter's content
        const searchParams = Object.assign(new SearchAwardsOperation(), this.state.searchParams);
        // generate an array of award type codes representing the current table tab we're showing
        // and use a different mapping if we're showing a subaward table vs a prime award table
        const groupsFromTableType =
            this.props.subaward ? subawardTypeGroups[tableType] : awardTypeGroups[tableType];

        if (this.state.searchParams.awardType.length === 0) {
            searchParams.awardType = groupsFromTableType;
        }
        else {
            let intersectingTypes = intersection(groupsFromTableType,
                this.state.searchParams.awardType);
            if (!intersectingTypes || intersectingTypes.length === 0) {
                // the filtered types and the table type do not align
                // in this case, send an array of non-existent types because the endpoint requires
                // an award type parameter
                intersectingTypes = ['no intersection'];
            }
            searchParams.awardType = intersectingTypes;
        }

        // indicate the request is about to start
        this.setState({
            inFlight: true,
            error: false
        });

        let pageNumber = this.state.page;
        if (newSearch) {
            // a new search (vs just getting more pages of an existing search) requires resetting
            // the page number
            pageNumber = 1;
        }
        const resultLimit = 60;

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
        const searchOrder = this.state.sort;
        let sortDirection = searchOrder.direction;
        if (!sortDirection) {
            sortDirection = 'desc';
        }

        const params = {
            filters: searchParams.toParams(),
            fields: requestFields,
            page: pageNumber,
            limit: resultLimit,
            sort: searchOrder.field,
            order: sortDirection,
            subawards: this.props.subaward
        };

        // Set the params needed for download API call
        this.searchRequest = SearchHelper.performSpendingByAwardSearch(params);
        return this.searchRequest.promise
            .then((res) => {
                const newState = {
                    inFlight: false
                };

                const parsedResults = res.data.results.map((result) => ({
                    ...result,
                    generated_internal_id: encodeURIComponent(result.generated_internal_id)
                }));

                // don't clear records if we're appending (not the first page)
                if (pageNumber <= 1 || newSearch) {
                    newState.tableInstance = `${uniqueId()}`;
                    newState.results = parsedResults;
                }
                else {
                    newState.results = this.state.results.concat(parsedResults);
                }

                // request is done
                this.searchRequest = null;
                newState.page = res.data.page_metadata.page;
                newState.lastPage = !res.data.page_metadata.hasNext;
                setInFlight(newState.inFlight);
                setTableInstance(newState.tableInstance);
                setResults(newState.results);
                setPage(newState.page);
                setLastPage(newState.lastPage);

                this.props.setAppliedFilterCompletion(true);
            })
            .catch((err) => {
                if (!isCancel(err)) {
                    this.setState({
                        inFlight: false,
                        error: true
                    });
                    this.props.setAppliedFilterCompletion(true);

                    console.log(err);
                }
            });
    }, 400);

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

    const updateFilters = throttle(() => {
        const newSearch = new SearchAwardsOperation();
        newSearch.fromState(props.filters);

        // if subawards is true, newAwardsOnly cannot be true, so we remove
        // dateType for this request; also has to be done for the tabCounts request
        if (props.subaward && newSearch.dateType) {
            delete newSearch.dateType;
        }
        setSearchParams(newSearch);
        setPage(1);
        performSearch(true);
    }, 150);

    const switchTab = (tab) => {
        const newState = {
            tableType: tab
        };

        const currentSortField = this.state.sort.field;

        // check if the current sort field is available in the table type
        const availableFields = this.state.columns[tab].data;
        if (!{}.hasOwnProperty.call(availableFields, currentSortField)) {
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
        if (newState.sort && !props.subaward) {
            setSort(Object.assign(sort, newState.sort));
        } else if (newState.sort && props.subaward) {
            setSort(newState.sort);
        }
        Analytics.event({
            category: 'Advanced Search - Table Tab',
            action: tab
        });
    };

        this.setState(newState, () => {
            this.performSearch(true);
            Analytics.event({
                category: 'Advanced Search - Table Tab',
                action: tab
            });
        });
    }

    loadNextPage() {
    // check if request is already in-flight
        if (this.state.inFlight) {
            // in-flight, ignore this request
            return;
        }

        // check if more pages are available
        if (!this.state.lastPage) {
            // more pages are available, load them
            this.setState({
                page: this.state.page + 1
            }, () => {
                this.performSearch();
            });
        }
    }

    updateSort(field, direction) {
        if (field === 'Action Date') {
            setSort({
                field: 'Sub-Award Date',
                direction
            });
            performSearch(true);
        }
        else {
            setSort({
                field,
                direction
            });
            performSearch(true);
        }
    }

    awardIdClick = (id) => {
        Analytics.event({
            category: 'Advanced Search - Spending by Prime Award',
            action: `Clicked ${id}`,
            label: new URLSearchParams(this.props.location.search).get('hash')
        });
    };

    subAwardIdClick = (id) => {
        Analytics.event({
            category: 'Advanced Search - Link',
            action: 'Subaward ID Clicked',
            label: id
        });
        this.props.subAwardIdClicked(true);
    };

    const availableTypes = props.subaward ? subTypes : tableTypes;
    const tabsWithCounts = availableTypes.map((type) => ({
        ...type,
        count: counts[type.internal],
        disabled: inFlight || counts[type.internal] === 0
    }));

    useEffect(() => {
        if (initialRender.current) {
            initialRender.current = false;
        } else {
            performSearch(true);
        }
    }, [tableType, props.subaward]);

    useEffect(throttle(() => {
        loadColumns();

        if (initialRender.current === false) {
            if (props.subaward && !props.noApplied) {
                // subaward toggle changed, update the search object
                pickDefaultTab();
            }
            else if (SearchHelper.isSearchHashReady(location) && location.search) {
                // hash is (a) defined and (b) new
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
    }, 250), [props.subaward, page, props.noApplied, location, sort]);

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
            subAwardIdClick={subAwardIdClick} />
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
)(withRouter(ResultsTableContainer));
