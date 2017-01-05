/**
 * TimeVisualizationTooltip.jsx
 * Created by Kevin Li 12/30/16
 */

import React from 'react';
import Accounting from 'accounting';

const propTypes = {
    y: React.PropTypes.number,
    x: React.PropTypes.number,
    data: React.PropTypes.object
};

export default class TimeVisualizationTooltip extends React.Component {
    componentDidMount() {
        this.positionTooltip();
    }

    positionTooltip() {
        // we need to wait for the tooltip to render before we can full position it due to its
        // dynamic width
        const tooltipWidth = this.div.offsetWidth;
        const windowWidth = window.innerWidth;

        // determine the tooltip direction
        let direction = 'left';
        // allow 20px padding
        if (tooltipWidth + this.props.x >= windowWidth - 20) {
            direction = 'right';
        }

        // offset the tooltip position to account for its arrow/pointer
        let offset = 9;
        if (direction === 'right') {
            offset = -9 - tooltipWidth;
        }

        this.div.style.top = `${this.props.y}px`;
        this.div.style.left = `${this.props.x + offset}px`;
        this.div.className = `tooltip ${direction}`;
        this.pointerDiv.className = `tooltip-pointer ${direction}`;
    }

    render() {
        const accountingOptions = {
            symbol: '$',
            precision: 0,
            format: {
                pos: '%s%v',
                neg: '-%s%v'
            }
        };

        const dollarValue = Accounting.formatMoney(this.props.data.yValue, accountingOptions);

        // calculate round the percentage of total to 1 decimal value
        let percentageValue = Math.round(this.props.data.percentage * 1000) / 10;
        if (percentageValue % 1 === 0) {
            // add a trailing .0 for whole numbers
            percentageValue += '.0';
        }

        return (
            <div className="visualization-tooltip">
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
                        {this.props.data.xValue}
                    </div>
                    <div className="tooltip-body">
                        <div className="tooltip-left">
                            <div className="tooltip-value">
                                {dollarValue}
                            </div>
                            <div className="tooltip-label">
                                Spending in {this.props.data.xValue}
                            </div>
                        </div>
                        <div className="tooltip-right">
                            <div className="tooltip-value">
                                {percentageValue}%
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

TimeVisualizationTooltip.propTypes = propTypes;
