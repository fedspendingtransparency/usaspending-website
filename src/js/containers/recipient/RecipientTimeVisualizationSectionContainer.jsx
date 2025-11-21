/**
 * RecipientTimeVisualizationSectionContainer.jsx
 * Created by Lizzie Salita 7/6/18
 */

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { isCancel } from 'axios';

import RecipientTimeVisualizationSection
    from "../../components/recipient/spendingOverTime/RecipientTimeVisualizationSection";
import Analytics from "../../helpers/analytics/Analytics";
import * as FiscalYearHelper from "../../helpers/fiscalYearHelper";
import * as SearchHelper from "../../helpers/searchHelper";
import * as RecipientHelper from "../../helpers/recipientHelper";
import * as MonthHelper from "../../helpers/monthHelper";

const dayjs = require('dayjs');

const propTypes = {
    recipient: PropTypes.object
};

const logPeriodEvent = (period) => {
    Analytics.event({
        event: 'recipient_profile_viz_time_period',
        category: 'Recipient - Time - Period',
        action: period
    });
};

const RecipientTimeVisualizationSectionContainer = ({ recipient }) => {
    const [visualizationPeriod, setVisualizationPeriod] = useState('fiscal_year');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [groups, setGroups] = useState([]);
    const [xSeries, setXSeries] = useState([]);
    const [ySeries, setYSeries] = useState([]);
    const [zSeries, setZSeries] = useState([]);
    const [rawLabels, setRawLabels] = useState([]);
    const request = useRef(null);
    const trendLineRequest = useRef(null);

    const timePeriod = useMemo(() => {
        const earliestYear = FiscalYearHelper.earliestFiscalYear;
        const thisYear = FiscalYearHelper.currentFiscalYear();
        const startDate = FiscalYearHelper.convertFYToDateRange(earliestYear)[0];
        let endDate = FiscalYearHelper.convertFYToDateRange(thisYear)[1];

        if (visualizationPeriod !== 'fiscal_year') {
            // use the end of this month
            const endOfMonth = dayjs().endOf('month');
            endDate = endOfMonth.format('YYYY-MM-DD');
        }

        return [{ start_date: startDate, end_date: endDate }];
    }, [visualizationPeriod]);

    const generateTime = (group, period, type) => {
        const month = MonthHelper.convertNumToShortMonth(period.month);
        const year = MonthHelper.convertMonthToFY(period.month, period.fiscal_year);

        if (group === 'fiscal_year') {
            return type === 'label' ?
                `FY ${period.fiscal_year}` :
                { period: null, year: `FY ${period.fiscal_year}` };
        }
        else if (group === 'quarter') {
            return type === 'label' ?
                `Q${period.quarter} FY ${period.fiscal_year}` :
                { period: `Q${period.quarter}`, year: `FY ${period.fiscal_year}` };
        }
        return type === 'label' ? `${month} ${year}` : { period: `${month}`, year: `${year}` };
    };

    const parseData = useCallback((data) => {
        const newGroups = [];
        const newXSeries = [];
        const newYSeries = [];
        const newRawLabels = [];

        // iterate through each response object and
        // break it up into visualizationPeriods, x series, and y series
        data.results.forEach((item) => {
            newGroups.push(generateTime(visualizationPeriod, item.time_period, 'label'));
            newXSeries.push([generateTime(visualizationPeriod, item.time_period, 'label')]);
            newYSeries.push([parseFloat(item.aggregated_amount)]);
            newRawLabels.push(generateTime(visualizationPeriod, item.time_period, 'raw'));
        });

        setGroups(newGroups);
        setXSeries(newXSeries);
        setYSeries(newYSeries);
        setRawLabels(newRawLabels);
        setLoading(false);
        setError(false);
    }, [visualizationPeriod]);

    const fetchData = useCallback(() => {
        setLoading(true);
        setError(false);

        // Cancel API request if it exists
        if (request.current) {
            request.current.cancel();
        }

        const searchParams = {
            recipient_id: recipient.id
        };

        searchParams.time_period = timePeriod;

        // Generate the API parameters
        const apiParams = {
            group: visualizationPeriod,
            filters: searchParams
        };

        apiParams.auditTrail = 'Recipient Spending Over Time Visualization';

        request.current = SearchHelper.performSpendingOverTimeSearch(apiParams);

        request.current.promise
            .then((res) => {
                parseData(res.data);
                request.current = null;
            })
            .catch((err) => {
                if (isCancel(err)) {
                    return;
                }

                request.current = null;
                console.log(err);
                setLoading(false);
                setError(true);
            });
    }, [parseData, recipient.id, timePeriod, visualizationPeriod]);

    const parseTrendLineData = (results) => {
        const newZSeries = [];

        // iterate through each response object and store the new awards value
        results.forEach((item) => {
            newZSeries.push(parseFloat(item.new_award_count_in_period));
        });

        setZSeries(newZSeries);
    };

    const fetchTrendLineData = useCallback(() => {
        // Cancel API request if it exists
        if (trendLineRequest.current) {
            trendLineRequest.current.cancel();
        }

        const searchParams = {
            recipient_id: recipient.id
        };

        searchParams.time_period = timePeriod;

        // Generate the API parameters
        const apiParams = {
            group: visualizationPeriod,
            filters: searchParams
        };

        trendLineRequest.current = RecipientHelper.fetchNewAwardCounts(apiParams);

        trendLineRequest.current.promise
            .then((res) => {
                parseTrendLineData(res.data.results);
                trendLineRequest.current = null;
            })
            .catch((err) => {
                if (isCancel(err)) {
                    return;
                }

                trendLineRequest.current = null;
                console.log(err);
            });
    }, [recipient.id, timePeriod, visualizationPeriod]);

    useEffect(() => {
        fetchData();
        fetchTrendLineData();
        logPeriodEvent(visualizationPeriod);
    }, [visualizationPeriod, recipient.id, fetchTrendLineData, fetchData]);

    return (
        <RecipientTimeVisualizationSection
            data={{
                xSeries, ySeries, zSeries, groups, rawLabels
            }}
            loading={loading}
            error={error}
            visualizationPeriod={visualizationPeriod}
            updateVisualizationPeriod={setVisualizationPeriod} />
    );
};

RecipientTimeVisualizationSectionContainer.propTypes = propTypes;
export default RecipientTimeVisualizationSectionContainer;
