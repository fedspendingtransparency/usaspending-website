/**
 * ActivityXAxis.jsx
 * Created by Lizzie Salita 5/16/19
 */

import React from 'react';
import PropTypes from 'prop-types';
import { isEqual } from 'lodash';
import ActivityXAxisItem from './ActivityXAxisItem';

const defaultProps = {
    padding: {
        left: 0,
        bottom: 0,
        top: 0,
        right: 0
    },
    width: 0
};

const propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    padding: PropTypes.object,
    line: PropTypes.bool,
    transformLabels: PropTypes.object,
    scale: PropTypes.func,
    ticks: PropTypes.array,
    removeFirstLabel: PropTypes.bool,
    removeLastLabel: PropTypes.bool
};

const yOffset = 20;

const labelOffset = 15;

export default class ActivityXAxis extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            description: '',
            labels: [],
            gridLines: []
        };
    }

    componentDidUpdate(prevProps) {
        if (!isEqual(prevProps, this.props)) {
            this.drawAxis();
        }
    }

    drawAxis = () => {
        const {
            scale,
            ticks,
            height,
            width,
            line,
            transformLabels,
            removeFirstLabel,
            removeLastLabel
        } = this.props;
        if (!scale) {
            return;
        }
        // isolate the labels
        const tickLabels = ticks.map((tick) => tick.label);

        // draw the grid lines
        const lineStart = -5;
        const lineEnd = 5;

        let description = '';
        if (tickLabels.length > 0) {
            description = `The X-axis of the chart, showing a range of dates from `;
            description += `${tickLabels[0]} to ${tickLabels[tickLabels.length - 1]}`;
        }

        // set all the labels 20px below the X axis
        const yPos = height + yOffset;

        // iterate through the D3 generated tick marks and add them to the chart
        const labels = ticks.map((tick, i, array) => {
            // calculate the X position
            // D3 scale returns the tick positions as pixels
            const xPos = scale(tick.date);
            // remove erroneous ticks
            if (xPos >= width) return null;
            if (xPos < 0) return null;
            // allows for the removal of the first and last tick labels
            if (removeFirstLabel && i === 0) return null;
            if (removeLastLabel && i === (array.length - 1)) return null;
            // adjust the display of the labels
            const translateX = xPos - ((transformLabels?.x || transformLabels?.x === 0) ? transformLabels?.x : labelOffset);
            const translateY = yPos + ((transformLabels?.y || transformLabels?.y === 0) ? transformLabels?.y : labelOffset);
            const rotateLabel = (transformLabels?.rotate || transformLabels?.rotate === 0) ? transformLabels?.rotate : 325;
            const transform = `translate(${translateX},${translateY}) rotate(${rotateLabel})`;

            return (<ActivityXAxisItem
                x={xPos}
                y={yPos}
                label={`${tickLabels[i]}`}
                key={`label-y-${tick}-${i}`}
                lineStart={lineStart}
                lineEnd={lineEnd}
                transform={transform}
                line={line || false} />);
        });

        this.setState({
            labels,
            description
        });
    };

    render() {
        return (
            <g
                className="bar-axis"
                transform={`translate(${this.props.padding.left},0)`}>
                <title>X-Axis</title>
                <desc>
                    {this.state.description}
                </desc>
                <line
                    className="axis x-axis"
                    x1={0}
                    y1={this.props.height}
                    x2={this.props.width}
                    y2={this.props.height} />
                <g className="axis-labels">
                    {this.state.labels}
                </g>
            </g>
        );
    }
}

ActivityXAxis.propTypes = propTypes;
ActivityXAxis.defaultProps = defaultProps;
