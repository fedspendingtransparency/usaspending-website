/**
 * ExceedsPotentialChart.jsx
 * Created by Lizzie Salita 4/4/19
 **/

import React from 'react';
import { generatePercentage } from 'helpers/aggregatedAmountsHelper';

import InfoTooltip from 'components/awardv2/idv/InfoTooltip';
import { awardAmountsExtremeOverspendingInfo } from 'components/awardv2/idv/InfoTooltipContent';
import TooltipWrapper from "../../../../sharedComponents/TooltipWrapper";

import { AWARD_V2_AGGREGATED_AMOUNTS_PROPS } from '../../../../../propTypes';
import { CombinedObligatedAmounts } from "../../../idv/TooltipContent";

const propTypes = {
    awardAmounts: AWARD_V2_AGGREGATED_AMOUNTS_PROPS
};

const tooltipMap = {
    current: "showCurrentTooltip",
    potential: "showPotentialTooltip",
    exceeds: "showExceedsTooltip"
};

export default class ExceedsPotentialChart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showCurrentTooltip: false,
            showPotentialTooltip: false,
            showExceedsTooltip: false
        };
        this.closeCurrentToolTip = this.closeTooltip.bind(this, "current");
        this.showCurrentToolTip = this.showTooltip.bind(this, "current");
    }

    showTooltip(tooltip) {
        this.setState({
            [tooltipMap[tooltip]]: true
        });
    }

    closeTooltip(tooltip) {
        this.setState({
            [tooltipMap[tooltip]]: false
        });
    }

    render() {
        const currentTooltipProps = {
            isControlled: true,
            isVisible: this.state.showCurrentTooltip,
            closeTooltip: this.closeCurrentToolTip,
            showTooltip: this.showCurrentToolTip
        };
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

        return (
            <div className="award-amounts-viz">
                <div className="award-amounts-viz__desc-top-wrapper">
                    <div
                        className="award-amounts-viz__desc-top"
                        role="button"
                        tabIndex="0"
                        onBlur={this.closeCurrentToolTip}
                        onFocus={this.showCurrentToolTip}
                        onKeyPress={this.showCurrentToolTip}
                        onMouseEnter={this.showCurrentToolTip}
                        onMouseLeave={this.closeCurrentToolTip}
                        onClick={this.showCurrentToolTip}>
                        <strong>
                            {this.props.awardAmounts.obligationFormatted}
                        </strong>
                        <br />
                Combined Obligated Amounts
                    </div>
                    <div className="award-amounts-viz__desc">
                        <div className="award-amounts-viz__desc-text">
                            <strong>
                                {
                                    this.props.awardAmounts
                                        .extremeOverspendingFormatted
                                }
                            </strong>
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
                <div className="award-amounts-viz__bar-wrapper award-amounts-viz__bar-wrapper_extreme-overspending">
                    <div className="award-amounts-viz__bar">
                        <div
                            className="award-amounts-viz__potential-wrapper"
                            style={potentialWrapperStyle}>
                            <TooltipWrapper
                                verticalCenter
                                className="combined-obligated-tt__container"
                                controlledProps={currentTooltipProps}
                                styles={{ width: currentBarStyle.width }}
                                tooltipComponent={
                                    <CombinedObligatedAmounts
                                        total={
                                            this.props.awardAmounts.obligationFormatted
                                        }
                                        count={this.props.awardAmounts.childAwardCount} />
                                }>
                                <div
                                    className="award-amounts-viz__current"
                                    style={{
                                        width: generatePercentage(1),
                                        backgroundColor: currentBarStyle.backgroundColor
                                    }} />
                            </TooltipWrapper>
                            <div
                                className="award-amounts-viz__potential"
                                style={potentialBarStyle} />
                        </div>
                        <div
                            className="award-amounts-viz__exceeded-potential"
                            style={overspendingBarStyle} />
                    </div>
                </div>
                <div
                    className="award-amounts-viz__label"
                    style={currentLabelStyle}>
                    <div className="award-amounts-viz__line" />
                    <div className="award-amounts-viz__desc">
                        <div className="award-amounts-viz__desc-text">
                            <strong>
                                {
                                    this.props.awardAmounts
                                        .combinedCurrentAwardAmountsFormatted
                                }
                            </strong>
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
                        <div className="award-amounts-viz__desc-text">
                            <strong>
                                {
                                    this.props.awardAmounts
                                        .combinedPotentialAwardAmountsFormatted
                                }
                            </strong>
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
