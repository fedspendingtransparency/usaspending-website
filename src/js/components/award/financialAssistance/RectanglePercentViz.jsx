/**
 * LoanChart -> RectanglePercentViz.jsx
 * Created by Maxwell Kendall 9/16/19
 **/

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { TooltipWrapper } from "data-transparency-ui";

import GlobalConstants from "GlobalConstants";
import { generatePercentage } from 'helpers/awardAmountHelper';
import {
    Bar,
    BarLabelAndLine,
    BarValue
} from "../shared/awardAmountsSection/charts/SharedComponents";

const tooltipShape = PropTypes.shape({
    offsetAdjustments: PropTypes.object,
    tooltipComponent: PropTypes.element
});

const BarVizData = PropTypes.shape({
    rawValue: PropTypes.number.isRequired,
    value: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    tooltipData: tooltipShape,
    children: PropTypes.arrayOf(PropTypes.shape({
        rawValue: PropTypes.number.isRequired,
        value: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
        color: PropTypes.string,
        tooltipData: PropTypes.tooltipShape
    }))
});

const propTypes = {
    numerator: BarVizData,
    numerator2: BarVizData,
    numerator3: BarVizData,
    numerator4: BarVizData,
    numerator5: BarVizData,
    denominator: BarVizData,
    percentage: PropTypes.string
};

const emptyTooltipProps = {
    styles: { transform: '' },
    tooltipComponent: <p>Placeholder</p>
};

