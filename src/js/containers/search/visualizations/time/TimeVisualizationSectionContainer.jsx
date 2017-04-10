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
import * as BudgetCategoryHelper from 'helpers/budgetCategoryHelper';

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
            budgetFiltersSelected:
                BudgetCategoryHelper.budgetFiltersSelected(this.props.reduxFilters),
            awardFiltersSelected:
                BudgetCategoryHelper.awardFiltersSelected(this.props.reduxFilters)
        }, () => {
            this.fetchData();
        });
    }

    fetchTransactionData() {
        const field = 'federal_action_obligation';
        const group = 'action_date__fy';

        let operation = null;

        if (this.state.budgetFiltersSelected) {
            operation = new SearchTransactionFileCOperation();
        }
        else {
            operation = new SearchTransactionOperation();
        }

        // Add filters to Search Operation
        operation.fromState(this.props.reduxFilters);
        const searchParams = operation.toParams();

        // Generate the API parameters
        const apiParams = {
            field,
            group,
            order: ['aggregate'],
            aggregate: 'sum',
            filters: searchParams
        };

        this.apiRequest = SearchHelper.performTransactionsTotalSearch(apiParams);

        this.apiRequest.promise
            .then((res) => {
                this.parseData(res.data, group);
                this.apiRequest = null;
            })
            .catch(() => {
                this.apiRequest = null;
            });
    }

    fetchBalanceData() {
        const field = 'obligations_incurred_total_by_tas_cpe';
        const group = 'submission__reporting_fiscal_year';
        const operation = new SearchAccountOperation('appropriations');

        // Add filters to Search Operation
        operation.fromState(this.props.reduxFilters);
        const searchParams = operation.toParams();

        // Generate the API parameters
        const apiParams = {
            field,
            group,
            order: ['aggregate'],
            aggregate: 'sum',
            filters: searchParams
        };

        this.apiRequest = SearchHelper.performBalancesSearch(apiParams);

        this.apiRequest.promise
            .then((res) => {
                this.parseData(res.data, group);
                this.apiRequest = null;
            })
            .catch(() => {
                this.apiRequest = null;
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

        // Fetch data from the appropriate endpoint
        if (this.state.awardFiltersSelected) {
            this.fetchTransactionData();
        }
        else {
            this.fetchBalanceData();
        }
    }

    parseData(data, group) {
        const groups = [];
        const xSeries = [];
        const ySeries = [];

        let totalSpending = 0;

        // iterate through each response object and break it up into groups, x series, and y series
        data.results.forEach((item) => {
            groups.push(item[group]);
            xSeries.push([item[group]]);
            ySeries.push([parseFloat(item.aggregate)]);

            totalSpending += parseFloat(item.aggregate);
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
