import React, { Component, useState } from 'react';
import PropTypes from 'prop-types';

import NormalChart from './NormalChart';
import ExceedsCurrentChart from './ExceedsCurrentChart';
import ExceedsPotentialChart from './ExceedsPotentialChart';
import NoResultsMessage from '../../../../sharedComponents/NoResultsMessage';
import GrantChart from './GrantChart';
import { ObligatedAmountTooltip, ExceedsCurrentAmountTooltip, CurrentAmountTooltip, ExceedsPotentialAmountTooltip, PotentialAmountTooltip, NonFederalFundingTooltip, TotalFundingTooltip, SubsidyTooltip, FaceValueTooltip } from '../Tooltips';
import { CombinedObligatedAmounts, CombinedCurrentAmounts, CombinedPotentialAmounts, CombinedExceedsCurrentAmounts, CombinedExceedsPotentialAmounts } from "../../../idv/TooltipContent";
import { AWARD_OVERVIEW_AWARD_AMOUNTS_SECTION_PROPS } from '../../../../../propTypes/index';
import LoansChart from './LoansChart';

const propTypes = {
    awardType: PropTypes.string,
    awardOverview: AWARD_OVERVIEW_AWARD_AMOUNTS_SECTION_PROPS,
    spendingScenario: PropTypes.string
};

const spendingCategoriesByAwardType = {
    grant: ["obligated", "nonFederalFunding", "totalFunding"],
    loan: ["subsidy", "faceValue"],
    contract: ["obligated", "current", "potential"]
};

const getSpendingCategoriesByAwardType = (awardType) => {
    if (Object.keys(spendingCategoriesByAwardType).includes(awardType)) {
        return spendingCategoriesByAwardType[awardType];
    }
    return spendingCategoriesByAwardType.contract;
};

export const useTooltips = (arrayOfTooltips) => {
    const [activeTooltip, setActiveTooltip] = useState('');
    return [
        activeTooltip,
        () => setActiveTooltip(''),
        ...arrayOfTooltips.map((tt) => () => setActiveTooltip(tt))
    ];
};
export default class AwardAmountsChart extends Component {
    constructor(props) {
        super(props);
        this.renderChartByAwardType = this.renderChartByAwardType.bind(this);
        this.renderChartBySpendingScenario = this.renderChartBySpendingScenario.bind(this);
    }
    // this fn is horrible, needs to go!!!
    getTooltipPropsByAwardTypeAndSpendingCategory(awardType, category, tooltipData = this.props.awardOverview) {
        const map = {
            idv: {
                obligated: {
                    offsetAdjustments: { top: 0 },
                    tooltipComponent: <CombinedObligatedAmounts total={tooltipData.obligatedFormatted} count={tooltipData.childAwardCount} />
                },
                current: {
                    offsetAdjustments: { top: 0 },
                    tooltipComponent: <CombinedCurrentAmounts total={tooltipData.baseAndExercisedOptionsFormatted} count={tooltipData.childAwardCount} />
                },
                potential: {
                    offsetAdjustments: { top: 0 },
                    tooltipComponent: <CombinedPotentialAmounts total={tooltipData.baseAndAllOptionsFormatted} count={tooltipData.childAwardCount} />
                },
                exceedsCurrent: {
                    offsetAdjustments: { top: 0 },
                    tooltipComponent: <CombinedExceedsCurrentAmounts total={tooltipData.overspendingFormatted} count={tooltipData.childAwardCount} />
                },
                exceedsPotential: {
                    offsetAdjustments: { top: 0 },
                    tooltipComponent: <CombinedExceedsPotentialAmounts total={tooltipData.extremeOverspendingFormatted} count={tooltipData.childAwardCount} />
                }
            },
            contract: {
                obligated: {
                    offsetAdjustments: { top: 0 },
                    tooltipComponent: <ObligatedAmountTooltip />
                },
                current: {
                    offsetAdjustments: { top: 0 },
                    tooltipComponent: <CurrentAmountTooltip />
                },
                potential: {
                    offsetAdjustments: { top: 0 },
                    tooltipComponent: <PotentialAmountTooltip />
                },
                exceedsPotential: {
                    offsetAdjustments: { top: 0 },
                    tooltipComponent: <ExceedsPotentialAmountTooltip />
                },
                exceedsCurrent: {
                    offsetAdjustments: { top: 0 },
                    tooltipComponent: <ExceedsCurrentAmountTooltip />
                }
            },
            grant: {
                obligated: {
                    offsetAdjustments: { top: -7 },
                    tooltipComponent: <ObligatedAmountTooltip />
                },
                nonFederalFunding: {
                    offsetAdjustments: { top: -10, right: 0 },
                    tooltipComponent: <NonFederalFundingTooltip />
                },
                totalFunding: {
                    offsetAdjustments: { top: 0 },
                    tooltipComponent: <TotalFundingTooltip />
                }
            },
            loan: {
                subsidy: {
                    offsetAdjustments: { top: 0 },
                    tooltipComponent: <SubsidyTooltip />
                },
                faceValue: {
                    offsetAdjustments: { top: -7 },
                    tooltipComponent: <FaceValueTooltip />
                }
            }
        };
        return map[awardType][category];
    }

    renderChartBySpendingScenario(
        spendingScenario = this.props.spendingScenario,
        awardType = this.props.awardType,
        awardAmounts = this.props.awardOverview) {
        switch (spendingScenario) {
            case "exceedsCurrent":
                return (
                    <ExceedsCurrentChart
                        {...this.getTooltipPropsBySpendingScenario('exceedsCurrent', awardType)}
                        awardType={awardType}
                        awardAmounts={awardAmounts} />
                );
            case "exceedsPotential":
                return (
                    <ExceedsPotentialChart
                        {...this.getTooltipPropsBySpendingScenario('exceedsPotential', awardType)}
                        awardType={awardType}
                        awardAmounts={awardAmounts} />
                );
            case "normal":
                return (
                    <NormalChart
                        {...this.getTooltipPropsBySpendingScenario('normal', awardType)}
                        awardType={awardType}
                        awardAmounts={awardAmounts} />
                );
            default:
                return (
                    <div className="results-table-message-container">
                        <NoResultsMessage
                            title="Chart Not Available"
                            message="Data in this instance is not suitable for charting" />
                    </div>
                );
        }
    }

    renderChartByAwardType(awardAmounts = this.props.awardOverview, awardType = this.props.awardType, spendingScenario = this.props.spendingScenario) {
        switch (awardType) {
            case "grant":
                return (
                    <GrantChart awardAmounts={awardAmounts} />
                );
            case "loan":
                return (
                    <LoansChart awardAmounts={awardAmounts} />
                );
            default: // idvs and contracts
                return this.renderChartBySpendingScenario(spendingScenario);
        }
    }

    render() {
        const visualization = this.renderChartByAwardType(this.props.awardOverview, this.props.awardType, this.props.spendingScenario);
        return (
            <React.Fragment>
                {visualization}
            </React.Fragment>
        );
    }
}

AwardAmountsChart.propTypes = propTypes;
