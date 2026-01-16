/**
 * ActivityYAxis.jsx
 * Created by Lizzie Salita 5/16/19
 */

import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import * as MoneyFormatter from 'helpers/moneyFormatter';
import ActivityYAxisItem from './ActivityYAxisItem';

const propTypes = {
    height: PropTypes.number,
    padding: PropTypes.object,
    extendLine: PropTypes.number,
    scale: PropTypes.func,
    ticks: PropTypes.array,
    textAnchor: PropTypes.string
};

const ActivityYAxis = ({
    height,
    padding,
    extendLine = -10,
    scale,
    ticks,
    textAnchor
}) => {
    const [description, setDescription] = useState('');
    const [labels, setLabels] = useState([]);

    const drawAxis = useCallback(() => {
        if (!scale) {
            return;
        }
        const units = MoneyFormatter.calculateUnits(ticks);

        // generate the labels
        const tickLabels = ticks.map((tick) => {
            // determine the numerical unit to display in the Y axis labels
            let formattedValue = MoneyFormatter.formatMoneyWithPrecision(
                tick / units.unit, units.precision
            );
            if (tick === 0) {
                formattedValue = '$0';
            }
            else {
                formattedValue = `${formattedValue} ${units.unitLabel}`;
            }

            return formattedValue;
        });

        // draw the grid lines
        const lineStart = -5;
        const lineEnd = 5;

        let newDescription = '';
        if (tickLabels.length > 0) {
            newDescription = 'The Y-axis of the chart, showing a range of awarded amounts from ';
            newDescription += `${tickLabels[0]} to ${tickLabels[tickLabels.length - 1]}`;
        }

        /**
         * Default (w/ padding left) : set all the labels 20px to the left of the Y axis
         * Optional (w/ padding labels) : when passing textAnchor it is helpful to keep
         * the vertical line in place and update where we place the labels with their x
         * position with padding.labels
         */
        const xPos = (padding.labels || padding.left) - 20;

        // iterate through the D3 generated tick marks and add them to the chart
        const newLabels = ticks.map((tick, i) => {
            // calculate the X position
            // D3 scale returns the tick positions as pixels from the start of the axis (top as min)
            // but we want to display the axis as top max, bottom min, so invert the Y position by
            // subtracting from the total Y axis height
            const yPos = height - scale(tick);

            return (
                <ActivityYAxisItem
                    x={xPos}
                    y={yPos}
                    label={`${tickLabels[i]}`}
                    key={`label-y-${tick}-${i}`}
                    lineStart={lineStart}
                    lineEnd={lineEnd}
                    textAnchor={textAnchor || 'middle'} />
            );
        });

        setDescription(newDescription);
        setLabels(newLabels);
    }, [height, padding.labels, padding.left, scale, textAnchor, ticks]);

    useEffect(() => {
        drawAxis();
    }, [drawAxis]);

    /**
     * Note - When using nice we will always have a max tick at the top of the y-axis.
     * Bar height just extends the line for visual purposes to cover the max tick label.
     */
    return (
        <g className="bar-axis">
            <title>Y-Axis</title>
            <desc>
                {description}
            </desc>
            <line
                className="axis y-axis"
                x1={padding.left}
                y1={extendLine}
                x2={padding.left}
                y2={height} />
            <g className="axis-labels">
                {labels}
            </g>
        </g>
    );
};

ActivityYAxis.propTypes = propTypes;
export default ActivityYAxis;
