/**
 * AccountContainer.jsx
 * Created by Kevin Li 3/17/17
 */

import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { isCancel } from 'axios';

import * as AccountHelper from 'helpers/accountHelper';
import * as accountActions from 'redux/actions/account/accountActions';
import * as filterActions from 'redux/actions/account/accountFilterActions';

import FederalAccount from 'models/account/FederalAccount';

import Account from 'components/account/Account';
import InvalidAccount from 'components/account/InvalidAccount';
import LoadingAccount from 'components/account/LoadingAccount';

const propTypes = {
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
            loading: true
        });

        this.accountRequest = AccountHelper.fetchFederalAccount(id);

        this.accountRequest.promise
            .then((res) => {
                this.accountRequest = null;

                // update the redux store
                this.parseAccount(res.data);

                this.setState({
                    loading: false,
                    validAccount: true,
                    currentId: id
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
