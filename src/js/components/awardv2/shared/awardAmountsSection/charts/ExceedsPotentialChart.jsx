/**
 * ExceedsPotentialChart.jsx
 * Created by Lizzie Salita 4/4/19
 **/

import React from 'react';
import PropTypes from 'prop-types';

import { generatePercentage } from 'helpers/aggregatedAmountsHelper';
import TooltipWrapper from "../../../../sharedComponents/TooltipWrapper";
import { AWARD_V2_AGGREGATED_AMOUNTS_PROPS, TOOLTIP_PROPS } from '../../../../../propTypes/index';

const propTypes = {
    awardType: PropTypes.string,
    awardAmounts: AWARD_V2_AGGREGATED_AMOUNTS_PROPS,
    obligatedTooltipProps: TOOLTIP_PROPS,
    currentTooltipProps: TOOLTIP_PROPS,
    potentialTooltipProps: TOOLTIP_PROPS,
    exceedsPotentialTooltipProps: TOOLTIP_PROPS
};

export default class ExceedsPotentialChart extends React.Component {
    render() {
        const obligation = this.props.awardAmounts._totalObligation;
        const current = this.props.awardAmounts._baseExercisedOptions;
        const potential = this.props.awardAmounts._baseAndAllOptions;

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

        const isIdv = (this.props.awardType === 'idv');

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
                        <strong>
                            {this.props.awardAmounts.totalObligationAbbreviated}
                        </strong>
                        <br />
                        {isIdv ? "Combined Obligated Amounts" : "Obligated Amounts"}
                    </div>
                    <div className="award-amounts-viz__desc">
                        <div
                            className="award-amounts-viz__desc-text"
                            role="button"
                            tabIndex="0"
                            onBlur={exceedsPotentialTooltipProps.controlledProps.closeTooltip}
                            onFocus={exceedsPotentialTooltipProps.controlledProps.showTooltip}
                            onKeyPress={exceedsPotentialTooltipProps.controlledProps.showTooltip}
                            onMouseEnter={exceedsPotentialTooltipProps.controlledProps.showTooltip}
                            onMouseLeave={exceedsPotentialTooltipProps.controlledProps.closeTooltip}
                            onClick={exceedsPotentialTooltipProps.controlledProps.showTooltip}>
                            <strong>{this.props.awardAmounts.extremeOverspendingAbbreviated}</strong>
                            <br />
                            <div className="award-amounts-viz__desc-text-wrapper">
                                {isIdv ? "Exceeds Combined Potential Award Amounts" : "Exceeds Potential Award Amount"}
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
                <TooltipWrapper {...obligatedTooltipProps} styles={obligatedLabelStyle} offsetAdjustments={{ top: 17.5, right: 30 }}>
                    <div className="award-amounts-viz__bar-wrapper award-amounts-viz__bar-wrapper_extreme-overspending">
                        <div className="award-amounts-viz__bar">
                            <div
                                className="award-amounts-viz__potential-wrapper"
                                style={potentialWrapperStyle}>
                                <TooltipWrapper {...currentTooltipProps} styles={{ width: currentBarStyle.width }}>
                                    <div
                                        className="award-amounts-viz__current"
                                        style={{ width: generatePercentage(1), backgroundColor: currentBarStyle.backgroundColor }} />
                                </TooltipWrapper>
                                <TooltipWrapper {...potentialTooltipProps} styles={{ width: potentialBarStyle.width }}>
                                    <div
                                        className="award-amounts-viz__potential"
                                        style={{ width: generatePercentage(1), backgroundColor: potentialBarStyle.backgroundColor }} />
                                </TooltipWrapper>
                            </div>
                            <TooltipWrapper {...exceedsPotentialTooltipProps} styles={{ width: overspendingBarStyle.width }} offsetAdjustments={{ top: -5, right: 30 }}>
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
                            onBlur={currentTooltipProps.controlledProps.closeTooltip}
                            onFocus={currentTooltipProps.controlledProps.showTooltip}
                            onKeyPress={currentTooltipProps.controlledProps.showTooltip}
                            onMouseEnter={currentTooltipProps.controlledProps.showTooltip}
                            onMouseLeave={currentTooltipProps.controlledProps.closeTooltip}
                            onClick={currentTooltipProps.controlledProps.showTooltip}>
                            <strong>{this.props.awardAmounts.baseExercisedOptionsAbbreviated}</strong>
                            <br />
                            {isIdv ? "Combined Current Award Amounts" : "Current Award Amount"}
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
                            onBlur={potentialTooltipProps.controlledProps.closeTooltip}
                            onFocus={potentialTooltipProps.controlledProps.showTooltip}
                            onKeyPress={potentialTooltipProps.controlledProps.showTooltip}
                            onMouseEnter={potentialTooltipProps.controlledProps.showTooltip}
                            onMouseLeave={potentialTooltipProps.controlledProps.closeTooltip}
                            onClick={potentialTooltipProps.controlledProps.showTooltip}>
                            <strong>{this.props.awardAmounts.baseAndAllOptionsAbbreviated}</strong>
                            <br />
                            {isIdv ? "Combined Potential Award Amounts" : "Potential Award Amount"}
                        </div>
                        <div className="award-amounts-viz__legend-line award-amounts-viz__legend-line_potential" />
                    </div>
                </div>
            </div>
        );
    }
}
ExceedsPotentialChart.propTypes = propTypes;
