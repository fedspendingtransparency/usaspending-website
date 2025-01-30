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
    const [sidebarIsSticky, setSidebarIsSticky] = useState();
    const [sidebarTop, setSidebarTop] = useState();
    const [mainContentHeight, setMainContentHeight] = useState();
    const [isOpened, setIsOpened] = useState(sidebarOpen);
    const footerEl = document.querySelector("footer");
    const topStickyBarEl = document.querySelector(".usda-page-header");

    const sidebarStaticEls = 172;
    const footerMargin = 46;
    const topStickyBarHeight = 60;
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
        const mainContentEl = document.querySelector("#main-content");
        const mainContentInView = checkInView(mainContentEl);
        const sidebarContentArea = mainContentInView - sidebarStaticEls;

        if (footerInView < 10) {
            setSidebarHeight(mainContentInView - topStickyBarHeight);
            setSidebarContentHeight(sidebarContentArea - topStickyBarHeight);
        }
        else {
            const margins = topStickyBarHeight + footerMargin;

            if (sidebarContentArea - margins < minContentHeight) {
                hideElements(panelContainerElClasses);
            }
            else {
                showElements(panelContainerElClasses);
            }

            setSidebarHeight(mainContentInView - margins);
            setSidebarContentHeight(sidebarContentArea - margins);
        }
    };

    // This function resizeInitialSidebar, will resize the sidebar while the full header is visible in the viewport
    const resizeInitialSidebar = () => {
        const mainContentEl = document.querySelector("#main-content");
        const mainContentInView = checkInView(mainContentEl);
        const sidebarContentArea = mainContentInView - sidebarStaticEls;

        setSidebarHeight(mainContentInView);
        setSidebarContentHeight(sidebarContentArea);
    };

    const handleScroll = throttle(() => {
        if (window.scrollY > 60) {
            const topStickyBarBbox = topStickyBarEl.getBoundingClientRect();
            setSidebarTop(checkInView(topStickyBarEl) < 0 ? 0 : topStickyBarBbox.bottom);
        }

        setFooterInView(checkInView(footerEl) + footerMargin);
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
                } else {
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

        if (window.scrollY === 0 && mainContentHeight) {
            document.querySelector("#main-content .v2").style.minHeight = `${window.innerHeight}px`;
            setSidebarHeight(mainContentInView);
            setSidebarContentHeight(mainContentInView - sidebarStaticEls);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [mainContentHeight]);

    useEffect(() => {
        if (window.scrollY > 60) {
            const headingInView = sidebarTop + headingPadding;
            document.querySelector(".search-collapsible-sidebar-container").style.top = `${headingInView}px`;
            document.querySelector(".search-collapsible-sidebar-container").style.position = `fixed`;
            document.querySelector(".search-collapsible-sidebar-container").style.transition = `position 2s`;
            document.querySelector(".sidebar-bottom-submit").style.position = `absolute`;

            if (sidebarIsSticky) {
                resizeSidebar();
            }
            else {
                resizeInitialSidebar();
            }
        }
        else {
            document.querySelector(".search-collapsible-sidebar-container").style.top = `unset`;
            document.querySelector(".search-collapsible-sidebar-container").style.position = `static`;
            document.querySelector(".sidebar-bottom-submit").style.position = `static`;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sidebarTop, footerInView, sidebarIsSticky]);

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
                style={{ height: sidebarHeight, overscrollBehavior: "none" }}
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
