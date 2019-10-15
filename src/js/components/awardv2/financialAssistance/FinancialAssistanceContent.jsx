/**
 * FinancialAssistanceContent.jsx
 * Created by David Trinh 10/9/2018
 **/

import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { glossaryLinks } from 'dataMapping/search/awardType';
import BaseAwardAmounts from 'models/v2/awardsV2/BaseAwardAmounts';
import AwardAmountsSection from '../shared/awardAmountsSection/AwardAmountsSection';
import AdditionalInfo from '../shared/additionalInfo/AdditionalInfo';
import AwardRecipient from '../shared/overview/AgencyRecipient';
import AwardDates from '../shared/overview/AwardDates';
import FederalAccountsSection from '../shared/federalAccounts/FederalAccountsSection';
import AwardSection from '../shared/AwardSection';
import ComingSoonSection from '../shared/ComingSoonSection';
import AwardPageWrapper from '../shared/AwardPageWrapper';
import AwardHistory from '../shared/awardHistorySection/AwardHistory';
import { isAwardAggregate } from '../../../helpers/awardSummaryHelper';
import CFDAOverview from './CFDAOverview';
import AwardDescription from '../shared/description/AwardDescription';

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

const FinancialAssistanceContent = ({
    awardId,
    overview = { generatedId: '' },
    jumpToSection
}) => {
    const [activeTab, setActiveTab] = useState("transaction");

    const glossaryLink = glossaryLinks[overview.type]
        ? `/#/award_v2/${awardId}?glossary=${glossaryLinks[overview.type]}`
        : null;

    const jumpToTransactionHistoryTable = () => {
        setActiveTab('transaction');
        jumpToSection("award-history");
    };

    const jumpToFederalAccountsHistory = () => {
        setActiveTab('federal_account');
        jumpToSection('award-history');
    };

    let amountsSection = (<ComingSoonSection title="Award Amounts" includeHeader />);
    if (overview.category === 'grant' || overview.category === 'loan') {
        const awardAmountData = Object.create(BaseAwardAmounts);
        awardAmountData.populate(overview, overview.category);
        amountsSection = (
            <AwardAmountsSection
                awardType={overview.category}
                awardOverview={awardAmountData}
                tooltipProps={defaultTooltipProps}
                jumpToTransactionHistoryTable={jumpToTransactionHistoryTable} />
        );
    }

    const awardAmountData = Object.create(BaseAwardAmounts);
    awardAmountData.populate(overview, overview.category);

    const [idLabel, identifier] = isAwardAggregate(overview.generatedId) ? ['URI', overview.uri] : ['FAIN', overview.fain];

    return (
        <AwardPageWrapper
            identifier={identifier}
            idLabel={idLabel}
            awardType={overview.category}
            glossaryLink={glossaryLink}
            title={overview.title}
            lastModifiedDateLong={overview.periodOfPerformance.lastModifiedDateLong}
            className="award-financial-assistance">
            <AwardSection type="row" className="award-overview" id="award-overview">
                <AwardRecipient
                    jumpToSection={jumpToSection}
                    awardingAgency={overview.awardingAgency}
                    category={overview.category}
                    recipient={overview.recipient} />
                <CFDAOverview number={overview.biggestCfda.cfda_number} title={overview.biggestCfda.cfda_title} />
                <AwardSection type="column" className="award-amountdates">
                    <AwardDates
                        awardType={overview.category}
                        dates={overview.periodOfPerformance} />
                </AwardSection>
            </AwardSection>
            <AwardSection type="row">
                {amountsSection}
                <AwardDescription description={overview.description} awardId={awardId} />
            </AwardSection>
            <AwardSection type="row">
                <ComingSoonSection title="Grant Activity" icon="chart-area" includeHeader />
                <FederalAccountsSection jumpToFederalAccountsHistory={jumpToFederalAccountsHistory} />
            </AwardSection>
            <AwardSection type="row">
                <ComingSoonSection
                    title="CFDA Program / Assistance Listing Information"
                    icon="hands-helping"
                    includeHeader />
            </AwardSection>
            <AwardSection type="row">
                <AwardHistory awardId={awardId} overview={overview} setActiveTab={setActiveTab} activeTab={activeTab} />
            </AwardSection>
            <AdditionalInfo overview={overview} />
        </AwardPageWrapper>
    );
};
FinancialAssistanceContent.defaultProps = { uniqueGeneratedAwardId: '' };
FinancialAssistanceContent.propTypes = propTypes;

export default FinancialAssistanceContent;
