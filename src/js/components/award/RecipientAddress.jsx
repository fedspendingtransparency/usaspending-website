/**
 * RecipientAddress.jsx
 * Created by Emily Gullo 01/31/2017
 **/

import React from 'react';

const propTypes = {
    recipient: React.PropTypes.object,
    type: React.PropTypes.string,
    titleValue: React.PropTypes.string
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
        else {
            cityState = `${city} ${stateProvince}`;
        }
        return (
            <li className={this.props.type}>
                <div className={`title ${this.props.type}`}>
                    {this.props.titleValue}
                </div>
                <div className="name address">
                    {recipient.recipient_street}
                </div>
                <div className="name cityState">
                    {cityState}
                </div>
                <div className="name postalCode">
                    {recipient.recipient_zip_postal} {recipient.recipient_country}
                </div>
            </li>
        );
    }
}
RecipientAddress.propTypes = propTypes;
