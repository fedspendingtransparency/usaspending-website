/**
 * NormalChart.jsx
 * Created by Maxwell Kendall 9/16/19
 **/

import React from 'react';
import PropTypes from 'prop-types';

import { generatePercentage } from 'helpers/awardAmountHelper';

import { useTooltips } from "./AwardAmountsChart";
import TooltipWrapper from "../../../../sharedComponents/TooltipWrapper";
import { AWARD_V2_AGGREGATED_AMOUNTS_PROPS, TOOLTIP_PROPS } from '../../../../../propTypes/index';
import { getTooltipPropsByAwardTypeAndSpendingCategory } from '../Tooltips';


const propTypes = {
    awardType: PropTypes.string,
    awardAmounts: AWARD_V2_AGGREGATED_AMOUNTS_PROPS,
    subsidyTooltipProps: TOOLTIP_PROPS,
    faceValueTooltipProps: TOOLTIP_PROPS
};

const LoanChart = ({ awardAmounts }) => {
    const [
        activeTooltip,
        closeTooltip,
        showSubsidyTooltip,
        showFaceValueTooltip
    ] = useTooltips(["subsidy", "faceValue"]);

    const buildTooltipProps = (spendingCategory, isVisible, showTooltip, data = awardAmounts) => ({
        ...getTooltipPropsByAwardTypeAndSpendingCategory('loan', spendingCategory, data),
        wide: false,
        controlledProps: {
            isControlled: true,
            isVisible,
            showTooltip,
            closeTooltip
        }
    });

    // Rename properties to improve readability of the calculations
    const subsidy = awardAmounts._subsidy;
    const faceValue = awardAmounts._faceValue;
    const isSubsidyZero = (subsidy === 0);

    const subsidyBarAndLabelStyles = {
        width: generatePercentage(subsidy / faceValue),
        backgroundColor: '#F5A623'
    };

    const faceValueColor = "#FFF";

    const propsForSubsidyTooltip = buildTooltipProps('subsidy', (activeTooltip === 'subsidy'), showSubsidyTooltip);
    const propsForFaceValueTooltip = buildTooltipProps('faceValue', (activeTooltip === 'faceValue'), showFaceValueTooltip);

    return (
        <div className="award-amounts-viz">
            {!isSubsidyZero &&
                <React.Fragment>
                    <div
                        className="award-amounts-viz__desc-top--loans"
                        role="button"
                        tabIndex="0"
                        onBlur={closeTooltip}
                        onFocus={showSubsidyTooltip}
                        onKeyPress={showSubsidyTooltip}
                        onMouseEnter={showSubsidyTooltip}
                        onMouseLeave={closeTooltip}
                        onClick={showSubsidyTooltip}>
                        <strong>{awardAmounts.subsidyAbbreviated}</strong><br />Original Subsidy Cost
                    </div>
                    <div className="award-amounts-viz__label" style={subsidyBarAndLabelStyles}>
                        <div className="award-amounts-viz__line-up--loans" />
                    </div>
                </React.Fragment>}
            {isSubsidyZero &&
                <TooltipWrapper {...propsForSubsidyTooltip} styles={{ width: '160px' }}>
                    <div className="award-amounts-viz__desc-top--loans" role="button" tabIndex="0">
                        <strong>{awardAmounts.subsidyAbbreviated}</strong>
                        <span>Original Subsidy Cost</span>
                    </div>
                </TooltipWrapper>
            }
            <div className="award-amounts-viz__bar-wrapper">
                <TooltipWrapper {...propsForFaceValueTooltip} styles={{ backgroundColor: faceValueColor }}>
                    <div className="award-amounts-viz__bar" style={{ backgroundColor: faceValueColor, width: '100%' }}>
                        {!isSubsidyZero &&
                            <TooltipWrapper {...propsForSubsidyTooltip} styles={{ width: subsidyBarAndLabelStyles.width }}>
                                <div className="award-amounts-viz__obligated--grants" style={{ width: generatePercentage(1), backgroundColor: subsidyBarAndLabelStyles.backgroundColor }} />
                            </TooltipWrapper>}
                        {isSubsidyZero && <div className="award-amounts-viz__obligated--grants" style={subsidyBarAndLabelStyles} />}
                    </div>
                </TooltipWrapper>
            </div>
            <div className="award-amounts-viz__label">
                <div className="award-amounts-viz__line" style={{ backgroundColor: faceValueColor }} />
                <div className="award-amounts-viz__desc">
                    <div
                        className="award-amounts-viz__desc-text"
                        role="button"
                        tabIndex="0"
                        onBlur={closeTooltip}
                        onFocus={showFaceValueTooltip}
                        onKeyPress={showFaceValueTooltip}
                        onMouseEnter={showFaceValueTooltip}
                        onMouseLeave={closeTooltip}
                        onClick={showFaceValueTooltip}>
                        <strong>{awardAmounts.faceValueAbbreviated}</strong><br />Face Value of Direct Loan
                    </div>
                    <div className="award-amounts-viz__legend-line award-amounts-viz__legend-line_potential" style={{ backgroundColor: faceValueColor }} />
                </div>
            </div>
        </div>
    );
};

export default LoanChart;
LoanChart.propTypes = propTypes;
