/**
 * RankVisualizationSectionContainer.jsx
 * Created by Kevin Li 2/9/17
 */

import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import _ from 'lodash';

import RankVisualizationSection from
    'components/search/visualizations/rank/RankVisualizationSection';

import * as searchFilterActions from 'redux/actions/search/searchFilterActions';

import * as SearchHelper from 'helpers/searchHelper';
import * as MoneyFormatter from 'helpers/moneyFormatter';

import SearchTransactionOperation from 'models/search/SearchTransactionOperation';
import SearchAccountAwardsOperation from 'models/search/SearchAccountAwardsOperation';

const propTypes = {
    reduxFilters: React.PropTypes.object,
    meta: React.PropTypes.object,
    budgetFiltersSelected: React.PropTypes.bool,
    awardFiltersSelected: React.PropTypes.bool
};

export class SpendingByAwardingAgencyVisualizationContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            labelSeries: [],
            dataSeries: [],
            descriptions: [],
            page: 1,
            agencyScope: 'toptier',
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
        if (!_.isEqual(prevProps.reduxFilters, this.props.reduxFilters)) {
            this.newSearch();
        }
    }

    changeScope(scope) {
        this.setState({
            agencyScope: scope,
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
        this.fetchTransactions('Awarding agency vis - unfiltered');
    }

    fetchBudgetRequest() {
        this.fetchAccountAwards('Awarding agency vis - budget filters');
    }

    fetchAwardRequest() {
        // only award filters have been selected
        this.fetchTransactions('Awarding agency vis - award filters');
    }

    fetchComboRequest() {
        // a combination of budget and award filters have been selected
        this.fetchAccountAwards('Awarding agency vis - combination');
    }

    fetchTransactions(auditTrail = null) {
        // Create Search Operation
        const operation = new SearchTransactionOperation();

        operation.fromState(this.props.reduxFilters);
        const searchParams = operation.toParams();

        // generate the API parameters
        const apiParams = {
            field: 'federal_action_obligation',
            group: `awarding_agency__${this.state.agencyScope}_agency__name`,
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
                this.parseData(res.data);
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
        // generate the API parameters
        const apiParams = {
            field: 'transaction_obligated_amount',
            group: `award__awarding_agency__${this.state.agencyScope}_agency__name`,
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
        const descriptions = [];

        // iterate through each response object and break it up into groups, x series, and y series
        data.results.forEach((item) => {
            labelSeries.push(item.item);
            dataSeries.push(parseFloat(item.aggregate));

            const description = `Spending by ${item.item}: \
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
            <RankVisualizationSection
                {...this.state}
                meta={this.props.meta}
                changeScope={this.changeScope}
                nextPage={this.nextPage}
                previousPage={this.previousPage} />
        );
    }
}

SpendingByAwardingAgencyVisualizationContainer.propTypes = propTypes;

export default connect(
    (state) => ({
        reduxFilters: state.filters,
        meta: state.resultsMeta.toJS()
    }),
    (dispatch) => bindActionCreators(searchFilterActions, dispatch)
)(SpendingByAwardingAgencyVisualizationContainer);
