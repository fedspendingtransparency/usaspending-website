/**
 * ActivityXAxisItem.jsx
 * Created by Lizzie Salita 5/16/19
 */

import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    x: PropTypes.number,
    y: PropTypes.number,
    label: PropTypes.string
};

export default class ActivityXAxisItem extends React.Component {
    render() {
        return (
            <g className="axis-item x-axis">
                <line
                    className="axis y-axis"
                    x1={this.props.x}
                    y1={this.props.y - 15}
                    x2={this.props.x}
                    y2={this.props.y - 20} />
                <text
                    className="x-axis__text"
                    textAnchor="middle"
                    transform={`translate(${this.props.x},${this.props.y})`}>
                    {this.props.label}
                </text>
            </g>
        );
    }
}

ActivityXAxisItem.propTypes = propTypes;
