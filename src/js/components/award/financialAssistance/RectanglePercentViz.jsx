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
} from "../shared/awardAmountsSection/charts/SharedBarComponents";

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
    .filter((obj) => obj)
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
    const isCaresReleased = (
        GlobalConstants.CARES_ACT_RELEASED &&
        numeratorHasChildren &&
        flattenArray(numerator?.children).some((obj) => obj?.text?.toLowerCase()?.includes('covid'))
    );

    const classNameForCovid = isCaresReleased ? ' covid' : '';

    const isNumerator2Defined = (numerator2 !== null && numerator2?.rawValue > 0);
    const verticalTooltipOffset = isCaresReleased
        ? 165
        : 90;
    const numeratorZeroToolTipPositions = {
        horizontal: 170,
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

    const nestedBarStyles = {
        padding: '0.2rem'
    };

    const renderNestedBars = (data) => {
        const barProps = {
            spendingCategory: data.className,
            barWrapperStyles: {
                ...nestedBarStyles,
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
        .sort((a, b) => {
            if (a?.labelSortOrder > b?.labelSortOrder) return 1;
            if (b?.labelSortOrder > a?.labelSortOrder) return -1;
            return 0;
        })
        .map((child) => {
            if (Object.keys(child).includes('showTooltip')) return child;
            return {
                ...child,
                showTooltip: () => {
                    const handleOffset = (
                        child?.labelSortOrder > 0 &&
                        child?.labelPostion === 'bottom' &&
                        child.rawValue <= 0
                    );
                    if (handleOffset) {
                        showTooltip(
                            child.tooltipData,
                            `175px`,
                            130
                        );
                    }
                    else if (child.rawValue <= 0) {
                        showTooltip(
                            child.tooltipData,
                            generatePercentage(child.rawValue / denominator.rawValue),
                            60
                        );
                    }
                    else {
                        showTooltip(
                            child.tooltipData,
                            generatePercentage(child.rawValue / denominator.rawValue),
                            verticalTooltipOffset
                        );
                    }
                }
            };
        })
        .map((child) => {
            if (position === 'top') {
                return (
                    <div className={`award-amounts-viz__desc-container ${position}${classNameForCovid}`}>
                        <BarValue
                            spendingCategory={child.className}
                            className={`award-amounts-viz__desc ${position}${classNameForCovid}`}
                            onLeave={closeTooltip}
                            onEnter={() => showTooltip(
                                child.tooltipData,
                                generatePercentage(child.rawValue / denominator.rawValue),
                                verticalTooltipOffset
                            )}
                            number={child.value}
                            title={child.text} />
                        {child.rawValue > 0 &&
                            <BarLabelAndLine
                                spendingCategory={child.className}
                                labelClassName={`award-amounts-viz__label${classNameForCovid}`}
                                lineClassName={`award-amounts-viz__line ${position}${classNameForCovid}`}
                                lineStyles={{
                                    backgroundColor: child.color,
                                    width: generatePercentage(child.rawValue / denominator.rawValue)
                                }} />
                        }
                        {Object.keys(child).includes('children') && renderLinesAndLabelsForPosition(child.children, position)}
                    </div>
                );
            }
            const isBarAbsent = (
                child.rawValue <= 0
            );
            const isLabelNested = (
                isCaresReleased &&
                child?.labelSortOrder > 0
            );
            return (
                <div className={`award-amounts-viz__desc-container ${position}${classNameForCovid}`}>
                    {!isBarAbsent &&
                        <BarLabelAndLine
                            spendingCategory={child.className}
                            labelClassName={`award-amounts-viz__label${classNameForCovid}`}
                            lineClassName={`award-amounts-viz__line ${position}${classNameForCovid}`}
                            lineStyles={{
                                backgroundColor: child.color,
                                width: generatePercentage(child.rawValue / denominator.rawValue)
                            }}>
                            <BarValue
                                spendingCategory={child.className}
                                className={`award-amounts-viz__desc ${position}${classNameForCovid}`}
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
                            className={`award-amounts-viz__desc ${position}${classNameForCovid}`}
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
            {renderLinesAndLabelsForPosition([numerator], 'top')}
            <div className="award-amounts-viz__bar-container">
                <Bar
                    spendingCategory={denominator.className}
                    barWrapperStyles={{ backgroundColor: denominator.color }}
                    onLeave={closeTooltip}
                    onEnter={showDenominatorTooltip}
                    barStyles={{ backgroundColor: denominator.color, width: '100%' }}>
                    {!numeratorIsZero && (
                        <>
                            <Bar
                                spendingCategory={numerator.className}
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
                                    spendingCategory={numerator2.className}
                                    barWrapperStyles={relativeWidths.numerator2}
                                    onLeave={closeTooltip}
                                    onEnter={showNumerator2Tooltip}
                                    barStyles={{ width: generatePercentage(1), backgroundColor: numerator2.color }} />
                            }
                        </>
                    )}
                </Bar>
            </div>
            {numeratorHasChildren && renderLinesAndLabelsForPosition([{ ...numerator, numeratorValue }, numerator2], 'bottom')}
            {!numeratorHasChildren && renderLinesAndLabelsForPosition([numerator2], 'bottom')}
            <div className={`award-amounts-viz__desc-container bottom${classNameForCovid}`}>
                <BarLabelAndLine
                    spendingCategory={denominator.className}
                    labelClassName={`award-amounts-viz__label${classNameForCovid}`}
                    lineClassName={`award-amounts-viz__line${classNameForCovid}`}
                    lineStyles={{ backgroundColor: denominator.color }}>
                    <BarValue
                        className={`award-amounts-viz__desc${classNameForCovid}`}
                        spendingCategory={denominator.className}
                        onLeave={closeTooltip}
                        onEnter={showDenominatorTooltip}
                        number={denominator.value}
                        title={denominator.text} />
                </BarLabelAndLine>
            </div>
        </div>
    );
};

export default RectanglePercentViz;
RectanglePercentViz.propTypes = propTypes;
