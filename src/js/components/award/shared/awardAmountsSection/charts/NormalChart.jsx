/**
 * NormalChart.jsx
 * Created by David Trinh 2/15/19
 **/

import React from 'react';
import PropTypes from 'prop-types';
import { TooltipWrapper } from "data-transparency-ui";

import { generatePercentage } from 'helpers/awardAmountHelper';

import { AWARD_AGGREGATED_AMOUNTS_PROPS, TOOLTIP_PROPS } from '../../../../../propTypes/index';
import { getTooltipPropsByAwardTypeAndSpendingCategory } from '../Tooltips';

import { useTooltips } from './AwardAmountsChart';

const propTypes = {
    awardType: PropTypes.string,
    awardAmounts: AWARD_AGGREGATED_AMOUNTS_PROPS,
    obligatedTooltipProps: TOOLTIP_PROPS,
    currentTooltipProps: TOOLTIP_PROPS,
    potentialTooltipProps: TOOLTIP_PROPS
};

const isCovid = true;

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

    const obligatedWidth = {
        width: generatePercentage(obligation / potential)
    };
    const currentWidth = {
        width: generatePercentage((current - obligation) / potential)
    };

    const currentLabelWidth = {
        width: generatePercentage(current / potential)
    };

    const obligatedBarStyle = {
        backgroundColor: isCovid ? '#0A2F5A' : '#4773aa',
        border: isCovid ? 'solid 0.4rem #558EC6' : 'solid 0.4rem #d6d7d9'
    };

    const currentBarStyle = {
        backgroundColor: isCovid ? '#558EC6' : '#d8d8d8',
        border: 'none'
    };

    const potentialBarStyle = {
        backgroundColor: isCovid ? '#AAC6E2' : '#fff',
        border: 'none'
    };

    const propsForObligatedTooltip = buildTooltipProps("obligated", (activeTooltip === "obligated"), showObligatedTooltip);
    const propsForCurrentTooltip = buildTooltipProps("current", (activeTooltip === "current"), showCurrentTooltip);
    const propsForPotentialTooltip = buildTooltipProps("potential", (activeTooltip === "potential"), showPotentialTooltip);

    const classNameForCovid = isCovid ? ' covid' : '';

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
            <div className="award-amounts-viz__label obligated" style={obligatedWidth}>
                <div className={`award-amounts-viz__line-up${classNameForCovid}`} />
            </div>
            <div className="award-amounts-viz__bar-wrapper">
                <TooltipWrapper {...propsForPotentialTooltip}>
                    <div className="award-amounts-viz__bar" style={potentialBarStyle}>
                        <TooltipWrapper {...propsForObligatedTooltip} styles={obligatedWidth}>
                            <div className="award-amounts-viz__obligated" style={{ width: generatePercentage(1), ...obligatedBarStyle }} />
                        </TooltipWrapper>
                        <TooltipWrapper {...propsForCurrentTooltip} styles={currentWidth}>
                            <div className="award-amounts-viz__excerised" style={currentBarStyle} />
                        </TooltipWrapper>
                    </div>
                </TooltipWrapper>
            </div>
            <div className="award-amounts-viz__label" style={currentLabelWidth}>
                <div className={`award-amounts-viz__line current${classNameForCovid}`} style={{ backgroundColor: currentBarStyle.backgroundColor }} />
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
                    <div className="award-amounts-viz__legend-line" style={currentBarStyle} />
                </div>
            </div>
            <div className="award-amounts-viz__label">
                <div className={`award-amounts-viz__line potential${classNameForCovid}`} />
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
                    <div className="award-amounts-viz__legend-line award-amounts-viz__legend-line_potential" style={potentialBarStyle} />
                </div>
            </div>
        </div>
    );
};

NormalChart.propTypes = propTypes;

export default NormalChart;
