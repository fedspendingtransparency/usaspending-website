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

export default class MapLegendItem extends React.Component {
    render() {
        const swatchStyle = {
            backgroundColor: this.props.color
        };

        return (
            <li className="map-legend-item-container">
                <div className="map-legend-item">
                    <div className="color-swatch" style={swatchStyle} />
                    <div className="label">
                        {this.props.label}
                    </div>
                </div>
            </li>
        );
    }
}

MapLegendItem.propTypes = propTypes;
