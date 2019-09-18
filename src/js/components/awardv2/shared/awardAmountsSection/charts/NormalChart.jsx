/**
 * NormalChart.jsx
 * Created by David Trinh 2/15/19
 **/

import React from 'react';
import PropTypes from 'prop-types';

import { generatePercentage } from 'helpers/aggregatedAmountsHelper';
import TooltipWrapper from "../../../../sharedComponents/TooltipWrapper";
import { AWARD_V2_AGGREGATED_AMOUNTS_PROPS, TOOLTIP_PROPS } from '../../../../../propTypes/index';
import {
    CombinedObligatedAmounts,
    CombinedCurrentAmounts,
    CombinedPotentialAmounts,
    ObligatedAmountTooltip,
    CurrentAmountTooltip,
    PotentialAmountTooltip
} from "../Tooltips";
import { useTooltips } from './AwardAmountsChart';

const propTypes = {
    awardType: PropTypes.string,
    awardAmounts: AWARD_V2_AGGREGATED_AMOUNTS_PROPS,
    obligatedTooltipProps: TOOLTIP_PROPS,
    currentTooltipProps: TOOLTIP_PROPS,
    potentialTooltipProps: TOOLTIP_PROPS
};

const tooltipPropsByAwardTypeAndSpendingCategory = (type, category, data) => {
    const map = {
        idv: {
            obligated: {
                offsetAdjustments: { top: 0 },
                tooltipComponent: <CombinedObligatedAmounts total={data.obligatedFormatted} count={data.childAwardCount} />
            },
            current: {
                offsetAdjustments: { top: 0 },
                tooltipComponent: <CombinedCurrentAmounts total={data.baseAndExercisedOptionsFormatted} count={data.childAwardCount} />
            },
            potential: {
                offsetAdjustments: { top: 0 },
                tooltipComponent: <CombinedPotentialAmounts total={data.baseAndAllOptionsFormatted} count={data.childAwardCount} />
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
            }
        }
    };

    return map[type][category];
};

const NormalChart = ({ awardType, awardAmounts }) => {
    // Rename properties to improve readability of the calculations
    const [
        activeTooltip,
        closeTooltip,
        showObligatedTooltip,
        showCurrentTooltip,
        showPotentialTooltip
    ] = useTooltips(["obligated", "current", "potential"]);

    const isIdv = (awardType === 'idv');

    const buildTooltipProps = (spendingCategory, isVisible, showTooltip, type = awardType) => ({
        ...tooltipPropsByAwardTypeAndSpendingCategory(type, spendingCategory, awardAmounts),
        wide: true,
        controlledProps: {
            isControlled: true,
            isVisible,
            showTooltip,
            closeTooltip
        }
    });

    const obligation = awardAmounts._totalObligation;
    const current = awardAmounts._baseExercisedOptions;
    const potential = awardAmounts._baseAndAllOptions;

    const obligatedBarStyle = {
        width: generatePercentage(obligation / potential),
        backgroundColor: '#4773aa'
    };

    const currentBarStyle = {
        width: generatePercentage((current - obligation) / potential),
        backgroundColor: '#d8d8d8'
    };

    const obligatedLabelStyle = {
        width: generatePercentage(obligation / potential)
    };

    const currentLabelStyle = {
        width: generatePercentage(current / potential)
    };

    const propsForObligatedTooltip = buildTooltipProps("obligated", (activeTooltip === "obligated"), showObligatedTooltip);
    const propsForCurrentTooltip = buildTooltipProps("current", (activeTooltip === "current"), showCurrentTooltip);
    const propsForPotentialTooltip = buildTooltipProps("potential", (activeTooltip === "potential"), showPotentialTooltip);

    return (
        <div className="award-amounts-viz">
            <div
                className="award-amounts-viz__desc-top"
                role="button"
                tabIndex="0"
                onBlur={closeTooltip}
                onFocus={showObligatedTooltip}
                onKeyPress={showObligatedTooltip}
                onMouseEnter={showObligatedTooltip}
                onMouseLeave={closeTooltip}
                onClick={showObligatedTooltip}>
                <strong>{awardAmounts.totalObligationAbbreviated}</strong><br />{isIdv ? "Combined Obligated Amounts" : "Obligated Amount"}
            </div>
            <div className="award-amounts-viz__label" style={obligatedLabelStyle}>
                <div className="award-amounts-viz__line-up" />
            </div>
            <div className="award-amounts-viz__bar-wrapper">
                <TooltipWrapper {...propsForPotentialTooltip}>
                    <div className="award-amounts-viz__bar">
                        <TooltipWrapper {...propsForObligatedTooltip} styles={{ width: obligatedBarStyle.width }}>
                            <div className="award-amounts-viz__obligated" style={{ width: generatePercentage(1), backgroundColor: obligatedBarStyle.backgroundColor }} />
                        </TooltipWrapper>
                        <TooltipWrapper {...propsForCurrentTooltip} styles={{ width: currentBarStyle.width }}>
                            <div className="award-amounts-viz__excerised" style={{ backgroundColor: currentBarStyle.backgroundColor }} />
                        </TooltipWrapper>
                    </div>
                </TooltipWrapper>
            </div>
            <div className="award-amounts-viz__label" style={currentLabelStyle}>
                <div className="award-amounts-viz__line" />
                <div className="award-amounts-viz__desc">
                    <div
                        className="award-amounts-viz__desc-text"
                        role="button"
                        tabIndex="0"
                        onBlur={closeTooltip}
                        onFocus={showCurrentTooltip}
                        onKeyPress={showCurrentTooltip}
                        onMouseEnter={showCurrentTooltip}
                        onMouseLeave={closeTooltip}
                        onClick={showCurrentTooltip}>
                        <strong>{awardAmounts.baseExercisedOptionsAbbreviated}</strong><br />{isIdv ? "Combined Current Award Amounts" : "Current Award Amount"}
                    </div>
                    <div className="award-amounts-viz__legend-line" />
                </div>
            </div>
            <div className="award-amounts-viz__label">
                <div className="award-amounts-viz__line" />
                <div className="award-amounts-viz__desc">
                    <div
                        className="award-amounts-viz__desc-text"
                        role="button"
                        tabIndex="0"
                        onBlur={closeTooltip}
                        onFocus={showPotentialTooltip}
                        onKeyPress={showPotentialTooltip}
                        onMouseEnter={showPotentialTooltip}
                        onMouseLeave={closeTooltip}
                        onClick={showPotentialTooltip}>
                        <strong>{awardAmounts.baseAndAllOptionsAbbreviated}</strong><br />{isIdv ? "Combined Potential Award Amounts" : "Potential Award Amount"}
                    </div>
                    <div className="award-amounts-viz__legend-line award-amounts-viz__legend-line_potential" />
                </div>
            </div>
        </div>
    );
};

NormalChart.propTypes = propTypes;

export default NormalChart;
