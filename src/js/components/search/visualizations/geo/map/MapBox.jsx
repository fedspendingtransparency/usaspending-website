/**
 * MapBox.jsx
 * Created by Kevin Li 2/17/17
 */

import React from 'react';
import MapboxGL from 'mapbox-gl/dist/mapbox-gl';

import kGlobalConstants from 'GlobalConstants';

const propTypes = {
    loadedMap: React.PropTypes.func,
    unloadedMap: React.PropTypes.func
};

export default class MapBox extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            mapReady: false
        };

        this.map = null;
    }
    componentDidMount() {
        this.mountMap();
    }

    shouldComponentUpdate() {
        // this component should never re-render unless it is unmounted first
        return false;
    }

    componentWillUnmount() {
        this.props.unloadedMap();
    }

    mountMap() {
        MapboxGL.accessToken = kGlobalConstants.MAPBOX_TOKEN;
        this.map = new MapboxGL.Map({
            container: this.mapDiv,
            style: 'mapbox://styles/mapbox/streets-v9',
            center: [-98.5795122, 39.8282172],
            zoom: 3,
            dragRotate: false // disable 3D view
        });

        // add navigation controls
        this.map.addControl(new MapboxGL.NavigationControl());

        // prepare the shapes
        this.map.on('load', () => {
            this.setState({
                mapReady: true
            }, () => {
                this.props.loadedMap(this.map);
            });
        });
    }

    addLayer(layer, belowLayer = null) {
        if (!this.state.mapReady) {
            return;
        }

        this.map.addLayer(layer, belowLayer);
    }

    getMapLayer(layerId) {
        return this.map.getLayer(layerId);
    }

    render() {
        console.log("RENDER");
        return (
            <div
                className="mapbox-item"
                ref={(div) => {
                    this.mapDiv = div;
                }} />
        );
    }
}

MapBox.propTypes = propTypes;
