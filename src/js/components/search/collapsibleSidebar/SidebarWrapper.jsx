/**
 * SidebarWrapper.jsx
 * Created by Andrea Blackwell 11/05/2024
 **/

import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from "prop-types";
import useIsMobile from "hooks/useIsMobile";
import SidebarContent from "./SidebarContent";
import MobileSidebarContent from "./MobileSidebarContent";
import NLSidebarButtons from "./NLSidebarButtons";
import AboutTheDataLink from "components/sharedComponents/AboutTheDataLink";
import NLSidebarContent from "./NLSidebarContent";
import { FILTERS } from './SidebarConstants';
import useRequestNLSearch from "./useRequestNLSearch";
import { setIsNLSearchComplete } from '../../../redux/actions/sidebar/sidebarActions';
import { RESPONSE_TYPE } from './NLConstants';

const propTypes = {
    showMobileFilters: PropTypes.bool,
    setShowMobileFilters: PropTypes.func,
    mobileSidebarContent: PropTypes.string,
    sidebarIsOpen: PropTypes.bool,
    setSidebarIsOpen: PropTypes.func
    
}

// eslint-disable-next-line prefer-arrow-callback
const SidebarWrapper = React.memo(function SidebarWrapper({
    showMobileFilters, 
    setShowMobileFilters, 
    mobileSidebarContent, 
    sidebarIsOpen, 
    setSidebarIsOpen
}) {
    const { isMedium } = useIsMobile();
    const sidebarContent = useSelector((state) => state.sidebar.sidebarContent);
    const isSearchActive = useSelector((state) => state.sidebar.isSearchActive);
    const isNLSearchComplete = useSelector((state) => state.sidebar.isNLSearchComplete);
    const [text, setText] = useState("");
    const dispatch = useDispatch();

    const isDesktopFilters = sidebarContent === FILTERS;
    const isMobileFilters = mobileSidebarContent === FILTERS;

    const { data, refetch, cancelQuery } = useRequestNLSearch(text);

    const parsedData = data
        ?.split('\n')
        .filter((line) => line.trim() !== '')
        .map((line) => JSON.parse(line));
    
    const toggleOpened = (e) => {
        e.preventDefault();
        setSidebarIsOpen((prevState) => !prevState);
    };

    const closeSidebar = () => {
        if (isMedium) {
            setShowMobileFilters(false);
        } else {
            setSidebarIsOpen(false);
        }
    }

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

    const startNLSearch = () => {
        if(text && typeof refetch === "function") {
            refetch();
        }
    }

    useEffect(() => {
        if (parsedData) {
            dispatch(setIsNLSearchComplete(parsedData
                .some((res) => (
                    res.type === RESPONSE_TYPE.SEARCH_COMPLETE 
                    || res.type === RESPONSE_TYPE.SEARCH_ERROR))
            || false));
        }
    })

    const renderDesktopSidebar = () => (
        <div className="collapsible-sidebar-header">
            <div className="sidebar-title-row">
                <h2 className="sidebar-title">
                    {isDesktopFilters ? 'Filter' : 'Smart Assist'}
                </h2>
                <div
                    onClick={toggleOpened}
                    onKeyDown={(e) => {
                        keyHandler(e, toggleOpened);
                    }}
                    role="button"
                    className="sidebar-close"
                    aria-label="Close"
                    tabIndex={0}>
                    <FontAwesomeIcon className="close" icon="close" />
                </div>    
            </div>

            { isDesktopFilters ? (
                <>
                    <div className="link">
                        <AboutTheDataLink slug="data-elements">
                                Learn more about filters
                        </AboutTheDataLink>
                    </div>
                    <SidebarContent />
                </>
            ): (
                <NLSidebarContent
                    hintOnClick={hintOnClick}
                    text={text}
                    setText={setText}
                    startNLSearch={startNLSearch} 
                    data={parsedData}
                    cancelQuery={cancelQuery} />
            )}   
        </div>    
    );

    const renderMobileSidebar = () => (
        <div className={`collapsible-sidebar-header ${isMobileFilters ? "" : "is-nl"}`}>
            <div className="sidebar-title-row">
                <h2 className="sidebar-title">
                    {isMobileFilters ? 'Filter' : 'Smart Assist'}
                </h2>
                <div
                    onClick={closeSidebar}
                    onKeyDown={(e) => {
                        keyHandler(e, closeSidebar);
                    }}
                    role="button"
                    className="sidebar-close"
                    aria-label="Close"
                    tabIndex={0}>
                    <FontAwesomeIcon className="close" icon="close" />
                </div>    
            </div>

            { isMobileFilters ? (
                <>
                    <div className="link">
                        <AboutTheDataLink slug="data-elements">
                                Learn more about filters
                        </AboutTheDataLink>
                    </div>
                    <MobileSidebarContent 
                        setShowMobileFilters={setShowMobileFilters} 
                        mobileSidebarContent={mobileSidebarContent} 
                        showMobileFilters={showMobileFilters}/>  
                </>
            ): (
                <NLSidebarContent
                    hintOnClick={hintOnClick}
                    text={text}
                    setText={setText}
                    startNLSearch={startNLSearch} 
                    data={parsedData}
                    cancelQuery={cancelQuery} />
            )}
        </div>
    );
    
    return (
        <>
            <NLSidebarButtons
                sidebarContent={sidebarContent}
                setSidebarIsOpen={toggleOpened}
                sidebarIsOpen={sidebarIsOpen}
                isMedium={isMedium} 
                setShowMobileFilters={setShowMobileFilters}
                isActiveNlSearch={isSearchActive && !isNLSearchComplete} />
            {/* Eventually remove search-sidebar css */}
            <div
                className={`search-collapsible-sidebar-container search-sidebar sticky ${
                    sidebarIsOpen || showMobileFilters ? "opened" : ""
                } ${
                    showMobileFilters ? "mobile" : ""}`
                }>
                
                { isMedium 
                    ? showMobileFilters && renderMobileSidebar()
                    : sidebarIsOpen && renderDesktopSidebar()
                }
            </div>
        </> 
    );                 
});

SidebarWrapper.propTypes = propTypes;
export default SidebarWrapper;
