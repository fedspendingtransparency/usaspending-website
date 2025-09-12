/**
 * SankeyFlow.jsx
 * Created by Kevin Li 3/27/17
 */

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { interpolateNumber } from 'd3-interpolate';

const propTypes = {
    startY: PropTypes.number,
    endY: PropTypes.number,
    height: PropTypes.number,
    length: PropTypes.number,
    description: PropTypes.string,
    style: PropTypes.object
};

const SankeyFlow = ({
    startY, endY, height, length, description = '', style
}) => {
    const [path, setPath] = useState('');

    const calculatePath = () => {
        let pathLocal = '';

        // start at the 0, startY position, then move right 2px to account for the 2px offset
        pathLocal += `M0,${startY}L2,${startY}`;

        // calculate the curve (going from 2 to length -2 to account for the offset)
        const curve = interpolateNumber(2, length);

        pathLocal += `C${curve(0.5)},${startY}`;
        pathLocal += ` ${curve(0.5)},${endY}`;

        // move to the end (length, endY), then move right 2px more to account for the offset
        pathLocal += ` ${length},${endY}L${length + 4},${endY}`;

        // create the height by moving downard height px
        pathLocal += ` L${length + 4},${endY + height}`;
        // move left 2px to account for the offset
        pathLocal += `L${length},${endY + height}`;
        // go back to the start but at the bottom
        pathLocal += `C${curve(0.5)},${endY + height}`;
        pathLocal += ` ${curve(0.5)},${startY + height}`;
        // end 2px to the right of the starting point due to the offset
        pathLocal += ` 2,${startY + height}`;
        // now move left 2px to end the path
        pathLocal += `L0,${startY + height}`;

        // close the path
        pathLocal += 'Z';

        setPath(pathLocal);
    };

    useEffect(() => {
        calculatePath();
    });

    if (height <= 0) {
        return null;
    }

    return (
        <g
            transform="translate(-2,0)"
            aria-label={description}>
            <desc>{description}</desc>
            <path
                className="flow-path"
                d={path}
                style={style} />
        </g>
    );
};

SankeyFlow.propTypes = propTypes;
export default SankeyFlow;
