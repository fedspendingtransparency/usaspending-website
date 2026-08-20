/**
 * SidebarWrapper.jsx
 * Created by Andrea Blackwell 11/05/2024
 **/

import React, {useEffect}  from 'react';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from "prop-types";
import useIsMobile from "hooks/useIsMobile";
import SidebarContent from "./SidebarContent";
import MobileSidebarContent from "./MobileSidebarContent";
import NLSidebarButtons from "./NLSidebarButtons";
import AboutTheDataLink from "components/sharedComponents/AboutTheDataLink";
import { FILTERS, NATURAL_LANGUAGE } from './SidebarConstants';

const propTypes = {
    setShowMobileFilters: PropTypes.func
};

// eslint-disable-next-line prefer-arrow-callback
const SidebarWrapper = React.memo(function SidebarWrapper({
    showMobileFilters, setShowMobileFilters, mobileSidebarContent, sidebarIsOpen, setSidebarIsOpen
}) {
    const { isMedium } = useIsMobile();
    const sidebarContent = useSelector((state) => state.sidebar.sidebarContent);

    const isFilters = sidebarContent === FILTERS;

    // useEffect(() => {
    //     console.log({sidebarContent})
    // });

    const shouldShowSidebar = isMedium ? showMobileFilters : sidebarIsOpen;

    console.log({isFilters, shouldShowSidebar, isMedium, sidebarContent, showMobileFilters});

    const toggleOpened = (e) => {
        e.preventDefault();
        setSidebarIsOpen((prevState) => !prevState);
    };

    const closeSidebar = () => {
        if (isMedium) {
            setShowMobileFilters(false);
        } else {
            setSidebarIsOpen(false)
        }
    }

    const keyHandler = (e, func) => {
        if (e.key === "Enter") {
            func(e);
        }
    };

    const renderSidebarContent = () => {
        if (isFilters) {
            return (
                <>
                    <div className="link">
                        <AboutTheDataLink slug="data-elements">
                        Learn more about filters
                        </AboutTheDataLink>
                    </div>

                    {isMedium ? (
                        <MobileSidebarContent 
                            setShowMobileFilters={setShowMobileFilters} 
                            mobileSidebarContent={mobileSidebarContent} />  
                    ): (
                        <SidebarContent />  
                    )

                    }
                </>
            );
        }
        
        return (
            <p className="sidebar-text">
                This is placeholder text and will eventually be an intro 
                that is succinct but very helpful. Learn more about AI Search 
                on USAspending.
            </p>
        );
    }

    return (
        <>
            <NLSidebarButtons
                sidebarContent={sidebarContent}
                setSidebarIsOpen={toggleOpened}
                sidebarIsOpen={sidebarIsOpen}
                isMedium={isMedium} 
                setShowMobileFilters={setShowMobileFilters}/>
            {/* Eventually remove search-sidebar css */}

            <div
                className={`search-collapsible-sidebar-container search-sidebar sticky ${
                    sidebarIsOpen ? "opened" : ""
                } ${
                    showMobileFilters ? "mobile" : ""}`
                }>
                { shouldShowSidebar && ( 
                    <div className="collapsible-sidebar-header">
                        <div className="sidebar-title-row">
                            <h2 className="sidebar-title">
                                {isFilters ? 'Filter' : 'AI Search'}
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
                        { renderSidebarContent() }
                    </div>  
                )}
            </div>
        </>
                
    );
});

SidebarWrapper.propTypes = propTypes;
export default SidebarWrapper;
