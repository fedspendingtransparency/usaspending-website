/**
 * BarYAxis.jsx
 * Created by Kevin Li 12/19/16
 */

import React from 'react';
import * as d3 from 'd3';

import _ from 'lodash';

import BarYAxisItem from './BarYAxisItem';

const defaultProps = {
    paddingLeft: 0,
    paddingBottom: 0,
    paddingTop: 0
};

const propTypes = {
    width: React.PropTypes.number.isRequired,
    height: React.PropTypes.number.isRequired,
    paddingLeft: React.PropTypes.number,
    paddingBottom: React.PropTypes.number
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

        const graphHeight = this.props.height - this.props.paddingBottom - this.props.paddingTop;

        // const axisScale = d3.scaleLinear().domain(yValues).range([_.min(yValues), _.max(yValues)]);
        // const ticks = axisScale.ticks(6);

        const scale = d3.scaleLinear()
            .domain([_.min(yValues), _.max(yValues)])
            .range([0, graphHeight]);

        const xPos = 20;

        const tickLabels = scale.ticks(6);
        const tickPositions = _.reverse(_.clone(tickLabels));

        const lineStart = this.props.paddingLeft;
        const lineEnd = this.props.width - this.props.paddingRight;

        const labels = tickLabels.map((tick, i) => {
            // adjust the y position of the labels to account for the top padding
            const yPos = scale(tickPositions[i]) + this.props.paddingTop;
            return (<BarYAxisItem
                x={xPos}
                y={yPos + 10}
                label={tick}
                key={`label-y-${tick}`}
                lineStart={lineStart}
                lineEnd={lineEnd} />);
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
                    x1={this.props.paddingLeft}
                    y1={this.props.paddingTop}
                    x2={this.props.paddingLeft}
                    y2={this.props.height - this.props.paddingBottom + this.props.paddingTop} />
                <g className="axis-labels">
                    {this.state.labels}
                </g>
            </g>
        );
    }
}

BarXAxis.propTypes = propTypes;
BarXAxis.defaultProps = defaultProps;
