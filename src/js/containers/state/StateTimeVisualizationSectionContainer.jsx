/**
 * StateTimeVisualizationSectionContainer.jsx
 * Created by David Trinh 5/15/18
 */

import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { isCancel } from 'axios';


import StateTimeVisualizationSection from
    'components/state/spendingovertime/StateTimeVisualizationSection';

import * as stateActions from 'redux/actions/state/stateActions';

import * as FiscalYearHelper from 'helpers/fiscalYearHelper';
import * as MonthHelper from 'helpers/monthHelper';
import * as SearchHelper from 'helpers/searchHelper';


const propTypes = {
    stateProfile: PropTypes.object
};

export class StateTimeVisualizationSectionContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            visualizationPeriod: 'fiscal_year',
            loading: true,
            error: false,
            groups: [],
            xSeries: [],
            ySeries: [],
            ySeriesOutlay: [],
            outlayToggle: false
        };

        this.apiRequest = null;
        this.updateVisualizationPeriod = this.updateVisualizationPeriod.bind(this);
        this.onOutlaysToggle = this.onOutlaysToggle.bind(this);
        this.onKeyOutlaysToggle = this.onKeyOutlaysToggle.bind(this);
    }

    componentDidMount() {
        this.fetchData();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.stateProfile.overview.code !== this.props.stateProfile.overview.code) {
            this.fetchData();
        }
    }

    onOutlaysToggle = () => {
        this.setState({
            outlayToggle: !this.state.outlayToggle
        });
    };

    onKeyOutlaysToggle = (event) => {
        if (event.key === 'Enter') {
            this.setState({
                outlayToggle: !this.state.outlayToggle
            });
        }
    };

    updateVisualizationPeriod(visualizationPeriod) {
        this.setState({
            visualizationPeriod
        }, () => {
            this.fetchData();
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

        // Fetch data from the Awards v2 endpoint
        const earliestYear = FiscalYearHelper.earliestFiscalYear;
        const thisYear = FiscalYearHelper.currentFiscalYear();
        const timePeriod = [
            {
                start_date: FiscalYearHelper.convertFYToDateRange(earliestYear)[0],
                end_date: FiscalYearHelper.convertFYToDateRange(thisYear)[1]
            }
        ];

        const searchParams = {
            place_of_performance_locations: [
                {
                    country: 'USA',
                    state: this.props.stateProfile.overview.code
                }
            ]
        };

        searchParams.time_period = timePeriod;

        // Generate the API parameters
        const apiParams = {
            group: this.state.visualizationPeriod,
            filters: searchParams,
            spending_level: "awards"
        };

        apiParams.auditTrail = 'Spending Over Time Visualization';

        this.apiRequest = SearchHelper.performSpendingOverTimeSearch(apiParams);

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
            return type === 'label' ? `${timePeriod.fiscal_year}` : { period: null, year: timePeriod.fiscal_year };
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
        const ySeriesOutlay = [];
        const rawLabels = [];

        // iterate through each response object and break it up into groups, x series, and y series
        data.results.forEach((item) => {
            groups.push(this.generateTime(group, item.time_period, "label"));
            rawLabels.push(this.generateTime(group, item.time_period, "raw"));
            xSeries.push([this.generateTime(group, item.time_period, "label")]);
            ySeries.push([parseFloat(item.aggregated_amount)]);
            ySeriesOutlay.push([parseFloat(item.total_outlays)]);
        });

        this.setState({
            groups,
            xSeries,
            ySeries,
            ySeriesOutlay,
            rawLabels,
            loading: false,
            error: false
        });
    }

    render() {
        return (
            <StateTimeVisualizationSection
                data={this.state}
                loading={this.state.loading}
                updateVisualizationPeriod={this.updateVisualizationPeriod}
                visualizationPeriod={this.state.visualizationPeriod}
                outlayToggle={this.state.outlayToggle}
                onKeyOutlaysToggle={this.onKeyOutlaysToggle}
                onOutlaysToggle={this.onOutlaysToggle} />
        );
    }
}

StateTimeVisualizationSectionContainer.propTypes = propTypes;

export default connect(
    (state) => ({
        stateProfile: state.stateProfile
    }),
    (dispatch) => bindActionCreators(stateActions, dispatch)
)(StateTimeVisualizationSectionContainer);
