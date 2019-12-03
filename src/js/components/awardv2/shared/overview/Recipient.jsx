/**
 * Recipient.jsx
 * Created by Jonathan Hill 11/26/19
 **/

import React from 'react';
import PropTypes from 'prop-types';
import {
    getAwardTypeByRecordtypeCountyAndState,
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

const Recipient = ({
    recipient,
    awardType,
    placeOfPerformance,
    recordType,
    awardId
}) => {
    const isFinancialAssistance = isAwardFinancialAssistance(awardType);

    const formatRecipientLink = (internalId, name) => {
        if (internalId && name) {
            return (<a href={`#/recipient/${internalId}`}>{name}</a>);
        }
        else if (internalId) {
            return (<a href={`#/recipient/${internalId}`}>Unknown</a>);
        }
        return name;
    };

    const aggregateRecordType = () => getAwardTypeByRecordtypeCountyAndState(
        isFinancialAssistance,
        placeOfPerformance,
        recordType
    );

    const recipientComponent = () => {
        const glossaryLink = `/#/award/${awardId}?glossary=${aggregateGlossaryLinks[aggregateRecordType()]}`;
        const glossaryLinkText = `View glossary definition of ${aggregateGlossaryText[aggregateRecordType()]}`;
        if (isFinancialAssistance && recordType !== 2) {
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
                {formatRecipientLink(recipient.internalId, recipient.name)}
            </h5>
        );
    };

    const aggregateRecordText = () => {
        if (isFinancialAssistance) {
            return aggregateTextRecipientSection[aggregateRecordType()];
        }
        return '';
    };

    return (
        <AwardSection className="award-overview__left-section__recipient award-overview-column">
            <h6 className="award-overview-title">Recipient</h6>
            {recipientComponent()}
            <RecipientAddress
                placeOfPerformance={placeOfPerformance}
                aggregateRecordType={aggregateRecordType()} />
            <div className="award-overview__left-section__aggregated-text">
                {isFinancialAssistance && aggregateRecordText()}
            </div>
        </AwardSection>
    );
};

Recipient.propTypes = propTypes;
export default Recipient;
