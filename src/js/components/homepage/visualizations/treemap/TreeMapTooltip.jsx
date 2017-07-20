/**
 * TreeMapTooltip.jsx
 * Created by Emily Gullo 04/28/2017
 */

import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    name: PropTypes.string,
    value: PropTypes.string,
    description: PropTypes.string,
    height: PropTypes.number,
    x: PropTypes.number,
    y: PropTypes.number,
    width: PropTypes.number,
    showSub: PropTypes.bool,
    percentage: PropTypes.string,
    arrow: PropTypes.bool,
    showSubfunctions: PropTypes.bool,
    sectionHeight: PropTypes.number,
    isSubfunctions: PropTypes.bool
};

export default class TreeMapTooltip extends React.Component {
    componentDidMount() {
        this.positionTooltip();
    }

    componentDidUpdate() {
        this.positionTooltip();
    }

    positionTooltip() {
        // Tooptip sizes
        const tooltipWidth = this.div.offsetWidth;
        const tooltipHeight = this.div.offsetHeight;

        // Left padding of container
        const containerPadding = this.containerDiv.getBoundingClientRect().left;

        // Window width
        const windowWidth = window.innerWidth;

        // Offset the tooltip position to account for its arrow/pointer
        const offset = 13;

        // Height offset to not overlap labels
        const heightOffset = 25;

        // Initial position
        const xPosition = this.props.width * 0.5;
        const yPosition = this.props.height * 0.5;

        // Define initial quadrants and offsets
        let leftRightDirection = 'left';
        let topBottomDirection = 'top';
        let leftOffset = `${(this.props.x + xPosition) + offset}px`;
        let topOffset = `${(this.props.height / 2) + heightOffset}px`;

        // Determine which quadrant the tooltip should appear in
        if (this.props.x + xPosition + tooltipWidth >= windowWidth - containerPadding) {
            leftRightDirection = 'right';
        }

        if (this.props.y >= ((this.props.sectionHeight / 2) - 50)) {
            topBottomDirection = 'bottom';
        }

        // Always use bottom positioning for subfunctions due to height constraints
        if (this.props.isSubfunctions) {
            topBottomDirection = 'bottom';
        }

        // Position the tooltip based on quadrant
        // Bottom left
        if (leftRightDirection === 'left' && topBottomDirection === 'bottom') {
            topOffset = `${(this.props.y + yPosition) - (tooltipHeight + heightOffset)}px`;
        }
        // Top right
        else if (leftRightDirection === 'right' && topBottomDirection === 'top') {
            leftOffset = `${((this.props.x + (this.props.width / 2)) - (tooltipWidth + offset))}px`;
        }
        // Bottom right
        else if (leftRightDirection === 'right' && topBottomDirection === 'bottom') {
            leftOffset = `${((this.props.x + (this.props.width / 2)) - (tooltipWidth + offset))}px`;
            topOffset = `${(this.props.y + yPosition) - (tooltipHeight + heightOffset)}px`;
        }

        let size = '';
        if (this.props.showSub || this.props.arrow) {
            size = ' small';
        }

        this.pointerDiv.className = `tooltip-pointer ${topBottomDirection}-${leftRightDirection}`;
        this.div.style.top = topOffset;
        this.div.style.left = leftOffset;
        this.div.className = `tooltip ${topBottomDirection}${size}`;
    }

    render() {
        let desc = (
            <div className="tooltip-full">
                <div className="tooltip-value">
                    {this.props.value} | {this.props.percentage}
                </div>
                <div className="tooltip-description">
                    {this.props.description}
                </div>
            </div>);
        let smallValue = '';

        if (this.props.showSub === true || this.props.arrow) {
            desc = '';
            smallValue = ' small';
        }

        let footer = null;
        if (!this.props.showSubfunctions) {
            footer = (<div className="tooltip-footer">
                Click on the block to see sub-functions for {this.props.name}.
            </div>);
        }

        return (
            <div
                className="visualization-tooltip"
                ref={(div) => {
                    this.containerDiv = div;
                }}>
                <div
                    className={`tooltip${smallValue}`}
                    ref={(div) => {
                        this.div = div;
                    }}>
                    <div
                        className="tooltip-pointer"
                        ref={(div) => {
                            this.pointerDiv = div;
                        }} />
                    <div className="tooltip-title">
                        {this.props.name}
                    </div>
                    <div className="tooltip-body center">
                        {desc}
                    </div>
                    { footer }
                </div>
            </div>
        );
    }
}

TreeMapTooltip.propTypes = propTypes;
