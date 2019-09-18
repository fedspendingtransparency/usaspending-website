/**
 * ContractContent.jsx
 * Created by David Trinh 10/9/2018
 **/

import React from 'react';
import PropTypes from 'prop-types';

import { glossaryLinks } from 'dataMapping/search/awardType';
import BaseAwardAmounts from 'models/v2/awardsV2/BaseAwardAmounts';
import AdditionalInfo from '../shared/additionalInfo/AdditionalInfo';
import AgencyRecipient from '../shared/overview/AgencyRecipient';
import RelatedAwards from '../shared/overview/RelatedAwards';
import AwardDates from '../shared/overview/AwardDates';
import FederalAccountsSection from '../shared/federalAccounts/FederalAccountsSection';
import AwardPageWrapper from '../shared/AwardPageWrapper';
import AwardSection from '../shared/AwardSection';
import AwardAmountsSection from '../shared/awardAmountsSection/AwardAmountsSection';
import ComingSoonSection from '../shared/ComingSoonSection';

const propTypes = {
    awardId: PropTypes.string,
    overview: PropTypes.object,
    jumpToSection: PropTypes.func
};

export default class ContractContent extends React.Component {
    render() {
        const { overview, awardId, jumpToSection } = this.props;
        const glossarySlug = glossaryLinks[overview.type];
        const glossaryLink = glossarySlug
            ? `/#/award_v2/${awardId}?glossary=${glossarySlug}`
            : null;
        const awardAmountData = Object.create(BaseAwardAmounts);
        awardAmountData.populate(overview, overview.category);

        return (
            <AwardPageWrapper
                glossaryLink={glossaryLink}
                identifier={overview.id}
                awardTypeDescription={overview.typeDescription}
                awardType="contract">
                <AwardSection type="row" className="award-overview" id="award-overview">
                    <AwardSection type="column" className="award-amountdates">
                        <AgencyRecipient
                            jumpToSection={jumpToSection}
                            awardingAgency={overview.awardingAgency}
                            category="contract"
                            recipient={overview.recipient} />
                    </AwardSection>
                    <AwardSection type="column" className="award-amountdates">
                        <RelatedAwards
                            overview={this.props.overview} />
                        <AwardDates overview={overview} />
                    </AwardSection>
                </AwardSection>
                <AwardSection type="row">
                    <AwardAmountsSection
                        awardType={this.props.overview.category}
                        jumpToSection={this.props.jumpToSection}
                        awardOverview={awardAmountData} />
                    <ComingSoonSection title="Description" includeHeader />
                </AwardSection>
                <AwardSection type="row">
                    <ComingSoonSection title="Contract Activity" includeHeader />
                    <FederalAccountsSection />
                </AwardSection>
                <AdditionalInfo overview={overview} />
            </AwardPageWrapper>
        );
    }
}

ContractContent.propTypes = propTypes;
