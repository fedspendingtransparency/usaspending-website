/**
 * ExceedsPotentialChart.jsx
 * Created by Lizzie Salita 4/4/19
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
    exceedsPotentialTooltipProps: TOOLTIP_PROPS
};

const ExceedsPotentialChart = ({ awardType, awardAmounts }) => {
    const [
        activeTooltip,
        closeTooltip,
        showObligatedTooltip,
        showCurrentTooltip,
        showPotentialTooltip,
        showExceedsPotentialTooltip
    ] = useTooltips(["obligated", "current", "potential", "exceedsPotential"]);

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

    const overspendingBarStyle = {
        width: generatePercentage((obligation - potential) / obligation)
    };

    const potentialWrapperStyle = {
        width: generatePercentage(potential / obligation)
    };

    // currentBar and potentialBar live inside the potentialWrapper div,
    // so their widths are divided by potential
    const potentialBarStyle = {
        width: generatePercentage((potential - current) / potential),
        backgroundColor: '#4773aa'
    };

    const currentBarStyle = {
        width: generatePercentage(current / potential),
        backgroundColor: '#4773aa'
    };

    const obligatedLabelStyle = {
        width: '100%'
    };

    const currentLabelStyle = {
        width: generatePercentage(current / obligation)
    };

    const potentialLabelStyle = {
        width: generatePercentage(potential / obligation)
    };

    const propsForObligatedTooltip = buildTooltipProps("obligated", (activeTooltip === "obligated"), showObligatedTooltip);
    const propsForCurrentTooltip = buildTooltipProps("current", (activeTooltip === "current"), showCurrentTooltip);
    const propsForPotentialTooltip = buildTooltipProps("potential", (activeTooltip === "potential"), showPotentialTooltip);
    const propsForExceedsPotentialTooltip = buildTooltipProps("exceedsPotential", (activeTooltip === "exceedsPotential"), showExceedsPotentialTooltip);

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
                    <strong>
                        {awardAmounts.totalObligationAbbreviated}
                    </strong>
                    <br />
                    {isIdv ? "Combined Obligated Amounts" : "Obligated Amount"}
                </div>
                <div className="award-amounts-viz__desc">
                    <div
                        className="award-amounts-viz__desc-text"
                        role="button"
                        tabIndex="0"
                        onBlur={closeTooltip}
                        onFocus={showExceedsPotentialTooltip}
                        onKeyPress={showExceedsPotentialTooltip}
                        onMouseEnter={showExceedsPotentialTooltip}
                        onMouseLeave={closeTooltip}
                        onClick={showExceedsPotentialTooltip}>
                        <strong>{awardAmounts.extremeOverspendingAbbreviated}</strong>
                        <br />
                        <div className="award-amounts-viz__desc-text-wrapper">
                            {isIdv ? "Exceeds Combined Potential Award Amounts" : "Exceeds Potential Award Amount"}
                        </div>
                    </div>
                    <div className="award-amounts-viz__legend-line award-amounts-viz__legend-line_extreme-overspending" />
                </div>
            </div>
            <div
                className="award-amounts-viz__label"
                style={obligatedLabelStyle}>
                <div className="award-amounts-viz__line-up" />
            </div>
            <TooltipWrapper {...propsForObligatedTooltip} styles={obligatedLabelStyle} offsetAdjustments={{ top: 17.5, right: 30 }}>
                <div className="award-amounts-viz__bar-wrapper award-amounts-viz__bar-wrapper_extreme-overspending">
                    <div className="award-amounts-viz__bar">
                        <div
                            className="award-amounts-viz__potential-wrapper"
                            style={potentialWrapperStyle}>
                            <TooltipWrapper {...propsForCurrentTooltip} styles={{ width: currentBarStyle.width }}>
                                <div
                                    className="award-amounts-viz__current"
                                    style={{ width: generatePercentage(1), backgroundColor: currentBarStyle.backgroundColor }} />
                            </TooltipWrapper>
                            <TooltipWrapper {...propsForPotentialTooltip} styles={{ width: potentialBarStyle.width }}>
                                <div
                                    className="award-amounts-viz__potential"
                                    style={{ width: generatePercentage(1), backgroundColor: potentialBarStyle.backgroundColor }} />
                            </TooltipWrapper>
                        </div>
                        <TooltipWrapper {...propsForExceedsPotentialTooltip} styles={{ width: overspendingBarStyle.width }} offsetAdjustments={{ top: -5, right: 30 }}>
                            <div
                                className="award-amounts-viz__exceeded-potential"
                                style={{ width: generatePercentage(1) }} />
                        </TooltipWrapper>
                    </div>
                </div>
            </TooltipWrapper>
            <div
                className="award-amounts-viz__label"
                style={currentLabelStyle}>
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
                        <strong>{awardAmounts.baseExercisedOptionsAbbreviated}</strong>
                        <br />
                        {isIdv ? "Combined Current Award Amounts" : "Current Award Amount"}
                    </div>
                    <div className="award-amounts-viz__legend-line" />
                </div>
            </div>
            <div
                className="award-amounts-viz__label"
                style={potentialLabelStyle}>
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
                        <strong>{awardAmounts.baseAndAllOptionsAbbreviated}</strong>
                        <br />
                        {isIdv ? "Combined Potential Award Amounts" : "Potential Award Amount"}
                    </div>
                    <div className="award-amounts-viz__legend-line award-amounts-viz__legend-line_potential" />
                </div>
            </div>
        </div>
    );
};

ExceedsPotentialChart.propTypes = propTypes;

export default ExceedsPotentialChart;
