/**
 * RecipientContainer.jsx
 * Created by Lizzie Salita 8/23/17
 **/

import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { isCancel } from 'axios';

import BaseRecipientOverview from 'models/v2/recipient/BaseRecipientOverview';
import * as recipientActions from 'redux/actions/recipient/recipientActions';
import * as RecipientHelper from 'helpers/recipientHelper';
import Router from 'containers/router/Router';

import RecipientPage from 'components/recipient/RecipientPage';

require('pages/recipient/recipientPage.scss');

const propTypes = {
    setRecipientOverview: PropTypes.func,
    setRecipientFiscalYear: PropTypes.func,
    params: PropTypes.shape({ recipientId: PropTypes.string, fy: PropTypes.string }),
    recipient: PropTypes.object
};

export class RecipientContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            error: false
        };

        this.request = null;
        this.updateSelectedFy = this.updateSelectedFy.bind(this);
    }

    componentDidMount() {
        if (!Object.keys(this.props.params).includes('fy')) {
            Router.history.replace(`/recipient/${this.props.params.recipientId}/latest`);
        }
        this.props.setRecipientFiscalYear(this.props.params.fy);
        this.loadRecipientOverview(this.props.params.recipientId, this.props.recipient.fy);
    }

    componentDidUpdate(prevProps) {
        if (this.props.params.recipientId !== prevProps.params.recipientId) {
            // Reset the FY
            this.props.setRecipientFiscalYear(this.props.params.fy);
            this.loadRecipientOverview(this.props.params.recipientId, 'latest');
        }
        if (!prevProps.params.fy && this.props.params.fy) {
            // we just redirected the user to the new url which includes the fy selection
            this.props.setRecipientFiscalYear(this.props.params.fy);
        }
        if (this.props.recipient.fy !== prevProps.recipient.fy) {
            this.loadRecipientOverview(this.props.params.recipientId, this.props.recipient.fy);
        }
    }

    componentWillUnmount() {
        // Reset the FY
        this.props.setRecipientFiscalYear('latest');
    }

    loadRecipientOverview(id, year) {
        if (this.request) {
            // A request is currently in-flight, cancel it
            this.request.cancel();
        }

        this.request = RecipientHelper.fetchRecipientOverview(id, year);

        this.request.promise
            .then((res) => {
                this.setState({
                    loading: false
                }, () => {
                    this.parseRecipient(res.data);
                });
            })
            .catch((err) => {
                if (!isCancel(err)) {
                    console.log(err);

                    this.setState({
                        loading: false,
                        error: true
                    });
                }
            });
    }

    parseRecipient(data) {
        const recipientOverview = Object.create(BaseRecipientOverview);
        recipientOverview.populate(data);
        this.props.setRecipientOverview(recipientOverview);
    }

    updateSelectedFy(fy) {
        Router.history.push(`/recipient/${this.props.recipient.id}/${fy}`);
        this.props.setRecipientFiscalYear(fy);
    }

    render() {
        return (
            <RecipientPage
                loading={this.state.loading}
                error={this.state.error}
                id={this.props.recipient.id}
                recipient={this.props.recipient}
                pickedFy={this.updateSelectedFy} />
        );
    }
}

export default connect(
    (state) => ({
        recipient: state.recipient
    }),
    (dispatch) => bindActionCreators(recipientActions, dispatch)
)(RecipientContainer);

RecipientContainer.propTypes = propTypes;
