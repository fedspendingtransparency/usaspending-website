/**
 * AccountContainer.jsx
 * Created by Kevin Li 3/17/17
 */

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { isCancel } from 'axios';
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

const AccountContainer = (props) => {
    const [loading, setLoading] = useState(true);
    const [validAccount, setValidAccount] = useState(true);

    let accountRequest = null;
    let fiscalYearSnapshotRequest = null;

    const parseFYSnapshot = (data) => {
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
        const account = Object.assign({}, props.account);
        account.totals = balances;
        props.setSelectedAccount(account);
    };

    const loadFiscalYearSnapshot = (id) => {
        if (fiscalYearSnapshotRequest) {
            fiscalYearSnapshotRequest.cancel();
        }

        fiscalYearSnapshotRequest = AccountHelper.fetchFederalAccountFYSnapshot(
            id,
            props.latestPeriod.year
        );

        fiscalYearSnapshotRequest.promise
            .then((res) => {
                fiscalYearSnapshotRequest = null;

                // update the redux store
                parseFYSnapshot(res.data);

                setLoading(false);
            })
            .catch((err) => {
                fiscalYearSnapshotRequest = null;

                if (!isCancel(err)) {
                    setLoading(false);
                    console.log(err);
                }
            });
    };

    const parseAccount = (data) => {
        const account = new FederalAccount(data);
        props.setSelectedAccount(account);
        if (props.latestPeriod.year) {
            loadFiscalYearSnapshot(account.id);
        }
    };


    const loadData = () => {
        if (accountRequest) {
            accountRequest.cancel();
        }

        setLoading(true);

        accountRequest = AccountHelper.fetchFederalAccount(props.match.params.accountNumber);

        accountRequest.promise
            .then((res) => {
                accountRequest = null;

                // update the redux store
                parseAccount(res.data);

                setValidAccount(true);
            })
            .catch((err) => {
                accountRequest = null;

                if (!isCancel(err)) {
                    setLoading(false);
                    setValidAccount(false);
                    console.log(err);
                }
            });
    };

    useEffect(() => {
        loadData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props?.match?.params?.accountNumber]);

    useEffect(() => {
        loadFiscalYearSnapshot(props.account.id);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.latestPeriod?.year, props.account?.id]);

    const renderAccount = () => {
        let output = <LoadingAccount />;

        if (!loading && !validAccount) {
            output = <InvalidAccount />;
        }
        else if (!loading && !props.isFetchLatestFyLoading) {
            output = <Account {...props} currentFiscalYear={`${props.latestPeriod.year}`} />;
        }

        return output;
    };

    return (renderAccount());
};

AccountContainer.propTypes = propTypes;

export default flowRight(
    withLatestFy,
    connect(
        (state) => ({
            account: state.account.account,
            tas: state.account.tas
        }),
        (dispatch) => bindActionCreators(combinedActions, dispatch)
    )
)(AccountContainer);
