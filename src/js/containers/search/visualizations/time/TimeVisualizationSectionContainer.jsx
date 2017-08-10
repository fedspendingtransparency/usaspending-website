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
import * as BudgetCategoryHelper from 'helpers/budgetCategoryHelper';

import SearchTASCategoriesOperation from 'models/search/SearchTASCategoriesOperation';
import SearchTransactionOperation from 'models/search/SearchTransactionOperation';

const combinedActions = Object.assign({}, searchFilterActions, resultsMetaActions);

const propTypes = {
    reduxFilters: PropTypes.object,
    setVizTxnSum: PropTypes.func
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
        if (!isEqual(prevProps.reduxFilters, this.props.reduxFilters)) {
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

    fetchData() {
        this.setState({
            loading: true
        });

        // Cancel API request if it exists
        if (this.apiRequest) {
            this.apiRequest.cancel();
        }

        // // Fetch data from the appropriate endpoint
        if (this.state.awardFiltersSelected && this.state.budgetFiltersSelected) {
            this.fetchComboRequest();
        }
        else if (this.state.budgetFiltersSelected) {
            this.fetchBudgetRequest();
        }
        else if (this.state.awardFiltersSelected) {
            this.fetchAwardRequest();
            // this.fetchTransactionData();
        }
        else {
            this.fetchUnfilteredRequest();
            // this.fetchBalanceData();
        }
    }

    fetchUnfilteredRequest() {
        // no filters have been selected
        this.fetchTASCategories('Time visualization - unfiltered');
    }

    fetchBudgetRequest() {
        // only budget filters have been applied
        this.fetchTASCategories('Time visualization - budget filters');
    }

    fetchAwardRequest() {
        // only award filters have been selected
        this.fetchTransactions('Time visualization - award filters');
    }

    fetchComboRequest() {
        // a combination of budget and award filters have been selected
        this.fetchTransactions('Time visualization - combination');
    }

    fetchTransactions(auditTrail = null) {
        const field = 'federal_action_obligation';
        const group = 'action_date__fy';

        const operation = new SearchTransactionOperation();
        operation.fromState(this.props.reduxFilters);
        const searchParams = operation.toParams();

        // Generate the API parameters
        const apiParams = {
            field,
            group,
            order: [group],
            aggregate: 'sum',
            filters: searchParams
        };

        if (auditTrail) {
            apiParams.auditTrail = auditTrail;
        }

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

    fetchTASCategories(auditTrail = null) {
        // only budget filters have been selected
        const field = 'obligations_incurred_by_program_object_class_cpe';
        const group = 'submission__reporting_fiscal_year';
        // generate the API parameters
        const operation = new SearchTASCategoriesOperation();
        operation.fromState(this.props.reduxFilters);
        const searchParams = operation.toParams();

        // Generate the API parameters
        const apiParams = {
            field,
            group,
            order: [group],
            aggregate: 'sum',
            filters: searchParams
        };

        if (auditTrail) {
            apiParams.auditTrail = auditTrail;
        }

        this.apiRequest = SearchHelper.performCategorySearch(apiParams);

        this.apiRequest.promise
            .then((res) => {
                this.parseData(res.data, group);
                this.apiRequest = null;
            })
            .catch(() => {
                this.apiRequest = null;
            });
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
