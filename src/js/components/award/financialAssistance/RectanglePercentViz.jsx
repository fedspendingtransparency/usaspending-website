/**
 * LoanChart -> RectanglePercentViz.jsx
 * Created by Maxwell Kendall 9/16/19
 **/

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { TooltipWrapper } from "data-transparency-ui";

import GlobalConstants from "GlobalConstants";
import { generatePercentage } from 'helpers/awardAmountHelper';

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
    const isCaresReleased = isNumerator2Defined && GlobalConstants.DEV;
    const verticalTooltipOffset = isCaresReleased
        ? 170
        : 90;

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
        ...absoluteWidths,
        numerator2: {
            width: numerator2
                ? generatePercentage(numerator2.rawValue / numerator.rawValue)
                : null
        },
        numerator3: {
            width: numerator3
                ? generatePercentage(numerator3.rawValue / numerator.rawValue)
                : null
        }
    };

    const showTooltip = (tooltipData, category) => {
        setActiveTooltipProps({
            ...tooltipData,
            wide: false,
            styles: {
                transform: `translate(calc(${absoluteWidths[category].width} + 15px), ${verticalTooltipOffset}px)`
            }
        });
        setIsTooltipVisible(true);
    };

    const numeratorBarAndLabelStyles = {
        ...absoluteWidths.numerator,
        backgroundColor: numeratorColor
    };

    const numeratorValue = percentage ? `${numerator.value} (${numerator.width})` : numerator.value;

    const closeTooltip = (e) => {
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
        position: 'relative',
        right: relativeWidths.numerator2.width,
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
            {!numeratorIsZero && <>
                <div
                    className="award-amounts-viz__desc-top--loans"
                    role="button"
                    tabIndex="0"
                    onBlur={closeTooltip}
                    onFocus={showNumeratorTooltip}
                    onKeyPress={showNumeratorTooltip}
                    onMouseEnter={showNumeratorTooltip}
                    onMouseLeave={closeTooltip}
                    onClick={showNumeratorTooltip}>
                    <strong>{numeratorValue}</strong>
                    <br />
                    {numerator.text}
                </div>
                <div className="award-amounts-viz__label" style={numeratorBarAndLabelStyles}>
                    <div className="award-amounts-viz__line-up--loans" />
                </div>
            </>}
            {numeratorIsZero &&
                <div
                    className="numerator"
                    style={{ width: '160px' }}
                    role="button"
                    tabIndex="0"
                    onBlur={closeTooltip}
                    onFocus={showNumeratorTooltip}
                    onKeyPress={showNumeratorTooltip}
                    onMouseEnter={showNumeratorTooltip}
                    onMouseLeave={closeTooltip}
                    onClick={showNumeratorTooltip}>
                    <strong>{numeratorValue}</strong>
                    <span>{numerator.text}</span>
                </div>
            }
            {isCaresReleased &&
                <>
                    <div
                        className="award-amounts-viz__desc-top file-c-obligated"
                        role="button"
                        tabIndex="0"
                        onBlur={closeTooltip}
                        onFocus={showNumerator2Tooltip}
                        onKeyPress={showNumerator2Tooltip}
                        onMouseEnter={showNumerator2Tooltip}
                        onMouseLeave={closeTooltip}
                        onClick={showNumerator2Tooltip}>
                        <strong>{numerator2.value}</strong><br />COVID-19 Response Obligations Amount
                    </div>
                    <div className="award-amounts-viz__label file-c-obligated">
                        <div className="award-amounts-viz__line-up file-c-obligated" style={absoluteWidths.numerator2} />
                    </div>
                </>
            }
            <div className="award-amounts-viz__bar-wrapper">
                <div
                    className="denominator"
                    style={{ backgroundColor: denominatorColor }}
                    role="button"
                    tabIndex="0"
                    onBlur={closeTooltip}
                    onFocus={showDenominatorTooltip}
                    onKeyPress={showDenominatorTooltip}
                    onMouseEnter={showDenominatorTooltip}
                    onMouseLeave={closeTooltip}
                    onClick={showDenominatorTooltip}>
                    <div
                        className="award-amounts-viz__bar denominator"
                        style={{ backgroundColor: denominatorColor, width: '100%' }}>
                        {!numeratorIsZero && (
                            <div
                                className="numerator"
                                style={{ width: numeratorBarAndLabelStyles.width }}
                                role="button"
                                tabIndex="0"
                                onBlur={closeTooltip}
                                onFocus={showNumeratorTooltip}
                                onKeyPress={showNumeratorTooltip}
                                onMouseEnter={showNumeratorTooltip}
                                onMouseLeave={closeTooltip}
                                onClick={showNumeratorTooltip}>
                                <div
                                    className="award-amounts-viz__bar numerator"
                                    style={{
                                        width: '100%',
                                        backgroundColor: numeratorBarAndLabelStyles.backgroundColor
                                    }}>

                                    {isCaresReleased &&
                                        <div className="nested-obligations">
                                            <div
                                                className="file-c-obligated"
                                                style={relativeWidths.numerator2}
                                                role="button"
                                                tabIndex="0"
                                                onBlur={closeTooltip}
                                                onFocus={showNumerator2Tooltip}
                                                onKeyPress={showNumerator2Tooltip}
                                                onMouseEnter={showNumerator2Tooltip}
                                                onMouseLeave={closeTooltip}
                                                onClick={showNumerator2Tooltip}>
                                                <div
                                                    className="award-amounts-viz__bar file-c-obligated"
                                                    style={{ width: generatePercentage(1), backgroundColor: numerator2Color }} />
                                            </div>
                                            {isNumerator3Defined &&
                                                <div
                                                    className="file-c-outlay"
                                                    style={{ width: relativeWidths.numerator3.width, ...numerator3Positioning }}
                                                    role="button"
                                                    tabIndex="0"
                                                    onBlur={closeTooltip}
                                                    onFocus={showNumerator3Tooltip}
                                                    onKeyPress={showNumerator3Tooltip}
                                                    onMouseEnter={showNumerator3Tooltip}
                                                    onMouseLeave={closeTooltip}
                                                    onClick={showNumerator3Tooltip}>
                                                    <div
                                                        className="award-amounts-viz__bar file-c-outlay"
                                                        style={{ width: generatePercentage(1), backgroundColor: numerator3Color }} />
                                                </div>
                                            }
                                        </div>
                                    }
                                </div>
                            </div>
                        )}
                        {numeratorIsZero && (
                            <div className="award-amounts-viz__obligated--grants" style={numeratorBarAndLabelStyles} />
                        )}
                    </div>
                </div>
            </div>
            {/* Even if numerator3 is 0, we want to show this so long as numerator2 is > 0 */}
            {isCaresReleased &&
                <div className="award-amounts-viz__label file-c-outlay">
                    <div className="award-amounts-viz__line file-c-outlay" style={absoluteWidths.numerator3} />
                    <div className="award-amounts-viz__desc">
                        <div
                            className="award-amounts-viz__desc-text"
                            role="button"
                            tabIndex="0"
                            onBlur={closeTooltip}
                            onFocus={showNumerator3Tooltip}
                            onKeyPress={showNumerator3Tooltip}
                            onMouseEnter={showNumerator3Tooltip}
                            onMouseLeave={closeTooltip}
                            onClick={showNumerator3Tooltip}>
                            <strong>{numerator3.value}</strong><br />
                            COVID-19 Response Outlay Amount
                        </div>
                    </div>
                </div>
            }
            <div className="award-amounts-viz__label">
                <div className="award-amounts-viz__line" style={{ backgroundColor: denominatorColor }} />
                <div className="award-amounts-viz__desc">
                    <div
                        className="award-amounts-viz__desc-text"
                        role="button"
                        tabIndex="0"
                        onBlur={closeTooltip}
                        onFocus={showDenominatorTooltip}
                        onKeyPress={showDenominatorTooltip}
                        onMouseEnter={showDenominatorTooltip}
                        onMouseLeave={closeTooltip}
                        onClick={showDenominatorTooltip}>
                        <strong>{denominator.value}</strong><br />{denominator.text}
                    </div>
                    <div className="award-amounts-viz__legend-line award-amounts-viz__legend-line_potential" style={{ backgroundColor: denominatorColor }} />
                </div>
            </div>
        </div>
    );
};

export default RectanglePercentViz;
RectanglePercentViz.propTypes = propTypes;
