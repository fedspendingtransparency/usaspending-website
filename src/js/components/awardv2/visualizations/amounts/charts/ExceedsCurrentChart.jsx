/**
 * ExceedsCurrentChart.jsx
 * Created by Lizzie Salita 4/2/19
 **/

import React from 'react';
import { generatePercentage } from 'helpers/aggregatedAmountsHelper';

import InfoTooltip from 'components/awardv2/idv/InfoTooltip';
import { awardAmountsOverspendingInfo } from 'components/awardv2/idv/InfoTooltipContent';
import { AWARD_V2_AGGREGATED_AMOUNTS_PROPS, TOOLTIP_PROPS } from '../../../../../propTypes';
import { CombinedPotentialAmounts, CombinedObligatedAmounts, CombinedCurrentAmounts, CombinedExceedsCurrentAmounts } from '../../../idv/TooltipContent';
import TooltipWrapper from "../../../../sharedComponents/TooltipWrapper";

const propTypes = {
    awardAmounts: AWARD_V2_AGGREGATED_AMOUNTS_PROPS,
    obligatedTooltipProps: TOOLTIP_PROPS,
    currentTooltipProps: TOOLTIP_PROPS,
    potentialTooltipProps: TOOLTIP_PROPS,
    exceedsCurrentTooltipProps: TOOLTIP_PROPS
};

export default class ExceedsCurrentChart extends React.Component {
    render() {
        const obligation = this.props.awardAmounts._obligation;
        const current = this.props.awardAmounts._combinedCurrentAwardAmounts;
        const potential = this.props.awardAmounts._combinedPotentialAwardAmounts;

        const currentBarStyle = {
            width: generatePercentage(current / obligation),
            backgroundColor: '#4773aa'
        };

        const overspendingBarStyle = {
            width: generatePercentage((obligation - current) / obligation)
        };

        const obligatedLabelStyle = {
            width: generatePercentage(obligation / potential)
        };

        const currentLabelStyle = {
            width: generatePercentage(current / potential)
        };

        const {
            obligatedTooltipProps,
            currentTooltipProps,
            potentialTooltipProps,
            exceedsCurrentTooltipProps
        } = this.props;

        return (
            <div className="award-amounts-viz">
                <div className="award-amounts-viz__desc-top-wrapper">
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
                    <div className="award-amounts-viz__desc">
                        <div
                            className="award-amounts-viz__desc-text"
                            role="button"
                            tabIndex="0"
                            onBlur={exceedsCurrentTooltipProps.closeTooltip}
                            onFocus={exceedsCurrentTooltipProps.showTooltip}
                            onKeyPress={exceedsCurrentTooltipProps.showTooltip}
                            onMouseEnter={exceedsCurrentTooltipProps.showTooltip}
                            onMouseLeave={exceedsCurrentTooltipProps.closeTooltip}
                            onClick={exceedsCurrentTooltipProps.showTooltip}>
                            <strong>{this.props.awardAmounts.overspendingFormatted}</strong><br />
                            <div className="award-amounts-viz__desc-text-wrapper">
                                <InfoTooltip>{awardAmountsOverspendingInfo}</InfoTooltip> Exceeds Combined Current Award Amounts
                            </div>
                        </div>
                        <div className="award-amounts-viz__legend-line award-amounts-viz__legend-line_overspending" />
                    </div>
                </div>
                <div className="award-amounts-viz__label" style={obligatedLabelStyle}>
                    <div className="award-amounts-viz__line-up" />
                </div>
                <div className="award-amounts-viz__bar-wrapper">
                    <TooltipWrapper
                        className="combined-potential-tt__container"
                        styles={{ width: "100%" }}
                        controlledProps={potentialTooltipProps}
                        offsetAdjustments={{ top: 0 }}
                        tooltipComponent={
                            <CombinedPotentialAmounts
                                total={this.props.awardAmounts.combinedPotentialAwardAmounts}
                                count={this.props.awardAmounts.childAwardCount} />}>
                        <div className="award-amounts-viz__bar">{/* Combined Potential */}
                            <TooltipWrapper
                                className="combined-obligated-tt__container"
                                styles={obligatedLabelStyle}
                                controlledProps={obligatedTooltipProps}
                                offsetAdjustments={{ top: 0 }}
                                tooltipComponent={
                                    <CombinedObligatedAmounts
                                        total={this.props.awardAmounts.obligation}
                                        count={this.props.awardAmounts.childAwardCount} />}>
                                <TooltipWrapper
                                    className="combined-current-tt__container"
                                    styles={{ width: currentBarStyle.width }}
                                    controlledProps={currentTooltipProps}
                                    offsetAdjustments={{ top: 0 }}
                                    tooltipComponent={
                                        <CombinedCurrentAmounts
                                            total={this.props.awardAmounts.combinedCurrentAwardAmounts}
                                            count={this.props.awardAmounts.childAwardCount} />}>
                                    <div className="award-amounts-viz__obligated" style={{ backgroundColor: currentBarStyle.backgroundColor }} />{/* Obligated/Current */}
                                </TooltipWrapper>
                                <TooltipWrapper
                                    className="combined-exceeds-tt__container"
                                    styles={{ width: overspendingBarStyle.width }}
                                    controlledProps={exceedsCurrentTooltipProps}
                                    offsetAdjustments={{ top: 0 }}
                                    tooltipComponent={
                                        <CombinedExceedsCurrentAmounts
                                            total={this.props.awardAmounts.overspending}
                                            count={this.props.awardAmounts.childAwardCount} />}>
                                    <div className="award-amounts-viz__exceeded" style={{ backgroundColor: overspendingBarStyle.backgroundColor }} />{/* Obligated/Overspending */}
                                </TooltipWrapper>
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
ExceedsCurrentChart.propTypes = propTypes;
