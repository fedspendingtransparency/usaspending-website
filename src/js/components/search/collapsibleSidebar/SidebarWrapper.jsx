/**
 * SidebarWrapper.jsx
 * Created by Andrea Blackwell 11/05/2024
 **/

import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import useIsMobile from "hooks/useIsMobile";
import SidebarContent from "./SidebarContent";
import MobileSidebarContent from "./MobileSidebarContent";
import NLSidebarButtons from "./NLSidebarButtons";
import AboutTheDataLink from "components/sharedComponents/AboutTheDataLink";
import { FILTERS } from "./SidebarConstants";
import NLSidebarContent from "./NLSidebarContent";

const propTypes = {
    setShowMobileFilters: PropTypes.func,
    showMobileFilters: PropTypes.string,
    mobileSidebarContent: PropTypes.string,
    sidebarIsOpen: PropTypes.bool, 
    setSidebarIsOpen: PropTypes.func
};

// eslint-disable-next-line prefer-arrow-callback
const SidebarWrapper = React.memo(function SidebarWrapper({
    showMobileFilters, setShowMobileFilters, mobileSidebarContent, sidebarIsOpen, setSidebarIsOpen
}) {
    const { isMedium } = useIsMobile();
    const [sidebarContent, setSidebarContent] = useState(FILTERS);
    const [text, setText] = useState("");
    
    const toggleOpened = (e) => {
        e.preventDefault();
        setSidebarIsOpen((prevState) => !prevState);
    };

    const keyHandler = (e, func) => {
        if (e.key === "Enter") {
            func(e);
        }
    };

    const hintOnClick = (e) => {
        if(e?.target.textContent) {
            setText(e.target.textContent);
        }
    };

    return (
        <>
            <NLSidebarButtons
                sidebarContent={sidebarContent}
                setSidebarIsOpen={toggleOpened}
                sidebarIsOpen={sidebarIsOpen}
                setSidebarContent={setSidebarContent}
                isMedium={isMedium} />
            {/* Eventually remove search-sidebar css */}
            { sidebarContent === FILTERS ?
                <div
                    className={`search-collapsible-sidebar-container search-sidebar sticky ${
                        sidebarIsOpen ? "opened" : ""
                    } ${
                        showMobileFilters ? "mobile" : ""}`
                    }>
                    { sidebarIsOpen && !isMedium &&  
                        <div className="collapsible-sidebar-header">
                            <div className="sidebar-title-row">
                                <h2 className="sidebar-title">Filter</h2>
                                <div
                                    onClick={(e) => {
                                        toggleOpened(e);
                                    }}
                                    onKeyDown={(e) => {
                                        keyHandler(e, toggleOpened);
                                    }}
                                    role="button"
                                    className="sidebar-close"
                                    aria-label={sidebarIsOpen ? "Close" : "Open"}
                                    tabIndex={0}>
                                    <FontAwesomeIcon className="close" icon="close" />
                                </div>
                                
                            </div>
                            <div className="link"><AboutTheDataLink slug="data-elements">Learn more about filters</AboutTheDataLink></div>
                            <SidebarContent />
                        </div>  
                    }
                    { sidebarIsOpen && showMobileFilters &&
                        <div className="collapsible-sidebar-header">
                            <div className="sidebar-title-row">
                                <h2 className="sidebar-title">{mobileSidebarContent === "natural language" ? "Smart Assist" : "Filter"}</h2>
                                <div
                                    onClick={() => {
                                        setShowMobileFilters(false);
                                    }}
                                    onKeyDown={() => {
                                        setShowMobileFilters(false);
                                    }}
                                    role="button"
                                    className="sidebar-close"
                                    aria-label={sidebarIsOpen ? "Close" : "Open"}
                                    tabIndex={0}>
                                    <FontAwesomeIcon className="close" icon="close" />
                                </div>
                                
                            </div>
                            {mobileSidebarContent === "filters" &&
                                <div className="link"><AboutTheDataLink slug="data-elements">Learn more about filters</AboutTheDataLink></div>
                            }
                            {mobileSidebarContent === "natural language" &&
                                <NLSidebarContent
                                    hintOnClick={hintOnClick}
                                    text={text}
                                    setText={setText} />
                
                            }

                            <MobileSidebarContent setShowMobileFilters={setShowMobileFilters} mobileSidebarContent={mobileSidebarContent} />
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
                    { sidebarIsOpen && 
                        <div className="collapsible-sidebar-header">
                            <div className="sidebar-title-row">
                                <h2 className="sidebar-title">Smart Assist</h2>
                                <div
                                    onClick={(e) => {
                                        toggleOpened(e);
                                    }}
                                    onKeyDown={(e) => {
                                        keyHandler(e, toggleOpened);
                                    }}
                                    role="button"
                                    className="sidebar-close"
                                    aria-label={sidebarIsOpen ? "Close" : "Open"}
                                    tabIndex={0}>
                                    <FontAwesomeIcon className="close" icon="close" />
                                </div>
                                
                            </div>
                            <NLSidebarContent
                                hintOnClick={hintOnClick}
                                text={text}
                                setText={setText} />            
                        </div>
                    }

                </div>
            }
        </>
    );
});

SidebarWrapper.propTypes = propTypes;
export default SidebarWrapper;
