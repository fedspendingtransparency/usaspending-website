/**
 * Path.jsx
 * Created by Jonathan Hill 04/13/21
 */

import React, { useEffect, useState } from 'react';
import { pathDefinition } from 'helpers/agency/visualizations/TotalObligationsOverTimeVisualizationHelper';
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
    height,
    padding
}) => {
    const [d, setD] = useState('');

    useEffect(() => {
        if (xScale && yScale) {
            setD(pathDefinition(data, xScale, xProperty, padding, yScale, yProperty, height, null, false));
        }
    }, [data, xScale, yScale]);
    return (
        <g tabIndex="0">
            <desc>{`The linear line representative of the following periods, dates, and obligations: ${description}`}</desc>
            <path className="path" d={d} stroke="url(#pathLinearGradient)" />
        </g>
    );
};

Path.propTypes = propTypes;
export default Path;
