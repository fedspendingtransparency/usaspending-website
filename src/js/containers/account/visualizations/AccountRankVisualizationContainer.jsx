/**
 * AccountRankVisualizationContainer.jsx
 * Created by Kevin Li 2/9/17
 */

import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { isCancel } from 'axios';
import { isEqual, max } from 'lodash';
import { categoryLabelFields } from 'dataMapping/accounts/accountFields';

import AccountRankVisualizationSection from
    'components/account/visualizations/rank/AccountRankVisualizationSection';

import * as accountFilterActions from 'redux/actions/account/accountFilterActions';

import * as AccountHelper from 'apis/account';
import * as MoneyFormatter from 'helpers/moneyFormatter';

import AccountSearchOperation from 'models/v1/account/queries/AccountSearchOperation';

const propTypes = {
    reduxFilters: PropTypes.object,
    account: PropTypes.object
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
            next: null,
            previous: null,
            hasNextPage: false,
            hasPreviousPage: false,
            categoryScope: 'programActivity'
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
        if (!isEqual(prevProps.reduxFilters, this.props.reduxFilters) || !isEqual(prevProps.account.id, this.props.account.id)) {
            this.newSearch();
        }
    }

    changeScope(scope) {
        this.setState({
            categoryScope: scope,
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
        if (!this.state.hasNextPage) {
            return;
        }

        this.setState({
            page: this.state.page + 1
        }, () => {
            this.fetchData();
        });
    }

    previousPage() {
    // change the state by subtracting 2 (since the page number is already incremented)
        const prevPage = max([1, this.state.page - 1]);
        this.setState({
            page: prevPage
        }, () => {
            this.fetchData();
        });
    }

    fetchData() {
        if (this.apiRequest) {
            this.apiRequest.cancel();
        }

        const searchOperation = new AccountSearchOperation(this.props.account.id);
        searchOperation.fromState(this.props.reduxFilters);

        this.apiRequest = AccountHelper.fetchTasCategoryTotals({
            group: categoryLabelFields[this.state.categoryScope],
            field: 'obligations_incurred_by_program_object_class_cpe',
            aggregate: 'sum',
            order: ['-aggregate'],
            filters: searchOperation.toParams(),
            page: this.state.page,
            limit: 5,
            auditTrail: `Rank vis - ${this.state.categoryScope}`
        });

        this.apiRequest.promise
            .then((res) => {
                this.apiRequest = null;

                this.setState({
                    loading: false
                });

                this.parseData(res.data);
            })
            .catch((err) => {
                if (!isCancel(err)) {
                    this.setState({
                        loading: false
                    });
                    this.apiRequest = null;
                }
            });
    }

    parseData(data) {
        const labelSeries = [];
        const dataSeries = [];
        const descriptions = [];

        const labelField = categoryLabelFields[this.state.categoryScope];

        // iterate through each response object and break it up into groups, x series, and y series
        data.results.forEach((item) => {
            const adjustedValue = parseFloat(item.aggregate);

            labelSeries.push(item[labelField]);
            dataSeries.push(parseFloat(adjustedValue));

            const description = `Obligated balance for ${item[labelField]}: \
${MoneyFormatter.formatMoney(adjustedValue)}`;
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
            <AccountRankVisualizationSection
                {...this.state}
                changeScope={this.changeScope}
                nextPage={this.nextPage}
                previousPage={this.previousPage} />
        );
    }
}

AccountRankVisualizationContainer.propTypes = propTypes;

export default connect(
    (state) => ({
        reduxFilters: state.account.filters,
        account: state.account.account
    }),
    (dispatch) => bindActionCreators(accountFilterActions, dispatch)
)(AccountRankVisualizationContainer);
