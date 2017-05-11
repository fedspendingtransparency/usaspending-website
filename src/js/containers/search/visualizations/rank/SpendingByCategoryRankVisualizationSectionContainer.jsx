/**
 * SpendingByCategoryRankVisualizationSectionContainer.jsx
 * Created by michaelbray on 4/3/17.
 */

import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import _ from 'lodash';

import SpendingByCategorySection from
    'components/search/visualizations/rank/sections/SpendingByCategorySection';

import * as searchFilterActions from 'redux/actions/search/searchFilterActions';

import * as SearchHelper from 'helpers/searchHelper';
import * as MoneyFormatter from 'helpers/moneyFormatter';

import SearchAccountAwardsOperation from 'models/search/SearchAccountAwardsOperation';
import SearchTASCategoriesOperation from 'models/search/SearchTASCategoriesOperation';

const propTypes = {
    reduxFilters: React.PropTypes.object,
    meta: React.PropTypes.object,
    budgetFiltersSelected: React.PropTypes.bool,
    awardFiltersSelected: React.PropTypes.bool
};

const fieldNames = {
    budgetFunctions: 'treasury_account__budget_function_title',
    federalAccounts: 'treasury_account__federal_account__account_title',
    objectClasses: 'object_class__object_class_name'
};

export class SpendingByCategoryRankVisualizationSectionContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            labelSeries: [],
            dataSeries: [],
            descriptions: [],
            linkSeries: [],
            page: 1,
            scope: 'budgetFunctions',
            next: '',
            previous: '',
            hasNextPage: false,
            hasPreviousPage: false
        };

        this.changeScope = this.changeScope.bind(this);
        this.nextPage = this.nextPage.bind(this);
        this.previousPage = this.previousPage.bind(this);
        this.apiRequest = null;
    }

    componentDidMount() {
        this.newSearch();
    }

    componentDidUpdate(prevProps) {
        if (!_.isEqual(prevProps.reduxFilters, this.props.reduxFilters)
            || (prevProps.budgetFiltersSelected !== this.props.budgetFiltersSelected)
            || (prevProps.awardFiltersSelected !== this.props.awardFiltersSelected)) {
            this.newSearch();
        }
    }

    changeScope(scope) {
        this.setState({
            scope,
            page: 1,
            hasNextPage: false
        }, () => {
            this.fetchData();
        });
    }

    newSearch() {
        this.setState({
            page: 1,
            hasNextPage: false
        }, () => {
            this.fetchData();
        });
    }

    nextPage() {
        if (this.state.hasNextPage) {
            this.setState({
                page: this.state.page + 1
            }, () => {
                this.fetchData();
            });
        }
    }

    previousPage() {
        // change the state by subtracting 2 (since the page number is already incremented)
        const prevPage = _.max([1, this.state.page - 1]);
        this.setState({
            page: prevPage
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

        // Fetch data from the appropriate endpoint
        if (this.props.awardFiltersSelected && this.props.budgetFiltersSelected) {
            this.fetchComboRequest();
        }
        else if (this.props.budgetFiltersSelected) {
            this.fetchBudgetRequest();
        }
        else if (this.props.awardFiltersSelected) {
            this.fetchAwardRequest();
        }
        else {
            this.fetchUnfilteredRequest();
        }
    }

    fetchUnfilteredRequest() {
        this.fetchTASCategories('Budget category vis - unfiltered');
    }

    fetchBudgetRequest() {
        this.fetchTASCategories('Budget category vis - budget filters');
    }

    fetchAwardRequest() {
        // only award filters have been selected
        this.fetchAccountAwards('Budget category vis - award filters');
    }

    fetchComboRequest() {
        // a combination of budget and award filters have been selected
        this.fetchAccountAwards('Budget category vis - combination');
    }

    fetchAccountAwards(auditTrail = null) {
        const fieldName = fieldNames[this.state.scope];
        const field = 'transaction_obligated_amount';
        let group = [fieldName];
        if (this.state.scope === 'federalAccounts') {
            group = [fieldName, "treasury_account__federal_account_id"];
        }


        const operation = new SearchAccountAwardsOperation();
        // Add filters to Search Operation
        operation.fromState(this.props.reduxFilters);
        const searchParams = operation.toParams();

        // Generate the API parameters
        const apiParams = {
            field,
            group,
            order: ['-aggregate'],
            aggregate: 'sum',
            filters: searchParams,
            limit: 5,
            page: this.state.page
        };

        if (auditTrail) {
            apiParams.auditTrail = auditTrail;
        }

        this.apiRequest = SearchHelper.performFinancialAccountAggregation(apiParams);

        this.apiRequest.promise
            .then((res) => {
                this.parseData(res.data, group, fieldName);
                this.apiRequest = null;
            })
            .catch(() => {
                this.apiRequest = null;
            });
    }

    fetchTASCategories(auditTrail = null) {
        // only budget filters have been selected
        const fieldName = fieldNames[this.state.scope];
        const field = 'obligations_incurred_by_program_object_class_cpe';
        let group = [fieldName];
        if (this.state.scope === 'federalAccounts') {
            group = [fieldName, "treasury_account__federal_account_id"];
        }

        // generate the API parameters
        const operation = new SearchTASCategoriesOperation();
        operation.fromState(this.props.reduxFilters);
        const searchParams = operation.toParams();

        // Generate the API parameters
        const apiParams = {
            field,
            group,
            order: ['-aggregate'],
            aggregate: 'sum',
            filters: searchParams,
            limit: 5,
            page: this.state.page
        };

        if (auditTrail) {
            apiParams.auditTrail = auditTrail;
        }

        this.apiRequest = SearchHelper.performCategorySearch(apiParams);

        this.apiRequest.promise
            .then((res) => {
                this.parseData(res.data, group, fieldName);
                this.apiRequest = null;
            })
            .catch(() => {
                this.apiRequest = null;
            });
    }

    parseData(data, group, fieldName) {
        const labelSeries = [];
        const dataSeries = [];
        const descriptions = [];
        const linkSeries = [];

        const dataField = group[0];
        const idField = group[1];

        // iterate through each response object and break it up into groups, x series, and y series
        data.results.forEach((item) => {
            labelSeries.push(item[dataField]);
            dataSeries.push(parseFloat(item.aggregate));

            const description = `Spending by ${item[dataField]}: \
${MoneyFormatter.formatMoney(parseFloat(item.aggregate))}`;
            descriptions.push(description);

            if (fieldName === fieldNames.federalAccounts) {
                linkSeries.push(item[idField]);
            }
        });

        this.setState({
            labelSeries,
            dataSeries,
            descriptions,
            linkSeries,
            loading: false,
            next: data.page_metadata.next,
            previous: data.page_metadata.previous,
            hasNextPage: data.page_metadata.has_next_page,
            hasPreviousPage: data.page_metadata.has_previous_page
        });
    }

    render() {
        return (
            <SpendingByCategorySection
                {...this.state}
                meta={this.props.meta}
                changeScope={this.changeScope}
                nextPage={this.nextPage}
                previousPage={this.previousPage} />
        );
    }
}

SpendingByCategoryRankVisualizationSectionContainer.propTypes = propTypes;

export default connect(
    (state) => ({
        reduxFilters: state.filters,
        meta: state.resultsMeta.toJS()
    }),
    (dispatch) => bindActionCreators(searchFilterActions, dispatch)
)(SpendingByCategoryRankVisualizationSectionContainer);
