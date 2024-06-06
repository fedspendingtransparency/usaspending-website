/**
 * CategoriesSection.jsx
 * Created by Andrea Blackwell 04/14/2024
 **/

import React from "react";
import PropTypes from "prop-types";

import {
    DsmCategoriesAgency,
    DsmWrapper
} from "../DsmWrapper";
import CategoriesVisualizationWrapperContainer
    from "../../../../containers/search/newResultsView/CategoriesVisualizationWrapperContainer";

const propTypes = {
    categoriesHasLoaded: PropTypes.bool,
    subaward: PropTypes.bool,
    setSelectedDropdown: PropTypes.func,
    selectedDropdown: PropTypes.string
};

const CategoriesSection = (props) => {
    const onClick = (e) => {
        props.setSelectedDropdown(e);
    };

    const wrapperProps = {
        sectionTitle: 'Results by Category',
        dropdownOptions: [
            {
                name: 'Awarding Agency',
                value: 'awarding_agency',
                onClick,
                dsmContent: <DsmCategoriesAgency subaward={props.subaward} />
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
        selectedDropdownOption: props.selectedDropdown

    };
    return (
        <div id="search-page-component" className="categories">
            {props.categoriesHasLoaded && <CategoriesVisualizationWrapperContainer
                wrapperProps={wrapperProps}
                subaward={props.subaward}
                categoriesHasLoaded={props.categoriesHasLoaded}
                selectedDropdown={props.selectedDropdown}
                setSelectedDropdown={props.setSelectedDropdown} />}
        </div>
    );
};

CategoriesSection.propTypes = propTypes;
export default CategoriesSection;
