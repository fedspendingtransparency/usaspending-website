/**
 * table.jsx
 */


import React, { useState } from "react";
import SearchSectionWrapper from "../SearchSectionWrapper";
import {
    DsmContent
} from "../TempPlaceholderComponents";
import MapVisualization from "./MapVisualization";

const MapSection = ({ mapHasLoaded }) => {
    const [selectedDropdown, setSelectedDropdown] = useState('0');

    const onClick = (e) => {
        setSelectedDropdown(e);
    };

    const dummyWrapperProps = {
        sectionTitle: 'Results by Geography',
        dropdownOptions: [
            {
                name: 'Place of Performance',
                value: '0',
                onClick,
                dsmContent: <DsmContent
                    heading={"Place of Performance:  What's included in this view of the data?"}
                    description={"Use the map below to break down spending by state, county, or congressional district."} />
            },
            {
                name: 'Recipient Location',
                value: '1',
                onClick,
                dsmContent: <DsmContent
                    heading={"Recipient Location:  What's included in this view of the data?"}
                    description={"Use the map below to break down spending by state, county, or congressional district."} />
            }
        ],
        selectedDropdownOption: selectedDropdown,
        isVisualization: true
    };

    return (
        <SearchSectionWrapper
            {...dummyWrapperProps}>
            <div id="search-page-component" className="map">
                <MapVisualization />
            </div>
        </SearchSectionWrapper>
    );
};

export default MapSection;
