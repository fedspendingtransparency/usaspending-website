/**
 * LoanChart -> RectanglePercentViz.jsx
 * Created by Maxwell Kendall 9/16/19
 **/

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { TooltipWrapper } from "data-transparency-ui";

import { generatePercentage } from 'helpers/awardAmountHelper';
import {
    Bar,
    BarLabelAndLine,
    BarValue
} from "./SharedBarComponents";

const tooltipShape = PropTypes.shape({
    offsetAdjustments: PropTypes.object,
    tooltipComponent: PropTypes.element
});

const BarVizData = PropTypes.shape({
    rawValue: PropTypes.number.isRequired,
    value: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    color: PropTypes.string,
    improper: PropTypes.object,
    isImproper: PropTypes.bool,
    labelSortOrder: PropTypes.number,
    labelPosition: PropTypes.string,
    denominatorValue: PropTypes.number,
    barWidthOverrides: PropTypes.shape({
        rawValue: PropTypes.number,
        denominatorValue: PropTypes.number
    }),
    tooltipData: tooltipShape,
    children: PropTypes.arrayOf(PropTypes.shape({
        rawValue: PropTypes.number.isRequired,
        value: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
        color: PropTypes.string,
        tooltipData: PropTypes.tooltipShape
    }))
});

// TODO:
// This Component shouldn't take static objects, it should be an array of objects. Don't have time to keep refactoring this at the moment.

const propTypes = {
    numerator: BarVizData,
    numerator2: BarVizData,
    numerator3: BarVizData,
    denominator: BarVizData,
    percentage: PropTypes.string
};

const emptyTooltipProps = {
    styles: { transform: '' },
    tooltipComponent: <p>Placeholder</p>
};

// flattenArray takes an array of objects which possibly have arrays in their key 'children'
const flattenArray = (arr) => arr
    .filter((obj) => obj)
    .reduce((acc, obj) => {
        if (Object.keys(obj).includes('children')) {
            return [...acc, { ...obj, children: [] }].concat(flattenArray(obj.children));
        }
        return [...acc, obj];
    }, []);

const numeratorZeroToolTipPositions = {
    horizontal: 170,
    vertical: 10
};

const nestedBarStyles = {
    padding: '0.2rem'
};

