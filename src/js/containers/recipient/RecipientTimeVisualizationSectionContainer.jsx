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
import Analytics from 'helpers/analytics/Analytics';
import RecipientTimeVisualizationSection from 'components/recipient/spendingOverTime/RecipientTimeVisualizationSection';

const propTypes = {
    recipient: PropTypes.object
};

const logPeriodEvent = (period) => {
    Analytics.event({
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
        this.updateVisualizationPeriod = this.updateVisualizationPeriod.bind(this);
    }

    componentDidMount() {
        this.fetchData();
        logPeriodEvent(this.state.visualizationPeriod);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.recipient.id !== this.props.recipient.id) {
            this.fetchData();
        }
    }

    updateVisualizationPeriod(visualizationPeriod) {
        this.setState({
            visualizationPeriod
        }, () => {
            this.fetchData();
            logPeriodEvent(visualizationPeriod);
        });
    }

    fetchData() {
        this.setState({
            loading: true,
            error: false
        });

        // Cancel API request if it exists
        if (this.apiRequest) {
            this.apiRequest.cancel();
        }

        const earliestYear = FiscalYearHelper.earliestFiscalYear;
        const thisYear = FiscalYearHelper.currentFiscalYear();
        const timePeriod = [
            {
                start_date: FiscalYearHelper.convertFYToDateRange(earliestYear)[0],
                end_date: FiscalYearHelper.convertFYToDateRange(thisYear)[1]
            }
        ];

        const searchParams = {
            recipient_hash: this.props.recipient.id
        };

        searchParams.time_period = timePeriod;


        // Generate the API parameters
        const apiParams = {
            group: this.state.visualizationPeriod,
            filters: searchParams
        };

        apiParams.auditTrail = 'Recipient Spending Over Time Visualization';

        this.apiRequest = SearchHelper.mockSpendingOverTimeSearch(apiParams);

        this.apiRequest.promise
            .then((res) => {
                this.parseData(res.data, this.state.visualizationPeriod);
                this.apiRequest = null;
            })
            .catch((err) => {
                if (isCancel(err)) {
                    return;
                }

                this.apiRequest = null;
                console.log(err);
                this.setState({
                    loading: false,
                    error: true
                });
            });
    }

    generateTime(group, timePeriod, type) {
        const month = MonthHelper.convertNumToShortMonth(timePeriod.month);
        const year = MonthHelper.convertMonthToFY(timePeriod.month, timePeriod.fiscal_year);

        if (group === 'fiscal_year') {
            return type === 'label' ? `FY ${timePeriod.fiscal_year}` : { period: null, year: `FY ${timePeriod.fiscal_year}` };
        }
        else if (group === 'quarter') {
            return type === 'label' ? `Q${timePeriod.quarter} ${timePeriod.fiscal_year}` : { period: `Q${timePeriod.quarter}`, year: `${timePeriod.fiscal_year}` };
        }
        return type === 'label' ? `${month} ${year}` : { period: `${month}`, year: `${year}` };
    }

    parseData(data, group) {
        const groups = [];
        const xSeries = [];
        const ySeries = [];
        const zSeries = [];
        const rawLabels = [];

        // iterate through each response object and break it up into groups, x series, and y series
        data.results.forEach((item) => {
            groups.push(this.generateTime(group, item.time_period, 'label'));
            rawLabels.push(this.generateTime(group, item.time_period, 'raw'));
            xSeries.push([this.generateTime(group, item.time_period, 'label')]);
            ySeries.push([parseFloat(item.aggregated_amount)]);
            zSeries.push(parseFloat(item.new_awards));
        });

        this.setState({
            groups,
            xSeries,
            ySeries,
            zSeries,
            rawLabels,
            loading: false,
            error: false
        });
    }
    render() {
        return (
            <RecipientTimeVisualizationSection
                data={this.state}
                loading={this.state.loading}
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
