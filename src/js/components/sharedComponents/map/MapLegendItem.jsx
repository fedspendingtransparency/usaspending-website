/**
 * MapLegendItem.jsx
 * Created by Kevin Li 2/17/17
 */

import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    color: PropTypes.string,
    label: PropTypes.string
};

const MapLegendItem = ({ color, label }) => (
    <li className="map-legend-item-container">
        <div className="map-legend-item">
            <div
                className="color-swatch"
                style={{ backgroundColor: color }} />
            <div className="label">
                {label}
            </div>
        </div>
    </li>
);

MapLegendItem.propTypes = propTypes;
export default MapLegendItem;
