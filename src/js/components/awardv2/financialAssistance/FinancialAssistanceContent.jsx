/**
 * FinancialAssistanceContent.jsx
 * Created by David Trinh 10/9/2018
 **/

import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { glossaryLinks } from 'dataMapping/search/awardType';
import BaseAwardAmounts from 'models/v2/awardsV2/BaseAwardAmounts';
import AwardAmountsSection from '../shared/awardAmountsSection/AwardAmountsSection';
import AwardRecipient from '../shared/overview/AgencyRecipient';
import AwardDates from '../shared/overview/AwardDates';
import FederalAccountsSection from '../shared/federalAccounts/FederalAccountsSection';
import AwardSection from '../shared/AwardSection';
import ComingSoonSection from '../shared/ComingSoonSection';
import AwardPageWrapper from '../shared/AwardPageWrapper';
import AwardHistory from '../shared/awardHistorySection/AwardHistory';

const propTypes = {
    awardId: PropTypes.string,
    overview: PropTypes.object,
    jumpToSection: PropTypes.func
};

const defaultTooltipProps = {
    controlledProps: {
        isControlled: true,
        isVisible: false,
        closeTooltip: () => {},
        showTooltip: () => {}
    }
};

const FinancialAssistanceContent = ({ awardId, overview, jumpToSection }) => {
    const [activeTab, setActiveTab] = useState("transaction");

    const glossaryLink = glossaryLinks[overview.type]
        ? `/#/award_v2/${awardId}?glossary=${glossaryLinks[overview.type]}`
        : null;

    let amountsSection = (<ComingSoonSection title="Award Amounts" includeHeader />);
    if (overview.category === 'grant' || overview.category === 'loan') {
        const awardAmountData = Object.create(BaseAwardAmounts);
        awardAmountData.populate(overview, overview.category);
        amountsSection = (
            <AwardAmountsSection
                awardType={overview.category}
                awardOverview={awardAmountData}
                tooltipProps={defaultTooltipProps}
                jumptoSection={jumpToSection} />
        );
    }

    const awardAmountData = Object.create(BaseAwardAmounts);
    awardAmountData.populate(overview, overview.category);
    // TODO: Determine if we should label with FAIN/ URI instead of ID
    return (
        <AwardPageWrapper
            identifier={awardId}
            glossaryLink={glossaryLink}
            awardTypeDescription={overview.typeDescription}
            className="award-financial-assistance">
            <AwardSection type="row" className="award-overview" id="award-overview">
                <AwardRecipient
                    jumpToSection={jumpToSection}
                    awardingAgency={overview.awardingAgency}
                    category={overview.category}
                    recipient={overview.recipient} />
                <AwardSection type="column" className="award-amountdates">
                    <AwardDates overview={overview} />
                </AwardSection>
            </AwardSection>
            <AwardSection type="row">
                {amountsSection}
                <ComingSoonSection title="Description" includeHeader />
            </AwardSection>
            <AwardSection type="row">
                <ComingSoonSection title="CFDA Program / Assistance Listing Information" includeHeader />
                <FederalAccountsSection />
            </AwardSection>
            <AwardSection type="row">
                <AwardHistory overview={overview} setActiveTab={setActiveTab} activeTab={activeTab} />
            </AwardSection>
        </AwardPageWrapper>
    );
};

FinancialAssistanceContent.propTypes = propTypes;

export default FinancialAssistanceContent;
