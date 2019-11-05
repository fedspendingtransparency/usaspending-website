/**
 * FinancialAssistanceContent.jsx
 * Created by David Trinh 10/9/2018
 **/

import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { glossaryLinks } from 'dataMapping/search/awardType';
import BaseAwardAmounts from 'models/v2/awardsV2/BaseAwardAmounts';
import AwardHistory from 'containers/awardV2/shared/AwardHistorySectionContainer';

import AwardAmountsSection from '../shared/awardAmountsSection/AwardAmountsSection';
import AdditionalInfo from '../shared/additionalInfo/AdditionalInfo';
import AwardRecipient from '../shared/overview/AgencyRecipient';
import AwardDates from '../shared/overview/AwardDates';
import FederalAccountsSection from '../shared/federalAccounts/FederalAccountsSection';
import AwardSection from '../shared/AwardSection';
import ComingSoonSection from '../shared/ComingSoonSection';
import AwardPageWrapper from '../shared/AwardPageWrapper';
import { isAwardAggregate } from '../../../helpers/awardSummaryHelper';
import CFDAOverview from './CFDAOverview';
import AwardDescription from '../shared/description/AwardDescription';
import { contractActivityGrants } from '../shared/InfoTooltipContent';
import CFDASection from './CFDASection';

const propTypes = {
    awardId: PropTypes.string,
    overview: PropTypes.object,
    jumpToSection: PropTypes.func
};

const FinancialAssistanceContent = ({
    awardId,
    overview = { generatedId: '' },
    jumpToSection
}) => {
    const [activeTab, setActiveTab] = useState("transaction");

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

    const awardAmountData = Object.create(BaseAwardAmounts);
    awardAmountData.populate(overview, overview.category);

    const [idLabel, identifier] = isAwardAggregate(overview.generatedId) ? ['URI', overview.uri] : ['FAIN', overview.fain];
    const isGrant = overview.category === 'grant';

    return (
        <AwardPageWrapper
            identifier={identifier}
            idLabel={idLabel}
            awardType={overview.category}
            glossaryLink={glossaryLink}
            overviewType={overview.type}
            title={overview.title}
            lastModifiedDateLong={overview.periodOfPerformance.lastModifiedDateLong}
            className="award-financial-assistance">
            <AwardSection type="row" className="award-overview" id="award-overview">
                <AwardRecipient
                    jumpToSection={jumpToSection}
                    awardingAgency={overview.awardingAgency}
                    category={overview.category}
                    recipient={overview.recipient} />
                <CFDAOverview cfdaPropgram={overview.cfdaProgram} />
                <AwardSection type="column" className="award-amountdates">
                    <AwardDates
                        awardType={overview.category}
                        dates={overview.periodOfPerformance} />
                </AwardSection>
            </AwardSection>
            <AwardSection type="row">
                <AwardAmountsSection
                    awardType={overview.category}
                    awardOverview={awardAmountData}
                    jumpToTransactionHistoryTable={jumpToTransactionHistoryTable} />
                <AwardDescription description={overview.description} awardType={overview.category} awardId={awardId} />
            </AwardSection>
            <AwardSection type="row">
                {isGrant && (
                    <ComingSoonSection
                        title="Grant Activity"
                        icon="chart-area"
                        includeHeader
                        toolTipContent={contractActivityGrants} />
                )}
                {!isGrant && (
                    <CFDASection data={overview.biggestCfda} />
                )}
                <FederalAccountsSection awardType={overview.category} jumpToFederalAccountsHistory={jumpToFederalAccountsHistory} />
            </AwardSection>
            {isGrant && (
                <AwardSection type="row">
                    <CFDASection data={overview.biggestCfda} />
                </AwardSection>
            )}
            <AwardHistory awardId={awardId} overview={overview} setActiveTab={setActiveTab} activeTab={activeTab} />
            <AdditionalInfo overview={overview} />
        </AwardPageWrapper>
    );
};
FinancialAssistanceContent.defaultProps = { uniqueGeneratedAwardId: '' };
FinancialAssistanceContent.propTypes = propTypes;

export default FinancialAssistanceContent;
