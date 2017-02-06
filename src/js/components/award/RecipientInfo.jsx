/**
 * RecipientInfo.jsx
 * Created by Emily Gullo 01/20/2017
 **/

import React from 'react';
import InfoSnippet from './InfoSnippet';
import RecipientAddress from './RecipientAddress';

const propTypes = {
    recipient: React.PropTypes.object
};

export default class RecipientInfo extends React.Component {

    render() {
        const recipient = this.props.recipient;
        const recipientDuns = "Not Available";
        const businessTypeDesc = "Not Available";

        const name = (
            <div className="recipient-name">
                {recipient.recipient_name}
            </div>);
        return (
            <div className="recipient-info">
                <h4>Recipient</h4>
                { name }
                <ul className="recipient-information">
                    <RecipientAddress
                        recipient={recipient} />
                    <InfoSnippet
                        label="DUNS"
                        value={recipientDuns} />
                    <InfoSnippet
                        label="Parent DUNS"
                        value={businessTypeDesc} />
                    <InfoSnippet
                        label="Business Type"
                        value={businessTypeDesc} />
                </ul>
            </div>
        );
    }
}
RecipientInfo.propTypes = propTypes;
