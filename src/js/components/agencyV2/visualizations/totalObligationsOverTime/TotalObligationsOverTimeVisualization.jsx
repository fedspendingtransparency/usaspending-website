/**
 * TotalObligationsOverTimeVisualization.jsx
 * Created by Jonathan Hill 04/08/21
 */

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { scaleLinear, scaleTime } from 'd3-scale';
import { format, getYear } from 'date-fns';

import { getYDomain } from 'helpers/agencyV2/TotalObligationsOverTimeVisualizationHelper';
import Axis from './axis/Axis';

const propTypes = {
    height: PropTypes.number,
    width: PropTypes.number,
    padding: PropTypes.shape({
        left: PropTypes.number,
        right: PropTypes.number,
        bottom: PropTypes.number,
        top: PropTypes.number
    }),
    data: PropTypes.arrayOf(PropTypes.shape({
        period: PropTypes.number,
        obligated: PropTypes.number
    })),
    fy: PropTypes.string
};

const TotalObligationsOverTimeVisualization = ({
    height = 168,
    width = 0,
    padding = {
        top: 0,
        bottom: 20,
        right: 20,
        left: 20
    },
    data = [{ obligated: 0 }],
    fy = getYear(new Date(Date.now()))
}) => {
    /**
     * x domain as date objects in UTC (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/Date)
     * - start of the domain is October 1st of the prior selected fiscal year at midnight
     * - end of the domain is September 30th of the selected fiscal year one millisecond before midnight of October 1st
     */
    const [xDomain, setXDomain] = useState([new Date(parseInt(fy, 10) - 1, 9, 1), new Date(parseInt(fy, 10), 9, 30, 11, 59, 59, 999)]);
    // yDomain is the min and max of the obligation amounts
    const [yDomain, setYDomain] = useState([]);
    const [xScale, setXScale] = useState(null);
    const [yScale, setYScale] = useState(null);
    const [xTicks, setXTicks] = useState([]);

    // set the y domain on mount
    useEffect(() => setYDomain(getYDomain(data)), [data]);
    /**
     * set x scale
     * - The range max value removes padding left and right since that is padding for the
     * x-axis labels overflowing outside of the graph based on the mock
     * and not going to be part of the graphable width.
     */
    useEffect(() => setXScale(
        () => scaleTime().domain(xDomain).range(padding.left, width - padding.right)),
    [xDomain, width]);
    /**
     * set y scale
     * - The range max value removes padding top and bottom since that is padding for the bottom x-axis labels
     * and not going to be part of the graphable width. The top padding for this graph is zero but including it
     * for consistency and limit confusion.
     */
    useEffect(
        () => setYScale(scaleLinear().domain(yDomain).range(0, height - padding.top - padding.bottom)),
        [yDomain, width]);

    /**
     * set x ticks
     */
    useEffect(() => {
        if (xScale) {
            setXTicks(xScale
                .ticks()
                .map((tick) => ({
                    x: xScale(new Date(tick.getFullYear(), tick.getMonth(), tick.getDate())),
                    y: ((height + 10) - padding.bottom),
                    label: format(tick, 'MM/dd/yyyy')
                })));
        }
    }, [xScale]);

    if (xScale) console.log('Ticks :', xScale.ticks().map((tick) => new Date(tick)));
    if (xScale) console.log('Tick :', xScale.ticks().map((tick) => ({ M: tick.getMonth(), D: tick.getDate(), Y: tick.getFullYear() })));
    return (
        <svg
            className="total-obligations-over-time-svg"
            height={height}
            width={width}>
            <g className="total-obligations-over-time-svg-body">
                <Axis
                    padding={padding}
                    width={width}
                    height={height}
                    xTicks={xTicks}
                    yTicks={[]} />
            </g>
        </svg>
    );
};
TotalObligationsOverTimeVisualization.propTypes = propTypes;
export default TotalObligationsOverTimeVisualization;
