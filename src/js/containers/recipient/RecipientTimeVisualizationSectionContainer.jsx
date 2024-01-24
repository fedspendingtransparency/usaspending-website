/**
 * RecipientTimeVisualizationSectionContainer.jsx
 * Created by Lizzie Salita 7/6/18
 */

import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { isCancel } from 'axios';

import * as recipientActions from 'redux/actions/recipient/recipientActions';

import * as FiscalYearHelper from 'helpers/fiscalYearHelper';
import * as MonthHelper from 'helpers/monthHelper';
import * as SearchHelper from 'helpers/searchHelper';
import * as RecipientHelper from 'helpers/recipientHelper';
import Analytics from 'helpers/analytics/Analytics';
import RecipientTimeVisualizationSection from 'components/recipient/spendingOverTime/RecipientTimeVisualizationSection';

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

export class RecipientTimeVisualizationSectionContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            visualizationPeriod: 'fiscal_year',
            loading: true,
            error: false,
            groups: [],
            xSeries: [],
            ySeries: [],
            zSeries: []
        };

        this.request = null;
        this.trendlineRequest = null;
        this.updateVisualizationPeriod = this.updateVisualizationPeriod.bind(this);
    }

    componentDidMount() {
        this.fetchData();
        this.fetchTrendlineData();
        logPeriodEvent(this.state.visualizationPeriod);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.recipient.id !== this.props.recipient.id) {
            this.fetchData();
            this.fetchTrendlineData();
        }
    }

    updateVisualizationPeriod(visualizationPeriod) {
        this.setState({
            visualizationPeriod
        }, () => {
            this.fetchData();
            this.fetchTrendlineData();
            logPeriodEvent(visualizationPeriod);
        });
    }

    fetchData() {
        this.setState({
            loading: true,
            error: false
        });

        // Cancel API request if it exists
        if (this.request) {
            this.request.cancel();
        }

        const earliestYear = FiscalYearHelper.earliestFiscalYear;
        const thisYear = FiscalYearHelper.currentFiscalYear();
        const startDate = FiscalYearHelper.convertFYToDateRange(earliestYear)[0];
        let endDate = FiscalYearHelper.convertFYToDateRange(thisYear)[1];

        if (this.state.visualizationPeriod !== 'fiscal_year') {
            // use the end of this month
            const endOfMonth = dayjs().endOf('month');
            endDate = endOfMonth.format('YYYY-MM-DD');
        }

        const timePeriod = [
            {
                start_date: startDate,
                end_date: endDate
            }
        ];

        const searchParams = {
            recipient_id: this.props.recipient.id
        };

        searchParams.time_period = timePeriod;


        // Generate the API parameters
        const apiParams = {
            group: this.state.visualizationPeriod,
            filters: searchParams
        };

        apiParams.auditTrail = 'Recipient Spending Over Time Visualization';

        this.request = SearchHelper.performSpendingOverTimeSearch(apiParams);

        this.request.promise
            .then((res) => {
                this.parseData(res.data, this.state.visualizationPeriod);
                this.request = null;
            })
            .catch((err) => {
                if (isCancel(err)) {
                    return;
                }

                this.request = null;
                console.log(err);
                this.setState({
                    loading: false,
                    error: true
                });
            });
    }

    fetchTrendlineData() {
    // Cancel API request if it exists
        if (this.trendlineRequest) {
            this.trendlineRequest.cancel();
        }

        const earliestYear = FiscalYearHelper.earliestFiscalYear;
        const thisYear = FiscalYearHelper.currentFiscalYear();
        const startDate = FiscalYearHelper.convertFYToDateRange(earliestYear)[0];
        let endDate = FiscalYearHelper.convertFYToDateRange(thisYear)[1];

        if (this.state.visualizationPeriod !== 'fiscal_year') {
            // use the end of this month
            const endOfMonth = dayjs().endOf('month');
            endDate = endOfMonth.format('YYYY-MM-DD');
        }

        const timePeriod = [
            {
                start_date: startDate,
                end_date: endDate
            }
        ];

        const searchParams = {
            recipient_id: this.props.recipient.id
        };

        searchParams.time_period = timePeriod;

        // Generate the API parameters
        const apiParams = {
            group: this.state.visualizationPeriod,
            filters: searchParams
        };

        this.trendlineRequest = RecipientHelper.fetchNewAwardCounts(apiParams);

        this.trendlineRequest.promise
            .then((res) => {
                this.parseTrendlineData(res.data, this.state.visualizationPeriod);
                this.trendlineRequest = null;
            })
            .catch((err) => {
                if (isCancel(err)) {
                    return;
                }

                this.trendlineRequest = null;
                console.log(err);
            });
    }

    generateTime(group, timePeriod, type) {
        const month = MonthHelper.convertNumToShortMonth(timePeriod.month);
        const year = MonthHelper.convertMonthToFY(timePeriod.month, timePeriod.fiscal_year);

        if (group === 'fiscal_year') {
            return type === 'label' ? `FY ${timePeriod.fiscal_year}` : { period: null, year: `FY ${timePeriod.fiscal_year}` };
        }
        else if (group === 'quarter') {
            return type === 'label' ? `Q${timePeriod.quarter} FY ${timePeriod.fiscal_year}` : { period: `Q${timePeriod.quarter}`, year: `FY ${timePeriod.fiscal_year}` };
        }
        return type === 'label' ? `${month} ${year}` : { period: `${month}`, year: `${year}` };
    }

    parseData(data, group) {
        const groups = [];
        const xSeries = [];
        const ySeries = [];
        const rawLabels = [];

        // iterate through each response object and break it up into groups, x series, and y series
        data.results.forEach((item) => {
            groups.push(this.generateTime(group, item.time_period, 'label'));
            rawLabels.push(this.generateTime(group, item.time_period, 'raw'));
            xSeries.push([this.generateTime(group, item.time_period, 'label')]);
            ySeries.push([parseFloat(item.aggregated_amount)]);
        });

        this.setState({
            groups,
            xSeries,
            ySeries,
            rawLabels,
            loading: false,
            error: false
        });
    }

    parseTrendlineData(data) {
        const zSeries = [];

        // iterate through each response object and store the new awards value
        data.results.forEach((item) => {
            zSeries.push(parseFloat(item.new_award_count_in_period));
        });

        this.setState({
            zSeries
        });
    }

    render() {
        return (
            <RecipientTimeVisualizationSection
                data={this.state}
                loading={this.state.loading}
                error={this.state.error}
                visualizationPeriod={this.state.visualizationPeriod}
                updateVisualizationPeriod={this.updateVisualizationPeriod} />
        );
    }
}

RecipientTimeVisualizationSectionContainer.propTypes = propTypes;

export default connect(
    (state) => ({
        recipient: state.recipient
    }),
    (dispatch) => bindActionCreators(recipientActions, dispatch)
)(RecipientTimeVisualizationSectionContainer);
