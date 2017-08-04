/**
 * MinimizedBudgetFunctionsCell.jsx
 * Created by michaelbray on 5/30/17.
 */

import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    x0: PropTypes.number,
    y0: PropTypes.number,
    functionID: PropTypes.number,
    color: PropTypes.string,
    strokeColor: PropTypes.string,
    strokeOpacity: PropTypes.number,
    changeActiveSubfunction: PropTypes.func,
    toggleTooltipIn: PropTypes.func,
    toggleTooltipOut: PropTypes.func,
    height: PropTypes.number,
    width: PropTypes.number
};

export default class MinimizedBudgetFunctionsCell extends React.Component {
    constructor(props) {
        super(props);

        this.toggleTooltipIn = this.toggleTooltipIn.bind(this);
        this.toggleTooltipOut = this.props.toggleTooltipOut.bind(this);
        this.changeActiveSubfunction = this.changeActiveSubfunction.bind(this);
    }

    toggleTooltipIn() {
        this.props.toggleTooltipIn(this.props.functionID);
    }

    changeActiveSubfunction() {
        this.props.changeActiveSubfunction(this.props.functionID);
    }

    render() {
        return (
            <g
                transform={`translate(${this.props.x0},${this.props.y0})`}
                onMouseEnter={this.toggleTooltipIn}
                onMouseLeave={this.toggleTooltipOut}
                onClick={this.changeActiveSubfunction}>
                <rect
                    className="tile"
                    width={this.props.width}
                    height={this.props.height}
                    style={{
                        fill: this.props.color,
                        stroke: this.props.strokeColor,
                        strokeOpacity: this.props.strokeOpacity,
                        strokeWidth: "1px",
                        padding: "10px"
                    }} />
            </g>
        );
    }
}

MinimizedBudgetFunctionsCell.propTypes = propTypes;
