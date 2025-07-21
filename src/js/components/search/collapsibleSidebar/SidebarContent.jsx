/**
 * SidebarContent.jsx
 * Created by Andrea Blackwell 1/10/2025
 **/

import React, { useState } from "react";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";

import { FilterCategoryTree, filterList } from "dataMapping/search/searchFilterCategories";
import SearchSidebarMainMenu from "./SearchSidebarMainMenu";
import SearchSidebarDrilldown from "./SearchSidebarDrilldown";
import SearchSidebarSubmitContainer from "../../../containers/search/SearchSidebarSubmitContainer";
import { characteristicsCount, sourcesCount } from "../../../helpers/search/filterCheckboxHelper";
import Accordion from "../../sharedComponents/accordion/Accordion";

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

    const filtersArray = filterList.map((filter) => (
        <>
            <div>{filter.title}</div>
            <Accordion title={filter.title} setOpen={(set) => setOpen({ [filter.title]: set, ...open })}>
                {filter.component}
            </Accordion>
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
            {filtersArray}
            <div className="sidebar-bottom-submit">
                <SearchSidebarSubmitContainer
                    setShowMobileFilters={setShowMobileFilters}
                    timerRef={timerRef} />
            </div>
        </>);
};

SidebarContent.propTypes = propTypes;

export default SidebarContent;
