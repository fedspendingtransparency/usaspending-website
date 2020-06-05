/**
 * SankeyNode.jsx
 * Created By Jonathan Hill 06/04/20
 */

import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    name: PropTypes.string,
    x0: PropTypes.number,
    x1: PropTypes.number,
    y0: PropTypes.number,
    y1: PropTypes.number,
    color: PropTypes.string,
    keyName: PropTypes.string
};

const SankeyNode = ({ keyName, name, x0, x1, y0, y1, color }) => (
    <rect key={keyName} x={x0} y={y0} width={x1 - x0} height={y1 - y0} fill={color}>
        <title>{name}</title>
    </rect>
);

SankeyNode.propTypes = propTypes;
export default SankeyNode;
