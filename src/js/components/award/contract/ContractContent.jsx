/**
 * ContractContent.jsx
 * Created by David Trinh 10/9/2018
 **/

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { glossaryLinks } from 'dataMapping/search/awardType';
import BaseAwardAmounts from 'models/v2/award/BaseAwardAmounts';
import AwardHistory from 'containers/award/shared/AwardHistorySectionContainer';
import { awardTypesWithSubawards } from 'dataMapping/award/awardHistorySection';
import ContractGrantActivityContainer from 'containers/award/shared/ContractGrantActivityContainer';

import AdditionalInfo from '../shared/additionalInfo/AdditionalInfo';
import AwardOverviewLeftSection from '../shared/overview/AwardOverviewLeftSection';
import AwardOverviewRightSection from '../shared/overview/AwardOverviewRightSection';
import FederalAccountsSection from '../shared/federalAccounts/FederalAccountsSection';
import AwardPageWrapper from '../shared/AwardPageWrapper';
import AwardSection from '../shared/AwardSection';
import AwardAmountsSection from '../shared/awardAmounts/AwardAmountsSection';
import AwardDescription from "../shared/description/AwardDescription";

const propTypes = {
    awardId: PropTypes.string,
    overview: PropTypes.object,
    jumpToSection: PropTypes.func,
    counts: PropTypes.object,
    isSubAwardIdClicked: PropTypes.bool,
    subAwardIdClicked: PropTypes.func,
    defCodes: PropTypes.array,
    unlinked: PropTypes.bool
};

const ContractContent = ({
    awardId,
    overview,
    jumpToSection,
    counts,
    isSubAwardIdClicked,
    subAwardIdClicked,
    defCodes,
    unlinked
}) => {
    const [activeTab, setActiveTab] = useState('transaction');

    const glossarySlug = glossaryLinks[overview.type];
    const glossaryLink = glossarySlug
        ? `/award/${awardId}?glossary=${glossarySlug}`
        : null;
    const jumpToFederalAccountsHistory = () => {
        setActiveTab('federal_account');
        jumpToSection('award-history');
    };

    const awardAmountData = Object.create(BaseAwardAmounts);
    awardAmountData.populate(overview, overview.category, defCodes);

    const jumpToTransactionHistoryTable = () => {
        setActiveTab('transaction');
        jumpToSection("award-history");
    };

    const jumpToSubAwardHistoryTable = () => {
        setActiveTab('subaward');
        jumpToSection("award-history");
    };

    useEffect(() => {
        if (isSubAwardIdClicked && awardTypesWithSubawards.includes(overview.category)) {
            jumpToSubAwardHistoryTable();
            subAwardIdClicked(false);
        }
    });

    return (
        <AwardPageWrapper
            allDefCodes={overview.defCodes}
            glossaryLink={glossaryLink}
            overviewType={overview.type}
            identifier={overview.piid}
            title={overview.title}
            lastModifiedDateLong={overview.periodOfPerformance.lastModifiedDateLong}
            awardType="contract"
            dates={overview.periodOfPerformance}
            parentId={overview.parentAwardDetails.awardId}
            unlinked={unlinked}>
            <AwardSection type="row" className="award-overview" id="award-overview">
                <AwardOverviewLeftSection
                    awardingAgency={overview.awardingAgency}
                    recipient={overview.recipient} />
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
                <ContractGrantActivityContainer
                    awardId={awardId}
                    awardType={overview.category}
                    dates={overview.periodOfPerformance}
                    totalObligation={overview._baseAndAllOptions}
                    jumpToTransactionHistoryTable={jumpToTransactionHistoryTable} />
                <FederalAccountsSection
                    jumpToFederalAccountsHistory={jumpToFederalAccountsHistory}
                    awardType={overview.category}
                    unlinked={unlinked} />
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
