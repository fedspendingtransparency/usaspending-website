/**
 * MapWrapper.jsx
 * Created by Kevin Li 2/14/17
 */

import React from 'react';
import PropTypes from 'prop-types';
import { uniq } from 'lodash';

import * as MapHelper from 'helpers/mapHelper';

import MapBox from './map/MapBox';
import MapLegend from './MapLegend';

const propTypes = {
    data: PropTypes.object,
    scope: PropTypes.string,
    renderHash: PropTypes.string,
    showHover: PropTypes.bool,
    selectedItem: PropTypes.object,
    showTooltip: PropTypes.func,
    hideTooltip: PropTypes.func,
    tooltip: PropTypes.func,
    receiveVisible: PropTypes.func
};

const defaultProps = {
    data: {
        locations: [],
        values: []
    },
    scope: 'state'
};

const mapboxSources = {
    state: {
        label: 'state',
        url: 'mapbox://usaspending.9cse49bi',
        layer: 'cb_2016_us_state_500k-ckeyb7',
        filterKey: 'STUSPS' // state abbreviation
    },
    county: {
        label: 'county',
        url: 'mapbox://usaspending.67dl1i5b',
        layer: 'cb_2016_us_county_500k-dqqug4',
        filterKey: 'GEOID' // the county GEOID is state FIPS + county FIPS
    },
    congressionalDistrict: {
        label: 'Congressional district',
        url: 'mapbox://usaspending.2z200y6q',
        layer: 'cb_2016_us_cd115_500k-c8mr5m',
        filterKey: 'GEOID' // the GEOID is state FIPS + district
    },
    zip: {
        label: 'ZIP Code Tabulation Area',
        url: 'mapbox://usaspending.3lk61l9t',
        layer: 'cb_2016_us_zcta510_500k-4se882',
        filterKey: 'ZCTA5CE10' // zip code
    }
};

