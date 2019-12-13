/**
 * ContractContent.jsx
 * Created by David Trinh 10/9/2018
 **/

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { glossaryLinks } from 'dataMapping/search/awardType';
import BaseAwardAmounts from 'models/award/BaseAwardAmounts';
import AwardHistory from 'containers/award/shared/AwardHistorySectionContainer';

import AdditionalInfo from '../shared/additionalInfo/AdditionalInfo';
import AwardOverviewLeftSection from '../shared/overview/AwardOverviewLeftSection';
import AwardOverviewRightSection from '../shared/overview/AwardOverviewRightSection';
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
    counts: PropTypes.object,
    isSubAwardIdClicked: PropTypes.bool,
    subAwardIdClicked: PropTypes.func
};

const ContractContent = ({
    awardId,
    overview,
    jumpToSection,
    counts,
    isSubAwardIdClicked,
    subAwardIdClicked
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

    useEffect(() => {
        if (isSubAwardIdClicked) {
            jumpToSubAwardHistoryTable();
            subAwardIdClicked(false);
        }
    });

    return (
        <AwardPageWrapper
            glossaryLink={glossaryLink}
            overviewType={overview.type}
            identifier={overview.piid}
            title={overview.title}
            lastModifiedDateLong={overview.periodOfPerformance.lastModifiedDateLong}
            awardType="contract">
            <AwardSection type="row" className="award-overview" id="award-overview">
                <AwardOverviewLeftSection
                    awardingAgency={overview.awardingAgency}
                    recipient={overview.recipient}
                    placeOfPerformance={overview.placeOfPerformance} />
                <AwardOverviewRightSection
                    jumpToSubAwardHistoryTable={jumpToSubAwardHistoryTable}
                    jumpToSection={jumpToSection}
                    counts={counts}
                    overview={overview} />
            </AwardSection>
            <AwardSection type="row">
                <AwardAmountsSection
                    awardType={overview.category}
                    jumpToTransactionHistoryTable={jumpToTransactionHistoryTable}
                    awardOverview={awardAmountData} />
                <AwardDescription
                    awardId={awardId}
                    awardType={overview.category}
                    description={overview.description}
                    naics={overview.naics}
                    psc={overview.psc} />
            </AwardSection>
            <AwardSection className="award-contract-activity-section" type="row">
                <ComingSoonSection
                    toolTipWide
                    toolTipContent={contractActivityInfoContracts}
                    title="Contract Activity"
                    includeHeader
                    icon="chart-area" />
                <FederalAccountsSection
                    jumpToFederalAccountsHistory={jumpToFederalAccountsHistory}
                    awardType={overview.category} />
            </AwardSection>
            <AwardSection className="award-history-section" type="row">
                <AwardHistory
                    awardId={awardId}
                    overview={overview}
                    setActiveTab={setActiveTab}
                    activeTab={activeTab} />
            </AwardSection>
            <AdditionalInfo overview={overview} />
        </AwardPageWrapper>
    );
};

ContractContent.propTypes = propTypes;

export default ContractContent;
