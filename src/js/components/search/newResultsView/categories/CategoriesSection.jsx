/**
 * CategoriesSection.jsx
 * Created by Andrea Blackwell 04/14/2024
 **/

import React, { useState } from "react";
import PropTypes from "prop-types";

import {
    DsmWrapper
} from "../DsmWrapper";
import RankVisualizationWrapperContainer
    from "../../../../containers/search/newResultsView/CategoriesVisualizationWrapperContainer";

const propTypes = {
    categoriesHasLoaded: PropTypes.bool,
    subaward: PropTypes.bool
};

const CategoriesSection = ({ categoriesHasLoaded, subaward }) => {
    const [selectedDropdown, setSelectedDropdown] = useState('awarding_agency');

    const onClick = (e) => {
        setSelectedDropdown(e);
    };

    const wrapperProps = {
        sectionTitle: 'Results by Category',
        dropdownOptions: [
            {
                name: 'Awarding Agency',
                value: 'awarding_agency',
                onClick,
                dsmContent: <DsmWrapper
                    heading={"Awarding Agency:  What's included in this view of the data?"}
                    description="Use the map below to break down spending by state, county, or congressional district." />
            },
            {
                name: 'Awarding Subagency',
                value: 'awarding_subagency',
                onClick,
                dsmContent: <DsmWrapper
                    heading={"Awarding Subagency:  What's included in this view of the data?"}
                    description="Use the map below to break down spending by state, county, or congressional district." />
            },
            {
                name: 'Recipient',
                value: 'recipient',
                onClick,
                dsmContent: <DsmWrapper
                    heading={"Recipient:  What's included in this view of the data?"}
                    description="Use the map below to break down spending by state, county, or congressional district." />
            },
            {
                name: 'North American Industry Classification System (NAICS)',
                value: 'naics',
                onClick,
                dsmContent: <DsmWrapper
                    heading={"North American Industry Classification System (NAICS):  What's included in this view of the data?"}
                    description="Use the map below to break down spending by state, county, or congressional district." />
            },
            {
                name: 'Product and Service Code (PSC)',
                value: 'psc',
                onClick,
                dsmContent: <DsmWrapper
                    heading={"Product and Service Code (PSC):  What's included in this view of the data?"}
                    description="Use the map below to break down spending by state, county, or congressional district." />
            },
            {
                name: 'Assistance Listing',
                value: 'cfda',
                onClick,
                dsmContent: <DsmWrapper
                    heading={"Assistance Listing:  What's included in this view of the data?"}
                    description="Use the map below to break down spending by state, county, or congressional district." />
            }
        ],
        selectedDropdownOption: selectedDropdown

    };

    return (
        <div id="search-page-component" className="categories">
            {categoriesHasLoaded && <RankVisualizationWrapperContainer
                wrapperProps={wrapperProps}
                subaward={subaward}
                categoriesHasLoaded={categoriesHasLoaded}
                selectedDropdown={selectedDropdown} />}
        </div>
    );
};

CategoriesSection.propTypes = propTypes;
export default CategoriesSection;
