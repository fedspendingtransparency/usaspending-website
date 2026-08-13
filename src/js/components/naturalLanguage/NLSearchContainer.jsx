/**
 * NLSearchContainer.jsx
 * Created by Trey Morgan 8/12/2026
 */

import React from "react";
import { useSelector } from "react-redux";
import NLSearchGovSpending from "./NLSearchGovSpending";
import NLSearchSuggestions from "./NLSearchSuggestions";
import NLMoreResources from "./NLMoreResources";
import { FILTERS } from '../search/collapsibleSidebar/SidebarConstants';


const NLSearchContainer = () => {
    const sidebarContent = useSelector((state) => state.sidebar.sidebarContent);
    const isFiltersBtnSelected = sidebarContent === FILTERS;

    return (
        <>
            { !isFiltersBtnSelected && <NLSearchGovSpending /> }
            { isFiltersBtnSelected && <NLSearchSuggestions /> }
            <NLMoreResources />
        </>
    )

};

export default NLSearchContainer;

