/**
 * RecipientInfo.jsx
 * Created by Emily Gullo 01/20/2017
 **/

import React from 'react';
import _ from 'lodash';
import { awardTypeGroups } from 'dataMapping/search/awardType';
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
        const isContract = _.includes(awardTypeGroups.contracts, this.props.recipient.award_type);

        if (this.props.recipient.recipient_parent_duns) {
            parentDuns = this.props.recipient.recipient_parent_duns;
        }
        if (this.props.recipient.recipient_duns) {
            duns = this.props.recipient.recipient_duns;
        }
        if (this.props.recipient.recipient_business_type) {
            businessType = this.props.recipient.recipient_business_type;
        }
        let parentDunsSnippet = (
            <InfoSnippet
                label="Parent DUNS"
                value={parentDuns} />);
        if (!isContract) {
            // There is no parent DUNS
            parentDunsSnippet = '';
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
                    {parentDunsSnippet}
                    <InfoSnippet
                        label="Business Type"
                        value={businessType} />
                </ul>
            </div>
        );
    }
}
RecipientInfo.propTypes = propTypes;
