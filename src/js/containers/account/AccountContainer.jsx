/**
 * AccountContainer.jsx
 * Created by Kevin Li 3/17/17
 */

import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { isCancel } from 'axios';
import moment from 'moment';

import * as AccountHelper from 'helpers/accountHelper';
import * as FiscalYearHelper from 'helpers/fiscalYearHelper';
import * as accountActions from 'redux/actions/account/accountActions';
import * as filterActions from 'redux/actions/account/accountFilterActions';

import FederalAccount from 'models/account/FederalAccount';
import { balanceFields } from 'dataMapping/accounts/accountFields';

import Account from 'components/account/Account';
import InvalidAccount from 'components/account/InvalidAccount';
import LoadingAccount from 'components/account/LoadingAccount';

const propTypes = {
    account: React.PropTypes.object,
    params: React.PropTypes.object,
    setSelectedAccount: React.PropTypes.func
};

const combinedActions = Object.assign({},
    accountActions,
    filterActions
);

export class AccountContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentId: '',
            loading: true,
            validAccount: true
        };

        this.accountRequest = null;
        this.balanceRequests = [];
    }

    componentDidMount() {
        this.loadData(this.props.params.accountId);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.params.accountId !== this.state.currentId) {
            this.loadData(nextProps.params.accountId);
        }
    }

    loadData(id) {
        if (this.accountRequest) {
            this.accountRequest.cancel();
        }

        this.setState({
            loading: true,
            currentId: id
        });

        this.accountRequest = AccountHelper.fetchFederalAccount(id);

        this.accountRequest.promise
            .then((res) => {
                this.accountRequest = null;

                // update the redux store
                this.parseAccount(res.data);

                this.loadBalances();

                this.setState({
                    validAccount: true
                });
            })
            .catch((err) => {
                this.accountRequest = null;

                if (!isCancel(err)) {
                    this.setState({
                        loading: false,
                        validAccount: false,
                        currentId: id
                    });

                    console.log(err);
                }
            });
    }

    parseAccount(data) {
        const account = new FederalAccount(data);
        this.props.setSelectedAccount(account);
    }

    loadBalances() {
        if (this.balanceRequests.length > 0) {
            // cancel all previous requests
            this.balanceRequests.forEach((request) => {
                request.cancel();
            });
            this.balanceRequests = [];
        }

        const requests = [];
        const promises = [];
        Object.keys(balanceFields).forEach((balanceType) => {
            // generate an API call
            const request = AccountHelper.fetchTasBalanceTotals({
                group: 'reporting_period_start',
                field: balanceFields[balanceType],
                aggregate: 'sum',
                order: ['reporting_period_start'],
                filters: [
                    {
                        field: 'treasury_account_identifier__federal_account_id',
                        operation: 'equals',
                        value: this.props.account.id
                    },
                    {
                        field: ['reporting_period_start', 'reporting_period_end'],
                        operation: 'range_intersect',
                        value: FiscalYearHelper.currentFiscalYear(),
                        value_format: 'fy'
                    }
                ]
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
        const balances = {};

        data.forEach((item, i) => {
            const type = this.balanceRequests[i].type;
            const values = {};

            item.data.results.forEach((group) => {
                const date = moment(group.item, 'YYYY-MM-DD');
                const fy = FiscalYearHelper.convertDateToFY(date);
                values[fy] = group.aggregate;
            });

            balances[type] = values;
        });

        // update the Redux account model with balances
        const account = Object.assign({}, this.props.account);
        account.totals = balances;
        this.props.setSelectedAccount(account);
    }

    render() {
        let output = <LoadingAccount />;

        if (!this.state.loading && !this.state.validAccount) {
            output = <InvalidAccount />;
        }
        else if (!this.state.loading) {
            output = <Account {...this.props} />;
        }

        return output;
    }
}

AccountContainer.propTypes = propTypes;

export default connect(
    (state) => ({
        account: state.account.account,
        tas: state.account.tas
    }),
    (dispatch) => bindActionCreators(combinedActions, dispatch)
)(AccountContainer);
