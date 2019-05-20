/**
 * NormalChart.jsx
 * Created by David Trinh 2/15/19
 **/

import React from 'react';
import { generatePercentage } from 'helpers/aggregatedAmountsHelper';
import TooltipWrapper from "../../../../sharedComponents/TooltipWrapper";
import { AWARD_V2_AGGREGATED_AMOUNTS_PROPS, TOOLTIP_PROPS } from '../../../../../propTypes';

const propTypes = {
    awardAmounts: AWARD_V2_AGGREGATED_AMOUNTS_PROPS,
    obligatedTooltipProps: TOOLTIP_PROPS,
    currentTooltipProps: TOOLTIP_PROPS,
    potentialTooltipProps: TOOLTIP_PROPS
};

export default class NormalChart extends React.Component {
    render() {
        // Rename properties to improve readability of the calculations
        const obligation = this.props.awardAmounts._obligation;
        const current = this.props.awardAmounts._combinedCurrentAwardAmounts;
        const potential = this.props.awardAmounts._combinedPotentialAwardAmounts;

        const obligatedBarStyle = {
            width: generatePercentage(obligation / potential),
            backgroundColor: '#4773aa'
        };

        const currentBarStyle = {
            width: generatePercentage((current - obligation) / potential),
            backgroundColor: '#d8d8d8'
        };

        const obligatedLabelStyle = {
            width: generatePercentage(obligation / potential)
        };

        const currentLabelStyle = {
            width: generatePercentage(current / potential)
        };

        const { currentTooltipProps, obligatedTooltipProps, potentialTooltipProps } = this.props;

        return (
            <div className="award-amounts-viz">
                <div
                    className="award-amounts-viz__desc-top"
                    role="button"
                    tabIndex="0"
                    onBlur={obligatedTooltipProps.controlledProps.closeTooltip}
                    onFocus={obligatedTooltipProps.controlledProps.showTooltip}
                    onKeyPress={obligatedTooltipProps.controlledProps.showTooltip}
                    onMouseEnter={obligatedTooltipProps.controlledProps.showTooltip}
                    onMouseLeave={obligatedTooltipProps.controlledProps.closeTooltip}
                    onClick={obligatedTooltipProps.controlledProps.showTooltip}>
                    <strong>{this.props.awardAmounts.obligationFormatted}</strong><br />Combined Obligated Amounts
                </div>
                <div className="award-amounts-viz__label" style={obligatedLabelStyle}>
                    <div className="award-amounts-viz__line-up" />
                </div>
                <div className="award-amounts-viz__bar-wrapper">
                    <TooltipWrapper {...potentialTooltipProps}>
                        <div className="award-amounts-viz__bar">
                            <TooltipWrapper {...obligatedTooltipProps} styles={{ width: obligatedBarStyle.width }}>
                                <div className="award-amounts-viz__obligated" style={{ width: generatePercentage(1), backgroundColor: obligatedBarStyle.backgroundColor }} />
                            </TooltipWrapper>
                            <TooltipWrapper {...currentTooltipProps} styles={{ width: currentBarStyle.width }}>
                                <div className="award-amounts-viz__excerised" style={{ backgroundColor: currentBarStyle.backgroundColor }} />
                            </TooltipWrapper>
                        </div>
                    </TooltipWrapper>
                </div>
                <div className="award-amounts-viz__label" style={currentLabelStyle}>
                    <div className="award-amounts-viz__line" />
                    <div className="award-amounts-viz__desc">
                        <div
                            className="award-amounts-viz__desc-text"
                            role="button"
                            tabIndex="0"
                            onBlur={currentTooltipProps.controlledProps.closeTooltip}
                            onFocus={currentTooltipProps.controlledProps.showTooltip}
                            onKeyPress={currentTooltipProps.controlledProps.showTooltip}
                            onMouseEnter={currentTooltipProps.controlledProps.showTooltip}
                            onMouseLeave={currentTooltipProps.controlledProps.closeTooltip}
                            onClick={currentTooltipProps.controlledProps.showTooltip}>
                            <strong>{this.props.awardAmounts.combinedCurrentAwardAmountsFormatted}</strong><br />Combined Current Award Amounts
                        </div>
                        <div className="award-amounts-viz__legend-line" />
                    </div>
                </div>
                <div className="award-amounts-viz__label">
                    <div className="award-amounts-viz__line" />
                    <div className="award-amounts-viz__desc">
                        <div
                            className="award-amounts-viz__desc-text"
                            role="button"
                            tabIndex="0"
                            onBlur={potentialTooltipProps.controlledProps.closeTooltip}
                            onFocus={potentialTooltipProps.controlledProps.showTooltip}
                            onKeyPress={potentialTooltipProps.controlledProps.showTooltip}
                            onMouseEnter={potentialTooltipProps.controlledProps.showTooltip}
                            onMouseLeave={potentialTooltipProps.controlledProps.closeTooltip}
                            onClick={potentialTooltipProps.controlledProps.showTooltip}>
                            <strong>{this.props.awardAmounts.combinedPotentialAwardAmountsFormatted}</strong><br />Combined Potential Award Amounts
                        </div>
                        <div className="award-amounts-viz__legend-line award-amounts-viz__legend-line_potential" />
                    </div>
                </div>
            </div>
        );
    }
}
NormalChart.propTypes = propTypes;
