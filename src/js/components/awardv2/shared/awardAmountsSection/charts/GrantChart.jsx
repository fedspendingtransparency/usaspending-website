/**
 * NormalChart.jsx
 * Created by David Trinh 2/15/19
 **/

import React from 'react';
import PropTypes from 'prop-types';

import { generatePercentage } from 'helpers/awardAmountHelper';

import TooltipWrapper from "../../../../sharedComponents/TooltipWrapper";
import { useTooltips } from "./AwardAmountsChart";
import { AWARD_V2_AGGREGATED_AMOUNTS_PROPS, TOOLTIP_PROPS } from '../../../../../propTypes/index';
import { getTooltipPropsByAwardTypeAndSpendingCategory } from '../Tooltips';


const propTypes = {
    awardType: PropTypes.string,
    awardAmounts: AWARD_V2_AGGREGATED_AMOUNTS_PROPS,
    obligatedTooltipProps: TOOLTIP_PROPS,
    nonFederalFundingTooltipProps: TOOLTIP_PROPS,
    totalFundingTooltipProps: TOOLTIP_PROPS
};

const GrantChart = ({ awardAmounts, awardType }) => {
    const [
        activeTooltip,
        closeTooltip,
        showObligatedTooltip,
        showNonFederalFundingTooltip,
        showTotalFundingTooltip
    ] = useTooltips(["obligated", "nonFederalFunding", "totalFunding"]);

    const buildTooltipProps = (spendingCategory, isVisible, showTooltip, data = awardAmounts) => ({
        ...getTooltipPropsByAwardTypeAndSpendingCategory(awardType, spendingCategory, data),
        wide: false,
        controlledProps: {
            isControlled: true,
            isVisible,
            showTooltip,
            closeTooltip
        }
    });

    // Rename properties to improve readability of the calculations
    const obligation = awardAmounts._totalObligation;
    const nonFederalFunding = awardAmounts._nonFederalFunding;
    const totalFunding = awardAmounts._totalFunding;

    const nonFederalFundingIsZero = (nonFederalFunding === 0);

    const obligatedBarStyle = {
        width: generatePercentage(obligation / totalFunding),
        backgroundColor: '#4773aa'
    };

    const obligatedLabelStyle = {
        width: generatePercentage(obligation / totalFunding)
    };

    const nonFederalFundingBarStyle = {
        width: generatePercentage(nonFederalFunding / totalFunding),
        backgroundColor: nonFederalFundingIsZero ? 'none' : '#47AAA7'
    };

    const totalFundingColor = "#FFF";

    const nonFederalFundingLabelStyle = {
        width: nonFederalFundingIsZero ? '100%' : generatePercentage(nonFederalFunding / totalFunding),
        left: nonFederalFundingIsZero ? '0' : generatePercentage(obligation / totalFunding),
        position: 'relative'
    };

    const nonFFTooltipStyles = {
        width: nonFederalFundingBarStyle.width
    };

    const propsForObligatedTooltip = buildTooltipProps("obligated", (activeTooltip === "obligated"), showObligatedTooltip);
    const propsForNonFederalFundingTooltip = buildTooltipProps("nonFederalFunding", (activeTooltip === "nonFederalFunding"), showNonFederalFundingTooltip);
    const propsForTotalFundingTooltip = buildTooltipProps("totalFunding", (activeTooltip === "totalFunding"), showTotalFundingTooltip);

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
                <strong>{awardAmounts.totalObligationAbbreviated}</strong><br />Obligated Amount
            </div>
            <div className="award-amounts-viz__label" style={obligatedLabelStyle}>
                <div className="award-amounts-viz__line-up" />
            </div>
            <div className="award-amounts-viz__bar-wrapper">
                <TooltipWrapper {...propsForTotalFundingTooltip} style={{ backgroundColor: totalFundingColor }}>
                    <div className="award-amounts-viz__bar" style={{ backgroundColor: totalFundingColor }}>
                        <TooltipWrapper {...propsForObligatedTooltip} styles={{ width: obligatedBarStyle.width }}>
                            <div className="award-amounts-viz__obligated--grants" style={{ width: generatePercentage(1), backgroundColor: obligatedBarStyle.backgroundColor }} />
                        </TooltipWrapper>
                        {!nonFederalFundingIsZero &&
                            <TooltipWrapper {...propsForNonFederalFundingTooltip} styles={{ ...nonFFTooltipStyles }}>
                                <div className="award-amounts-viz__non-federal-funding" style={{ backgroundColor: nonFederalFundingBarStyle.backgroundColor }} />
                            </TooltipWrapper>
                        }
                    </div>
                </TooltipWrapper>
            </div>
            <div className="award-amounts-viz__label" style={nonFederalFundingLabelStyle}>
                {!nonFederalFundingIsZero > 0 && <div className="award-amounts-viz__line--non-federal-funding" style={{ backgroundColor: nonFederalFundingBarStyle.backgroundColor }} />}
                <div className={`${nonFederalFundingIsZero ? 'award-amounts-viz__desc award-amounts-viz__desc--nff-zero' : 'award-amounts-viz__desc'}`}>
                    {!nonFederalFundingIsZero && (
                        <React.Fragment>
                            <div
                                className="award-amounts-viz__desc-text"
                                role="button"
                                tabIndex="0"
                                onBlur={closeTooltip}
                                onFocus={showNonFederalFundingTooltip}
                                onKeyPress={showNonFederalFundingTooltip}
                                onMouseOver={showNonFederalFundingTooltip}
                                onMouseOut={closeTooltip}
                                onClick={showNonFederalFundingTooltip}>
                                <strong>{awardAmounts.nonFederalFundingAbbreviated}</strong><br />Non-Federal Funding
                            </div>
                            <div className="award-amounts-viz__legend-line" style={{ backgroundColor: "#47AAA7" }} />
                        </React.Fragment>
                    )}
                    {nonFederalFundingIsZero &&
                        <TooltipWrapper {...propsForNonFederalFundingTooltip}>
                            <div className="award-amounts-viz__desc-text" role="button" tabIndex="0">
                                <strong>{awardAmounts.nonFederalFundingAbbreviated}</strong><br />Non-Federal Funding
                            </div>
                            <div className="award-amounts-viz__legend-line" style={{ backgroundColor: "#47AAA7" }} />
                        </TooltipWrapper>
                    }
                </div>
                <div className="award-amounts-viz__legend-line" style={{ backgroundColor: "#47AAA7" }} />
            </div>
            <div className="award-amounts-viz__label">
                <div className="award-amounts-viz__line" style={{ backgroundColor: totalFundingColor }} />
                <div className="award-amounts-viz__desc">
                    <div
                        className="award-amounts-viz__desc-text"
                        role="button"
                        tabIndex="0"
                        onBlur={closeTooltip}
                        onFocus={showTotalFundingTooltip}
                        onKeyPress={showTotalFundingTooltip}
                        onMouseEnter={showTotalFundingTooltip}
                        onMouseLeave={closeTooltip}
                        onClick={showTotalFundingTooltip}>
                        <strong>{awardAmounts.totalFundingAbbreviated}</strong><br />Total Funding
                    </div>
                    <div className="award-amounts-viz__legend-line award-amounts-viz__legend-line_potential" style={{ backgroundColor: totalFundingColor }} />
                </div>
            </div>
        </div>
    );
};

GrantChart.propTypes = propTypes;

export default GrantChart;
