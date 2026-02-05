/**
 * MapBox.jsx
 * Created by Kevin Li 2/17/17
 */

import React, {
    useEffect, useState, useRef, useCallback, useContext, useMemo
} from 'react';
import PropTypes from 'prop-types';
import MapboxGL from 'mapbox-gl/dist/mapbox-gl';

import kGlobalConstants from 'GlobalConstants';
import statesBySqMile from "dataMapping/state/statesBySqMile";
import IsMobileContext from "context/IsMobileContext";
import MapBoxNavButtons from "./MapBoxNavButtons";

const propTypes = {
    setMapReady: PropTypes.func,
    center: PropTypes.array,
    stateProfile: PropTypes.bool,
    stateInfo: PropTypes.object,
    singleLocationSelected: PropTypes.object,
    ref: PropTypes.shape({ current: PropTypes.object })
};

// define map sources
const mapStyle = 'mapbox://styles/usaspendingfrbkc/cm97fy9mm00g601qt032hg79g';

const MapBox = ({
    setMapReady,
    center,
    stateProfile,
    stateInfo,
    singleLocationSelected,
    ref: map
}) => {
    const { isTablet } = useContext(IsMobileContext);
    const [showNavButtons, setShowNavButtons] = useState(false);
    const mapDiv = useRef(null);

    const code = stateInfo?.code;

    const isStateSelected = useMemo(() => !!(
        code !== '' ||
        (
            singleLocationSelected &&
            Object.prototype.hasOwnProperty.call(singleLocationSelected, 'state')
        )
    ), [singleLocationSelected, code]);

    const isCountyOrDistrict = useMemo(() => (
        singleLocationSelected &&
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
    ), [singleLocationSelected]);

    const stateCode = code || singleLocationSelected?.state;

    const calculateMapZoom = useCallback(() => {
        let zoom = 3.2;

        if (isStateSelected) {
            if (stateCode && stateCode !== '') {
                const stateMile = statesBySqMile.find((s) => s.code === stateCode);
                if (stateMile?.size > 500000) {
                    zoom = 3.0;
                }
                else if (stateMile?.size < 1000) {
                    zoom = 9.6;
                }
                else if (stateMile?.size < 10000) {
                    zoom = 6.2;
                }
                else if (stateMile?.size < 140000) {
                    zoom = 4.8;
                }
                zoom = 4.2;
            }

            zoom += isCountyOrDistrict ? 1 : 0;
        }

        return zoom;
    }, [isStateSelected, stateCode, isCountyOrDistrict]);

    const centerMap = useCallback((m, z, c) => {
        m?.current?.jumpTo({
            zoom: z,
            center: c
        });
    }, []);

    useEffect(() => {
        const mapReady = map.current && center?.length > 0;
        const isReCenterable = stateProfile ?
            false :
            (
                center?.length > 0 &&
                singleLocationSelected &&
                Object.keys(singleLocationSelected)?.length > 0
            );
        const isForeign = singleLocationSelected?.country !== "USA";

        if (
            mapReady ||
            (isReCenterable && isForeign)
        ) {
            centerMap(map, calculateMapZoom(), center);
        }
    }, [centerMap, map, calculateMapZoom, center, stateProfile, singleLocationSelected]);

    const resizeMap = useCallback((m, z, c, isMobile) => {
        if (isMobile) {
            m.current.dragPan.disable();
            centerMap(m, z, c);
            setShowNavButtons(true);
        }
        else {
            m.current.dragPan.enable();
            setShowNavButtons(false);
        }
    }, [centerMap]);

    const mountMap = useCallback((m, z, c, mounted, isMobile) => {
        MapboxGL.accessToken = kGlobalConstants.MAPBOX_TOKEN;
        // eslint-disable-next-line no-param-reassign
        m.current = new MapboxGL.Map({
            container: mapDiv.current,
            style: mapStyle,
            logoPosition: 'bottom-left',
            attributionControl: false,
            center: c,
            zoom: z,
            dragRotate: false // disable 3D view
        });

        // add navigation controls
        m.current.addControl(new MapboxGL.NavigationControl());
        m.current.addControl(new MapboxGL.AttributionControl({
            compact: false
        }));

        // disable the compass controls
        m.current.dragRotate.disable();

        let showNavigationButtons = false;
        if (isMobile) {
            showNavigationButtons = true;
            m.current.dragPan.disable();
            centerMap(m, z, c);
        }

        // disable scroll zoom
        m.current.scrollZoom.disable();

        // prepare the shapes
        m.current.on('load', () => {
            if (!mounted) {
                // don't update the state if the map has been unmounted
                return;
            }

            setShowNavButtons(showNavigationButtons);
            setMapReady(true);
        });
    }, [centerMap, setMapReady]);

    useEffect(() => {
        let mounted = true;
        const zoom = calculateMapZoom();

        if (map.current) {
            resizeMap(map, zoom, center, isTablet);
        }
        else {
            mountMap(
                map,
                zoom,
                center,
                mounted,
                isTablet
            );
        }

        return () => {
            mounted = false;
            setMapReady(false);
        };
    }, [map, calculateMapZoom, center, resizeMap, mountMap, isTablet, setMapReady]);

    return (
        <div className="mapbox-item" ref={mapDiv}>
            <MapBoxNavButtons showNavButtons={showNavButtons} map={map} />
        </div>
    );
};

MapBox.propTypes = propTypes;
export default MapBox;
