import React, { Component } from 'react';
import PropTypes from 'prop-types';

import NormalChart from './NormalChart';
import ExceedsCurrentChart from './ExceedsCurrentChart';
import ExceedsPotentialChart from './ExceedsPotentialChart';
import NoResultsMessage from '../../../../sharedComponents/NoResultsMessage';
import GrantChart from './GrantChart';
import { ObligatedAmountTooltip, ExceedsCurrentAmountTooltip, CurrentAmountTooltip, ExceedsPotentialAmountTooltip, PotentialAmountTooltip, NonFederalFundingTooltip, TotalFundingTooltip } from '../Tooltips';
import { CombinedObligatedAmounts, CombinedCurrentAmounts, CombinedPotentialAmounts, CombinedExceedsCurrentAmounts, CombinedExceedsPotentialAmounts } from "../../../idv/TooltipContent";
import { AWARD_OVERVIEW_AWARD_AMOUNTS_SECTION_PROPS, TOOLTIP_PROPS } from '../../../../../propTypes/index';

const propTypes = {
    awardType: PropTypes.string,
    awardOverview: AWARD_OVERVIEW_AWARD_AMOUNTS_SECTION_PROPS,
    obligatedTooltipProps: TOOLTIP_PROPS,
    currentTooltipProps: TOOLTIP_PROPS,
    potentialTooltipProps: TOOLTIP_PROPS,
    exceedsCurrentTooltipProps: TOOLTIP_PROPS,
    spendingScenario: PropTypes.string
};

const tooltipStateBySpendingCategory = {
    obligated: "showObligatedTooltip",
    current: "showCurrentTooltip",
    potential: "showPotentialTooltip",
    exceedsCurrent: "showExceedsCurrentTooltip",
    exceedsPotential: "showExceedsPotentialTooltip",
    nonFederalFunding: "showNonFederalFundingTooltip",
    totalFunding: "showTotalFundingTooltip"
};

const createShowAndCloseTooltipMethod = (ctx, category) => {
    // ctx is `this`
    // type is one of: obligated, current, potential, exceedsCurrent, or exceedsPotential
    const titleCasedCategory = `${category[0].toUpperCase()}${category.substring(1)}`;
    ctx[`show${titleCasedCategory}Tooltip`] = ctx.showSpendingCategoryTooltip.bind(ctx, category);
    ctx[`close${titleCasedCategory}Tooltip`] = ctx.closeSpendingCategoryTooltip.bind(ctx, category);
};

