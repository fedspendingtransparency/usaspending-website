/**
 * TreemapCell.jsx
 * Created by Kevin Li 8/17/17
 */

import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {

};

const TreemapCell = (props) => {
    const position = `translate(${props.x}, ${props.y})`;
    return (
        <g
            transform={position}>
            <rect
                className="explorer-cell"
                x={0}
                y={0}
                width={props.width}
                height={props.height}
                style={{
                    fill: props.color
                }} />
        </g>
    );
};

TreemapCell.propTypes = propTypes;

export default TreemapCell;
