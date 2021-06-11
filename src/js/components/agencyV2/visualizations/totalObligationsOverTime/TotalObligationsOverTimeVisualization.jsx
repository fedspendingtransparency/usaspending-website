/**
 * TotalObligationsOverTimeVisualization.jsx
 * Created by Jonathan Hill 04/08/21
 */

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { scaleLinear } from 'd3-scale';
import { format, getYear } from 'date-fns';
import { formatNumber } from 'helpers/moneyFormatter';
import { getYDomain, getMilliseconds } from 'helpers/agencyV2/visualizations/TotalObligationsOverTimeVisualizationHelper';
import { xLabelHeightPlusPadding, yOffsetForPathStrokeWidth, defaultPadding } from 'dataMapping/agencyV2/visualizations/totalObligationsOverTime';
import Paths from 'components/agencyV2/visualizations/totalObligationsOverTime/paths/Paths';
import Axis from './axis/Axis';
import TodayLineAndtext from './TodayLineAndtext';
import AgencyBudgetLine from './AgencyBudgetLine';

const propTypes = {
    height: PropTypes.number,
    width: PropTypes.number,
    padding: PropTypes.shape({
        left: PropTypes.number,
        right: PropTypes.number,
        bottom: PropTypes.number,
        top: PropTypes.number
    }),
    agencyBudget: PropTypes.number,
    data: PropTypes.arrayOf(PropTypes.shape({
        period: PropTypes.number,
        obligated: PropTypes.number
    })),
    fy: PropTypes.string,
    todaysDate: PropTypes.number
};

const TotalObligationsOverTimeVisualization = ({
    height = 179,
    width = 0,
    padding = defaultPadding,
    agencyBudget,
    data = [],
    fy = getYear(new Date(Date.now())),
    todaysDate = Date.now()
}) => {
    const [xDomain, setXDomain] = useState([]);
    const [yDomain, setYDomain] = useState([]);
    const [xScale, setXScale] = useState(null);
    const [xScaleForPath, setXScaleForPath] = useState(null);
    const [yScale, setYScale] = useState(null);
    const [yScaleForPath, setYScaleForPath] = useState(null);
    const [xTicks, setXTicks] = useState([]);
    const [dataWithFirstAndLastCoordinate, setDataWithFirstAndLastCoordinate] = useState([]);
    const [description, setDescription] = useState('');
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
            const dataWithFirstCoordinate = [{ endDate: xDomain[0], obligated: 0 }, ...data];
            // if today is within the domain
            if ((todaysDate >= xDomain[0]) && (todaysDate <= xDomain[1])) {
                // if today is greater than the most recent period close date
                if (todaysDate > dataWithFirstCoordinate[dataWithFirstCoordinate.length - 1].endDate) {
                    // add todays date as a coordinate for drawing
                    dataWithFirstCoordinate.push({ endDate: todaysDate, obligated: dataWithFirstCoordinate[dataWithFirstCoordinate.length - 1].obligated });
                }
            }
            setDataWithFirstAndLastCoordinate(dataWithFirstCoordinate);
        }
    }, [xDomain, data]);
    // y domain
    useEffect(() => setYDomain(getYDomain(data, agencyBudget)), [data, agencyBudget]);
    /**
     * set x scale
     * - The range max value removes padding left and right since that is padding for the
     * x-axis labels overflowing outside of the graph based on the mock
     * and not going to be part of the graphable width.
     */
    useEffect(() => {
        setXScale(() => scaleLinear().domain(xDomain).range([0, width - padding.left - padding.right]));
        setXScaleForPath(() => scaleLinear().domain(xDomain).range([0, width - padding.left - padding.right]));
    },
    [xDomain, width]);
    /**
     * set y scale
     * - The range max value removes padding top and bottom since that is padding for the top based on the mock and
     * bottom x-axis labels and not going to be part of the graphable width.
     */
    useEffect(() => {
        setYScale(() => scaleLinear().domain(yDomain).range([0, height - padding.top - padding.bottom]));
        setYScaleForPath(() => scaleLinear().domain(yDomain).range([1, height - padding.top - padding.bottom - yOffsetForPathStrokeWidth]));
    }, [yDomain, data]);

    // set x ticks
    useEffect(() => {
        if (xScale) {
            setXTicks([
                {
                    x: isNaN(xScale(xDomain[0])) ? 0 : xScale(xDomain[0]) + padding.left,
                    y: (height - padding.bottom) + xLabelHeightPlusPadding,
                    label: `Oct FY${fy.substring(2)}`
                },
                {
                    x: isNaN(xScale(xDomain[1])) ? 0 : xScale(xDomain[1]) + padding.left,
                    y: (height - padding.bottom) + xLabelHeightPlusPadding,
                    label: `Sep FY${fy.substring(2)}`
                }
            ]);
        }
    }, [xScale, xDomain]);

    useEffect(() => {
        setDescription(dataWithFirstAndLastCoordinate.reduce((acc, val, i, array) => {
            let newDescription = acc;
            newDescription += `Period ${val?.period || 'unknown'} with end date ${format(val.endDate, 'MM/dd/yyyy')} and obligation $${formatNumber(val.obligated)}${i + 1 !== array.length ? ',' : ''}`;
            return newDescription;
        }, ''));
    }, [dataWithFirstAndLastCoordinate]);

    return (
        <svg
            className="total-obligations-over-time-svg"
            height={height}
            width={width}>
            <g className="total-obligations-over-time-svg-body">
                <Paths
                    data={dataWithFirstAndLastCoordinate}
                    description={description}
                    xScale={xScale}
                    xScaleForPath={xScaleForPath}
                    yScale={yScale}
                    yScaleForPath={yScaleForPath}
                    height={height}
                    width={width}
                    padding={padding} />
                <Axis
                    padding={padding}
                    width={width}
                    height={height}
                    xTicks={xTicks} />
                <TodayLineAndtext
                    xScale={xScale}
                    xDomain={xDomain}
                    height={height}
                    todaysDate={todaysDate}
                    padding={padding} />
                <AgencyBudgetLine
                    data={dataWithFirstAndLastCoordinate}
                    xScale={xScale}
                    xDomain={xDomain}
                    yScale={yScale}
                    agencyBudget={agencyBudget}
                    height={height}
                    todaysDate={todaysDate}
                    padding={padding} />
            </g>
        </svg>
    );
};

TotalObligationsOverTimeVisualization.propTypes = propTypes;
export default TotalObligationsOverTimeVisualization;
