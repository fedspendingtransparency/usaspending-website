/**
 * MapSection.jsx
 * Created by Andrea Blackwell 04/14/2024
 **/

import React, { useState } from "react";
import PropTypes from "prop-types";

import MapVisualization from "./MapVisualization";
import MapDsm from "./MapDsm";

const propTypes = {
    subaward: PropTypes.bool
};

const MapSection = ({ subaward }) => {
    const [selectedDropdown, setSelectedDropdown] = useState('place_of_performance');

    const onClick = (e) => {
        setSelectedDropdown(e);
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
        selectedDropdownOption: selectedDropdown
    };

    return (
        <div id="search-page-component" className="map">
            <MapVisualization
                subaward={subaward}
                scope={selectedDropdown}
                setScope={setSelectedDropdown}
                wrapperProps={wrapperProps} />
        </div>
    );
};

MapSection.propTypes = propTypes;
export default MapSection;
