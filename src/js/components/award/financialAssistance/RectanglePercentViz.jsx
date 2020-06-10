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

const flattenArray = (arr) => arr
    .reduce((acc, obj) => {
        if (Object.keys(obj).includes('children')) {
            return [...acc, { ...obj, children: [] }].concat(flattenArray(obj.children));
        }
        return [...acc, obj];
    }, []);

const RectanglePercentViz = ({
    numerator,
    numerator2 = null,
    numerator3 = null,
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
    const numeratorHasGrandChildren = (
        numeratorHasChildren &&
        numerator?.children?.some((grand) => Object.keys(grand).includes('children'))
    );

    const isNumerator2Defined = (numerator2 !== null);
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

    const numerator3Positioning = {
        padding: '0.2rem'
    };

    const renderNestedBars = (data) => {
        const barProps = {
            spendingCategory: data.className,
            barWrapperStyles: {
                width: generatePercentage(data.rawValue / data.denominatorValue)
            },
            onLeave: closeTooltip,
            onEnter: (e) => {
                e.stopPropagation();
                showTooltip(
                    data.tooltipData,
                    // absolute width
                    generatePercentage(data.rawValue / denominator.rawValue)
                );
            },
            barStyles: {
                width: generatePercentage(1),
                backgroundColor: data.color
            }
        };
        if (Object.keys(data).includes('children')) {
            return (
                <Bar {...barProps}>
                    {data.children ? data.children.map((child) => renderNestedBars(child)) : null}
                </Bar>
            );
        }
        return <Bar {...barProps} />;
    };

    const renderLinesAndLabelsForPosition = (arr, position) => flattenArray(arr)
        .filter((child) => child.labelPosition === position)
        .map((child) => {
            if (position === 'top') {
                return (
                    <>
                        <BarValue
                            className={`award-amounts-viz__desc-top ${child.className}`}
                            onLeave={closeTooltip}
                            onEnter={() => showTooltip(child.tooltipData, generatePercentage(child.rawValue / denominator.rawValue))}
                            number={child.value}
                            title={child.text} />
                        <BarLabelAndLine
                            spendingCategory={child.className}
                            lineClassName="award-amounts-viz__line-up"
                            lineStyles={{
                                backgroundColor: child.color,
                                width: generatePercentage(child.rawValue / denominator.rawValue)
                            }} />
                        {Object.keys(child).includes('children') && renderLinesAndLabelsForPosition(child.children, position)}
                    </>
                );
            }
            return (
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
                    {Object.keys(child).includes('children') && renderLinesAndLabelsForPosition(child.children, position)}
                </>
            );
        });

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
            {renderLinesAndLabelsForPosition(numerator.children, 'top')}
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
                                        {numerator.children.map((child) => renderNestedBars(child))}
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
            {numeratorHasChildren && renderLinesAndLabelsForPosition(numerator.children, 'bottom')}
            <BarLabelAndLine
                spendingCategory="numerator"
                lineStyles={{ backgroundColor: numerator.color }}>
                <BarValue
                    spendingCategory="numerator"
                    onLeave={closeTooltip}
                    onEnter={showNumeratorTooltip}
                    number={numerator.value}
                    title={numerator.text} />
            </BarLabelAndLine>
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
