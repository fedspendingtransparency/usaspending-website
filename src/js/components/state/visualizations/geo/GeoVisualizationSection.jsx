/**
 * GeoVisualizationSection.jsx
 * Created by Lizzie Salita 5/14/18
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import MapboxGL from 'mapbox-gl/dist/mapbox-gl';

import LoadingSpinner from 'components/sharedComponents/LoadingSpinner';
import { ExclamationTriangle } from 'components/sharedComponents/icons/Icons';
import MapMessage from 'components/search/visualizations/geo/MapMessage';
import ResultsTableErrorMessage from "components/keyword/table/ResultsTableErrorMessage";
import StateProfileMapWrapper from './StateProfileMapWrapper';

const propTypes = {
    mapLayer: PropTypes.string,
    changeScope: PropTypes.func,
    changeMapLayer: PropTypes.func,
    mapMoved: PropTypes.func,
    data: PropTypes.object,
    loading: PropTypes.bool,
    error: PropTypes.bool,
    noResults: PropTypes.bool,
    center: PropTypes.array,
    className: PropTypes.string,
    stateInfo: PropTypes.object,
    searchData: PropTypes.object,
    program_numbers: PropTypes.string,
    agency: PropTypes.object,
    loadingTilesReady: PropTypes.func
};

// eslint-disable-next-line prefer-arrow-callback
const GeoVisualizationSection = React.memo(function GeoVisualizationSection({
    mapLayer,
    changeScope,
    changeMapLayer,
    data,
    loading,
    error,
    noResults,
    center,
    stateInfo,
    searchData,
    activeFilters,
    clearSearchFilters,
    selectedItemsDisplayNames,
    loadingTilesReady
}) {
    const [showHover, setShowHover] = useState(false);
    const [selectedItem, setSelectedItem] = useState({});
    const dataRef = useRef(data);

    useEffect(() => {
        dataRef.current = data;
    }, [data]);

    const showTooltip = useCallback((geoId, position) => {
        // convert state code to full string name
        // TODO: This ref is necessary,
        //  need to figure out why the map components are losing reference to data
        const label = dataRef.current.labels[geoId];
        setShowHover(true);
        setSelectedItem({
            label: label?.label,
            value: label.value,
            x: position.x,
            y: position.y
        });
    }, []);

    const hideTooltip = useCallback(() => {
        setShowHover(false);
        setSelectedItem({});
    }, []);

    let message = null;

    if (!MapboxGL.supported()) {
        // eslint-disable-next-line max-len
        const description = "Please enable WebGL in your browser settings to view this map visualization.";
        return (
            <div className="results-table-message-container">
                <ResultsTableErrorMessage
                    title="WebGL Required for this map."
                    description={description} />
            </div>
        );
    }
    else if (loading) {
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
    else if (error || center.length === 0) {
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
    else if (noResults) {
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

    return (
        <div className="geo__map-section">
            <StateProfileMapWrapper
                activeFilters={activeFilters}
                data={data}
                scope={mapLayer}
                showHover={showHover}
                selectedItem={selectedItem}
                showTooltip={showTooltip}
                hideTooltip={hideTooltip}
                changeMapLayer={changeMapLayer}
                stateInfo={stateInfo}
                searchData={searchData}
                changeScope={changeScope}
                clearSearchFilters={clearSearchFilters}
                selectedItemsDisplayNames={selectedItemsDisplayNames}
                center={center}
                loadingTilesReady={loadingTilesReady} >
                {message}
            </StateProfileMapWrapper>
        </div>
    );
});

GeoVisualizationSection.propTypes = propTypes;
export default GeoVisualizationSection;
