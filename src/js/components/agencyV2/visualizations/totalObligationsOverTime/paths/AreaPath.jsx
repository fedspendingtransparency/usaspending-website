/**
 * AreaPath.jsx
 * Created by Jonathan Hill 04/12/21
 */

import React, { useEffect, useState } from 'react';
import { area } from 'd3-shape';
import PropTypes from 'prop-types';

const propTypes = {
    data: PropTypes.array,
    xScale: PropTypes.func,
    yScale: PropTypes.func,
    xProperty: PropTypes.string,
    yProperty: PropTypes.string,
    height: PropTypes.number,
    padding: PropTypes.shape({
        left: PropTypes.number,
        right: PropTypes.number,
        bottom: PropTypes.number,
        top: PropTypes.number
    })
};

const AreaPath = ({
    data = [],
    xScale = () => {},
    yScale = () => {},
    xProperty = 'endDate',
    yProperty = 'obligated',
    height = 0,
    padding = {
        top: 0,
        bottom: 0,
        right: 0,
        left: 0
    }
}) => {
    const [d, setD] = useState('');

    useEffect(() => {
        if (xScale && yScale) {
            const areaPath = area() // defaults to curveLinear from the curve factory (https://github.com/d3/d3-shape#lines)
                .x((z) => xScale(z[xProperty]) + padding.left)
                .y0(height - padding.top - padding.bottom)
                .y1((z) => height - yScale(z[yProperty]) - padding.top - padding.bottom);
            setD(areaPath(data));
        }
    }, [data, xScale, yScale]);

    return <path className="area-path" d={d} />;
};

AreaPath.propTypes = propTypes;
export default AreaPath;
