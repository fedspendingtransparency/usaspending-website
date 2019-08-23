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
    obligatedTooltipProps: TOOLTIP_PROPS,
    currentTooltipProps: TOOLTIP_PROPS,
    potentialTooltipProps: TOOLTIP_PROPS
};

export default class GrantChart extends React.Component {
    render() {
        // Rename properties to improve readability of the calculations
        const obligation = this.props.awardAmounts._totalObligation;
        const nonFederalFunding = this.props.awardAmounts._nonFederalFunding;
        const totalFunding = this.props.awardAmounts._totalFunding;

        const obligatedBarStyle = {
            width: generatePercentage(obligation / totalFunding),
            backgroundColor: '#4773aa'
        };

        const obligatedLabelStyle = {
            width: generatePercentage(obligation / totalFunding)
        };

        const nonFederalFundingBarStyle = {
            width: generatePercentage(nonFederalFunding / totalFunding),
            backgroundColor: '#4773aa',
            right: obligatedBarStyle.width
        };

        const totalFundingColor = "#BBBBBB";

        const nonFederalFundingLabelStyle = {
            width: generatePercentage(nonFederalFunding / totalFunding)
        };

        const { currentTooltipProps, obligatedTooltipProps, potentialTooltipProps } = this.props;
        const nonFFTooltipStyles = {
            width: nonFederalFundingBarStyle.width,
            right: nonFederalFundingBarStyle.right,
            border: "5px solid #47AAA7",
            padding: '3.5px',
            position: 'relative'
        };

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
                    <strong>{this.props.awardAmounts.totalObligationAbbreviated}</strong><br />Obligated Amount
                </div>
                <div className="award-amounts-viz__label" style={obligatedLabelStyle}>
                    <div className="award-amounts-viz__line-up" />
                </div>
                <div className="award-amounts-viz__bar-wrapper">
                    <TooltipWrapper {...potentialTooltipProps} style={{ backgroundColor: totalFundingColor }}>
                        <div className="award-amounts-viz__bar" style={{ backgroundColor: totalFundingColor }}>
                            <TooltipWrapper {...obligatedTooltipProps} styles={{ width: obligatedBarStyle.width, border: "5px solid #BBB" }}>
                                <div className="award-amounts-viz__obligated--grants" style={{ width: generatePercentage(1), backgroundColor: obligatedBarStyle.backgroundColor }} />
                            </TooltipWrapper>
                            {nonFederalFunding > 0 &&
                                <TooltipWrapper {...currentTooltipProps} styles={{ ...nonFFTooltipStyles }}>
                                    <div className="award-amounts-viz__non-federal-funding" style={{ backgroundColor: nonFederalFundingBarStyle.backgroundColor }} />
                                </TooltipWrapper>
                            }
                        </div>
                    </TooltipWrapper>
                </div>
                <div className="award-amounts-viz__label" style={nonFederalFundingLabelStyle}>
                    <div className="award-amounts-viz__line--non-federal-funding" style={{ backgroundColor: nonFederalFundingBarStyle.backgroundColor }} />
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
                            <strong>{this.props.awardAmounts.nonFederalFundingAbbreviated}</strong><br />Non-Federal Funding
                        </div>
                        <div className="award-amounts-viz__legend-line" style={{ backgroundColor: "#47AAA7" }} />
                    </div>
                </div>
                <div className="award-amounts-viz__label">
                    <div className="award-amounts-viz__line" style={{ backgroundColor: totalFundingColor }} />
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
                            <strong>{this.props.awardAmounts.totalFundingAbbreviated}</strong><br />Total Funding
                        </div>
                        <div className="award-amounts-viz__legend-line award-amounts-viz__legend-line_potential" style={{ backgroundColor: totalFundingColor }} />
                    </div>
                </div>
            </div>
        );
    }
}

GrantChart.propTypes = propTypes;
