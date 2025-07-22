/**
 * TanStackTable.jsx
 * Created by JD House July 2, 2025
 */

import React, { useEffect, useMemo, useState } from 'react';
import PropTypes, { shape, oneOf } from 'prop-types';
import SearchAwardsOperation from 'models/v1/search/SearchAwardsOperation';
import { isCancel } from 'axios';
import * as SearchHelper from 'helpers/searchHelper';
import { performKeywordSearch } from 'helpers/keywordHelper';
import { subawardTypeGroups, transactionTypeGroups } from 'dataMapping/search/awardType';
import {
    useReactTable,
    getCoreRowModel,
    getFilteredRowModel,
    flexRender,
    getSortedRowModel
} from '@tanstack/react-table';
import { uniqueId } from 'lodash';
import { ColumnBuilder } from 'models/v2/search/table/ColumnBuilder';
import { Pagination } from "data-transparency-ui";
import ResultsTable from '../ResultsTable';
// import NestedTanStackTable from './NestedTanStackTable';


const propTypes = {
    columnType: PropTypes.string,
    data: PropTypes.array,
    subCols: PropTypes.object,
    sort: shape({
        direction: oneOf(['asc', 'desc']),
        field: PropTypes.string
    }),
    updateSort: PropTypes.func,
    isMobile: PropTypes.bool,
    newMobileView: PropTypes.bool,
    subaward: PropTypes.bool,
    currentType: PropTypes.string
};

