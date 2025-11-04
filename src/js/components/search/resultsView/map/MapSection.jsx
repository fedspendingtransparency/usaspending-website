/**
 * MapSection.jsx
 * Created by Andrea Blackwell 04/14/2024
 **/

import React, { useState } from "react";
import PropTypes from "prop-types";

import Analytics from "../../../../helpers/analytics/Analytics";
import MapSectionWrapper from "../../../../containers/search/resultsView/MapWrapperContainer";
import MapDsm from "./MapDsm";
import PlaceholderComponent from "../PlaceholderComponent";

const propTypes = {
    spendingLevel: PropTypes.string,
    mapHasLoaded: PropTypes.bool,
    hash: PropTypes.string
};

const MapSection = ({ spendingLevel, mapHasLoaded, hash }) => {
    const [selectedDropdown, setSelectedDropdown] = useState('place_of_performance');

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
        <div id="search-page-component" className="map">
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
