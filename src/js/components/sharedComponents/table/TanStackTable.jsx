import React, { useMemo, useState, useCallback } from 'react';
// import PropTypes, { shape, oneOf, oneOfType } from 'prop-types';
import SearchAwardsOperation from 'models/v1/search/SearchAwardsOperation';
import { isCancel } from 'axios';
import * as MoneyFormatter from 'helpers/moneyFormatter';
import * as SearchHelper from 'helpers/searchHelper';
import { subawardTypeGroups, transactionTypeGroups } from 'dataMapping/search/awardType';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    createColumnHelper,
    useReactTable,
    getCoreRowModel,
    getPaginationRowModel,
    getFilteredRowModel,
    flexRender
} from '@tanstack/react-table';
import { uniqueId } from 'lodash';
import { performKeywordSearch } from "../../../helpers/keywordHelper";
import { convertToTitleCase } from "../../../helpers/searchHelper";
import ReadMore from '../ReadMore';
import { mockRows } from './mockData';

const TanStackTable = (props) => {
    const [data, setData] = useState(mockRows);
    const [subData, setSubData] = useState([]);
    const [isSubLoading, setIsSubLoading] = useState(false);
    const [expanded, setExpanded] = useState({});
    const [inFlight, setInFlight] = useState(false);
    const [error, setError] = useState(false);
    const [showSubRow, setShowSubRow] = useState(null);
    const columnHelper = createColumnHelper();

    let searchRequest = null;

    const getSubTable = useCallback((awardId, rowId) => {
        // get subRow Data
        setIsSubLoading(true);
        if (searchRequest) {
            // a request is currently in-flight, cancel it
            searchRequest.cancel();
        }

        // get searchParams from state
        const searchParamsTemp = new SearchAwardsOperation();
        searchParamsTemp.fromState(props.filters);

        // indicate the request is about to start
        setInFlight(true);
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
        searchParamsTemp.awardType =
            props.isTransactions ? transactionTypeGroups.transaction_contracts : subawardTypeGroups.subcontracts;

        const filters = searchParamsTemp;
        if (!Object.prototype.hasOwnProperty.call(filters, "selectedAwardIDs")) {
            filters.selectedAwardIDs = [];
        }
        filters.selectedAwardIDs.push(awardId);

        const params = {
            filters: filters.toParams(),
            fields: requestFields,
            page: 1,
            limit: 100,
            sort: props.isTransactions ? "Transaction Amount" : "Sub-Award Amount",
            order: "desc",
            subawards: true,
            auditTrail: 'Results Table - Spending by award search'
        };

        // Set the params needed for download API call
        if (!params.filters.award_type_codes) {
            return null;
        }

        if (props.isTransactions) {
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
                setInFlight(newState.inFlight);
                setSubData(newState.results);

                // props.setAppliedFilterCompletion(true);
                setShowSubRow(rowId);
            })
            .catch((err) => {
                if (!isCancel(err)) {
                    setInFlight(false);
                    setError(true);
                    props.setAppliedFilterCompletion(true);
                    console.log(err);
                }
            });
    });

    const pickLocationFormat = (location) => {
        if (location?.address_line1 && location?.city_name && location?.state_code && location?.zip5) {
            return `${convertToTitleCase(location.address_line1)}, ${convertToTitleCase(location.city_name)}, ${location.state_code}, ${location.zip5}`;
        }
        else if (location?.city_name && location?.state_code && location?.zip5) {
            return `${convertToTitleCase(location.city_name)}, ${location.state_code}, ${location.zip5}`;
        }
        else if (location?.city_name && location?.state_code) {
            return `${convertToTitleCase(location.city_name)}, ${location.state_code}`;
        }
        else if (location?.state_name) {
            return `${location.state_name}, ${location.location_country_code}`;
        }
        else if (location?.city_name && location?.location_country_code) {
            return `${convertToTitleCase(location.city_name)}, ${location.location_country_code}`;
        }
        else if (location?.country_name) {
            return convertToTitleCase(location.country_name);
        }
        else if (location?.location_country_code) {
            return location.location_country_code;
        }
        return '--';
    };

    const twoVariableFormat = (object, key1, key2) => {
        if (object?.[key1] && object?.[key2]) {
            return `${object[key1]} - ${object[key2]}`;
        }

        return "--";
    };

    const mockColumns = [
        {
            header: "Prime Award ID",
            key: "award_id",
            type: "expandableButton",
            className: "",
            element: null
        },
        {
            header: 'Count of Subwards that Match Search Criteria',
            key: 'subaward_count',
            type: "alphaNumeric",
            className: "",
            element: null
        },
        {
            header: 'Obligations that Match Search Criteria',
            key: 'subaward_obligation',
            type: "formatted",
            className: "",
            element: (info) => MoneyFormatter.formatMoneyWithPrecision(info.getValue(), 2, "--")
        }
    ];

    const columns = useMemo(() => mockColumns.map((col) => {
        switch (col.type) {
            case "expandableButton":
                return columnHelper.accessor(col.key, {
                    header: col.header,
                    id: uniqueId(),
                    cell: ({ row, getValue }) => (
                        <button
                            onClick={() => getSubTable(getValue(), row.id)}
                            onKeyDown={() => getSubTable(getValue(), row.id)}
                            role="link"
                            className={`usa-button-link ${col.className ? col.className : ''}`} >
                            <FontAwesomeIcon
                                icon={`${expanded ? "chevron-down" : "chevron-right"}`} />
                            {' '}
                            {getValue()}
                        </button>
                    )
                });
            case "formatted":
                return columnHelper.accessor(col.key, {
                    header: col.header,
                    id: uniqueId(),
                    cell: col.element
                });
            case "link":
                return columnHelper.accessor(col.key, {
                    header: col.header,
                    id: uniqueId(),
                    cell: ({ getValue }) => (
                        <a
                            target="_blank"
                            rel="noopener noreferrer"
                            href={col.link}
                            onClick={col.onClick}>{getValue()}
                        </a>
                    )
                });
            default:
                return columnHelper.accessor(col.key, {
                    header: col.header,
                    id: uniqueId(),
                    cell: (info) => info.getValue()
                });
        }
    }), []);

    // const columns = useMemo(() => [
    //     columnHelper.accessor('award_id', {
    //         header: 'Prime Award ID',
    //         id: uniqueId(),
    //         cell: ({ row, getValue }) => (
    //             <button
    //                 onClick={() => getSubTable(getValue(), row.id)}
    //                 onKeyDown={() => getSubTable(getValue(), row.id)}
    //                 role="link"
    //                 className="usa-button-link" >
    //                 <FontAwesomeIcon
    //                     icon={`${expanded ? "chevron-down" : "chevron-right"}`} />
    //                 {' '}
    //                 {getValue()}
    //             </button>
    //         )
    //     }),
    //     columnHelper.accessor('subaward_count', {
    //         header: 'Count of Subwards that Match Search Criteria',
    //         id: uniqueId(),
    //         cell: (info) => info.getValue()
    //     }),
    //     columnHelper.accessor('subaward_obligation', {
    //         header: 'Obligations that Match Search Criteria',
    //         id: uniqueId(),
    //         cell: (info) => MoneyFormatter.formatMoneyWithPrecision(info.getValue(), 2, "--")
    //     })
    // ], []);

    const subColumns = useMemo(() => {
        if (props.isTransactions) {
            return [
                columnHelper.accessor('Award ID', {
                    header: 'Prime Award ID',
                    id: uniqueId(),
                    cell: ({ row, getValue }) => (
                        <a
                            target="_blank"
                            rel="noopener noreferrer"
                            href={`/award/${row.generated_internal_id}`}
                            onClick={() => {
                                props.clickHandler(getValue());
                            }}>{getValue()}
                        </a>
                    )
                }),
                columnHelper.accessor('Mod', {
                    header: 'Modification Number',
                    id: uniqueId(),
                    cell: (info) => info.getValue()
                }),
                columnHelper.accessor('Recipient Name', {
                    header: 'Recipient Name',
                    id: uniqueId(),
                    cell: (info) => info.getValue()
                }),
                columnHelper.accessor('Transaction Amount', {
                    header: 'Obligations',
                    id: uniqueId(),
                    cell: (info) => MoneyFormatter.formatMoneyWithPrecision(info.getValue(), 2, "--")
                }),
                columnHelper.accessor('Action Date', {
                    header: 'Action Date',
                    id: uniqueId(),
                    cell: (info) => info.getValue()
                }),
                columnHelper.accessor('Transaction Description', {
                    header: 'Transaction Description',
                    id: uniqueId(),
                    cell: (info) => (
                        <ReadMore
                            text={info.getValue() || '--'}
                            limit={90} />
                    )
                }),
                columnHelper.accessor('Action Type', {
                    header: 'Action Type',
                    id: uniqueId(),
                    cell: (info) => info.getValue()
                }),
                columnHelper.accessor('Award Type', {
                    header: 'Award Type',
                    id: uniqueId(),
                    cell: (info) => info.getValue()
                }),
                columnHelper.accessor('Recipient Location', {
                    header: 'Recipient Location',
                    id: uniqueId(),
                    cell: (info) => pickLocationFormat(info.getValue())
                }),
                columnHelper.accessor('Primary Place of Performance', {
                    header: 'Primary Place of Performance',
                    id: uniqueId(),
                    cell: (info) => pickLocationFormat(info.getValue())
                }),
                columnHelper.accessor('Awarding Agency', {
                    header: 'Awarding Agency',
                    id: uniqueId(),
                    cell: (info) => info.getValue()
                }),
                columnHelper.accessor('Awarding Sub Agency', {
                    header: 'Awarding Sub Agency',
                    id: uniqueId(),
                    cell: (info) => info.getValue()
                }),
                columnHelper.accessor('NAICS', {
                    header: 'North American Industry Classification System (NAICS)',
                    id: uniqueId(),
                    cell: (info) => (
                        <ReadMore
                            text={twoVariableFormat(info.getValue(), 'code', 'description')}
                            limit={80} />
                    )
                }),
                columnHelper.accessor('PSC', {
                    header: 'Product and Service Code (PSC)',
                    id: uniqueId(),
                    cell: (info) => (
                        <ReadMore
                            text={twoVariableFormat(info.getValue(), 'code', 'description')}
                            limit={90} />
                    )
                })
            ];
        }

        return [
            columnHelper.accessor('Sub-Award ID', {
                header: 'Subaward ID',
                id: uniqueId(),
                cell: ({ row, getValue }) => (
                    <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href={`/award/${row.prime_award_generated_internal_id}`}
                        onClick={() => {
                            props.clickHandler(getValue());
                        }}>{getValue()}
                    </a>
                )
            }),
            columnHelper.accessor('Sub-Awardee Name', {
                header: 'Subrecipient Name',
                id: uniqueId(),
                cell: (info) => info.getValue()
            }),
            columnHelper.accessor('Sub-Award Amount', {
                header: 'Subaward Obligations',
                id: uniqueId(),
                cell: (info) => MoneyFormatter.formatMoneyWithPrecision(info.getValue(), 2, "--")
            }),
            columnHelper.accessor('Sub-Award Date', {
                header: 'Subaward Action Date',
                id: uniqueId(),
                cell: (info) => info.getValue()
            }),
            columnHelper.accessor('Sub-Award Description', {
                header: 'Subaward Description',
                id: uniqueId(),
                cell: (info) => (
                    <ReadMore
                        text={info.getValue() || '--'}
                        limit={90} />
                )
            }),
            columnHelper.accessor('Sub-Recipient UEI', {
                header: 'Subrecipient UEI',
                id: uniqueId(),
                cell: (info) => info.getValue()
            }),
            columnHelper.accessor('Sub-Recipient Location', {
                header: 'Subrecipient Location',
                id: uniqueId(),
                cell: (info) => pickLocationFormat(info.getValue())
            }),
            columnHelper.accessor('Sub-Award Primary Place of Performance', {
                header: 'Subaward Primary Place of Performance',
                id: uniqueId(),
                cell: (info) => pickLocationFormat(info.getValue())
            }),
            columnHelper.accessor('Sub-Award Type', {
                header: 'Subaward Type',
                id: uniqueId(),
                cell: (info) => convertToTitleCase(info.getValue())
            })
        ];
    }, [columnHelper, props]);

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getFilteredRowModel: getFilteredRowModel()
    });

    const subTable = useReactTable({
        data: subData,
        columns: subColumns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getFilteredRowModel: getFilteredRowModel()
    });

    return (
        <table className="usda-table table-for-new-search-page expandable-table">
            <thead>
                {table.getHeaderGroups().map((headerGroup) => (
                    <tr key={headerGroup.id} className="usda-table__row">
                        {headerGroup.headers.map((header) => (
                            <th key={header.id}>
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
                    <tr key={row.id}>
                        {row.getVisibleCells().map((cell) => (
                            <td key={cell.id}>
                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </td>
                        ))}

                        {(showSubRow && showSubRow === row.id) &&
                            <table className="usda-table table-for-new-search-page expandable-table">
                                <thead>
                                    {subTable.getHeaderGroups().map((headerGroup) => (
                                        <tr key={headerGroup.id} className="usda-table__row">
                                            {headerGroup.headers.map((header) => (
                                                <th key={header.id}>
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
                                    {subTable.getRowModel().rows.map((r) => (
                                        <tr key={r.id}>
                                            {r.getVisibleCells().map((cell) => (
                                                <td key={cell.id}>
                                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        }
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

// ExpandableTable.propTypes = propTypes;

export default TanStackTable;

