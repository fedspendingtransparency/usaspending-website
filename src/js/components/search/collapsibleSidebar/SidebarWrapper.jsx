/**
 * SidebarWrapper.jsx
 * Created by Andrea Blackwell 11/05/2024
 **/

import React, { useEffect, useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from "prop-types";
import useIsMobile from "hooks/useIsMobile";

import { checkInView } from "helpers/search/collapsiblesidebarHelper";
import SidebarContent from "./SidebarContent";

const propTypes = {
    setShowMobileFilters: PropTypes.func,
    sidebarOpen: PropTypes.bool
};

// eslint-disable-next-line prefer-arrow-callback
const SidebarWrapper = React.memo(function SidebarWrapper({
    // eslint-disable-next-line no-unused-vars
    setShowMobileFilters, sidebarOpen
}) {
    const [initialPageLoad, setInitialPageLoad] = useState(true);
    const [sidebarContentHeight, setSidebarContentHeight] = useState();
    const [sidebarHeight, setSidebarHeight] = useState();
    const [mainContentHeight, setMainContentHeight] = useState();
    const [isOpened, setIsOpened] = useState(sidebarOpen);

    const sidebarContainer = useRef();
    const { isMedium } = useIsMobile();

    const toggleOpened = (e) => {
        e.preventDefault();
        setIsOpened((prevState) => !prevState);
    };

    const keyHandler = (e, func) => {
        if (e.key === "Enter") {
            func(e);
        }
    };

    const updatePosition = () => {
        if (sidebarContainer?.current) {
            const mainContentEl = document.querySelector(".search-contents.v2");
            const mainContentInView = checkInView(mainContentEl);
            const sidebarContentArea = mainContentInView - 100;
            setSidebarContentHeight(sidebarContentArea);
            setSidebarHeight(mainContentInView + 32);
        }
    };

    const openSidebar = (width) => {
        // const sidebarElSelector = isMobile ? ".mobile-search-sidebar-v2" : ".full-search-sidebar";
        // document.querySelector(sidebarElSelector).style.width = "unset";
        // document.querySelector(".full-search-sidebar").style.flexBasis = `${width}px`;
        // document.querySelector(".search-collapsible-sidebar-container").style.width = `${width}px`;
        // document.querySelector(".search-collapsible-sidebar-container").style.transition = 'width 300ms cubic-bezier(0.2, 0, 0, 1)';
    };

    const closeSidebar = () => {
        // document.querySelector(".full-search-sidebar").style.width = "0";
        // document.querySelector(".full-search-sidebar").style.flexBasis = "0";
    //     document.querySelector(".mobile-search-sidebar-v2").style.width = "0";
    //     document.querySelector(".search-collapsible-sidebar-container").style.transition = 'width 300ms cubic-bezier(0.2, 0, 0, 1)';
    //     document.querySelector(".mobile-search-sidebar-v2").style.flexBasis = "0";
    //     document.querySelector(".search-collapsible-sidebar-container").style.width = "0";
    };

    const handleScrollEnd = (e) => {
        updatePosition(e);
    };

    useEffect(() => {
        // if (isOpened) {
        //     if (document.querySelector(".full-search-sidebar")) {
        //         openSidebar(sideBarXlDesktopWidth);
        //     }
        //     else if (document.querySelector(".mobile-search-sidebar-v2") && isMobile) {
        //         openSidebar(sideBarXlDesktopWidth);
        //     }
        // }
        // else if (document.querySelector(".full-search-sidebar")) {
        //     closeSidebar();
        // }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isMedium, isOpened]);

    useEffect(() => {
        if (initialPageLoad && sidebarContainer) {
            setInitialPageLoad(false);
            updatePosition();
        }
    }, [initialPageLoad]);

    // useEffect(() => {
    //     if (sidebarHeight > 0 && sidebarContentHeight > 0 && document.querySelector(".search-sidebar").style.display === "none") {
    //         document.querySelector(".search-sidebar").style.display = "flex";
    //     }
    // }, [sidebarHeight, sidebarContentHeight]);

    useEffect(() => {
        updatePosition();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [mainContentHeight]);

    useEffect(() => {
        const mainContentResizeObserver = new ResizeObserver((entries) => {
            setMainContentHeight(entries[0].target?.clientHeight);
        });

        const mainContent = document.querySelector("#main-content");
        mainContentResizeObserver.observe(mainContent);

        window.addEventListener('resize', () => updatePosition());
        window.addEventListener('scroll', () => updatePosition());
        window.addEventListener('scrollend', (e) => handleScrollEnd(e));

        return () => {
            window.removeEventListener('resize', () => updatePosition());
            window.removeEventListener('scroll', () => updatePosition());
            window.removeEventListener('scrollend', (e) => handleScrollEnd(e));

            mainContentResizeObserver?.unobserve(mainContent);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            {/* Eventually remove search-sidebar css */}
            <div
                ref={sidebarContainer}
                style={{ height: sidebarHeight }}
                className={`search-collapsible-sidebar-container search-sidebar sticky ${isOpened ? "opened" : ""}`}>
                <div
                    className="collapsible-sidebar--toggle"
                    onClick={(e) => {
                        toggleOpened(e);
                    }}
                    onKeyDown={(e) => {
                        keyHandler(e, toggleOpened);
                    }}
                    role="button"
                    aria-label="Toggle Collapsible Sidebar"
                    focusable="true"
                    tabIndex={0}>
                    {isOpened ?
                        <FontAwesomeIcon className="chevron" icon="chevron-left" />
                        :
                        <FontAwesomeIcon className="chevron" icon="chevron-right" />
                    }
                </div>
                { isOpened &&
                        <SidebarContent
                            sidebarContentHeight={sidebarContentHeight}
                            setShowMobileFilters={setShowMobileFilters} />
                }
            </div>
        </>
    );
});

SidebarWrapper.propTypes = propTypes;
export default SidebarWrapper;
