/**
 * SidebarWrapper.jsx
 * Created by Andrea Blackwell 11/05/2024
 **/

import React, { useState, useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import useIsMobile from "hooks/useIsMobile";
import SidebarContent from "./SidebarContent";
import MobileSidebarContent from "./MobileSidebarContent";
import NLSidebarButtons from "./NLSidebarButtons";
import AboutTheDataLink from "components/sharedComponents/AboutTheDataLink";
import { FILTERS } from "./SidebarConstants";
import NLDefaultHint from "./NLDefaultHint";

const propTypes = {
    setShowMobileFilters: PropTypes.func
};

// eslint-disable-next-line prefer-arrow-callback
const SidebarWrapper = React.memo(function SidebarWrapper({
    showMobileFilters, setShowMobileFilters, mobileSidebarContent, sidebarIsOpen, setSidebarIsOpen
}) {
    const { isMedium } = useIsMobile();
    const [sidebarContent, setSidebarContent] = useState(FILTERS);
    const [text, setText] = useState("");
    const MAX_CHARS = 500;
    
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
    
    const reset = () => setText("");

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
                                <h2 className="sidebar-title">{mobileSidebarContent === "natural language" ? "AI Search" : "Filter"}</h2>
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
               
                                 <p className="sidebar-text">This is placeholder text and will eventually be an intro that is succinct but very helpful. Learn more about AI Search on USAspending.</p>
                
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
                            <p className="sidebar-text">Start a USAspending search in your own words, or use one of the prompts below to help you get started.</p>
                            <div className="sidebar-body-row">
                                <span className="sidebar-example">Example Prompts: </span>
                                <NLDefaultHint onClick={hintOnClick} hint={<p>What schools in <span tabIndex={-1} className="hint-user-replace">[county, state]</span> receive the most money in federal funding?</p>} />
                                <NLDefaultHint onClick={hintOnClick} hint={<p>What programs received funding for veterans in <span tabIndex={-1} className="hint-user-replace">[state]</span> during <span tabIndex={-1} className="hint-user-replace">[time period]</span>?</p>} />
                                <NLDefaultHint onClick={hintOnClick} hint={<p>What’s the spending on <span tabIndex={-1} className="hint-user-replace">[topic of interest]</span> in <span tabIndex={-1} className="hint-user-replace">[location]</span> over the past decade?</p>} />
                            </div>
                            <div className="sidebar-body-row">
                                <textarea
                                    onChange={(e) => setText(e.target.value)} 
                                    name="smart-assist-input" 
                                    spellCheck 
                                    className="sidebar-textarea" 
                                    maxLength={MAX_CHARS}
                                    value={text} 
                                    rows="4" cols="50" 
                                    placeholder="Type a question about government spending, or choose an example above" />
                                <div className="textarea-char-row">
                                    {text.length > 0 && <button type="reset" className="textarea-reset" onClick={reset}>Clear Input</button>}
                                    <span className="textarea-char-count">{text.length} / {MAX_CHARS}</span>
                                </div>
                            </div>
                            <div className="sidebar-body-row">
                                <span className="sidebar-ai-blurb">This is a new AI feature on USAspending.gov. AI can make mistakes, so be sure to check the results.</span>
                            </div>
                        </div>
                    }

                </div>
            }
        </>
    );
});

SidebarWrapper.propTypes = propTypes;
export default SidebarWrapper;
