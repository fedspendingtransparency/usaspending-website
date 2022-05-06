/**
 * RecipientContainer.jsx
 * Created by Lizzie Salita 8/23/17
 **/

import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { isCancel } from 'axios';
import { withRouter } from 'react-router-dom';

import BaseRecipientOverview from 'models/v2/recipient/BaseRecipientOverview';
import * as recipientActions from 'redux/actions/recipient/recipientActions';
import * as RecipientHelper from 'helpers/recipientHelper';
import { isFyValid } from 'helpers/fiscalYearHelper';

import RecipientPage from 'components/recipient/RecipientPage';

require('pages/recipient/recipientPage.scss');

const defaultFy = 'latest';

export class RecipientContainer extends React.Component {
    static propTypes = {
        setRecipientOverview: PropTypes.func,
        setRecipientFiscalYear: PropTypes.func,
        resetRecipient: PropTypes.func,
        recipient: PropTypes.object,
        match: PropTypes.object,
        history: PropTypes.object
    };

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
        const params = this.props.match.params;
        if (Object.keys(params).includes('fy')) {
            if ([defaultFy, 'all'].includes(params.fy) || isFyValid(params.fy)) {
                this.props.setRecipientFiscalYear(params.fy);
                this.loadRecipientOverview(params.recipientId, this.props.recipient.fy);
            }
            else {
                this.props.history.replace(`/recipient/${this.props.match.params.recipientId}/${defaultFy}`);
                this.props.setRecipientFiscalYear(defaultFy);
                this.loadRecipientOverview(params.recipientId, defaultFy);
            }
        }
        else {
            this.props.history.replace(`/recipient/${this.props.match.params.recipientId}/${defaultFy}`);
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.match.params.recipientId !== prevProps.match.params.recipientId) {
            // Reset the FY
            this.props.setRecipientFiscalYear(this.props.match.params.fy);
            this.loadRecipientOverview(this.props.match.params.recipientId, defaultFy);
        }
        if (prevProps.match.params.fy !== this.props.match.params.fy) {
            this.props.setRecipientFiscalYear(this.props.match.params.fy);
        }
        if (this.props.recipient.fy !== prevProps.recipient.fy) {
            this.loadRecipientOverview(this.props.match.params.recipientId, this.props.recipient.fy);
        }
    }

    componentWillUnmount() {
    // Reset the FY
        this.props.setRecipientFiscalYear(defaultFy);
        this.props.resetRecipient();
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
                    console.error(err);

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
        this.props.history.push(`/recipient/${this.props.recipient.id}/${fy}`);
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

const RecipientContainerWithRouter = withRouter(RecipientContainer);
export default connect(
    (state) => ({
        recipient: state.recipient
    }),
    (dispatch) => bindActionCreators(recipientActions, dispatch)
)(RecipientContainerWithRouter);
