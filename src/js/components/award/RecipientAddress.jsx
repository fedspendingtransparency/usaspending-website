/**
 * RecipientAddress.jsx
 * Created by Emily Gullo 01/31/2017
 **/

import React from 'react';
import _ from 'lodash';

const propTypes = {
    recipient: React.PropTypes.object,
    type: React.PropTypes.string
};

export default class RecipientAddress extends React.Component {

    render() {
        const recipient = this.props.recipient;
        let country = null;
        let district = null;

        if (recipient.recipient_country_code !== "USA") {
            country = (
                <div className="item-value">
                    {recipient.recipient_country}
                </div>);
        }
        if (recipient.recipient_congressional_district) {
            district = (
                <div className="item-value">
                    Congressional District: {recipient.recipient_congressional_district}
                </div>);
        }

        return (
            <li className={this.props.type}>
                <div className="item-label">
                    Address
                </div>
                <div className="item-value">
                    {recipient.recipient_street}
                </div>
                <div className="item-value">
                    {recipient.recipient_city}, {recipient.recipient_state_province}
                    {recipient.recipient_zip_postal}
                </div>
                {country}
                {district}
            </li>
        );
    }
}
RecipientAddress.propTypes = propTypes;
