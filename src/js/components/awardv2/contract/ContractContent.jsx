/**
 * ContractContent.jsx
 * Created by David Trinh 10/9/2018
 **/

import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { glossaryLinks } from 'dataMapping/search/awardType';
import BaseAwardAmounts from 'models/v2/awardsV2/BaseAwardAmounts';
import AwardHistory from 'containers/awardV2/shared/AwardHistorySectionContainer';

import AdditionalInfo from '../shared/additionalInfo/AdditionalInfo';
import AgencyRecipient from '../shared/overview/AgencyRecipient';
import RelatedAwards from '../shared/overview/RelatedAwards';
import AwardDates from '../shared/overview/AwardDates';
import FederalAccountsSection from '../shared/federalAccounts/FederalAccountsSection';
import AwardPageWrapper from '../shared/AwardPageWrapper';
import AwardSection from '../shared/AwardSection';
import AwardAmountsSection from '../shared/awardAmountsSection/AwardAmountsSection';
import ComingSoonSection from '../shared/ComingSoonSection';
import AwardDescription from "../shared/description/AwardDescription";
import { contractActivityInfoContracts } from "../shared/InfoTooltipContent";

const propTypes = {
    awardId: PropTypes.string,
    overview: PropTypes.object,
    jumpToSection: PropTypes.func,
    counts: PropTypes.object
};

const ContractContent = ({
    awardId,
    overview,
    jumpToSection,
    counts
}) => {
    const [activeTab, setActiveTab] = useState('transaction');
    const glossarySlug = glossaryLinks[overview.type];
    const glossaryLink = glossarySlug
        ? `/#/award/${awardId}?glossary=${glossarySlug}`
        : null;
    const jumpToFederalAccountsHistory = () => {
        setActiveTab('federal_account');
        jumpToSection('award-history');
    };

    const awardAmountData = Object.create(BaseAwardAmounts);
    awardAmountData.populate(overview, overview.category);

    const jumpToTransactionHistoryTable = () => {
        setActiveTab('transaction');
        jumpToSection("award-history");
    };

    const jumpToSubAwardHistoryTable = () => {
        setActiveTab('subaward');
        jumpToSection("award-history");
    };

    return (
        <AwardPageWrapper
            glossaryLink={glossaryLink}
            overviewType={overview.type}
            identifier={overview.piid}
            title={overview.title}
            lastModifiedDateLong={overview.periodOfPerformance.lastModifiedDateLong}
            awardType="contract">
            <AwardSection type="row" className="award-overview" id="award-overview">
                <AgencyRecipient
                    jumpToSection={jumpToSection}
                    awardingAgency={overview.awardingAgency}
                    category="contract"
                    recipient={overview.recipient} />
                <RelatedAwards
                    jumpToSubAwardHistoryTable={jumpToSubAwardHistoryTable}
                    jumpToSection={jumpToSection}
                    counts={counts}
                    overview={overview} />
                <AwardDates
                    awardType={overview.category}
                    dates={overview.periodOfPerformance} />
            </AwardSection>
            <AwardSection type="row">
                <AwardAmountsSection
                    awardType={overview.category}
                    jumpToTransactionHistoryTable={jumpToTransactionHistoryTable}
                    awardOverview={awardAmountData} />
                <AwardDescription awardId={awardId} awardType={overview.category} description={overview.description} naics={overview.naics} psc={overview.psc} />
            </AwardSection>
            <AwardSection className="award-contract-activity-section" type="row">
                <ComingSoonSection
                    toolTipWide
                    toolTipContent={contractActivityInfoContracts}
                    title="Contract Activity"
                    includeHeader
                    icon="chart-area" />
                <FederalAccountsSection jumpToFederalAccountsHistory={jumpToFederalAccountsHistory} awardType={overview.category} />
            </AwardSection>
            <AwardSection className="award-history-section" type="row">
                <AwardHistory awardId={awardId} overview={overview} setActiveTab={setActiveTab} activeTab={activeTab} />
            </AwardSection>
            <AdditionalInfo overview={overview} />
        </AwardPageWrapper>
    );
};

ContractContent.propTypes = propTypes;

export default ContractContent;
