/**
 * SidebarWrapper.jsx
 * Created by Andrea Blackwell 11/05/2024
 **/

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from "prop-types";

import useIsMobile from "hooks/useIsMobile";
import SidebarContent from "./SidebarContent";
import MobileSidebarContent from "./MobileSidebarContent";

const propTypes = {
    setShowMobileFilters: PropTypes.func
};

// eslint-disable-next-line prefer-arrow-callback
const SidebarWrapper = React.memo(function SidebarWrapper({
    showMobileFilters, setShowMobileFilters, sidebarIsOpen, setSidebarIsOpen
}) {
    const { isMedium } = useIsMobile();

    const toggleOpened = (e) => {
        e.preventDefault();
        setSidebarIsOpen((prevState) => !prevState);
    };

    const keyHandler = (e, func) => {
        if (e.key === "Enter") {
            func(e);
        }
    };

    return (
        <>
            {/* Eventually remove search-sidebar css */}
            <div className={`search-collapsible-sidebar-container search-sidebar sticky ${sidebarIsOpen ? "opened" : ""} ${showMobileFilters ? "mobile" : ""}`}>
                <div
                    className="collapsible-sidebar--toggle"
                    onClick={(e) => {
                        toggleOpened(e);
                    }}
                    onKeyDown={(e) => {
                        keyHandler(e, toggleOpened);
                    }}
                    role="button"
                    aria-label={sidebarIsOpen ? "Close" : "Open"}
                    focusable="true"
                    tabIndex={0}>
                    {sidebarIsOpen ?
                        <FontAwesomeIcon className="chevron" icon="chevron-left" />
                        :
                        <FontAwesomeIcon className="chevron" icon="chevron-right" />
                    }
                </div>
                { sidebarIsOpen && !isMedium &&
                    <SidebarContent />
                }
                { sidebarIsOpen && showMobileFilters &&
                    <MobileSidebarContent setShowMobileFilters={setShowMobileFilters} />
                }
                { !sidebarIsOpen && !isMedium &&
                    <div style={{ margin: "18px 16px" }}><FontAwesomeIcon title="Filters" icon="filter" /></div>
                }
            </div>
        </>
    );
});

SidebarWrapper.propTypes = propTypes;
export default SidebarWrapper;
