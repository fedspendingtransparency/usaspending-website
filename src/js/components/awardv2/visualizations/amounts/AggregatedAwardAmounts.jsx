/**
 * AggregatedAwardAmounts.jsx
 * Created by David Trinh 2/8/19
 **/

import React from 'react';
import PropTypes from 'prop-types';
import { formatNumber } from 'helpers/moneyFormatter';

import { determineSpendingScenario } from 'helpers/aggregatedAmountsHelper';
import ChartError from 'components/search/visualizations/ChartError';
import { Table } from 'components/sharedComponents/icons/Icons';
import AwardsBanner from './AwardsBanner';
import NormalChart from './charts/NormalChart';
import ExceedsCurrentChart from './charts/ExceedsCurrentChart';
import ExceedsPotentialChart from './charts/ExceedsPotentialChart';
import { AWARD_V2_AGGREGATED_AMOUNTS_PROPS } from '../../../../propTypes';

const propTypes = {
    awardAmounts: AWARD_V2_AGGREGATED_AMOUNTS_PROPS,
    inFlight: PropTypes.bool,
    error: PropTypes.bool,
    jumpToSection: PropTypes.func
};

const tooltipMap = {
    obligated: "showObligatedTooltip",
    current: "showCurrentTooltip",
    potential: "showPotentialTooltip",
    exceedsCurrent: "showExceedsCurrentTooltip",
    exceedsPotential: "showExceedsPotentialTooltip"
};

const showAndCloseTooltipConstructor = (ctx, type) => {
    const titleCaseType = `${type[0].toUpperCase()}${type.substring(1)}`;
    ctx[`show${titleCaseType}Tooltip`] = ctx.showTooltip.bind(ctx, type);
    ctx[`close${titleCaseType}Tooltip`] = ctx.closeTooltip.bind(ctx, type);
};

export default class AggregatedAwardAmounts extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showObligatedTooltip: false,
            showCurrentTooltip: false,
            showPotentialTooltip: false,
            showExceedsCurrentTooltip: false,
            showExceedsPotentialTooltip: false
        };

        this.jumpToReferencedAwardsTable = this.jumpToReferencedAwardsTable.bind(this);
        Object.keys(tooltipMap).forEach((tooltip) => {
            showAndCloseTooltipConstructor(this, tooltip);
        });
    }

    getTooltipProps(chartType) {
        // these are the tooltips needed for every spending scenario & corresponding chart type
        const tooltips = ["obligated", "current", "potential"];
        if (!tooltips.includes(chartType)) {
            tooltips.push(chartType);
        }

        return tooltips.reduce((acc, tooltip) => {
            const titleCaseScenario = `${tooltip[0].toUpperCase()}${tooltip.substring(1)}`;
            return Object.assign(acc, {
                [`${tooltip}TooltipProps`]: {
                    isControlled: true,
                    isVisible: this.state[`show${titleCaseScenario}Tooltip`],
                    closeTooltip: this[`close${titleCaseScenario}Tooltip`],
                    showTooltip: this[`show${titleCaseScenario}Tooltip`]
                }
            });
        }, {});
    }

    jumpToReferencedAwardsTable() {
        this.props.jumpToSection('referenced-awards');
    }

    showTooltip(tooltip) {
        this.setState({
            [tooltipMap[tooltip]]: true
        });
        // hide the other tooltips
        Object.keys(this.state)
            .filter((key) => key !== tooltipMap[tooltip])
            .forEach((key) => this.setState({ [key]: false }));
    }

    closeTooltip(tooltip) {
        this.setState({
            [tooltipMap[tooltip]]: false
        });
    }

    generateVisualization() {
        const awardAmounts = this.props.awardAmounts;
        const visualizationType = determineSpendingScenario(awardAmounts);
        let visualization;
        let overspendingRow = null;
        switch (visualizationType) {
            case ('normal'):
                visualization = (<NormalChart {...this.getTooltipProps('normal')} awardAmounts={awardAmounts} />);
                break;
            case ('exceedsCurrent'):
                visualization = (<ExceedsCurrentChart {...this.getTooltipProps('exceedsCurrent')} awardAmounts={awardAmounts} />);
                overspendingRow = (
                    <div className="award-amounts__data-content">
                        <div><span className="award-amounts__data-icon award-amounts__data-icon_overspending" />Exceeds Combined Current Award Amounts</div>
                        <span>{awardAmounts.overspending}</span>
                    </div>
                );
                break;
            case ('exceedsPotential'):
                visualization = (<ExceedsPotentialChart {...this.getTooltipProps('exceedsPotential')} awardAmounts={awardAmounts} />);
                overspendingRow = (
                    <div className="award-amounts__data-content">
                        <div><span className="award-amounts__data-icon award-amounts__data-icon_extreme-overspending" />Exceeds Combined Potential Award Amounts</div>
                        <span>{awardAmounts.extremeOverspending}</span>
                    </div>
                );
                break;
            default:
                visualization = (
                    <div className="award-amounts-viz award-amounts-viz_insufficient">
                        <h4>Chart Not Available</h4>
                        <p>Data in this instance is not suitable for charting.</p>
                    </div>
                );
        }

        return (
            <div className="award-amounts__content">
                <AwardsBanner
                    jumpToReferencedAwardsTable={this.jumpToReferencedAwardsTable} />
                {visualization}
                <div className="award-amounts-children__data-wrapper">
                    <div className="award-amounts-children__data-content">
                        <div>Count of Total Orders</div>
                        <span>
                            {formatNumber(awardAmounts.childAwardCount + awardAmounts.grandchildAwardCount)}
                        </span>
                    </div>
                    <div className="award-amounts-children__data-content">
                        <div>Count of Child Award Orders</div>
                        <span>{formatNumber(awardAmounts.childAwardCount)}</span>
                    </div>
                    <div className="award-amounts-children__data-content">
                        <div>Count of Grandchild Award Orders</div>
                        <span>{formatNumber(awardAmounts.grandchildAwardCount)}</span>
                    </div>
                </div>
                <button
                    onClick={this.jumpToReferencedAwardsTable}
                    className="award-viz__button">
                    <div className="award-viz__link-icon">
                        <Table />
                    </div>
                    <div className="award-viz__link-text">
                        View award orders table
                    </div>
                </button>
                <div className="award-amounts__data-wrapper">
                    <div className="award-amounts__data-content">
                        <div><span className="award-amounts__data-icon award-amounts__data-icon_blue" />Combined Obligated Amounts</div>
                        <span>{awardAmounts.obligation}</span>
                    </div>
                    <div className="award-amounts__data-content">
                        <div><span className="award-amounts__data-icon award-amounts__data-icon_gray" />Combined Current Award Amounts</div>
                        <span>{awardAmounts.combinedCurrentAwardAmounts}</span>
                    </div>
                    <div className="award-amounts__data-content">
                        <div><span className="award-amounts__data-icon award-amounts__data-icon_transparent" />Combined Potential Award Amounts</div>
                        <span>{awardAmounts.combinedPotentialAwardAmounts}</span>
                    </div>
                    {overspendingRow}
                </div>
            </div>
        );
    }

    render() {
        if (this.props.inFlight) {
            // API request is still pending
            return (
                <div className="visualization-message-container">
                    <div className="visualization-loading">
                        <div className="message">
                            Gathering your data...
                        </div>
                    </div>
                </div>);
        }
        else if (this.props.error) {
            return (<ChartError />);
        }
        return this.generateVisualization();
    }
}
AggregatedAwardAmounts.propTypes = propTypes;

