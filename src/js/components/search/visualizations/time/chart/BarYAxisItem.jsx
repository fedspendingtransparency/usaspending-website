/**
 * BarYAxisItem.jsx
 * Created by Kevin Li 12/19/16
 */

import React from 'react';

export default class BarYAxisItem extends React.Component {
    render() {
        return (
            <g className="axis-item y-axis">
                <text textAnchor="middle" transform={`translate(${this.props.x},${this.props.y + 6})`}>
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
