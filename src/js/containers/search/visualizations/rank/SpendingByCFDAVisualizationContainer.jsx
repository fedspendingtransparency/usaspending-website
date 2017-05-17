/**
 * SpendingByCFDAVisualizationContainer.jsx
 * Created by Kevin Li on 5/4/17
 */

import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import _ from 'lodash';

import SpendingByCFDASection from
    'components/search/visualizations/rank/sections/SpendingByCFDASection';

import * as searchFilterActions from 'redux/actions/search/searchFilterActions';

import * as SearchHelper from 'helpers/searchHelper';
import * as MoneyFormatter from 'helpers/moneyFormatter';

import * as FilterFields from 'dataMapping/search/filterFields';

import SearchTransactionOperation from 'models/search/SearchTransactionOperation';
import SearchAccountAwardsOperation from 'models/search/SearchAccountAwardsOperation';

const propTypes = {
    reduxFilters: React.PropTypes.object,
    meta: React.PropTypes.object,
    budgetFiltersSelected: React.PropTypes.bool,
    awardFiltersSelected: React.PropTypes.bool
};

export class SpendingByCFDAVisualizationContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            labelSeries: [],
            dataSeries: [],
            descriptions: [],
            page: 1,
            next: '',
            previous: '',
            hasNextPage: false,
            hasPreviousPage: false
        };

        this.nextPage = this.nextPage.bind(this);
        this.previousPage = this.previousPage.bind(this);
        this.apiRequest = null;
    }

    componentDidMount() {
        this.newSearch();
    }

    componentDidUpdate(prevProps) {
        if (!_.isEqual(prevProps.reduxFilters, this.props.reduxFilters)) {
            this.newSearch();
        }
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
        this.fetchTransactions('CFDA rank vis - unfiltered');
    }

    fetchBudgetRequest() {
        this.fetchAccountAwards('CFDA rank vis - budget filters');
    }

    fetchAwardRequest() {
        // only award filters have been selected
        this.fetchTransactions('CFDA rank vis - award filters');
    }

    fetchComboRequest() {
        // a combination of budget and award filters have been selected
        this.fetchAccountAwards('CFDA rank vis - combination');
    }

    fetchTransactions(auditTrail = null) {
        // Create Search Operation
        const operation = new SearchTransactionOperation();

        operation.fromState(this.props.reduxFilters);
        const searchParams = operation.toParams();
        const apiGroups = [
            FilterFields.transactionFields.cfdaNumber,
            FilterFields.transactionFields.cfdaTitle
        ];

        // generate the API parameters
        const apiParams = {
            field: 'federal_action_obligation',
            group: apiGroups,
            order: ['-aggregate'],
            aggregate: 'sum',
            filters: searchParams,
            limit: 5,
            page: this.state.page
        };

        if (auditTrail) {
            apiParams.auditTrail = auditTrail;
        }

        this.apiRequest = SearchHelper.performTransactionsTotalSearch(apiParams);
        this.apiRequest.promise
            .then((res) => {
                this.parseData(res.data, apiGroups);
                this.apiRequest = null;
            })
            .catch(() => {
                this.apiRequest = null;
            });
    }

    fetchAccountAwards(auditTrail = null) {
        // Create Search Operation
        const operation = new SearchAccountAwardsOperation();

        operation.fromState(this.props.reduxFilters);
        const searchParams = operation.toParams();
        const apiGroups = [
            FilterFields.accountAwardsFields.cfdaNumber,
            FilterFields.accountAwardsFields.cfdaTitle
        ];
        // generate the API parameters
        const apiParams = {
            field: 'transaction_obligated_amount',
            group: apiGroups,
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
                this.parseData(res.data, apiGroups);
                this.apiRequest = null;
            })
            .catch(() => {
                this.apiRequest = null;
            });
    }

    parseData(data, groups) {
        const labelSeries = [];
        const dataSeries = [];
        const descriptions = [];

        // iterate through each response object and break it up into groups, x series, and y series
        data.results.forEach((item) => {
            let parsedValue = parseFloat(item.aggregate);
            if (isNaN(parsedValue)) {
                // the aggregate value is invalid (most likely null)
                parsedValue = 0;
            }

            labelSeries.push(item[groups[1]]);
            dataSeries.push(parsedValue);
            const description = `Spending by ${item[groups[1]]}: \
${MoneyFormatter.formatMoney(parseFloat(item.aggregate))}`;
            descriptions.push(description);
        });

        this.setState({
            labelSeries,
            dataSeries,
            descriptions,
            loading: false,
            next: data.page_metadata.next,
            previous: data.page_metadata.previous,
            hasNextPage: data.page_metadata.has_next_page,
            hasPreviousPage: data.page_metadata.has_previous_page
        });
    }

    render() {
        return (
            <SpendingByCFDASection
                {...this.state}
                meta={this.props.meta}
                nextPage={this.nextPage}
                previousPage={this.previousPage} />
        );
    }
}

SpendingByCFDAVisualizationContainer.propTypes = propTypes;

export default connect(
    (state) => ({
        reduxFilters: state.filters,
        meta: state.resultsMeta.toJS()
    }),
    (dispatch) => bindActionCreators(searchFilterActions, dispatch)
)(SpendingByCFDAVisualizationContainer);
