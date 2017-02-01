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
        const location = recipient.location;
        const title = `title ${this.props.type}`;
        const titleValue = this.props.titleValue;
        const address = `${location.recipient_line1}
        ${location.recipient_line2} ${location.recipient_line3}`;
        let city = "";
        let cityState = "";
        let stateProvince = "";
        let postalCode = "";
        let country = "";

        if (location.foreign_city_name) {
            city = location.foreign_city_name;
        }
        else {
            city = location.location_city_name;
        }
        if (location.location_foreign_provice) {
            stateProvince = location.location_foreign_provice;
        }
        else {
            stateProvince = location.location_state_code;
        }
        if (location.location_foreign_postal_code) {
            postalCode = location.location_foreign_postal_code;
        }
        else {
            postalCode = location.location_zip5;
        }
        if (location.location_country_code) {
            country = location.location_country_code;
        }
        else {
            country = location.country_name;
        }
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
                <div className={title}>
                    {titleValue}
                </div>
                <div className="name address">
                    {address}
                </div>
                <div className="name cityState">
                    {cityState}
                </div>
                <div className="name postalCode">
                    {postalCode} {country}
                </div>
            </li>
        );
    }
}
RecipientAddress.propTypes = propTypes;
