/**
 * TimeVisualizationSectionContainer.jsx
 * Created by Kevin Li 1/12/17
 */

import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { isEqual } from 'lodash';
import { isCancel } from 'axios';

import TimeVisualizationSection from
    'components/search/visualizations/time/TimeVisualizationSection';

import * as searchFilterActions from 'redux/actions/search/searchFilterActions';
import { setAppliedFilterCompletion } from 'redux/actions/search/appliedFilterActions';

import * as SearchHelper from 'helpers/searchHelper';
import * as MonthHelper from 'helpers/monthHelper';
import Analytics from 'helpers/analytics/Analytics';

import SearchAwardsOperation from 'models/search/SearchAwardsOperation';

const combinedActions = Object.assign({}, searchFilterActions, {
    setAppliedFilterCompletion
});

const propTypes = {
    reduxFilters: PropTypes.object,
    setAppliedFilterCompletion: PropTypes.func,
    noApplied: PropTypes.bool,
    subaward: PropTypes.bool
};

const logPeriodEvent = (period) => {
    Analytics.event({
        category: 'Advanced Search - Time - Period',
        action: period
    });
};

export class TimeVisualizationSectionContainer extends React.Component {
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
        logPeriodEvent(this.state.visualizationPeriod);
    }

    componentDidUpdate(prevProps) {
        if (!isEqual(prevProps.reduxFilters, this.props.reduxFilters) && !this.props.noApplied) {
            this.fetchData();
        }
        else if (prevProps.subaward !== this.props.subaward && !this.props.noApplied) {
            // subaward toggle changed, update the search object
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
        this.props.setAppliedFilterCompletion(false);
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
        const operation = new SearchAwardsOperation();
        operation.fromState(this.props.reduxFilters);
        const searchParams = operation.toParams();

        // Generate the API parameters
        const apiParams = {
            group: this.state.visualizationPeriod,
            filters: searchParams,
            subawards: this.props.subaward
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

                this.props.setAppliedFilterCompletion(true);
                this.apiRequest = null;
                console.log(err);
                this.setState({
                    loading: false,
                    error: true
                });
            });
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
        }, () => {
            this.props.setAppliedFilterCompletion(true);
        });
    }

    render() {
        return (
            <TimeVisualizationSection
                data={this.state}
                updateVisualizationPeriod={this.updateVisualizationPeriod}
                visualizationPeriod={this.state.visualizationPeriod} />
        );
    }
}

TimeVisualizationSectionContainer.propTypes = propTypes;

export default connect(
    (state) => ({
        reduxFilters: state.appliedFilters.filters,
        noApplied: state.appliedFilters._empty,
        subaward: state.searchView.subaward
    }),
    (dispatch) => bindActionCreators(combinedActions, dispatch)
)(TimeVisualizationSectionContainer);