const RectanglePercentViz = ({
    numerator,
    numerator2 = null,
    numerator3 = null,
    numerator4 = null,
    numerator5 = null,
    denominator,
    percentage
}) => {
    const [isTooltipVisible, setIsTooltipVisible] = useState(false);
    const [activeTooltipProps, setActiveTooltipProps] = useState(emptyTooltipProps);
    const numeratorIsZero = (numerator.rawValue === 0);
    const numeratorHasChildren = (
        Object.keys(numerator).includes('children') &&
        numerator?.children.length > 0
    );

    const numeratorHasMultipleChildren = (
        numeratorHasChildren &&
        numerator?.children?.length > 1
    );
    const isNumerator2Defined = (numerator2 !== null);
    const isNumerator3Defined = (numerator3 !== null);
    const isCaresReleased = isNumerator2Defined && GlobalConstants.CARES_ACT_RELEASED;
    const verticalTooltipOffset = isCaresReleased
        ? 170
        : 90;
    const numeratorZeroToolTipPositions = {
        horizontal: 175,
        vertical: 10
    };

    const absoluteWidths = {
        denominator: {
            width: generatePercentage(1)
        },
        numerator: {
            width: percentage || generatePercentage(numerator.rawValue / denominator.rawValue)
        },
        numerator2: {
            width: numerator2
                ? generatePercentage(numerator2.rawValue / denominator.rawValue)
                : null
        },
        numerator3: {
            width: numerator3
                ? generatePercentage(numerator3.rawValue / denominator.rawValue)
                : null
        }
    };

    const relativeWidths = {
        numerator2: {
            width: numerator2
                ? generatePercentage(numerator2.rawValue / denominator.rawValue)
                : null
        },
        numerator3: {
            width: numerator3
                ? generatePercentage(numerator3.rawValue / numerator2.rawValue)
                : null
        }
    };

    const showTooltip = (tooltipData, tooltipWidthPercent, tooltipVerticalPosition = verticalTooltipOffset) => {
        setActiveTooltipProps({
            ...tooltipData,
            wide: false,
            styles: {
                transform: `translate(calc(${tooltipWidthPercent} + 15px), ${tooltipVerticalPosition}px)`
            }
        });
        setIsTooltipVisible(true);
    };

    const numeratorBarAndLabelStyles = {
        ...absoluteWidths.numerator,
        backgroundColor: numerator.color
    };

    const numeratorValue = percentage ? `${numerator.value} (${numerator.width})` : numerator.value;

    const closeTooltip = () => {
        setIsTooltipVisible(false);
    };

    const showNumeratorTooltip = (e) => {
        e.stopPropagation();
        const width = numerator.rawValue > 0
            ? absoluteWidths.numerator.width
            : numeratorZeroToolTipPositions.horizontal;
        const height = numerator.rawValue > 0
            ? verticalTooltipOffset
            : numeratorZeroToolTipPositions.vertical;
        showTooltip(numerator.tooltipData, width, height);
    };
    const showDenominatorTooltip = (e) => {
        e.stopPropagation();
        showTooltip(denominator.tooltipData, absoluteWidths.denominator.width);
    };
    const showNumerator2Tooltip = (e) => {
        e.stopPropagation();
        showTooltip(numerator2.tooltipData, absoluteWidths.numerator2.width);
    };

    const showNumerator3Tooltip = (e) => {
        e.stopPropagation();
        showTooltip(numerator3.tooltipData, absoluteWidths.numerator3.width);
    };

    const showNumerator4Tooltip = (e) => {
        e.stopPropagation();
        showTooltip(numerator3.tooltipData, absoluteWidths.numerator3.width);
    };

    const numerator3Positioning = {
        padding: '0.2rem'
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
            {numeratorHasChildren &&
                [numerator.children[0]].map((firstChildOnly) => (
                    <>
                        <BarValue
                            className={`award-amounts-viz__desc-top ${firstChildOnly.className}`}
                            onLeave={closeTooltip}
                            onEnter={() => showTooltip(firstChildOnly.tooltipData, generatePercentage(firstChildOnly.rawValue / denominator.rawValue))}
                            number={firstChildOnly.value}
                            title={firstChildOnly.text} />
                        <BarLabelAndLine
                            spendingCategory={firstChildOnly.className}
                            lineClassName="award-amounts-viz__line-up"
                            lineStyles={{
                                backgroundColor: firstChildOnly.color,
                                width: generatePercentage(firstChildOnly.rawValue / denominator.rawValue)
                            }} />
                    </>
                ))
            }
            {!numeratorHasChildren &&
                <>
                    <BarValue
                        className={`award-amounts-viz__desc-top loans ${numerator.className}`}
                        onLeave={closeTooltip}
                        onEnter={showNumeratorTooltip}
                        number={numeratorValue}
                        title={numerator.text}>
                        {/* when we have overspending:
                        <>
                            <BarValue
                                className="award-amounts-viz__desc-top loans"
                                onLeave={closeTooltip}
                                onEnter={() => showTooltip(firstChildOnly.tooltipData, generatePercentage(firstChildOnly.rawValue / denominator.rawValue))}
                                number={firstChildOnly.value}
                                title={numerator.text} />
                            <BarLabelAndLine
                                spendingCategory="file-c-obligated"
                                lineClassName="award-amounts-viz__line-up"
                                lineStyles={{ width: generatePercentage(firstChildOnly.rawValue / denominator.rawValue) }} />
                        </> */}
                    </BarValue>
                    {!numeratorIsZero &&
                        <BarLabelAndLine lineClassName="award-amounts-viz__line-up--loans" labelStyles={numeratorBarAndLabelStyles} />
                    }
                </>
            }
            <div className="award-amounts-viz__bar-wrapper">
                <Bar
                    spendingCategory="denominator"
                    barWrapperStyles={{ backgroundColor: denominator.color }}
                    onLeave={closeTooltip}
                    onEnter={showDenominatorTooltip}
                    barStyles={{ backgroundColor: denominator.color, width: '100%' }}>
                    {!numeratorIsZero && (
                        <>
                            <Bar
                                spendingCategory="numerator"
                                barWrapperStyles={{ width: numeratorBarAndLabelStyles.width }}
                                onLeave={closeTooltip}
                                onEnter={showNumeratorTooltip}
                                barStyles={{ width: '100%', backgroundColor: numeratorBarAndLabelStyles.backgroundColor }}>
                                {numeratorHasChildren &&
                                    <div className="nested-obligations">
                                        <Bar
                                            spendingCategory={numerator.children[0].className}
                                            barWrapperStyles={{
                                                // relative width
                                                width: generatePercentage(numerator.children[0].rawValue / numerator.rawValue)
                                            }}
                                            onLeave={closeTooltip}
                                            onEnter={(e) => {
                                                e.stopPropagation();
                                                showTooltip(
                                                    numerator.children[0].tooltipData,
                                                    generatePercentage(numerator.children[0].rawValue / denominator.rawValue)
                                                );
                                            }}
                                            barStyles={{
                                                width: generatePercentage(1),
                                                backgroundColor: numerator.children[0].color
                                            }}>
                                            {numeratorHasMultipleChildren &&
                                                <Bar
                                                    spendingCategory={numerator.children[1].className}
                                                    barWrapperStyles={{
                                                        // relative width
                                                        width: generatePercentage(numerator.children[1].rawValue / numerator.rawValue),
                                                        ...numerator3Positioning
                                                    }}
                                                    onLeave={closeTooltip}
                                                    onEnter={() => showTooltip(
                                                        numerator.children[1].tooltipData,
                                                        generatePercentage(numerator.children[1].rawValue / denominator.rawValue)
                                                    )}
                                                    barStyles={{
                                                        width: generatePercentage(1),
                                                        backgroundColor: numerator.children[1].color
                                                    }} />
                                            }
                                        </Bar>
                                    </div>
                                }
                            </Bar>
                            {isNumerator2Defined &&
                                <Bar
                                    spendingCategory="numerator2"
                                    barWrapperStyles={relativeWidths.numerator2}
                                    onLeave={closeTooltip}
                                    onEnter={showNumerator2Tooltip}
                                    barStyles={{ width: generatePercentage(1), backgroundColor: numerator2.color }} />
                            }
                        </>
                    )}
                </Bar>
            </div>
            {numeratorHasChildren && !numeratorHasMultipleChildren &&
                <BarLabelAndLine
                    spendingCategory={numerator.className}
                    lineStyles={{ backgroundColor: numeratorBarAndLabelStyles.backgroundColor }}
                    labelStyles={absoluteWidths.numerator}>
                    <BarValue
                        onLeave={closeTooltip}
                        onEnter={showNumeratorTooltip}
                        number={numerator.value}
                        title={numerator.text} />
                </BarLabelAndLine>
            }
            {/* Even if numerator3 is 0, we want to show this so long as numerator2 is defined */}
            {numeratorHasMultipleChildren &&
                numerator.children.slice(1).map((child) => (
                    <>
                        <BarLabelAndLine
                            spendingCategory={child.className}
                            lineStyles={{ width: generatePercentage(child.rawValue / denominator.rawValue) }}>
                            <BarValue
                                onLeave={closeTooltip}
                                onEnter={() => showTooltip(
                                    child.tooltipData,
                                    generatePercentage(child.rawValue / denominator.rawValue)
                                )}
                                number={child.value}
                                title={child.text} />
                        </BarLabelAndLine>
                    </>
                ))
            }
            <BarLabelAndLine
                spendingCategory="denominator"
                lineStyles={{ backgroundColor: denominator.color }}>
                <BarValue
                    spendingCategory="denominator"
                    onLeave={closeTooltip}
                    onEnter={showDenominatorTooltip}
                    number={denominator.value}
                    title={denominator.text} />
            </BarLabelAndLine>
        </div>
    );
};

export default RectanglePercentViz;
RectanglePercentViz.propTypes = propTypes;
