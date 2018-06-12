/**
 * RecipientContainer.jsx
 * Created by Lizzie Salita 8/23/17
 **/

import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// import { isCancel } from 'axios';

import RecipientOverviewModel from 'models/recipient/RecipientOverviewModel';
import * as recipientActions from 'redux/actions/recipient/recipientSummaryActions';
// import * as RecipientHelper from 'helpers/recipientHelper';

import RecipientPage from 'components/recipient/RecipientPage';

require('pages/recipient/recipientPage.scss');

const propTypes = {
    setRecipientOverview: PropTypes.func,
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

    componentWillMount() {
        this.loadRecipientOverview(this.props.params.recipientId);
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.params.recipientId !== nextProps.params.recipientId) {
            this.loadRecipientOverview(nextProps.params.recipientId);
        }
    }

    loadRecipientOverview(id) {
        this.setState({
            loading: false
        });
        const mockData = {
            recipient_id: id,
            recipient_name: 'The ABC Corporation A',
            recipient_duns: '014874593',
            parent_company: 'The ABC Corporation',
            recipient_parent_duns: '007872690',
            recipient_street: '7515 Colshire Dr',
            recipient_city: 'McLean',
            recipient_state: 'VA',
            recipient_zip: '22102',
            recipient_business_types: [
                'Non-Profit',
                'Federally Funded Research and Development Corp'
            ],
            primary_NAICS: '542712',
            NAICS_description: 'RESEARCH AND DEVELOPMENT IN THE PHYSICAL, ENGINEERING, ' +
            'AND LIFE SCIENCES (EXCEPT BIOTECHNOLOGY)',
            awarded_amount: '990000000000',
            historical_awarded_amount: '9200000000',
            active_awards: '150',
            historical_awards: '1227'
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

    parseRecipient(data, id) {
        const recipient = new RecipientOverviewModel(Object.assign({}, data, {
            agency_id: id
        }), true);
        this.props.setRecipientOverview(recipient);
    }

    render() {
        return (
            <RecipientPage
                loading={this.state.loading}
                error={this.state.error}
                id={this.props.recipient.id}
                recipient={this.props.recipient} />
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
