/**
 * SidebarContent.jsx
 * Created by Andrea Blackwell 1/10/2025
 **/

import React, { useState } from "react";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { searchFilterCategoryTree } from "dataMapping/search/searchFilterCategories";
import SearchSidebarSubmitContainer from "../../../containers/search/SearchSidebarSubmitContainer";
import Accordion from "../../sharedComponents/accordion/Accordion";
import DsmSlider from "./DsmSlider";

const propTypes = {
    sidebarContentHeight: PropTypes.number,
    setShowMobileFilters: PropTypes.func,
    isDsmOpened: PropTypes.bool,
    setIsDsmOpened: PropTypes.func,
    timerRef: PropTypes.object
};

const SidebarContent = ({
    sidebarContentHeight, setShowMobileFilters, isDsmOpened, setIsDsmOpened, timerRef
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

    // const filters = useSelector((state) => state.filters);
    const dsmElHeight = sidebarContentHeight + 51;

    const filtersArray = searchFilterCategoryTree.map((category) => (
        <>
            <div className="search-filters-list--category-header">
                <div className="search-filters-list--category-header--icon" style={{ backgroundColor: category.iconBackgroundColor }}>
                    <FontAwesomeIcon
                        icon={category.iconName}
                        style={{ color: category.iconColor }} />
                </div>
                <div className="search-filters-list--category-header--title">{category.title.toUpperCase()}</div>
            </div>
            {category.children.map((filter) => (
                <Accordion
                    title={filter.title}
                    setOpen={(set) => setOpen({ [filter.title]: set, ...open })}
                    closedIcon="chevron-down"
                    openIcon="chevron-up">
                    {filter.component}
                </Accordion>
            ))}
        </>
    ));

    // const {
    //     selectedLocations,
    //     selectedRecipientLocations,
    //     timePeriodType,
    //     time_period: timePeriod,
    //     timePeriodFY,
    //     selectedRecipients,
    //     recipientType
    // } = filters;

    return (
        <>
            <div className="collapsible-sidebar--main-menu search-filters-wrapper opened">
                {!isDsmOpened && (
                    <div className="collapsible-sidebar--search-filters-list" style={{ height: (sidebarContentHeight) }}>
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
