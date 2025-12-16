/**
 * StateTimeVisualizationSectionContainer.jsx
 * Created by David Trinh 5/15/18
 */

import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { isCancel } from 'axios';

import StateTimeVisualizationSection from
    'components/state/spendingovertime/StateTimeVisualizationSection';
import {
    convertFYToDateRange, currentFiscalYear, earliestFiscalYear
} from "helpers/fiscalYearHelper";
import { convertMonthToFY, convertNumToShortMonth } from "helpers/monthHelper";
import { performSpendingOverTimeSearch } from "helpers/searchHelper";

const StateTimeVisualizationSectionContainer = () => {
    const { code } = useSelector((state) => state.stateProfile.overview);
    const [visualizationPeriod, setVisualizationPeriod] = useState('fiscal_year');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [groups, setGroups] = useState([]);
    const [xSeries, setXSeries] = useState([]);
    const [ySeries, setYSeries] = useState([]);
    const [combined, setCombined] = useState([]);
    const [combinedOutlay, setCombinedOutlay] = useState();
    const [ySeriesOutlay, setYSeriesOutlay] = useState([]);
    const [outlayToggle, setOutlayToggle] = useState(false);

    const apiRequest = useRef(null);

    const onOutlaysToggle = () => setOutlayToggle(!outlayToggle);

    const onKeyOutlaysToggle = (e) => {
        if (e.key === 'Enter') {
            setOutlayToggle(!outlayToggle);
        }
    };

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

    const parseData = (data, group) => {
        const groupsLocal = [];
        const xSeriesLocal = [];
        const ySeriesLocal = [];
        const combinedLocal = [];
        const combinedOutlayLocal = [];
        const ySeriesOutlayLocal = [];

        // iterate through each response object and break it up into groups, x series, and y series
        data.results.forEach((item) => {
            groupsLocal.push(generateTime(group, item.time_period, "label"));
            xSeriesLocal.push([generateTime(group, item.time_period, "label")]);
            ySeriesLocal.push([parseFloat(item.aggregated_amount)]);
            combinedLocal.push(
                {
                    x: generateTime(group, item.time_period, "label"),
                    y: parseFloat(item.aggregated_amount)
                }
            );
            ySeriesOutlayLocal.push([parseFloat(item.total_outlays)]);
            combinedOutlayLocal.push({
                x: generateTime(group, item.time_period, "label"),
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
        setLoading(false);
        setError(false);
    };

    const fetchData = () => {
        setLoading(true);
        setError(false);

        // Cancel API request if it exists
        if (apiRequest.current) {
            apiRequest.current.cancel();
        }

        // Fetch data from the Awards v2 endpoint
        const earliestYear = earliestFiscalYear;
        const thisYear = currentFiscalYear();
        const timePeriod = [
            {
                start_date: convertFYToDateRange(earliestYear)[0],
                end_date: convertFYToDateRange(thisYear)[1]
            }
        ];

        const searchParams = {
            place_of_performance_locations: [
                {
                    country: 'USA',
                    state: code
                }
            ]
        };

        searchParams.time_period = timePeriod;

        // Generate the API parameters
        const apiParams = {
            group: visualizationPeriod,
            filters: searchParams,
            spending_level: "transactions"
        };

        apiParams.auditTrail = 'Spending Over Time Visualization';

        apiRequest.current = performSpendingOverTimeSearch(apiParams);

        apiRequest.current.promise
            .then((res) => {
                parseData(res.data, visualizationPeriod);
                apiRequest.current = null;
            })
            .catch((err) => {
                if (isCancel(err)) {
                    return;
                }

                apiRequest.current = null;

                console.log(err);

                setLoading(false);
                setError(true);
            });
    };

    useEffect(() => {
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [code, visualizationPeriod]);

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
            visualizationPeriod={visualizationPeriod}
            outlayToggle={outlayToggle}
            onKeyOutlaysToggle={onKeyOutlaysToggle}
            onOutlaysToggle={onOutlaysToggle} />
    );
};

export default StateTimeVisualizationSectionContainer;
