/**
 * categories.jsx
 */


import React, { useState } from "react";
import SearchSectionWrapper from "../SearchSectionWrapper";
import {
    DsmContent
} from "../DsmWrapper";
import CategoriesVisualization from "./CategoriesVisualization";

const CategoriesSection = ({ categoriesHasLoaded }) => {
    const [selectedDropdown, setSelectedDropdown] = useState('0');

    const onClick = (e) => {
        setSelectedDropdown(e);
    };

    const dummyWrapperProps = {
        sectionTitle: 'Results by Category',
        dropdownOptions: [
            {
                name: 'Awarding Agency',
                value: '0',
                onClick,
                dsmContent: <DsmContent
                    heading={"Awarding Agency:  What's included in this view of the data?"}
                    description="Use the map below to break down spending by state, county, or congressional district." />
            },
            {
                name: 'Awarding Subagency',
                value: '1',
                onClick,
                dsmContent: <DsmContent
                    heading={"Awarding Subagency:  What's included in this view of the data?"}
                    description="Use the map below to break down spending by state, county, or congressional district." />
            },
            {
                name: 'Recipient',
                value: '2',
                onClick,
                dsmContent: <DsmContent
                    heading={"Recipient:  What's included in this view of the data?"}
                    description="Use the map below to break down spending by state, county, or congressional district." />
            },
            {
                name: 'North American Industry Classification System (NAICS)',
                value: '3',
                onClick,
                dsmContent: <DsmContent
                    heading={"North American Industry Classification System (NAICS):  What's included in this view of the data?"}
                    description="Use the map below to break down spending by state, county, or congressional district." />
            },
            {
                name: 'Product and Service Code (PSC)',
                value: '4',
                onClick,
                dsmContent: <DsmContent
                    heading={"Product and Service Code (PSC):  What's included in this view of the data?"}
                    description="Use the map below to break down spending by state, county, or congressional district." />
            },
            {
                name: 'Assistance Listing',
                value: '5',
                onClick,
                dsmContent: <DsmContent
                    heading={"Assistance Listing:  What's included in this view of the data?"}
                    description="Use the map below to break down spending by state, county, or congressional district." />
            }
        ],
        selectedDropdownOption: selectedDropdown,
        isVisualization: true

    };

    return (
        <SearchSectionWrapper
            {...dummyWrapperProps}>
            <div id="search-page-component" className="categories">
                <CategoriesVisualization />
            </div>
        </SearchSectionWrapper>
    );
};

export default CategoriesSection;
