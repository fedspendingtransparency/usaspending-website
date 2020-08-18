/**
 * SankeyLink.jsx
 * Created By Jonathan Hill 06/04/20
 */

import React from 'react';
import PropTypes, { node } from 'prop-types';
import { sankeyLinkHorizontal } from 'd3-sankey';

const propTypes = {
    link: PropTypes.object,
    color: PropTypes.string
};

const SankeyLink = ({ link, color }) => {
    if (color === 'transparent') return null; // do not draw fake data path
    return (
        <path
            d={sankeyLinkHorizontal()(link)}
            style={{
                fill: 'none',
                strokeOpacity: '.3',
                stroke: color,
                strokeWidth: Math.max(1, link.width) || 0
            }} />
    );
};

SankeyLink.propTypes = propTypes;
export default SankeyLink;
