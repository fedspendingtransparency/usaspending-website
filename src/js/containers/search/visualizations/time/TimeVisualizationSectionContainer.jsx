/**
 * TimeVisualizationSectionContainer.jsx
 * Created by Kevin Li 1/12/17
 */

import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import _ from 'lodash';

import TimeVisualizationSection from
    'components/search/visualizations/time/TimeVisualizationSection';

import * as searchFilterActions from 'redux/actions/search/searchFilterActions';
import * as resultsMetaActions from 'redux/actions/resultsMeta/resultsMetaActions';

import * as SearchHelper from 'helpers/searchHelper';

import SearchTransactionOperation from 'models/search/SearchTransactionOperation';
import SearchTransactionFileCOperation from 'models/search/SearchTransactionFileCOperation';
import SearchAccountOperation from 'models/search/SearchAccountOperation';

const combinedActions = Object.assign({}, searchFilterActions, resultsMetaActions);

const propTypes = {
    reduxFilters: React.PropTypes.object,
    setVizTxnSum: React.PropTypes.func
};

export class TimeVisualizationSectionContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            groups: [],
            xSeries: [],
            ySeries: [],
            budgetFiltersSelected: false,
            awardFiltersSelected: false
        };

        this.apiRequest = null;
    }

    componentDidMount() {
        this.setFilterStates();
    }

    componentDidUpdate(prevProps) {
        if (!_.isEqual(prevProps.reduxFilters, this.props.reduxFilters)) {
            this.setFilterStates();
        }
    }

    setFilterStates() {
        this.setState({
            budgetFiltersSelected: SearchHelper.budgetFiltersSelected(this.props.reduxFilters),
            awardFiltersSelected: SearchHelper.awardFiltersSelected(this.props.reduxFilters)
        }, () => {
            this.fetchData();
        });
    }

    createTransactionsParams(operation) {
        const searchParams = operation.toParams();

        // generate the API parameters
        const apiParams = {
            field: 'federal_action_obligation',
            group: 'action_date__fy',
            order: ['aggregate'],
            aggregate: 'sum',
            filters: searchParams
        };

        return apiParams;
    }

    createTasParams() {
        const operation = new SearchAccountOperation('appropriations');
        operation.fromState(this.props.reduxFilters);

        const searchParams = operation.toParams();

        // generate the API parameters
        const apiParams = {
            field: 'obligations_incurred_total_by_tas_cpe',
            group: 'submission__reporting_fiscal_year',
            order: ['aggregate'],
            aggregate: 'sum',
            filters: searchParams
        };

        return apiParams;
    }

    fetchData() {
        this.setState({
            loading: true
        });

        if (this.apiRequest) {
            this.apiRequest.cancel();
        }

        let apiParams = '';

        // Create Search Operation and API request
        if (this.state.awardFiltersSelected) {
            let operation = null;

            if (this.state.budgetFiltersSelected) {
                operation = new SearchTransactionFileCOperation();
            }
            else {
                operation = new SearchTransactionOperation();
            }

            operation.fromState(this.props.reduxFilters);
            apiParams = this.createTransactionsParams(operation);
            this.apiRequest = SearchHelper.performTransactionsTotalSearch(apiParams);
        }
        else {
            apiParams = this.createTasParams();
            this.apiRequest = SearchHelper.performBalancesSearch(apiParams);
        }

        this.apiRequest.promise
            .then((res) => {
                this.parseData(res.data);
                this.apiRequest = null;
            })
            .catch(() => {
                this.apiRequest = null;
            });
    }

    parseData(data) {
        const groups = [];
        const xSeries = [];
        const ySeries = [];

        let totalSpending = 0;

        // iterate through each response object and break it up into groups, x series, and y series
        data.results.forEach((group) => {
            groups.push(group.item);
            xSeries.push([group.item]);
            ySeries.push([parseFloat(group.aggregate)]);

            totalSpending += parseFloat(group.aggregate);
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
            <TimeVisualizationSection data={this.state} />
        );
    }
}

TimeVisualizationSectionContainer.propTypes = propTypes;

export default connect(
    (state) => ({ reduxFilters: state.filters }),
    (dispatch) => bindActionCreators(combinedActions, dispatch)
)(TimeVisualizationSectionContainer);
