import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";

import { convertMonthToFY, convertNumToShortMonth } from "../../../helpers/monthHelper";
import { formatMoneyWithPrecision } from "../../../helpers/moneyFormatter";
import BaseSpendingOverTimeRow from "../../../models/v2/search/visualizations/time/BaseSpendingOverTimeRow";
import SearchAwardsOperation from "../../../models/v1/search/SearchAwardsOperation";
import { performSpendingOverTimeSearch } from "../../../helpers/searchHelper";

const generateTimeLabel = (group, timePeriod) => {
    if (group === 'fiscal_year') {
        return timePeriod.fiscal_year;
    }
    else if (group === 'quarter') {
        return `Q${timePeriod.quarter} ${timePeriod.fiscal_year}`;
    }

    const month = convertNumToShortMonth(timePeriod.month);
    const year = convertMonthToFY(timePeriod.month, timePeriod.fiscal_year);

    return `${month} ${year}`;
};

const generateTimeRaw = (group, timePeriod) => {
    if (group === 'fiscal_year') {
        return {
            period: null,
            year: timePeriod.fiscal_year
        };
    }
    else if (group === 'quarter') {
        return {
            period: `Q${timePeriod.quarter}`,
            year: `${timePeriod.fiscal_year}`
        };
    }

    const month = convertNumToShortMonth(timePeriod.month);
    const year = convertMonthToFY(timePeriod.month, timePeriod.fiscal_year);

    return {
        period: `${month}`,
        year: `${year}`
    };
};

const parseData = (data, group) => {
    const groups = [];
    const xSeries = [];
    const ySeries = [];
    const combined = [];
    const rawLabels = [];

    if (!data) return {
        groups,
        xSeries,
        ySeries,
        combined,
        rawLabels
    };

    // iterate through each response object and break it up into groups, x series, and y series
    data.forEach((item) => {
        groups.push(generateTimeLabel(group, item.time_period));
        xSeries.push([generateTimeLabel(group, item.time_period)]);
        ySeries.push([parseFloat(item.aggregated_amount)]);
        combined.push({
            x: generateTimeLabel(group, item.time_period),
            y: parseFloat(item.aggregated_amount)
        });
        rawLabels.push(generateTimeRaw(group, item.time_period));
    });

    return {
        groups,
        xSeries,
        ySeries,
        combined,
        rawLabels
    };
};

const createTableRows = (rows, selectedTimeFrame) => {
    const tableRows = [];
    const downloadData = [];

    rows.forEach((row) => {
        const rowArray = [];
        Object.keys(row).forEach((key) => {
            if (row[key] !== false && !key.includes("raw")) {
                if (key === "month") {
                    rowArray.push(`${convertNumToShortMonth(row[key])} ${convertMonthToFY(row[key], row.fiscal_year)}`);
                }
                else if (key === "quarter") {
                    rowArray.push(`Q${row[key]} ${row.fiscal_year}`);
                }
                else if (key.includes("amount")) {
                    rowArray.push(formatMoneyWithPrecision(row[key], 0));
                }
                else if (key === "fiscal_year" && selectedTimeFrame === "fiscal_year") {
                    rowArray.push(row[key]);
                }
            }
        });
        tableRows.push(rowArray);
    });

    rows.forEach((row) => {
        const downloadDataRow = [];
        Object.keys(row).forEach((key) => {
            if (row[key] !== false && !key.includes("raw")) {
                if (key === "month") {
                    downloadDataRow.push(`${
                        convertNumToShortMonth(row[key])
                    } ${
                        convertMonthToFY(row[key], row.fiscal_year)
                    }`);
                }
                else if (key === "quarter") {
                    downloadDataRow.push(`Q${row[key]} ${row.fiscal_year}`);
                }
                else if (key.includes("amount")) {
                    downloadDataRow.push(row[key]);
                }
                else if (key === "fiscal_year" && selectedTimeFrame === "fiscal_year") {
                    downloadDataRow.push(row[key]);
                }
            }
        });
        downloadData.push(downloadDataRow);
    });

    return { tableRows, downloadData };
};

const usePerformSpendingOverTimeSearch = (group, field, direction, selectedTimeFrame) => {
    const reduxFilters = useSelector((state) => state.appliedFilters.filters);
    const spendingLevel = useSelector((state) => state.searchView.spendingLevel);

    const operation = new SearchAwardsOperation();
    operation.fromState(reduxFilters);

    // if subawards is true, newAwardsOnly cannot be true, so we remove
    // dateType for this request
    if (spendingLevel === 'subawards' && operation.dateType) {
        delete operation.dateType;
    }

    const searchParams = operation.toParams();

    // Generate the API parameters
    const params = {
        group,
        filters: searchParams,
        spending_level: spendingLevel === "subawards" ? spendingLevel : "transactions",
        auditTrail: 'Spending Over Time Visualization'
    };

    const { data, isLoading, isError} = useQuery({
        queryKey: ["performSpendingOverTimeSearch", params],
        queryFn: () => performSpendingOverTimeSearch(params).promise,
        select: (data) => data.data.results
    });

    const { tableRows, downloadData } = useMemo(() => {
        if (!data) return { tableRows: [], downloadData: [] };

        const tableData = data.map((d) => {
            const row = Object.create(BaseSpendingOverTimeRow);
            row.populate(d);
            return row;
        });

        if (direction === 'asc') {
            tableData.sort((a, b) => a[field] - b[field]);
        }

        if (direction === 'desc') {
            tableData.sort((a, b) => b[field] - a[field]);
        }

        return createTableRows(tableData, selectedTimeFrame);
    }, [data, field, direction, selectedTimeFrame]);

    const parsedData = useMemo(() => parseData(data, group) || [], [data, group]);

    return { isLoading, isError, tableRows, downloadData, parsedData };
};

export default usePerformSpendingOverTimeSearch;
