/**
 * NormalChart.jsx
 * Created by David Trinh 2/15/19
 **/

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { TooltipWrapper } from "data-transparency-ui";

import GlobalConstants from "GlobalConstants";
import { generatePercentage } from 'helpers/awardAmountHelper';

import { AWARD_AGGREGATED_AMOUNTS_PROPS, TOOLTIP_PROPS } from '../../../../../propTypes/index';
import { getTooltipPropsByAwardTypeAndSpendingCategory } from '../Tooltips';
import {
    Bar,
    BarLabelAndLine,
    BarValue
} from "./SharedComponents";

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

const horizontalTooltipPositionOffset = 10;

const barColorsByCategory = {
    obligated: `#4773aa`,
    nonFederalFunding: '#47AAA7',
    totalFunding: `#FFF`,
    fileCObligated: `#B699C6`,
    fileCOutlay: `#6E338E`
};

const GrantChart = ({ awardAmounts, awardType }) => {
    const [isTooltipVisible, setIsTooltipVisible] = useState(false);
    const [activeTooltipProps, setActiveTooltipProps] = useState(emptyTooltipProps);
    // Rename properties to improve readability of the calculations
    const obligation = awardAmounts._totalObligation;
    const nonFederalFunding = awardAmounts._nonFederalFunding;
    const totalFunding = awardAmounts._totalFunding;
    const fileCOutlay = awardAmounts._fileCOutlay;
    const fileCObligated = awardAmounts._fileCObligated;
    const isFileCOutlayDefined = fileCOutlay > 0;
    const isFileCObligatedDefined = fileCObligated > 0;
    const isCaresReleased = isFileCObligatedDefined && GlobalConstants.CARES_ACT_RELEASED;
    const verticalTooltipOffset = isCaresReleased
        ? 170
        : 90;

    const nonFederalFundingZeroToolTipPositions = {
        horizontal: 175,
        vertical: isCaresReleased
            ? 130
            : 60
    };

    const nonFederalFundingIsZero = (nonFederalFunding === 0);

    const tooltipPositionsByCategory = {
        obligated: generatePercentage(obligation / totalFunding),
        nonFederalFunding: nonFederalFundingIsZero ? '100%' : generatePercentage(1),
        totalFunding: generatePercentage(1),
        fileCObligated: generatePercentage(fileCObligated / totalFunding),
        fileCOutlay: generatePercentage(fileCOutlay / totalFunding)
    };
    const barWidthsByCategory = {
        obligated: generatePercentage(obligation / totalFunding),
        nonFederalFunding: nonFederalFundingIsZero ? '100%' : generatePercentage(nonFederalFunding / totalFunding),
        totalFunding: generatePercentage(1),
        fileCObligated: generatePercentage(fileCObligated / obligation),
        fileCOutlay: generatePercentage(fileCOutlay / fileCObligated)
    };

    const showTooltip = (spendingCategory, type = awardType, data = awardAmounts) => {
        setActiveTooltipProps({
            ...getTooltipPropsByAwardTypeAndSpendingCategory(type, spendingCategory, data),
            wide: false,
            styles: {
                transform: spendingCategory === 'nonFederalFunding' && nonFederalFundingIsZero
                    ? `translate(calc(${nonFederalFundingZeroToolTipPositions.horizontal}px + ${horizontalTooltipPositionOffset}px), calc(${verticalTooltipOffset}px + ${nonFederalFundingZeroToolTipPositions.vertical}px))`
                    : `translate(calc(${tooltipPositionsByCategory[spendingCategory]} + ${horizontalTooltipPositionOffset}px), ${verticalTooltipOffset}px)`
            }
        });
        setIsTooltipVisible(true);
    };


    const closeTooltip = () => {
        setIsTooltipVisible(false);
    };

    const fileCOutlayPositioning = {
        padding: '0.2rem'
    };

    const nonFederalFundingPositioning = {
        width: nonFederalFundingIsZero ? '100%' : generatePercentage(nonFederalFunding / totalFunding),
        left: nonFederalFundingIsZero ? '0' : generatePercentage(obligation / totalFunding),
        position: 'relative'
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

    const showFileCOutlayTooltip = (e) => {
        e.stopPropagation();
        showTooltip("fileCOutlay");
    };
    const showFileCObligatedTooltip = (e) => {
        e.stopPropagation();
        showTooltip("fileCObligated");
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
            <BarValue
                spendingCategory="obligated"
                className="award-amounts-viz__desc-top"
                onLeave={closeTooltip}
                onEnter={showObligatedTooltip}
                number={awardAmounts.totalObligationAbbreviated}
                title="Obligated Amount" />
            <BarLabelAndLine
                labelStyles={{ width: barWidthsByCategory.obligated }}
                lineClassName="award-amounts-viz__line-up" />
            {isCaresReleased &&
                <>
                    <BarValue
                        spendingCategory="file-c-obligated"
                        className="award-amounts-viz__desc-top"
                        onLeave={closeTooltip}
                        onEnter={showFileCObligatedTooltip}
                        number={awardAmounts.fileCObligatedAbbreviated}
                        title="COVID-19 Response Obligations Amount" />
                    <BarLabelAndLine
                        spendingCategory="file-c-obligated"
                        lineClassName="award-amounts-viz__line-up"
                        labelStyles={{ width: tooltipPositionsByCategory.fileCObligated }} />
                </>
            }
            <div className="award-amounts-viz__bar-wrapper">
                <Bar
                    spendingCategory="total-funding"
                    onLeave={closeTooltip}
                    onEnter={showTotalFundingTooltip}
                    barWrapperStyles={{ backgroundColor: barColorsByCategory.totalFunding }}
                    barStyles={{ backgroundColor: barColorsByCategory.totalFunding }}>
                    <Bar
                        spendingCategory="grant-obligated"
                        onLeave={closeTooltip}
                        onEnter={showObligatedTooltip}
                        barWrapperStyles={{ width: barWidthsByCategory.obligated }}
                        barStyles={{ width: generatePercentage(1), backgroundColor: barColorsByCategory.obligated }}>
                        {isCaresReleased &&
                            <div className="nested-obligations">
                                <Bar
                                    spendingCategory="file-c-obligated"
                                    onLeave={closeTooltip}
                                    onEnter={showFileCObligatedTooltip}
                                    barWrapperStyles={{ width: barWidthsByCategory.fileCObligated }}
                                    barStyles={{
                                        width: generatePercentage(1),
                                        backgroundColor: barColorsByCategory.fileCObligated
                                    }}>
                                    {isFileCOutlayDefined &&
                                        <Bar
                                            spendingCategory="file-c-outlay"
                                            onLeave={closeTooltip}
                                            onEnter={showFileCOutlayTooltip}
                                            barWrapperStyles={{ width: barWidthsByCategory.fileCOutlay, ...fileCOutlayPositioning }}
                                            barStyles={{
                                                width: generatePercentage(1),
                                                backgroundColor: barColorsByCategory.fileCOutlay
                                            }} />
                                    }
                                </Bar>
                            </div>
                        }
                    </Bar>
                    {!nonFederalFundingIsZero &&
                        <Bar
                            spendingCategory="non-federal-funding"
                            onLeave={closeTooltip}
                            onEnter={showNonFederalFundingTooltip}
                            barWrapperStyles={{ width: barWidthsByCategory.nonFederalFunding }}
                            barStyles={{
                                width: generatePercentage(1),
                                backgroundColor: barColorsByCategory.nonFederalFunding
                            }} />
                    }
                </Bar>
            </div>
            {/* Even if outlay is 0, we want to show this so long as the obligated is > 0 */}
            {isCaresReleased &&
                <BarLabelAndLine
                    spendingCategory="file-c-outlay"
                    lineStyles={{ width: tooltipPositionsByCategory.fileCOutlay }}>
                    <BarValue
                        spendingCategory="file-c-outlay"
                        onEnter={showFileCOutlayTooltip}
                        onLeave={closeTooltip}
                        title="COVID-19 Response Outlay Amount"
                        number={awardAmounts.fileCOutlayAbbreviated} />
                </BarLabelAndLine>
            }
            <BarLabelAndLine
                spendingCategory="non-federal-funding"
                labelStyles={{ width: barWidthsByCategory.nonFederalFunding, ...nonFederalFundingPositioning }}
                lineClassName="award-amounts-viz__line--non-federal-funding"
                lineStyles={{
                    display: nonFederalFundingIsZero ? 'none' : 'block',
                    backgroundColor: barColorsByCategory.nonFederalFunding
                }}>
                <BarValue
                    spendingCategory="non-federal-funding"
                    className={nonFederalFundingIsZero ? 'award-amounts-viz__desc award-amounts-viz__desc--nff-zero' : 'award-amounts-viz__desc'}
                    onEnter={showNonFederalFundingTooltip}
                    onLeave={closeTooltip}
                    title="Non-Federal Funding"
                    number={awardAmounts.nonFederalFundingAbbreviated}/>
            </BarLabelAndLine>
            <BarLabelAndLine
                spendingCategory="total-funding"
                labelStyles={{ width: barWidthsByCategory.totalFunding }}
                lineStyle={{ backgroundColor: barColorsByCategory.totalFunding }}>
                <BarValue
                    spendingCategory="total-funding"
                    onEnter={showTotalFundingTooltip}
                    onLeave={closeTooltip}
                    title="Total Funding"
                    number={awardAmounts.totalFundingAbbreviated} />
            </BarLabelAndLine>
        </div>
    );
};

GrantChart.propTypes = propTypes;

export default GrantChart;
