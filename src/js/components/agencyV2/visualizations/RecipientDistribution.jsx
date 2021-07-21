/**
 * RecipientDistribution.jsx
 * Created by Afna Saifudeen 7/08/21
 */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { scaleLinear } from 'd3-scale';

const propTypes = {
    height: PropTypes.number,
    width: PropTypes.number,
    data: PropTypes.object
};

const RecipientDistribution = ({
    height = 179,
    width = 72,
    data = []
}) => {
    const [lineData, setLineData] = useState({
        y2: 0
    });
    const [rectangleData, setRectangleData] = useState({
        x: 0,
        y: 0,
        width: 0,
        height: 0
    });

    useEffect(() => {
        const yScale = scaleLinear()
            .domain([0, data.max])
            .range([0, height]);

        if (data) {
            setLineData(
                {
                    y2: yScale(data.max)
                }
            );
            const boxScale = yScale(data['75th_percentile']) - yScale(data['25th_percentile']);
            setRectangleData(
                {
                    x: 0,
                    y: height - yScale(data['25th_percentile']) - (boxScale < 1 ? 1 : boxScale),
                    width: 72,
                    height: boxScale < 1 ? 1 : boxScale
                }
            );
        }
    }, [data]);

    return (
        <svg
            className="recipient-distribution-svg"
            height={height}
            width={width}>
            <g className="recipient-distribution-svg-body">
                <line // linear scale $0 to max
                    tabIndex="0"
                    className="i-beam-line"
                    x1={36}
                    x2={36}
                    y1={0}
                    y2={lineData.y2} />
                <line // bottom tick representing $0
                    tabIndex="0"
                    className="i-beam-line"
                    x1={0}
                    x2={width}
                    y1={lineData.y2}
                    y2={lineData.y2} />
                <line // upper tick representing max
                    tabIndex="0"
                    className="i-beam-line"
                    x1={0}
                    x2={width}
                    y1={0}
                    y2={0} />
                <rect // shaded box representing 25th percentile -> 75th percentile
                    className="shaded-box"
                    x={rectangleData.x}
                    y={rectangleData.y}
                    width={rectangleData.width}
                    height={rectangleData.height} />
            </g>
        </svg>
    );
};

RecipientDistribution.propTypes = propTypes;
export default RecipientDistribution;
