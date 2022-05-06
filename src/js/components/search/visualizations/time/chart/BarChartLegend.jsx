/**
 * BarChartLegend.jsx
 * Created by Kevin Li 1/12/17
 */

import React from 'react';
import PropTypes from 'prop-types';

import BarChartLegendItem from './BarChartLegendItem';

const propTypes = {
    legend: PropTypes.arrayOf(PropTypes.object)
};

export default class BarChartLegend extends React.Component {
    render() {
        const items = this.props.legend.map((item) => (<BarChartLegendItem
            {...item}
            key={item.label} />));

        return (
            <g className="chart-legend">
                {items}
            </g>
        );
    }
}

BarChartLegend.propTypes = propTypes;
