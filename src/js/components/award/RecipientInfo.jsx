/**
 * RecipientInfo.jsx
 * Created by Emily Gullo 01/20/2017
 **/

import React from 'react';
import PropTypes from 'prop-types';
import { toLower, includes } from 'lodash';
import { awardTypeGroups } from 'dataMapping/search/awardType';
import InfoSnippet from './InfoSnippet';
import RecipientAddress from './RecipientAddress';


const propTypes = {
    recipient: PropTypes.object
};

export default class RecipientInfo extends React.Component {

    constructor(props) {
        super(props);
        this.buildSnippets = this.buildSnippets.bind(this);
        this.buildName = this.buildName.bind(this);
    }

    buildName() {
        const recipient = this.props.recipient;
        const isMultiple = toLower(this.props.recipient.recipient_name) === 'multiple recipients';
        let recipientName = this.props.recipient.recipient_name;
        let address = null;
        if (isMultiple) {
            if (recipient.recipient_county && recipient.recipient_state_province) {
                address = ` in ${recipient.recipient_county},
                ${recipient.recipient_state_province}`;
            }
            recipientName = `Multiple Recipients${address}`;
        }
        return recipientName;
    }

    buildSnippets() {
        const recipient = this.props.recipient;
        const isMultiple = toLower(this.props.recipient.recipient_name) === 'multiple recipients';
        const multiDescription = `An award with multiple recipients indicates an aggregate award.
        Aggregate awards exist to protect recipient Personally Identifiable Information (PII).
        Agencies are currently required to aggregate these awards on a county level.`;

        let duns = "Not Available";
        let parentDuns = "Not Available";
        let businessType = "Not Available";
        const isContract = includes(awardTypeGroups.contracts, this.props.recipient.award_type);

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

        let infoSnippets = (
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
            </ul>);

        if (isMultiple) {
            infoSnippets = (
                <ul className="recipient-information single">
                    <InfoSnippet
                        label=""
                        value={multiDescription} />
                </ul>);
        }
        return infoSnippets;
    }

    render() {
        return (
            <div className="recipient-info">
                <h4>Recipient</h4>
                <div className="recipient-name">
                    {this.buildName()}
                </div>
                {this.buildSnippets()}
            </div>
        );
    }
}
RecipientInfo.propTypes = propTypes;
