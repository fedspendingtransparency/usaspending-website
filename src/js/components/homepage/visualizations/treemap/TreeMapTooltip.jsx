/**
 * TreeMapTooltip.jsx
 * Created by Emily Gullo 04/28/2017
 */

import React from 'react';

const propTypes = {
    name: React.PropTypes.string,
    value: React.PropTypes.string,
    description: React.PropTypes.string,
    height: React.PropTypes.number,
    x: React.PropTypes.number,
    y: React.PropTypes.number,
    width: React.PropTypes.number,
    showSub: React.PropTypes.bool,
    percentage: React.PropTypes.string,
    arrow: React.PropTypes.bool,
    showSubfunctions: React.PropTypes.bool
};

export default class TreeMapTooltip extends React.Component {
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
        const containerPadding = this.containerDiv.getBoundingClientRect().left;
        const windowWidth = window.innerWidth;

        // Offset the tooltip position to account for its arrow/pointer
        let offset = -9;

        // Create a default xPosition
        const xPosition = this.props.width * 0.5;

        // Set the left direction by default
        let direction = 'left';

        // Position the tooltip to the other side if it's going to roll off the screen
        if (this.props.x + xPosition + tooltipWidth >= windowWidth - containerPadding) {
            // Offset the tooltip the other way
            offset = 9 + tooltipWidth;
            direction = 'right';
        }

        let leftDirection = `${(this.props.x + xPosition) - offset}px`;
        let topDirection = `${(this.props.y + this.props.height)}px`;
        let classValue = `tooltip ${direction}`;
        let size = '';

        if (this.props.showSub || this.props.arrow) {
            size = ' small';
        }

        this.pointerDiv.className = `tooltip-pointer ${direction}`;

        if (this.props.showSub || windowWidth < 768 || this.props.arrow) {
            direction = 'top';
            classValue = `tooltip ${direction}${size}`;
            this.pointerDiv.className = `tooltip-pointer ${direction} ${classValue}`;

            if (direction === 'right') {
                topDirection = `${(this.props.y + this.props.height)}px`;
                leftDirection = `${((this.props.x + (this.props.width / 2)) -
                    (tooltipWidth))}px`;
            }
            else {
                topDirection = `${(this.props.y + this.props.height)}px`;
                leftDirection = `${(this.props.x + (this.props.width / 2)) -
                    (tooltipWidth / 2)}px`;
            }
        }

        this.div.style.top = topDirection;
        this.div.style.left = leftDirection;
        this.div.className = classValue;
    }

    render() {
        let desc = (
            <div className="tooltip-center">
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
