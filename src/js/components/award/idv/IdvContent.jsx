/**
 * IdvContent.jsx
 * Created by Lizzie Salita 12/3/18
 **/

import React, { useState } from 'react';
import PropTypes from 'prop-types';

import ReferencedAwardsContainer from 'containers/award/idv/ReferencedAwardsContainer';
import IdvActivityContainer from 'containers/award/idv/IdvActivityContainer';
import { glossaryLinks } from 'dataMapping/search/awardType';
import AwardHistory from 'containers/award/shared/AwardHistorySectionContainer';

import AwardOverviewLeftSection from '../shared/overview/AwardOverviewLeftSection';
import AwardOverviewRightSection from '../shared/overview/AwardOverviewRightSection';
import AwardDescription from '../shared/description/AwardDescription';
import AwardAmounts from './amounts/AwardAmounts';
import AdditionalInfo from '../shared/additionalInfo/AdditionalInfo';
import FederalAccountsSection from '../shared/federalAccounts/FederalAccountsSection';
import { AWARD_OVERVIEW_PROPS, AWARD_COUNTS_PROPS } from '../../../propTypes';
import AwardPageWrapper from '../shared/AwardPageWrapper';
import AwardSection from '../shared/AwardSection';

const propTypes = {
    awardId: PropTypes.string,
    counts: AWARD_COUNTS_PROPS,
    overview: AWARD_OVERVIEW_PROPS,
    jumpToSection: PropTypes.func
};

const IdvContent = ({
    awardId,
    counts,
    overview,
    jumpToSection
}) => {
    const [awardHistoryActiveTab, setAwardHistoryTab] = useState('transaction');
    const [relatedAwardsActiveTab, setRelatedAwardsTab] = useState('child_awards');

    const jumpToFederalAccountsHistory = () => {
        setAwardHistoryTab('federal_account');
        jumpToSection('award-history');
    };

    const glossarySlug = glossaryLinks[overview.type];
    const glossaryLink = glossarySlug
        ? `/#/award/${awardId}?glossary=${glossarySlug}`
        : null;

    return (
        <AwardPageWrapper
            awardType="idv"
            defCodes={overview.defCodes}
            title={overview.title}
            lastModifiedDateLong={overview.dates.lastModifiedDateLong}
            glossaryLink={glossaryLink}
            overviewType={overview.type}
            identifier={overview.piid}
            dates={overview.dates}>
            <AwardSection type="row" className="award-overview" id="award-overview">
                <AwardOverviewLeftSection
                    awardingAgency={overview.awardingAgency}
                    recipient={overview.recipient} />
                <AwardOverviewRightSection
                    jumpToSection={jumpToSection}
                    counts={counts}
                    overview={overview}
                    setRelatedAwardsTab={setRelatedAwardsTab} />
            </AwardSection>
            <AwardSection type="row">
                <AwardAmounts
                    jumpToSection={jumpToSection}
                    awardId={awardId}
                    overview={overview} />
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
                    jumpToFederalAccountsHistory={jumpToFederalAccountsHistory} />
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
