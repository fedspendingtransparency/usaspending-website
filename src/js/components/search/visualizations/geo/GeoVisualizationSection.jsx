/**
 * GeoVisualizationSection.jsx
 * Created by Kevin Li 2/13/17
 */

import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import MapboxGL from 'mapbox-gl/dist/mapbox-gl';

import ResultsTableErrorMessage from 'components/search/table/ResultsTableErrorMessage';
import LoadingSpinner from 'components/sharedComponents/LoadingSpinner';
import { ExclamationTriangle } from 'components/sharedComponents/icons/Icons';
import Note from 'components/sharedComponents/Note';
import { noteMessage } from 'dataMapping/search/geoVisualizationSection';
import {
    advancedSearchFilters,
    filtersOnClickHandler
} from 'dataMapping/covid19/recipient/map/map';
import { awardTypeTabs } from 'dataMapping/covid19/covid19';
import MapWrapper from './MapWrapper';
import GeoVisualizationTooltip from './GeoVisualizationTooltip';
import MapMessage from './MapMessage';

const propTypes = {
    scope: PropTypes.string,
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
    mapLegendToggle: PropTypes.string,
    updateMapLegendToggle: PropTypes.func,
    spendingLevel: PropTypes.string,
    className: PropTypes.string,
    center: PropTypes.array,
    singleLocationSelected: PropTypes.object,
    newAdvancedSearch: PropTypes.bool
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
    const dataRef = useRef(props.data);

    const updateAmountTypeFilter = (value) => {
        setActiveFilters({ ...activeFilters, amountType: value });
        props.updateMapLegendToggle(value);
    };

    const updateTerritoryFilter = (value) => {
        props.changeMapLayer(value);
        setActiveFilters({ ...activeFilters, territory: value });
    };
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

    useEffect(() => {
        dataRef.current = props.data;
    }, [props.data]);

    useEffect(() => {
        updateTerritoryFilter(props.mapLayer);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.mapLayer]);

    const getMessage = () => {
        if (!MapboxGL.supported()) {
            return (
                <div className="results-table-message-container">
                    <ResultsTableErrorMessage title="WebGL Required for this map." description="Please enable WebGL in your browser settings to view this map visualization." />
                </div>
            );
        }

        let message = null;

        if (props.loading) {
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
        else if (props.error) {
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

        return message;
    };

    return (
        <section
            className="results-visualization-geo-section"
            id="results-section-geo"
            aria-label="Spending by Geography">
            <MapWrapper
                filters={addOnClickToFilters()}
                activeFilters={activeFilters}
                setActiveFilters={setActiveFilters}
                awardTypeFilters={awardTypeTabs}
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
                center={props.center}
                className={props.className}
                mapLegendToggle={props.mapLegendToggle}
                updateMapLegendToggle={props.updateMapLegendToggle}
                singleLocationSelected={props.singleLocationSelected} >
                {getMessage()}
            </MapWrapper>
            {props.newAdvancedSearch ? <></> : <Note message={noteMessage} /> }
        </section>
    );
};

GeoVisualizationSection.propTypes = propTypes;
export default GeoVisualizationSection;

