/**
 * ExceedsCurrentChart.jsx
 * Created by Lizzie Salita 4/2/19
 **/

import React from 'react';
import { generatePercentage } from 'helpers/aggregatedAmountsHelper';

import InfoTooltip from 'components/awardv2/idv/InfoTooltip';
import { awardAmountsOverspendingInfo } from 'components/awardv2/idv/InfoTooltipContent';
import { AWARD_V2_AGGREGATED_AMOUNTS_PROPS, TOOLTIP_PROPS } from '../../../../../propTypes';
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
                        onBlur={obligatedTooltipProps.controlledProps.closeTooltip}
                        onFocus={obligatedTooltipProps.controlledProps.showTooltip}
                        onKeyPress={obligatedTooltipProps.controlledProps.showTooltip}
                        onMouseEnter={obligatedTooltipProps.controlledProps.showTooltip}
                        onMouseLeave={obligatedTooltipProps.controlledProps.closeTooltip}
                        onClick={obligatedTooltipProps.controlledProps.showTooltip}>
                        <strong>{this.props.awardAmounts.obligationFormatted}</strong><br />Combined Obligated Amounts
                    </div>
                    <div className="award-amounts-viz__desc">
                        <div
                            className="award-amounts-viz__desc-text"
                            role="button"
                            tabIndex="0"
                            onBlur={exceedsCurrentTooltipProps.controlledProps.closeTooltip}
                            onFocus={exceedsCurrentTooltipProps.controlledProps.showTooltip}
                            onKeyPress={exceedsCurrentTooltipProps.controlledProps.showTooltip}
                            onMouseEnter={exceedsCurrentTooltipProps.controlledProps.showTooltip}
                            onMouseLeave={exceedsCurrentTooltipProps.controlledProps.closeTooltip}
                            onClick={exceedsCurrentTooltipProps.controlledProps.showTooltip}>
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
                    <TooltipWrapper {...potentialTooltipProps} styles={{ width: "100%" }}>
                        <div className="award-amounts-viz__bar">{/* Combined Potential */}
                            <TooltipWrapper {...obligatedTooltipProps} styles={obligatedLabelStyle}>
                                <TooltipWrapper {...currentTooltipProps} styles={{ width: currentBarStyle.width }}>
                                    <div className="award-amounts-viz__obligated" style={{ backgroundColor: currentBarStyle.backgroundColor }} />{/* Obligated/Current */}
                                </TooltipWrapper>
                                <TooltipWrapper {...exceedsCurrentTooltipProps} styles={{ width: overspendingBarStyle.width }}>
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
ExceedsCurrentChart.propTypes = propTypes;
