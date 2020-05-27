/**
 * NormalChart.jsx
 * Created by David Trinh 2/15/19
 **/

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { TooltipWrapper } from "data-transparency-ui";

import { generatePercentage } from 'helpers/awardAmountHelper';

import { AWARD_AGGREGATED_AMOUNTS_PROPS, TOOLTIP_PROPS } from '../../../../../propTypes/index';
import { getTooltipPropsByAwardTypeAndSpendingCategory } from '../Tooltips';


const propTypes = {
    awardType: PropTypes.string,
    awardAmounts: AWARD_AGGREGATED_AMOUNTS_PROPS,
    obligatedTooltipProps: TOOLTIP_PROPS,
    nonFederalFundingTooltipProps: TOOLTIP_PROPS,
    totalFundingTooltipProps: TOOLTIP_PROPS
};

const emptyTooltipProps = {
    styles: { transform: '' },
    tooltipComponent: <p>Placeholder</p>
};

const GrantChart = ({ awardAmounts, awardType }) => {
    const [isTooltipVisible, setIsTooltipVisible] = useState(false);
    const [activeTooltipProps, setActiveTooltipProps] = useState(emptyTooltipProps);

    // Rename properties to improve readability of the calculations
    const obligation = awardAmounts._totalObligation;
    const nonFederalFunding = awardAmounts._nonFederalFunding;
    const totalFunding = awardAmounts._totalFunding;

    const nonFederalFundingIsZero = (nonFederalFunding === 0);

    const widths = {
        obligated: generatePercentage(obligation / totalFunding),
        nonFederalFunding: nonFederalFundingIsZero ? '100%' : generatePercentage(nonFederalFunding / totalFunding),
        totalFunding: generatePercentage(1)
    };

    const showTooltip = (spendingCategory, type = awardType, data = awardAmounts) => {
        setActiveTooltipProps({
            ...getTooltipPropsByAwardTypeAndSpendingCategory(type, spendingCategory, data),
            wide: false,
            styles: {
                transform: `translate(calc(${widths[spendingCategory]} + 15px), 90px)`
            }
        });
        setIsTooltipVisible(true);
    };


    const closeTooltip = () => {
        setIsTooltipVisible(false);
    };

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

    const showObligatedTooltip = (e) => {
        e.stopPropagation();
        showTooltip("obligated");
    };
    const showNonFederalFundingTooltip = (e) => {
        e.stopPropagation();
        showTooltip("nonFederalFunding");
    };
    const showTotalFundingTooltip = (e) => {
        e.stopPropagation();
        showTooltip("totalFunding");
    };

    return (
        <div className="award-amounts-viz">
            {isTooltipVisible && <TooltipWrapper
                className="award-section-tt"
                onMouseMoveTooltip={setIsTooltipVisible.bind(null, true)}
                onMouseLeaveTooltip={setIsTooltipVisible.bind(null, false)}
                controlledProps={{
                    isControlled: true,
                    isVisible: true
                }}
                {...activeTooltipProps} />}
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
                <div
                    className="total-funding"
                    role="button"
                    tabIndex="0"
                    onBlur={closeTooltip}
                    onFocus={showTotalFundingTooltip}
                    onKeyPress={showTotalFundingTooltip}
                    onMouseEnter={showTotalFundingTooltip}
                    onMouseLeave={closeTooltip}
                    onClick={showTotalFundingTooltip}
                    style={{ backgroundColor: totalFundingColor }}>
                    <div
                        className="award-amounts-viz__bar"
                        style={{ backgroundColor: totalFundingColor }}>
                        <div
                            role="button"
                            tabIndex="0"
                            onBlur={closeTooltip}
                            onFocus={showObligatedTooltip}
                            onKeyPress={showObligatedTooltip}
                            onMouseEnter={showObligatedTooltip}
                            onMouseLeave={closeTooltip}
                            onClick={showObligatedTooltip}
                            className="grant-obligated"
                            style={{ width: obligatedBarStyle.width }}>
                            <div
                                className="award-amounts-viz__bar grant-obligated"
                                style={{ width: generatePercentage(1), backgroundColor: obligatedBarStyle.backgroundColor }} />
                        </div>
                        {!nonFederalFundingIsZero &&
                            <div
                                role="button"
                                tabIndex="0"
                                onBlur={closeTooltip}
                                onFocus={showNonFederalFundingTooltip}
                                onKeyPress={showNonFederalFundingTooltip}
                                onMouseEnter={showNonFederalFundingTooltip}
                                onMouseLeave={closeTooltip}
                                onClick={showNonFederalFundingTooltip}
                                className="non-federal-funding"
                                style={nonFFTooltipStyles}>
                                <div
                                    className="award-amounts-viz__bar non-federal-funding"
                                    style={{ backgroundColor: nonFederalFundingBarStyle.backgroundColor }} />
                            </div>
                        }
                    </div>
                </div>
            </div>
            <div className="award-amounts-viz__label" style={nonFederalFundingLabelStyle}>
                {!nonFederalFundingIsZero && (
                    <div
                        className="award-amounts-viz__line--non-federal-funding"
                        style={{ backgroundColor: nonFederalFundingBarStyle.backgroundColor }} />
                )}
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
                        <div
                            className="award-amounts-viz__desc-text-nff-zero"
                            role="button"
                            tabIndex="0"
                            onBlur={closeTooltip}
                            onFocus={showNonFederalFundingTooltip}
                            onKeyPress={showNonFederalFundingTooltip}
                            onMouseOver={showNonFederalFundingTooltip}
                            onMouseOut={closeTooltip}
                            onClick={showNonFederalFundingTooltip}>
                            <div className="award-amounts-viz__desc-text" role="button" tabIndex="0">
                                <strong>{awardAmounts.nonFederalFundingAbbreviated}</strong><br />Non-Federal Funding
                            </div>
                            <div className="award-amounts-viz__legend-line" style={{ backgroundColor: "#47AAA7" }} />
                        </div>
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
