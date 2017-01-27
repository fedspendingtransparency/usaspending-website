/**
 * RecipientInfo.jsx
 * Created by Emily Gullo 01/20/2017
 **/

import React from 'react';

const propTypes = {
    recipient: React.PropTypes.object
};

export default class RecipientInfo extends React.Component {

    render() {
        const recipient = this.props.recipient;
        const name = (
            <div className="recipient-name">
                {recipient.recipient_name}
            </div>);
        const address = (
            <li className="recipient-address">
                <div className="recipient-address title">
                    Address
                </div>
                <div className="recipient-address name">
                    <span className="address-line">
                        {recipient.location.location_address_line1}
                    </span>
                    <span className="address-line">
                        {recipient.location.location_address_line2}
                    </span>
                    <span className="address-line">
                        {recipient.location.location_address_line3}
                    </span>
                    {recipient.location.location_city_name},
                    &nbsp;{recipient.location.location_state_code}
                    &nbsp;{recipient.location.location_zip5}
                </div>
            </li>
        );
        const duns = (
            <li className="recipient-duns">
                <div className="recipient-duns title">
                    DUNS
                </div>
                <div className="recipient-duns name">
                    149879157
                </div>
            </li>
        );
        const parentDuns = (
            <li className="recipient-parent-duns">
                <div className="recipient-parent-duns title">
                    Parent DUNS
                </div>
                <div className="recipient-parent-duns name">
                    009256819
                </div>
            </li>
        );
        const businessType = (
            <li className="recipient-business-type">
                <div className="recipient-business-type title">
                    Business Type
                </div>
                <div className="recipient-business-type name">
                    Corporate Not Tax-Exempt, For Profit Organization, Manufacturer of Goods
                </div>
            </li>
        );
        return (
            <div className="recipient-info">
                <h4>Recipient</h4>
                { name }
                <ul className="recipient-information">
                    { address }
                    { duns }
                    { parentDuns }
                    { businessType }
                </ul>
            </div>
        );
    }
}
RecipientInfo.propTypes = propTypes;
