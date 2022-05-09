/**
 * TimeVisualizationTooltip.jsx
 * Created by Lizzie Salita 7/16/18
 */

import React from 'react';
import PropTypes from 'prop-types';

import * as MoneyFormatter from 'helpers/moneyFormatter';

const propTypes = {
    y: PropTypes.number,
    x: PropTypes.number,
    data: PropTypes.object,
    barWidth: PropTypes.number,
    chartWidth: PropTypes.number
};

export default class TimeVisualizationTooltip extends React.Component {
    componentDidMount() {
        this.positionTooltip();
    }

    positionTooltip() {
    // we need to wait for the tooltip to render before we can full position it due to its
    // dynamic width
        const tooltipWidth = this.div.offsetWidth;

        // determine the tooltip direction
        let direction = 'left';
        // allow 20px padding
        if (tooltipWidth + this.props.x >= this.props.chartWidth - 20) {
            direction = 'right';
        }

        // offset the tooltip position to account for its arrow/pointer
        let offset = 27 - this.props.barWidth;
        if (direction === 'right') {
            offset = -9 - tooltipWidth - this.props.barWidth;
        }

        this.div.style.top = `${this.props.y}px`;
        this.div.style.left = `${this.props.x + offset}px`;
        this.div.className = `tooltip ${direction}`;
        this.pointerDiv.className = `tooltip-pointer ${direction}`;
    }

    render() {
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
                        {this.props.data.group}
                    </div>
                    <div className="tooltip-body">
                        <div className="tooltip-full">
                            <div className="tooltip-value">
                                {MoneyFormatter.formatNumber(this.props.data.zValue)}
                            </div>
                            <div className="tooltip-label">
                                New Awards
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

TimeVisualizationTooltip.propTypes = propTypes;
