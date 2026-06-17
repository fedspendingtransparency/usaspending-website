/**
 * SidebarWrapper.jsx
 * Created by Andrea Blackwell 11/05/2024
 **/

import React, { useState } from 'react';
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
    const [sidebarContent, setSidebarContent] = useState('filters');

    const toggleOpened = (e) => {
        e.preventDefault();
        setSidebarIsOpen((prevState) => !prevState);
    };

    const keyHandler = (e, func) => {
        if (e.key === "Enter") {
            func(e);
        }
    };

    console.log({ sidebarContent });

    return (
        <>
            <div className="sidebar-natural-language-button" style={{ backgroundColor: "teal"}}>
                <button onClick={() => setSidebarContent('filters')}>filters</button>
                <button onClick={() => setSidebarContent('natural language')}>NL</button>
            </div>
            {/* Eventually remove search-sidebar css */}
            { sidebarContent === 'filters' ?
                <div
                    className={`search-collapsible-sidebar-container search-sidebar sticky ${
                        sidebarIsOpen ? "opened" : ""
                    } ${
                        showMobileFilters ? "mobile" : ""}`
                    }>
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
                        <div style={{ margin: "18px 16px" }}>
                            <FontAwesomeIcon title="Filters" icon="filter" />
                        </div>
                    }
                </div>
                :
                <div
                    className={`search-collapsible-sidebar-container search-sidebar sticky ${
                        sidebarIsOpen ? "opened" : ""
                    } ${
                        showMobileFilters ? "mobile" : ""}`
                    }>
                    natural language sidebar goes here
                </div>
            }
        </>
    );
});

SidebarWrapper.propTypes = propTypes;
export default SidebarWrapper;