export default class AwardAmountsChart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showObligatedTooltip: false,
            showCurrentTooltip: false,
            showPotentialTooltip: false,
            showExceedsCurrentTooltip: false,
            showExceedsPotentialTooltip: false
        };
        this.renderChart = this.renderChart.bind(this);
        this.getTooltipPropsBySpendingScenario = this.getTooltipPropsBySpendingScenario.bind(this);
        this.getTooltipPropsByAwardTypeAndSpendingCategory = this.getTooltipPropsByAwardTypeAndSpendingCategory.bind(this);
        Object.keys(tooltipStateBySpendingCategory)
            .forEach((spendingCategory) => {
                // for each spending category, add a show/close tool tip method
                createShowAndCloseTooltipMethod(this, spendingCategory);
            });
    }

    getTooltipPropsByAwardTypeAndSpendingCategory(awardType, category, tooltipData = this.props.awardOverview) {
        const map = {
            idv: {
                obligated: {
                    offsetAdjustments: { top: 0, right: 30 },
                    tooltipComponent: <CombinedObligatedAmounts total={tooltipData.obligatedFormatted} count={tooltipData.childAwardCount} />
                },
                current: {
                    offsetAdjustments: { top: 0, right: 30 },
                    tooltipComponent: <CombinedCurrentAmounts total={tooltipData.baseAndExercisedOptionsFormatted} count={tooltipData.childAwardCount} />
                },
                potential: {
                    offsetAdjustments: { top: 0, right: 30 },
                    tooltipComponent: <CombinedPotentialAmounts total={tooltipData.baseAndAllOptionsFormatted} count={tooltipData.childAwardCount} />
                },
                exceedsCurrent: {
                    offsetAdjustments: { top: 0, right: 30 },
                    tooltipComponent: <CombinedExceedsCurrentAmounts total={tooltipData.overspendingFormatted} count={tooltipData.childAwardCount} />
                },
                exceedsPotential: {
                    offsetAdjustments: { top: 0, right: 30 },
                    tooltipComponent: <CombinedExceedsPotentialAmounts total={tooltipData.extremeOverspendingFormatted} count={tooltipData.childAwardCount} />
                }
            },
            contract: {
                obligated: {
                    offsetAdjustments: { top: 0, right: 30 },
                    tooltipComponent: <ObligatedAmountTooltip />
                },
                current: {
                    offsetAdjustments: { top: 0, right: 30 },
                    tooltipComponent: <CurrentAmountTooltip />
                },
                potential: {
                    offsetAdjustments: { top: 0, right: 30 },
                    tooltipComponent: <PotentialAmountTooltip />
                },
                exceedsPotential: {
                    offsetAdjustments: { top: 0, right: 30 },
                    tooltipComponent: <ExceedsPotentialAmountTooltip />
                },
                exceedsCurrent: {
                    offsetAdjustments: { top: 0, right: 30 },
                    tooltipComponent: <ExceedsCurrentAmountTooltip />
                }
            },
            assistance: {
                obligated: {
                    offsetAdjustments: { top: -7, right: 30 },
                    tooltipComponent: <ObligatedAmountTooltip />
                },
                nonFederalFunding: {
                    offsetAdjustments: { top: -10, right: 0 },
                    tooltipComponent: <NonFederalFundingTooltip />
                },
                totalFunding: {
                    offsetAdjustments: { top: 0, right: 30 },
                    tooltipComponent: <TotalFundingTooltip />
                }
            }
        };
        if (Object.keys(map).includes(awardType)) {
            return map[awardType][category];
        }
        return map.assistance[category];
    }

    getTooltipPropsBySpendingScenario(spendingScenario, awardType = this.props.awardType) {
        // these are the award amount visualizations needed for every spending scenario
        const spendingCategories = (awardType === "grant")
            ? ["obligated", "nonFederalFunding", "totalFunding"]
            : ["obligated", "current", "potential"];
        if (spendingScenario !== "normal") {
            // if exceedsPotential or exceedsCurrent is the spending scenario, add it here as a spendingCategory...
            spendingCategories.push(spendingScenario);
        }

        // Build object with shape: { category1ToolTipProps: {}, category2ToolTipProps: {}, ... }
        return spendingCategories.reduce((acc, category) => {
            // used to reference methods in camelCase
            const titleCasedCategory = `${category[0].toUpperCase()}${category.substring(1)}`;
            const propsForCategory = this.getTooltipPropsByAwardTypeAndSpendingCategory(awardType, category);
            return Object.assign(acc, {
                [`${category}TooltipProps`]: Object.assign(propsForCategory, {
                    wide: true,
                    controlledProps: {
                        isControlled: true,
                        isVisible: this.state[`show${titleCasedCategory}Tooltip`],
                        closeTooltip: this[`close${titleCasedCategory}Tooltip`],
                        showTooltip: this[`show${titleCasedCategory}Tooltip`]
                    }
                })
            });
        }, {});
    }

    showSpendingCategoryTooltip(category) {
        this.setState({
            [tooltipStateBySpendingCategory[category]]: true
        });
        // hide all other tooltips
        Object.keys(this.state)
            .filter((tooltipState) => tooltipState !== tooltipStateBySpendingCategory[category])
            .forEach((tooltipState) => this.setState({ [tooltipState]: false }));
    }

    closeSpendingCategoryTooltip(category) {
        this.setState({
            [tooltipStateBySpendingCategory[category]]: false
        });
    }

    renderChart(awardAmounts = this.props.awardOverview, awardType = this.props.awardType, spendingScenario = this.props.spendingScenario) {
        if (awardType === 'grant') {
            return (
                <GrantChart
                    {...this.getTooltipPropsBySpendingScenario('normal', awardType)}
                    awardAmounts={awardAmounts} />
            );
        }
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

    render() {
        const visualization = this.renderChart(this.props.awardOverview, this.props.awardType, this.props.spendingScenario);
        return (
            <React.Fragment>
                {visualization}
            </React.Fragment>
        );
    }
}

AwardAmountsChart.propTypes = propTypes;
