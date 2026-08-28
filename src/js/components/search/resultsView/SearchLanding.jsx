/**
 * SearchLanding.jsx
 * Created by JD House 8/17/2026
 **/

import React from "react";
import { useSelector } from "react-redux";
import NLMoreResources from "../../naturalLanguage/NLMoreResources";
import NLSearchSuggestions from "../../naturalLanguage/NLSearchSuggestions";
import NLPreSearchButtonGroup from "../../naturalLanguage/NLPreSearchButtonGroup";
import NLSearchGovSpending from "../../naturalLanguage/NLSearchGovSpending";
import { FILTERS } from '../../search/collapsibleSidebar/SidebarConstants';


const SearchLanding = () => {
    const sidebarContent = useSelector((state) => state.sidebar.sidebarContent);
    const isFilters = sidebarContent === FILTERS;

    return (
        <div className="search-results-landing">
            { isFilters ? (
                <>
                    <h3 className="landing-title">Start your USAspending search</h3>
                    <p className="landing-subTitle">
                            View popular data searches, frequently asked questions, & timely government spending topics.
                    </p>
                    <NLPreSearchButtonGroup />
                    <NLSearchSuggestions />
                    <NLMoreResources />
                </>
            ): (
                <>
                    <NLSearchGovSpending />
                    <NLMoreResources />
                </>
            )}
        </div>
    )
};

export default SearchLanding;
