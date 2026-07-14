/**
 * RankVisualizationTooltip.jsx
 * Created by Kevin Li 2/9/17
 */

import React from 'react';
import PropTypes from 'prop-types';

import * as MoneyFormatter from 'helpers/moneyFormatter';

const propTypes = {
    label: PropTypes.string,
    value: PropTypes.number,
    y: PropTypes.number,
    x: PropTypes.number,
    visualization: PropTypes.object
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
                        {this.props.label}
                    </div>
                    <div className="tooltip-body">
                        <div className="tooltip-full">
                            <div className="tooltip-value">
                                {MoneyFormatter.formatMoney(this.props.value)}
                            </div>
                            <div className="tooltip-label">
                                Amount Obligated
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

RankVisualizationTooltip.propTypes = propTypes;
