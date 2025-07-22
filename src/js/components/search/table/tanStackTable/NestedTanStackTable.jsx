/**
 * NestedTanStackTable.jsx
 * Created by JD House July 2, 2025
 */

import React, { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import SearchAwardsOperation from 'models/v1/search/SearchAwardsOperation';
import { isCancel } from 'axios';
import * as SearchHelper from 'helpers/searchHelper';
import { performKeywordSearch } from 'helpers/keywordHelper';
import { ColumnBuilder } from 'models/v2/search/table/ColumnBuilder';
import { subawardTypeGroups, transactionTypeGroups } from 'dataMapping/search/awardType';
import {
    useReactTable,
    getCoreRowModel,
    getFilteredRowModel,
    flexRender,
    getSortedRowModel
} from '@tanstack/react-table';
import { uniqueId } from 'lodash';
import { ErrorMessage, LoadingMessage, NoResultsMessage } from "data-transparency-ui";

const propTypes = {
    columnType: PropTypes.string,
    awardId: PropTypes.string,
    filters: PropTypes.object,
    screenReaderCaption: PropTypes.string,
    highlightedColumns: PropTypes.object
};

const NestedTanStackTable = ({
    columnType,
    awardId,
    filters,
    screenReaderCaption,
    highlightedColumns = {
        standardColumns: 9,
        highlightedColumns: 7
    }
}) => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);
    let searchRequest = null;

    // consider pull out to helper file
    const getData = () => {
        if (searchRequest) {
            // a request is currently in-flight, cancel it
            searchRequest.cancel();
        }

        // get searchParams from state
        const searchParamsTemp = new SearchAwardsOperation();
        searchParamsTemp.fromState(filters);

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
        searchParamsTemp.awardType = columnType === "subawards" ?
            subawardTypeGroups.subcontracts :
            transactionTypeGroups.transaction_contracts;

        const newFilters = searchParamsTemp;
        if (!Object.prototype.hasOwnProperty.call(newFilters, "selectedAwardIDs")) {
            newFilters.selectedAwardIDs = [];
        }
        newFilters.selectedAwardIDs.push(awardId);

        const params = {
            filters: newFilters.toParams(),
            fields: requestFields,
            page: 1,
            limit: 100,
            sort: columnType === "subawards" ? "Sub-Award Amount" : "Transaction Amount",
            order: "desc",
            subawards: true,
            auditTrail: 'Results Table - Spending by award search'
        };

        // Set the params needed for download API call
        if (!params.filters.award_type_codes) {
            return null;
        }

        if (columnType === "transactions") {
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
                setData(newState.results);
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

    const columns = useMemo(() => ColumnBuilder(
        `expanded-${columnType}`,
        () => {},
        null
    ), [columnType]);

    useEffect(() => {
        getData();
    }, [awardId]);

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel()
    });


    if (isLoading) {
        return <LoadingMessage />;
    }
    else if (error) {
        return <ErrorMessage />;
    }
    else if (data.length <= 0) {
        return <NoResultsMessage />;
    }

    return (
        <>
            <span className="table-title">{awardId}</span>
            <br />
            <span className="table-subTitle">Subawards that match search criteria</span>
            <table className="usda-table table-for-new-search-page award-results-table-dtui nested-table">
                {screenReaderCaption && (
                    <caption className="usa-dt-sr-only">{screenReaderCaption}</caption>
                )}
                {highlightedColumns
                && (
                    <colgroup>
                        <col span={highlightedColumns.standardColumns} />
                        <col span={highlightedColumns.highlightedColumns} className="usda-table__body-special-color" />
                    </colgroup>
                )}
                <thead className="usda-table__head">
                    {table.getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id} className="usda-table__row" style={{ height: 45 }}>
                            {headerGroup.headers.map((header, h) => (
                                <th key={header.id} colSpan={header.colSpan} className={`table-header ${h === 0 ? ' stickyColumn' : ''}`}>
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
                        <tr key={row.id} className="usda-table__row-item usda-table__row">
                            {row.getVisibleCells().map((cell, c) => (
                                <td key={cell.id} className={`usda-table__cell ${c === 0 ? ' stickyColumn' : ''}`}>
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
};

NestedTanStackTable.propTypes = propTypes;

export default NestedTanStackTable;

