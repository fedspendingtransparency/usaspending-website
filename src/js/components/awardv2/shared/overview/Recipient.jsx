import React from 'react';
import PropTypes from 'prop-types';
import { isAwardFinancialAssistance } from 'helpers/awardSummaryHelper';
import AwardSection from '../AwardSection';

const propTypes = {
    recipient: PropTypes.object,
    awardType: PropTypes.string
};

const Recipient = ({ recipient, awardType }) => {
    const isTypeOfFinancialAssistance = isAwardFinancialAssistance(awardType);
    const formatRecipientLink = (internalId, name) => {
        if (internalId && name) {
            return (<a href={`#/recipient/${internalId}`}>{name}</a>);
        }
        else if (internalId) {
            return (<a href={`#/recipient/${internalId}`}>Unknown</a>);
        }
        return name;
    }
    return (
        <AwardSection className="award-overview__left-section__recipient award-overview-column">
            <h6 className="award-overview-title">Recipient</h6>
            <h5 className="award-overview__left-section__detail">
                {formatRecipientLink(recipient.internalId, recipient.name)}
            </h5>
        </AwardSection>
    );
};

Recipient.propTypes = propTypes;
export default Recipient;
