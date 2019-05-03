/**
 * ExceedsPotentialChart.jsx
 * Created by Lizzie Salita 4/4/19
 **/

import React from 'react';

import { generatePercentage } from 'helpers/aggregatedAmountsHelper';

import InfoTooltip from 'components/awardv2/idv/InfoTooltip';
import { awardAmountsExtremeOverspendingInfo } from 'components/awardv2/idv/InfoTooltipContent';
import TooltipWrapper from "../../../../sharedComponents/TooltipWrapper";

import { AWARD_V2_AGGREGATED_AMOUNTS_PROPS, TOOLTIP_PROPS } from '../../../../../propTypes';
import { CombinedObligatedAmounts, CombinedPotentialAmounts, CombinedCurrentAmounts, CombinedExceedsPotentialAmounts } from "../../../idv/TooltipContent";

const propTypes = {
    awardAmounts: AWARD_V2_AGGREGATED_AMOUNTS_PROPS,
    obligatedTooltipProps: TOOLTIP_PROPS,
    currentTooltipProps: TOOLTIP_PROPS,
    potentialTooltipProps: TOOLTIP_PROPS,
    exceedsPotentialTooltipProps: TOOLTIP_PROPS
};

export default class ExceedsPotentialChart extends React.Component {
    render() {
        const obligation = this.props.awardAmounts._obligation;
        const current = this.props.awardAmounts._combinedCurrentAwardAmounts;
        const potential = this.props.awardAmounts._combinedPotentialAwardAmounts;

        const overspendingBarStyle = {
            width: generatePercentage((obligation - potential) / obligation)
        };

        const potentialWrapperStyle = {
            width: generatePercentage(potential / obligation)
        };

        // currentBar and potentialBar live inside the potentialWrapper div,
        // so their widths are divided by potential
        const potentialBarStyle = {
            width: generatePercentage((potential - current) / potential),
            backgroundColor: '#4773aa'
        };

        const currentBarStyle = {
            width: generatePercentage(current / potential),
            backgroundColor: '#4773aa'
        };

        const obligatedLabelStyle = {
            width: '100%'
        };

        const currentLabelStyle = {
            width: generatePercentage(current / obligation)
        };

        const potentialLabelStyle = {
            width: generatePercentage(potential / obligation)
        };

        const {
            obligatedTooltipProps,
            currentTooltipProps,
            potentialTooltipProps,
            exceedsPotentialTooltipProps
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
                        <strong>
                            {this.props.awardAmounts.obligationFormatted}
                        </strong>
                        <br />
                        Combined Obligated Amounts
                    </div>
                    <div className="award-amounts-viz__desc">
                        <div
                            className="award-amounts-viz__desc-text"
                            role="button"
                            tabIndex="0"
                            onBlur={exceedsPotentialTooltipProps.closeTooltip}
                            onFocus={exceedsPotentialTooltipProps.showTooltip}
                            onKeyPress={exceedsPotentialTooltipProps.showTooltip}
                            onMouseEnter={exceedsPotentialTooltipProps.showTooltip}
                            onMouseLeave={exceedsPotentialTooltipProps.closeTooltip}
                            onClick={exceedsPotentialTooltipProps.showTooltip}>
                            <strong>{this.props.awardAmounts.extremeOverspendingFormatted}</strong>
                            <br />
                            <div className="award-amounts-viz__desc-text-wrapper">
                                <InfoTooltip>
                                    {awardAmountsExtremeOverspendingInfo}
                                </InfoTooltip>
                                Exceeds Combined Potential Award Amounts
                            </div>
                        </div>
                        <div className="award-amounts-viz__legend-line award-amounts-viz__legend-line_extreme-overspending" />
                    </div>
                </div>
                <div
                    className="award-amounts-viz__label"
                    style={obligatedLabelStyle}>
                    <div className="award-amounts-viz__line-up" />
                </div>
                <TooltipWrapper
                    className="combined-obligated-tt__container"
                    styles={obligatedLabelStyle}
                    controlledProps={obligatedTooltipProps}
                    offsetAdjustments={{ top: 20 }}
                    tooltipComponent={
                        <CombinedObligatedAmounts
                            total={this.props.awardAmounts.obligation}
                            count={this.props.awardAmounts.childAwardCount} />}>
                    <div className="award-amounts-viz__bar-wrapper award-amounts-viz__bar-wrapper_extreme-overspending">
                        <div className="award-amounts-viz__bar">
                            <div
                                className="award-amounts-viz__potential-wrapper"
                                style={potentialWrapperStyle}>
                                <TooltipWrapper
                                    styles={{ width: currentBarStyle.width }}
                                    className="combined-current-tt__container"
                                    controlledProps={currentTooltipProps}
                                    offsetAdjustments={{ top: 0 }}
                                    tooltipComponent={
                                        <CombinedCurrentAmounts
                                            total={this.props.awardAmounts.combinedCurrentAwardAmounts}
                                            count={this.props.awardAmounts.childAwardCount} />
                                    }>
                                    <div
                                        className="award-amounts-viz__current"
                                        style={{ width: generatePercentage(1), backgroundColor: currentBarStyle.backgroundColor }} />
                                </TooltipWrapper>
                                <TooltipWrapper
                                    styles={{ width: potentialBarStyle.width }}
                                    className="combined-potential-tt__container"
                                    controlledProps={potentialTooltipProps}
                                    offsetAdjustments={{ top: 0 }}
                                    tooltipComponent={
                                        <CombinedPotentialAmounts
                                            total={this.props.awardAmounts.combinedPotentialAwardAmounts}
                                            count={this.props.awardAmounts.childAwardCount} />
                                    }>
                                    <div
                                        className="award-amounts-viz__potential"
                                        style={{ width: generatePercentage(1), backgroundColor: potentialBarStyle.backgroundColor }} />
                                </TooltipWrapper>
                            </div>
                            <TooltipWrapper
                                styles={{ width: overspendingBarStyle.width }}
                                className="combined-potential-tt__container"
                                controlledProps={exceedsPotentialTooltipProps}
                                offsetAdjustments={{ top: 0 }}
                                tooltipComponent={
                                    <CombinedExceedsPotentialAmounts
                                        total={this.props.awardAmounts.extremeOverspending}
                                        count={this.props.awardAmounts.childAwardCount} />}>
                                <div
                                    className="award-amounts-viz__exceeded-potential"
                                    style={{ width: generatePercentage(1) }} />
                            </TooltipWrapper>
                        </div>
                    </div>
                </TooltipWrapper>
                <div
                    className="award-amounts-viz__label"
                    style={currentLabelStyle}>
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
                            <strong>{this.props.awardAmounts.combinedCurrentAwardAmountsFormatted}</strong>
                            <br />
                            Combined Current Award Amounts
                        </div>
                        <div className="award-amounts-viz__legend-line" />
                    </div>
                </div>
                <div
                    className="award-amounts-viz__label"
                    style={potentialLabelStyle}>
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
                            <strong>{this.props.awardAmounts.combinedPotentialAwardAmountsFormatted}</strong>
                            <br />
                            Combined Potential Award Amounts
                        </div>
                        <div className="award-amounts-viz__legend-line award-amounts-viz__legend-line_potential" />
                    </div>
                </div>
            </div>
        );
    }
}
ExceedsPotentialChart.propTypes = propTypes;
