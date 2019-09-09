/**
 * FinancialAssistanceContent.jsx
 * Created by David Trinh 10/9/2018
 **/

import React from 'react';
import PropTypes from 'prop-types';

import { glossaryLinks } from 'dataMapping/search/awardType';
import AwardAmountsSection from '../shared/awardAmountsSection/AwardAmountsSection';
import AwardRecipient from '../shared/overview/AgencyRecipient';
import AwardDates from '../shared/overview/AwardDates';
import AwardSection from '../shared/AwardSection';
import ComingSoonSection from "../shared/ComingSoonSection";
import BaseAwardAmounts from "../../../models/v2/awardsV2/BaseAwardAmounts";
import AwardPageWrapper from '../shared/AwardPageWrapper';

const propTypes = {
    awardId: PropTypes.string,
    overview: PropTypes.object,
    jumpToSection: PropTypes.func
};

export default class FinancialAssistanceContent extends React.Component {
    render() {
        const { awardId, overview, jumpToSection } = this.props;
        const glossaryLink = glossaryLinks[overview.type]
            ? `/#/award_v2/${awardId}?glossary=${glossaryLinks[overview.type]}`
            : null;

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
                    <AwardAmountsSection
                        awardType={overview.category}
                        awardOverview={awardAmountData}
                        jumptoSection={jumpToSection} />
                    <ComingSoonSection title="Description" includeHeader />
                </AwardSection>
            </AwardPageWrapper>
        );
    }
}
FinancialAssistanceContent.propTypes = propTypes;
