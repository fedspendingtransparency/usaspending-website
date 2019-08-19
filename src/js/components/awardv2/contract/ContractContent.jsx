/**
 * ContractContent.jsx
 * Created by David Trinh 10/9/2018
 **/

import React from 'react';
import PropTypes from 'prop-types';

import { glossaryLinks } from 'dataMapping/search/awardType';
import AdditionalInfo from '../shared/additionalInfo/AdditionalInfo';
import AgencyRecipient from '../shared/overview/AgencyRecipient';
import AwardDates from '../shared/overview/AwardDates';

import { AwardSection, AwardPageWrapper } from '../shared';
import ComingSoonSection from '../shared/ComingSoonSection';
import AwardAmounts from './AwardAmounts';

const propTypes = {
    awardId: PropTypes.string,
    overview: PropTypes.object,
    jumpToSection: PropTypes.func
};

const overviewProperties = [
    "id",
    "generatedId",
    "_totalObligation", // obligation
    "_baseExercisedOptions", // current
    "_baseAndAllOptions", // potential
    "totalObligation",
    "totalObligationFormatted",
    "baseExercisedOptions",
    "baseExercisedOptionsFormatted",
    "baseAndAllOptions",
    "baseAndAllOptionsFormatted"
];

// Does this need to go in a model or a data mapping?
const awardAmountValueByOverviewKey = {
    _totalObligation: "_obligation",
    totalObligation: "obligationFormatted",
    totalObligationFormatted: "obligation",
    _baseExercisedOptions: "_combinedCurrentAwardAmounts",
    baseExercisedOptions: "combinedCurrentAwardAmountsFormatted",
    baseExercisedOptionsFormatted: "combinedCurrentAwardAmounts",
    _baseAndAllOptions: "_combinedPotentialAwardAmounts",
    baseAndAllOptions: "combinedPotentialAwardAmountsFormatted",
    baseAndAllOptionsFormatted: "combinedPotentialAwardAmounts"
};

const defaultTooltipProps = {
    controlledProps: {
        isControlled: false,
        isVisible: false,
        closeCurrentTooltip: () => console.log("close tooltip"),
        showTooltip: () => console.log("open tooltip")
    }
};

export default class ContractContent extends React.Component {
    render() {
        console.log("totalObligation", this.props.overview.totalObligation);
        console.log("totalObligation formatted", this.props.overview.totalObligationFormatted);

        const glossarySlug = glossaryLinks[this.props.overview.type];
        const glossaryLink = glossarySlug
            ? `/#/award_v2/${this.props.awardId}?glossary=${glossarySlug}`
            : null;
        const awardAmountsProps = overviewProperties
            .reduce((acc, key) => ({
                ...acc,
                [awardAmountValueByOverviewKey[key] || key]: this.props.overview[key]
            }), { _obligation: 0, _combinedCurrentAwardAmounts: 0, _combinedPotentialAwardAmounts: 0 });
        return (
            <AwardPageWrapper
                glossaryLink={glossaryLink}
                identifier={this.props.overview.id}
                awardTypeDescription={this.props.overview.typeDescription}
                awardType="contract">
                <AwardSection type="row" className="award-overview" id="award-overview">
                    <AwardSection type="column" className="award-amountdates">
                        <AgencyRecipient
                            jumpToSection={this.props.jumpToSection}
                            awardingAgency={this.props.overview.awardingAgency}
                            category="contract"
                            recipient={this.props.overview.recipient} />
                    </AwardSection>
                    <AwardSection type="column" className="award-amountdates">
                        <AwardDates overview={this.props.overview} />
                    </AwardSection>
                </AwardSection>
                <AwardSection type="row">
                    <AwardAmounts
                        awardAmountsProps={awardAmountsProps}
                        tooltipProps={defaultTooltipProps} />
                    <ComingSoonSection title="Description" includeHeader />
                </AwardSection>
                <AdditionalInfo overview={this.props.overview} />
            </AwardPageWrapper>
        );
    }
}

ContractContent.propTypes = propTypes;
