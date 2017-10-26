/**
 * MapLayerToggle.jsx
 * Created by Kevin Li 10/26/17
 */

import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    available: PropTypes.array,
    selectLayer: PropTypes.func
};

const capitalizeLabel = (original) => {
    const regexFirstLetter = /(^|\s)[a-z]/g;
    return original.replace(regexFirstLetter, (match) => match.toUpperCase());
};

const MapLayerToggle = (props) => {
    const items = props.available.map((layer) => {
        const title = capitalizeLabel(props.sources[layer].label);
        return (
            <li
                key={layer}>
                <button
                    className="map-layer-option"
                    onClick={props.selectLayer}
                    title={`Display by ${title}`}
                    aria-label={`Display by ${title}`}>
                    {title}
                </button>
            </li>
        );
    });

    return (
        <div className="map-layer-toggle">
            <ul className="map-layer-list">
                {items}
            </ul>
        </div>
    );
};

MapLayerToggle.propTypes = propTypes;

export default MapLayerToggle;
