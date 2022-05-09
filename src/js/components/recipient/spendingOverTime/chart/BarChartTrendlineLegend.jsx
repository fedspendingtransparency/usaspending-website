/**
 * BarChartTrendlineLegend.jsx
 * Created by Lizzie Salita 7/13/18
 */

import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    legend: PropTypes.arrayOf(PropTypes.object)
};

export default class BarChartTrendlineLegend extends React.Component {
    render() {
        const items = this.props.legend.map((item) => (
            <g
                key={item.label}
                className="chart-legend-item"
                transform={`translate(${item.offset}, 0)`}>
                <circle
                    className="key-color"
                    stroke={item.stroke}
                    fill={item.color}
                    strokeWidth="3"
                    cx="6"
                    cy="6"
                    r="6" />
                <text
                    className="key-label"
                    x="20"
                    y="10">
                    {item.label}
                </text>
            </g>
        ));

        return (
            <g className="chart-legend">
                {items}
            </g>
        );
    }
}

BarChartTrendlineLegend.propTypes = propTypes;
