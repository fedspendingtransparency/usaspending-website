/**
 * MapSection.jsx
 * Created by Andrea Blackwell 04/14/2024
 **/

import React, { useState } from "react";
import SearchSectionWrapper from "../SearchSectionWrapper";
import {
    DsmWrapper, TempPlaceholderComponent
} from "../DsmWrapper";
import MapVisualization from "./MapVisualization";

const MapSection = ({ mapHasLoaded }) => {
    const [selectedDropdown, setSelectedDropdown] = useState('0');

    const onClick = (e) => {
        setSelectedDropdown(e);
    };

    const wrapperProps = {
        sectionTitle: 'Results by Geography',
        dropdownOptions: [
            {
                name: 'Place of Performance',
                value: '0',
                onClick,
                dsmContent: <DsmWrapper
                    heading={"Place of Performance:  What's included in this view of the data?"}
                    description="Use the map below to break down spending by state, county, or congressional district." />
            },
            {
                name: 'Recipient Location',
                value: '1',
                onClick,
                dsmContent: <DsmWrapper
                    heading={"Recipient Location:  What's included in this view of the data?"}
                    description="Use the map below to break down spending by state, county, or congressional district." />
            }
        ],
        selectedDropdownOption: selectedDropdown
    };

    return (
        <SearchSectionWrapper
            {...wrapperProps}>
            <div id="search-page-component" className="map">
                {!mapHasLoaded ?
                    <TempPlaceholderComponent />
                    :
                    <MapVisualization />
                }
            </div>
        </SearchSectionWrapper>
    );
};

export default MapSection;
