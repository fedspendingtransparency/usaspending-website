/**
 * TimeSection.jsx
 */


import React, { useState, useEffect } from "react";
import SearchSectionWrapper from "../SearchSectionWrapper";
import {
    DsmWrapper
} from "../DsmWrapper";
import TimeVisualizationSectionContainer
    from "../../../../containers/search/newResultsFilter/TimeVisualizationSectionContainer";

const TimeSection = ({ spendingHasLoaded, subaward }) => {
    const [visualizationPeriod, setVisualizationPeriod] = useState('month');

    const [dataStatus, setDataStatus] = useState({
        isLoading: false,
        isError: false,
        hasNoData: false
    });

    const onClick = (e) => {
        setVisualizationPeriod(e);
    };

    const dummyWrapperProps = {
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

    const updateDataStatus = (isLoading, isError, hasNoData) => {
        setDataStatus({
            isLoading,
            isError,
            hasNoData
        });
    };

    return (
        <SearchSectionWrapper
            {...dummyWrapperProps}
            isLoading={dataStatus.isLoading}
            isError={dataStatus.isError}
            hasNoData={dataStatus.hasNoData}>
            <div id="search-page-component" className="spending">
                {spendingHasLoaded &&
                    <TimeVisualizationSectionContainer
                        dataStatus={updateDataStatus}
                        subaward={subaward}
                        visualizationPeriod={visualizationPeriod} />
                }
            </div>
        </SearchSectionWrapper>
    );
};

export default TimeSection;
