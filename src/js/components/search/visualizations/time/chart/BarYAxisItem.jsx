/**
 * BarYAxisItem.jsx
 * Created by Kevin Li 12/19/16
 */

import React from 'react';

const propTypes = {
    x: React.PropTypes.number,
    y: React.PropTypes.number,
    label: React.PropTypes.string,
    lineStart: React.PropTypes.number,
    lineEnd: React.PropTypes.number
};

export default class BarYAxisItem extends React.Component {
    render() {
        return (
            <g className="axis-item y-axis">
                <text textAnchor="end" transform={`translate(${this.props.x},${this.props.y + 6})`}>
                    {this.props.label}
                </text>
                <line
                    className="grid-line"
                    x1={this.props.lineStart}
                    y1={this.props.y}
                    x2={this.props.lineEnd}
                    y2={this.props.y} />

            </g>
        );
    }
}

BarYAxisItem.propTypes = propTypes;
