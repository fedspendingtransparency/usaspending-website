/**
 * ActivityYAxisItem.jsx
 * Created by Lizzie Salita 5/16/19
 */

import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    x: PropTypes.number,
    y: PropTypes.number,
    label: PropTypes.string
};

export default class ActivityYAxisItem extends React.Component {
    render() {
        return (
            <g className="axis-item y-axis">
                <text textAnchor="middle" transform={`translate(${this.props.x},${this.props.y})`}>
                    {this.props.label}
                </text>
            </g>
        );
    }
}

ActivityYAxisItem.propTypes = propTypes;
