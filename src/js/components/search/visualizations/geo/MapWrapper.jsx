/**
 * MapWrapper.jsx
 * Created by Kevin Li 2/14/17
 */

import React from 'react';
import Q from 'q';
import _ from 'lodash';

import kGlobalConstants from 'GlobalConstants';

import * as MapHelper from 'helpers/mapHelper';

import MapBox from './map/MapBox';
import MapLegend from './MapLegend';

const propTypes = {
    data: React.PropTypes.object
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

    loadStateShapes() {
        const deferred = Q.defer();
        if (!this.state.mapReady) {
            deferred.resolve();
            return deferred.promise;
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
                }, () => {
                    deferred.resolve();
                });
            })
            .catch((err) => {
                deferred.reject(err);
            });

        return deferred.promise;
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
        // if (!this.state.mapReady) {
        //     // map is still not ready, wait another 500ms
        //     this.mapOperationTimer = window.setTimeout(() => {
        //         this.runMapOperationQueue();
        //     }, 500);
        //     return;
        // }

        console.log("QUEUE READY");

        Object.keys(this.mapOperationQueue).forEach((key) => {
            const op = this.mapOperationQueue[key];
            op.call(this);
        });
        this.mapOperationTimer = null;
        this.mapOperationQueue = {};
    }

    queueMapOperation(name, operation) {
        this.mapOperationQueue[name] = operation;

        // check if an operation timer exists, if not, create it
        // if (!this.mapOperationTimer) {
        //     this.mapOperationTimer = window.setTimeout(() => {
        //         this.runMapOperationQueue();
        //     }, 500);
        // }
    }

    displayData() {
        // don't do anything while the map has not yet loaded
        if (!this.state.mapReady) {
            // add to the map operation queue
            this.queueMapOperation('displayData', this.displayData);
            console.log("queued");
            return;
        }

        // remove all current states
        console.log(this.props.data);
        this.state.stateData.forEach((layer) => {
            this.mapRef.removeLayer(layer);
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

                mapStates.push(`${state}-fill`);
            }
        });

        this.setState({
            stateData: mapStates,
            spendingScale: scale
        });
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
                <MapLegend
                    segments={this.state.spendingScale.segments}
                    units={this.state.spendingScale.units} />
            </div>
        );
    }
}

MapWrapper.propTypes = propTypes;
MapWrapper.defaultProps = defaultProps;
