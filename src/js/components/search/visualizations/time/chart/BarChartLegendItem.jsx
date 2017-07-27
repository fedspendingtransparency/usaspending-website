/**
 * BarChartLegendItem.jsx
 * Created by Kevin Li 3/21/17
 */

import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    color: PropTypes.string,
    label: PropTypes.string,
    offset: PropTypes.number
};

export default class BarChartLegendItem extends React.Component {
    render() {
        return (
            <g
                className="chart-legend-item"
                transform={`translate(${this.props.offset}, 0)`}>
                <circle
                    className="key-color"
                    fill={this.props.color}
                    cx="6"
                    cy="6"
                    r="6" />
                <text
                    className="key-label"
                    x="20"
                    y="10">
                    {this.props.label}
                </text>
            </g>
        );
    }
}

BarChartLegendItem.propTypes = propTypes;
