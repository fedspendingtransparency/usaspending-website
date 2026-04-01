/**
 * ResultsTableContainer.jsx
 * Created by Kevin Li 11/8/16
 **/

import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect, useDispatch, useSelector } from 'react-redux';
import { throttle } from 'lodash-es';
import { subAwardIdClicked } from 'redux/actions/search/searchSubAwardTableActions';
import Analytics from 'helpers/analytics/Analytics';
import { tableTypes, subTypes, transactionTypes } from 'dataMapping/search/resultsView/table';
import {
    defaultColumns,
    defaultSort
} from 'dataMapping/search/awardTableColumns';
import { awardTableColumnTypes } from 'dataMapping/search/awardTableColumnTypes';
import { measureTableHeader } from 'helpers/textMeasurement';
import ResultsTableSection from 'components/search/resultsView/table/ResultsTableSection';
import searchActions from 'redux/actions/searchActions';
import * as appliedFilterActions from 'redux/actions/search/appliedFilterActions';
import SearchSectionWrapper from
    "components/search/resultsView/SearchSectionWrapper/SearchSectionWrapper";
import useResultsTableSearch from './useResultsTableSearch';

const propTypes = {
    setAppliedFilterCompletion: PropTypes.func,
    noApplied: PropTypes.bool,
    tabData: PropTypes.object,
    spendingLevel: PropTypes.string,
    hash: PropTypes.string,
    sectionTitle: PropTypes.string,
    dsmContent: PropTypes.element,
    sectionName: PropTypes.string
};

const ResultsTableContainer = ({
    setAppliedFilterCompletion,
    noApplied,
    tabData,
    spendingLevel,
    hash,
    sectionTitle,
    dsmContent,
    sectionName
}) => {
    const location = useLocation();
    const { filters } = useSelector((state) => state.appliedFilters);
    const dispatch = useDispatch();
    const [page, setPage] = useState(1);
    const [tableType, setTableType] = useState();
    const [sort, setSort] = useState({
        field: 'Award Amount',
        direction: 'desc'
    });
    const [resultLimit, setResultLimit] = useState(100);
    const [isLoadingNextPage, setLoadNextPage] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    const isSubaward = spendingLevel === "subawards";
    const loadExpandableData = (isSubaward && spendingLevel === "awards" && !isMobile);
    const counts = tabData.results;

    const {
        isLoading,
        error,
        results,
        total,
        tableInstance,
        lastPage
    } = useResultsTableSearch(
        filters,
        tableType,
        spendingLevel,
        resultLimit,
        sort,
        loadExpandableData,
        page
    );

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

    // in the future, this will be an API call, but for now, read the local data file
    // load every possible table column up front, so we don't need to deal with this when
    // switching tabs
    const columns = tableTypes
        .concat(subTypes)
        .concat(transactionTypes)
        .reduce((cols, type) => {
            const visibleColumns = defaultColumns(type.internal).map((data) => data.title);
            const parsedColumns = defaultColumns(type.internal)
                .reduce((parsedCols, data) => Object.assign({}, parsedCols, {
                    [data.title]: createColumn(data)
                }), {});

            return Object.assign(cols, {
                [type.internal]: {
                    visibleOrder: visibleColumns,
                    data: parsedColumns
                }
            });
        }, {});

    const updateFilters = throttle(() => setPage(1), 350);

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

    const parseTabCounts = () => {
        let firstAvailable = '';
        let i = 0;
        let availableTabs = tableTypes;

        if (isSubaward) {
            availableTabs = subTypes;
        }

        // Set the first available award type to the first non-zero entry in the
        while (firstAvailable === '' && i < availableTabs.length) {
            const tableTypeTemp = availableTabs[i].internal;

            if (counts[tableTypeTemp] > 0) {
                firstAvailable = tableTypeTemp;
            }

            i += 1;
        }

        // If none of the award types are populated, set the first available tab to be the
        // first tab in the table
        if (firstAvailable === '') {
            firstAvailable = availableTabs[0].internal;
        }

        switchTab(firstAvailable);
        updateFilters();
    };


    const loadNextPage = () => {
        // check if request is already in-flight
        if (isLoading) {
            // in-flight, ignore this request
            return;
        }

        // check if more pages are available
        if (!lastPage) {
            // more pages are available, load them
            setPage((prevState) => prevState + 1);
            setLoadNextPage(true);
        }
    };

    const updateSort = (field, direction) => setSort({ field, direction });

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
        dispatch(subAwardIdClicked(true));
    };

    const availableTypes = isSubaward ? subTypes : tableTypes;

    const tabsWithCounts = availableTypes.map((type) => ({
        ...type,
        count: counts[type.internal],
        disabled: counts[type.internal] === 0
    }));

    const formattedSubSort = () => {
        const formattedSort = sort;
        if (formattedSort?.field === 'Sub-Award Date') {
            formattedSort.field = "Action Date";
        }

        return formattedSort;
    };

    useEffect(() => {
        parseTabCounts(tabData);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tabData]);

    useEffect(throttle(() => {
        if (isLoadingNextPage) {
            setLoadNextPage(false);
        }
    }, 400), [isLoadingNextPage]);

    if (!columns[tableType]) {
        return null;
    }

    return (
        <SearchSectionWrapper
            isError={error}
            isLoading={isLoading}
            noData={total === 0}
            hash={hash}
            spendingLevel={spendingLevel}
            sort={sort}
            setSort={setSort}
            onToggle={() => {}}
            showToggle={() => {}}
            tableColumns={columns[tableType]}
            sectionTitle={sectionTitle}
            dsmContent={dsmContent}
            sectionName={sectionName}
            manualSort>
            <ResultsTableSection
                error={error}
                inFlight={isLoading}
                results={loadExpandableData ? [] : results}
                columns={columns[tableType]}
                sort={spendingLevel !== 'transactions' ? formattedSubSort() : sort}
                tableTypes={tabsWithCounts}
                currentType={tableType}
                tableInstance={tableInstance}
                switchTab={switchTab}
                updateSort={updateSort}
                loadNextPage={loadNextPage}
                spendingLevel={spendingLevel}
                awardIdClick={awardIdClick}
                subAwardIdClick={subAwardIdClick}
                page={page}
                setPage={setPage}
                total={total}
                resultsLimit={resultLimit}
                setResultLimit={setResultLimit}
                resultsCount={counts[tableType]}
                showToggle={() => {}}
                expandableData={loadExpandableData ? results : []}
                filters={filters}
                checkMobile={(isMobileState) => setIsMobile(isMobileState)}
                columnType={spendingLevel}
                subColumnOptions={columns} />
        </SearchSectionWrapper>
    );
};

ResultsTableContainer.propTypes = propTypes;

export default connect(
    (state) => ({
        noApplied: state.appliedFilters._empty
    }),
    (dispatch) => bindActionCreators(
        // access multiple redux actions
        Object.assign(
            {},
            searchActions,
            appliedFilterActions
        ),
        dispatch
    )
)(ResultsTableContainer);
