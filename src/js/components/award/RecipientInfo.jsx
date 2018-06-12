/**
 * RecipientInfo.jsx
 * Created by Emily Gullo 01/20/2017
 **/

import React from 'react';
import PropTypes from 'prop-types';
import { toLower } from 'lodash';
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

        this.toggleButton = this.toggleButton.bind(this);
    }

    buildName() {
        const recipient = this.props.recipient;
        let recipientName = recipient.name;

        if (toLower(recipientName) === 'multiple recipients') {
            let address = '';
            if (recipient._county && recipient.stateProvince) {
                address = ` in ${recipient.county}, ${recipient.stateProvince}`;
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

    buildBusinessTypes() {
        const listItems = this.props.recipient.businessTypes.map((type, i) => {
            let displayClass = '';
            if (this.state.moreTypesButton && i >= 2) {
                // we should hide the item until the class is expanded
                displayClass = 'hide';
            }
            return (
                <li
                    key={type}
                    className={displayClass}>
                    {type}
                </li>
            );
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
        const recipient = this.props.recipient;
        if (toLower(recipient.name) === 'multiple recipients') {
            // there are multiple recipients
            return this.buildMultipleRecipients();
        }

        let parentDunsSnippet = null;

        if (recipient.parentDuns) {
            parentDunsSnippet = (
                <InfoSnippet
                    label="Parent DUNS"
                    value={recipient.parentDuns} />
            );
        }


        let businessTypesSnippet = (
            <InfoSnippet
                label="Business Type"
                value="--" />
        );

        if (recipient.businessTypes.length > 0) {
            businessTypesSnippet = this.buildBusinessTypes();
        }

        return (
            <ul className="recipient-information">
                <RecipientAddress
                    location={recipient.location} />
                <InfoSnippet
                    label="DUNS"
                    value={recipient.duns} />
                {parentDunsSnippet}
                {businessTypesSnippet}
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
