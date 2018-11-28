/**
 * AccountContainer.jsx
 * Created by Kevin Li 3/17/17
 */

import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { isCancel } from 'axios';

import * as AccountHelper from 'helpers/accountHelper';
import * as FiscalYearHelper from 'helpers/fiscalYearHelper';
import * as accountActions from 'redux/actions/account/accountActions';
import * as filterActions from 'redux/actions/account/accountFilterActions';

import FederalAccount from 'models/v2/account/FederalAccount';
import { fiscalYearSnapshotFields } from 'dataMapping/accounts/accountFields';

import Account from 'components/account/Account';
import InvalidAccount from 'components/account/InvalidAccount';
import LoadingAccount from 'components/account/LoadingAccount';

require('pages/account/accountPage.scss');

const propTypes = {
    account: PropTypes.object,
    params: PropTypes.object,
    setSelectedAccount: PropTypes.func
};

const combinedActions = Object.assign({},
    accountActions,
    filterActions
);

export class AccountContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentAccountNumber: '',
            loading: true,
            validAccount: true
        };

        this.accountRequest = null;
        this.fiscalYearSnapshotRequest = null;
    }

    componentDidMount() {
        this.loadData(this.props.params.accountNumber);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.params.accountNumber !== this.props.params.accountNumber) {
            this.loadData(this.props.params.accountNumber);
        }
    }

    loadData(accountNumber) {
        if (this.accountRequest) {
            this.accountRequest.cancel();
        }

        this.setState({
            loading: true,
            currentAccountNumber: accountNumber
        });

        this.accountRequest = AccountHelper.fetchFederalAccount(accountNumber);

        this.accountRequest.promise
            .then((res) => {
                this.accountRequest = null;

                // update the redux store
                this.parseAccount(res.data);

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
                        currentAccountNumber: accountNumber
                    });

                    console.log(err);
                }
            });
    }

    parseAccount(data) {
        const account = new FederalAccount(data);
        this.props.setSelectedAccount(account);
        this.loadFiscalYearSnapshot(account.id);
    }

    loadFiscalYearSnapshot(id) {
        if (this.fiscalYearSnapshotRequest) {
            this.fiscalYearSnapshotRequest.cancel();
        }

        const currentFiscalYear = FiscalYearHelper.defaultFiscalYear();

        this.fiscalYearSnapshotRequest = AccountHelper.fetchFederalAccountFYSnapshot(
            id,
            currentFiscalYear
        );

        this.fiscalYearSnapshotRequest.promise
            .then((res) => {
                this.fiscalYearSnapshotRequest = null;

                // update the redux store
                this.parseFYSnapshot(res.data);

                this.setState({
                    loading: false
                });
            })
            .catch((err) => {
                this.fiscalYearSnapshotRequest = null;

                if (!isCancel(err)) {
                    this.setState({
                        loading: false
                    });

                    console.log(err);
                }
            });
    }

    parseFYSnapshot(data) {
        const balances = {
            available: false
        };

        if (Object.keys(data).length > 0 && data.results) {
            Object.keys(fiscalYearSnapshotFields).forEach((key) => {
                balances[fiscalYearSnapshotFields[key]] = data.results[key];
            });
            balances.available = true;
        }

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
