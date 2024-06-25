/**
 * CategoriesSection.jsx
 * Created by Andrea Blackwell 04/14/2024
 **/

import React from "react";
import PropTypes from "prop-types";

import CategoriesVisualizationWrapperContainer
    from "../../../../containers/search/newResultsView/CategoriesVisualizationWrapperContainer";
import PlaceholderComponent from "../PlaceholderComponent";
import CategoriesDsm from "./CategoriesDsm";

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
                dsmContent: <CategoriesDsm subaward={props.subaward} />
            },
            {
                name: 'Awarding Subagency',
                value: 'awarding_subagency',
                onClick,
                dsmContent: <CategoriesDsm subaward={props.subaward} />
            },
            {
                name: 'Recipient',
                value: 'recipient',
                onClick,
                dsmContent: <CategoriesDsm subaward={props.subaward} />
            },
            {
                name: 'North American Industry Classification System (NAICS)',
                value: 'naics',
                onClick,
                dsmContent: <CategoriesDsm subaward={props.subaward} />
            },
            {
                name: 'Product and Service Code (PSC)',
                value: 'psc',
                onClick,
                dsmContent: <CategoriesDsm subaward={props.subaward} />
            },
            {
                name: 'Assistance Listing',
                value: 'cfda',
                onClick,
                dsmContent: <CategoriesDsm subaward={props.subaward} />
            }
        ],
        selectedDropdownOption: props.selectedDropdown,
        sectionName: 'categories'

    };
    return (
        <div id="search-page-component" className="categories">
            {props.categoriesHasLoaded ?
                <CategoriesVisualizationWrapperContainer
                    wrapperProps={wrapperProps}
                    subaward={props.subaward}
                    categoriesHasLoaded={props.categoriesHasLoaded}
                    selectedDropdown={props.selectedDropdown}
                    setSelectedDropdown={props.setSelectedDropdown} />
                :
                <PlaceholderComponent className="categories" />
            }
        </div>
    );
};

CategoriesSection.propTypes = propTypes;
export default CategoriesSection;
