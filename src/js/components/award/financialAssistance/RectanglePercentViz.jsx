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

const shape = PropTypes.shape({
    rawValue: PropTypes.number,
    value: PropTypes.string,
    text: PropTypes.string
});

const tooltipShape = PropTypes.shape({
    offsetAdjustments: PropTypes.object,
    tooltipComponent: PropTypes.element
});

const propTypes = {
    numerator: shape,
    numerator2: shape,
    numerator3: shape,
    denominator: shape,
    percentage: PropTypes.string,
    numeratorTooltipData: tooltipShape,
    numerator2TooltipData: tooltipShape,
    numerator3TooltipData: tooltipShape,
    denominatorTooltipData: tooltipShape,
    numeratorColor: PropTypes.string,
    denominatorColor: PropTypes.string,
    numerator2Color: PropTypes.string,
    numerator3Color: PropTypes.string
};

const emptyTooltipProps = {
    styles: { transform: '' },
    tooltipComponent: <p>Placeholder</p>
};

const RectanglePercentViz = ({
    numerator,
    numerator2 = null,
    numerator3 = null,
    denominator,
    percentage,
    numeratorTooltipData,
    denominatorTooltipData,
    numerator2TooltipData = null,
    numerator3TooltipData = null,
    numeratorColor,
    denominatorColor = `#FFF`,
    numerator2Color = null,
    numerator3Color = null
}) => {
    const [isTooltipVisible, setIsTooltipVisible] = useState(false);
    const [activeTooltipProps, setActiveTooltipProps] = useState(emptyTooltipProps);
    const numeratorIsZero = (numerator.rawValue === 0);
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
                ? generatePercentage(numerator2.rawValue / numerator.rawValue)
                : null
        },
        numerator3: {
            width: numerator3
                ? generatePercentage(numerator3.rawValue / numerator2.rawValue)
                : null
        }
    };

    const showTooltip = (tooltipData, category) => {
        setActiveTooltipProps({
            ...tooltipData,
            wide: false,
            styles: {
                transform: category === 'numerator' && numeratorIsZero
                    ? `translate(calc(${numeratorZeroToolTipPositions.horizontal}px + 15px), ${numeratorZeroToolTipPositions.vertical}px)`
                    : `translate(calc(${absoluteWidths[category].width} + 15px), ${verticalTooltipOffset}px)`
            }
        });
        setIsTooltipVisible(true);
    };

    const numeratorBarAndLabelStyles = {
        ...absoluteWidths.numerator,
        backgroundColor: numeratorColor
    };

    const numeratorValue = percentage ? `${numerator.value} (${numerator.width})` : numerator.value;

    const closeTooltip = () => {
        setIsTooltipVisible(false);
    };

    const showNumeratorTooltip = (e) => {
        e.stopPropagation();
        showTooltip(numeratorTooltipData, "numerator");
    };
    const showDenominatorTooltip = (e) => {
        e.stopPropagation();
        showTooltip(denominatorTooltipData, "denominator");
    };
    const showNumerator2Tooltip = (e) => {
        e.stopPropagation();
        showTooltip(numerator2TooltipData, "numerator2");
    };

    const showNumerator3Tooltip = (e) => {
        e.stopPropagation();
        showTooltip(numerator3TooltipData, "numerator3");
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
            <BarValue
                className="award-amounts-viz__desc-top loans"
                onLeave={closeTooltip}
                onEnter={showNumeratorTooltip}
                number={numeratorValue}
                title={numerator.text} />
            {!numeratorIsZero &&
                <BarLabelAndLine lineClassName="award-amounts-viz__line-up--loans" labelStyles={numeratorBarAndLabelStyles} />
            }
            {isCaresReleased &&
                <>
                    <BarValue
                        spendingCategory="file-c-obligated"
                        className="award-amounts-viz__desc-top file-c-obligated"
                        onLeave={closeTooltip}
                        onEnter={showNumerator2Tooltip}
                        number={numerator2.value}
                        title={numerator2.text} />
                    <BarLabelAndLine
                        spendingCategory="file-c-obligated"
                        lineClassName="award-amounts-viz__line-up"
                        lineStyles={absoluteWidths.numerator2} />
                </>
            }
            <div className="award-amounts-viz__bar-wrapper">
                <Bar
                    spendingCategory="denominator"
                    barWrapperStyles={{ backgroundColor: denominatorColor }}
                    onLeave={closeTooltip}
                    onEnter={showDenominatorTooltip}
                    barStyles={{ backgroundColor: denominatorColor, width: '100%' }}>
                    {!numeratorIsZero && (
                        <Bar
                            spendingCategory="numerator"
                            barWrapperStyles={{ width: numeratorBarAndLabelStyles.width }}
                            onLeave={closeTooltip}
                            onEnter={showNumeratorTooltip}
                            barStyles={{ width: '100%', backgroundColor: numeratorBarAndLabelStyles.backgroundColor }}>
                            {isCaresReleased && numerator2.rawValue > 0 &&
                                <div className="nested-obligations">
                                    <Bar
                                        spendingCategory="file-c-obligated"
                                        barWrapperStyles={relativeWidths.numerator2}
                                        onLeave={closeTooltip}
                                        onEnter={showNumerator2Tooltip}
                                        barStyles={{ width: generatePercentage(1), backgroundColor: numerator2Color }}>
                                        {isNumerator3Defined && numerator3.rawValue > 0 &&
                                            <Bar
                                                spendingCategory="file-c-outlay"
                                                barWrapperStyles={{ width: relativeWidths.numerator3.width, ...numerator3Positioning }}
                                                onLeave={closeTooltip}
                                                onEnter={showNumerator3Tooltip}
                                                barStyles={{ width: generatePercentage(1), backgroundColor: numerator3Color }} />
                                        }
                                    </Bar>
                                </div>
                            }
                        </Bar>
                    )}
                </Bar>
            </div>
            {/* Even if numerator3 is 0, we want to show this so long as numerator2 is defined */}
            {isCaresReleased &&
                <BarLabelAndLine
                    spendingCategory="file-c-outlay"
                    lineStyles={absoluteWidths.numerator3}>
                    <BarValue
                        onLeave={closeTooltip}
                        onEnter={showNumerator3Tooltip}
                        number={numerator3.value}
                        title={numerator3.text} />
                </BarLabelAndLine>
            }
            <BarLabelAndLine
                spendingCategory="denominator"
                lineStyles={{ backgroundColor: denominatorColor }}>
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
