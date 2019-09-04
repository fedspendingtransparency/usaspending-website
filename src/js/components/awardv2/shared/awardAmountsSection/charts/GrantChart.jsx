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
    nonFederalFundingTooltipProps: TOOLTIP_PROPS,
    totalFundingTooltipProps: TOOLTIP_PROPS
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

        const nonFederalFundingIsZero = (nonFederalFunding === 0);

        const { nonFederalFundingTooltipProps, obligatedTooltipProps, totalFundingTooltipProps } = this.props;
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
                    <TooltipWrapper {...totalFundingTooltipProps} style={{ backgroundColor: totalFundingColor }}>
                        <div className="award-amounts-viz__bar" style={{ backgroundColor: totalFundingColor }}>
                            <TooltipWrapper {...obligatedTooltipProps} styles={{ width: obligatedBarStyle.width, border: "5px solid #BBB" }}>
                                <div className="award-amounts-viz__obligated--grants" style={{ width: generatePercentage(1), backgroundColor: obligatedBarStyle.backgroundColor }} />
                            </TooltipWrapper>
                            {!nonFederalFundingIsZero &&
                                <TooltipWrapper {...nonFederalFundingTooltipProps} styles={{ ...nonFFTooltipStyles }}>
                                    <div className="award-amounts-viz__non-federal-funding" style={{ backgroundColor: nonFederalFundingBarStyle.backgroundColor }} />
                                </TooltipWrapper>
                            }
                        </div>
                    </TooltipWrapper>
                </div>
                <div className="award-amounts-viz__label" style={nonFederalFundingLabelStyle}>
                    {!nonFederalFundingIsZero > 0 && <div className="award-amounts-viz__line--non-federal-funding" style={{ backgroundColor: nonFederalFundingBarStyle.backgroundColor }} />}
                    <div
                        className={`${nonFederalFundingIsZero
                            ? 'award-amounts-viz__desc award-amounts-viz__desc--nff-zero'
                            : 'award-amounts-viz__desc'}`}>
                        <div
                            className="award-amounts-viz__desc-text"
                            role="button"
                            tabIndex="0"
                            onBlur={nonFederalFundingTooltipProps.controlledProps.closeTooltip}
                            onFocus={nonFederalFundingTooltipProps.controlledProps.showTooltip}
                            onKeyPress={nonFederalFundingTooltipProps.controlledProps.showTooltip}
                            onMouseEnter={nonFederalFundingTooltipProps.controlledProps.showTooltip}
                            onMouseLeave={nonFederalFundingTooltipProps.controlledProps.closeTooltip}
                            onClick={nonFederalFundingTooltipProps.controlledProps.showTooltip}>
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
                            onBlur={totalFundingTooltipProps.controlledProps.closeTooltip}
                            onFocus={totalFundingTooltipProps.controlledProps.showTooltip}
                            onKeyPress={totalFundingTooltipProps.controlledProps.showTooltip}
                            onMouseEnter={totalFundingTooltipProps.controlledProps.showTooltip}
                            onMouseLeave={totalFundingTooltipProps.controlledProps.closeTooltip}
                            onClick={totalFundingTooltipProps.controlledProps.showTooltip}>
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
