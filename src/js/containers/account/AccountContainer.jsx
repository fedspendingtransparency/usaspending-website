/**
 * AccountContainer.jsx
 * Created by Kevin Li 3/17/17
 */

import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { isCancel } from 'axios';
import { withRouter } from 'react-router-dom';
import { flowRight } from 'lodash';

import { SUBMISSION_PERIOD_PROPS, LATEST_PERIOD_PROPS } from 'propTypes';

import * as AccountHelper from 'apis/account';
import * as accountActions from 'redux/actions/account/accountActions';
import * as filterActions from 'redux/actions/account/accountFilterActions';

import FederalAccount from 'models/v1/account/FederalAccount';
import { fiscalYearSnapshotFields } from 'dataMapping/accounts/accountFields';

import withLatestFy from 'containers/account/WithLatestFy';
import Account from 'components/account/Account';
import InvalidAccount from 'components/account/InvalidAccount';
import LoadingAccount from 'components/account/LoadingAccount';


require('pages/account/accountPage.scss');

const propTypes = {
    account: PropTypes.object,
    match: PropTypes.object,
    setSelectedAccount: PropTypes.func,
    submissionPeriods: SUBMISSION_PERIOD_PROPS,
    latestPeriod: LATEST_PERIOD_PROPS,
    isFetchLatestFyLoading: PropTypes.bool
};

const combinedActions = Object.assign({},
    accountActions,
    filterActions
);

export class AccountContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            validAccount: true
        };

        this.accountRequest = null;
        this.fiscalYearSnapshotRequest = null;
    }

    componentDidMount() {
        this.loadData();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.match.params.accountNumber !== this.props.match.params.accountNumber) {
            this.loadData();
        }
        if (!prevProps.latestPeriod?.year && this.props.latestPeriod?.year && this.props.account?.id) {
            // The latest FY became available and we have the internal / database id required for
            // the FY snapshot request
            this.loadFiscalYearSnapshot(this.props.account.id);
        }
    }

    loadData() {
        if (this.accountRequest) {
            this.accountRequest.cancel();
        }

        this.setState({
            loading: true
        });

        this.accountRequest = AccountHelper.fetchFederalAccount(this.props.match.params.accountNumber);

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
                        validAccount: false
                    });

                    console.log(err);
                }
            });
    }

    parseAccount(data) {
        const account = new FederalAccount(data);
        this.props.setSelectedAccount(account);
        if (this.props.latestPeriod.year) {
            this.loadFiscalYearSnapshot(account.id);
        }
    }

    loadFiscalYearSnapshot(id) {
        if (this.fiscalYearSnapshotRequest) {
            this.fiscalYearSnapshotRequest.cancel();
        }

        this.fiscalYearSnapshotRequest = AccountHelper.fetchFederalAccountFYSnapshot(
            id,
            this.props.latestPeriod.year
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
        else if (!this.state.loading && !this.props.isFetchLatestFyLoading) {
            output = <Account {...this.props} currentFiscalYear={`${this.props.latestPeriod.year}`} />;
        }

        return output;
    }
}

AccountContainer.propTypes = propTypes;

export default flowRight(
    withRouter,
    withLatestFy,
    connect(
        (state) => ({
            account: state.account.account,
            tas: state.account.tas
        }),
        (dispatch) => bindActionCreators(combinedActions, dispatch)
    )
)(AccountContainer);
