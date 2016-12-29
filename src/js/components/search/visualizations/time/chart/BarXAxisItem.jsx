/**
 * BarXAxisItem.jsx
 * Created by Kevin Li 12/19/16
 */

import React from 'react';

const propTypes = {
    x: React.PropTypes.number,
    y: React.PropTypes.number,
    label: React.PropTypes.string
};

export default class BarXAxisItem extends React.Component {
    render() {
        return (
            <g className="axis-item x-axis">
                <text textAnchor="middle" transform={`translate(${this.props.x},${this.props.y})`}>
                    {this.props.label}
                </text>
            </g>
        );
    }
}

BarXAxisItem.propTypes = propTypes;
