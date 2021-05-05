/**
 * PercentLabels.jsx
 * Created by Jonathan Hill 04/27/21
 */

import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

import {
    amountsPadding,
    startOfChartY,
    rectangleHeight,
    labelTextAdjustment
} from 'dataMapping/covid19/amountsVisualization';

const propTypes = {
    width: PropTypes.number
};

const PercentLabels = ({ width }) => {
    const [zeroPercentData, setZeroPercentData] = useState({
        x: 0,
        y: 0
    });
    const [oneHundredPercentData, setOneHundredPercentData] = useState({
        x: 0,
        y: 0
    });
    const zeroPercentRef = useRef(null);
    // 0%
    useEffect(() => {
        const ref = zeroPercentRef.current?.getBoundingClientRect();
        setZeroPercentData({
            y: startOfChartY + (rectangleHeight / 2) + 2,
            x: amountsPadding.left - (ref?.width || 0) - labelTextAdjustment.x
        });
    }, [width]);
    // 100%
    useEffect(() => {
        setOneHundredPercentData({
            y: startOfChartY + (rectangleHeight / 2) + 2,
            x: (width - amountsPadding.right) + labelTextAdjustment.x
        });
    }, [width]);
    return (
        <g>
            <title>Percent Labels</title>
            <g tabIndex="0" aria-label="Text representing 0%">
                <desc>Text representing 0%</desc>
                <text
                    ref={zeroPercentRef}
                    x={zeroPercentData.x}
                    y={zeroPercentData.y}>
              0%
                </text>
            </g>
            <g tabIndex="0" aria-label="Text representing 100%">
                <desc>Text representing 100%</desc>
                <text
                    x={oneHundredPercentData.x}
                    y={oneHundredPercentData.y}>
              100%
                </text>
            </g>
        </g>
    );
};

PercentLabels.propTypes = propTypes;
export default PercentLabels;
