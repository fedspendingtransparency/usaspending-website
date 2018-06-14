/**
 * RecipientContainer.jsx
 * Created by Lizzie Salita 8/23/17
 **/

import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// import { isCancel } from 'axios';

import BaseRecipientOverview from 'models/v2/recipient/BaseRecipientOverview';
import * as recipientActions from 'redux/actions/recipient/recipientSummaryActions';
// import * as RecipientHelper from 'helpers/recipientHelper';

import RecipientPage from 'components/recipient/RecipientPage';

require('pages/recipient/recipientPage.scss');

const propTypes = {
    setRecipientOverview: PropTypes.func,
    setRecipientFiscalYear: PropTypes.func,
    params: PropTypes.object,
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
    }

    componentDidMount() {
        this.loadRecipientOverview(this.props.params.recipientId, this.props.recipient.fy);
    }

    componentDidUpdate(prevProps) {
        if (this.props.params.recipientId !== prevProps.params.recipientId) {
            // Reset the FY
            this.props.setRecipientFiscalYear('latest');
            this.loadRecipientOverview(this.props.params.recipientId, 'latest');
        }
        if (this.props.recipient.fy !== prevProps.recipient.fy) {
            this.loadRecipientOverview(this.props.params.recipientId, this.props.recipient.fy);
        }
    }

    loadRecipientOverview(id, year) {
        this.setState({
            loading: false
        });
        const mockData = {
            legal_entity_id: id,
            name: 'The ABC Corporation A',
            duns: '014874593',
            parent_name: 'The ABC Corporation',
            parent_duns: '007872690',
            location: {
                address_line1: '7515 Colshire Dr',
                city_name: 'McLean',
                state_code: 'VA',
                zip_5: '22102'
            },
            business_types: [
                'Non-Profit',
                'Federally Funded Research and Development Corp'
            ],
            total_prime_amount: 1000,
            total_sub_amount: 800,
            total_prime_awards: 150,
            total_sub_awards: 75
        };

        this.parseRecipient(mockData, id);

        // TODO - Lizzie: uncomment when endpoint is ready
        // if (this.request) {
        //    // A request is currently in-flight, cancel it
        //    this.request.cancel();
        // }

        // this.request = RecipientHelper.fetchRecipient(id);
        //
        // this.request.promise
        //    .then((res) => {
        //        const noRecipient = Object.keys(res.data.results).length === 0;
        //
        //        this.setState({
        //            loading: false,
        //            error: noRecipient
        //        }, () => {
        //            if (!noRecipient) {
        //                this.parseRecipient(res.data.results, id);
        //            }
        //        });
        //    })
        //    .catch((err) => {
        //        if (!isCancel(err)) {
        //            console.log(err);
        //
        //            this.setState({
        //                loading: false,
        //                error: true
        //            });
        //        }
        //    });
    }

    parseRecipient(data) {
        const recipientOverview = Object.create(BaseRecipientOverview);
        recipientOverview.populate(data);
        this.props.setRecipientOverview(recipientOverview);
    }

    render() {
        return (
            <RecipientPage
                loading={this.state.loading}
                error={this.state.error}
                id={this.props.recipient.id}
                recipient={this.props.recipient}
                pickedFy={this.props.setRecipientFiscalYear} />
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
