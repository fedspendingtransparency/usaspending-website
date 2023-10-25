import React from 'react';
import PropTypes from 'prop-types';
import { TooltipWrapper } from 'data-transparency-ui';
import { mapLegendTT } from './MapLegendTooltip';

const propTypes = {
    mapLegendToggleData: PropTypes.arrayOf(PropTypes.shape({
        title: PropTypes.string,
        value: PropTypes.string
    })),
    mapLegendToggle: PropTypes.string,
    updateToggle: PropTypes.func,
    mapType: PropTypes.string,
    resetToggle: PropTypes.func
};

const MapLegendHeader = ({
    mapLegendToggleData, mapLegendToggle, updateToggle, mapType, resetToggle
}) => {
    const isChecked = (value) => {
        if (mapType === 'country') {
            if (mapLegendToggle === 'totalSpending' && value === 'totalSpending') return true;
            resetToggle();
            return false;
        }
        return value === mapLegendToggle;
    };

    const headerToggle = () => {
        if (!mapLegendToggleData) return null;

        return (mapLegendToggleData?.map((toggleButtonData) => (
            <div
                className="map-legend-header__body-toggle-button__container"
                key={toggleButtonData.value}>
                <label
                    htmlFor={`map-legend-header__body-toggle-button__${toggleButtonData.value}`}>
                    <input
                        type="radio"
                        id={`map-legend-header__body-toggle-button__${toggleButtonData.value}`}
                        disabled={mapType === 'country' && toggleButtonData.value === 'perCapita'}
                        value={toggleButtonData.value}
                        checked={isChecked(toggleButtonData.value)}
                        onChange={updateToggle} />
                    {toggleButtonData.title}
                </label>
            </div>
        )));
    };

    return (
        <div className="map-legend-header">
            <div className="map-legend-header__title">
                <div className="map-legend-header__title-text">
                    Show on Map
                </div>
                <TooltipWrapper
                    className="tooltip-wrapper award-section-tt"
                    icon="info"
                    tooltipComponent={mapLegendTT} />
            </div>
            <div className="map-legend-header__body">
                {headerToggle()}
            </div>
        </div>
    );
};

MapLegendHeader.propTypes = propTypes;
export default MapLegendHeader;
