/**
 * MapLegendItem.jsx
 * Created by Kevin Li 2/17/17
 */

import React from 'react';

export default class MapLegendItem extends React.Component {
    render() {
        return (
            <li className="map-legend-item-container">
                <div className="map-legend-item">
                    <div className="color-swatch" />
                    <div className="label">
                        {this.props.label}
                    </div>
                </div>
            </li>
        );
    }
}
