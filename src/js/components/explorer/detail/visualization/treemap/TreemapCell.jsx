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
            className="explorer-cell"
            transform={position}>
            <rect
                x={0}
                y={0}
                width={props.width}
                height={props.height}
                style={{
                    fill: props.color
                }} />
            <text
                className="explorer-cell-title"
                textAnchor="middle"
                x={props.title.x}
                y={props.title.y}>
                {props.title.text}
            </text>
            <text
                className="explorer-cell-value"
                textAnchor="middle"
                x={props.subtitle.x}
                y={props.subtitle.y}>
                {props.subtitle.text}
            </text>
        </g>
    );
};

TreemapCell.propTypes = propTypes;

export default TreemapCell;
