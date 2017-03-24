/**
 * AccountTimeVisualizationContainer.jsx
 * Created by Kevin Li 3/20/17
 */


import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import _ from 'lodash';
import moment from 'moment';

import AccountTimeVisualizationSection from
    'components/account/visualizations/time/AccountTimeVisualizationSection';

import * as AccountHelper from 'helpers/accountHelper';
import * as FiscalYearHelper from 'helpers/fiscalYearHelper';
import * as accountFilterActions from 'redux/actions/account/accountFilterActions';

import AccountSearchBalanceOperation from 'models/account/queries/AccountSearchBalanceOperation';
import { balanceFields } from 'dataMapping/accounts/accountFields';

const propTypes = {
    reduxFilters: React.PropTypes.object,
    account: React.PropTypes.object
};

export class AccountTimeVisualizationSectionContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            groups: [],
            xSeries: [],
            ySeries: []
        };

        this.balanceRequests = [];
    }

    componentDidMount() {
        this.fetchData();
    }

    componentDidUpdate(prevProps) {
        if (!_.isEqual(prevProps.reduxFilters, this.props.reduxFilters)) {
            this.fetchData();
        }
    }

    fetchData() {
        if (this.balanceRequests.length > 0) {
            // cancel all previous requests
            this.balanceRequests.forEach((request) => {
                request.cancel();
            });
            this.balanceRequests = [];
        }

        const searchOperation = new AccountSearchBalanceOperation(this.props.account.id);
        searchOperation.fromState(this.props.reduxFilters);
        const filters = searchOperation.toParams();

        const requests = [];
        const promises = [];
        Object.keys(balanceFields).forEach((balanceType) => {
            // generate an API call
            const request = AccountHelper.fetchTasBalanceTotals({
                filters,
                group: 'reporting_period_start',
                field: balanceFields[balanceType],
                aggregate: 'sum',
                order: ['reporting_period_start']
            });

            request.type = balanceType;

            requests.push(request);
            promises.push(request.promise);
        });

        this.balanceRequests = requests;

        Promise.all(promises)
            .then((res) => {
                this.parseBalances(res);

                this.setState({
                    loading: false
                });
            })
            .catch((err) => {
                if (!isCancel(err)) {
                    this.setState({
                        loading: false
                    });
                    console.log(err);
                }
            });

        }

    parseBalances(data) {

        const years = [];

        const balances = {};
        data.forEach((item, i) => {
            const type = this.balanceRequests[i].type;
            const values = {};

            item.data.results.forEach((group) => {
                const date = moment(group.item, 'YYYY-MM-DD');
                const fy = FiscalYearHelper.convertDateToFY(date);
                if (_.indexOf(years, fy) === -1) {
                    years.push(fy);
                }
                values[fy] = group.aggregate;
            });

            balances[type] = values;
        });


        const groups = [];
        const xSeries = [];
        const ySeries = [];

        years.forEach((year) => {
            groups.push(`${year}`);
            xSeries.push([`${year}`]);

            const outlay = parseFloat(-1 * balances.outlay[year]);
            const obligations = parseFloat(balances.obligated[year]);
            const budgetAuthority = parseFloat(balances.budgetAuthority[year]);

            ySeries.push([[budgetAuthority, obligations, outlay]]);
        });

        this.setState({
            groups,
            xSeries,
            ySeries,
            loading: false
        });
    }

    render() {
        return (
            <AccountTimeVisualizationSection data={this.state} />
        );
    }
}

AccountTimeVisualizationSectionContainer.propTypes = propTypes;

export default connect(
    (state) => ({
        reduxFilters: state.account.filters,
        account: state.account.account
    }),
    (dispatch) => bindActionCreators(accountFilterActions, dispatch)
)(AccountTimeVisualizationSectionContainer);
