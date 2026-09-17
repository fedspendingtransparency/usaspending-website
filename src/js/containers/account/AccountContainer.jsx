/**
 * AccountContainer.jsx
 * Created by Kevin Li 3/17/17
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { flowRight } from 'lodash-es';
import { useMatch } from 'react-router';


import { SUBMISSION_PERIOD_PROPS, LATEST_PERIOD_PROPS } from 'propTypes';

import * as accountActions from 'redux/actions/account/accountActions';
import * as filterActions from 'redux/actions/account/accountFilterActions';

import withLatestFy from 'containers/account/WithLatestFy';
import Account from 'components/account/Account';
import InvalidAccount from 'components/account/InvalidAccount';
import LoadingAccount from 'components/account/LoadingAccount';
import useFetchFederalAccount from "./useFetchFederalAccount";

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
    const match = useMatch('/federal_account/:accountNumber');
    const { accountNumber } = match.params;

    const { account, loading, error } = useFetchFederalAccount(accountNumber);

    useEffect(() => {
        props.setSelectedAccount(account);
    }, [account]);

    const renderAccount = () => {
        let output = <LoadingAccount />;

        if (!loading && error) {
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
