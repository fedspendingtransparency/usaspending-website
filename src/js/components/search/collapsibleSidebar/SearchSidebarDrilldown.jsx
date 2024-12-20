/**
 * SearchSidebarDrilldown.jsx
 * Created by Andrea Blackwell 11/05/2024
 **/

import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import CategoriesList from "./CateogriesList";
import CategoryFilter from "./CategoryFilter";

const propTypes = {
    list: PropTypes.array,
    filter: PropTypes.object,
    isDrilldown: PropTypes.bool,
    sidebarHeight: PropTypes.number,
    selectedCategory: PropTypes.object,
    setLevel3: PropTypes.func,
    goBack: PropTypes.func,
    itemCount: PropTypes.object,
    filters: PropTypes.object
};

const SearchSidebarDrilldown = ({
    list, filter, isDrilldown, selectedCategory, setLevel3, goBack, sidebarHeight, itemCount, filters, selectedCategoryTitle
}) => {
    const keyHandler = (e, func) => {
        e.preventDefault();
        if (e.key === "Enter") {
            func(e);
        }
    };

    const {
        selectedAwardIDs,
        awardAmounts,
        awardType,
        naicsCodes,
        pscCodes,
        pricingType,
        setAside,
        extentCompeted,
        selectedCFDA,
        selectedRecipients,
        recipientType,
        selectedAwardingAgencies,
        selectedFundingAgencies,
        tasCodes,
        defCodes
    } = filters;

    // TODO: Add in Award Description, Financial Assistance, Assistance Listing, Covid Spending and Infrastructure Spending
    // TODO: this can't be done until those filters are properly placed in the new advanced search
    const filterCount = {
        Location: itemCount.location,
        'Time Period': itemCount.timePeriod,
        'Award Description': 0,
        'Award ID': selectedAwardIDs.size,
        'Spending Amount': awardAmounts.size,
        'Contract Award Type': awardType.size,
        'North American Industry Classification System (NAICS)': naicsCodes.counts.length,
        'Product and Service Code (PSC)': pscCodes.counts.length,
        'Type of Contract Pricing': pricingType.size,
        'Type of Set Aside': setAside.size,
        'Extent Competed': extentCompeted.size,
        'Financial Assistance Award Type': 0,
        'Assistance Listing': selectedCFDA.size,
        Recipient: selectedRecipients.size,
        'Recipient Type': recipientType.size,
        Agency: selectedAwardingAgencies.size + selectedFundingAgencies.size,
        'Treasury Account Symbol (TAS)': tasCodes.counts.length,
        'COVID-19 Spending': defCodes.counts.length,
        'Infrastructure Spending': 0
    };

    let categoryFilter;

    if (selectedCategory?.title === 'Location' || selectedCategory?.title === 'Time Period') {
        categoryFilter = (
            <CategoryFilter
                height={sidebarHeight}
                iconName={selectedCategory.iconName}
                iconColor={selectedCategory.iconColor}
                iconBackgroundColor={selectedCategory.iconBackgroundColor}
                title={selectedCategoryTitle}
                description={selectedCategory.description}
                component={filter}
                itemCount={filterCount[selectedCategory?.title]} />
        );
    }
    else {
        categoryFilter = (
            <CategoryFilter
                height={sidebarHeight}
                title={selectedCategoryTitle}
                component={filter}
                itemCount={filterCount[selectedCategoryTitle]} />
        );
    }


    return (
        <div className={`collapsible-sidebar--drilldown search-filters-wrapper ${isDrilldown ? 'opened' : ''}`}>
            <div className="collapsible-sidebar--header">
                <div
                    className="collapsible-sidebar--back-btn"
                    onClick={(e) => goBack(e)}
                    onKeyDown={(e) => keyHandler(e, goBack)}
                    role="button"
                    tabIndex="0">
                    <FontAwesomeIcon className="chevron" icon="chevron-left" />Back
                </div>
            </div>
            <div className="collapsible-sidebar--content">
                {list && <CategoriesList
                    height={sidebarHeight}
                    iconName={selectedCategory.iconName}
                    iconColor={selectedCategory.iconColor}
                    iconBackgroundColor={selectedCategory.iconBackgroundColor}
                    title={selectedCategory.title}
                    description={selectedCategory.description}
                    categories={list}
                    setLevel3={setLevel3}
                    itemCount={itemCount[selectedCategory.categoryKey]} />}

                {filter && categoryFilter}
            </div>
        </div>);
};

SearchSidebarDrilldown.propTypes = propTypes;
export default SearchSidebarDrilldown;
