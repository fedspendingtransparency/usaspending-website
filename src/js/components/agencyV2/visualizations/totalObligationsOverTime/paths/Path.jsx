/**
 * Path.jsx
 * Created by Jonathan Hill 04/13/21
 */

import React, { useEffect, useState } from 'react';
import { line } from 'd3-shape';
import PropTypes from 'prop-types';

const propTypes = {
    data: PropTypes.array,
    xDomain: PropTypes.array,
    yDomain: PropTypes.array,
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

const Path = ({
    data = [],
    xDomain = [0, 0],
    yDomain = [0, 0],
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
            const path = line() // defaults to curveLinear from the curve factory (https://github.com/d3/d3-shape#lines)
                // .defined((z) => z[xProperty] < xDomain[1] && z[xProperty] > xDomain[0] && z[yProperty] < yDomain[1] && z[yProperty] > yDomain[0])
                .x((z) => xScale(z[xProperty]) + padding.left)
                .y((z) => height - (yScale(z[yProperty])) - padding.top - padding.bottom);
            setD(path(data));
        }
    }, [data, xScale, yScale]);

    return <path className="path" d={d} />;
};

Path.propTypes = propTypes;
export default Path;
