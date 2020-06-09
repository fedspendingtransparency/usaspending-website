import React from 'react';
import { TooltipWrapper } from 'data-transparency-ui';
import MapLegendTooltip from './MapLegendTooltip';

const MapLegendHeader = () => (
    <div className="map-legend-header">
        <div className="map-legend-header__title">
            <div className="map-legend-header__title-text">
                Show on Map
            </div>
            <TooltipWrapper
                className="tooltip-wrapper award-section-tt"
                icon="info"
                tooltipComponent={MapLegendTooltip} />
        </div>
    </div>
);

export default MapLegendHeader;
