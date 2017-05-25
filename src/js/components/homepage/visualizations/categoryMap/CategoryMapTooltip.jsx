/**
 * CategoryMapTooltip.jsx
 * Created by Emily Gullo 04/17/2017
 */

import React from 'react';

const propTypes = {
    name: React.PropTypes.string,
    description: React.PropTypes.string,
    height: React.PropTypes.number,
    x: React.PropTypes.number,
    y: React.PropTypes.number,
    width: React.PropTypes.number
};

export default class CategoryMapTooltip extends React.Component {
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
        const windowWidth = window.innerWidth;
        let left = this.props.x + ((this.props.width - tooltipWidth) / 2);
        if (this.props.width < tooltipWidth) {
            left = this.props.x - ((tooltipWidth - this.props.width) / 2);
        }
        let top = this.props.height - 15;
        if (windowWidth < 768) {
            top = (this.props.y + this.props.height) - 20;
        }
        this.div.style.top = `${top}px`;
        this.div.style.left = `${left}px`;
        this.div.className = `tooltip`;
        this.pointerDiv.className = `tooltip-pointer top`;
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
                    <div className="tooltip-title center">
                        {this.props.name}
                    </div>
                    <div className="tooltip-body">
                        <div className="tooltip-left">
                            <div className="tooltip-description">
                                {this.props.description}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

CategoryMapTooltip.propTypes = propTypes;
