/**
 * Recipient.jsx
 * Created by Jonathan Hill 11/26/19
 **/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    getAwardTypeRecordtypeCountyAndState,
    isAwardFinancialAssistance
} from 'helpers/awardSummaryHelper';
import {
    aggregateTextRecipientSection,
    aggregateGlossaryLinks,
    aggregateGlossaryText
} from 'dataMapping/awardsv2/awardOverview';
import { Glossary } from 'components/sharedComponents/icons/Icons';
import AwardSection from '../AwardSection';
import RecipientAddress from './RecipientAddress';


const propTypes = {
    recipient: PropTypes.object,
    awardType: PropTypes.string,
    placeOfPerformance: PropTypes.object,
    recordType: PropTypes.number,
    awardId: PropTypes.string
};

export default class Recipient extends Component {
    isFinancialAssistance = isAwardFinancialAssistance(this.props.awardType);

    formatRecipientLink = (internalId, name) => {
        if (internalId && name) {
            return (<a href={`#/recipient/${internalId}`}>{name}</a>);
        }
        else if (internalId) {
            return (<a href={`#/recipient/${internalId}`}>Unknown</a>);
        }
        return name;
    };

    aggregateRecordType = () => getAwardTypeRecordtypeCountyAndState(
        this.isFinancialAssistance,
        this.props.placeOfPerformance,
        this.props.recordType
    );

    recipient = () => {
        const { recordType, recipient } = this.props;
        const glossaryLink = `/#/award/${this.props.awardId}?glossary=${aggregateGlossaryLinks[this.aggregateRecordType()]}`;
        const glossaryLinkText = `View glossary definition of ${aggregateGlossaryText[this.aggregateRecordType()]}`;
        if (this.isFinancialAssistance && recordType !== 2) {
            let recipientTitle = '';
            if (recordType === 1) recipientTitle = 'MULTIPLE RECIPIENTS';
            if (recordType === 3) recipientTitle = 'REDACTED DUE TO PII';
            return (
                <h5
                    className="award-overview__left-section__agency-name award-overview__left-section__agency-name__recipient">
                    {recipientTitle}
                    <div className="award__heading-icon">
                        <a href={glossaryLink}>
                            <Glossary alt={glossaryLinkText} />
                        </a>
                    </div>
                </h5>
            );
        }
        return (
            <h5
                className="award-overview__left-section__agency-name award-overview__left-section__agency-name__recipient">
                {this.formatRecipientLink(recipient.internalId, recipient.name)}
            </h5>
        );
    };

    aggregateRecordText = () => {
        if (this.isFinancialAssistance) {
            return aggregateTextRecipientSection[this.aggregateRecordType()];
        }
        return '';
    };

    render() {
        return (
            <AwardSection className="award-overview__left-section__recipient award-overview-column">
                <h6 className="award-overview-title">Recipient</h6>
                {this.recipient()}
                <RecipientAddress
                    placeOfPerformance={this.props.placeOfPerformance}
                    aggregateRecordType={this.aggregateRecordType()} />
                <div className="award-overview__left-section__aggregated-text">
                    {this.isFinancialAssistance && this.aggregateRecordText()}
                </div>
            </AwardSection>
        );
    }
}

Recipient.propTypes = propTypes;
