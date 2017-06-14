/**
 * RecipientAddress.jsx
 * Created by Emily Gullo 01/31/2017
 **/

import React from 'react';

const propTypes = {
    recipient: React.PropTypes.object,
    type: React.PropTypes.string
};

export default class RecipientAddress extends React.Component {

    render() {
        const recipient = this.props.recipient;
        const city = recipient.recipient_city;
        const stateProvince = recipient.recipient_state_province;

        let country = null;
        let district = null;

        if (recipient.recipient_country_code !== "USA") {
            country = (<span><br />{recipient.recipient_country}</span>);
        }
        if (recipient.recipient_congressional_district) {
            district = (
                <div className="item-value">
                    Congressional District: {recipient.recipient_state_code}-
                    {recipient.recipient_congressional_district}
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
                    {`${city}, ${stateProvince}`} {country} {recipient.recipient_zip_postal}
                </div>
                {district}
            </li>
        );
    }
}
RecipientAddress.propTypes = propTypes;
