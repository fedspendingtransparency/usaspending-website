/**
 * SidebarContent.jsx
 * Created by Andrea Blackwell 1/10/2025
 **/

import React from "react";
import PropTypes from "prop-types";
import SearchSidebarSubmitContainer from "containers/search/SearchSidebarSubmitContainer";
import * as Icons from 'components/sharedComponents/icons/Icons';
import useIsMobile from "hooks/useIsMobile";

import SidebarContentFilters from "./SidebarContentFilters";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const propTypes = {
    sidebarContentHeight: PropTypes.number,
    setShowMobileFilters: PropTypes.func
};

const SidebarContent = ({
    sidebarContentHeight,
    setShowMobileFilters
}) => {
    const { isMedium } = useIsMobile();

    return (
        <>
            <div className="sidebar-top-submit">
                <div className="collapsible-sidebar-header"><FontAwesomeIcon icon="filter" />Filters</div>
                <SearchSidebarSubmitContainer setShowMobileFilters={setShowMobileFilters} />
            </div>
            <div className="collapsible-sidebar--main-menu search-filters-wrapper opened">
                {isMedium &&
                    <div className="collapsible-sidebar--header">
                        <button
                            className="close-button"
                            id="collapsible-mobile-close-button"
                            aria-label="Close Mobile Filters"
                            title="Close Mobile Filters"
                            onClick={() => {
                                setShowMobileFilters(false);
                            }}>
                            <Icons.Close alt="Close Filters" />
                        </button>
                    </div>}
                <SidebarContentFilters sidebarContentHeight={sidebarContentHeight} />
            </div>
        </>);
};

SidebarContent.propTypes = propTypes;

export default SidebarContent;
