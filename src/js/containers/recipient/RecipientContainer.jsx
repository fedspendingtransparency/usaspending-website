/**
 * RecipientContainer.jsx
 * Created by Lizzie Salita 8/23/17
 **/

import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// import { isCancel } from 'axios';

import * as recipientActions from 'redux/actions/recipient/recipientSummaryActions';
// import * as RecipientHelper from 'helpers/recipientHelper';

import RecipientPage from 'components/recipient/RecipientPage';

const propTypes = {
    setSelectedRecipient: PropTypes.func,
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
        this.loadRecipient(this.props.params.recipientId);
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.params.recipientId !== nextProps.params.recipientId) {
            this.loadRecipient(nextProps.params.recipientId);
        }
    }

    loadRecipient(id) {
        this.setState({
            loading: false
        });
        const mockData = {
            recipientId: id,
            recipientName: 'The ABC Corporation A',
            duns: '014874593',
            parentDuns: '007872690',
            address: '7515 Colshire Dr, McLean, VA 22102',
            recipientTypes: [
                'Non-Profit',
                'Federally Funded Research and Development Corp'
            ],
            primaryNaics: '542712 - RESEARCH AND DEVELOPMENT IN THE PHYSICAL, ENGINEERING,' +
            'AND LIFE SCIENCES (EXCEPT BIOTECHNOLOGY)',
            awardedAmount: 990000000000,
            historicalAmount: 9200000000000,
            activeAwards: 150,
            historicalAwards: 1227
        };

        this.parseRecipient(mockData);

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
        this.props.setSelectedRecipient(data);
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
