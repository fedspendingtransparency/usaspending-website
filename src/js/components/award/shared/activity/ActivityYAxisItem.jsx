/**
 * ActivityYAxisItem.jsx
 * Created by Lizzie Salita 5/16/19
 */

import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    x: PropTypes.number,
    y: PropTypes.number,
    label: PropTypes.string,
    textAnchor: PropTypes.string
};

export default class ActivityYAxisItem extends React.Component {
    render() {
        const {
            x,
            y,
            label,
            textAnchor
        } = this.props;
        return (
            <g className="axis-item y-axis">
                <text
                    className="y-axis__text"
                    textAnchor={textAnchor}
                    transform={`translate(${x},${y})`}>
                    {label}
                </text>
            </g>
        );
    }
}

ActivityYAxisItem.propTypes = propTypes;
