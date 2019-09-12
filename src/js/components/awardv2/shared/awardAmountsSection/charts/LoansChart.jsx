/**
 * NormalChart.jsx
 * Created by David Trinh 2/15/19
 **/

import React from 'react';
import PropTypes from 'prop-types';

import { generatePercentage } from 'helpers/aggregatedAmountsHelper';
import TooltipWrapper from "../../../../sharedComponents/TooltipWrapper";
import { AWARD_V2_AGGREGATED_AMOUNTS_PROPS, TOOLTIP_PROPS } from '../../../../../propTypes/index';

const propTypes = {
    awardType: PropTypes.string,
    awardAmounts: AWARD_V2_AGGREGATED_AMOUNTS_PROPS,
    subsidyTooltipProps: TOOLTIP_PROPS,
    faceValueTooltipProps: TOOLTIP_PROPS
};

export default class LoansChart extends React.Component {
    render() {
        // Rename properties to improve readability of the calculations
        const subsidy = this.props.awardAmounts.subsidy;
        const faceValue = this.props.awardAmounts._faceValue;

        const subsidyBarStyle = {
            width: generatePercentage(subsidy / faceValue),
            backgroundColor: '#4773aa'
        };

        const subsidyLabelStyle = {
            width: generatePercentage(subsidy / faceValue)
        };

        const faceValueColor = "#FFF";

        const { subsidyTooltipProps, faceValueTooltipProps } = this.props;

        return (
            <div className="award-amounts-viz">
                <div
                    className="award-amounts-viz__desc-top"
                    role="button"
                    tabIndex="0"
                    onBlur={subsidyTooltipProps.controlledProps.closeTooltip}
                    onFocus={subsidyTooltipProps.controlledProps.showTooltip}
                    onKeyPress={subsidyTooltipProps.controlledProps.showTooltip}
                    onMouseEnter={subsidyTooltipProps.controlledProps.showTooltip}
                    onMouseLeave={subsidyTooltipProps.controlledProps.closeTooltip}
                    onClick={subsidyTooltipProps.controlledProps.showTooltip}>
                    <strong>{this.props.awardAmounts.subsidyAbbreviated}</strong><br />Original Subsidy Cost
                </div>
                <div className="award-amounts-viz__label" style={subsidyLabelStyle}>
                    <div className="award-amounts-viz__line-up" />
                </div>
                <div className="award-amounts-viz__bar-wrapper">
                    <TooltipWrapper {...faceValueTooltipProps} style={{ backgroundColor: faceValueColor }}>
                        <div className="award-amounts-viz__bar" style={{ backgroundColor: faceValueColor }}>
                            <TooltipWrapper {...subsidyTooltipProps} styles={{ width: subsidyBarStyle.width }}>
                                <div className="award-amounts-viz__obligated--grants" style={{ width: generatePercentage(1), backgroundColor: subsidyBarStyle.backgroundColor }} />
                            </TooltipWrapper>
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
                            onBlur={faceValueTooltipProps.controlledProps.closeTooltip}
                            onFocus={faceValueTooltipProps.controlledProps.showTooltip}
                            onKeyPress={faceValueTooltipProps.controlledProps.showTooltip}
                            onMouseEnter={faceValueTooltipProps.controlledProps.showTooltip}
                            onMouseLeave={faceValueTooltipProps.controlledProps.closeTooltip}
                            onClick={faceValueTooltipProps.controlledProps.showTooltip}>
                            <strong>{this.props.awardAmounts.faceValueAbbreviated}</strong><br />Face Value of Direct Loan
                        </div>
                        <div className="award-amounts-viz__legend-line award-amounts-viz__legend-line_potential" style={{ backgroundColor: faceValueColor }} />
                    </div>
                </div>
            </div>
        );
    }
}

// LoansChart.defaultProps = defaultProps;
LoansChart.propTypes = propTypes;
