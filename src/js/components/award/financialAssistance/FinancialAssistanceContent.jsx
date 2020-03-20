/**
 * FinancialAssistanceContent.jsx
 * Created by David Trinh 10/9/2018
 **/

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import kGlobalConstants from 'GlobalConstants';
import { glossaryLinks } from 'dataMapping/search/awardType';
import BaseAwardAmounts from 'models/v2/awardsV2/BaseAwardAmounts';
import AwardHistory from 'containers/award/shared/AwardHistorySectionContainer';
import { awardTypesWithSubawards } from 'dataMapping/awards/awardHistorySection';
import ContractGrantActivityContainer from 'containers/award/shared/ContractGrantActivityContainer';
import AwardAmountsSection from '../shared/awardAmountsSection/AwardAmountsSection';
import AdditionalInfo from '../shared/additionalInfo/AdditionalInfo';
import AwardOverviewLeftSection from '../shared/overview/AwardOverviewLeftSection';
import AwardOverviewRightSection from '../shared/overview/AwardOverviewRightSection';
import FederalAccountsSection from '../shared/federalAccounts/FederalAccountsSection';
import AwardSection from '../shared/AwardSection';
import AwardPageWrapper from '../shared/AwardPageWrapper';
import { isAwardAggregate } from '../../../helpers/awardSummaryHelper';
import AwardDescription from '../shared/description/AwardDescription';
import CFDASection from './CFDASection';
import ComingSoonSection from '../shared/ComingSoonSection';
import { contractActivityGrants } from '../shared/InfoTooltipContent';

const propTypes = {
    awardId: PropTypes.string,
    overview: PropTypes.object,
    jumpToSection: PropTypes.func,
    isSubAwardIdClicked: PropTypes.bool,
    subAwardIdClicked: PropTypes.func
};

const FinancialAssistanceContent = ({
    awardId,
    overview = { generatedId: '' },
    jumpToSection,
    isSubAwardIdClicked,
    subAwardIdClicked
}) => {
    const [activeTab, setActiveTab] = useState("transaction");
    const [CFDAOverviewLinkClicked, setCFDAOverviewLinkClicked] = useState(false);

    const updateCFDAOverviewLinkClicked = () => {
        setCFDAOverviewLinkClicked(!CFDAOverviewLinkClicked);
    };

    const glossaryLink = glossaryLinks[overview.type]
        ? `/#/award/${awardId}?glossary=${glossaryLinks[overview.type]}`
        : null;

    const jumpToTransactionHistoryTable = () => {
        setActiveTab('transaction');
        jumpToSection("award-history");
    };

    const jumpToFederalAccountsHistory = () => {
        setActiveTab('federal_account');
        jumpToSection('award-history');
    };

    const jumpToSubAwardHistoryTable = () => {
        setActiveTab('subaward');
        jumpToSection('award-history');
    };

    useEffect(() => {
        if (isSubAwardIdClicked && awardTypesWithSubawards.includes(overview.category)) {
            jumpToSubAwardHistoryTable();
            subAwardIdClicked(false);
        }
    });

    const awardAmountData = Object.create(BaseAwardAmounts);
    awardAmountData.populate(overview, overview.category);

    const [idLabel, identifier] = isAwardAggregate(overview.generatedId) ? ['URI', overview.uri] : ['FAIN', overview.fain];
    const isGrant = overview.category === 'grant';
    const grantActivity = () => {
        if (isGrant) {
            return (kGlobalConstants.DEV) ?
                <ContractGrantActivityContainer
                    awardId={awardId}
                    awardType={overview.category}
                    dates={overview.periodOfPerformance} />
                : <ComingSoonSection
                    title="Grant Activity"
                    icon="chart-area"
                    includeHeader
                    toolTipContent={contractActivityGrants} />;
        }
        return null;
    };

    return (
        <AwardPageWrapper
            identifier={identifier}
            idLabel={idLabel}
            awardType={overview.category}
            glossaryLink={glossaryLink}
            overviewType={overview.type}
            title={overview.title}
            lastModifiedDateLong={overview.periodOfPerformance.lastModifiedDateLong}
            className="award-financial-assistance"
            dates={overview.periodOfPerformance}>
            <AwardSection type="row" className="award-overview" id="award-overview">
                <AwardOverviewLeftSection
                    awardingAgency={overview.awardingAgency}
                    recipient={overview.recipient}
                    recordType={overview.recordType}
                    awardType={overview.category}
                    awardId={awardId} />
                <AwardOverviewRightSection
                    updateCFDAOverviewLinkClicked={updateCFDAOverviewLinkClicked}
                    jumpToSection={jumpToSection}
                    overview={overview} />
            </AwardSection>
            <AwardSection type="row">
                <AwardAmountsSection
                    awardType={overview.category}
                    awardOverview={awardAmountData}
                    jumpToTransactionHistoryTable={jumpToTransactionHistoryTable} />
                <AwardDescription
                    description={overview.description}
                    awardType={overview.category}
                    awardId={awardId} />
            </AwardSection>
            <AwardSection type="row">
                {grantActivity()}
                {!isGrant && (
                    <CFDASection
                        cfdas={overview.cfdas}
                        CFDAOverviewLinkClicked={CFDAOverviewLinkClicked}
                        updateCFDAOverviewLinkClicked={updateCFDAOverviewLinkClicked} />
                )}
                <FederalAccountsSection
                    awardType={overview.category}
                    jumpToFederalAccountsHistory={jumpToFederalAccountsHistory} />
            </AwardSection>
            {isGrant && (
                <AwardSection type="row">
                    <CFDASection
                        cfdas={overview.cfdas}
                        CFDAOverviewLinkClicked={CFDAOverviewLinkClicked}
                        updateCFDAOverviewLinkClicked={updateCFDAOverviewLinkClicked} />
                </AwardSection>
            )}
            <AwardHistory
                awardId={awardId}
                overview={overview}
                setActiveTab={setActiveTab}
                activeTab={activeTab} />
            <AdditionalInfo overview={overview} />
        </AwardPageWrapper>
    );
};
FinancialAssistanceContent.defaultProps = { uniqueGeneratedAwardId: '' };
FinancialAssistanceContent.propTypes = propTypes;

export default FinancialAssistanceContent;
