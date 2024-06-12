/**
 * MapSection.jsx
 * Created by Andrea Blackwell 04/14/2024
 **/

import React, { useState } from "react";
import PropTypes from "prop-types";

import { DsmWrapper } from "../DsmWrapper";
import MapVisualization from "./MapVisualization";

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
                dsmContent: <DsmWrapper
                    heading={"Place of Performance:  What's included in this view of the data?"}
                    description="Use the map below to break down spending by state, county, or congressional district." />
            },
            {
                name: 'Recipient Location',
                value: 'recipient_location',
                onClick,
                dsmContent: <DsmWrapper
                    heading={"Recipient Location:  What's included in this view of the data?"}
                    description="Use the map below to break down spending by state, county, or congressional district." />
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
