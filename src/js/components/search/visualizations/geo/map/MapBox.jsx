/**
 * MapBox.jsx
 * Created by Kevin Li 2/17/17
 */

import React from 'react';
import PropTypes from 'prop-types';
import MapboxGL from 'mapbox-gl/dist/mapbox-gl';
import { throttle, isEqual } from 'lodash';
import * as Icons from 'components/sharedComponents/icons/Icons';

import kGlobalConstants from 'GlobalConstants';

const propTypes = {
    loadedMap: PropTypes.func,
    unloadedMap: PropTypes.func,
    center: PropTypes.array
};

// Define map movement increment
const delta = 100;

// define map sources
const mapStyle = 'mapbox://styles/usaspending/cj18cwjh300302slllhddyynm';

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
        this.handleWindowResize = throttle(this.handleWindowResize.bind(this), 16);

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
    // this component should only re-render when it is unmounted first, if we should
    // show/hide the navigation buttons, or the center changed
        if (nextState.showNavigationButtons !== this.state.showNavigationButtons) {
            return true;
        }
        if (nextProps.center !== this.props.center) {
            return true;
        }
        return false;
    }

    componentDidUpdate(prevProps) {
        if (!isEqual(this.props.center, prevProps.center)) {
            this.handleCenterChanged();
        }
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

    centerMap(map) {
        map.jumpTo({
            zoom: 2.25,
            center: this.props.center
        });
    }

    resizeMap() {
        if (this.state.windowWidth < 768) {
            this.map.dragPan.disable();
            this.centerMap(this.map);
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
            style: mapStyle,
            logoPosition: 'bottom-right',
            attributionControl: false,
            center: this.props.center,
            zoom: 3.2,
            dragRotate: false // disable 3D view
        });

        // add navigation controls
        this.map.addControl(new MapboxGL.NavigationControl());
        this.map.addControl(new MapboxGL.AttributionControl({
            compact: false
        }));

        // disable the compass controls
        this.map.dragRotate.disable();

        let showNavigationButtons = false;
        if (this.state.windowWidth < 768) {
            showNavigationButtons = true;
            this.map.dragPan.disable();
            this.centerMap(this.map);
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

    handleCenterChanged() {
        if (this.map) {
            this.centerMap(this.map);
        }
        else {
            this.mountMap();
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