const RectanglePercentViz = ({
    numerator,
    numerator2 = null,
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
    const isCaresReleased = (
        numeratorHasChildren &&
        flattenArray(numerator?.children).some((obj) => obj?.text?.toLowerCase()?.includes('covid'))
    );

    const isNumerator2Defined = (numerator2 !== null && numerator2?.rawValue > 0);

    const verticalTooltipOffset = isCaresReleased
        ? 165
        : 90;

    const showTooltip = (
        tooltipData,
        tooltipWidthValue,
        tooltipVerticalPosition = verticalTooltipOffset) => {
        setActiveTooltipProps({
            ...tooltipData,
            wide: false,
            styles: {
                transform: `translate(calc(${tooltipWidthValue} + 15px), ${tooltipVerticalPosition}px)`
            }
        });
        setIsTooltipVisible(true);
    };

    const numeratorValue = percentage ? `${numerator.value} (${numerator.width})` : numerator.value;

    const closeTooltip = () => {
        setIsTooltipVisible(false);
    };

    const showNumeratorTooltip = () => {
        const width = numerator.rawValue > 0
            ? generatePercentage(numerator.rawValue / denominator.rawValue)
            : numeratorZeroToolTipPositions.horizontal;
        const height = numerator.rawValue > 0
            ? verticalTooltipOffset
            : numeratorZeroToolTipPositions.vertical;
        showTooltip(numerator.tooltipData, width, height);
    };

    const showDenominatorTooltip = () => {
        showTooltip(denominator.tooltipData, '100%');
    };

    const renderBarVisualization = (data, isNested = false) => {
        if (data.improper && data.children) return data.children.map((child) => renderBarVisualization(child));
        // we dont render a bar using the improper object, just the label.
        if (data.improper) return null;
        if (data.rawValue <= 0 || data?.barWidthOverrides?.rawValue <= 0) return null;
        const barProps = {
            spendingCategory: `${data.className}`,
            barWrapperStyles: {
                padding: (data.isImproper || !isNested) ? '0' : nestedBarStyles.padding,
                width: data.barWidthOverrides
                    ? generatePercentage(data.barWidthOverrides.rawValue / data.barWidthOverrides.denominatorValue)
                    : generatePercentage(data.rawValue / data.denominatorValue)
            },
            onEnter: () => {
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
                    {data.children ? data.children.map((child) => renderBarVisualization(child, true)) : null}
                </Bar>
            );
        }
        return <Bar {...barProps} />;
    };

    const renderLinesAndLabelsForPosition = (arr, position) => flattenArray(arr)
        .filter((child) => child.labelPosition === position)
        .sort((a, b) => {
            if (a?.labelSortOrder > b?.labelSortOrder) return 1;
            if (b?.labelSortOrder > a?.labelSortOrder) return -1;
            return 0;
        })
        .map((child) => {
            if (position === 'top') {
                return (
                    <div className={`award-amounts-viz__desc-container ${position}`}>
                        {child?.improper &&
                        <div className="improper">
                            <BarValue
                                spendingCategory={child.className}
                                className={`award-amounts-viz__desc ${position}`}
                                onLeave={closeTooltip}
                                onEnter={() => showTooltip(
                                    child.tooltipData,
                                    generatePercentage(child.rawValue / denominator.rawValue),
                                    verticalTooltipOffset
                                )}
                                number={child.value}
                                title={child.text} />
                            <BarValue
                                spendingCategory={child.improper.className}
                                className={`award-amounts-viz__desc ${position}`}
                                onLeave={closeTooltip}
                                onEnter={() => showTooltip(
                                    child.improper.tooltipData,
                                    generatePercentage(child.improper.rawValue / denominator.rawValue),
                                    verticalTooltipOffset
                                )}
                                number={child.improper.value}
                                title={child.improper.text} />
                        </div>
                        }
                        {!child.improper &&
                        <BarValue
                            spendingCategory={child.className}
                            className={`award-amounts-viz__desc ${position}`}
                            onLeave={closeTooltip}
                            onEnter={() => showTooltip(
                                child.tooltipData,
                                generatePercentage(child.rawValue / denominator.rawValue),
                                verticalTooltipOffset
                            )}
                            number={child.value}
                            title={child.text} />}
                        {child.rawValue > 0 &&
                        <BarLabelAndLine
                            spendingCategory={child.className}
                            labelClassName="award-amounts-viz__label"
                            lineClassName={`award-amounts-viz__line ${position}`}
                            lineStyles={{
                                backgroundColor: child.color,
                                width: `calc(${generatePercentage(child.rawValue / denominator.rawValue)} - ${child.lineOffset}px)`
                            }} />
                        }
                        {Object.keys(child).includes('children') && renderLinesAndLabelsForPosition(child.children, position)}
                    </div>
                );
            }
            const isBarAbsent = (
                (child.rawValue <= 0) ||
                (
                    child?.barWidthOverrides?.rawValue <= 0 &&
                    child?.barWidthOverrides?.applyToLine
                )
            );
            const isLabelNested = (
                isCaresReleased &&
                child?.labelSortOrder > 0
            );

            return (
                <div className={`award-amounts-viz__desc-container ${position}`}>
                    {!isBarAbsent &&
                    <BarLabelAndLine
                        spendingCategory={child.className}
                        labelClassName="award-amounts-viz__label"
                        lineClassName={`award-amounts-viz__line ${position}`}
                        lineStyles={{
                            backgroundColor: child.color,
                            width: child?.barWidthOverrides?.applyToLine
                                ? `calc(${generatePercentage(child.barWidthOverrides.rawValue / child.barWidthOverrides.denominatorValue)} - ${child.lineOffset}px)`
                                : `calc(${generatePercentage(child.rawValue / denominator.rawValue)} - ${child.lineOffset}px)`
                        }}>
                        <BarValue
                            spendingCategory={child.className}
                            style={{
                                width: child.labelSortOrder === 0
                                    ? '100%'
                                    : `calc(${generatePercentage(child.rawValue / denominator.rawValue)})`
                            }}
                            className={`award-amounts-viz__desc ${position}`}
                            onLeave={closeTooltip}
                            onEnter={(e) => {
                                e.stopPropagation();
                                showTooltip(
                                    child.tooltipData,
                                    // absolute width
                                    generatePercentage(child.rawValue / denominator.rawValue)
                                );
                            }}
                            number={child.value}
                            title={child.text} />
                    </BarLabelAndLine>
                    }
                    {isBarAbsent &&
                    <BarValue
                        spendingCategory={child.className}
                        className={`award-amounts-viz__desc ${position}`}
                        onLeave={closeTooltip}
                        onEnter={(e) => {
                            e.stopPropagation();
                            if (isLabelNested) {
                                showTooltip(
                                    child.tooltipData,
                                    `175px`,
                                    300
                                );
                            }
                            // when outlays are zero.
                            else if (child.text.toLowerCase().includes('covid')) {
                                showTooltip(
                                    child.tooltipData,
                                    `275px`,
                                    245
                                );
                            }
                            else {
                                showTooltip(
                                    child.tooltipData,
                                    `175px`,
                                    145
                                );
                            }
                        }}
                        number={child.value}
                        title={child.text} />
                    }
                    {Object.keys(child).includes('children') && renderLinesAndLabelsForPosition(child.children, position)}
                </div>
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
            {renderLinesAndLabelsForPosition([denominator, numerator, numerator2], 'top')}
            <div className={`award-amounts-viz__bar-container ${denominator.className}`}>
                <Bar
                    spendingCategory={denominator.className}
                    barWrapperStyles={{ backgroundColor: denominator.color }}
                    onLeave={closeTooltip}
                    onEnter={showDenominatorTooltip}
                    barStyles={{ backgroundColor: denominator.color, width: '100%' }}>
                    {!numeratorIsZero && (
                        <>
                            <Bar
                                spendingCategory={`${numerator.improper ? numerator.improper.className : numerator.className}`}
                                barWrapperStyles={{ width: generatePercentage(numerator.rawValue / denominator.rawValue) }}
                                onMouseMove={showNumeratorTooltip}
                                onEnter={showNumeratorTooltip}
                                barStyles={{ width: '100%', backgroundColor: numerator.color }}>
                                {numeratorHasChildren &&
                                    <div className="nested-obligations">
                                        {numerator.children.map((child) => renderBarVisualization(child, true))}
                                    </div>
                                }
                            </Bar>
                            {isNumerator2Defined && renderBarVisualization(numerator2)}
                        </>
                    )}
                </Bar>
            </div>
            {renderLinesAndLabelsForPosition([denominator, { ...numerator, numeratorValue }, numerator2], 'bottom')}
        </div>
    );
};

export default RectanglePercentViz;
RectanglePercentViz.propTypes = propTypes;
