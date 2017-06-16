/**
 * MapBox.jsx
 * Created by Kevin Li 2/17/17
 */

import React from 'react';
import MapboxGL from 'mapbox-gl/dist/mapbox-gl';
import { throttle } from 'lodash';
import * as Icons from 'components/sharedComponents/icons/Icons';

import kGlobalConstants from 'GlobalConstants';

const propTypes = {
    loadedMap: React.PropTypes.func,
    unloadedMap: React.PropTypes.func,
    showTooltip: React.PropTypes.func,
    hideTooltip: React.PropTypes.func
};

// Define map movement increment
const delta = 100;

export default class MapBox extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            mapReady: false,
            dataLayers: [],
            windowWidth: 0,
            showNavigationButtons: false
        };

        this.map = null;
        this.componentUnmounted = false;

        // Bind window functions
        this.findHoveredLayers = this.findHoveredLayers.bind(this);
        this.handleWindowResize = throttle(this.handleWindowResize.bind(this), 50);

        // Bind movement functions
        this.moveUp = this.moveUp.bind(this);
        this.moveLeft = this.moveLeft.bind(this);
        this.moveRight = this.moveRight.bind(this);
        this.moveDown = this.moveDown.bind(this);
    }

    componentDidMount() {
        this.componentUnmounted = false;
        this.handleWindowResize();
        window.addEventListener('resize', this.handleWindowResize);
    }

    shouldComponentUpdate(nextProps, nextState) {
        // this component should never re-render unless it is unmounted first, or if we should
        // show/hide the navigation buttons
        if (nextState.showNavigationButtons !== this.state.showNavigationButtons) {
            return true;
        }
        return false;
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleWindowResize);
        this.props.unloadedMap();
        this.componentUnmounted = true;
    }

    getMapLayer(layerId) {
        return this.map.getLayer(layerId);
    }

    setDataLayers(layerIds) {
        this.setState({
            dataLayers: layerIds
        });
    }

    moveUp() {
        this.moveMap([0, -delta]);
    }

    moveLeft() {
        this.moveMap([-delta, 0]);
    }

    moveRight() {
        this.moveMap([delta, 0]);
    }

    moveDown() {
        this.moveMap([0, delta]);
    }

    moveMap(bearing) {
        this.map.panBy(bearing);
    }

    resizeMap() {
        if (this.state.windowWidth < 768) {
            this.map.dragPan.disable();
            this.setState({
                showNavigationButtons: true
            });
        }
        else {
            this.map.dragPan.enable();
            this.setState({
                showNavigationButtons: false
            });
        }
    }

    mountMap() {
        MapboxGL.accessToken = kGlobalConstants.MAPBOX_TOKEN;
        this.map = new MapboxGL.Map({
            container: this.mapDiv,
            style: 'mapbox://styles/usaspending/cj18cwjh300302slllhddyynm',
            center: [-98.5795122, 39.2282172],
            zoom: 3.2,
            dragRotate: false // disable 3D view
        });

        // add navigation controls
        this.map.addControl(new MapboxGL.NavigationControl());

        // disable the compass controls
        this.map.dragRotate.disable();

        let showNavigationButtons = false;
        if (this.state.windowWidth < 768) {
            showNavigationButtons = true;
            this.map.dragPan.disable();
        }

        // disable scroll zoom
        this.map.scrollZoom.disable();

        // prepare the shapes
        this.map.on('load', () => {
            if (this.componentUnmounted) {
                // don't update the state if the map has been unmounted
                return;
            }

            this.setState({
                mapReady: true,
                showNavigationButtons
            }, () => {
                this.props.loadedMap(this.map);
            });
        });

        if (this.state.windowWidth >= 768) {
            this.map.on('mousemove', this.findHoveredLayers);
            this.map.on('mouseout', this.props.hideTooltip);
        }
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
            else {
                // no state code, hide the tooltip
                this.props.hideTooltip();
            }
        }
        else {
            // no state layer, hide the tooltip
            this.props.hideTooltip();
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

    handleWindowResize() {
        // determine if the width changed
        const windowWidth = window.innerWidth;
        if (this.state.windowWidth !== windowWidth) {
            // width changed, update the visualization width
            this.setState({
                windowWidth
            }, () => {
                if (this.map) {
                    this.resizeMap();
                }
                else {
                    this.mountMap();
                }
            });
        }
    }

    render() {
        let hideClass = '';
        if (this.state.showNavigationButtons === false) {
            hideClass = ' hide';
        }

        return (
            <div
                className="mapbox-item"
                ref={(div) => {
                    this.mapDiv = div;
                }}>
                <div className={`map-buttons ${hideClass}`}>
                    <div className="first-row">
                        <button
                            onMouseDown={this.moveUp}
                            onTouchStart={this.moveUp}>
                            <Icons.AngleUp />
                        </button>
                    </div>
                    <div className="second-row">
                        <button
                            onMouseDown={this.moveLeft}
                            onTouchStart={this.moveLeft}>
                            <Icons.AngleLeft />
                        </button>
                        <button
                            onMouseDown={this.moveDown}
                            onTouchStart={this.moveDown}>
                            <Icons.AngleDown />
                        </button>
                        <button
                            onMouseDown={this.moveRight}
                            onTouchStart={this.moveRight}>
                            <Icons.AngleRight />
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

MapBox.propTypes = propTypes;
