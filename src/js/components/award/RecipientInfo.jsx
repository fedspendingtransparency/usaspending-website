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
    award: PropTypes.object
};

export default class RecipientInfo extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            moreTypesButton: true
        };

        this.toggleButton = this.toggleButton.bind(this);
    }

    buildName() {
        const isMultiple = toLower(this.props.award.recipient_name) === 'multiple recipients';
        let recipientName = this.props.award.recipient_name;
        let address = null;
        if (isMultiple) {
            if (this.props.award.recipient_county && this.props.award.recipient_state_province) {
                address = ` in ${this.props.award.recipient_county},
                ${this.props.award.recipient_state_province}`;
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

    buildMultipleRecipients() {
        const description = 'An award with multiple recipients indicates an aggregate award. Aggregate awards exist to protect recipient Personally Identifiable Information (PII). Agencies are currently required to aggregate these awards on a county level.';
        return (
            <ul className="recipient-information single">
                <InfoSnippet
                    label=""
                    value={description} />
            </ul>
        );
    }

    buildParentDuns(isContract) {
        if (!isContract) {
            return null;
        }
        return (
            <InfoSnippet
                label="Parent DUNS"
                value={this.props.award.recipient_parent_duns || 'Not Available'} />
        );
    }

    buildBusinessTypes(isContract) {
        // if (!isContract) {
        //     return (
        //         <InfoSnippet
        //             label="Business Type"
        //             value={this.props.award.recipient_business_type || 'Not Available'} />
        //     );
        // }

        const listItems = [];
        BusinessTypesHelper.getBusinessTypes().forEach((type) => {
            // loop through all available business types
            if (this.props.award.latest_transaction.recipient[type.fieldName]) {
                // the business type item exists in the API response
                let displayClass = '';
                if (this.state.moreTypesButton && listItems.length >= 2) {
                    // we should hide the item until the class is expanded
                    displayClass = 'hide';
                }

                listItems.push(
                    <li
                        key={type.fieldName}
                        className={displayClass}>
                        {type.displayName}
                    </li>
                );
            }
        });

        let expandButton = null;

        if (listItems.length > 2) {
            let label = `See ${listItems.length - 2} more`;
            if (!this.state.moreTypesButton) {
                label = 'See fewer';
            }
            expandButton = (
                <button
                    onClick={this.toggleButton}
                    className="see-more">
                    {label}
                </button>
            );
        }
        else if (listItems.length === 0) {
            listItems.push(
                <li
                    key="not-available">
                    Not Available
                </li>
            );
        }

        return (
            <li>
                <div className="format-item">
                    <div className="item-label">
                        Business Types
                    </div>
                    <div className="item-value">
                        <ul className="business-types-list">
                            {listItems}
                        </ul>
                        {expandButton}
                    </div>
                </div>
            </li>
        );
    }

    buildSnippets() {
        if (toLower(this.props.award.recipient_name) === 'multiple recipients') {
            // there are multiple recipients
            return this.buildMultipleRecipients();
        }

        const isContract = includes(awardTypeGroups.contracts, this.props.award.award_type);

        return (
            <ul className="recipient-information">
                <RecipientAddress
                    recipient={this.props.award} />
                <InfoSnippet
                    label="DUNS"
                    value={this.props.award.recipient_duns || 'Not Available'} />
                {this.buildParentDuns(isContract)}
                {this.buildBusinessTypes(isContract)}
            </ul>
        );
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
