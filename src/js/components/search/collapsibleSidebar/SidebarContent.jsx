/**
 * SidebarContent.jsx
 * Created by Andrea Blackwell 1/10/2025
 **/

import React, { useState } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector } from "react-redux";

import { searchFilterCategoryTree } from "dataMapping/search/searchFilterCategories";
import SearchSidebarSubmitContainer from "../../../containers/search/SearchSidebarSubmitContainer";
import Accordion from "../../sharedComponents/accordion/Accordion";
import DsmSlider from "./DsmSlider";
import { excludeIDVB, generateCount } from "../../../helpers/search/filterCheckboxHelper";
import KeywordContainer from "../../../containers/search/filters/KeywordContainer";

const propTypes = {
    sidebarContentHeight: PropTypes.number,
    setShowMobileFilters: PropTypes.func,
    isDsmOpened: PropTypes.bool,
    setIsDsmOpened: PropTypes.func,
    timerRef: PropTypes.object,
    renderSidebarContent: PropTypes.bool
};

const SidebarContent = ({
    sidebarContentHeight,
    setShowMobileFilters,
    isDsmOpened,
    setIsDsmOpened,
    timerRef,
    renderSidebarContent
}) => {
    const [open, setOpen] = useState({
        Location: false,
        "Time Period": false,
        "Award Description": false,
        "Award ID": false,
        "Spending Amount": false,
        "Contract Award Type": false,
        "North American Industry Classification System (NAICS)": false,
        "Product and Service Code (PSC)": false,
        "Type of Contract Pricing": false,
        "Type of Set Aside": false,
        "Extent Competed": false,
        "Financial Assistance Award Type": false,
        "Assistance Listing": false,
        Recipient: false,
        "Recipient Type": false,
        Agency: false,
        "Treasury Account Symbol (TAS)": false,
        "COVID-19 Spending": false,
        "Infrastructure Spending": false
    });

    const filters = useSelector((state) => state.filters);

    const filterCount = {
        Location: filters.selectedLocations.size + filters.selectedRecipientLocations.size,
        'Time Period':
            filters.timePeriodType === 'dr' ? filters.time_period.size : filters.timePeriodFY.size,
        'Award Description': filters.awardDescription ? 1 : 0,
        'Award ID': filters.selectedAwardIDs.size,
        'Spending Amount': filters.awardAmounts.size,
        'Contract Award Type': excludeIDVB(filters.contractAwardType),
        'North American Industry Classification System (NAICS)': generateCount(filters.naicsCodes),
        'Product and Service Code (PSC)': generateCount(filters.pscCodes),
        'Type of Contract Pricing': filters.pricingType.size,
        'Type of Set Aside': filters.setAside.size,
        'Extent Competed': filters.extentCompeted.size,
        'Financial Assistance Award Type': filters.financialAssistanceAwardType.size,
        'Assistance Listing': filters.selectedCFDA.size,
        Recipient: filters.selectedRecipients.size,
        'Recipient Type': filters.recipientType.size,
        Agency: filters.selectedAwardingAgencies.size + filters.selectedFundingAgencies.size,
        'Treasury Account Symbol (TAS)': generateCount(filters.tasCodes),
        'COVID-19 Spending': filters.covidDefCode.size,
        'Infrastructure Spending': filters.infraDefCode.size
    };

    const dsmElHeight = sidebarContentHeight + 51;

    const filtersArray = searchFilterCategoryTree.map((category) => (
        <div className="search-filters-list">
            <div className="category-header">
                <div
                    className="category-header--icon"
                    style={{ backgroundColor: category.iconBackgroundColor }}>
                    <FontAwesomeIcon
                        icon={category.iconName}
                        style={{ color: category.iconColor }} />
                </div>
                <div className="category-header--title">{category.title}</div>
            </div>
            {category.children.map((filter) => (
                <Accordion
                    title={filter.title}
                    setOpen={() => setOpen({ ...open, [filter.title]: !open[filter.title] })}
                    openObject
                    closedIcon="chevron-down"
                    openIcon="chevron-up"
                    contentClassName={open[filter.title] ? '' : 'hidden'}
                    selectedChipCount={filterCount[filter.title]}>
                    {renderSidebarContent && open[filter.title] && filter.component}
                </Accordion>
            ))}
        </div>
    ));

    return (
        <>
            <div className="collapsible-sidebar--main-menu search-filters-wrapper opened">
                {!isDsmOpened && (
                    <div
                        className="collapsible-sidebar--search-filters-list"
                        style={{ height: sidebarContentHeight }}>
                        <KeywordContainer searchV2 />
                        {filtersArray}
                    </div>
                )}
                <DsmSlider
                    isDsmOpened={isDsmOpened}
                    setIsDsmOpened={setIsDsmOpened}
                    dsmFile="learn-filters-panel.mdx"
                    currentLevel={1}
                    selectedCategoryTitle=""
                    height={dsmElHeight}
                    hasChildren={false} />
            </div>
            <div className="sidebar-bottom-submit">
                <SearchSidebarSubmitContainer
                    setShowMobileFilters={setShowMobileFilters}
                    timerRef={timerRef} />
            </div>
        </>);
};

SidebarContent.propTypes = propTypes;

export default SidebarContent;
