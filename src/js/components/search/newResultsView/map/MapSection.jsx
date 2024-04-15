/**
 * table.jsx
 */


import React, { useState } from "react";
import SearchSectionWrapper from "../SearchSectionWrapper";
import {
    DsmContent, TempPlaceholderComponent
} from "../DsmWrapper";
import MapVisualization from "./MapVisualization";
import GeoVisualizationSectionContainer
    from "../../../../containers/search/newResultsView/GeoVisualizationSectionContainer";
import TimeVisualizationSectionContainer
    from "../../../../containers/search/newResultsView/TimeVisualizationSectionContainer";
import AwardTable from "../table/AwardTable";

const MapSection = ({ mapHasLoaded, subaward }) => {
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
                dsmContent: <DsmContent
                    heading={"Place of Performance:  What's included in this view of the data?"}
                    description="Use the map below to break down spending by state, county, or congressional district." />
            },
            {
                name: 'Recipient Location',
                value: '1',
                onClick,
                dsmContent: <DsmContent
                    heading={"Recipient Location:  What's included in this view of the data?"}
                    description="Use the map below to break down spending by state, county, or congressional district." />
            }
        ],
        selectedDropdownOption: selectedDropdown
    };

    return (
        <SearchSectionWrapper
            {...wrapperProps}>
            <div id="search-page-component" className="award">
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
