/**
 * StateProfileMapWrapper.jsx
 * Created by Kevin Li 2/14/17
 */

import React, { useCallback, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import GlobalConstants from 'GlobalConstants';

import { calculateRange, visualizationColors } from "helpers/mapHelper";
import MapBox from 'components/search/visualizations/geo/map/MapBox';
import MapLegend from 'components/search/visualizations/geo/MapLegend';
import MapFiltersToggle from "components/covid19/recipient/map/MapFiltersToggle";
import StateProfileMapFilters from "./filters/StateProfileMapFilters";
import StateGeoTooltip from "./StateGeoTooltip";

const propTypes = {
    activeFilters: PropTypes.object,
    data: PropTypes.object,
    scope: PropTypes.string,
    renderHash: PropTypes.string,
    showHover: PropTypes.bool,
    selectedItem: PropTypes.object,
    showTooltip: PropTypes.func,
    hideTooltip: PropTypes.func,
    changeMapLayer: PropTypes.func,
    stateInfo: PropTypes.object,
    searchData: PropTypes.object,
    loadingTilesReady: PropTypes.func,
    children: PropTypes.node
};

const mapboxSources = {
    county: {
        label: 'county',
        url: 'mapbox://usaspendingfrbkc.county-tileset',
        layer: 'tl_2024_us_county',
        filterKey: 'GEOID', // the county GEOID is state FIPS + county FIPS
        lat: 'INTPTLAT',
        long: 'INTPTLON'
    },
    congressionalDistrict: {
        label: 'congressional district',
        url: 'mapbox://usaspendingfrbkc.district-tileset',
        layer: '118-CD',
        filterKey: 'GEOID20', // the GEOID is state FIPS + district
        lat: 'INTPTLAT',
        long: 'INTPTLON'
    }
};

// eslint-disable-next-line prefer-arrow-callback
const StateProfileMapWrapper = React.memo(function StateProfileMapWrapper({
    activeFilters,
    data = {
        locations: [],
        values: []
    },
    scope = 'state',
    showHover,
    selectedItem,
    showTooltip,
    hideTooltip,
    changeMapLayer,
    stateInfo,
    searchData,
    changeScope,
    clearSearchFilters,
    selectedItemsDisplayNames,
    stateCenter,
    loadingTilesReady,
    children = null
}) {
    const mapRef = useRef(null);
    const mapOperationQueue = useRef(null);
    const [mapLayers, setMapLayers] = useState({});
    const [mapReady, setMapReady] = useState(false);
    const [spendingScale, setSpendingScale] = useState({
        scale: null,
        segments: [],
        units: {}
    });

    const [isFiltersOpen, setIsFiltersOpen] = useState(true);

    /**
     * firstSymbolId
     * - finds the first symbol ( text to mapbox ) layer.
     * @returns {string} first symbol layer id.
     */
    const firstSymbolId = () => {
        const layers = mapRef.current.getStyle().layers;
        // Find the index of the first symbol layer in the map style
        let symbolId = null;
        for (let i = 0; i < layers.length; i++) {
            if (layers[i].type === 'symbol') {
                symbolId = layers[i].id;
                break;
            }
        }
        return symbolId;
    };

    const mouseOverLayer = useCallback((e) => {
        const source = mapboxSources[scope];
        // grab the filter ID from the GeoJSON feature properties
        const entityId = e.features[0].properties[source.filterKey];
        showTooltip(entityId, {
            x: e.originalEvent.offsetX,
            y: e.originalEvent.offsetY
        });
    }, [scope, showTooltip]);

    const mouseExitLayer = useCallback(() => {
        hideTooltip();
    }, [hideTooltip]);

    const loadSource = useCallback((type) => {
        const baseLayer = `base_${type}`;
        const sourceRef = {
            base: baseLayer,
            highlights: []
        };

        // load the data source
        const source = mapboxSources[type];
        mapRef.current.addSource(type, {
            type: 'vector',
            url: source.url
        });

        // transform the source shapes into a base layer that will show the outline of all the
        // contents
        mapRef.current.addLayer({
            id: baseLayer,
            type: 'fill',
            source: type,
            'source-layer': source.layer,
            paint: {
                'fill-outline-color': 'rgba(0,0,0,0.3)',
                'fill-color': 'rgba(0,0,0,0)'
            }
        });

        // generate the highlight layers that will be shaded in when populated with data filters
        // set up temporary empty filters that will show nothing
        visualizationColors.forEach((color, index) => {
            const layerName = `highlight_${type}_group_${index}`;
            mapRef.current.addLayer({
                id: layerName,
                type: 'fill',
                source: type,
                'source-layer': source.layer,
                paint: {
                    'fill-outline-color': 'rgba(0,0,0,0.3)',
                    'fill-color': color
                },
                filter: ['in', source.filterKey, '']
            }, firstSymbolId());

            // setup mouseover events
            mapRef.current.on('mousemove', layerName, mouseOverLayer.bind(this));
            mapRef.current.on('mouseleave', layerName, mouseExitLayer.bind(this));

            // save a reference to this layer
            sourceRef.highlights.push(layerName);
        });

        setMapLayers((prevLayers) => ({
            ...prevLayers,
            [type]: sourceRef
        }));
    }, [mouseExitLayer, mouseOverLayer]);

    const showSource = useCallback((layers, type) => {
        // check if we've already loaded the data layer
        if (!layers) {
            // we haven't loaded it yet, do that now
            loadSource(type);
            return;
        }

        // enable the base layer
        mapRef.current.setLayoutProperty(layers.base, 'visibility', 'visible');
        layers.highlights.forEach((highlight) => {
            // iterate through all the highlight layers and enable them
            mapRef.current.setLayoutProperty(highlight, 'visibility', 'visible');
        });
    }, [loadSource]);

    const hideSource = useCallback((layers) => {
        if (!layers) {
            // we haven't loaded the layer yet, stop
            return;
        }

        // hide the base layer
        mapRef.current.setLayoutProperty(layers.base, 'visibility', 'none');
        layers.highlights.forEach((highlight) => {
            // iterate through all the highlight layers and enable them
            mapRef.current.setLayoutProperty(highlight, 'visibility', 'none');
        });
    }, []);

    const prepareLayers = useCallback((ready) =>
        new Promise((resolve, reject) => {
            if (!ready) {
                // something went wrong, the map isn't ready yet
                reject();
            }

            const source = mapboxSources[scope];
            if (!source) {
                reject();
            }

            // hide all the other layers
            Object.keys(mapboxSources).forEach((type) => {
                if (type !== scope) {
                    hideSource(mapLayers[type]);
                }
            });

            showSource(mapLayers[scope], scope);

            // check if we need to zoom in to show the layer
            if (source.minZoom) {
                const currentZoom = mapRef.current.getZoom();
                if (currentZoom < source.minZoom) {
                    // we are zoomed too far out and won't be able to see the new map layer, zoom in
                    // don't allow users to zoom further out than the min zoom
                    mapRef.current.setMinZoom(source.minZoom);
                }
            }
            else {
                mapRef.current.setMinZoom(0);
            }

            const parentMap = mapRef.current;
            function renderResolver() {
                parentMap.off('render', renderResolver);
                resolve();
            }
            function loadResolver(e) {
                // Mapbox insists on emitting sourcedata events for many different source
                // loading stages, so we need to wait for the source to be loaded AND for
                // it to be affecting tiles (aka, it has moved onto the render stage)
                if (e.isSourceLoaded && e.tile) {
                    // source has finished loading and is rendered (so we can start filtering
                    // and querying)
                    parentMap.off('sourcedata', loadResolver);
                    parentMap.on('render', renderResolver);
                }
            }

            // if we're loading new data, we need to wait for the data to be ready
            mapRef.current.on('sourcedata', loadResolver);
        }
        ), [hideSource, showSource, scope, mapLayers]);

    const runMapOperationQueue = useCallback(() => {
        Object.keys(mapOperationQueue.current).forEach((key) => {
            const op = mapOperationQueue.current[key];
            op.call(this);
        });
        mapOperationQueue.current = {};
    }, []);

    const prepareMap = useCallback((ready) => {
        prepareLayers(ready)
            .then(() => {
                // we depend on the state shapes to process the state fills, so the operation
                // queue must wait for the state shapes to load first
                runMapOperationQueue();

                // notify container that map is now loaded
                loadingTilesReady();
            });
    }, [prepareLayers, runMapOperationQueue, loadingTilesReady]);

    const queueMapOperation = (name, operation) => {
        mapOperationQueue.current = { [name]: operation };
    };

    const displayData = useCallback((locations, values, ready, layer) => {
        // don't do anything if the map has not yet loaded
        if (!ready || !locations || locations.length === 0) {
            // add to the map operation queue
            queueMapOperation('displayData', displayData);
            return;
        }

        const source = mapboxSources[layer];

        // calculate the range of data
        const scale = calculateRange(values);

        // prepare a set of blank (false) filters
        const filterValues = visualizationColors.map(() => (
            []
        ));

        locations.forEach((location, index) => {
            let value = values[index];
            if (isNaN(value)) value = 0;
            // determine the group index
            const group = scale.scale(value);
            // add it to the filter list
            filterValues[group].push(location);
        });

        // generate Mapbox filters from the values
        filterValues.forEach((valueSet, index) => {
            const layerName = `highlight_${layer}_group_${index}`;
            // by default set up the filter to not include anything
            let filter = ['in', source.filterKey, ''];
            if (valueSet.length > 0) {
                // if there are locations that are displayable, include those in the filter
                filter = ['in', source.filterKey].concat(valueSet);
            }
            mapRef.current.setFilter(layerName, filter);
        });

        setSpendingScale(scale);
    }, []);

    useEffect(() => {
        displayData(data?.locations, data.values, mapReady, scope);
    }, [data.locations, data.values, displayData, mapReady, scope]);

    useEffect(() => {
        if (mapReady) {
            prepareMap(mapReady);
        }
    }, [mapReady, prepareMap]);

    return (
        <div className="map-container">
            {
                GlobalConstants.MAPBOX_TOKEN &&
                <MapBox
                    setMapReady={setMapReady}
                    center={stateCenter}
                    mapType={scope}
                    stateInfo={stateInfo}
                    stateProfile
                    ref={mapRef} />
            }
            <MapFiltersToggle
                isFiltersOpen={isFiltersOpen}
                setIsFiltersOpen={setIsFiltersOpen} />
            <StateProfileMapFilters
                activeFilters={activeFilters}
                isFiltersOpen={isFiltersOpen}
                changeScope={changeScope}
                clearSearchFilters={clearSearchFilters}
                searchData={searchData}
                selectedItemsDisplayNames={selectedItemsDisplayNames}
                changeMapLayer={changeMapLayer} />
            <MapLegend
                segments={spendingScale.segments}
                units={spendingScale.units} />
            <StateGeoTooltip
                selectedItem={selectedItem}
                showHover={showHover} />
            {children}
        </div>
    );
});

StateProfileMapWrapper.propTypes = propTypes;
export default StateProfileMapWrapper;

