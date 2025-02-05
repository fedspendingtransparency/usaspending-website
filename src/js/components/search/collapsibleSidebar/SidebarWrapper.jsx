/**
 * SidebarWrapper.jsx
 * Created by Andrea Blackwell 11/05/2024
 **/

import React, { useEffect, useState, useCallback } from 'react';
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

const SidebarWrapper = React.memo(({
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
    const [observerSupported, setObserverSupported] = useState(false);

    const mainContentEl = document.querySelector("#main-content");
    const footerEl = document.querySelector("footer");
    const sidebarStaticEls = 172;
    const footerMargin = 46;
    const topStickyBarHeight = 60;
    const minContentHeight = 124;

    const observerOptions = {
        threshold: 0.1
    };
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
        const mainContentInView = checkInView(mainContentEl);
        const sidebarContentArea = mainContentInView - sidebarStaticEls;
        const margins = topStickyBarHeight + footerMargin;

        if (sidebarContentArea - margins < minContentHeight) {
            hideElements(panelContainerElClasses);
        }
        else {
            showElements(panelContainerElClasses);
        }

        setSidebarHeight(mainContentInView - margins);
        setSidebarContentHeight(sidebarContentArea - margins);
    };

    const resizeHeightByHeader = () => {
        const mainContentInView = checkInView(mainContentEl);

        const sidebarContentArea = mainContentInView - sidebarStaticEls;

        setSidebarHeight(mainContentInView);
        setSidebarContentHeight(sidebarContentArea);
    };

    const updatePosition = () => {
        const tmpFooterInView = checkInView(footerEl) + footerMargin;

        if (!sidebarIsSticky && isHeaderVisible) {
            resizeHeightByHeader();
        }
        else if (sidebarIsSticky) {
            document.querySelector(".search-collapsible-sidebar-container").style.height = '100vh - 60';
        }

        if (isFooterVisible || tmpFooterInView > 0) {
            resizeHeightByFooter();
        }
    };

    const handleScroll = throttle(() => {
        const tmpFooterInView = checkInView(footerEl) + footerMargin;
        setIsFooterVisible(tmpFooterInView > 0);
        const isStickyEl = document.querySelector(".usda-page-header--sticky");
        const tmpIsSticky = isStickyEl !== null;
        setSidebarIsSticky(tmpIsSticky);

        if (!tmpIsSticky || tmpFooterInView > 45) {
            updatePosition();
        }
    }, 20);

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
        document.querySelector(".collapsible-sidebar").style.transition = 'width 300ms cubic-bezier(0.2, 0, 0, 1)';
        document.querySelector(".sidebar-bottom-submit").style.display = "block";
        if (document.querySelector(".collapsible-sidebar--dsm-slider")) {
            document.querySelector(".collapsible-sidebar--dsm-slider").style.display = "flex";
        }
    };

    const closeSidebar = () => {
        document.querySelector(".full-search-sidebar").style.width = "0";
        document.querySelector(".full-search-sidebar").style.flexBasis = "0";
        document.querySelector(".mobile-search-sidebar-v2").style.width = "0";
        document.querySelector(".collapsible-sidebar").style.transition = 'width 300ms cubic-bezier(0.2, 0, 0, 1)';
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isMobile, isOpened, windowWidth]);

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
        if (window.scrollY === 0) {
            document.querySelector("#main-content .v2").style.minHeight = `${window.innerHeight}px`;
        }

        updatePosition();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isFooterVisible, isHeaderVisible, sidebarIsSticky, mainContentHeight]);

    const handleObserver = useCallback((entries) => {
        entries.forEach((entry) => {
            if (entry.target?.localName?.includes("footer")) {
                setIsFooterVisible(true);
            }

            if (entry.target?.className?.includes("usda-page-header") && !entry.target?.className?.includes("usda-page-header--sticky")) {
                setIsHeaderVisible(true);
                setSidebarIsSticky(false);
            }

            if (entry.target?.className?.includes("usda-page-header--sticky")) {
                setSidebarIsSticky(true);
                setIsHeaderVisible(false);
            }
        });
    });

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
        window.addEventListener('scrollend', (e) => handleScroll(e));

        return () => {
            window.removeEventListener('resize', (e) => handleResize(e));
            window.removeEventListener('scroll', (e) => handleScroll(e));
            window.removeEventListener('scrollend', (e) => handleScroll(e));

            resizeObserver.unobserve(mainContent);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    });

    useEffect(() => {
        setObserverSupported('IntersectionObserver' in window);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // eslint-disable-next-line consistent-return
    useEffect(() => {
        if (observerSupported) {
            const targets = [document.querySelector(".usda-page-header")];
            targets.push(document.querySelector(".usda-page-header"));

            // eslint-disable-next-line no-undef
            const observer = new IntersectionObserver(handleObserver, observerOptions);
            targets.forEach((i) => {
                if (i.className) {
                    observer.observe(i);
                }
            });

            return () => observer.disconnect();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [observerSupported]);

    const calculateHeight = () => {
        const isStickyEl = document.querySelector(".usda-page-header--sticky");
        const tmpIsSticky = isStickyEl !== null;

        if (tmpIsSticky && !isFooterVisible) {
            return 'calc(100vh - 60px)';
        }

        return sidebarHeight;
    };

    return (
        <div
            className={`search-collapsible-sidebar-container search-sidebar ${sidebarIsSticky ? "sticky" : ""}`}
            style={isMobile ? {} : { display: "none" }}>
            <div
                style={{ height: calculateHeight(), overscrollBehavior: "none" }}
                className={`search-sidebar collapsible-sidebar ${initialPageLoad ? "is-initial-loaded" : ""} ${isOpened ? 'opened' : ''}`}>
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
});

SidebarWrapper.propTypes = propTypes;

export default SidebarWrapper;
