/**
 * useFetchSpendingOverTime.jsx
 * Created by Andrea Blackwell 02/26/26
 */

import { useCallback, useState, useEffect } from "react";
// eslint-disable-next-line import/no-extraneous-dependencies
import { useQuery } from "@tanstack/react-query";
import { performSpendingOverTimeSearch } from "helpers/searchHelper";
import { convertMonthToFY, convertNumToShortMonth } from "helpers/monthHelper";

export const useFetchSpendingOverTime = (apiParams, visualizationPeriod) => {
    const [parsedData, setParsedData] = useState(null);

    const {
        data, isSuccess, isLoading, error
    } = useQuery({
        queryKey: ['spendingOverTimeSearch'],
        queryFn: () => performSpendingOverTimeSearch(apiParams).promise,
        enabled: !!apiParams,
        staleTime: 60000
    });

    const generateTime = (group, timePeriod, type) => {
        const month = convertNumToShortMonth(timePeriod.month);
        const year = convertMonthToFY(timePeriod.month, timePeriod.fiscal_year);

        if (group === 'fiscal_year') {
            return type === 'label' ?
                `${timePeriod.fiscal_year}` :
                { period: null, year: timePeriod.fiscal_year };
        }
        else if (group === 'quarter') {
            return type === 'label' ?
                `Q${timePeriod.quarter} ${timePeriod.fiscal_year}` :
                { period: `Q${timePeriod.quarter}`, year: `${timePeriod.fiscal_year}` };
        }
        return type === 'label' ? `${month} ${year}` : { period: `${month}`, year: `${year}` };
    };

    const parseData = useCallback((res) => {
        const groupsLocal = [];
        const xSeriesLocal = [];
        const ySeriesLocal = [];
        const combinedLocal = [];
        const combinedOutlayLocal = [];
        const ySeriesOutlayLocal = [];

        // iterate through each response object and break it up into groups, x series, and y series
        res.results.forEach((item) => {
            groupsLocal.push(generateTime(visualizationPeriod, item.time_period, "label"));
            xSeriesLocal.push([generateTime(visualizationPeriod, item.time_period, "label")]);
            ySeriesLocal.push([parseFloat(item.aggregated_amount)]);
            combinedLocal.push(
                {
                    x: generateTime(visualizationPeriod, item.time_period, "label"),
                    y: parseFloat(item.aggregated_amount)
                }
            );
            ySeriesOutlayLocal.push([parseFloat(item.total_outlays)]);
            combinedOutlayLocal.push({
                x: generateTime(visualizationPeriod, item.time_period, "label"),
                y: parseFloat(item.total_outlays)
            });
        });

        setParsedData({
            groupsLocal,
            xSeriesLocal,
            ySeriesLocal,
            combinedLocal,
            combinedOutlayLocal,
            ySeriesOutlayLocal
        });
    }, [visualizationPeriod]);

    useEffect(() => {
        if (isSuccess && Object.keys(data?.data).length > 0) {
            parseData(data?.data);
        }
    }, [data, isSuccess, parseData]);

    return {
        parsedData, isSuccess, isLoading, error
    };
};

export default useFetchSpendingOverTime;
