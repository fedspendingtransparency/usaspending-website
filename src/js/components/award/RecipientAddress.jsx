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
        let cityState = "";

        if (city && stateProvince) {
            cityState = `${city}, ${stateProvince}`;
        }
        else if (!city && !stateProvince) {
            cityState = null;
        }
        else if (city && !stateProvince) {
            cityState = city;
        }
        else if (!city && stateProvince) {
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
                    {cityState} {recipient.recipient_zip_postal}
                </div>
                <div className="item-value">
                    {recipient.recipient_country}
                </div>
            </li>
        );
    }
}
RecipientAddress.propTypes = propTypes;
