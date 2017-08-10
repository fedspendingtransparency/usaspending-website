/**
 * RecipientInfo.jsx
 * Created by Emily Gullo 01/20/2017
 **/

import React from 'react';
import PropTypes from 'prop-types';
import { toLower, includes } from 'lodash';
import { awardTypeGroups } from 'dataMapping/search/awardType';
import * as BusinessTypesHelper from 'helpers/businessTypesHelper';
import InfoSnippet from './InfoSnippet';
import RecipientAddress from './RecipientAddress';


const propTypes = {
    recipient: PropTypes.object
};

export default class RecipientInfo extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            moreTypesButton: true
        };

        this.buildSnippets = this.buildSnippets.bind(this);
        this.buildName = this.buildName.bind(this);
        this.toggleButton = this.toggleButton.bind(this);
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

    toggleButton() {
        this.setState({
            moreTypesButton: !this.state.moreTypesButton
        });
    }

    buildSnippets() {
        const recipient = this.props.recipient;
        const isMultiple = toLower(this.props.recipient.recipient_name) === 'multiple recipients';
        const multiDescription = `An award with multiple recipients indicates an aggregate award.
        Aggregate awards exist to protect recipient Personally Identifiable Information (PII).
        Agencies are currently required to aggregate these awards on a county level.`;

        let duns = "Not Available";
        let parentDuns = "Not Available";
        const isContract = includes(awardTypeGroups.contracts, this.props.recipient.award_type);

        if (this.props.recipient.recipient_parent_duns) {
            parentDuns = this.props.recipient.recipient_parent_duns;
        }
        if (this.props.recipient.recipient_duns) {
            duns = this.props.recipient.recipient_duns;
        }

        let businessType = "Not Available";
        let businessTypeLabel = "Business Type";
        let overflow = false;
        const businessTypesArray = [];
        let typesList = '';

        if (isContract && this.props.recipient.recipient_business_type === 'Unknown Types') {
            businessTypeLabel = "Business Types";
            // Build an array of applicable business type fields
            const allBusinessTypes = BusinessTypesHelper.getBusinessTypes();
            allBusinessTypes.forEach((type) => {
                if (recipient.latest_transaction.recipient[type.fieldName] === '1') {
                    businessTypesArray.push(type);
                }
            });

            if ((businessTypesArray.length > 0) && (businessTypesArray.length <= 2)) {
                // Show all the business types
                typesList = businessTypesArray.map((type) => <li key={type.fieldName}>{type.displayName}</li>);
            }
            else if (businessTypesArray.length > 2) {
                // Show just the first two types until a user clicks the 'See More' button
                overflow = true;
                if (this.state.moreTypesButton) {
                    typesList = [businessTypesArray[0], businessTypesArray[1]].map((type) =>
                        <li key={type.fieldName}>{type.displayName}</li>
                    );
                }
                else {
                    typesList = businessTypesArray.map((type) =>
                        <li key={type.fieldName}>{type.displayName}</li>
                    );
                }
            }
        }
        else {
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

        let businessTypesSnippet = (
            <InfoSnippet
                label={businessTypeLabel}
                value={businessType} />);

        if (overflow) {
            let button = (<button
                onClick={this.toggleButton}
                className="see-more">{`See ${businessTypesArray.length - 2} more`}</button>);
            if (!this.state.moreTypesButton) {
                button = (<button
                    onClick={this.toggleButton}
                    className="see-more">{`See less`}</button>);
            }
            businessTypesSnippet = (
                <li>
                    <div className="format-item">
                        <div className="item-label">
                            Business Types
                        </div>
                        <div className="item-value">
                            <ul className="business-types-list">
                                {typesList}
                            </ul>
                            {button}
                        </div>
                    </div>
                </li>);
        }

        let infoSnippets = (
            <ul className="recipient-information">
                <RecipientAddress
                    recipient={recipient} />
                <InfoSnippet
                    label="DUNS"
                    value={duns} />
                {parentDunsSnippet}
                {businessTypesSnippet}
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
