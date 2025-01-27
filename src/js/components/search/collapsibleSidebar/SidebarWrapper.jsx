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
    const [footerInView, setFooterInView] = useState();
    const [siteHeaderInView, setSiteHeaderInView] = useState();
    const [sidebarIsSticky, setSidebarIsSticky] = useState();
    const [sidebarTop, setSidebarTop] = useState();
    const [mainContentHeight, setMainContentHeight] = useState();
    const [isOpened, setIsOpened] = useState(sidebarOpen);
    const footerEl = document.querySelector("footer");
    const topStickyBarEl = document.querySelector(".usda-page-header");

    const sidebarStaticEls = 172;
    const footerMargin = 45;
    const minContentHeight = 124;
    const headingPadding = 40;

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

    // This function resizeSidebar, will resize the sidebar while only the page header (ie. top sticky bar) is visible in the viewport
    const resizeSidebar = () => {
        const hasFooter = footerInView > 0 ? footerInView : 0;

        const mainContentArea = (window.innerHeight - sidebarTop);
        const sidebarContentArea = mainContentArea - sidebarStaticEls;

        if (footerInView < 10) {
            setSidebarHeight(mainContentArea);
            setSidebarContentHeight(sidebarContentArea);
        }
        else {
            const sidebarContentAreaWFooter = sidebarContentArea - hasFooter;
            if (sidebarContentAreaWFooter < minContentHeight) {
                hideElements(panelContainerElClasses);
            }
            else {
                showElements(panelContainerElClasses);
            }

            setSidebarHeight(mainContentArea - hasFooter - 4);
            setSidebarContentHeight(sidebarContentAreaWFooter - 4);
        }
    };

    // This function resizeInitialSidebar, will resize the sidebar while the full header is visible in the viewport
    const resizeInitialSidebar = () => {
        const fullHeaderHeight = siteHeaderInView + topStickyBarEl.clientHeight;
        const hasFooter = footerInView > 0 ? footerInView : 0;
        const mainContentArea = (window.innerHeight - fullHeaderHeight) - hasFooter;
        const sidebarContentArea = mainContentArea - sidebarStaticEls;
        setSidebarHeight(mainContentArea);
        setSidebarContentHeight(sidebarContentArea);
    };

    const handleScroll = throttle(() => {
        const siteHeaderEl = document.querySelector(".site-header__wrapper");
        const siteHeaderHeight = siteHeaderEl.clientHeight;

        if (window.scrollY === 0) {
            setSidebarTop(siteHeaderHeight + topStickyBarEl.clientHeight);
        }
        else {
            const topStickyBarBbox = topStickyBarEl.getBoundingClientRect();
            setSidebarTop(checkInView(topStickyBarEl) < 0 ? 0 : topStickyBarBbox.bottom);
        }

        setFooterInView(checkInView(footerEl) + footerMargin);
        setSiteHeaderInView(checkInView(siteHeaderEl));
        setSidebarIsSticky(topStickyBarEl?.classList?.contains("usda-page-header--sticky"));
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
            handleScroll();
        }
    }, 30);

    const openSidebar = (width) => {
        const sidebarElSelector = isMobile ? ".mobile-search-sidebar-v2" : ".full-search-sidebar";
        document.querySelector(sidebarElSelector).style.width = "unset";
        document.querySelector(".full-search-sidebar").style.flexBasis = `${width}px`;
        document.querySelector(".collapsible-sidebar").style.width = `${width}px`;
        document.querySelector(".sidebar-bottom-submit").style.display = "block";
        if (document.querySelector(".collapsible-sidebar--dsm-slider")) {
            document.querySelector(".collapsible-sidebar--dsm-slider").style.display = "flex";
        }
    };

    const closeSidebar = () => {
        document.querySelector(".full-search-sidebar").style.width = "0";
        document.querySelector(".full-search-sidebar").style.flexBasis = "0";
        document.querySelector(".mobile-search-sidebar-v2").style.width = "0";
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
                else if (windowWidth >= largeScreen) {
                    openSidebar(sideBarXlDesktopWidth);
                }
            }
            else if (document.querySelector(".mobile-search-sidebar-v2")) {
                if (isMobile) {
                    openSidebar(sideBarDesktopWidth);
                }
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
        const siteHeaderEl = document.querySelector(".site-header__wrapper");
        const siteHeaderHeight = siteHeaderEl.clientHeight;

        if (window.scrollY === 0 && mainContentHeight && siteHeaderHeight) {
            document.querySelector("#main-content .v2").style.minHeight = `${window.innerHeight}px`;
            setSidebarTop(siteHeaderHeight + topStickyBarEl.clientHeight);

            const fullHeaderHeight = siteHeaderHeight + topStickyBarEl.clientHeight;
            if ((window.innerHeight - fullHeaderHeight) >= mainContentHeight) {
                setSidebarHeight((mainContentHeight));
                setSidebarContentHeight(mainContentHeight - sidebarStaticEls);
            }
            else if ((window.innerHeight - fullHeaderHeight) < mainContentHeight) {
                const mainContentArea = window.innerHeight - fullHeaderHeight;
                const sidebarContentArea = mainContentArea - sidebarStaticEls;

                setSidebarHeight(mainContentArea);
                setSidebarContentHeight(sidebarContentArea);
            }
        }
    }, [mainContentHeight, topStickyBarEl.clientHeight]);

    useEffect(() => {
        const headingInView = sidebarTop + headingPadding;
        document.querySelector(".search-collapsible-sidebar-container").style.top = `${headingInView}px`;

        if (window.scrollY > 0) {
            if (sidebarIsSticky) {
                resizeSidebar();
            }
            else {
                resizeInitialSidebar();
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [footerInView, siteHeaderInView, sidebarIsSticky, sidebarTop]);

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
        return () => {
            window.removeEventListener('resize', (e) => handleResize(e));
            window.removeEventListener('scroll', (e) => handleScroll(e));
            resizeObserver.unobserve(mainContent);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="search-collapsible-sidebar-container search-sidebar" style={isMobile ? {} : { display: "none" }}>
            <div
                style={{ height: sidebarHeight }}
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
