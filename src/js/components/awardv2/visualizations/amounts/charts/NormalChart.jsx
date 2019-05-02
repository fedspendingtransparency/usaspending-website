/**
 * NormalChart.jsx
 * Created by David Trinh 2/15/19
 **/

import React from 'react';
import { generatePercentage } from 'helpers/aggregatedAmountsHelper';
import TooltipWrapper from "../../../../sharedComponents/TooltipWrapper";
import { AWARD_V2_AGGREGATED_AMOUNTS_PROPS, TOOLTIP_PROPS } from '../../../../../propTypes';
import { CombinedCurrentAmounts, CombinedObligatedAmounts, CombinedPotentialAmounts } from '../../../idv/TooltipContent';

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
                    onBlur={obligatedTooltipProps.closeTooltip}
                    onFocus={obligatedTooltipProps.showTooltip}
                    onKeyPress={obligatedTooltipProps.showTooltip}
                    onMouseEnter={obligatedTooltipProps.showTooltip}
                    onMouseLeave={obligatedTooltipProps.closeTooltip}
                    onClick={obligatedTooltipProps.showTooltip}>                
                    <strong>{this.props.awardAmounts.obligationFormatted}</strong><br />Combined Obligated Amounts
                </div>
                <div className="award-amounts-viz__label" style={obligatedLabelStyle}>
                    <div className="award-amounts-viz__line-up" />
                </div>
                <div className="award-amounts-viz__bar-wrapper">
                    <TooltipWrapper
                        offsetAdjustments={{ top: 0 }}
                        className="combined-obligated-tt__container"
                        controlledProps={potentialTooltipProps}
                        tooltipComponent={
                            <CombinedPotentialAmounts
                                total={this.props.awardAmounts.combinedPotentialAwardAmounts}
                                count={this.props.awardAmounts.childAwardCount} />}>
                        <div className="award-amounts-viz__bar">
                            <TooltipWrapper
                                offsetAdjustments={{ top: 0 }}
                                styles={{ width: obligatedBarStyle.width }}
                                className="combined-obligated-tt__container"
                                controlledProps={obligatedTooltipProps}
                                tooltipComponent={
                                    <CombinedObligatedAmounts
                                        total={this.props.awardAmounts.obligation}
                                        count={this.props.awardAmounts.childAwardCount} />}>
                                <div className="award-amounts-viz__obligated" style={{ width: generatePercentage(1), backgroundColor: obligatedBarStyle.backgroundColor }} />
                            </TooltipWrapper>
                            <TooltipWrapper
                                offsetAdjustments={{ top: 0 }}
                                styles={{ width: currentBarStyle.width }}
                                className="combined-current-tt__container"
                                controlledProps={currentTooltipProps}
                                tooltipComponent={
                                    <CombinedCurrentAmounts
                                        total={this.props.awardAmounts.combinedCurrentAwardAmounts}
                                        count={this.props.awardAmounts.childAwardCount} />}>
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
                            onBlur={currentTooltipProps.closeTooltip}
                            onFocus={currentTooltipProps.showTooltip}
                            onKeyPress={currentTooltipProps.showTooltip}
                            onMouseEnter={currentTooltipProps.showTooltip}
                            onMouseLeave={currentTooltipProps.closeTooltip}
                            onClick={currentTooltipProps.showTooltip}>
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
                            onBlur={potentialTooltipProps.closeTooltip}
                            onFocus={potentialTooltipProps.showTooltip}
                            onKeyPress={potentialTooltipProps.showTooltip}
                            onMouseEnter={potentialTooltipProps.showTooltip}
                            onMouseLeave={potentialTooltipProps.closeTooltip}
                            onClick={potentialTooltipProps.showTooltip}>
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