export default class MapWrapper extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            spendingScale: {
                scale: null,
                segments: [],
                units: {}
            },
            mapReady: false
        };

        this.mapRef = null;
        this.mapOperationQueue = {};
        this.loadedLayers = {};

        this.mapReady = this.mapReady.bind(this);
        this.mapRemoved = this.mapRemoved.bind(this);

        this.determineVisibleEntities = this.determineVisibleEntities.bind(this);
    }

    componentDidMount() {
        this.displayData();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.renderHash !== this.props.renderHash) {
            if (prevProps.scope !== this.props.scope) {
                // the scope changed, we need to reload the layers
                this.queueMapOperation('displayData', this.displayData);
                this.prepareMap();
            }
            else {
                // only the data changed
                this.displayData();
            }
        }
    }

    mapReady() {
        // map has mounted, load the state shapes
        this.setState({
            mapReady: true
        }, () => {
            this.prepareMap();
        });
    }

    mapRemoved() {
        // map is about to be removed
        this.setState({
            mapReady: false
        });
    }

    prepareMap() {
        this.prepareLayers()
            .then(() => {
                // we depend on the state shapes to process the state fills, so the operation
                // queue must wait for the state shapes to load first
                this.runMapOperationQueue();

                // set up listeners to determine visible entities, if applicable
                if (this.props.receiveVisible) {
                    this.prepareChangeListeners();
                }
            });
    }

    showSource(type) {
        const layers = this.loadedLayers[type];
        // check if we've already loaded the data layer
        if (!layers) {
            // we haven't loaded it yet, do that now
            this.loadSource(type);
            return;
        }

        // enable the base layer
        this.mapRef.map.setLayoutProperty(layers.base, 'visibility', 'visible');
        layers.highlights.forEach((highlight) => {
            // iterate through all the highlight layers and enable them
            this.mapRef.map.setLayoutProperty(highlight, 'visibility', 'visible');
        });
    }

    hideSource(type) {
        const layers = this.loadedLayers[type];

        if (!layers) {
            // we haven't loaded the layer yet, stop
            return;
        }

        // hide the base layer
        this.mapRef.map.setLayoutProperty(layers.base, 'visibility', 'none');
        layers.highlights.forEach((highlight) => {
            // iterate through all the highlight layers and enable them
            this.mapRef.map.setLayoutProperty(highlight, 'visibility', 'none');
        });
    }

    loadSource(type) {
        const baseLayer = `base_${type}`;

        const sourceRef = {
            base: baseLayer,
            highlights: []
        };

        // load the data source
        const source = mapboxSources[type];
        this.mapRef.map.addSource(type, {
            type: 'vector',
            url: source.url
        });

        // transform the source shapes into a base layer that will show the outline of all the
        // contents
        this.mapRef.map.addLayer({
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
            this.mapRef.map.addLayer({
                id: layerName,
                type: 'fill',
                source: type,
                'source-layer': source.layer,
                paint: {
                    'fill-outline-color': 'rgba(0,0,0,0.3)',
                    'fill-color': color
                },
                filter: ['in', source.filterKey, '']
            });

            // setup mouseover events
            this.mapRef.map.on('mousemove', layerName, this.mouseOverLayer.bind(this));
            this.mapRef.map.on('mouseleave', layerName, this.mouseExitLayer.bind(this));

            // save a reference to this layer
            sourceRef.highlights.push(layerName);
        });

        this.loadedLayers[type] = sourceRef;
    }

    prepareLayers() {
        return new Promise((resolve, reject) => {
            if (!this.state.mapReady) {
                // something went wrong, the map isn't ready yet
                reject();
            }

            const source = mapboxSources[this.props.scope];
            if (!source) {
                reject();
            }

            // hide all the other layers
            Object.keys(mapboxSources).forEach((type) => {
                if (type !== this.props.scope) {
                    this.hideSource(type);
                }
            });

            this.showSource(this.props.scope);
            const resolver = (e) => {
                // Mapbox insists on emitting sourcedata events for many different source
                // loading stages, so we need to wait for the source to be loaded AND for the
                // it to be affecting tiles (aka, it has moved onto the render stage)
                if (e.isSourceLoaded && e.tile) {
                    // source has finished loading and is rendered (so we can start filtering
                    // and querying)
                    this.mapRef.map.off('sourcedata', resolver);
                    resolve();
                }
            };
            // if we're loading new data, we need to wait for the data to be ready
            this.mapRef.map.on('sourcedata', resolver);
        });
    }

    determineVisibleEntities() {
        // check if the parent component wants to query the map for only the visible features
        if (!this.props.receiveVisible) {
            // no receiver function was passed down, so don't do anything
            return;
        }

        // determine which entities (state, counties, etc based on current scope) are in view
        // use Mapbox SDK to determine the currently rendered shapes in the base layer
        const entities = this.mapRef.map.queryRenderedFeatures({
            layers: [`base_${this.props.scope}`]
        });

        const source = mapboxSources[this.props.scope];

        const visibleEntities = entities.map((entity) => (
            entity.properties[source.filterKey]
        ));

        // remove the duplicates values and pass them to the parent
        this.props.receiveVisible(uniq(visibleEntities));
    }

    prepareChangeListeners() {
        // detect visible entities whenever the map moves
        this.mapRef.map.on('moveend', this.determineVisibleEntities);
        // but also do it when the map resizes, since the view will be different
        this.mapRef.map.on('resize', this.determineVisibleEntities);

        // now run the detector immediately so we can get the current state
        this.determineVisibleEntities();
    }

    mouseOverLayer(e) {
        const source = mapboxSources[this.props.scope];
        // grab the filter ID from the GeoJSON feature properties
        const entityId = e.features[0].properties[source.filterKey];
        this.props.showTooltip(entityId, {
            x: e.originalEvent.offsetX,
            y: e.originalEvent.offsetY
        });
    }

    mouseExitLayer() {
        this.props.hideTooltip();
    }

    runMapOperationQueue() {
        Object.keys(this.mapOperationQueue).forEach((key) => {
            const op = this.mapOperationQueue[key];
            op.call(this);
        });
        this.mapOperationQueue = {};
    }

    queueMapOperation(name, operation) {
        this.mapOperationQueue[name] = operation;
    }

    displayData() {
        // don't do anything if the map has not yet loaded
        if (!this.state.mapReady) {
            // add to the map operation queue
            this.queueMapOperation('displayData', this.displayData);
            return;
        }

        const source = mapboxSources[this.props.scope];

        // calculate the range of data
        const scale = MapHelper.calculateRange(this.props.data.values);
        const colors = MapHelper.visualizationColors;
        // prepare a set of blank (false) filters
        const filterValues = colors.map(() => (
            []
        ));

        this.props.data.locations.forEach((location, index) => {
            let value = this.props.data.values[index];
            if (isNaN(value)) {
                value = 0;
            }

            // determine the group index
            const group = Math.floor(scale.scale(value));
            // add it to the filter list
            filterValues[group].push(location);
        });

        // generate Mapbox filters from the values
        filterValues.forEach((valueSet, index) => {
            const layerName = `highlight_${this.props.scope}_group_${index}`;
            // by default set up the filter to not include anything
            let filter = ['in', source.filterKey, ''];
            if (valueSet.length > 0) {
                // if there are locations that are displayable, include those in the filter
                filter = ['in', source.filterKey].concat(valueSet);
            }
            this.mapRef.map.setFilter(layerName, filter);
        });

        this.setState({
            spendingScale: scale
        });
    }

    render() {
        let tooltip = null;

        if (this.props.showHover) {
            const TooltipComponent = this.props.tooltip;
            tooltip = (<TooltipComponent
                {...this.props.selectedItem} />);
        }

        return (
            <div
                className="map-container"
                ref={(div) => {
                    this.wrapperDiv = div;
                }}>
                <MapBox
                    loadedMap={this.mapReady}
                    unloadedMap={this.mapRemoved}
                    ref={(component) => {
                        this.mapRef = component;
                    }} />
                <div className="map-instructions">
                    Hover over a {mapboxSources[this.props.scope].label} for more detailed information.
                </div>
                <MapLegend
                    segments={this.state.spendingScale.segments}
                    units={this.state.spendingScale.units} />

                {tooltip}
            </div>
        );
    }
}

MapWrapper.propTypes = propTypes;
MapWrapper.defaultProps = defaultProps;
