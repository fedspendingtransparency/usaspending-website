import React from 'react';

import AwardSection from '../AwardSection';
import AwardSectionHeader from '../AwardSectionHeader';
import { determineSpendingScenario } from "../../../../helpers/aggregatedAmountsHelper";
import NormalChart from './charts/NormalChart';
import ExceedsCurrentChart from './charts/ExceedsCurrentChart';
import ExceedsPotentialChart from './charts/ExceedsPotentialChart';
import NoResultsMessage from '../../../sharedComponents/NoResultsMessage';
import GrantChart from './charts/GrantChart';
import AwardAmountsTable from './AwardAmountsTable';
import { AWARD_OVERVIEW_AWARD_AMOUNTS_SECTION_PROPS, TOOLTIP_PROPS, AWARD_TYPE_PROPS } from '../../../../propTypes';
import { ObligatedAmountTooltip, CurrentAmountTooltip, PotentialAmountTooltip } from './Tooltips';

const propTypes = {
    awardType: AWARD_TYPE_PROPS,
    awardOverview: AWARD_OVERVIEW_AWARD_AMOUNTS_SECTION_PROPS,
    tooltipProps: TOOLTIP_PROPS
};

// TODO: In DEV-3279, Abstract all of this horrible logic to its own component.

const tooltipStateBySpendingCategory = {
    obligated: "showObligatedTooltip",
    current: "showCurrentTooltip",
    potential: "showPotentialTooltip",
    exceedsCurrent: "showExceedsCurrentTooltip",
    exceedsPotential: "showExceedsPotentialTooltip"
};

const createShowAndCloseTooltipMethod = (ctx, category) => {
    // ctx is `this`
    // type is one of: obligated, current, potential, exceedsCurrent, or exceedsPotential
    const titleCasedCategory = `${category[0].toUpperCase()}${category.substring(1)}`;
    ctx[`show${titleCasedCategory}Tooltip`] = ctx.showSpendingCategoryTooltip.bind(ctx, category);
    ctx[`close${titleCasedCategory}Tooltip`] = ctx.closeSpendingCategoryTooltip.bind(ctx, category);
};

export default class AwardAmounts extends React.Component {
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
        this.getTooltipPropsByCategory = this.getTooltipPropsByCategory.bind(this);
        Object.keys(tooltipStateBySpendingCategory)
            .forEach((spendingCategory) => {
                // for each spending category, add a show/close tool tip method
                createShowAndCloseTooltipMethod(this, spendingCategory);
            });
    }

    getTooltipPropsByCategory(category) {
        const map = {
            obligated: {
                offsetAdjustments: { top: 0, right: 30 },
                className: "combined-obligated-tt__container",
                tooltipComponent: <ObligatedAmountTooltip />
            },
            current: {
                offsetAdjustments: { top: 0, right: 30 },
                className: "combined-current-tt__container",
                tooltipComponent: <CurrentAmountTooltip />
            },
            potential: {
                offsetAdjustments: { top: 0, right: 30 },
                className: "combined-potential-tt__container",
                tooltipComponent: <PotentialAmountTooltip />
            }
            // exceedsCurrent: {
            //     offsetAdjustments: { top: 0, right: 30 },
            //     className: "combined-exceeds-current-tt__container",
            //     tooltipComponent: <CombinedExceedsCurrentAmounts total={awardAmounts.overspendingFormatted} count={awardAmounts.childAwardCount} />
            // },
            // exceedsPotential: {
            //     offsetAdjustments: { top: 0, right: 30 },
            //     className: "combined-exceeds-potential-tt__container",
            //     tooltipComponent: <CombinedExceedsPotentialAmounts total={awardAmounts.extremeOverspendingFormatted} count={awardAmounts.childAwardCount} />
            // }
        };

        return map[category];
    }

    getTooltipPropsBySpendingScenario(spendingScenario) {
        // these are the award amount visualizations needed for every spending scenario
        const spendingCategories = ["obligated", "current", "potential"];
        if (spendingScenario !== "normal") {
            // if exceedsPotential or exceedsCurrent is the spending scenario, add it here as a spendingCategory...
            spendingCategories.push(spendingScenario);
        }

        // Build object with shape: { category1ToolTipProps: {}, category2ToolTipProps: {}, ... }
        return spendingCategories.reduce((acc, category) => {
            // used to reference methods in camelCase
            const titleCasedCategory = `${category[0].toUpperCase()}${category.substring(1)}`;
            const propsForCategory = this.getTooltipPropsByCategory(category);
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

    renderChart(awardAmounts = this.props.awardOverview) {
        const { awardType } = this.props;

        if (awardType === 'grant') {
            return (
                <GrantChart
                    awardAmounts={awardAmounts}
                    obligatedTooltipProps={this.props.tooltipProps}
                    currentTooltipProps={this.props.tooltipProps}
                    potentialTooltipProps={this.props.tooltipProps}
                    exceedsCurrentTooltipProps={this.props.tooltipProps} />
            );
        }
        switch (determineSpendingScenario(awardAmounts)) {
            case "exceedsCurrent":
                return (
                    <ExceedsCurrentChart
                        {...this.getTooltipPropsBySpendingScenario('exceedsCurrent')}
                        awardType={awardType}
                        awardAmounts={awardAmounts} />
                );
            case "exceedsPotential":
                return (
                    <ExceedsPotentialChart
                        {...this.getTooltipPropsBySpendingScenario('exceedsPotential')}
                        awardType={awardType}
                        awardAmounts={awardAmounts} />
                );
            case "normal":
                return (
                    <NormalChart
                        {...this.getTooltipPropsBySpendingScenario('normal')}
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
        const { awardOverview, awardType } = this.props;
        const visualization = this.renderChart(awardOverview);

        return (
            <AwardSection type="column" className="award-viz award-amounts">
                <div className="award__col__content">
                    <AwardSectionHeader title="$ Award Amounts" />
                    <div>
                        <div className="award-amounts__content">
                            {visualization}
                            <AwardAmountsTable awardData={awardOverview} awardType={awardType} />
                        </div>
                    </div>
                </div>
            </AwardSection>
        );
    }
}

AwardAmounts.propTypes = propTypes;
