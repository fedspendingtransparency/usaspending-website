import React, { use, useMemo, useState } from 'react';
// import PropTypes, { shape, oneOf, oneOfType } from 'prop-types';
import SearchAwardsOperation from 'models/v1/search/SearchAwardsOperation';
import { isCancel } from 'axios';
import * as MoneyFormatter from 'helpers/moneyFormatter';
import * as SearchHelper from 'helpers/searchHelper';
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
import ReadMore from '../../../components/sharedComponents/ReadMore';


const mockRows = [
    {
        award_id: "0001",
        subaward_count: 1510,
        award_generated_internal_id: "CONT_AWD_0001_9700_FA870215D0001_9700",
        subaward_obligation: 409303652.12
    },
    {
        award_id: "N0001923C0003",
        subaward_count: 1723,
        award_generated_internal_id: "CONT_AWD_N0001923C0003_9700_-NONE-_-NONE-",
        subaward_obligation: 2406096453.7
    },
    {
        award_id: "N0002416C2229",
        subaward_count: 1871,
        award_generated_internal_id: "CONT_AWD_N0002416C2229_9700_-NONE-_-NONE-",
        subaward_obligation: 552408209.26
    },
    {
        award_id: "N0002415C4301",
        subaward_count: 1974,
        award_generated_internal_id: "CONT_AWD_N0002415C4301_9700_-NONE-_-NONE-",
        subaward_obligation: 658930044.09
    },
    {
        award_id: "N0001921C0020",
        subaward_count: 2545,
        award_generated_internal_id: "CONT_AWD_N0001921C0020_9700_-NONE-_-NONE-",
        subaward_obligation: 492379269.3
    },
    {
        award_id: "W56HZV15C0095",
        subaward_count: 2676,
        award_generated_internal_id: "CONT_AWD_W56HZV15C0095_9700_-NONE-_-NONE-",
        subaward_obligation: 304424719.1
    },
    {
        award_id: "DENA0001942",
        subaward_count: 2976,
        award_generated_internal_id: "CONT_AWD_DENA0001942_8900_-NONE-_-NONE-",
        subaward_obligation: 1572986547.25
    },
    {
        award_id: "N0001920C0009",
        subaward_count: 4345,
        award_generated_internal_id: "CONT_AWD_N0001920C0009_9700_-NONE-_-NONE-",
        subaward_obligation: 419902669.32
    },
    {
        award_id: "N0002418C2106",
        subaward_count: 12407,
        award_generated_internal_id: "CONT_AWD_N0002418C2106_9700_-NONE-_-NONE-",
        subaward_obligation: 918283598.01
    },
    {
        award_id: "N0002416C2116",
        subaward_count: 45608,
        award_generated_internal_id: "CONT_AWD_N0002416C2116_9700_-NONE-_-NONE-",
        subaward_obligation: 2666421624.76
    }
];

const columnHelper = createColumnHelper();


const ExpandableTable = (props) => {
    const [data, setData] = useState(mockRows);
    const [subData, setSubData] = useState([]);
    const [isSubLoading, setIsSubLoading] = useState(false);
    const [expanded, setExpanded] = useState(ExpandedState);
    const [inFlight, setInFlight] = useState(false);
    const [error, setError] = useState(false);
    const [showSubRow, setShowSubRow] = useState(null);

    let searchRequest = null;

    const getSubTable = (awardId, rowId) => {
        
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
            "Award ID",
            "Recipient Name",
            "Award Amount",
            "Total Outlays",
            "Description",
            "Contract Award Type",
            "Recipient UEI",
            "Recipient Location",
            "Primary Place of Performance",
            "def_codes",
            "COVID-19 Obligations",
            "COVID-19 Outlays",
            "Infrastructure Obligations",
            "Infrastructure Outlays",
            "Awarding Agency",
            "Awarding Sub Agency",
            "Start Date",
            "End Date",
            "NAICS",
            "PSC",
            "recipient_id",
            "prime_award_recipient_id"
        ];

        const filters = searchParamsTemp;
        if (filters.award_ids?.length < 1) {
            filters.award_ids = [];
        }
        filters.award_ids.push(awardId);

        const params = {
            filters: filters.toParams(),
            fields: requestFields,
            page: 1,
            limit: 100,
            sort: props.isSubaward ? "Sub-Award Amount" : "Transaction Amount",
            order: "desc",
            subawards: props.isSubaward,
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

                props.setAppliedFilterCompletion(true);
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
    };

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

    const columns = useMemo(() => [
        columnHelper.accessor('award_id', {
            header: 'Prime Award ID',
            id: uniqueId(),
            cell: ({row, getValue}) => (
                <button
                    onClick={() => getSubTable(row.award_id, row.id)}
                    onKeyDown={() => getSubTable(row.award_id, row.id)}
                    role="link"
                    className="usa-button-link" >
                    <FontAwesomeIcon
                        icon={`${expanded ? "chevron-down" : "chevron-right" }`} />
                    {' '}
                    {getValue()}
                </button>
            )
        }),
        columnHelper.accessor('subaward_count', {
            header: 'Count of Subwards that Match Search Criteria',
            id: uniqueId(),
            cell: (info) => info.getValue()
        }),
        columnHelper.accessor('subaward_obligation', {
            header: 'Obligations that Match Search Criteria',
            id: uniqueId(),
            cell: (info) => MoneyFormatter.formatMoneyWithPrecision(info.getValue(), 2, "--")
        })
    ], []);

    const subColumns = useMemo(() => {
        if (props.isTransactions) {
            return [
                columnHelper.accessor('Award ID', {
                    header: 'Prime Award ID',
                    id: uniqueId(),
                    cell: ({row, getValue}) => (
                        <a
                            target="_blank"
                            rel="noopener noreferrer"
                            href={`/award/${row.generated_internal_id}`}
                            onClick={() => {
                                props.clickHandler(row['Award ID']);
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
                            props.clickHandler(row['Sub-Award ID']);
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
    }, []);

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
                                    {subTable.getRowModel().rows.map((row) => (
                                        <tr key={row.id}>
                                            {row.getVisibleCells().map((cell) => (
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

export default ExpandableTable;

