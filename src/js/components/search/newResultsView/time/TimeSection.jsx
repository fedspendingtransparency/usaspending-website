/**
 * TimeSection.jsx
 */


import React, { useState } from "react";
import SearchSectionWrapper from "../SearchSectionWrapper";
import {
    DsmContent,
    TempPlaceholderChart,
    TempPlaceholderComponent,
    TempPlaceholderTable
} from "../TempPlaceholderComponents";
import TimeVisualizationSectionContainer
    from "../../../../containers/search/newResultsFilter/TimeVisualizationSectionContainer";

const TimeSection = ({ spendingHasLoaded, subaward }) => {
    const [selectedDropdown, setSelectedDropdown] = useState('0');

    const onClick = (e) => {
        setSelectedDropdown(e);
    };

    const dummyWrapperProps = {
        sectionTitle: 'Results Over Time',
        dropdownOptions: [
            {
                name: 'Months',
                value: '0',
                onClick,
                dsmContent: <DsmContent
                    heading={"Months:  What's included in this view of the data?"}
                    description="Use the map below to break down spending by state, county, or congressional district." />
            },
            {
                name: 'Quarters',
                value: '1',
                onClick,
                dsmContent: <DsmContent
                    heading={"Quarters:  What's included in this view of the data?"}
                    description="Use the map below to break down spending by state, county, or congressional district." />
            },
            {
                name: 'Years',
                value: '2',
                onClick,
                dsmContent: <DsmContent
                    heading={"Years:  What's included in this view of the data?"}
                    description="Use the map below to break down spending by state, county, or congressional district." />
            }
        ],
        selectedDropdownOption: selectedDropdown,
        isVisualization: true,
        chart: <TempPlaceholderChart />,
        table: <TempPlaceholderTable />
    };


    return (
        <SearchSectionWrapper
            {...dummyWrapperProps}
            height={350}>
            <div id="search-page-component" className="spending" style={{ height: 350 }} >
                <TimeVisualizationSectionContainer subaward={subaward} visualizationPeriod={dummyWrapperProps?.dropdownOptions[selectedDropdown]?.name} />
            </div>
        </SearchSectionWrapper>
    );
};

export default TimeSection;
