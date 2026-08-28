/**
 * SidebarContent.jsx
 * Created by Andrea Blackwell 1/10/2025
 **/

import React from "react";
import PropTypes from "prop-types";
import SearchSidebarSubmitContainer from "containers/search/SearchSidebarSubmitContainer";
import SidebarContentFilters from "./SidebarContentFilters";

const propTypes = {
    sidebarContentHeight: PropTypes.number,
    setShowMobileFilters: PropTypes.func
};

const SidebarContent = ({ sidebarContentHeight, setShowMobileFilters }) => (
    <>
        <div className="sidebar-top-submit">
            <SearchSidebarSubmitContainer 
                setShowMobileFilters={setShowMobileFilters}/>
        </div>
        <div className="collapsible-sidebar--main-menu search-filters-wrapper opened">
            <SidebarContentFilters sidebarContentHeight={sidebarContentHeight} />
        </div>
    </>);

SidebarContent.propTypes = propTypes;

export default SidebarContent;
