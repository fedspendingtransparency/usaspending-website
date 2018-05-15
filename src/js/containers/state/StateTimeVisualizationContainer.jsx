/**
 * TimeVisualizationSectionContainer.jsx
 * Created by David Trinh 5/15/18
 */

import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { isCancel } from 'axios';

import StateTimeVisualization from
    'components/search/visualizations/time/TimeVisualizationSection';

import * as stateActions from 'redux/actions/state/stateActions';

import moment from 'moment';
import * as FiscalYearHelper from 'helpers/fiscalYearHelper';
import * as MonthHelper from 'helpers/monthHelper';
import * as SearchHelper from 'helpers/searchHelper';


const propTypes = {
    stateProfile: PropTypes.object
};

export class StateTimeVisualizationContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            visualizationPeriod: 'fiscal_year',
            loading: true,
            error: false,
            groups: [],
            xSeries: [],
            ySeries: []
        };

        this.apiRequest = null;
        this.updateVisualizationPeriod = this.updateVisualizationPeriod.bind(this);
    }

    componentDidMount() {
        this.fetchData();
    }

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
        this.fetchAwards('Spending Over Time Visualization');
    }

    fetchAwards(auditTrail = null) {
        const filters = {};
        let timePeriodFY = this.props.stateProfile.fy;
        let timePeriodRange;
        let dates;
        
        if (this.props.stateProfile.fy !== 'latest' && this.props.stateProfile.fy !== 'all') {
            timePeriodFY = parseInt(this.props.stateProfile.fy, 10);
            dates = FiscalYearHelper.convertFYToDateRange(timePeriodFY);
            timePeriodRange = {
                start_date: dates[0],
                end_date: dates[1]
            };
            filters.time_period = [];
            filters.time_period.push(timePeriodRange);
        } else if (timePeriodFY === 'latest') {
            dates = this.getTrailingTwelveMonths();
            timePeriodRange = {
                start_date: dates[0],
                end_date: dates[1]
            };
            filters.time_period = [];
            filters.time_period.push(timePeriodRange);
        }

        filters.place_of_performance_locations = [];
        const locationData = {
            state: this.props.stateProfile.overview.name
        };
        filters.place_of_performance_locations.push(locationData);


        // Generate the API parameters
        const apiParams = {
            group: this.state.visualizationPeriod,
            filters
        };

        if (auditTrail) {
            apiParams.auditTrail = auditTrail;
        }

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

    getTrailingTwelveMonths() {
        const startingYear = moment().subtract(1, 'y');
        const endingYear = moment().year();

        return [`${startingYear}-10-01`, `${endingYear}-09-30`];
    }

    generateTimeLabel(group, timePeriod) {
        if (group === 'fiscal_year') {
            return timePeriod.fiscal_year;
        }
        else if (group === 'quarter') {
            return `Q${timePeriod.quarter} ${timePeriod.fiscal_year}`;
        }

        const month = MonthHelper.convertNumToShortMonth(timePeriod.month);
        const year = MonthHelper.convertMonthToFY(timePeriod.month, timePeriod.fiscal_year);

        return `${month} ${year}`;
    }

    generateTimeRaw(group, timePeriod) {
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

        const month = MonthHelper.convertNumToShortMonth(timePeriod.month);
        const year = MonthHelper.convertMonthToFY(timePeriod.month, timePeriod.fiscal_year);

        return {
            period: `${month}`,
            year: `${year}`
        };
    }

    parseData(data, group) {
        const groups = [];
        const xSeries = [];
        const ySeries = [];
        const rawLabels = [];

        // iterate through each response object and break it up into groups, x series, and y series
        data.results.forEach((item) => {
            groups.push(this.generateTimeLabel(group, item.time_period));
            rawLabels.push(this.generateTimeRaw(group, item.time_period));
            xSeries.push([this.generateTimeLabel(group, item.time_period)]);
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

    render() {
        return (
            <StateTimeVisualization
                data={this.state}
                updateVisualizationPeriod={this.updateVisualizationPeriod}
                visualizationPeriod={this.state.visualizationPeriod} />
        );
    }
}

StateTimeVisualizationContainer.propTypes = propTypes;

export default connect(
    (state) => ({
        stateProfile: state.stateProfile
    }),
    (dispatch) => bindActionCreators(stateActions, dispatch)
)(StateTimeVisualizationContainer);
