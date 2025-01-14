/**
 * SidebarWrapper.jsx
 * Created by Andrea Blackwell 11/05/2024
 **/

import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { throttle } from "lodash";
import { mediumScreen, largeScreen } from 'dataMapping/shared/mobileBreakpoints';
import { sideBarDesktopWidth, sideBarXlDesktopWidth, panelContainerElClasses, checkInView, detectCollision } from "../../../helpers/search/collapsiblesidebarHelper";
import SidebarContent from "./SidebarContent";

const SidebarWrapper = () => {
    const [isOpened, setIsOpened] = useState(true);
    // eslint-disable-next-line no-unused-vars
    const [isMobile, setIsMobile] = useState(window.innerWidth < mediumScreen);
    const [initialPageLoad, setInitialPageLoad] = useState(true);
    const [windowWidth, setWindowWidth] = useState();
    const [sidebarHeight, setSidebarHeight] = useState(); // TODO: need to rename this
    const [sidebarContentHeight, setSidebarContentHeight] = useState();
    const [footerInView, setFooterInView] = useState();
    const [siteHeaderInView, setSiteHeaderInView] = useState();
    const [sidebarIsSticky, setSidebarIsSticky] = useState();
    const [sidebarTop, setSidebarTop] = useState();
    const [mainContentHeight, setMainContentHeight] = useState();

    const footerEl = document.querySelector("footer");
    const siteHeaderEl = document.querySelector(".site-header__wrapper");
    const topStickyBarEl = document.querySelector(".usda-page-header");

    const sidebarStaticEls = 172;
    const footerMargin = 48;
    const minContentHeight = 124;

    // TODO: Remove hard coded values
    const headingPadding = 40;
    const fullHeader = 148;

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
    const resizeSidebar = (withFooter) => {
        const hasFooter = withFooter > 0 ? withFooter : 0;
        const headingInView = sidebarTop + headingPadding;

        const mainContentArea = (window.innerHeight - headingInView) + headingPadding;
        const sidebarContentArea = mainContentArea - sidebarStaticEls;

        if (footerInView < 0) {
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

            setSidebarHeight(mainContentArea - hasFooter);
            setSidebarContentHeight(sidebarContentAreaWFooter);
        }
    };

    // This function resizeInitialSidebar, will resize the sidebar while the full header is visible in the viewport
    const resizeInitialSidebar = (withFooter) => {
        const hasFooter = withFooter > 0 ? withFooter : 0;
        const mainContentArea = (window.innerHeight - fullHeader) - hasFooter;
        const sidebarContentArea = mainContentArea - sidebarStaticEls;
        setSidebarHeight(mainContentArea + window.scrollY);
        setSidebarContentHeight(sidebarContentArea + window.scrollY);
    };

    const handleScroll = throttle(() => {
        if (window.scrollY === 0) {
            setSidebarTop(fullHeader);
        }
        else {
            const topStickyBarBbox = topStickyBarEl.getBoundingClientRect();
            setSidebarTop(checkInView(topStickyBarEl) < 0 ? 0 : topStickyBarBbox.bottom);
        }

        setFooterInView(checkInView(footerEl) + footerMargin);
        setSiteHeaderInView(checkInView(siteHeaderEl));
        setSidebarIsSticky(topStickyBarEl?.classList?.contains("usda-page-header--sticky"));
    }, 50);

    const keyHandler = (e, func) => {
        if (e.key === "Enter") {
            func(e);
        }
    };

    const handleResize = throttle(() => {
        const newWidth = window.innerWidth;
        if (windowWidth !== newWidth) {
            setWindowWidth(newWidth);
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
        if (window.scrollY === 0 && mainContentHeight) {
            document.querySelector("#main-content .v2").style.minHeight = `${window.innerHeight}px`;
        }

        if (window.scrollY === 0 && ((window.innerHeight - fullHeader) >= mainContentHeight)) {
            setSidebarHeight((mainContentHeight));
            setSidebarContentHeight((mainContentHeight - sidebarStaticEls));
        }
        else if (window.scrollY === 0 && (window.innerHeight - fullHeader) < mainContentHeight) {
            const mainContentArea = window.innerHeight - fullHeader;
            const sidebarContentArea = mainContentArea - sidebarStaticEls;

            setSidebarHeight(mainContentArea);
            setSidebarContentHeight(sidebarContentArea);
        }
    }, [mainContentHeight]);

    useEffect(() => {
        const headingInView = sidebarTop + headingPadding;
        document.querySelector(".search-collapsible-sidebar-container").style.top = `${headingInView}px`;

        if (window.scrollY > 0) {
            if (sidebarIsSticky) {
                resizeSidebar(footerInView);
            }
            else if (sidebarTop !== 0) {
                resizeInitialSidebar(footerInView);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [footerInView, siteHeaderInView, sidebarIsSticky, sidebarTop]);

    useEffect(() => {
        // eslint-disable-next-line no-undef
        const resizeObserver = new ResizeObserver((entries) => {
            setMainContentHeight(entries[0].target.clientHeight);
        });
        // const fullHeader = document.querySelector("#main-content");
        // resizeObserver.observe(mainContent);
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
    });

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
                <SidebarContent
                    sidebarContentHeight={sidebarContentHeight}
                    sidebarHeight={sidebarHeight} />
            </div>
        </div>
    );
};

export default SidebarWrapper;
