/**
 * ActivityXAxis.jsx
 * Created by Lizzie Salita 5/16/19
 */

import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ActivityXAxisItem from './ActivityXAxisItem';

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

const ActivityXAxis = ({
    width = 0,
    height,
    padding = {
        left: 0,
        bottom: 0,
        top: 0,
        right: 0
    },
    line,
    transformLabels,
    scale,
    ticks,
    removeFirstLabel,
    removeLastLabel
}) => {
    const [description, setDescription] = useState('');
    const [labels, setLabels] = useState([]);

    const yOffset = 20;
    const labelOffset = 15;
    const rotate = transformLabels?.rotate;
    const x = transformLabels?.x;
    const y = transformLabels?.y;

    const drawAxis = useCallback(() => {
        if (!scale) {
            return;
        }
        // isolate the labels
        const tickLabels = ticks.map((tick) => tick.label);

        // draw the grid lines
        const lineStart = -5;
        const lineEnd = 5;

        let newDescription = '';
        if (tickLabels.length > 0) {
            newDescription = `The X-axis of the chart, showing a range of dates from `;
            newDescription += `${tickLabels[0]} to ${tickLabels[tickLabels.length - 1]}`;
        }

        // set all the labels 20px below the X axis
        const yPos = height + yOffset;

        // iterate through the D3 generated tick marks and add them to the chart
        const newLabels = ticks.map((tick, i, array) => {
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
            const translateX = xPos - ((x || x === 0) ?
                x : labelOffset);
            const translateY = yPos + ((y || y === 0) ?
                y : labelOffset);
            const rotateLabel = (rotate || rotate === 0) ?
                rotate : 325;
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

        setDescription(newDescription);
        setLabels(newLabels);
    }, [
        width,
        height,
        line,
        rotate,
        x,
        y,
        scale,
        ticks,
        removeFirstLabel,
        removeLastLabel
    ]);

    useEffect(() => {
        drawAxis();
    }, [drawAxis]);

    return (
        <g
            className="bar-axis"
            transform={`translate(${padding.left},0)`}>
            <title>X-Axis</title>
            <desc>
                {description}
            </desc>
            <line
                className="axis x-axis"
                x1={0}
                y1={height}
                x2={width}
                y2={height} />
            <g className="axis-labels">
                {labels}
            </g>
        </g>
    );
};

ActivityXAxis.propTypes = propTypes;
export default ActivityXAxis;
