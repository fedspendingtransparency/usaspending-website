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
        let cityState = null;

        let country = null;
        let district = null;

        if (recipient.recipient_country_code !== "USA" && recipient.recipient_country !== null) {
            country = (<span><br />{recipient.recipient_country}</span>);
        }
        if (recipient.recipient_congressional_district && recipient.recipient_state_code) {
            district = (
                <div className="item-value">
                    Congressional District: {recipient.recipient_state_code}-
                    {recipient.recipient_congressional_district}
                </div>);
        }
        if (city && stateProvince) {
            cityState = `${city}, ${stateProvince}`;
        }
        else if (city) {
            cityState = city;
        }
        else if (stateProvince) {
            cityState = stateProvince;
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
                    {cityState} {country} {recipient.recipient_zip_postal}
                </div>
                {district}
            </li>
        );
    }
}
RecipientAddress.propTypes = propTypes;
