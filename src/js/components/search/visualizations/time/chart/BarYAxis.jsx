/**
 * BarYAxis.jsx
 * Created by Kevin Li 12/19/16
 */

import React from 'react';
import * as d3 from 'd3';

import _ from 'lodash';

import BarYAxisItem from './BarYAxisItem';

const defaultProps = {
    paddingX: 0,
    paddingY: 0,
    paddingTop: 0
};

const propTypes = {
    width: React.PropTypes.number.isRequired,
    height: React.PropTypes.number.isRequired,
    paddingX: React.PropTypes.number,
    paddingY: React.PropTypes.number
};

export default class BarXAxis extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            labels: [],
            gridLines: []
        };
    }
    componentDidMount() {
        this.drawAxis();
    }

    componentDidUpdate(prevProps) {
        if (prevProps !== this.props) {
            this.drawAxis();
        }
    }

    drawAxis() {
        const yValues = [];
        this.props.data.forEach((item) => {
            yValues.push(item.y);
        });

        const axisScale = d3.scaleLinear().domain(yValues).range([_.min(yValues), _.max(yValues)]);
        const ticks = axisScale.ticks(6);

        const axisHeight = this.props.height - this.props.paddingY - this.props.paddingTop;

        const labels = ticks.map((tick, i) => {
            const yPos = axisHeight - ((axisHeight / (ticks.length - 1)) * i) + this.props.paddingTop;
            return (<BarYAxisItem
                x={20}
                y={yPos + 10}
                label={tick}
                key={`label-y-${tick}`} />);
        });

        this.setState({
            labels
        });
    }

    render() {
        return (
            <g className="bar-axis">
                <title>Y-Axis</title>
                <desc>
                    The Y-axis of the chart, showing a range of spending from YYY to YYY
                </desc>
                <line
                    className="y-axis"
                    x1={this.props.paddingX}
                    y1={this.props.paddingTop}
                    x2={this.props.paddingX}
                    y2={this.props.height - this.props.paddingY + this.props.paddingTop} />
                <g className="axis-labels">
                    {this.state.labels}
                </g>
                <g className="grid-lines y-axis">
                    {this.state.gridLines}
                </g>
            </g>
        );
    }
}

BarXAxis.propTypes = propTypes;
BarXAxis.defaultProps = defaultProps;
