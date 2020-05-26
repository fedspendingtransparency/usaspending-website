/**
 * LoanChart -> RectanglePercentViz.jsx
 * Created by Maxwell Kendall 9/16/19
 **/

import React from 'react';
import PropTypes from 'prop-types';
import { TooltipWrapper } from "data-transparency-ui";

import { generatePercentage } from 'helpers/awardAmountHelper';
import { useTooltips } from "../shared/awardAmountsSection/charts/AwardAmountsChart";

const faceValueColor = "#FFF";

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
    denominator: shape,
    percentage: PropTypes.string,
    numeratorTooltipData: tooltipShape,
    denominatorTooltipData: tooltipShape,
    numeratorColor: PropTypes.string
};

const RectanglePercentViz = ({
    numerator,
    denominator,
    percentage,
    numeratorTooltipData,
    denominatorTooltipData,
    numeratorColor
}) => {
    const [
        activeTooltip,
        closeTooltip,
        showNumeratorTooltip,
        showDenominatorTooltip
    ] = useTooltips(['numerator', 'denominator']);

    const buildTooltipProps = (tooltipData, isVisible, showTooltip) => ({
        ...tooltipData,
        wide: false,
        controlledProps: {
            isControlled: true,
            isVisible,
            showTooltip,
            closeTooltip
        }
    });

    const numeratorIsZero = (numerator.rawValue === 0);
    const percent = percentage || generatePercentage(numerator.rawValue / denominator.rawValue);

    const numeratorBarAndLabelStyles = {
        width: percent,
        backgroundColor: numeratorColor
    };

    const numeratorTooltipProps = buildTooltipProps(numeratorTooltipData, (activeTooltip === 'numerator'), showNumeratorTooltip);
    const denominatorTooltipProps = buildTooltipProps(denominatorTooltipData, (activeTooltip === 'denominator'), showDenominatorTooltip);
    const numeratorValue = percentage ? `${numerator.value} (${percent})` : numerator.value;
    return (
        <div className="award-amounts-viz">
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
                    <strong>{numeratorValue}</strong><br />{numerator.text}
                </div>
                <div className="award-amounts-viz__label" style={numeratorBarAndLabelStyles}>
                    <div className="award-amounts-viz__line-up--loans" />
                </div>
            </>}
            {numeratorIsZero &&
                <TooltipWrapper {...numeratorTooltipProps} styles={{ width: '160px' }}>
                    <div className="award-amounts-viz__desc-top--loans" role="button" tabIndex="0">
                        <strong>{numeratorValue}</strong>
                        <span>{numerator.text}</span>
                    </div>
                </TooltipWrapper>
            }
            <div className="award-amounts-viz__bar-wrapper" style={{ height: '4rem' }}>
                <TooltipWrapper
                    {...denominatorTooltipProps}
                    styles={{ backgroundColor: faceValueColor }}>
                    <div
                        className="award-amounts-viz__bar"
                        style={{ backgroundColor: faceValueColor, width: '100%' }}>
                        {!numeratorIsZero &&
                        <TooltipWrapper
                            {...numeratorTooltipProps}
                            styles={{ width: numeratorBarAndLabelStyles.width }}>
                            <div
                                className="award-amounts-viz__obligated--grants"
                                style={{
                                    width: '100%',
                                    backgroundColor: numeratorBarAndLabelStyles.backgroundColor
                                }} />
                        </TooltipWrapper>
                        }
                        {numeratorIsZero && <div className="award-amounts-viz__obligated--grants" style={numeratorBarAndLabelStyles} />}
                    </div>
                </TooltipWrapper>
            </div>
            <div className="award-amounts-viz__label">
                <div className="award-amounts-viz__line" style={{ backgroundColor: faceValueColor }} />
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
                    <div className="award-amounts-viz__legend-line award-amounts-viz__legend-line_potential" style={{ backgroundColor: faceValueColor }} />
                </div>
            </div>
        </div>
    );
};

export default RectanglePercentViz;
RectanglePercentViz.propTypes = propTypes;
