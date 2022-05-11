/**
 * Paths.jsx
 * Created by Jonathan Hill 04/13/21
 */

import React from 'react';
import PropTypes from 'prop-types';
import Path from './Path';
import AreaPath from './AreaPath';

const propTypes = {
    data: PropTypes.array,
    description: PropTypes.string,
    xScale: PropTypes.func,
    xScaleForPath: PropTypes.func,
    yScale: PropTypes.func,
    yScaleForPath: PropTypes.func,
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

const Paths = ({
    data = [],
    description,
    xScale = () => {},
    xScaleForPath = () => {},
    yScale = () => {},
    yScaleForPath = () => {},
    height,
    width,
    padding,
    scenario
}) => (
    <g className="paths">
        <AreaPath
            data={data}
            description={description}
            xScale={xScale}
            yScale={yScale}
            height={height}
            width={width}
            padding={padding}
            scenario={scenario} />
        <Path
            data={data.sort((a, b) => a.endDate - b.endDate)}
            description={description}
            xScale={xScaleForPath}
            yScale={yScaleForPath}
            height={height}
            padding={padding} />
    </g>
);

Paths.propTypes = propTypes;
export default Paths;
