/**
 * RankVisualizationSectionContainer.jsx
 * Created by Kevin Li 2/9/17
 */

import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import _ from 'lodash';

import AccountRankVisualizationSection from
    'components/account/visualizations/rank/AccountRankVisualizationSection';

import * as accountFilterActions from 'redux/actions/account/accountFilterActions';

import * as SearchHelper from 'helpers/searchHelper';
import * as MoneyFormatter from 'helpers/moneyFormatter';

import SearchTransactionOperation from 'models/search/SearchTransactionOperation';

const propTypes = {
    reduxFilters: React.PropTypes.object,
    meta: React.PropTypes.object
};

export class AccountRankVisualizationContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            labelSeries: [],
            dataSeries: [],
            descriptions: [],
            page: 1,
            total: 0,
            categoryScope: 'program_activity'
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
            categoryScope: scope,
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

    fetchData() {
        this.setState({
            loading: false
        }, () => {
            const mockRes = {
                results: [
                    {
                        item: 'Something 1',
                        aggregate: '6678.90'
                    },
                    {
                        item: 'Something 2',
                        aggregate: '5674.90'
                    },
                    {
                        item: 'Something 3',
                        aggregate: '5578.90'
                    },
                    {
                        item: 'Something 4',
                        aggregate: '4278.90'
                    },
                    {
                        item: 'Something 5',
                        aggregate: '2678.90'
                    }
                ]
            };

            this.parseData(mockRes);
        });

        // // build a new search operation from the Redux state, but create a transaction-based search
        // // operation instead of an award-based one
        // const operation = new SearchTransactionOperation();
        // operation.fromState(this.props.reduxFilters);

        // const searchParams = operation.toParams();

        // // generate the API parameters
        // const apiParams = {
        //     field: 'federal_action_obligation',
        //     group: `awarding_agency__${this.state.agencyScope}_agency__name`,
        //     order: ['-aggregate'],
        //     aggregate: 'sum',
        //     filters: searchParams,
        //     limit: 5,
        //     page: this.state.page
        // };

        // this.setState({
        //     loading: true
        // });


        // if (this.apiRequest) {
        //     this.apiRequest.cancel();
        // }

        // this.apiRequest = SearchHelper.performTransactionsTotalSearch(apiParams);
        // this.apiRequest.promise
        //     .then((res) => {
        //         this.parseData(res.data);
        //         this.apiRequest = null;
        //     })
        //     .catch(() => {
        //         this.apiRequest = null;
        //     });
    }

    parseData(data) {
        const labelSeries = [];
        const dataSeries = [];
        const descriptions = [];

        // iterate through each response object and break it up into groups, x series, and y series
        data.results.forEach((item) => {
            labelSeries.push(item.item);
            dataSeries.push(parseFloat(item.aggregate));

            const description = `Obligated balance for ${item.item}: \
${MoneyFormatter.formatMoney(parseFloat(item.aggregate))}`;
            descriptions.push(description);
        });

        this.setState({
            labelSeries,
            dataSeries,
            descriptions,
            loading: false,
            total: 1
        });
    }

    render() {
        return (
            <AccountRankVisualizationSection
                {...this.state}
                meta={this.props.meta}
                changeScope={this.changeScope}
                nextPage={this.nextPage}
                previousPage={this.previousPage} />
        );
    }
}

AccountRankVisualizationContainer.propTypes = propTypes;

export default connect(
    (state) => ({
        reduxFilters: state.filters
    }),
    (dispatch) => bindActionCreators(accountFilterActions, dispatch)
)(AccountRankVisualizationContainer);
