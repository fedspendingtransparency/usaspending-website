/**
 * AccountContainer.jsx
 * Created by Kevin Li 3/17/17
 */

import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { isCancel } from 'axios';

import * as SearchHelper from 'helpers/searchHelper';
import * as accountActions from 'redux/actions/account/accountActions';
import * as filterActions from 'redux/actions/account/accountFilterActions';

import Account from 'components/account/Account';

const propTypes = {

};

const combinedActions = Object.assign({},
    accountActions,
    filterActions
);

export class AccountContainer extends React.Component {
    render() {
        return (
            <Account {...this.props} />
        );
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
