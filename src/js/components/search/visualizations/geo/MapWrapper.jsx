/**
 * MapWrapper.jsx
 * Created by Kevin Li 2/14/17
 */

import React from 'react';

import * as MapHelper from 'helpers/mapHelper';

import MapBox from './map/MapBox';
import MapLegend from './MapLegend';

const propTypes = {
    data: React.PropTypes.object,
    renderHash: React.PropTypes.string,
    showHover: React.PropTypes.bool,
    selectedItem: React.PropTypes.object,
    showTooltip: React.PropTypes.func,
    hideTooltip: React.PropTypes.func,
    tooltip: React.PropTypes.func
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
        return new Promise((resolve, reject) => {
            if (!this.state.mapReady) {
                resolve();
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

                        let shape = {
                            geometry: feature.geometry,
                            type: 'Feature'
                        };

                        if (feature.type === 'FeatureCollection') {
                            // this is a collection of multiple shapes (ie, islands)
                            shape = {
                                type: 'FeatureCollection',
                                features: feature.features
                            };
                        }

                        const state = {
                            shape,
                            data: {
                                name: stateName,
                                code: stateCode
                            }
                        };

                        states[stateCode] = state;
                    });

                    this.setState({
                        stateShapes: states
                    }, () => {
                        resolve();
                    });
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }

    outlineState(stateCode) {
        const layerId = `${stateCode}-border`;
        const borderLayer = Object.assign({}, {
            id: layerId,
            type: 'line',
            source: {
                type: 'geojson',
                data: this.state.stateShapes[stateCode].shape
            },
            layout: {},
            paint: {
                'line-color': '#000',
                'line-opacity': 0.3
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
                'fill-opacity': 1
            },
            metadata: {
                stateCode
            }
        });

        this.mapRef.addLayer(fillLayer, 'state-label-sm');
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

        // remove all current states
        this.state.stateData.forEach((state) => {
            this.mapRef.removeLayer(`${state}-fill`);
            this.mapRef.removeLayer(`${state}-border`);
        });
        this.mapRef.setDataLayers([]);

        // calculate the range of data
        const scale = MapHelper.calculateRange(this.props.data.values);

        // add new states
        const mapStates = [];
        const fillLayers = [];
        this.props.data.states.forEach((state, index) => {
            let value = this.props.data.values[index];
            if (isNaN(value)) {
                value = 0;
            }

            // check if the state shape exists
            if (state && {}.hasOwnProperty.call(this.state.stateShapes, state)) {
                // it exists, add it to the map
                // calculate the color
                const group = Math.floor(scale.scale(value));
                const color = MapHelper.visualizationColors[group];
                this.fillState(state, color);
                this.outlineState(state);

                fillLayers.push(`${state}-fill`);
                mapStates.push(state);
            }
        });

        // update the data layer array in the mapbox component
        this.mapRef.setDataLayers(fillLayers);

        this.setState({
            stateData: mapStates,
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
