/**
 * AccountObjectClassContainer.jsx
 * Created by Kevin Li 3/30/17
 */

import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { isCancel } from 'axios';

import * as accountFilterActions from 'redux/actions/account/accountFilterActions';

import * as AccountHelper from 'helpers/accountHelper';

import ObjectClassFilter from 'components/account/filters/objectClass/ObjectClassFilter';

const propTypes = {
    accountId: PropTypes.number,
    toggleObjectClass: PropTypes.func
};

export class AccountObjectClassContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            available: []
        };

        this.availableRequest = null;

        // bind functions
        this.updateFilter = this.updateFilter.bind(this);
    }

    componentWillMount() {
        this.loadAvailableOCs(this.props.accountId);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.accountId !== this.props.accountId) {
            this.loadAvailableOCs(nextProps.accountId);
        }
    }

    loadAvailableOCs(id) {
        if (this.availableRequest) {
            this.availableRequest.cancel();
        }

        this.setState({
            loading: true,
            error: false
        });

        this.availableRequest = AccountHelper.fetchAvailableObjectClasses(id);
        this.availableRequest.promise
            .then((res) => {
                this.setState({
                    available: res.data.results,
                    loading: false,
                    error: false
                });
            })
            .catch((err) => {
                if (!isCancel(err)) {
                    this.availableRequest = null;
                    console.log(err);

                    this.setState({
                        available: [],
                        loading: false,
                        error: true
                    });
                }
            });
    }

    updateFilter(code) {
        this.props.toggleObjectClass(code);
    }

    render() {
        return (
            <ObjectClassFilter
                {...this.props}
                available={this.state.available}
                updateFilter={this.updateFilter} />
        );
    }
}

AccountObjectClassContainer.propTypes = propTypes;

export default connect(
    (state) => ({
        accountId: state.account.account.id,
        selectedCodes: state.account.filters.objectClass
    }),
    (dispatch) => bindActionCreators(accountFilterActions, dispatch)
)(AccountObjectClassContainer);
