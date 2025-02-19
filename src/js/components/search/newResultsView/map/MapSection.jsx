/**
 * MapSection.jsx
 * Created by Andrea Blackwell 04/14/2024
 **/

import React, { useState } from "react";
import PropTypes from "prop-types";

import Analytics from "../../../../helpers/analytics/Analytics";
import MapSectionWrapper from "../../../../containers/search/newResultsView/MapSectionWrapper";
import MapDsm from "./MapDsm";
import PlaceholderComponent from "../PlaceholderComponent";

const propTypes = {
    subaward: PropTypes.bool,
    mapHasLoaded: PropTypes.bool,
    hash: PropTypes.string
};

const MapSection = ({ subaward, mapHasLoaded, hash }) => {
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
                dsmContent: <MapDsm subaward={subaward} />
            },
            {
                name: 'Recipient Location',
                value: 'recipient_location',
                onClick,
                dsmContent: <MapDsm subaward={subaward} />
            }
        ],
        selectedDropdownOption: selectedDropdown,
        sectionName: 'map'
    };

    return (
        <div id="search-page-component" className="map">
            {mapHasLoaded ?
                <MapSectionWrapper
                    subaward={subaward}
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
