/**
 * ExceedsCurrentChart.jsx
 * Created by Lizzie Salita 4/2/19
 **/

import React from 'react';
import PropTypes from 'prop-types';

import { generatePercentage } from 'helpers/awardAmountHelper';

import TooltipWrapper from "../../../../sharedComponents/TooltipWrapper";
import { getTooltipPropsByAwardTypeAndSpendingCategory } from '../Tooltips';

import { useTooltips } from "./AwardAmountsChart";
import { AWARD_V2_AGGREGATED_AMOUNTS_PROPS, TOOLTIP_PROPS } from '../../../../../propTypes/index';


const propTypes = {
    awardType: PropTypes.string,
    awardAmounts: AWARD_V2_AGGREGATED_AMOUNTS_PROPS,
    obligatedTooltipProps: TOOLTIP_PROPS,
    currentTooltipProps: TOOLTIP_PROPS,
    potentialTooltipProps: TOOLTIP_PROPS,
    exceedsCurrentTooltipProps: TOOLTIP_PROPS
};

const ExceedsCurrentChart = ({ awardAmounts, awardType }) => {
    const [
        activeTooltip,
        closeTooltip,
        showObligatedTooltip,
        showCurrentTooltip,
        showPotentialTooltip,
        showExceedsCurrentTooltip
    ] = useTooltips(["obligated", "current", "potential", "exceedsCurrent"]);

    const isIdv = (awardType === 'idv');
    const buildTooltipProps = (spendingCategory, isVisible, showTooltip, type = awardType, data = awardAmounts) => ({
        ...getTooltipPropsByAwardTypeAndSpendingCategory(type, spendingCategory, data),
        wide: isIdv,
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

    const currentBarStyle = {
        width: generatePercentage(current / obligation),
        backgroundColor: '#4773aa'
    };

    const overspendingBarStyle = {
        width: generatePercentage((obligation - current) / obligation)
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
    const propsForExceedsCurrentTooltip = buildTooltipProps("exceedsCurrent", (activeTooltip === "exceedsCurrent"), showExceedsCurrentTooltip);

    return (
        <div className="award-amounts-viz">
            <div className="award-amounts-viz__desc-top-wrapper">
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
                    <strong>{awardAmounts.totalObligationAbbreviated}</strong><br /> {isIdv ? "Combined Obligated Amounts" : "Obligated Amount"}
                </div>
                <div className="award-amounts-viz__desc">
                    <div
                        className="award-amounts-viz__desc-text"
                        role="button"
                        tabIndex="0"
                        onBlur={closeTooltip}
                        onFocus={showExceedsCurrentTooltip}
                        onKeyPress={showExceedsCurrentTooltip}
                        onMouseEnter={showExceedsCurrentTooltip}
                        onMouseLeave={closeTooltip}
                        onClick={showExceedsCurrentTooltip}>
                        <strong>{awardAmounts.overspendingAbbreviated}</strong><br />
                        <div className="award-amounts-viz__desc-text-wrapper">
                            {isIdv ? "Exceeds Combined Current Award Amounts" : "Exceeds Current Award Amount"}
                        </div>
                    </div>
                    <div className="award-amounts-viz__legend-line award-amounts-viz__legend-line_overspending" />
                </div>
            </div>
            <div className="award-amounts-viz__label" style={obligatedLabelStyle}>
                <div className="award-amounts-viz__line-up" />
            </div>
            <div className="award-amounts-viz__bar-wrapper">
                <TooltipWrapper {...propsForPotentialTooltip} styles={{ width: "100%" }}>
                    <div className="award-amounts-viz__bar">{/* Combined Potential */}
                        <TooltipWrapper {...propsForObligatedTooltip} styles={obligatedLabelStyle}>
                            <TooltipWrapper {...propsForCurrentTooltip} styles={{ width: currentBarStyle.width }}>
                                <div className="award-amounts-viz__obligated" style={{ backgroundColor: currentBarStyle.backgroundColor }} />{/* Obligated/Current */}
                            </TooltipWrapper>
                            <TooltipWrapper {...propsForExceedsCurrentTooltip} styles={{ width: overspendingBarStyle.width }}>
                                <div className="award-amounts-viz__exceeded" style={{ backgroundColor: overspendingBarStyle.backgroundColor }} />{/* Obligated/Overspending */}
                            </TooltipWrapper>
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
                        <strong>{awardAmounts.baseExercisedOptionsAbbreviated}</strong><br /> {isIdv ? "Combined Current Award Amounts" : "Current Award Amount"}
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
                        <strong>{awardAmounts.baseAndAllOptionsAbbreviated}</strong><br /> {isIdv ? "Combined Potential Award Amounts" : "Potential Award Amount"}
                    </div>
                    <div className="award-amounts-viz__legend-line award-amounts-viz__legend-line_potential" />
                </div>
            </div>
        </div>
    );
};

ExceedsCurrentChart.propTypes = propTypes;

export default ExceedsCurrentChart;
