/**
 * SpendingByCategoryRankVisualizationSectionContainer.jsx
 * Created by michaelbray on 4/3/17.
 */

import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import _ from 'lodash';

import SpendingByCategoryRankVisualizationSection from
    'components/search/visualizations/rank/SpendingByCategoryRankVisualizationSection';

import * as searchFilterActions from 'redux/actions/search/searchFilterActions';

import * as SearchHelper from 'helpers/searchHelper';

import SearchTransactionOperation from 'models/search/SearchTransactionOperation';
import SearchTransactionFileCOperation from 'models/search/SearchTransactionFileCOperation';
import SearchAccountOperation from 'models/search/SearchAccountOperation';

const propTypes = {
    reduxFilters: React.PropTypes.object,
    meta: React.PropTypes.object,
    visualizationWidth: React.PropTypes.number,
    labelWidth: React.PropTypes.number,
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
            page: 1,
            total: 0,
            scope: 'budgetFunctions'
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
            page: 1
        }, () => {
            this.fetchData();
        });
    }

    newSearch() {
        this.setState({
            page: 1
        }, () => {
            this.fetchData();
        });
    }

    nextPage() {
        this.setState({
            page: this.state.page + 1
        }, () => {
            this.fetchData();
        });
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

    createTransactionsParams(operation, groupName) {
        const searchParams = operation.toParams();

        // generate the API parameters
        const apiParams = {
            field: 'federal_action_obligation',
            group: `award__financial_set__${groupName}`,
            // Todo: Uncomment the below when multiple aggregations are supported
            // group: ["award__financial_set__treasury_account__federal_account_id",
            // `award__financial_set__${groupName}`],
            order: ['aggregate'],
            aggregate: 'sum',
            filters: searchParams,
            limit: 5,
            page: this.state.page
        };

        return apiParams;
    }

    createTasParams(groupName) {
        const operation = new SearchAccountOperation();
        operation.fromState(this.props.reduxFilters);

        const searchParams = operation.toParams();

        // generate the API parameters
        const apiParams = {
            field: 'obligations_incurred_by_program_object_class_cpe',
            group: groupName,
            // Todo: Uncomment the below when multiple aggregations are supported
            // group: ["treasury_account__federal_account_id", groupName],
            order: ['aggregate'],
            aggregate: 'sum',
            filters: searchParams,
            limit: 5,
            page: this.state.page
        };

        return apiParams;
    }

    fetchData() {
        // Generate group name
        const groupName = fieldNames[this.state.scope];

        this.setState({
            loading: true
        });

        if (this.apiRequest) {
            this.apiRequest.cancel();
        }

        let apiParams = '';

        // Create Search Operation and API request
        if (this.props.awardFiltersSelected) {
            let operation = null;

            if (this.props.budgetFiltersSelected) {
                operation = new SearchTransactionFileCOperation();
            }
            else {
                operation = new SearchTransactionOperation();
            }

            operation.fromState(this.props.reduxFilters);
            apiParams = this.createTransactionsParams(operation, groupName);
            this.apiRequest = SearchHelper.performTransactionsTotalSearch(apiParams);
        }
        else {
            apiParams = this.createTasParams(groupName);
            this.apiRequest = SearchHelper.performCategorySearch(apiParams);
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
        const labelSeries = [];
        const dataSeries = [];

        // iterate through each response object and break it up into groups, x series, and y series
        data.results.forEach((item) => {
            labelSeries.push(item.item);
            dataSeries.push(parseFloat(item.aggregate));
        });

        this.setState({
            labelSeries,
            dataSeries,
            loading: false,
            total: data.page_metadata.num_pages
        });
    }

    render() {
        return (
            <SpendingByCategoryRankVisualizationSection
                {...this.state}
                visualizationWidth={this.props.visualizationWidth}
                labelWidth={this.props.labelWidth}
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
