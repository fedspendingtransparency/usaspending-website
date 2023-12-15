/**
 * MapBox.jsx
 * Created by Kevin Li 2/17/17
 */

import React, { useState, useEffect } from 'react';
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
    const { loadedMap, unloadedMap, center } = props;

    const [windowWidth, setWindowWidth] = useState(0);
    const [showNavigationButtons, setShowNavigationButtons] = useState(false);
    const [componentUnmounted, setComponentUnmounted] = useState(false);
    let map = null;
    let mapDiv;
    console.log('ref: ', ref);

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

    const centerMap = (mapVar) => {
        mapVar.jumpTo({
            zoom: 2.25,
            center
        });
    };

    const resizeMap = () => {
        if (windowWidth < 768) {
            map.dragPan.disable();
            centerMap(map);
            setShowNavigationButtons(true);
        }
        else {
            map.dragPan.enable();
            setShowNavigationButtons(false);
        }
    };

    const mountMap = () => {
        MapboxGL.accessToken = kGlobalConstants.MAPBOX_TOKEN;
        map = new MapboxGL.Map({
            container: mapDiv,
            style: mapStyle,
            logoPosition: 'bottom-right',
            attributionControl: false,
            center,
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

        let showNavigationButtonsTest = false;
        if (windowWidth < 768) {
            showNavigationButtonsTest = true;
            map.dragPan.disable();
            centerMap(map);
        }

        // disable scroll zoom
        map.scrollZoom.disable();

        // prepare the shapes
        map.on('load', () => {
            // don't update the state if the map has been unmounted
            if (componentUnmounted) {
                return;
            }
            setShowNavigationButtons(showNavigationButtonsTest);
            loadedMap(map);
        });
    };

    const handleWindowResizeTest = () => {
    // determine if the width changed
        const windowWidthTest = window.innerWidth;
        if (windowWidth !== windowWidthTest) {
            // width changed, update the visualization width
            setWindowWidth(windowWidthTest);
            if (map) {
                resizeMap();
            }
            else {
                mountMap();
            }
        }
    };

    // Bind window functions
    const handleWindowResize = throttle(handleWindowResizeTest.bind(this), 16);

    const handleCenterChanged = () => {
        if (map) {
            centerMap(map);
        }
        else {
            mountMap();
        }
    };

    let hideClass = '';
    if (showNavigationButtons === false) {
        hideClass = ' hide';
    }

    useEffect(() => {
        setComponentUnmounted(false);
        handleWindowResize();
        window.addEventListener('resize', handleWindowResize);
        /* eslint-disable-next-line react-hooks/exhaustive-deps */
    }, [handleWindowResize]);

    useEffect(() => {
        handleCenterChanged();
        /* eslint-disable-next-line react-hooks/exhaustive-deps */
    }, [center]);

    useEffect(() => {
        window.removeEventListener('resize', handleWindowResize);
        unloadedMap();
        setComponentUnmounted(true);
        /* eslint-disable-next-line react-hooks/exhaustive-deps */
    }, []);

    return (
        <div
            className="mapbox-item"
            ref={(div) => {
                mapDiv = div;
            }}>
            <div className={`map-buttons ${hideClass}`}>
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
