/**
 * SankeyFlowVertical.jsx
 * Created by Kevin Li 3/27/17
 */

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { interpolateNumber } from 'd3-interpolate';

const propTypes = {
    startX: PropTypes.number,
    endX: PropTypes.number,
    width: PropTypes.number,
    length: PropTypes.number,
    description: PropTypes.string,
    style: PropTypes.object
};

const SankeyFlowVertical = ({
    startX, endX, width, length, description = '', style
}) => {
    const [path, setPath] = useState('');

    const calculatePath = () => {
        let pathLocal = '';

        // start at the startX,-2 position, then move down 2px to account for the 2px offset
        pathLocal += `M${startX},-2L${startX},0`;

        // calculate the curve (going from 2 to length -2 to account for the offset)
        const curve = interpolateNumber(2, length);

        pathLocal += `C${startX},${curve(0.5)}`;
        pathLocal += ` ${endX},${curve(0.5)}`;

        // move to the end (length, endY), then move right 2px more to account for the offset
        pathLocal += ` ${endX},${length}L${endX},${length + 2}`;

        // create the height by moving downward height px
        pathLocal += ` L${endX + width},${length + 2}`;
        // move left 2px to account for the offset
        pathLocal += `L${endX + width},${length}`;
        // go back to the start but at the bottom
        pathLocal += `C${endX + width},${curve(0.5)}`;
        pathLocal += ` ${startX + width},${curve(0.5)}`;
        // end 2px to the right of the starting point due to the offset
        pathLocal += ` ${startX + width},0`;
        // now move left 2px to end the pathLocal
        pathLocal += `L${startX + width},-2`;

        // close the pathLocal
        pathLocal += 'Z';

        setPath(pathLocal);
    };

    useEffect(() => {
        calculatePath();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [width]);

    if (width <= 0) {
        return null;
    }

    return (
        <g
            transform="translate(0,0)"
            aria-label={description}>
            <desc>{description}</desc>
            <path
                className="flow-path"
                d={path}
                style={style} />
        </g>
    );
};

SankeyFlowVertical.propTypes = propTypes;
export default SankeyFlowVertical;
