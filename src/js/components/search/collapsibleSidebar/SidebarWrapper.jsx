/**
 * SidebarWrapper.jsx
 * Created by Andrea Blackwell 11/05/2024
 **/

import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { throttle } from "lodash";
import PropTypes from "prop-types";
import { mediumScreen, largeScreen } from 'dataMapping/shared/mobileBreakpoints';
import { sideBarDesktopWidth, sideBarXlDesktopWidth, panelContainerElClasses, checkInView } from "../../../helpers/search/collapsiblesidebarHelper";
import SidebarContent from "./SidebarContent";

const propTypes = {
    setShowMobileFilters: PropTypes.func,
    showMobileFilters: PropTypes.bool,
    sidebarOpen: PropTypes.bool,
    setSidebarOpen: PropTypes.func
};

const SidebarWrapper = ({
    // eslint-disable-next-line no-unused-vars
    setShowMobileFilters, showMobileFilters, sidebarOpen, setSidebarOpen
}) => {
    const [isMobile, setIsMobile] = useState(window.innerWidth < mediumScreen);
    const [initialPageLoad, setInitialPageLoad] = useState(true);
    const [windowWidth, setWindowWidth] = useState();
    const [sidebarHeight, setSidebarHeight] = useState();
    const [sidebarContentHeight, setSidebarContentHeight] = useState();
    const [mainContentHeight, setMainContentHeight] = useState();
    const [isOpened, setIsOpened] = useState(sidebarOpen);
    const [isHeaderVisible, setIsHeaderVisible] = useState();
    const [sidebarIsSticky, setSidebarIsSticky] = useState();
    const [isFooterVisible, setIsFooterVisible] = useState();
    const [footerInView, setFooterInView] = useState();

    const footerEl = document.querySelector("footer");
    const sidebarStaticEls = 172;
    const footerMargin = 46;
    const topStickyBarHeight = 60;
    const minContentHeight = 124;

    const toggleOpened = (e) => {
        e.preventDefault();
        setIsOpened((prevState) => !prevState);
    };

    const hideElements = (removeableEls) => {
        for (let i = 0; i < removeableEls.length; i++) {
            const elClass = removeableEls[i].className;
            document.querySelector(`.${elClass}`).style.display = "none";
        }
    };

    const showElements = (removeableEls) => {
        for (let i = 0; i < removeableEls.length; i++) {
            const elClass = removeableEls[i].className;
            document.querySelector(`.${elClass}`).style.display = removeableEls[i].display;
        }
    };

    const resizeHeightByFooter = () => {
        const mainContentEl = document.querySelector("#main-content");
        const mainContentInView = checkInView(mainContentEl);
        const sidebarContentArea = mainContentInView - sidebarStaticEls;
        setFooterInView(checkInView(footerEl));
        const margins = topStickyBarHeight + footerMargin;

        if (sidebarContentArea - margins < minContentHeight) {
             hideElements(panelContainerElClasses);
        }
        else {
            showElements(panelContainerElClasses);
        }

        console.log("resize height by footer", mainContentInView);

        setSidebarHeight(mainContentInView - margins);
        setSidebarContentHeight(sidebarContentArea - margins);
    };

    const resizeHeightByHeader = () => {
        const mainContentEl = document.querySelector("#main-content");
        const mainContentInView = checkInView(mainContentEl);
        const sidebarContentArea = mainContentInView - sidebarStaticEls;

        setSidebarHeight(mainContentInView);
        setSidebarContentHeight(sidebarContentArea);
    };

    const updatePosition = () => {
        if (!sidebarIsSticky && isHeaderVisible) {
            console.log("static- sticky, header, footer", sidebarIsSticky, isHeaderVisible, isFooterVisible);
            document.querySelector(".search-collapsible-sidebar-container").style.marginTop = `0`;
            document.querySelector(".search-collapsible-sidebar-container").style.position = `static`;
            document.querySelector(".sidebar-bottom-submit").style.position = `static`;
            resizeHeightByHeader();
        }
         else if (sidebarIsSticky) {
             console.log("fixed")
            document.querySelector(".search-collapsible-sidebar-container").style.marginTop = `-32px`;
            document.querySelector(".search-collapsible-sidebar-container").style.position = `fixed`;
            document.querySelector(".search-collapsible-sidebar-container").style.height = `100vh - 60`;
            document.querySelector(".search-collapsible-sidebar-container").style.transition = `position 2s`;
            document.querySelector(".sidebar-bottom-submit").style.position = `absolute`;
        }

        if (isFooterVisible) {
            resizeHeightByFooter();
        }
    };

    const handleScroll = throttle(() => {
        const tmpFooterInView = checkInView(footerEl) + footerMargin;
        setIsFooterVisible(tmpFooterInView > 0);
        if (window.scrollY < 172 || tmpFooterInView > 0) {
            updatePosition();
        }
    }, 30);

    const keyHandler = (e, func) => {
        if (e.key === "Enter") {
            func(e);
        }
    };

    const handleResize = throttle(() => {
        const newWidth = window.innerWidth;
        if (windowWidth !== newWidth) {
            setWindowWidth(newWidth);
            setIsMobile(newWidth < mediumScreen);
        }
        handleScroll();
    }, 30);

    const openSidebar = (width) => {
        const sidebarElSelector = isMobile ? ".mobile-search-sidebar-v2" : ".full-search-sidebar";
        document.querySelector(sidebarElSelector).style.width = "unset";
        document.querySelector(".full-search-sidebar").style.flexBasis = `${width}px`;
        document.querySelector(".collapsible-sidebar").style.width = `${width}px`;
        document.querySelector(".collapsible-sidebar").style.transition = `width 300ms cubic-bezier(0.2, 0, 0, 1)`;
        document.querySelector(".sidebar-bottom-submit").style.display = "block";
        if (document.querySelector(".collapsible-sidebar--dsm-slider")) {
            document.querySelector(".collapsible-sidebar--dsm-slider").style.display = "flex";
        }
    };

    const closeSidebar = () => {
        document.querySelector(".full-search-sidebar").style.width = "0";
        document.querySelector(".full-search-sidebar").style.flexBasis = "0";
        document.querySelector(".mobile-search-sidebar-v2").style.width = "0";
        document.querySelector(".collapsible-sidebar").style.transition = `width 300ms cubic-bezier(0.2, 0, 0, 1)`;
        document.querySelector(".mobile-search-sidebar-v2").style.flexBasis = "0";
        document.querySelector(".collapsible-sidebar").style.width = "0";
        document.querySelector(".sidebar-bottom-submit").style.display = "none";
        if (document.querySelector(".collapsible-sidebar--dsm-slider")) {
            document.querySelector(".collapsible-sidebar--dsm-slider").style.display = "none";
        }
    };

    useEffect(() => {
        if (isOpened) {
            if (document.querySelector(".full-search-sidebar")) {
                if (windowWidth >= mediumScreen && windowWidth < largeScreen) {
                    openSidebar(sideBarDesktopWidth);
                }
                else {
                    openSidebar(sideBarXlDesktopWidth);
                }
            }
            else if (document.querySelector(".mobile-search-sidebar-v2") && isMobile) {
                openSidebar(sideBarDesktopWidth);
            }
        }
        else if (document.querySelector(".full-search-sidebar")) {
            closeSidebar();
        }
    }, [isMobile, isOpened, openSidebar, windowWidth]);

    useEffect(() => {
        if (!isOpened && initialPageLoad) {
            setInitialPageLoad(false);
        }
    }, [initialPageLoad, isOpened]);

    useEffect(() => {
        if (sidebarHeight > 0 && sidebarContentHeight > 0 && document.querySelector(".search-sidebar").style.display === "none") {
            document.querySelector(".search-sidebar").style.display = "flex";
        }
    }, [sidebarHeight, sidebarContentHeight]);

    useEffect(() => {
        const mainContentEl = document.querySelector("#main-content");
        const mainContentInView = checkInView(mainContentEl);

        console.log("main content height", mainContentHeight);
        if (window.scrollY === 0 && mainContentHeight) {
            document.querySelector("#main-content .v2").style.minHeight = `${window.innerHeight}px`;
            setSidebarHeight(mainContentInView);
            setSidebarContentHeight(mainContentInView - sidebarStaticEls);
        }

        console.log("is footer visible", isFooterVisible);
        updatePosition();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isFooterVisible, isHeaderVisible, sidebarIsSticky, mainContentHeight]);

    useEffect(() => {
        // eslint-disable-next-line no-undef
        const resizeObserver = new ResizeObserver((entries) => {
            setMainContentHeight(entries[0].target.clientHeight);
        });

        const mainContent = document.querySelector("#main-content");
        resizeObserver.observe(mainContent);

        handleResize();

        window.addEventListener('resize', (e) => handleResize(e));
        window.addEventListener('scroll', (e) => handleScroll(e));

        // eslint-disable-next-line no-undef
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.target?.localName?.includes("footer")) {
                    setIsFooterVisible(entry.isIntersecting);
                }

                if (entry.target?.className?.includes("usda-page-header") && !entry.target?.className?.includes("usda-page-header--sticky")) {
                    console.log("changing header - sticky is", entry.target?.className?.includes("usda-page-header--sticky"));
                    setIsHeaderVisible(entry.isIntersecting);
                    setSidebarIsSticky(false);
                }

                if (entry.target?.className?.includes("usda-page-header--sticky")) {
                    setSidebarIsSticky(entry.isIntersecting);
                    setIsHeaderVisible(false);
                }
            });
        });

        observer.observe(document.querySelector("footer"));
        observer.observe(document.querySelector(".usda-page-header"));
        return () => {
            window.removeEventListener('resize', (e) => handleResize(e));
            window.removeEventListener('scroll', (e) => handleScroll(e));
            resizeObserver.unobserve(mainContent);

            observer.unobserve(document.querySelector(".site-header__wrapper"));
            observer.unobserve(document.querySelector("footer"));
            observer.unobserve(document.querySelector(".usda-page-header"));
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    });

    return (
        <div className="search-collapsible-sidebar-container search-sidebar" style={isMobile ? {} : { display: "none" }}>
            <div
                style={{ height: sidebarIsSticky && !isFooterVisible ? 'calc(100vh - 60px)' : sidebarHeight, overscrollBehavior: "none" }}
                className={`search-sidebar collapsible-sidebar ${initialPageLoad ? 'is-initial-loaded' : ''} ${isOpened ? 'opened' : ''}`}>
                <div
                    className="collapsible-sidebar--toggle"
                    onClick={(e) => toggleOpened(e)}
                    onKeyDown={(e) => keyHandler(e, toggleOpened)}
                    role="button"
                    focusable="true"
                    tabIndex={0}>
                    {isOpened ?
                        <FontAwesomeIcon className="chevron" icon="chevron-left" />
                        :
                        <FontAwesomeIcon className="chevron" icon="chevron-right" />
                    }
                </div>
                <SidebarContent sidebarContentHeight={sidebarContentHeight} setShowMobileFilters={setShowMobileFilters} />
            </div>
        </div>
    );
};

SidebarWrapper.propTypes = propTypes;

export default SidebarWrapper;
