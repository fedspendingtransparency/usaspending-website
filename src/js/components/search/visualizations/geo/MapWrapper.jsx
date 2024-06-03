/**
 * MapWrapper.jsx
 * Created by Kevin Li 2/14/17
 */

import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { uniq, cloneDeep } from 'lodash';
import * as MapHelper from 'helpers/mapHelper';
import MapBroadcaster from 'helpers/mapBroadcaster';
import { prohibitedCountryCodes } from 'helpers/search/visualizations/geoHelper';
import GlobalConstants from 'GlobalConstants';

import MapBox from './map/MapBox';
import MapLegend from './MapLegend';
import { stateFIPSByAbbreviation } from "../../../../dataMapping/state/stateNames";
import MapFiltersToggle from "../../../covid19/recipient/map/MapFiltersToggle";
import AdvancedSearchMapFilters from "./AdvancedSearchMapFilters";

const propTypes = {
    filters: PropTypes.object,
    activeFilters: PropTypes.object,
    setActiveFilters: PropTypes.func,
    awardTypeFilters: PropTypes.array,
    data: PropTypes.object,
    scope: PropTypes.string,
    renderHash: PropTypes.string,
    showHover: PropTypes.bool,
    selectedItem: PropTypes.object,
    showTooltip: PropTypes.func,
    hideTooltip: PropTypes.func,
    tooltip: PropTypes.func,
    availableLayers: PropTypes.array,
    changeMapLayer: PropTypes.func,
    showLayerToggle: PropTypes.bool,
    children: PropTypes.node,
    center: PropTypes.array,
    stateProfile: PropTypes.bool,
    mapLegendToggle: PropTypes.string,
    updateMapLegendToggle: PropTypes.func,
    className: PropTypes.string,
    stateInfo: PropTypes.object
};

const defaultProps = {
    data: {
        locations: [],
        values: []
    },
    scope: 'state',
    availableLayers: ['state'],
    showLayerToggle: false,
    children: null
};

const mapLegendToggleData = [
    {
        title: 'Total Spending',
        value: 'totalSpending'
    },
    {
        title: 'Per Capita Spending',
        value: 'perCapita'
    }
];

const mapboxSources = {
    country: {
        label: 'country',
        url: 'mapbox://usaspending.9t5zlf5z',
        layer: 'Countries-shp-9bdce0',
        filterKey: 'GENC0' // three digit country code
    },
    state: {
        label: 'state',
        url: 'mapbox://usaspending.9cse49bi',
        layer: 'cb_2016_us_state_500k-ckeyb7',
        filterKey: 'STUSPS' // state abbreviation
    },
    county: {
        label: 'county',
        url: 'mapbox://usaspending.29sdfmwu',
        layer: 'tl_2019_us_county',
        filterKey: 'GEOID', // the county GEOID is state FIPS + county FIPS
        lat: 'INTPTLAT',
        long: 'INTPTLON'
    },
    congressionalDistrict: {
        label: 'congressional district',
        url: 'mapbox://usaspending.118-CD-tiles',
        layer: '118-CD',
        filterKey: 'GEOID20', // the GEOID is state FIPS + district
        lat: 'INTPTLAT20',
        long: 'INTPTLON20'
    },
    zip: {
        label: 'ZIP Code Tabulation Area',
        url: 'mapbox://usaspending.3lk61l9t',
        layer: 'cb_2016_us_zcta510_500k-4se882',
        filterKey: 'ZCTA5CE10' // zip code
    }
};

