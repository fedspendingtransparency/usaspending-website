/**
 * SidebarWrapper.jsx
 * Created by Andrea Blackwell 11/05/2024
 **/

import React, { useEffect, useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { throttle } from "lodash-es";
import PropTypes from "prop-types";

import { mediumScreen } from 'dataMapping/shared/mobileBreakpoints';
import {
    sideBarXlDesktopWidth, checkInView
} from "helpers/search/collapsiblesidebarHelper";
import SidebarContent from "./SidebarContent";

const propTypes = {
    setShowMobileFilters: PropTypes.func,
    sidebarOpen: PropTypes.bool,
    height: PropTypes.number
};

// eslint-disable-next-line prefer-arrow-callback
const SidebarWrapper = React.memo(function SidebarWrapper({
    // eslint-disable-next-line no-unused-vars
    setShowMobileFilters, sidebarOpen, height
}) {
    const [isMobile, setIsMobile] = useState(window.innerWidth < mediumScreen);
    const [initialPageLoad, setInitialPageLoad] = useState(true);
    const [windowWidth, setWindowWidth] = useState();
    const [sidebarHeight, setSidebarHeight] = useState();
    const [sidebarContentHeight, setSidebarContentHeight] = useState();
    const [mainContentHeight, setMainContentHeight] = useState();
    const [isOpened, setIsOpened] = useState(sidebarOpen);
    const [isFooterVisible, setIsFooterVisible] = useState();
    const [isDsmOpened, setIsDsmOpened] = useState(false);
    const [headerHeight, setHeaderHeight] = useState();

    const mainContentEl = document.querySelector("#main-content");
    const footerEl = document.querySelector("footer");
    const sidebarStaticEls = isMobile ? 190 : 139;
    const footerMargin = 0;
    const topStickyBarHeight = 60;
    const minContentHeight = 124;
    const additionalRibbonHeight = 68;

    const sidebarContainer = useRef();

    const toggleOpened = (e) => {
        e.preventDefault();
        setIsOpened((prevState) => !prevState);
    };

    const hideElements = (removeableEls) => {
        for (const value of removeableEls) {
            const elClass = value.className;
            if (document.querySelector(`.${elClass}`)?.style) {
                document.querySelector(`.${elClass}`).style.display = "none";
            }
        }
    };

    const showElements = (removeableEls) => {
        for (const value of removeableEls) {
            const elClass = value.className;
            if (document.querySelector(`.${elClass}`)?.style) {
                document.querySelector(`.${elClass}`).style.display = value.display;
            }
        }
    };

    const resizeHeightByFooter = () => {
        const mainContentInView = checkInView(mainContentEl);
        const sidebarContentArea = mainContentInView - sidebarStaticEls;
        const padding = 2;
        const margins = (topStickyBarHeight + footerMargin) - padding;

        if (sidebarContentArea - margins < minContentHeight) {
            // hideElements(panelContainerElClasses);
        }
        else {
            // showElements(panelContainerElClasses);
        }

        setSidebarHeight(mainContentInView - margins);
        setSidebarContentHeight(sidebarContentArea - margins);
    };


    const updatePosition = () => {
        const tmpFooterInView = checkInView(footerEl) + footerMargin;

        if (document.querySelector(".search-collapsible-sidebar-container")) {
            const mainContentInView = checkInView(mainContentEl);
            const sidebarContentArea = mainContentInView - (sidebarStaticEls + additionalRibbonHeight);

            setSidebarContentHeight(sidebarContentArea);

            // document.querySelector(".search-collapsible-sidebar-container").style.height = `100vh - ${topStickyBarHeight}`;
        }

        if (tmpFooterInView > 0) {
            resizeHeightByFooter();
        }
    };

    const handleScroll = throttle(() => {
        const tmpFooterInView = checkInView(footerEl) + footerMargin;
        setIsFooterVisible(tmpFooterInView > 0);

        updatePosition();
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
        // handleScroll();
    }, 30);

    const openSidebar = (width) => {
        const sidebarElSelector = isMobile ? ".mobile-search-sidebar-v2" : ".full-search-sidebar";
        document.querySelector(sidebarElSelector).style.width = "unset";
        document.querySelector(".full-search-sidebar").style.flexBasis = `${width}px`;
        document.querySelector(".search-collapsible-sidebar-container").style.width = `${width}px`;
        document.querySelector(".search-collapsible-sidebar-container").style.transition = 'width 300ms cubic-bezier(0.2, 0, 0, 1)';
    };

    const closeSidebar = () => {
        document.querySelector(".full-search-sidebar").style.width = "0";
        document.querySelector(".full-search-sidebar").style.flexBasis = "0";
        document.querySelector(".mobile-search-sidebar-v2").style.width = "0";
        document.querySelector(".search-collapsible-sidebar-container").style.transition = 'width 300ms cubic-bezier(0.2, 0, 0, 1)';
        document.querySelector(".mobile-search-sidebar-v2").style.flexBasis = "0";
        document.querySelector(".search-collapsible-sidebar-container").style.width = "0";
    };

    const handleScrollEnd = (e) => {
        handleScroll(e);
    };

    useEffect(() => {
        if (isOpened) {
            if (document.querySelector(".full-search-sidebar")) {
                openSidebar(sideBarXlDesktopWidth);
            }
            else if (document.querySelector(".mobile-search-sidebar-v2") && isMobile) {
                openSidebar(sideBarXlDesktopWidth);
            }
        }
        else if (document.querySelector(".full-search-sidebar")) {
            closeSidebar();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isMobile, isOpened, windowWidth]);

    useEffect(() => {
        if (initialPageLoad && sidebarContainer) {
            sidebarContainer.current.display = "block";
            sidebarContainer.current.height = height;
            setInitialPageLoad(false);
        }
    }, [initialPageLoad, sidebarContainer]);

    // useEffect(() => {
    //     if (sidebarHeight > 0 && sidebarContentHeight > 0 && document.querySelector(".search-sidebar").style.display === "none") {
    //         document.querySelector(".search-sidebar").style.display = "flex";
    //     }
    // }, [sidebarHeight, sidebarContentHeight]);

    useEffect(() => {
        handleScroll();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [mainContentHeight]);

    useEffect(() => {
        handleScroll();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [headerHeight]);

    useEffect(() => {
        // eslint-disable-next-line no-undef
        const mainContentResizeObserver = new ResizeObserver((entries) => {
            setMainContentHeight(entries[0].target?.clientHeight);
        });

        // eslint-disable-next-line no-undef
        // const headerResizeObserver = new ResizeObserver((entries) => {
        //     setHeaderHeight(entries[0].target?.clientHeight);
        // });


        const mainContent = document.querySelector("#main-content");
        mainContentResizeObserver.observe(mainContent);

        // const siteHeader = document.querySelector(".site-header");
        // headerResizeObserver.observe(siteHeader);

        handleResize();

        window.addEventListener('resize', () => handleResize());
        window.addEventListener('scroll', () => handleScroll());
        window.addEventListener('scrollend', (e) => handleScrollEnd(e));

        return () => {
            window.removeEventListener('resize', () => handleResize());
            window.removeEventListener('scroll', () => handleScroll());
            window.removeEventListener('scrollend', (e) => handleScrollEnd(e));

            // mainContentResizeObserver?.unobserve(mainContent);
            // headerResizeObserver?.unobserve(siteHeader);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const selectHeight = () => {
        // I need to add the top here
        const isStickyEl = document.querySelector(".usda-page-header--sticky");
        const isHeaderSticky = isStickyEl !== null;
        const bufferToTouchBottom = 6;

        if (isHeaderSticky && !isFooterVisible) {
            return `calc(100vh - ${topStickyBarHeight - bufferToTouchBottom}px)`;
        }

        return sidebarHeight;
    };

    return (
        <>
            <div
                ref={sidebarContainer}
                className="search-collapsible-sidebar-container search-sidebar sticky">
                <div
                    className="collapsible-sidebar--toggle"
                    onClick={(e) => {
                        setIsDsmOpened(false);
                        toggleOpened(e);
                    }}
                    onKeyDown={(e) => {
                        setIsDsmOpened(false);
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
                            setShowMobileFilters={setShowMobileFilters}
                            isDsmOpened={isDsmOpened}
                            setIsDsmOpened={setIsDsmOpened} />
                }
            </div>
        </>
    );
});

SidebarWrapper.propTypes = propTypes;
export default SidebarWrapper;
