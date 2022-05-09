/**
 * BarChartYAxis.jsx
 * Created by Kevin Li 7/26/17
 */

import React from 'react';
import PropTypes from 'prop-types';

import BarChartYAxisItem from './BarChartYAxisItem';

const propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    items: PropTypes.array,
    line: PropTypes.object,
    x: PropTypes.number,
    y: PropTypes.number
};

export default class BarChartYAxis extends React.Component {
    render() {
        const labels = this.props.items.map((item) => (
            <BarChartYAxisItem
                {...item}
                key={item.label.value} />
        ));

        return (
            <g
                className="bar-axis"
                transform={`translate(${this.props.x},${this.props.y})`}>
                <title>{this.props.title}</title>
                <desc>{this.props.description}</desc>
                <g>
                    <line
                        className="y-axis"
                        x1={this.props.line.x1}
                        x2={this.props.line.x2}
                        y1={this.props.line.y1}
                        y2={this.props.line.y2} />
                </g>
                <g className="axis-labels">
                    {labels}
                </g>
            </g>
        );
    }
}

BarChartYAxis.propTypes = propTypes;
