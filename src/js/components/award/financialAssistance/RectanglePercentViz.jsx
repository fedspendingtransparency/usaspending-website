/**
 * LoanChart -> RectanglePercentViz.jsx
 * Created by Maxwell Kendall 9/16/19
 **/

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { TooltipWrapper } from "data-transparency-ui";

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
    // numerator2 = null,
    numerator3 = null,
    denominator,
    percentage,
    numeratorTooltipData,
    denominatorTooltipData,
    // numerator2TooltipData = null,
    // numerator3TooltipData = null,
    numeratorColor,
    denominatorColor = '#FFF'
    // numerator2Color = null,
    // numerator3Color = null
}) => {
    const [isTooltipVisible, setIsTooltipVisible] = useState(false);
    const [activeTooltipProps, setActiveTooltipProps] = useState(emptyTooltipProps);
    const numeratorIsZero = (numerator.rawValue === 0);

    const widths = {
        denominator: {
            width: generatePercentage(1)
        },
        numerator: {
            width: percentage || generatePercentage(numerator.rawValue / denominator.rawValue)
        },
        numerator2: {
            width: numerator3
                ? generatePercentage(numerator3.rawValue / denominator.rawValue)
                : null
        },
        numerator3: {
            width: numerator3
                ? generatePercentage(numerator3.rawValue / denominator.rawValue)
                : null
        }
    };

    const showTooltip = (tooltipData, category) => {
        setActiveTooltipProps({
            ...tooltipData,
            wide: false,
            styles: {
                transform: `translate(calc(${widths[category].width} + 15px), 90px)`
            }
        });
        setIsTooltipVisible(true);
    };

    const numeratorBarAndLabelStyles = {
        ...widths.numerator,
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
    // const showNumerator2Tooltip = (e) => {
    //     e.stopPropagation();
    //     showTooltip("numerator2");
    // };

    // const showNumerator3Tooltip = (e) => {
    //     e.stopPropagation();
    //     showTooltip("numerator3");
    // };

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
                                    // className="award-amounts-viz__obligated--grants"
                                    style={{
                                        width: '100%',
                                        backgroundColor: numeratorBarAndLabelStyles.backgroundColor
                                    }} />
                            </div>
                        )}
                        {numeratorIsZero && (
                            <div className="award-amounts-viz__obligated--grants" style={numeratorBarAndLabelStyles} />
                        )}
                    </div>
                </div>
            </div>
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
