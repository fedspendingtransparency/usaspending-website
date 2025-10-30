/**
 * CategoriesSection.jsx
 * Created by Andrea Blackwell 04/14/2024
 **/

import React from "react";
import PropTypes from "prop-types";

import Analytics from "../../../../helpers/analytics/Analytics";
import CategoriesVisualizationWrapperContainer
    from "../../../../containers/search/resultsView/CategoriesVisualizationWrapperContainer";
import PlaceholderComponent from "../PlaceholderComponent";
import CategoriesDsm from "./CategoriesDsm";

const propTypes = {
    categoriesHasLoaded: PropTypes.bool,
    spendingLevel: PropTypes.string,
    setSelectedDropdown: PropTypes.func,
    selectedDropdown: PropTypes.string,
    hash: PropTypes.string
};
const CategoriesSection = ({
    categoriesHasLoaded,
    spendingLevel,
    setSelectedDropdown,
    selectedDropdown,
    hash
}) => {
    const onClick = (e) => {
        setSelectedDropdown(e);
        Analytics.event({
            category: 'Section Categories',
            action: `View ${e}`,
            label: hash
        });
    };

    const wrapperProps = {
        sectionTitle: 'Results by Category',
        dropdownOptions: [
            {
                name: 'Awarding Agency',
                value: 'awarding_agency',
                onClick,
                dsmContent: <CategoriesDsm spendingLevel={spendingLevel} />
            },
            {
                name: 'Awarding Subagency',
                value: 'awarding_subagency',
                onClick,
                dsmContent: <CategoriesDsm spendingLevel={spendingLevel} />
            },
            {
                name: 'Recipient',
                value: 'recipient',
                onClick,
                dsmContent: <CategoriesDsm spendingLevel={spendingLevel} />
            },
            {
                name: 'North American Industry Classification System (NAICS)',
                value: 'naics',
                onClick,
                dsmContent: <CategoriesDsm spendingLevel={spendingLevel} />
            },
            {
                name: 'Product and Service Code (PSC)',
                value: 'psc',
                onClick,
                dsmContent: <CategoriesDsm spendingLevel={spendingLevel} />
            },
            {
                name: 'Assistance Listing',
                value: 'cfda',
                onClick,
                dsmContent: <CategoriesDsm spendingLevel={spendingLevel} />
            }
        ],
        selectedDropdownOption: selectedDropdown,
        sectionName: 'categories'

    };
    return (
        <div id="search-page-component" className="categories">
            {categoriesHasLoaded ?
                <CategoriesVisualizationWrapperContainer
                    wrapperProps={wrapperProps}
                    categoriesHasLoaded={categoriesHasLoaded}
                    selectedDropdown={selectedDropdown}
                    setSelectedDropdown={setSelectedDropdown}
                    hash={hash} />
                :
                <PlaceholderComponent className="categories" />
            }
        </div>
    );
};

CategoriesSection.propTypes = propTypes;
export default CategoriesSection;
