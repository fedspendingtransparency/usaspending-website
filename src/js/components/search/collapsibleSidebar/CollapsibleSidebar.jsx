/**
 * CollapsibleSidebar.jsx
 * Created by Andrea Blackwell 11/05/2024
 **/

import React, { useEffect, useState } from 'react';
import { FilterCategoryTree } from "dataMapping/search/searchFilterCategories";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { throttle } from "lodash";

import SearchSidebarSubmitContainer from "../../../containers/search/SearchSidebarSubmitContainer";
import SearchSidebarDrilldown from "./SearchSidebarDrilldown";
import SearchSidebarMainMenu from "./SearchSidebarMainMenu";

const CollapsibleSidebar = () => {
    const [isOpened, setIsOpened] = useState(true);
    const [drilldown, setDrilldown] = useState(null);
    const [isDrilldown, setIsDrilldown] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [currentLevel, setCurrentLevel] = useState(1);
    const [initialPageLoad, setInitialPageLoad] = useState(true);
    const [windowWidth, setWindowWidth] = useState();
    const [windowHeight, setWindowHeight] = useState();
    const [sidebarHeight, setSidebarHeight] = useState();
    const [footerInView, setFooterInView] = useState();
    const [siteHeaderInView, setSiteHeaderInView] = useState();
    const [sidebarIsSticky, setSidebarIsSticky] = useState();
    const [top, setTop] = useState();
    const [mainContentHeight, setMainContentHeight] = useState();

    const footerEl = document.querySelector("footer");
    const siteHeaderEl = document.querySelector(".site-header__wrapper");
    const topStickyBarEl = document.querySelector(".usda-page-header");
    const headingPadding = 40;
    const inPanelNonScrollableEls = 172;
    const fullHeader = 148;


    const toggleOpened = (e) => {
        e.preventDefault();
        setIsOpened((prevState) => !prevState);
    };

    const setLevel2 = (e, item) => {
        e.preventDefault();
        setSelectedCategory(item);
        setDrilldown(FilterCategoryTree[item?.categoryKey]);
        setIsDrilldown(true);
        setCurrentLevel(2);
    };

    const setLevel3 = (e, item) => {
        e.preventDefault();
        setDrilldown(item);
        setIsDrilldown(true);
        setCurrentLevel(3);
    };

    const goBack = (e) => {
        if (currentLevel === 2) {
            e.preventDefault();
            setDrilldown(null);
            setCurrentLevel(1);
            setIsDrilldown(false);
        }
        else if (currentLevel === 3) {
            setDrilldown(FilterCategoryTree[selectedCategory?.categoryKey]);
            setCurrentLevel(2);
        }
    };

    const checkInView = (el) => {
        const bbox = el.getBoundingClientRect();

        const intersection = {
            top: Math.max(0, bbox.top),
            left: Math.max(0, bbox.left),
            bottom: Math.min(window.innerHeight, bbox.bottom),
            right: Math.min(window.innerWidth, bbox.right)
        };

        return (intersection.bottom - intersection.top);
    };


    const resizeSidebarWithStickyBar = (withFooter) => {
        const hasFooter = withFooter > 0 ? withFooter : 0;
        const headingInView = top + headingPadding;

        if (footerInView < 0) {
            setWindowHeight((window.innerHeight - headingInView) + headingPadding);
            setSidebarHeight(((window.innerHeight - headingInView) - inPanelNonScrollableEls) + headingPadding);
        }
        else {
            // Hide side search by... if only a small part of the sidebar is in view
            const newSidebarHeight = (((window.innerHeight - headingInView - hasFooter) - inPanelNonScrollableEls) - footerInView) + headingPadding;
            // if (newSidebarHeight < 1) {
            //     document.querySelector(".collapsible-sidebar--header").style.display = "none";
            // }
            // else {
            //     document.querySelector(".collapsible-sidebar--header").style.display = "block";
            // }

            setWindowHeight(((window.innerHeight - headingInView) - hasFooter) + headingPadding);
            setSidebarHeight(newSidebarHeight);
        }
    };

    const resizeSidebarWithFullHeader = (withFooter) => {
        console.log(withFooter);
        const hasFooter = withFooter > 0 ? withFooter : 0;
        setWindowHeight((window.innerHeight - fullHeader - hasFooter) + window.scrollY);
        setSidebarHeight(((window.innerHeight - fullHeader - hasFooter) - inPanelNonScrollableEls) + window.scrollY);
    };

    const handleScroll = throttle(() => {
        if (window.scrollY === 0) {
            setTop(148);
        }
        else {
            const topStickyBarBbox = topStickyBarEl.getBoundingClientRect();
            setTop(checkInView(topStickyBarEl) < 0 ? 0 : topStickyBarBbox.bottom);
        }

        setFooterInView(checkInView(footerEl) + 48);
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
    }, 50);

    useEffect(() => {
        if (isOpened) {
            if (document.querySelector(".full-search-sidebar")) {
                if (windowWidth < 991 && windowWidth < 1200) {
                    document.querySelector(".full-search-sidebar").style.width = "unset";
                    document.querySelector(".full-search-sidebar").style.flexBasis = "282px";
                    document.querySelector(".collapsible-sidebar").style.width = "282px";
                }
                else if (windowWidth > 1199) {
                    document.querySelector(".full-search-sidebar").style.width = "unset";
                    document.querySelector(".full-search-sidebar").style.flexBasis = "332px";
                    document.querySelector(".collapsible-sidebar").style.width = "332px";
                }
            }
        }
        else if (document.querySelector(".full-search-sidebar")) {
            document.querySelector(".full-search-sidebar").style.width = "0";
            document.querySelector(".full-search-sidebar").style.flexBasis = "0";
            document.querySelector(".collapsible-sidebar").style.width = "0";
        }
    }, [isOpened, windowWidth]);

    useEffect(() => {
        if (!isOpened && initialPageLoad) {
            setInitialPageLoad(false);
        }
    }, [initialPageLoad, isOpened]);

    useEffect(() => {
        if (windowHeight > 0 && sidebarHeight > 0 && document.querySelector(".search-sidebar").style.display === "none") {
            document.querySelector(".search-sidebar").style.display = "flex";
        }
    }, [windowHeight, sidebarHeight]);

    useEffect(() => {
        // console.log("use effect 1");
        // console.log("footer In view", footerInView);
        // console.log("siteHeaderInView", siteHeaderInView);
        // console.log("sidebarIsSticky", sidebarIsSticky);
        // console.log("top", top);

        const headingInView = top + headingPadding;
        document.querySelector(".search-collapsible-sidebar-container").style.top = `${headingInView}px`;

        console.log(window.innerHeight);
        console.log(mainContentHeight);

        if (document.querySelector(".search-sidebar").style.display === "none") {
            if (window.scrollY === 0 && ((window.innerHeight - fullHeader) >= mainContentHeight)) {
                setWindowHeight((mainContentHeight));
                setSidebarHeight((mainContentHeight - inPanelNonScrollableEls));
            }
            else if (window.scrollY === 0 && (window.innerHeight - fullHeader) < mainContentHeight) {
                resizeSidebarWithFullHeader(footerInView);
                // document.querySelector(".search-sidebar").style.display = "flex";
            }
        }
        else if (sidebarIsSticky) {
            resizeSidebarWithStickyBar(footerInView);
        }
        else if (top !== 0) {
            resizeSidebarWithFullHeader(footerInView);
        }


        // if (footerInView && siteHeaderInView) {
        //
        // } else if (siteHeaderInView && pageHeaderInView && sidebarIsSticky) {
        //
        // }
        // else if (footerInView && sidebarIsSticky) {
        //
        // }
        // else if (siteHeaderInView) {
        //
        // }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [footerInView, siteHeaderInView, sidebarIsSticky, top, mainContentHeight]);

    useEffect(() => {
        // create an Observer instance
        // eslint-disable-next-line no-undef
        const resizeObserver = new ResizeObserver((entries) => {
            setMainContentHeight(entries[0].target.clientHeight);
        });
        const mainContent = document.querySelector("#main-content");

        // start observing a DOM node
        resizeObserver.observe(mainContent);
        handleResize();

        window.addEventListener('resize', (e) => handleResize(e));
        window.addEventListener('scroll', (e) => handleScroll(e));
        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('scroll', handleScroll);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    });

    return (
        <div className="search-collapsible-sidebar-container search-sidebar" style={{ display: "none" }}>
            <div
                style={{ height: windowHeight }}
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
                <SearchSidebarMainMenu
                    isDrilldown={isDrilldown}
                    sidebarHeight={sidebarHeight}
                    setLevel2={setLevel2} />

                <SearchSidebarDrilldown
                    list={drilldown?.children}
                    filter={drilldown?.component}
                    isDrilldown={isDrilldown}
                    windowHeight={windowHeight}
                    selectedCategory={selectedCategory}
                    selectedCategoryTitle={drilldown?.title}
                    sidebarHeight={sidebarHeight}
                    setLevel3={setLevel3}
                    goBack={goBack}
                    titleOnly={drilldown?.titleOnly} />

                <div className="sidebar-bottom-submit">
                    <SearchSidebarSubmitContainer />
                </div>
            </div>
        </div>
    );
};

export default CollapsibleSidebar;
