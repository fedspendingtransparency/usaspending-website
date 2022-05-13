/**
 * AreaPath.jsx
 * Created by Jonathan Hill 04/12/21
 */

import React, { useEffect, useState } from 'react';
import { pathDefinition } from 'helpers/agency/visualizations/TotalObligationsOverTimeVisualizationHelper';
import PropTypes from 'prop-types';

const propTypes = {
    classname: PropTypes.string,
    description: PropTypes.string,
    data: PropTypes.array,
    xScale: PropTypes.func,
    yScale: PropTypes.func,
    xProperty: PropTypes.string,
    yProperty: PropTypes.string,
    height: PropTypes.number,
    width: PropTypes.number,
    padding: PropTypes.shape({
        left: PropTypes.number,
        right: PropTypes.number,
        bottom: PropTypes.number,
        top: PropTypes.number
    }),
    scenario: PropTypes.string
};

const AreaPath = ({
    classname = "",
    description,
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
    },
    scenario
}) => {
    const [d, setD] = useState('');
    useEffect(() => {
        if (xScale && yScale) {
            setD(pathDefinition(
                data,
                xScale,
                xProperty,
                padding,
                yScale,
                yProperty,
                height,
                (scenario === 'exceedsMin' || scenario === 'exceedsMaxAndMin') ? 0 : null,
                true
            ));
        }
    }, [data, xScale, yScale, scenario]);
    return (
        <g tabIndex="0">
            <desc>{`The area under the curve representative of the following periods, dates, and obligations: ${description}`}</desc>
            <path
                className={`area-path ${classname}`}
                d={d}
                fill="url(#areaPathLinearGradient)" />
        </g>
    );
};

AreaPath.propTypes = propTypes;
export default AreaPath;
