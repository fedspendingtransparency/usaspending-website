/**
 * TimeSection.jsx
 */


import React, { useState } from "react";
import {
    DsmWrapper
} from "../DsmWrapper";
import TimeVisualizationSectionContainer
    from "../../../../containers/search/newResultsView/TimeVisualizationSectionContainer";

const TimeSection = ({ spendingHasLoaded, subaward }) => {
    const [visualizationPeriod, setVisualizationPeriod] = useState('month');

    const onClick = (e) => {
        setVisualizationPeriod(e);
    };

    const wrapperProps = {
        sectionTitle: 'Results Over Time',
        dropdownOptions: [
            {
                name: 'Months',
                value: 'month',
                onClick,
                dsmContent: <DsmWrapper
                    heading={"Months:  What's included in this view of the data?"}
                    description="Use the map below to break down spending by state, county, or congressional district." />
            },
            {
                name: 'Quarters',
                value: 'quarter',
                onClick,
                dsmContent: <DsmWrapper
                    heading={"Quarters:  What's included in this view of the data?"}
                    description="Use the map below to break down spending by state, county, or congressional district." />
            },
            {
                name: 'Years',
                value: 'fiscal_year',
                onClick,
                dsmContent: <DsmWrapper
                    heading={"Years:  What's included in this view of the data?"}
                    description="Use the map below to break down spending by state, county, or congressional district." />
            }
        ],
        selectedDropdownOption: visualizationPeriod
    };

    return (
        <div id="search-page-component" className="spending">
            {spendingHasLoaded && <TimeVisualizationSectionContainer
                wrapperProps={wrapperProps}
                subaward={subaward}
                spendingHasLoaded={spendingHasLoaded}
                visualizationPeriod={visualizationPeriod} />}
        </div>
    );
};

export default TimeSection;
