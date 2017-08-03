/**
 * BarChartXAxis.jsx
 * Created by Kevin Li 7/26/17
 */

import React from 'react';
import PropTypes from 'prop-types';

import BarChartXAxisItem from './BarChartXAxisItem';

const propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    items: PropTypes.array,
    line: PropTypes.object,
    lineGroup: PropTypes.object,
    labelGroup: PropTypes.object
};

export default class BarChartXAxis extends React.Component {
    render() {
        const labels = this.props.items.map((item) => (
            <BarChartXAxisItem
                {...item}
                key={item.value} />
        ));

        return (
            <g
                className="bar-axis">
                <title>{this.props.title}</title>
                <desc>{this.props.description}</desc>
                <g
                    transform={`translate(${this.props.lineGroup.x}, ${this.props.lineGroup.y})`}>
                    <line
                        className="y-axis"
                        x1={this.props.line.x1}
                        x2={this.props.line.x2}
                        y1={this.props.line.y1}
                        y2={this.props.line.y2} />
                </g>
                <g
                    className="axis-labels"
                    transform={`translate(${this.props.labelGroup.x},${this.props.labelGroup.y})`}>
                    {labels}
                </g>
            </g>
        );
    }
}

BarChartXAxis.propTypes = propTypes;
