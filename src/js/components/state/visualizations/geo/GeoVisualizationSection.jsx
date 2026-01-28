/**
 * GeoVisualizationSection.jsx
 * Created by Lizzie Salita 5/14/18
 */

import React, { useState, useEffect, useRef } from 'react';
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
    renderHash: PropTypes.string,
    data: PropTypes.object,
    total: PropTypes.number,
    loading: PropTypes.bool,
    error: PropTypes.bool,
    noResults: PropTypes.bool,
    stateCenter: PropTypes.array,
    className: PropTypes.string,
    stateInfo: PropTypes.object,
    searchData: PropTypes.object,
    program_numbers: PropTypes.string,
    agency: PropTypes.object
};

const availableLayers = ['county', 'congressionalDistrict'];

// eslint-disable-next-line prefer-arrow-callback
const GeoVisualizationSection = React.memo(function GeoVisualizationSection(props) {
    const [showHover, setShowHover] = useState(false);
    const [selectedItem, setSelectedItem] = useState({});
    const dataRef = useRef(props.data);

    useEffect(() => {
        dataRef.current = props.data;
    }, [props.data]);

    const showTooltip = (geoId, position) => {
        // convert state code to full string name
        // TODO: This ref is necessary, need to figure out why the map components are losing reference to data
        const label = dataRef.current.labels[geoId];
        setShowHover(true);
        setSelectedItem({
            label: label.label,
            total: props.total,
            value: label.value,
            x: position.x,
            y: position.y
        });
    };

    const hideTooltip = () => {
        setShowHover(false);
        setSelectedItem({});
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
            <StateProfileMapWrapper
                {...props}
                activeFilters={props.activeFilters}
                className={props.className}
                data={props.data}
                renderHash={props.renderHash}
                scope={props.mapLayer}
                changeMapLayer={props.changeMapLayer}
                showHover={showHover}
                selectedItem={selectedItem}
                showTooltip={showTooltip}
                hideTooltip={hideTooltip}
                availableLayers={availableLayers}
                showLayerToggle
                center={center}
                stateInfo={props.stateInfo}
                stateProfile>
                {message}
            </StateProfileMapWrapper>
        </div>
    );
});

GeoVisualizationSection.propTypes = propTypes;
export default GeoVisualizationSection;
