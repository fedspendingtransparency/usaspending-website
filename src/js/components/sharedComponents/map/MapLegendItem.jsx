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

export default function MapLegendItem(props) {
    const swatchStyle = {
        backgroundColor: props.color
    };

    return (
        <li className="map-legend-item-container">
            <div className="map-legend-item">
                <div className="color-swatch" style={swatchStyle} />
                <div className="label">
                    {props.label}
                </div>
            </div>
        </li>
    );
}

MapLegendItem.propTypes = propTypes;