const MapWrapper = (props) => {
    const mapRef = useRef();
    const scopeRef = useRef(props.scope);
    const [mapLayers, setMapLayers] = useState({});
    const [mapReady, setMapReady] = useState(false);
    const [spendingScale, setSpendingScale] = useState({
        scale: null,
        segments: [],
        units: {}
    });
    const [center, setCenter] = useState(props.center);
    const [isFiltersOpen, setIsFiltersOpen] = useState(true);
    const broadcastReceivers = [];
    let renderCallback = null;
    let mapOperationQueue = {};

    const mapRemoved = () => {
        // map is about to be removed
        setMapReady(false);
    };

    const hideSource = (type) => {
        const layers = mapLayers[type];

        if (!layers) {
            // we haven't loaded the layer yet, stop
            return;
        }

        // hide the base layer
        mapRef.current.map.current.setLayoutProperty(layers.base, 'visibility', 'none');
        layers.highlights.forEach((highlight) => {
            // iterate through all the highlight layers and enable them
            mapRef.current.map.current.setLayoutProperty(highlight, 'visibility', 'none');
        });
    };

    /**
     * firstSymbolId
     * - finds the first symbol ( text to mapbox ) layer.
     * @returns {string} first symbol layer id.
     */
    const firstSymbolId = () => {
        const layers = mapRef.current.map.current.getStyle().layers;
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

    const mouseOverLayer = (e) => {
        const source = mapboxSources[props.scope];
        // grab the filter ID from the GeoJSON feature properties
        const entityId = e.features[0].properties[source.filterKey];
        props.showTooltip(entityId, {
            x: e.originalEvent.offsetX,
            y: e.originalEvent.offsetY
        });
    };

    const mouseExitLayer = () => {
        props.hideTooltip();
    };

    const loadSource = (type) => {
        const baseLayer = `base_${type}`;
        const sourceRef = {
            base: baseLayer,
            highlights: []
        };

        // load the data source
        const source = mapboxSources[type];
        mapRef.current.map.current.addSource(type, {
            type: 'vector',
            url: source.url
        });

        // transform the source shapes into a base layer that will show the outline of all the
        // contents
        mapRef.current.map.current.addLayer({
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
        const colors = MapHelper.visualizationColors;
        colors.forEach((color, index) => {
            const layerName = `highlight_${type}_group_${index}`;
            mapRef.current.map.current.addLayer({
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
            mapRef.current.map.current.on('mousemove', layerName, mouseOverLayer.bind(this));
            mapRef.current.map.current.on('mouseleave', layerName, mouseExitLayer.bind(this));

            // save a reference to this layer
            sourceRef.highlights.push(layerName);
        });

        setMapLayers((prevLayers) => ({
            ...prevLayers,
            [type]: sourceRef
        }));
    };

    const showSource = (type) => {
        const layers = mapLayers[type];
        // check if we've already loaded the data layer
        if (!layers) {
            // we haven't loaded it yet, do that now
            loadSource(type);
            return;
        }

        // enable the base layer
        mapRef.current.map.current.setLayoutProperty(layers.base, 'visibility', 'visible');
        layers.highlights.forEach((highlight) => {
            // iterate through all the highlight layers and enable them
            mapRef.current.map.current.setLayoutProperty(highlight, 'visibility', 'visible');
        });
    };

    const prepareLayers = () => new Promise((resolve, reject) => {
        if (!mapReady) {
            // something went wrong, the map isn't ready yet
            reject();
        }

        const source = mapboxSources[props.scope];
        if (!source) {
            reject();
        }

        // hide all the other layers
        Object.keys(mapboxSources).forEach((type) => {
            if (type !== props.scope) {
                hideSource(type);
            }
        });

        showSource(props.scope);

        // check if we need to zoom in to show the layer
        if (source.minZoom) {
            const currentZoom = mapRef.current.map.current.getZoom();
            if (currentZoom < source.minZoom) {
                // we are zoomed too far out and won't be able to see the new map layer, zoom in
                // don't allow users to zoom further out than the min zoom
                mapRef.current.map.current.setMinZoom(source.minZoom);
            }
        }
        else {
            mapRef.current.map.current.setMinZoom(0);
        }


        const parentMap = mapRef.current.map.current;
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
        mapRef.current.map.current.on('sourcedata', loadResolver);
    });

    const runMapOperationQueue = () => {
        Object.keys(mapOperationQueue).forEach((key) => {
            const op = mapOperationQueue[key];
            op.call(this);
        });
        mapOperationQueue = {};
    };

    const prepareChangeListeners = () => {
        // detect visible entities whenever the map moves
        const parentMap = mapRef.current.map.current;
        const mapMovedCallback = () => {
            if (parentMap.loaded()) {
                parentMap.off('render', mapMovedCallback);
                MapBroadcaster.emit('mapMoved');
            }
        };

        // we need to hold a reference to the callback in order to remove the listener when
        // the component unmounts
        renderCallback = () => {
            mapRef?.current?.map?.current?.on('render', mapMovedCallback);
        };
        mapRef?.current?.map?.current?.on('moveend', renderCallback);
        // but also do it when the map resizes, since the view will be different
        mapRef?.current?.map?.current?.on('resize', renderCallback);
    };

    const prepareMap = () => {
        prepareLayers()
            .then(() => {
                // we depend on the state shapes to process the state fills, so the operation
                // queue must wait for the state shapes to load first
                runMapOperationQueue();
                if (!props.stateProfile) {
                    prepareChangeListeners();
                }

                // notify any listeners that the map is ready
                MapBroadcaster.emit('mapReady');
            });
    };

    const mapReadyPrep = () => {
        // map has mounted, load the state shapes
        setMapReady(true);
    };

    const measureMap = (forced = false) => {
        // determine which entities (state, counties, etc. based on current scope) are in view
        // use Mapbox SDK to determine the currently rendered shapes in the base layer

        const mapLoaded = mapRef.current.map.current.loaded();
        // wait for the map to load before continuing
        if (!mapLoaded) {
            window.requestAnimationFrame(() => {
                measureMap();
            });
            return;
        }

        // TODO: investigate if we can useState instead of useRef for scopeRef
        const entities = mapRef.current.map.current.queryRenderedFeatures({
            layers: [`base_${scopeRef.current}`]
        });

        const source = mapboxSources[scopeRef.current];
        const visibleEntities = entities.map((entity) => (
            entity.properties[source.filterKey]
        ));

        if (scopeRef.current === 'country') {
            // prepend USA to account for prohibited country codes
            const filteredArray = visibleEntities.filter((value) => prohibitedCountryCodes?.includes(value));

            if (filteredArray?.length > 0) {
                visibleEntities.push('USA');
            }
        }

        // remove the duplicates values and pass them to the parent, remove null values also
        const uniqueEntities = uniq(visibleEntities).filter((n) => n);

        MapBroadcaster.emit('mapMeasureDone', uniqueEntities, forced);
    };

    const prepareBroadcastReceivers = () => {
        const listenerRef = MapBroadcaster.on('measureMap', measureMap);
        broadcastReceivers.push(listenerRef);
    };

    const removeChangeListeners = () => {
        // remove the render callbacks
        if (mapRef.current) {
            mapRef.current.map.current.off('moveend', renderCallback);
            mapRef.current.map.current.off('resize', renderCallback);
        }
    };

    const queueMapOperation = (name, operation) => {
        mapOperationQueue[name] = operation;
    };

    const setCenterFromMapTiles = (value, filterKey, lat, long) => {
        const entities = mapRef.current.map.current.queryRenderedFeatures({
            layers: [`base_${props.scope}`]
        });

        const found = entities.find((element) => element.properties[filterKey] === value);
        if (found) {
            const coords = [parseFloat(found.properties[long]), parseFloat(found.properties[lat])];
            const isEqual = coords.every((v, index) => v === center[index]);

            if (!isEqual) {
                setCenter([parseFloat(found.properties[long]), parseFloat(found.properties[lat])]);
                removeChangeListeners();
            }
        }
    };

    const reCenterMap = () => {
        if (mapReady && {}.hasOwnProperty.call(props, "singleLocationSelected") && Object.keys(props.singleLocationSelected).length > 0 && (props.scope === "county" || props.scope === "congressionalDistrict")) {
            let value;
            let filterKey;
            let lat = "INTPTLAT";
            let long = "INTPTLON";
            const district = props.singleLocationSelected.district_original || props.singleLocationSelected.district_current;

            if (props.scope === "congressionalDistrict") {
                filterKey = "GEOID20";
                lat += "20";
                long += "20";
                value = `${stateFIPSByAbbreviation[props.singleLocationSelected.state]}${district}`;
                setCenterFromMapTiles(value, filterKey, lat, long);
            }
            else if (props.scope === "county") {
                filterKey = "GEOID";
                value = `${stateFIPSByAbbreviation[props.singleLocationSelected.state]}${props.singleLocationSelected.county}`;
                setCenterFromMapTiles(value, filterKey, lat, long);
            }
        }
    };

    const displayData = () => {
        // don't do anything if the map has not yet loaded
        if (!mapReady) {
            // add to the map operation queue
            queueMapOperation('displayData', displayData);
            return;
        }

        const source = mapboxSources[props.scope];

        // calculate the range of data
        const scale = MapHelper.calculateRange(props.data.values);
        const colors = MapHelper.visualizationColors;
        // prepare a set of blank (false) filters
        const filterValues = colors.map(() => (
            []
        ));
        props.data.locations.forEach((location, index) => {
            let value = props.data.values[index];
            if (isNaN(value)) value = 0;
            // determine the group index
            const group = scale.scale(value);
            // add it to the filter list
            filterValues[group].push(location);
        });

        // generate Mapbox filters from the values
        filterValues.forEach((valueSet, index) => {
            const layerName = `highlight_${props.scope}_group_${index}`;
            // by default set up the filter to not include anything
            let filter = ['in', source.filterKey, ''];
            if (valueSet.length > 0) {
                // if there are locations that are displayable, include those in the filter
                filter = ['in', source.filterKey].concat(valueSet);
            }
            mapRef.current.map.current.setFilter(layerName, filter);
        });

        reCenterMap();
        setSpendingScale(scale);
    };

    /**
     * tooltipDescription
     * - description for tooltip based on page and toggle
     * @returns {string}
     */
    const tooltipDescription = () => {
        const { stateProfile, mapLegendToggle } = props;
        // state page
        if (stateProfile) return 'Awarded Amount';
        // per capita toggle
        return (mapLegendToggle === 'totalSpending' ? 'Obligations' : 'Per Capita');
    };

    const tooltip = () => {
        const {
            tooltip: TooltipComponent, selectedItem, showHover, scope
        } = props;
        if (scope === "country" && selectedItem.label === "United States") {
            selectedItem.label += " and Territories";
        }

        if (showHover) {
            return (
                <TooltipComponent
                    description={tooltipDescription()}
                    {...selectedItem} />
            );
        }
        return null;
    };

    const legend = () => {
        const {
            stateProfile, updateMapLegendToggle, mapLegendToggle, scope
        } = props;
        if (stateProfile) return null; // no legend for state profile pages
        return (
            <MapLegend
                segments={spendingScale.segments}
                units={spendingScale.units}
                mapLegendToggleData={mapLegendToggleData}
                updateMapLegendToggle={updateMapLegendToggle}
                mapLegendToggle={mapLegendToggle}
                scope={scope} />
        );
    };

    const toggleFilters = () => setIsFiltersOpen(!isFiltersOpen);

    const filters = () => {
        const { activeFilters } = props;
        let mapFilters = cloneDeep(props.filters);
        let active = cloneDeep(props.activeFilters);
        if (!mapFilters || !activeFilters) return null;
        const awardTypeFilters = props.awardTypeFilters.map((filter) => filter.internal).filter((filter) => filter !== 'all').filter((filter) => filter !== 'loans');
        if (awardTypeFilters.includes(activeFilters.awardType)) {
            mapFilters.spendingType.options.pop();
        }

        if (props.activeFilters?.territory === 'country') {
            mapFilters = Object.assign({}, { territory: mapFilters.territory, amountType: { ...mapFilters.amountType, enabled: false } });
            active = Object.assign({}, { ...active, amountType: 'totalSpending' });
        }
        else {
            mapFilters = Object.assign({}, { territory: mapFilters.territory, amountType: { ...mapFilters.amountType, enabled: true } });
        }

        return (
            <AdvancedSearchMapFilters
                filters={mapFilters}
                activeFilters={active}
                isOpen={isFiltersOpen} />
        );
    };

    useEffect(() => {
        displayData();
        if (!props.stateProfile) {
            prepareBroadcastReceivers();
        }
        return () => {
            // remove any broadcast listeners
            removeChangeListeners();
            broadcastReceivers.forEach((listenerRef) => {
                MapBroadcaster.off(listenerRef.event, listenerRef.id);
            });
        };
        /* eslint-disable-next-line react-hooks/exhaustive-deps */
    }, []);

    useEffect(() => {
        if (scopeRef.current !== props.scope) {
            queueMapOperation('displayData', displayData);
            prepareMap();
            scopeRef.current = props.scope;
        }
        else {
            displayData();
        }
        /* eslint-disable-next-line react-hooks/exhaustive-deps */
    }, [props.renderHash, props.data]);

    useEffect(() => {
        if (mapReady) {
            prepareMap();
        }
        /* eslint-disable-next-line react-hooks/exhaustive-deps */
    }, [mapReady]);

    useEffect(() => {
        setCenter(props.center);
    }, [props.center]);

    return (
        <div className="map-container">
            {GlobalConstants.MAPBOX_TOKEN && <MapBox
                loadedMap={mapReadyPrep}
                unloadedMap={mapRemoved}
                center={center}
                mapType={props.scope}
                stateInfo={props.stateInfo}
                stateProfile={props.stateProfile}
                ref={mapRef}
                singleLocationSelected={props.singleLocationSelected} />}
            <MapFiltersToggle onClick={toggleFilters} isOpen={isFiltersOpen} />
            {filters()}
            {legend()}
            {tooltip()}
            {props.children}
        </div>
    );
};

MapWrapper.propTypes = propTypes;
MapWrapper.defaultProps = defaultProps;

export default MapWrapper;
