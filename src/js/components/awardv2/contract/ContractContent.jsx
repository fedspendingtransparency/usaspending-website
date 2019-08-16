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
import { determineSpendingScenario } from "../../../helpers/aggregatedAmountsHelper";
import NormalChart from '../shared/charts/NormalChart';
import ExceedsCurrentChart from '../shared/charts/ExceedsCurrentChart';
import ExceedsPotentialChart from '../shared/charts/ExceedsPotentialChart';

import { AwardSection, AwardPageWrapper } from '../shared';
import ComingSoonSection from '../shared/ComingSoonSection';

const propTypes = {
    awardId: PropTypes.string,
    overview: PropTypes.object,
    jumpToSection: PropTypes.func
};

const awardAmountProperties = [
    "id",
    "generatedId",
    "_totalObligation",
    "_baseExercisedOptions",
    "_amount",
    "totalObligation",
    "totalObligationFormatted",
    "baseExercisedOptions",
    "baseExercisedOptionsFormatted",
    "amount",
    "amountFormatted"
];
// Does this need to go in a model or a data mapping?
const awardAmountMap = {
    _totalObligation: "_obligation",
    _baseExercisedOptions: "_combinedCurrentAwardAmounts",
    _amount: "_combinedPotentialAwardAmounts",
    totalObligationFormatted: "obligationFormatted",
    baseExercisedOptionsFormatted: "combinedCurrentAwardAmountsFormatted",
    amountFormatted: "combinedPotentialAwardAmountsFormatted",
    amount: "combinedPotentialAwardAmounts"
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
    constructor(props) {
        super(props);
        this.renderChart = this.renderChart.bind(this);
    }
    renderChart(overview = this.props.overview) {
        const awardAmounts = awardAmountProperties
            .reduce((acc, key) => ({
                ...acc,
                [awardAmountMap[key] || key]: overview[key]
            }), { _obligation: 0, _combinedCurrentAwardAmounts: 0, _combinedPotentialAwardAmounts: 0 });
        switch (determineSpendingScenario(awardAmounts)) {
            case "exceedsCurrent":
                console.log("exceedsCurrent");
                return (
                    <ExceedsCurrentChart
                        awardAmounts={awardAmounts}
                        obligatedTooltipProps={defaultTooltipProps}
                        currentTooltipProps={defaultTooltipProps}
                        potentialTooltipProps={defaultTooltipProps} />
                );
            case "exceedsPotential":
                console.log("exceedsPotential");
                return (
                    <ExceedsPotentialChart
                        awardAmounts={awardAmounts}
                        obligatedTooltipProps={defaultTooltipProps}
                        currentTooltipProps={defaultTooltipProps}
                        potentialTooltipProps={defaultTooltipProps} />
                );
            case "normal":
                console.log("normal");
                return (
                    <NormalChart
                        awardAmounts={awardAmounts}
                        obligatedTooltipProps={defaultTooltipProps}
                        currentTooltipProps={defaultTooltipProps}
                        potentialTooltipProps={defaultTooltipProps} />
                );
            default:
                return null;
        }
    }

    render() {
        const glossarySlug = glossaryLinks[this.props.overview.type];
        const glossaryLink = glossarySlug
            ? `/#/award_v2/${this.props.awardId}?glossary=${glossarySlug}`
            : null;
        const visualization = this.renderChart(this.props.overview);
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
                    <AwardSection type="column" className="award-viz award-amounts">
                        <div>
                            <div className="award-amounts__content">
                                {visualization}
                            </div>
                        </div>
                    </AwardSection>
                    <ComingSoonSection title="Description" includeHeader />
                </AwardSection>
                <AdditionalInfo overview={this.props.overview} />
            </AwardPageWrapper>
        );
    }
}

ContractContent.propTypes = propTypes;
