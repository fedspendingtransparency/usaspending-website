/**
 * MapWrapper.jsx
 * Created by Kevin Li 2/14/17
 */

import React from 'react';

import _ from 'lodash';

import kGlobalConstants from 'GlobalConstants';

import * as MapHelper from 'helpers/mapHelper';

import MapBox from './map/MapBox';
import MapLegend from './MapLegend';

export default class MapWrapper extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            stateShapes: {},
            stateData: [],
            spendingScale: {
                scale: null,
                segments: []
            },
            mapReady: false
        };

        this.mapRef = null;
        this.mapOperationQueue = {};
        this.mapOperationTimer = null;

        this.mapReady = this.mapReady.bind(this);
        this.mapRemoved = this.mapRemoved.bind(this);

        this.displayData = this.displayData.bind(this);
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
            this.loadStateShapes();
        });
    }

    mapRemoved() {
        // map is about to be removed
        this.setState({
            mapReady: false
        });
    }

    loadStateShapes() {
        if (!this.state.mapReady) {
            return;
        }

        // fetch the state shapes
        MapHelper.fetchFile('graphics/states.json').promise
            .then((res) => {
                // split the data into individual state features
                const states = {};

                res.data.features.forEach((feature) => {
                    const stateName = feature.properties.NAME;
                    const stateCode = MapHelper.stateCodeFromName(stateName);

                    const state = {
                        data: {
                            name: stateName,
                            code: stateCode
                        },
                        shape: {
                            geometry: feature.geometry,
                            type: 'Feature'
                        }
                    };

                    states[stateCode] = state;
                    this.drawStateOutline(stateCode, state.shape);
                });

                this.setState({
                    stateShapes: states
                });
            });
    }

    drawStateOutline(stateCode, geometry) {
        const layerId = `${stateCode}-border`;
        const borderLayer = Object.assign({}, {
            id: layerId,
            type: 'line',
            source: {
                type: 'geojson',
                data: geometry
            },
            layout: {},
            paint: {
                'line-color': '#000',
                'line-opacity': 1
            }
        });

        if (!this.mapRef.getMapLayer(layerId)) {
            // only add the layer if it doesn't already exist
            this.mapRef.addLayer(borderLayer);
        }
    }

    fillState(stateCode, color) {
        const layerId = `${stateCode}-fill`;
        const fillLayer = Object.assign({}, {
            id: layerId,
            type: 'fill',
            source: {
                type: 'geojson',
                data: this.state.stateShapes[stateCode].shape
            },
            layout: {},
            paint: {
                'fill-color': color,
                'fill-opacity': 0.9
            }
        });

        this.mapRef.addLayer(fillLayer, 'state-label-sm');
    }

    runMapOperationQueue() {
        if (!this.state.mapReady) {
            // map is still not ready, wait another 500ms
            this.mapOperationTimer = window.setTimeout(() => {
                this.runMapOperationQueue();
            }, 500);
            return;
        }

        Object.keys(this.mapOperationQueue).forEach((key) => {
            const op = this.mapOperationQueue[key];
            op();
        });
        this.mapOperationTimer = null;
    }

    queueMapOperation(name, operation) {
        this.mapOperationQueue[name] = operation;

        // check if an operation timer exists, if not, create it
        if (!this.mapOperationTimer) {
            this.mapOperationTimer = window.setTimeout(() => {
                this.runMapOperationQueue();
            }, 500);
        }
    }

    displayData() {
        // don't do anything while the map has not yet loaded
        if (!this.state.mapReady) {
            // add to the map operation queue
            this.queueMapOperation('displayData', this.displayData);
            return;
        }

        // remove all current states
        this.state.stateData.forEach((state) => {
            this.map.removeLayer(state);
        });

        // calculate the range of data
        const scale = MapHelper.calculateRange(this.props.data.values);

        // add new states
        const mapStates = [];
        this.props.data.states.forEach((state, index) => {
            const value = this.props.data.values[index];

            // check if the state shape exists
            if (state && {}.hasOwnProperty.call(this.state.stateShapes, state)) {
                // it exists, add it to the map
                // calculate the color
                const group = Math.floor(scale.scale(value));
                const color = MapHelper.visualizationColors[group];
                this.fillState(state, color);

                // this.addState(state, color);
                mapStates.push(`${state}-fill`);
            }
        });

        this.setState({
            stateData: mapStates,
            spendingScale: scale
        });
    }

    addState(stateCode, color) {
        const fillLayer = Object.assign({}, {
            id: `${stateCode}-fill`,
            type: 'fill',
            source: {
                type: 'geojson',
                data: this.state.stateShapes[stateCode].shape
            },
            layout: {},
            paint: {
                'fill-color': color,
                'fill-opacity': 0.9
            }
        });

        const strokeLayer = Object.assign({}, {
            id: `${stateCode}-stroke`,
            type: 'line',
            source: {
                type: 'geojson',
                data: this.state.stateShapes[stateCode].shape
            },
            layout: {},
            paint: {
                'line-color': '#000',
                'line-opacity': 1
            }
        });

        this.map.addLayer(strokeLayer);
        this.map.addLayer(fillLayer, 'state-label-sm');
    }

    render() {
        return (
            <div className="map-container">
                <MapBox
                    loadedMap={this.mapReady}
                    unloadedMap={this.mapRemoved}
                    ref={(component) => {
                        this.mapRef = component;
                    }} />
                <MapLegend segments={this.state.spendingScale.segments} />
            </div>
        );
    }
}
