/**
 * TotalObligationsOverTimeVisualization.jsx
 * Created by Jonathan Hill 04/08/21
 */

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { scaleLinear } from 'd3-scale';
import { format, getYear } from 'date-fns';

import { getYDomain, getMilliseconds } from 'helpers/agencyV2/visualizations/TotalObligationsOverTimeVisualizationHelper';
import { xLabelHeightPlusPadding, yOffsetForPathStrokeWidth, defaultPadding } from 'dataMapping/agencyV2/visualizations/totalObligationsOverTime';
import Paths from 'components/agencyV2/visualizations/totalObligationsOverTime/paths/Paths';
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
    padding = defaultPadding,
    data = [],
    fy = getYear(new Date(Date.now()))
}) => {
    const [xDomain, setXDomain] = useState([]);
    const [yDomain, setYDomain] = useState([]);
    const [xScale, setXScale] = useState(null);
    const [yScale, setYScale] = useState(null);
    const [xScaleForPath, setXScaleForPath] = useState(null);
    const [yScaleForPath, setYScaleForPath] = useState(null);
    const [xTicks, setXTicks] = useState([]);
    const [dataWithFirstCoordinate, setDataWithFirstCoordinate] = useState([]);
    // x domain
    useEffect(() => {
        // start of the domain is October 1st of the prior selected fiscal year midnight local time
        const start = new Date(parseInt(fy, 10) - 1, 9, 1);
        // end of the domain is September 30th midnight local time
        const end = new Date(`${fy}`, 8, 30);
        setXDomain([getMilliseconds(start), getMilliseconds(end)]);
    }, [fy]);
    // add first data point as start of graph
    useEffect(() => {
        if (xDomain.length && data.length) {
            setDataWithFirstCoordinate([{ endDate: xDomain[0], obligated: 0 }, ...data]);
        }
    }, [xDomain, data]);
    // y domain
    useEffect(() => setYDomain(getYDomain(data)), [data]);
    /**
     * set x scale
     * - The range max value removes padding left and right since that is padding for the
     * x-axis labels overflowing outside of the graph based on the mock
     * and not going to be part of the graphable width.
     */
    useEffect(() => {
        setXScale(() => scaleLinear().domain(xDomain).range([0, width - padding.left - padding.right]));
    },
    [xDomain, width]);
    /**
     * set y scale
     * - The range max value removes padding top and bottom since that is padding for the top based on the mock and
     * bottom x-axis labels and not going to be part of the graphable width.
     */
    useEffect(() => {
        setYScale(() => scaleLinear().domain(yDomain).range([0, height - padding.top - padding.bottom]));
        setYScaleForPath(() => scaleLinear().domain(yDomain).range([0, height - padding.top - padding.bottom - yOffsetForPathStrokeWidth]));
    }, [yDomain, data]);

    // set x ticks
    useEffect(() => {
        if (xScale) {
            setXTicks([
                {
                    x: isNaN(xScale(xDomain[0])) ? 0 : xScale(xDomain[0]) + padding.left,
                    y: (height - padding.bottom - padding.top) + xLabelHeightPlusPadding,
                    label: format(new Date(xDomain[0]), "MMM 'FY'yy")
                },
                {
                    x: isNaN(xScale(xDomain[1])) ? 0 : xScale(xDomain[1]) + padding.left,
                    y: (height - padding.bottom - padding.top) + xLabelHeightPlusPadding,
                    label: format(new Date(xDomain[1]), "MMM 'FY'yy")
                }
            ]);
        }
    }, [xScale, xDomain]);

    return (
        <svg
            className="total-obligations-over-time-svg"
            height={height}
            width={width}>
            <g className="total-obligations-over-time-svg-body">
                <Paths
                    data={dataWithFirstCoordinate}
                    xDomain={xDomain}
                    yDomain={yDomain}
                    xScale={xScale}
                    yScale={yScale}
                    yScaleForPath={yScaleForPath}
                    height={height}
                    padding={padding} />
                <Axis
                    padding={padding}
                    width={width}
                    height={height}
                    xTicks={xTicks} />
            </g>
        </svg>
    );
};

TotalObligationsOverTimeVisualization.propTypes = propTypes;
export default TotalObligationsOverTimeVisualization;
