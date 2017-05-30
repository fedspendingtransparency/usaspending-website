/**
 * MinimizedBudgetFunctionsCell.jsx
 * Created by michaelbray on 5/30/17.
 */

import React from 'react';

const propTypes = {
    x0: React.PropTypes.number,
    y0: React.PropTypes.number,
    functionID: React.PropTypes.number,
    color: React.PropTypes.string,
    strokeColor: React.PropTypes.string,
    strokeOpacity: React.PropTypes.number,
    changeActiveSubfunction: React.PropTypes.func,
    toggleTooltipIn: React.PropTypes.func,
    toggleTooltipOut: React.PropTypes.func,
    height: React.PropTypes.number,
    width: React.PropTypes.number
};

export default class MinimizedBudgetFunctionsCell extends React.Component {
    render() {
        return (
            <g
                transform={`translate(${this.props.x0},${this.props.y0})`}
                onMouseEnter={() => {
                    this.props.toggleTooltipIn(this.props.functionID);
                }}
                onMouseLeave={() => {
                    this.props.toggleTooltipOut();
                }}
                onClick={() => {
                    this.props.changeActiveSubfunction(this.props.functionID);
                }}>
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
