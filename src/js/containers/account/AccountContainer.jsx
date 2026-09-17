/**
 * AccountContainer.jsx
 * Created by Kevin Li 3/17/17
 */

import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { isCancel } from 'axios';
import { flowRight } from 'lodash-es';
import { useMatch } from 'react-router';


import { SUBMISSION_PERIOD_PROPS, LATEST_PERIOD_PROPS } from 'propTypes';

import * as AccountHelper from 'apis/account';
import * as accountActions from 'redux/actions/account/accountActions';
import * as filterActions from 'redux/actions/account/accountFilterActions';

import FederalAccount from 'models/v1/account/FederalAccount';

import withLatestFy from 'containers/account/WithLatestFy';
import Account from 'components/account/Account';
import InvalidAccount from 'components/account/InvalidAccount';
import LoadingAccount from 'components/account/LoadingAccount';


require('pages/account/accountPage.scss');

const propTypes = {
    account: PropTypes.object,
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
    const match = useMatch('/federal_account/:accountNumber');
    const { accountNumber } = match.params;

    const accountRequestRef = useRef(null);

    const parseAccount = (data) => {
        const account = new FederalAccount(data);
        props.setSelectedAccount(account);
    };

    const loadData = () => {
        if (accountRequestRef.current) {
            accountRequestRef.current.cancel();
        }

        setLoading(true);

        accountRequestRef.current = AccountHelper.fetchFederalAccount(accountNumber);

        accountRequestRef.current.promise
            .then((res) => {
                accountRequestRef.current = null;

                // update the redux store
                parseAccount(res.data);

                setValidAccount(true);
                setLoading(false);
            })
            .catch((err) => {
                accountRequestRef.current = null;

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
    }, [accountNumber]);

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
