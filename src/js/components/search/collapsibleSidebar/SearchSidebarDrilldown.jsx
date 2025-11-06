/**
 * SearchSidebarDrilldown.jsx
 * Created by Andrea Blackwell 11/05/2024
 **/

import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import CategoriesList from "./CategoriesList";
import CategoryFilter from "./CategoryFilter";
import { excludeIDVB, generateCount } from "../../../helpers/search/filterCheckboxHelper";
import DsmSlider from "./DsmSlider";

const propTypes = {
    list: PropTypes.array,
    filter: PropTypes.object,
    isDrilldown: PropTypes.bool,
    sidebarContentHeight: PropTypes.number,
    selectedCategory: PropTypes.object,
    setLevel3: PropTypes.func,
    goBack: PropTypes.func,
    itemCount: PropTypes.object,
    filters: PropTypes.object,
    selectedCategoryTitle: PropTypes.string,
    titleOnly: PropTypes.bool,
    dsmComponent: PropTypes.bool,
    dsmFile: PropTypes.string,
    currentLevel: PropTypes.number,
    isDsmOpened: PropTypes.bool,
    setIsDsmOpened: PropTypes.func
};

const SearchSidebarDrilldown = ({
    list,
    filter,
    isDrilldown,
    selectedCategory,
    setLevel3,
    goBack,
    itemCount,
    filters,
    sidebarContentHeight,
    selectedCategoryTitle,
    titleOnly = false,
    dsmComponent = false,
    dsmFile = '',
    currentLevel,
    isDsmOpened,
    setIsDsmOpened
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
        contractAwardType,
        financialAssistanceAwardType,
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
        defCode,
        awardDescription
    } = filters;

    const filterCount = {
        Location: itemCount.location,
        'Time Period': itemCount.timePeriod,
        'Award Description': awardDescription ? 1 : 0,
        'Award ID': selectedAwardIDs.size,
        'Spending Amount': awardAmounts.size,
        'Contract Award Type': excludeIDVB(contractAwardType),
        'North American Industry Classification System (NAICS)': generateCount(naicsCodes),
        'Product and Service Code (PSC)': generateCount(pscCodes),
        'Type of Contract Pricing': pricingType.size,
        'Type of Set Aside': setAside.size,
        'Extent Competed': extentCompeted.size,
        'Financial Assistance Award Type': financialAssistanceAwardType.size,
        'Assistance Listing': selectedCFDA.size,
        Recipient: selectedRecipients.size,
        'Recipient Type': recipientType.size,
        Agency: selectedAwardingAgencies.size + selectedFundingAgencies.size,
        'Treasury Account Symbol (TAS)': generateCount(tasCodes),
        'Disaster Emergency Fund Codes (DEFCs)': defCode.size
    };

    let categoryFilter;

    if (titleOnly) {
        categoryFilter = (
            <CategoryFilter
                height={sidebarContentHeight}
                title={selectedCategoryTitle}
                component={filter}
                itemCount={filterCount[selectedCategoryTitle]}
                titleOnly={titleOnly}
                iconName={selectedCategory?.iconName}
                iconColor={selectedCategory?.iconColor}
                iconBackgroundColor={selectedCategory?.iconBackgroundColor}
                showFullCount={currentLevel === 3} />
        );
    }
    else {
        categoryFilter = (
            <CategoryFilter
                height={sidebarContentHeight}
                iconName={selectedCategory?.iconName}
                iconColor={selectedCategory?.iconColor}
                iconBackgroundColor={selectedCategory?.iconBackgroundColor}
                title={selectedCategoryTitle}
                component={filter}
                itemCount={filterCount[selectedCategoryTitle]}
                description={selectedCategory?.description}
                showFullCount={currentLevel === 3} />
        );
    }

    return (
        <div className={`collapsible-sidebar--drilldown search-filters-wrapper ${isDrilldown ? 'opened' : ''}`}>
            <div className="collapsible-sidebar--header">
                <div
                    className="collapsible-sidebar--back-btn"
                    onClick={(e) => {
                        setIsDsmOpened(false);
                        goBack(e);
                    }}
                    onKeyDown={(e) => {
                        setIsDsmOpened(false);
                        keyHandler(e, goBack);
                    }}
                    role="button"
                    tabIndex="0">
                    <FontAwesomeIcon className="chevron" icon="chevron-left" />Back
                </div>
            </div>
            <div className="collapsible-sidebar--content">
                {!isDsmOpened && list && <CategoriesList
                    height={sidebarContentHeight}
                    iconName={selectedCategory.iconName}
                    iconColor={selectedCategory.iconColor}
                    iconBackgroundColor={selectedCategory.iconBackgroundColor}
                    title={selectedCategory.title}
                    categories={list}
                    setLevel3={setLevel3}
                    itemCount={itemCount[selectedCategory.categoryKey]}
                    filterCount={filterCount}
                    showFullCount={currentLevel === 3} />}
                {!isDsmOpened && filter && categoryFilter}
                {dsmComponent && <DsmSlider isDsmOpened={isDsmOpened} setIsDsmOpened={setIsDsmOpened} dsmFile={dsmFile} currentLevel={currentLevel} selectedCategoryTitle={selectedCategoryTitle || selectedCategory.title} height={sidebarContentHeight} hasChildren={!!list} />}
            </div>
        </div>);
};

SearchSidebarDrilldown.propTypes = propTypes;
export default SearchSidebarDrilldown;
