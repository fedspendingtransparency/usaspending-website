/**
 * BarChartLegend.jsx
 * Created by Kevin Li 1/12/17
 */

import React from 'react';

export default class BarChartLegend extends React.Component {
    render() {
        return (
            <g className="chart-legend">
                <circle
                    className="key-color"
                    cx="6"
                    cy="6"
                    r="6" />
                <text
                    className="key-label"
                    x="20"
                    y="10">
                    Amount Obligated
                </text>
            </g>
        );
    }
}
