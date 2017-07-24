/**
 * GeoTotalTooltip.jsx
 * Created by Kevin Li 5/22/17
 */

import React from 'react';
import PropTypes from 'prop-types';

import * as MoneyFormatter from 'helpers/moneyFormatter';
import * as MapHelper from 'helpers/mapHelper';

const propTypes = {
    state: PropTypes.string,
    value: PropTypes.number,
    y: PropTypes.number,
    x: PropTypes.number,
    visualization: PropTypes.object,
    total: PropTypes.number
};

export default class GeoTotalTooltip extends React.Component {
    componentDidMount() {
        this.positionTooltip();
    }
    componentDidUpdate() {
        this.positionTooltip();
    }

    positionTooltip() {
        // we need to wait for the tooltip to render before we can full position it due to its
        // dynamic width
        const tooltipWidth = this.div.offsetWidth;
        const containerX = this.containerDiv.getBoundingClientRect().left;
        const windowWidth = window.innerWidth;

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

        this.div.style.top = `${this.props.y - 15}px`;
        this.div.style.left = `${this.props.x - offset}px`;
        this.div.className = `tooltip ${direction}`;
        this.pointerDiv.className = `tooltip-pointer ${direction}`;
    }

    render() {
        let percentage = 'N/A';
        if (this.props.total > 0) {
            percentage = Math.round((this.props.value / this.props.total) * 1000) / 10;
        }

        const stateName = MapHelper.stateNameFromCode(this.props.state);

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
                        {stateName}
                    </div>
                    <div className="tooltip-body">
                        <div className="tooltip-left">
                            <div className="tooltip-value">
                                {MoneyFormatter.formatTreemapValues(this.props.value)}
                            </div>
                            <div className="tooltip-label">
                                Total Award Spending
                            </div>
                        </div>
                        <div className="tooltip-right">
                            <div className="tooltip-value">
                                {percentage}%
                            </div>
                            <div className="tooltip-label">
                                Percent of Total Award Spending
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

GeoTotalTooltip.propTypes = propTypes;
