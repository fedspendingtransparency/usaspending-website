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

const verticalTooltipPosition = 90;
const horiztonalTooltipPositionOffset = 10;

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
        fileCOutlay: generatePercentage(fileCOutlay / obligation)
    };

    const showTooltip = (spendingCategory, type = awardType, data = awardAmounts) => {
        setActiveTooltipProps({
            ...getTooltipPropsByAwardTypeAndSpendingCategory(type, spendingCategory, data),
            wide: false,
            styles: {
                // TODO: handle when non federal funding is zero.
                transform: `translate(calc(${tooltipPositionsByCategory[spendingCategory]} + ${horiztonalTooltipPositionOffset}px), ${verticalTooltipPosition}px)`
            }
        });
        setIsTooltipVisible(true);
    };


    const closeTooltip = () => {
        setIsTooltipVisible(false);
    };

    const fileCOutlayPositioning = {
        position: 'relative',
        right: barWidthsByCategory.fileCObligated,
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
            <div className="award-amounts-viz__label" style={{ width: barWidthsByCategory.obligated }}>
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
                    style={{ backgroundColor: barColorsByCategory.totalFunding }}>
                    <div
                        className="award-amounts-viz__bar"
                        style={{ backgroundColor: barColorsByCategory.totalFunding }}>
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
                            style={{ width: barWidthsByCategory.obligated }}>
                            <div
                                className="award-amounts-viz__bar grant-obligated"
                                style={{ width: generatePercentage(1), backgroundColor: barColorsByCategory.obligated }} >
                                <div className="nested-obligations">
                                    <div
                                        className="file-c-obligated"
                                        style={{ width: barWidthsByCategory.fileCObligated }}
                                        role="button"
                                        tabIndex="0"
                                        onBlur={closeTooltip}
                                        onFocus={showFileCObligatedTooltip}
                                        onKeyPress={showFileCObligatedTooltip}
                                        onMouseEnter={showFileCObligatedTooltip}
                                        onMouseLeave={closeTooltip}
                                        onClick={showFileCObligatedTooltip}>
                                        <div
                                            className="award-amounts-viz__bar file-c-obligated"
                                            style={{ width: generatePercentage(1), backgroundColor: barColorsByCategory.fileCObligated }} />
                                    </div>
                                    <div
                                        className="file-c-outlay"
                                        style={{ width: barWidthsByCategory.fileCOutlay, ...fileCOutlayPositioning }}
                                        role="button"
                                        tabIndex="0"
                                        onBlur={closeTooltip}
                                        onFocus={showFileCOutlayTooltip}
                                        onKeyPress={showFileCOutlayTooltip}
                                        onMouseEnter={showFileCOutlayTooltip}
                                        onMouseLeave={closeTooltip}
                                        onClick={showFileCOutlayTooltip}>
                                        <div
                                            className="award-amounts-viz__bar file-c-outlay"
                                            style={{ width: generatePercentage(1), backgroundColor: barColorsByCategory.fileCOutlay }} />
                                    </div>
                                </div>
                            </div>
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
                                style={{ width: barWidthsByCategory.nonFederalFunding }}>
                                <div
                                    className="award-amounts-viz__bar non-federal-funding"
                                    style={{ backgroundColor: barColorsByCategory.nonFederalFunding }} />
                            </div>
                        }
                    </div>
                </div>
            </div>
            <div className="award-amounts-viz__label" style={{ width: barWidthsByCategory.nonFederalFunding, ...nonFederalFundingPositioning }}>
                {!nonFederalFundingIsZero && (
                    <div
                        className="award-amounts-viz__line--non-federal-funding"
                        style={{ backgroundColor: barColorsByCategory.nonFederalFunding }} />
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
                            <div className="award-amounts-viz__legend-line" style={{ backgroundColor: barColorsByCategory.nonFederalFunding }} />
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
                            <div className="award-amounts-viz__legend-line" style={{ backgroundColor: barColorsByCategory.nonFederalFunding }} />
                        </div>
                    }
                </div>
                <div className="award-amounts-viz__legend-line" style={{ backgroundColor: barColorsByCategory.nonFederalFunding }} />
            </div>
            <div className="award-amounts-viz__label">
                <div className="award-amounts-viz__line" style={{ backgroundColor: barColorsByCategory.totalFunding }} />
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
                    <div className="award-amounts-viz__legend-line award-amounts-viz__legend-line_potential" style={{ backgroundColor: barColorsByCategory.totalFunding }} />
                </div>
            </div>
        </div>
    );
};

GrantChart.propTypes = propTypes;

export default GrantChart;
