/**
 * MapSection.jsx
 * Created by Andrea Blackwell 04/14/2024
 **/

import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import Analytics from "../../../../helpers/analytics/Analytics";
import MapSectionWrapper from "../../../../containers/search/resultsView/MapWrapperContainer";
import MapDsm from "./MapDsm";
import PlaceholderComponent from "../PlaceholderComponent";
import useIntersectionObserver from "../../../../hooks/useIntersectionObserver";
import logVisualizationViewEvent from "../logVisualizationViewEvent";

const propTypes = {
    spendingLevel: PropTypes.string,
    hash: PropTypes.string
};

const MapSection = ({ spendingLevel, hash }) => {
    const [selectedDropdown, setSelectedDropdown] = useState('place_of_performance');
    const { ref, isIntersecting: mapHasLoaded } = useIntersectionObserver({
        threshold: 0.1,
        freezeOnceVisible: true
    });

    useEffect(() => {
        if (mapHasLoaded) {
            logVisualizationViewEvent("map", hash);
        }
    }, [mapHasLoaded, hash]);

    const onClick = (e) => {
        setSelectedDropdown(e);
        Analytics.event({
            category: 'Section Map',
            action: `View ${e}`,
            label: hash
        });
    };

    const wrapperProps = {
        sectionTitle: 'Results by Geography',
        dropdownOptions: [
            {
                name: 'Place of Performance',
                value: 'place_of_performance',
                onClick,
                dsmContent: <MapDsm spendingLevel={spendingLevel} />
            },
            {
                name: 'Recipient Location',
                value: 'recipient_location',
                onClick,
                dsmContent: <MapDsm spendingLevel={spendingLevel} />
            }
        ],
        selectedDropdownOption: selectedDropdown,
        sectionName: 'map'
    };

    return (
        <div ref={ref} className="map">
            {mapHasLoaded ?
                <MapSectionWrapper
                    scope={selectedDropdown}
                    setScope={setSelectedDropdown}
                    wrapperProps={wrapperProps}
                    hash={hash} />
                :
                <PlaceholderComponent classname="map" />
            }
        </div>
    );
};

MapSection.propTypes = propTypes;
export default MapSection;
