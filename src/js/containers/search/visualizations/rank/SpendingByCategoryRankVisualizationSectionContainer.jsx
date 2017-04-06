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
            linkSeries: [],
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

    createTransactionsParams(operation, group) {
        const searchParams = operation.toParams();

        // generate the API parameters
        const apiParams = {
            field: 'federal_action_obligation',
            group,
            order: ['-aggregate'],
            aggregate: 'sum',
            filters: searchParams,
            limit: 5,
            page: this.state.page
        };

        return apiParams;
    }

    createTasParams(group) {
        const operation = new SearchAccountOperation('tas');
        operation.fromState(this.props.reduxFilters);

        const searchParams = operation.toParams();

        // generate the API parameters
        const apiParams = {
            field: 'obligations_incurred_by_program_object_class_cpe',
            group,
            order: ['-aggregate'],
            aggregate: 'sum',
            filters: searchParams,
            limit: 5,
            page: this.state.page
        };

        return apiParams;
    }

    fetchData() {
        // Generate group name
        const fieldName = fieldNames[this.state.scope];
        let group = [];

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

            group = ["award__financial_set__treasury_account__federal_account_id",
                `award__financial_set__${fieldName}`];

            operation.fromState(this.props.reduxFilters);
            apiParams = this.createTransactionsParams(operation, group);
            this.apiRequest = SearchHelper.performTransactionsTotalSearch(apiParams);
        }
        else {
            group = ["treasury_account__federal_account_id", fieldName];

            apiParams = this.createTasParams(group);
            this.apiRequest = SearchHelper.performCategorySearch(apiParams);
        }

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
        const linkSeries = [];

        const idField = group[0];
        const dataField = group[1];

        // iterate through each response object and break it up into groups, x series, and y series
        data.results.forEach((item) => {
            labelSeries.push(item[dataField]);
            dataSeries.push(parseFloat(item.aggregate));

            if (fieldName === fieldNames.federalAccounts) {
                linkSeries.push(item[idField]);
            }
        });

        this.setState({
            labelSeries,
            dataSeries,
            linkSeries,
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
