/**
 * MinimizedBudgetFunctionsTooltip.jsx
 * Created by michaelbray on 5/30/17.
 */

import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    name: PropTypes.string,
    height: PropTypes.number,
    x: PropTypes.number,
    y: PropTypes.number,
    width: PropTypes.number,
    hideArrow: PropTypes.bool
};

export default class MinimizedBudgetFunctionsTooltip extends React.Component {
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
        const direction = 'bottom';

        const classValue = `tooltip ${direction} small`;
        let hideValue = '';
        if (this.props.hideArrow) {
            hideValue = ' hide';
        }

        this.pointerDiv.className = `tooltip-pointer top${hideValue}`;

        const topDirection = `${(this.props.y + this.props.height)}px`;
        const leftDirection = `${(this.props.x + (this.props.width / 2)) - (tooltipWidth / 2)}px`;

        this.div.style.top = topDirection;
        this.div.style.left = leftDirection;
        this.div.className = classValue;
    }

    render() {
        return (
            <div
                className="visualization-tooltip"
                ref={(div) => {
                    this.containerDiv = div;
                }}>
                <div
                    className={`tooltip small`}
                    ref={(div) => {
                        this.div = div;
                    }}>
                    <div
                        className="tooltip-pointer"
                        ref={(div) => {
                            this.pointerDiv = div;
                        }} />
                    <div className="tooltip-body center">
                        {this.props.name}
                    </div>
                </div>
            </div>
        );
    }
}

MinimizedBudgetFunctionsTooltip.propTypes = propTypes;
