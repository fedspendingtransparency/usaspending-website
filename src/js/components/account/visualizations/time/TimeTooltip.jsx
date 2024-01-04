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
    position: PropTypes.object
};

export default class TimeTooltip extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            windowWidth: 0,
            tooltipWidth: 0,
            xOffset: 0
        };

        this.measureDOM = this.measureDOM.bind(this);
    }

    componentDidMount() {
        this.measureDOM();
        window.addEventListener('resize', this.measureDOM);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.measureDOM);
    }

    measureDOM() {
    // measure the window width
        const windowWidth = window.innerWidth;
        const tooltipWidth = this.div.offsetWidth;
        // measure where on the screen the tooltip's 0 x position is
        const xOffset = this.div.getBoundingClientRect().left;

        // save the measurements before updating the tooltip, this prevents layout thrashing
        this.setState({
            windowWidth,
            tooltipWidth,
            xOffset
        }, this.positionTooltip);
    }

    positionTooltip() {
    // we need to wait for the tooltip to render before we can full position it due to its
    // dynamic width
        const tooltipWidth = this.state.tooltipWidth;
        // determine how far from the right edge of the window we are
        const distanceFromRight = this.state.windowWidth -
            (this.state.xOffset + this.props.position.x + tooltipWidth);

        // determine the tooltip direction
        let direction = 'left';
        // if we are less than 20px from the right edge, the arrow should point right (bc the
        // tooltip will be on the left of the bar)
        if (distanceFromRight <= 20) {
            direction = 'right';
        }

        // offset the tooltip position to account for its arrow/pointer
        let offset = 9;
        if (direction === 'right') {
            offset = -9 - tooltipWidth;
        }
        let yOffset = 75;
        if (direction === 'right') {
            yOffset = 65;
        }
        this.div.style.transform =
            `translate(${this.props.position.x + offset}px,${this.props.position.y + yOffset}px)`;
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
