/**
 * MapBox.jsx
 * Created by Kevin Li 2/17/17
 */

import React from 'react';
import MapboxGL from 'mapbox-gl/dist/mapbox-gl';

import kGlobalConstants from 'GlobalConstants';

const propTypes = {
    loadedMap: React.PropTypes.func,
    unloadedMap: React.PropTypes.func,
    showTooltip: React.PropTypes.func,
    hideTooltip: React.PropTypes.func
};

export default class MapBox extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            mapReady: false,
            dataLayers: []
        };

        this.map = null;

        this.findHoveredLayers = this.findHoveredLayers.bind(this);
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


    getMapLayer(layerId) {
        return this.map.getLayer(layerId);
    }

    setDataLayers(layerIds) {
        this.setState({
            dataLayers: layerIds
        });
    }

    mountMap() {
        MapboxGL.accessToken = kGlobalConstants.MAPBOX_TOKEN;
        this.map = new MapboxGL.Map({
            container: this.mapDiv,
            style: 'mapbox://styles/usaspending/cj18cwjh300302slllhddyynm',
            center: [-98.5795122, 39.8282172],
            zoom: 3,
            dragRotate: false // disable 3D view
        });

        // add navigation controls
        this.map.addControl(new MapboxGL.NavigationControl());

        // disable scroll zoom
        this.map.scrollZoom.disable();

        // prepare the shapes
        this.map.on('load', () => {
            this.setState({
                mapReady: true
            }, () => {
                this.props.loadedMap(this.map);
            });
        });


        this.map.on('mousemove', this.findHoveredLayers);

        this.map.on('mouseout', this.props.hideTooltip);
    }

    findHoveredLayers(e) {
        const features = this.map.queryRenderedFeatures(e.point, {
            layers: this.state.dataLayers
        });

        // just grab the first layer and identify the state
        if (features.length > 0) {
            const layer = features[0].layer;
            // get the state code
            if ({}.hasOwnProperty.call(layer, 'metadata') &&
                {}.hasOwnProperty.call(layer.metadata, 'stateCode')) {
                // display the tooltip
                const stateCode = layer.metadata.stateCode;
                this.props.showTooltip(stateCode, e.point);
            }
        }
    }

    addLayer(layer, belowLayer = null) {
        if (!this.state.mapReady) {
            return;
        }

        this.map.addLayer(layer, belowLayer);
    }

    removeLayer(layerId) {
        this.map.removeLayer(layerId);
        this.map.removeSource(layerId);
    }

    render() {
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
