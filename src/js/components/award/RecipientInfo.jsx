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
        let duns = "Not Available";
        let parentDuns = "Not Available";
        let businessType = "Not Available";
        if (this.props.recipient.recipient_parent_duns) {
            parentDuns = this.props.recipient.recipient_parent_duns;
        }
        if (this.props.recipient.recipient_duns) {
            duns = this.props.recipient.recipient_duns;
        }
        if (this.props.recipient.recipient_business_type) {
            businessType = this.props.recipient.recipient_business_type;
        }

        return (
            <div className="recipient-info">
                <h4>Recipient</h4>
                <div className="recipient-name">
                    {recipient.recipient_name}
                </div>
                <ul className="recipient-information">
                    <RecipientAddress
                        recipient={recipient} />
                    <InfoSnippet
                        label="DUNS"
                        value={duns} />
                    <InfoSnippet
                        label="Parent DUNS"
                        value={parentDuns} />
                    <InfoSnippet
                        label="Business Type"
                        value={businessType} />
                </ul>
            </div>
        );
    }
}
RecipientInfo.propTypes = propTypes;
