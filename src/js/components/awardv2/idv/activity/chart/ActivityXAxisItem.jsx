/**
 * ActivityXAxisItem.jsx
 * Created by Lizzie Salita 5/16/19
 */

import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    x: PropTypes.number,
    y: PropTypes.number,
    label: PropTypes.string,
    transform: PropTypes.string,
    line: PropTypes.bool
};

export default class ActivityXAxisItem extends React.Component {
    render() {
        const {
            x,
            y,
            label,
            transform,
            line
        } = this.props;
        return (
            <g className="axis-item x-axis">
                {line && <line
                    className="axis y-axis"
                    x1={x}
                    y1={y - 12}
                    x2={x}
                    y2={y - 20} />}
                <text
                    className="x-axis__text"
                    textAnchor="middle"
                    transform={transform || `translate(${x},${y})`}>
                    {label}
                </text>
            </g>
        );
    }
}

ActivityXAxisItem.propTypes = propTypes;
