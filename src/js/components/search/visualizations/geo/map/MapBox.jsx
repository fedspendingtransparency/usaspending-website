/**
 * MapBox.jsx
 * Created by Kevin Li 2/17/17
 */

import React, { useEffect, useState, useImperativeHandle } from 'react';
import PropTypes from 'prop-types';
import MapboxGL from 'mapbox-gl/dist/mapbox-gl';
import { throttle } from 'lodash';
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

const MapBox = React.forwardRef((props, ref) => {
    let componentUnmounted = false;
    let map;
    const test = 'test';
    const mapDiv = React.useRef(null);

    const [windowWidth, setWindowWidth] = useState(0);
    const [showNavButtons, setShowNavButtons] = useState(false);

    useImperativeHandle(ref, () => ({
        map,
        test
    }));

    const moveMap = (bearing) => {
        map.panBy(bearing);
    };

    const moveUp = () => {
        moveMap([0, -delta]);
    };

    const moveLeft = () => {
        moveMap([-delta, 0]);
    };

    const moveRight = () => {
        moveMap([delta, 0]);
    };

    const moveDown = () => {
        moveMap([0, delta]);
    };


    const centerMap = (m) => {
        m.jumpTo({
            zoom: 2.25,
            center: props.center
        });
    };

    const resizeMap = () => {
        if (windowWidth < 768) {
            map.dragPan.disable();
            centerMap(map);
            setShowNavButtons(true);
        }
        else {
            map.dragPan.enable();
            setShowNavButtons(false);
        }
    };

    const mountMap = () => {
        MapboxGL.accessToken = kGlobalConstants.MAPBOX_TOKEN;
        map = new MapboxGL.Map({
            container: mapDiv.current,
            style: mapStyle,
            logoPosition: 'bottom-right',
            attributionControl: false,
            center: props.center,
            zoom: 3.2,
            dragRotate: false // disable 3D view
        });

        // add navigation controls
        map.addControl(new MapboxGL.NavigationControl());
        map.addControl(new MapboxGL.AttributionControl({
            compact: false
        }));

        // disable the compass controls
        map.dragRotate.disable();

        let showNavigationButtons = false;
        if (windowWidth < 768) {
            showNavigationButtons = true;
            map.dragPan.disable();
            centerMap(map);
        }

        // disable scroll zoom
        map.scrollZoom.disable();

        // prepare the shapes
        map.on('load', () => {
            if (componentUnmounted) {
                // don't update the state if the map has been unmounted
                return;
            }

            setShowNavButtons(showNavigationButtons);
            props.loadedMap(map);
        });
    };

    const handleWindowResize = () => {
        // determine if the width changed
        throttle(() => {
            const currentWindowWidth = window.innerWidth;
            if (currentWindowWidth !== windowWidth) {
                // width changed, update the visualization width
                setWindowWidth(currentWindowWidth);
                if (map) {
                    resizeMap();
                }
                else {
                    mountMap();
                }
            }
        }, 16);
    };

    const handleCenterChanged = () => {
        if (map) {
            centerMap(map);
        }
        else {
            mountMap();
        }
    };

    useEffect(() => {
        componentUnmounted = false;
        handleWindowResize();
        window.addEventListener('resize', handleWindowResize);
    });

    useEffect(() => {
        handleCenterChanged();
        /* eslint-disable react-hooks/exhaustive-deps */
    }, [props.center]);

    useEffect(() => () => {
        window.removeEventListener('resize', handleWindowResize);
        props.unloadedMap();
        componentUnmounted = true;
    }, []);

    return (
        <div
            className="mapbox-item"
            ref={(div) => {
                mapDiv.current = div;
            }}>
            <div className={`map-buttons ${showNavButtons ? 'hide' : ''}`}>
                <div className="first-row">
                    <button
                        onMouseDown={moveUp}
                        onTouchStart={moveUp}>
                        <Icons.AngleUp />
                    </button>
                </div>
                <div className="second-row">
                    <button
                        onMouseDown={moveLeft}
                        onTouchStart={moveLeft}>
                        <Icons.AngleLeft />
                    </button>
                    <button
                        onMouseDown={moveDown}
                        onTouchStart={moveDown}>
                        <Icons.AngleDown />
                    </button>
                    <button
                        onMouseDown={moveRight}
                        onTouchStart={moveRight}>
                        <Icons.AngleRight />
                    </button>
                </div>
            </div>
        </div>
    );
});

MapBox.propTypes = propTypes;

export default MapBox;
