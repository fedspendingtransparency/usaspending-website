/**
 * TimeVisualizationSectionContainer.jsx
 * Created by Kevin Li 1/12/17
 */

import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { isEqual } from 'lodash';

import TimeVisualizationSection from
    'components/search/visualizations/time/TimeVisualizationSection';

import * as searchFilterActions from 'redux/actions/search/searchFilterActions';
import * as resultsMetaActions from 'redux/actions/resultsMeta/resultsMetaActions';

import * as SearchHelper from 'helpers/searchHelper';
import * as MonthHelper from 'helpers/monthHelper';

import SearchAwardsOperation from 'models/search/SearchAwardsOperation';

const combinedActions = Object.assign({}, searchFilterActions, resultsMetaActions);

const propTypes = {
    reduxFilters: PropTypes.object,
    setVizTxnSum: PropTypes.func
};

export class TimeVisualizationSectionContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            visualizationPeriod: 'fiscal_year',
            loading: true,
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

    componentDidUpdate(prevProps) {
        if (!isEqual(prevProps.reduxFilters, this.props.reduxFilters)) {
            this.fetchData();
        }
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
            loading: true
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
            filters: searchParams
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
            .catch(() => {
                this.apiRequest = null;
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

    parseData(data, group) {
        const groups = [];
        const xSeries = [];
        const ySeries = [];

        let totalSpending = 0;

        // iterate through each response object and break it up into groups, x series, and y series
        data.results.forEach((item) => {
            groups.push(this.generateTimeLabel(group, item.time_period));
            xSeries.push([this.generateTimeLabel(group, item.time_period)]);
            ySeries.push([parseFloat(item.aggregated_amount)]);

            totalSpending += parseFloat(item.aggregated_amount);
        });

        this.setState({
            groups,
            xSeries,
            ySeries,
            loading: false
        }, () => {
            // save the total spending amount to Redux so all visualizations have access to this
            // data
            this.props.setVizTxnSum(totalSpending);
        });
    }

    render() {
        return (
            <TimeVisualizationSection
                data={this.state}
                updateVisualizationPeriod={this.updateVisualizationPeriod} />
        );
    }
}

TimeVisualizationSectionContainer.propTypes = propTypes;

export default connect(
    (state) => ({ reduxFilters: state.filters }),
    (dispatch) => bindActionCreators(combinedActions, dispatch)
)(TimeVisualizationSectionContainer);
