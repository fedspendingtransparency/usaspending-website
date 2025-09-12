/**
 * BarXAxis.jsx
 * Created by Kevin Li 12/19/16
 */

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import BarXAxisItem from './BarXAxisItem';

const propTypes = {
    top: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    padding: PropTypes.object,
    axisPos: PropTypes.number,
    visualizationPeriod: PropTypes.string,
    data: PropTypes.array,
    scale: PropTypes.func,
    rawLabels: PropTypes.array
};

const BarXAxis = ({
    top,
    width = 0,
    padding = {
        left: 0,
        bottom: 0,
        top: 0,
        right: 0
    },
    axisPos,
    visualizationPeriod,
    data,
    scale,
    rawLabels
}) => {
    const [description, setDescription] = useState('');
    const [labels, setLabels] = useState([]);

    // componentDidUpdate(prevProps) {
    //     if (!isEqual(prevProps, props)) {
    //         drawAxis(props);
    //     }
    // }

    // Calcuate how many periods until the end of the FY so that the year label
    // is placed correctly
    const calculateDateOffset = (item, type) => {
        const period = item.period;
        if (type === 'month') {
            // Fiscal year starts in October, so calculate how many months until the
            // end of the year
            // Mod 12 because 12 month offset == to 0 month offset
            const months = ['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May',
                'Jun', 'Jul', 'Aug', 'Sep'];
            return (12 - months.indexOf(period)) % 12;
        }
        // Calculate how many quarters left in the year
        // Mod 4 because 4 quarter offset  == 0 quarter offset
        const quarters = ['Q1', 'Q2', 'Q3', 'Q4'];
        return (4 - quarters.indexOf(period)) % 4;
    };

    // Finds the end of the year for a range of dates
    // Only matters for the first section and last since the date range can start
    // in the middle or not be finished yet. Every other date should be a full range
    const calculateEndIndex = (index, type, offset) => {
        // Blocks of 4 for quarters (0-3)
        if (type === 'quarter') {
            let endIndex = index + 3;
            if (index < offset) {
                endIndex = offset - 1;
            }
            if (endIndex >= data.length) {
                endIndex = data.length - 1;
            }
            return endIndex;
        }

        // Blocks of 12 for monthly (0-11)
        let endIndex = index + 11;
        if (index < offset) {
            endIndex = offset - 1;
        }
        if (endIndex >= data.length) {
            endIndex = data.length - 1;
        }
        return endIndex;
    };

    // Gets the content of the label, year, break apart the quarter, or
    // Fiscal year increments if the date range started between oct-dec
    const calculateLabel = (item) => {
        if (visualizationPeriod === 'fiscal_year') {
            return item.year;
        }
        const year = item.year;
        if (visualizationPeriod === 'quarter') {
            return year;
        }
        const months = ['Oct', 'Nov', 'Dec'];
        const increment = months.indexOf(item.period) !== -1 ? 1 : 0;
        return (parseInt(year, 10) + increment).toString();
    };

    // Finds the position of the label, under bar for years or
    // average start and end for monthly/quarterly
    const calculateXPos = (item, index, labelOffset) => {
        if (visualizationPeriod === 'fiscal_year') {
            return scale(item.year) + (scale.bandwidth() / 2);
        }
        const endIndex = calculateEndIndex(
            index,
            data,
            visualizationPeriod,
            labelOffset);

        // Need to use data because you cant scale by objects
        return (scale(data[index]) + scale(data[endIndex]) + scale.bandwidth()) / 2;
    };

    const parseLabels = () => {
        if (!data || data.length === 0) {
            return data;
        }

        // Figure out which labels to show depending on type
        let labelIterator = 1;
        let labelOffset = 0;
        // Year has 4 quarters
        if (visualizationPeriod === "quarter") {
            labelIterator = 4;
        }
        else if (visualizationPeriod === "month") {
            labelIterator = 12;
        }

        // Get offset in case of first period
        if (visualizationPeriod !== "fiscal_year" && rawLabels) {
            labelOffset = calculateDateOffset(rawLabels[0], visualizationPeriod);
        }

        return (
            rawLabels.map((item, index) => {
                // offset the D3 calculated position by the left padding and put the label in
                // the middle
                // of the each tick's width to center the text
                if ((index - labelOffset) % labelIterator !== 0 && index !== 0) {
                    return null;
                }

                // Figure out what to call the label and where to place it
                const label = calculateLabel(item);
                const xPos = calculateXPos(item, index, labelOffset);

                return (<BarXAxisItem
                    x={xPos}
                    y={15}
                    label={label}
                    key={`label-x-${item}-${index}`} />);
            })
        );
    };

    const drawAxis = () => {
        if (!scale) {
            return;
        }

        // generate the X axis labels
        const labelsLocal = parseLabels();
        let descriptionLocal = '';

        if (data.length > 0) {
            descriptionLocal =
                `The X-axis of the chart, showing a range of time periods from ${
                    data[0]
                } to ${
                    data[data.length - 1]}
                `;
        }

        setLabels(labelsLocal);
        setDescription(descriptionLocal);
    };

    useEffect(() => {
        drawAxis();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        top,
        width,
        padding,
        axisPos,
        visualizationPeriod,
        data,
        scale,
        rawLabels
    ]);

    // draw the X axis at the zero Y-axis position (multiply by negative to account for the
    // fact that the bar axis group is shifted downward)
    return (
        <g
            className="bar-axis"
            transform={`translate(${padding.left},${top})`}>
            <title>X-Axis</title>
            <desc>
                {description}
            </desc>
            <line
                className="x-axis"
                x1={0}
                y1={-1 * axisPos}
                x2={width}
                y2={-1 * axisPos} />
            <g className="axis-labels">
                {labels}
            </g>
        </g>
    );
};

BarXAxis.propTypes = propTypes;
export default BarXAxis;
