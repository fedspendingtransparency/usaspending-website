/**
 * GeoVisualizationSection.jsx
 * Created by Lizzie Salita 5/14/18
 */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import MapboxGL from 'mapbox-gl/dist/mapbox-gl';
import {
    advancedSearchFilters,
    filtersOnClickHandler
} from 'dataMapping/covid19/recipient/map/map';
import { awardTypeTabs } from 'dataMapping/covid19/covid19';

import ResultsTableErrorMessage from 'components/search/table/ResultsTableErrorMessage';
import LoadingSpinner from 'components/sharedComponents/LoadingSpinner';
import { ExclamationTriangle } from 'components/sharedComponents/icons/Icons';
import GeoVisualizationTooltip from 'components/search/visualizations/geo/GeoVisualizationTooltip';
import MapMessage from 'components/search/visualizations/geo/MapMessage';
import MapWrapper from 'components/search/visualizations/geo/MapWrapper';

const propTypes = {
    mapLayer: PropTypes.string,
    changeScope: PropTypes.func,
    changeMapLayer: PropTypes.func,
    mapMoved: PropTypes.func,
    renderHash: PropTypes.string,
    data: PropTypes.object,
    total: PropTypes.number,
    loading: PropTypes.bool,
    error: PropTypes.bool,
    noResults: PropTypes.bool,
    stateCenter: PropTypes.array,
    className: PropTypes.string,
    stateInfo: PropTypes.object
};

const availableLayers = ['country', 'state', 'county', 'congressionalDistrict'];

const GeoVisualizationSection = (props) => {
    const [showHover, setShowHover] = useState(false);
    const [selectedItem, setSelectedItem] = useState({});
    const [activeFilters, setActiveFilters] = useState({
        territory: props.mapLayer,
        spendingType: 'obligation',
        amountType: 'totalSpending',
        recipientType: 'all',
        awardType: 'all'
    });

    const updateTerritoryFilter = (value) => {
        props.changeMapLayer(value);
        setActiveFilters({ ...activeFilters, territory: value });
    };

    useEffect(() => {
        updateTerritoryFilter(props.mapLayer);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.mapLayer]);

    const updateAmountTypeFilter = (value) => {
        setActiveFilters({ ...activeFilters, amountType: value });
        props.updateMapLegendToggle(value);
    };

    // this will need to be updated as more filters are added
    const addOnClickToFilters = () => Object.keys(advancedSearchFilters).reduce((acc, filter) => {
        const filterWithOnClick = {
            ...advancedSearchFilters[filter],
            onClick: filtersOnClickHandler[filter] === 'updateAmountTypeFilter' ? updateAmountTypeFilter : updateTerritoryFilter
        };
        acc[filter] = filterWithOnClick;
        return acc;
    }, {});

    const showTooltip = (geoId, position) => {
    // convert state code to full string name
        const label = props.data.labels[geoId];
        setShowHover(true);
        setSelectedItem(Object.assign(selectedItem, {
            label: label.label,
            total: props.total,
            value: label.value,
            x: position.x,
            y: position.y
        }));
    };

    const hideTooltip = () => {
        setShowHover(false);
        setSelectedItem(Object.assign(selectedItem, {}));
    };

    let message = null;

    if (!MapboxGL.supported()) {
        return (
            <div className="results-table-message-container">
                <ResultsTableErrorMessage title="WebGL Required for this map." description="Please enable WebGL in your browser settings to view this map visualization." />
            </div>
        );
    }
    else if (props.loading) {
        message = (
            <MapMessage>
                <div className="map-loading">
                    <LoadingSpinner />
                    <div className="loading-message">
                            Gathering your data...
                    </div>
                </div>
            </MapMessage>
        );
    }
    else if (props.error || props.stateCenter.length === 0) {
        message = (
            <MapMessage>
                <div className="map-no-results">
                    <div className="error-icon">
                        <ExclamationTriangle alt="An error occurred" />
                    </div>
                    <div className="title">
                            An error occurred.
                    </div>
                    <div className="description">
                            Something went wrong while gathering your data.
                    </div>
                </div>
            </MapMessage>
        );
    }
    else if (props.noResults) {
        message = (
            <MapMessage>
                <div className="map-no-results">
                    <div className="no-results-icon" />
                    <div className="title">
                            No results found in the current map area.
                    </div>
                </div>
            </MapMessage>
        );
    }

    let center = props.stateCenter;
    if (props.stateCenter.length === 0) {
        // If there was an error getting the center of the state, use the center
        // of the United States so that we don't generate a MapBox error
        center = [-95.569430, 38.852892];
    }

    return (
        <div className="geo__map-section">
            <MapWrapper
                awardTypeFilters={awardTypeTabs}
                filters={addOnClickToFilters()}
                activeFilters={activeFilters}
                setActiveFilters={setActiveFilters}
                className={props.className}
                data={props.data}
                renderHash={props.renderHash}
                scope={props.mapLayer}
                changeMapLayer={props.changeMapLayer}
                showHover={showHover}
                selectedItem={selectedItem}
                showTooltip={showTooltip}
                hideTooltip={hideTooltip}
                tooltip={GeoVisualizationTooltip}
                availableLayers={availableLayers}
                showLayerToggle
                center={center}
                stateInfo={props.stateInfo}
                stateProfile>
                {message}
            </MapWrapper>
        </div>
    );
};

GeoVisualizationSection.propTypes = propTypes;
export default GeoVisualizationSection;
