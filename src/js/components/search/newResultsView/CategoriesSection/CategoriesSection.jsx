/**
 * CategoriesSection.jsx
 */


import React, { useState } from "react";
import SearchSectionWrapper from "../SearchSectionWrapper";
import {
    TempPlaceholderChart,
    TempPlaceholderComponent,
    TempPlaceholderDsmContent,
    TempPlaceholderTable
} from "../TempPlaceholderComponents";
import CategoriesVisualization from "./CategoriesVisualization";

const CategoriesSection = ({ awardCategoriesHasLoaded }) => {
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
                onClick
            },
            {
                name: 'Awarding Subagency',
                value: '1',
                onClick
            },
            {
                name: 'Recipient',
                value: '2',
                onClick
            },
            {
                name: 'North American Industry Classification System (NAICS)',
                value: '3',
                onClick
            },
            {
                name: 'Product and Service Code (PSC)',
                value: '4',
                onClick
            },
            {
                name: 'Assistance Listing',
                value: '5',
                onClick
            }
        ],
        selectedDropdownOption: selectedDropdown,
        isVisualization: true,
        chart: <TempPlaceholderChart />,
        table: <TempPlaceholderTable />,
        dsmContent: <TempPlaceholderDsmContent />
    };


    return (
        <SearchSectionWrapper
            {...dummyWrapperProps}>
            <div id="search-page-component" className="award">
                {!awardCategoriesHasLoaded ?
                    <TempPlaceholderComponent />
                    :
                    <CategoriesVisualization />
                }
            </div>
        </SearchSectionWrapper>
    );
};

export default CategoriesSection;
