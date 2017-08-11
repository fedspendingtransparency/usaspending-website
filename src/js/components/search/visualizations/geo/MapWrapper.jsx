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
    renderHash: PropTypes.string,
    showHover: PropTypes.bool,
    selectedItem: PropTypes.object,
    showTooltip: PropTypes.func,
    hideTooltip: PropTypes.func,
    tooltip: PropTypes.func
};

const defaultProps = {
    data: {
        states: [],
        values: []
    }
};

export default class MapWrapper extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            stateShapes: {},
            stateData: [],
            spendingScale: {
                scale: null,
                segments: [],
                units: {}
            },
            mapReady: false
        };

        this.mapRef = null;
        this.mapOperationQueue = {};
        this.mapOperationTimer = null;

        this.mapReady = this.mapReady.bind(this);
        this.mapRemoved = this.mapRemoved.bind(this);
    }

    componentDidMount() {
        this.displayData();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.renderHash !== this.props.renderHash) {
            this.displayData();
        }
    }

    mapReady() {
        // map has mounted, load the state shapes
        this.setState({
            mapReady: true
        }, () => {
            this.loadStateShapes()
                .then(() => {
                    // we depend on the state shapes to process the state fills, so the operation
                    // queue must wait for the state shapes to load first
                    this.runMapOperationQueue();
                });
        });
    }

    mapRemoved() {
        // map is about to be removed
        this.setState({
            mapReady: false
        });
    }

    determineVisibleStates() {
        // determine which states are in view
        const states = this.mapRef.map.queryRenderedFeatures({
            layers: ['us_state_shapes']
        });

        const visibleStates = states.map((state) => (
            state.properties.STUSPS
        ));

        // remove the duplicates values
        return uniq(visibleStates);
    }

    loadStateShapes() {
        return new Promise((resolve, reject) => {
            if (!this.state.mapReady) {
                // something went wrong, the map isn't ready yet
                reject();
            }

            // add the state shapes data
            this.mapRef.map.addSource('states', {
                type: 'vector',
                url: 'mapbox://usaspending.9cse49bi'
            });

            // transform the state shapes into its own layer
            this.mapRef.map.addLayer({
                id: 'us_state_shapes',
                type: 'fill',
                source: 'states',
                'source-layer': 'cb_2016_us_state_500k-ckeyb7',
                paint: {
                    'fill-outline-color': 'rgba(0,0,0,0.3)',
                    'fill-color': 'rgba(0,0,0,0)'
                }
            });

            // generate the highlight layers
            const colors = MapHelper.visualizationColors;
            colors.forEach((color, index) => {
                this.mapRef.map.addLayer({
                    id: `highlight_state_group_${index}`,
                    type: 'fill',
                    source: 'states',
                    'source-layer': 'cb_2016_us_state_500k-ckeyb7',
                    paint: {
                        'fill-outline-color': 'rgba(0,0,0,0.3)',
                        'fill-color': color
                    },
                    filter: ['in', 'STUSPS', '']
                });
            });

            resolve();
        });
    }

    runMapOperationQueue() {
        Object.keys(this.mapOperationQueue).forEach((key) => {
            const op = this.mapOperationQueue[key];
            op.call(this);
        });
        this.mapOperationTimer = null;
        this.mapOperationQueue = {};
    }

    queueMapOperation(name, operation) {
        this.mapOperationQueue[name] = operation;
    }

    displayData() {
        // don't do anything while the map has not yet loaded
        if (!this.state.mapReady) {
            // add to the map operation queue
            this.queueMapOperation('displayData', this.displayData);
            return;
        }

        const highlightLayers = {};

        // calculate the range of data
        const scale = MapHelper.calculateRange(this.props.data.values);
        const colors = MapHelper.visualizationColors;
        // prepare a set of blank (false) filters
        const filterValues = colors.map(() => (
            []
        ));

        this.props.data.states.forEach((state, index) => {
            let value = this.props.data.values[index];
            if (isNaN(value)) {
                value = 0;
            }

            // determine the group index
            const group = Math.floor(scale.scale(value));
            // add it to the filter list
            filterValues[group].push(state);
        });

        // generate Mapbox filters from the values
        filterValues.forEach((valueSet, index) => {
            const layerName = `highlight_state_group_${index}`;
            let filter = ['in', 'STUSPS', ''];
            if (valueSet.length > 0) {
                filter = ['in', 'STUSPS'].concat(valueSet);
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
                    showTooltip={this.props.showTooltip}
                    hideTooltip={this.props.hideTooltip}
                    ref={(component) => {
                        this.mapRef = component;
                    }} />
                <div className="map-instructions">
                    Hover over a state for more detailed information.
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
