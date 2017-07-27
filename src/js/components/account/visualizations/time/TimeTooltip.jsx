/**
 * Tooltip.jsx
 * Created by Kevin Li 7/27/17
 */

import React from 'react';
import PropTypes from 'prop-types';

import TooltipItem from './TooltipItem';

const propTypes = {
    xValue: PropTypes.string,
    values: PropTypes.array,
    position: PropTypes.object,
    width: PropTypes.number,
    height: PropTypes.number
};

export default class TimeTooltip extends React.Component {
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
        if (tooltipWidth + this.props.position.x >= windowWidth - 20) {
            direction = 'right';
        }

        // offset the tooltip position to account for its arrow/pointer
        let offset = 9;
        if (direction === 'right') {
            offset = -9 - tooltipWidth;
        }

        this.div.style.transform =
            `translate(${this.props.position.x + offset}px,${this.props.position.y}px)`;
        this.div.className = `tooltip ${direction}`;
        this.pointerDiv.className = `tooltip-pointer ${direction}`;
    }

    render() {
        const items = this.props.values.map((item) => (
            <TooltipItem
                {...item}
                key={item.type} />
        ));

        return (
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
                    {this.props.xValue}
                </div>
                <div className="tooltip-body">
                    <ul
                        className="tooltip-items">
                        {items}
                    </ul>
                </div>
            </div>
        );
    }
}

TimeTooltip.propTypes = propTypes;
