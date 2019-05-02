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

export default class AggregatedAwardAmounts extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showObligatedTooltip: false,
            showCurrentTooltip: false,
            showPotentialTooltip: false,
            showExceedsCurrentTooltip: true,
            showExceedsPotentialTooltip: false
        };

        this.jumpToReferencedAwardsTable = this.jumpToReferencedAwardsTable.bind(this);
        this.closeObligatedTooltip = this.closeTooltip.bind(this, "obligated");
        this.showObligatedTooltip = this.showTooltip.bind(this, "obligated");
        this.closeCurrentTooltip = this.closeTooltip.bind(this, "current");
        this.showCurrentTooltip = this.showTooltip.bind(this, "current");
        this.closePotentialTooltip = this.closeTooltip.bind(this, "potential");
        this.showPotentialTooltip = this.showTooltip.bind(this, "potential");
        this.closeExceedsCurrentTooltip = this.closeTooltip.bind(this, "exceedsCurrent");
        this.showExceedsCurrentTooltip = this.showTooltip.bind(this, "exceedsCurrent");
        this.closeExceedsPotentialTooltip = this.closeTooltip.bind(this, "exceedsPotential");
        this.showExceedsPotentialTooltip = this.showTooltip.bind(this, "exceedsPotential");
    }

    getTooltipProps(chartType) {
        switch (chartType) {
            case "exceedsCurrent":
                return {
                    obligatedTooltipProps: {
                        isControlled: true,
                        isVisible: this.state.showObligatedTooltip,
                        closeTooltip: this.closeObligatedTooltip,
                        showTooltip: this.showObligatedTooltip
                    },
                    currentTooltipProps: {
                        isControlled: true,
                        isVisible: this.state.showCurrentTooltip,
                        closeTooltip: this.closeCurrentTooltip,
                        showTooltip: this.showCurrentTooltip
                    },
                    potentialTooltipProps: {
                        isControlled: true,
                        isVisible: this.state.showPotentialTooltip,
                        closeTooltip: this.closePotentialTooltip,
                        showTooltip: this.showPotentialTooltip
                    },
                    exceedsCurrentTooltipProps: {
                        isControlled: true,
                        isVisible: this.state.showExceedsCurrentTooltip,
                        closeTooltip: this.closeExceedsCurrentTooltip,
                        showTooltip: this.showExceedsCurrentTooltip
                    }
                };
            case "exceedsPotential":
                return {
                    obligatedTooltipProps: {
                        isControlled: true,
                        isVisible: this.state.showObligatedTooltip,
                        closeTooltip: this.closeObligatedTooltip,
                        showTooltip: this.showObligatedTooltip
                    },
                    currentTooltipProps: {
                        isControlled: true,
                        isVisible: this.state.showCurrentTooltip,
                        closeTooltip: this.closeCurrentTooltip,
                        showTooltip: this.showCurrentTooltip
                    },
                    potentialTooltipProps: {
                        isControlled: true,
                        isVisible: this.state.showPotentialTooltip,
                        closeTooltip: this.closePotentialTooltip,
                        showTooltip: this.showPotentialTooltip
                    },
                    exceedsPotentialTooltipProps: {
                        isControlled: true,
                        isVisible: this.state.showExceedsPotentialTooltip,
                        closeTooltip: this.closeExceedsPotentialTooltip,
                        showTooltip: this.showExceedsPotentialTooltip
                    }
                };
            default:
                return {
                    obligatedTooltipProps: {
                        isControlled: true,
                        isVisible: this.state.showObligatedTooltip,
                        closeTooltip: this.closeObligatedTooltip,
                        showTooltip: this.showObligatedTooltip
                    },
                    currentTooltipProps: {
                        isControlled: true,
                        isVisible: this.state.showCurrentTooltip,
                        closeTooltip: this.closeCurrentTooltip,
                        showTooltip: this.showCurrentTooltip
                    },
                    potentialTooltipProps: {
                        isControlled: true,
                        isVisible: this.state.showPotentialTooltip,
                        closeTooltip: this.closePotentialTooltip,
                        showTooltip: this.showPotentialTooltip
                    }
                };
        }
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
        // this.setState({
        //     [tooltipMap[tooltip]]: true
        // });
        console.log("YO", tooltip);
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

