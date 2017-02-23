/**
 * RankVisualizationTooltip.jsx
 * Created by Kevin Li 2/9/17
 */

import React from 'react';

import * as MoneyFormatter from 'helpers/moneyFormatter';

const propTypes = {
    agency: React.PropTypes.string,
    value: React.PropTypes.number,
    y: React.PropTypes.number,
    x: React.PropTypes.number,
    visualization: React.PropTypes.object
};

export default class RankVisualizationTooltip extends React.Component {
    componentDidMount() {
        this.positionTooltip();
    }
    positionTooltip() {
        // we need to wait for the tooltip to render before we can full position it due to its
        // dynamic width
        const tooltipWidth = this.div.offsetWidth;
        const containerX = this.containerDiv.getBoundingClientRect().left;
        const windowWidth = window.innerWidth;

        const offsetY = 10;

        // determine the tooltip direction
        let direction = 'left';
        // // allow 20px padding
        if (tooltipWidth + containerX + this.props.x >= windowWidth - 20) {
            direction = 'right';
        }

        // offset the tooltip position to account for its arrow/pointer
        let offset = -9;
        if (direction === 'right') {
            offset = 9 + tooltipWidth;
        }

        this.div.style.top = `${this.props.y - offsetY}px`;
        this.div.style.left = `${this.props.x - offset}px`;
        this.div.className = `tooltip ${direction}`;
        this.pointerDiv.className = `tooltip-pointer ${direction}`;
    }

    render() {
        let percentage = 'N/A';
        const totalSpending = this.props.visualization.transaction_sum;
        if (totalSpending > 0) {
            percentage = Math.round((this.props.value / totalSpending) * 1000) / 10;
        }

        return (
            <div
                className="visualization-tooltip"
                ref={(div) => {
                    this.containerDiv = div;
                }}>
                <div
                    className="tooltip"
                    ref={(div) => {
                        this.div = div;
                    }}>
                    <div
                        className="tooltip-pointer"
                        ref={(div) => {
                            this.pointerDiv = div;
                        }} />
                    <div className="tooltip-title">
                        {this.props.agency}
                    </div>
                    <div className="tooltip-body">
                        <div className="tooltip-left">
                            <div className="tooltip-value">
                                {MoneyFormatter.formatMoney(this.props.value)}
                            </div>
                            <div className="tooltip-label">
                                Spending by {this.props.agency}
                            </div>
                        </div>
                        <div className="tooltip-right">
                            <div className="tooltip-value">
                                {percentage}%
                            </div>
                            <div className="tooltip-label">
                                Percent of Total Spending
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

RankVisualizationTooltip.propTypes = propTypes;