const TanStackTable = (props) => {
    const [awardId, setAwardId] = useState(null);
    const [expanded, setExpanded] = useState({});
    const [subData, setSubData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);
    let columnSubType = props.currentType;
    let searchRequest = null;

    // need to pull out of here to helper or up to Container lv
    const getSubData = (id) => {
        if (searchRequest) {
            // a request is currently in-flight, cancel it
            searchRequest.cancel();
        }

        // get searchParams from state
        const searchParamsTemp = new SearchAwardsOperation();
        searchParamsTemp.fromState(props.filters);

        // indicate the request is about to start
        setIsLoading(true);
        setError(false);

        const requestFields = [
            "Sub-Award ID",
            "Sub-Awardee Name",
            "Sub-Award Amount",
            "Sub-Award Date",
            "Sub-Award Description",
            "Sub-Recipient UEI",
            "Sub-Recipient Location",
            "Sub-Award Primary Place of Performance",
            "Sub-Award Type",
            "Prime Award ID",
            "Prime Recipient Name",
            "Prime Award Recipient UEI",
            "Awarding Agency",
            "Awarding Sub Agency",
            "NAICS",
            "PSC",
            "recipient_id",
            "prime_award_recipient_id"
        ];

        // needs to be dynamic but for now we will go with defaults
        searchParamsTemp.awardType = props.columnType === "subawards" ?
            subawardTypeGroups.subcontracts :
            transactionTypeGroups.transaction_contracts;

        const newFilters = searchParamsTemp;
        if (!Object.prototype.hasOwnProperty.call(newFilters, "selectedAwardIDs")) {
            newFilters.selectedAwardIDs = [];
        }
        newFilters.selectedAwardIDs.push(id);

        const params = {
            filters: newFilters.toParams(),
            fields: requestFields,
            page: 1,
            limit: 10,
            sort: props.columnType === "subawards" ? "Sub-Award Amount" : "Transaction Amount",
            order: "desc",
            subawards: true,
            auditTrail: 'Results Table - Spending by award search'
        };

        // Set the params needed for download API call
        if (!params.filters.award_type_codes) {
            return null;
        }

        if (props.columnType === "transactions") {
            params.fields = [
                "Award ID",
                "Mod",
                "Recipient Name",
                "Transaction Amount",
                "Action Date",
                "Transaction Description",
                "Action Type",
                "Award Type",
                "Recipient UEI",
                "Recipient Location",
                "Primary Place of Performance",
                "Awarding Agency",
                "awarding_agency_id",
                "Awarding Sub Agency",
                "NAICS",
                "PSC",
                "Assistance Listing"
            ];

            searchRequest = performKeywordSearch(params);
        }
        else {
            searchRequest = SearchHelper.performSpendingByAwardSearch(params);
        }

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

                // request is done
                searchRequest = null;
                newState.page = res.data.page_metadata.page;
                newState.lastPage = !res.data.page_metadata.hasNext;
                setSubData(newState.results);
                setIsLoading(false);
            })
            .catch((err) => {
                if (!isCancel(err)) {
                    setError(true);
                    setIsLoading(false);
                    console.log(err);
                }
            });
    };

    const toggleSubData = (id, rowId) => {
        if (props.toggleSubData) {
            props.toggleSubData(id);
        }
        else {
            getSubData(id);
        }

        if (Object.hasOwn(expanded, rowId)) {
            // assume row is expanded and needs unexpanded
            const newExpanded = { ...expanded };
            delete newExpanded[rowId];
            setAwardId(id);
            setExpanded(newExpanded);
            return null;
        }
        setAwardId(id);
        setExpanded((prevState) => ({
            ...prevState,
            [rowId]: true
        }));

        return true;
    };

    // const togglePrimeAward = (primeAwardId, rowId) => {
    //     console.log("togglePrimeAward called rowId", rowId);
    //     if (Object.hasOwn(expanded, rowId)) {
    //         // assume row is expanded and needs unexpanded
    //         const newExpanded = { ...expanded };
    //         delete newExpanded[rowId];
    //         setAwardId(null);
    //         setExpanded(newExpanded);
    //         return null;
    //     }
    //     setAwardId(primeAwardId);
    //     setExpanded((prevState) => ({
    //         ...prevState,
    //         [rowId]: true
    //     }));
    //     return awardId;
    // };

    const columns = useMemo(() => ColumnBuilder(
        props.columnType,
        // togglePrimeAward,
        toggleSubData,
        expanded
    ), [props.columnType, expanded]);

    const table = useReactTable({
        data: props.data,
        columns,
        state: {
            expanded
        },
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel()
    });

    useEffect(() => {
        // need to pull out of here to helper or up to Container lv
        if (props.columnType === "subawards") {
            if (props.currentType === "grants") {
                columnSubType = 'subgrants';
            }
            columnSubType = 'subcontracts';
        } else {
            columnSubType = [`transaction_${props.currentType}`];
        }
    }, [subData]);

    return (
        <>
            <div
                className="advanced-search__table-wrapper expandable"
                id="advanced-search__table-wrapper"
                style={props.resultsCount >= props.resultsLimit ? { height: '638px' } : {}}>
                <table className="usda-table table-for-new-search-page award-results-table-dtui">
                    <thead className="usda-table__head">
                        {table.getHeaderGroups().map((headerGroup) => (
                            <tr key={headerGroup.id} className="usda-table__row" style={{ height: 45 }}>
                                {headerGroup.headers.map((header, h) => (
                                    <th key={header.id} className={`table-header ${h === 0 ? ' stickyColumn' : ''}`}>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody className="usda-table__body">
                        {table.getRowModel().rows.map((row) => (
                            <React.Fragment key={uniqueId()}>
                                <tr key={row.id} className={`usda-table__row-item usda-table__row ${row.getIsExpanded() ? "expaned-table-parent__sticky" : ""}`}>
                                    {row.getVisibleCells().map((cell, c) => (
                                        <td key={cell.id} className={`usda-table__cell ${c === 0 ? ' stickyColumn' : ''}`}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </td>
                                    ))}
                                </tr>

                                {row.getIsExpanded() && (
                                    <tr className="expaned-table-container">
                                        <td colSpan={row.getAllCells().length} className="expaned-table-container__outer-cell">
                                            {/* <NestedTanStackTable
                                                {...props}
                                                awardId={awardId} /> */}
                                            <>
                                                <span className="table-title">{awardId}</span>
                                                <br />
                                                <span className="table-subTitle">{`${props.columnType === "subawards" ? 'Subawards' : 'Transacitions'} that match search criteria`}</span>
                                                <ResultsTable
                                                    {...props}
                                                    results={subData}
                                                    currentType={columnSubType}
                                                    spendingLevel={props.columnType}
                                                    columns={props.subColumnOptions[columnSubType]}
                                                    isLoading={isLoading}
                                                    error={error}
                                                    resultsLimit={10} />
                                            </>
                                        </td>
                                    </tr>
                                )}
                            </React.Fragment>
                        ))}
                    </tbody>
                </table>
            </div>
            <Pagination
                resultsText
                limitSelector
                hideLast={props.resultsCount >= 50000}
                currentPage={props.page}
                pageSize={props.resultsLimit}
                changePage={props.setPage}
                changeLimit={props.setResultLimit}
                totalItems={props.resultsCount} />
        </>
    );
};

TanStackTable.propTypes = propTypes;

export default TanStackTable;

