/**
 * AccountContainer.jsx
 * Created by Kevin Li 3/17/17
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { flowRight } from 'lodash-es';
import { useMatch } from 'react-router';

import { SUBMISSION_PERIOD_PROPS, LATEST_PERIOD_PROPS } from 'propTypes';
import { setSelectedAccount } from "../../redux/actions/account/accountActions";
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

const AccountContainer = (props) => {
    const dispatch = useDispatch();
    const match = useMatch('/federal_account/:accountNumber');
    const { accountNumber } = match.params;

    const { account, loading, error } = useFetchFederalAccount(accountNumber);

    useEffect(() => {
        dispatch(setSelectedAccount(account));
    }, [account, dispatch]);

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
    withLatestFy
)(AccountContainer);
