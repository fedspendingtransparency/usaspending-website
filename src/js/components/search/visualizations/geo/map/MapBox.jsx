/**
 * MapBox.jsx
 * Created by Kevin Li 2/17/17
 */

import React, {
    useEffect, useState, useRef, useCallback, useContext
} from 'react';
import PropTypes from 'prop-types';
import MapboxGL from 'mapbox-gl/dist/mapbox-gl';

import kGlobalConstants from 'GlobalConstants';
import statesBySqMile from "dataMapping/state/statesBySqMile";
import IsMobileContext from "context/IsMobileContext";
import MapBoxNavButtons from "./MapBoxNavButtons";

const propTypes = {
    loadedMap: PropTypes.func,
    unloadedMap: PropTypes.func,
    center: PropTypes.array,
    stateProfile: PropTypes.bool,
    stateInfo: PropTypes.object,
    singleLocationSelected: PropTypes.object
};

// define map sources
const mapStyle = 'mapbox://styles/usaspendingfrbkc/cm97fy9mm00g601qt032hg79g';

// eslint-disable-next-line prefer-arrow-callback
const MapBox = ({
    loadedMap,
    unloadedMap,
    center,
    stateProfile,
    stateInfo,
    singleLocationSelected,
    ref: map
}) => {
    const { isTablet } = useContext(IsMobileContext);
    const [showNavButtons, setShowNavButtons] = useState(false);
    const [zoom, setZoom] = useState(3.2);
    const mapDiv = useRef(null);


    const isStateSelected = () => !!(
        stateInfo?.code !== '' ||
        (
            singleLocationSelected &&
            Object.prototype.hasOwnProperty.call(singleLocationSelected, 'state')
        )
    );

    const isCountyOrDistrict = useCallback(
        () => singleLocationSelected &&
                Object.keys(singleLocationSelected)?.length > 0 &&
                (
                    Object.prototype.hasOwnProperty.call(singleLocationSelected, "state") &&
                    singleLocationSelected.state !== "AK"
                ) &&
                (
                    Object.prototype.hasOwnProperty.call(singleLocationSelected, "county") ||
                    Object.prototype.hasOwnProperty.call(singleLocationSelected, "district_current") ||
                    Object.prototype.hasOwnProperty.call(singleLocationSelected, "district_original")
                )
        , [singleLocationSelected]);

    const calculateMapZoom = () => {
        let zoomLevel = 3.2;

        if (isStateSelected()) {
            const stateCode = stateInfo?.code || singleLocationSelected?.state;

            if (stateCode && stateCode !== '') {
                const state = statesBySqMile.find((s) => s.code === stateCode);
                if (state?.size > 500000) {
                    zoomLevel = 3.0;
                }
                else if (state?.size < 1000) {
                    zoomLevel = 9.6;
                }
                else if (state?.size < 10000) {
                    zoomLevel = 6.2;
                }
                else if (state?.size < 140000) {
                    zoomLevel = 4.8;
                }
                zoomLevel = 4.2;
            }

            zoomLevel += isCountyOrDistrict() ? 1 : 0;
        }

        setZoom(zoomLevel);
        return zoomLevel;
    };

    const centerMap = (m) => {
        m?.current?.jumpTo({
            zoom: zoom || 3.2,
            center
        });
    };

    const resizeMap = () => {
        if (isTablet) {
            map.current.dragPan.disable();
            centerMap(map);
            setShowNavButtons(true);
        }
        else {
            map.current.dragPan.enable();
            setShowNavButtons(false);
        }
    };

    const mountMap = (mounted) => {
        MapboxGL.accessToken = kGlobalConstants.MAPBOX_TOKEN;
        // eslint-disable-next-line no-param-reassign
        map.current = new MapboxGL.Map({
            container: mapDiv.current,
            style: mapStyle,
            logoPosition: 'bottom-left',
            attributionControl: false,
            center,
            zoom: calculateMapZoom(),
            dragRotate: false // disable 3D view
        });

        // add navigation controls
        map.current.addControl(new MapboxGL.NavigationControl());
        map.current.addControl(new MapboxGL.AttributionControl({
            compact: false
        }));

        // disable the compass controls
        map.current.dragRotate.disable();

        let showNavigationButtons = false;
        if (isTablet) {
            showNavigationButtons = true;
            map.current.dragPan.disable();
            centerMap(map);
        }

        // disable scroll zoom
        map.current.scrollZoom.disable();

        // prepare the shapes
        map.current.on('load', () => {
            if (!mounted) {
                // don't update the state if the map has been unmounted
                return;
            }

            setShowNavButtons(showNavigationButtons);
            loadedMap(map);
        });
    };

    const isReCenterable = useCallback(() => {
        if (stateProfile) {
            return false;
        }

        return center?.length > 0 &&
            singleLocationSelected &&
            Object.keys(singleLocationSelected)?.length > 0;
    }, [center.length, singleLocationSelected, stateProfile]);

    useEffect(() => {
        if (isReCenterable()) {
            if (singleLocationSelected?.country !== "USA") {
                centerMap(map);
            }
            else {
                calculateMapZoom();
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [center, singleLocationSelected]);

    useEffect(() => {
        if (map.current && center?.length > 0) {
            centerMap(map);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [zoom, center]);

    useEffect(() => {
        let mounted = true;
        if (map.current) {
            resizeMap();
        }
        else {
            mountMap(mounted);
        }

        return () => {
            mounted = false;
            unloadedMap();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isTablet]);

    return (
        <div className="mapbox-item" ref={mapDiv}>
            <MapBoxNavButtons showNavButtons={showNavButtons} map={map} />
        </div>
    );
};

MapBox.propTypes = propTypes;

export default MapBox;
