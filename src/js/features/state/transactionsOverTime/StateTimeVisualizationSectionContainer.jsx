/**
 * StateTimeVisualizationSectionContainer.jsx
 * Created by David Trinh 5/15/18
 */

import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import {
    convertFYToDateRange, currentFiscalYear, earliestFiscalYear
} from "helpers/fiscalYearHelper";
import { convertMonthToFY, convertNumToShortMonth } from "helpers/monthHelper";
import { performSpendingOverTimeSearch } from "helpers/searchHelper";
import useQuery from "hooks/useQuery";
import StateTimeVisualizationSection from './StateTimeVisualizationSection';

const StateTimeVisualizationSectionContainer = () => {
    const { code } = useSelector((state) => state.stateProfile.overview);
    const {
        loading, error, data, fetchData
    } = useQuery();
    const [visualizationPeriod, setVisualizationPeriod] = useState('fiscal_year');
    const [groups, setGroups] = useState([]);
    const [xSeries, setXSeries] = useState([]);
    const [ySeries, setYSeries] = useState([]);
    const [combined, setCombined] = useState([]);
    const [combinedOutlay, setCombinedOutlay] = useState();
    const [ySeriesOutlay, setYSeriesOutlay] = useState([]);

    const updateVisualizationPeriod = (newVizPeriod) => {
        setVisualizationPeriod(newVizPeriod);
    };

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

    const parseData = useCallback(() => {
        const groupsLocal = [];
        const xSeriesLocal = [];
        const ySeriesLocal = [];
        const combinedLocal = [];
        const combinedOutlayLocal = [];
        const ySeriesOutlayLocal = [];

        // iterate through each response object and break it up into groups, x series, and y series
        data.results.forEach((item) => {
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

        setGroups(groupsLocal);
        setXSeries(xSeriesLocal);
        setYSeries(ySeriesLocal);
        setCombined(combinedLocal);
        setCombinedOutlay(combinedOutlayLocal);
        setYSeries(ySeriesLocal);
        setYSeriesOutlay(ySeriesOutlayLocal);
    }, [data, visualizationPeriod]);

    const beginFetch = useCallback(() => {
        // Fetch data from the Awards v2 endpoint
        const earliestYear = earliestFiscalYear;
        const thisYear = currentFiscalYear();

        const searchParams = {
            place_of_performance_locations: [
                {
                    country: 'USA',
                    state: code
                }
            ],
            time_period: [
                {
                    start_date: convertFYToDateRange(earliestYear)[0],
                    end_date: convertFYToDateRange(thisYear)[1]
                }
            ]
        };

        // Generate the API parameters
        const apiParams = {
            group: visualizationPeriod,
            filters: searchParams,
            spending_level: "transactions",
            auditTrail: 'Spending Over Time Visualization'
        };

        fetchData(performSpendingOverTimeSearch, apiParams);
    }, [code, fetchData, visualizationPeriod]);

    useEffect(() => {
        beginFetch();
    }, [code, visualizationPeriod, beginFetch]);

    useEffect(() => {
        if (data) parseData();
    }, [data, visualizationPeriod, parseData]);

    return (
        <StateTimeVisualizationSection
            data={{
                loading,
                error,
                groups,
                xSeries,
                ySeries,
                combined,
                combinedOutlay,
                ySeriesOutlay
            }}
            loading={loading}
            updateVisualizationPeriod={updateVisualizationPeriod}
            visualizationPeriod={visualizationPeriod} />
    );
};

export default StateTimeVisualizationSectionContainer;
