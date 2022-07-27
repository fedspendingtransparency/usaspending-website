/**
 * IdvContent.jsx
 * Created by Lizzie Salita 12/3/18
 **/

import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { getAllNetPositiveIdvFileCDefCodes } from 'helpers/idvHelper';
import ReferencedAwardsContainer from 'containers/award/idv/ReferencedAwardsContainer';
import IdvActivityContainer from 'containers/award/idv/IdvActivityContainer';
import { glossaryLinks } from 'dataMapping/search/awardType';
import AwardHistory from 'containers/award/shared/AwardHistorySectionContainer';
import IdvAwardAmountsSectionContainer from 'containers/award/idv/IdvAwardAmountsSectionContainer';

import AwardOverviewLeftSection from '../shared/overview/AwardOverviewLeftSection';
import AwardOverviewRightSection from '../shared/overview/AwardOverviewRightSection';
import AwardDescription from '../shared/description/AwardDescription';
import AdditionalInfo from '../shared/additionalInfo/AdditionalInfo';
import FederalAccountsSection from '../shared/federalAccounts/FederalAccountsSection';
import { AWARD_OVERVIEW_PROPS, AWARD_COUNTS_PROPS } from '../../../propTypes';
import AwardPageWrapper from '../shared/AwardPageWrapper';
import AwardSection from '../shared/AwardSection';

const propTypes = {
    awardId: PropTypes.string,
    details: AWARD_COUNTS_PROPS,
    overview: AWARD_OVERVIEW_PROPS,
    jumpToSection: PropTypes.func,
    unlinked: PropTypes.bool
};

const IdvContent = ({
    awardId,
    details,
    overview,
    jumpToSection,
    unlinked
}) => {
    const [awardHistoryActiveTab, setAwardHistoryTab] = useState('transaction');
    const [relatedAwardsActiveTab, setRelatedAwardsTab] = useState('child_awards');

    const jumpToFederalAccountsHistory = () => {
        setAwardHistoryTab('federal_account');
        jumpToSection('award-history');
    };

    const glossarySlug = glossaryLinks[overview.type];
    const glossaryLink = glossarySlug
        ? `/award/${awardId}?glossary=${glossarySlug}`
        : null;

    return (
        <AwardPageWrapper
            awardType="idv"
            allDefCodes={getAllNetPositiveIdvFileCDefCodes(overview, details)}
            title={overview.title}
            lastModifiedDateLong={overview.dates.lastModifiedDateLong}
            glossaryLink={glossaryLink}
            overviewType={overview.type}
            identifier={overview.piid}
            dates={overview.dates}
            unlinked={unlinked}>
            <AwardSection type="row" className="award-overview" id="award-overview">
                <AwardOverviewLeftSection
                    awardingAgency={overview.awardingAgency}
                    recipient={overview.recipient} />
                <AwardOverviewRightSection
                    jumpToSection={jumpToSection}
                    counts={details}
                    overview={overview}
                    setRelatedAwardsTab={setRelatedAwardsTab} />
            </AwardSection>
            <AwardSection type="row">
                <IdvAwardAmountsSectionContainer
                    jumpToSection={jumpToSection}
                    awardId={awardId}
                    overview={overview}
                    defCodes={details?.child_file_c} />
                <AwardDescription
                    awardType={overview.category}
                    awardId={awardId}
                    description={overview.description}
                    naics={overview.naics}
                    psc={overview.psc} />
            </AwardSection>
            <AwardSection type="row">
                <IdvActivityContainer />
                <FederalAccountsSection
                    awardType={overview.category}
                    jumpToFederalAccountsHistory={jumpToFederalAccountsHistory}
                    unlinked={unlinked} />
            </AwardSection>
            <ReferencedAwardsContainer
                tableType={relatedAwardsActiveTab}
                switchTab={setRelatedAwardsTab} />
            <AwardHistory
                activeTab={awardHistoryActiveTab}
                setActiveTab={setAwardHistoryTab}
                overview={overview} />
            <AdditionalInfo overview={overview} />
        </AwardPageWrapper>
    );
};

IdvContent.propTypes = propTypes;

export default IdvContent;
