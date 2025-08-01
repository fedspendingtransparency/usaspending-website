/**
 * Recipient.jsx
 * Created by Jonathan Hill 11/26/19
 **/

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import {
    getAwardTypeByRecordtypeCountyAndState,
    isAwardFinancialAssistance
} from 'helpers/awardSummaryHelper';
import {
    aggregateTextRecipientSection,
    aggregateGlossaryLinks,
    aggregateGlossaryText
} from 'dataMapping/award/awardOverview';
import { Glossary } from 'components/sharedComponents/icons/Icons';
import AwardSection from '../AwardSection';
import RecipientAddress from './RecipientAddress';


const propTypes = {
    recipient: PropTypes.object,
    awardType: PropTypes.string,
    recordType: PropTypes.number,
    awardId: PropTypes.string
};

const Recipient = ({
    recipient,
    awardType,
    recordType,
    awardId
}) => {
    const isFinancialAssistance = isAwardFinancialAssistance(awardType);

    const formatRecipientLink = (internalId, name) => {
        if (internalId && name) {
            return (<Link to={`/recipient/${internalId}/latest`}>{name}</Link>);
        }
        else if (internalId) {
            return (<Link to={`/recipient/${internalId}/latest`}>Unknown</Link>);
        }
        return name;
    };
    const aggregateRecordType = () => getAwardTypeByRecordtypeCountyAndState(
        awardType,
        recipient.location,
        recordType
    );
    const recipientComponent = () => {
        const glossaryLink = `/award/${awardId}?glossary=${aggregateGlossaryLinks[aggregateRecordType()]}`;
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
                        <Link to={glossaryLink}>
                            <Glossary alt={glossaryLinkText} />
                        </Link>
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
        <AwardSection className="award-overview__left-section__recipient award-overview-column award-overview-column__spacing">
            <h6 className="award-overview-title">Recipient</h6>
            {recipientComponent()}
            <RecipientAddress
                recipientLocation={recipient.location}
                aggregateRecordType={aggregateRecordType()} />
            <div className="award-overview__left-section__aggregated-text">
                {isFinancialAssistance && aggregateRecordText()}
            </div>
        </AwardSection>
    );
};

Recipient.propTypes = propTypes;
export default Recipient;
