/**
 * Path.jsx
 * Created by Jonathan Hill 04/13/21
 */

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    data: PropTypes.array,
    description: PropTypes.string,
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
    description,
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
            setD(data.reduce((path, currentItem, i) => {
                if (i === 0) {
                    const updatedPath = `${path}${xScale(currentItem[xProperty]) + padding.left},${height - yScale(currentItem[yProperty]) - padding.top - padding.bottom}`;
                    return updatedPath;
                }
                const updatedPath = `${path}L${xScale(currentItem[xProperty]) + padding.left},${height - yScale(currentItem[yProperty]) - padding.top - padding.bottom}`;
                return updatedPath;
            }, 'M'));
        }
    }, [data, xScale, yScale]);

    return (
        <path
            area-label={`The linear line representative of the following periods, dates, and obligations: ${description}`}
            tabIndex="0"
            className="path"
            d={d} />
    );
};

Path.propTypes = propTypes;
export default Path;
