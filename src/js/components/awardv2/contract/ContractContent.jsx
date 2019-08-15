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

const awardAmountProperties = ["_totalObligation", "_baseAndAllOptions", "_baseExercisedOptions"];
const awardAmountMap = {
    _totalObligation: "_combinedCurrentAwardAmounts",
    _baseAndAllOptions: "_combinedPotentialAwardAmounts",
    _baseExercisedOptions: "_obligation"
};

export default class ContractContent extends React.Component {
    constructor(props) {
        super(props);
        this.renderChart = this.renderChart.bind(this);
    }
    renderChart(overview = this.props.overview) {
        const amounts = Object.keys(overview)
            .filter((key) => awardAmountProperties.includes(key))
            .reduce((acc, item) => ({
                ...acc,
                [awardAmountMap[item]]: overview[item]
            }), { _obligation: 0, _combinedCurrentAwardAmounts: 0, _combinedPotentialAwardAmounts: 0 });
        switch (determineSpendingScenario(amounts)) {
            case "exceedsCurrent":
                console.log("exceedsCurrent");
                return;
                // return <ExceedsCurrentChart />;
            case "exceedsPotential":
                console.log("exceedsPotential");
                return;
                // return <ExceedsPotentialChart />;
            case "normal":
                console.log("normal");
                return;
                // return <NormalChart/>;
            default:
                console.log("default");
        }
    }

    render() {
        const glossarySlug = glossaryLinks[this.props.overview.type];
        const glossaryLink = glossarySlug
            ? `/#/award_v2/${this.props.awardId}?glossary=${glossarySlug}`
            : null;
        const vizualization = this.renderChart(this.props.overview);
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
                    <AwardSection type="column">
                        HI
                    </AwardSection>
                    <ComingSoonSection title="Description" includeHeader />
                </AwardSection>
                <AdditionalInfo overview={this.props.overview} />
            </AwardPageWrapper>
        );
    }
}

ContractContent.propTypes = propTypes;
