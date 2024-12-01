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
            setDrilldown(selectedCategory[FilterCategoryTree[selectedCategory?.categoryKey]]);
            setCurrentLevel(2);
        }
    };

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

    const checkVisible = (el) => {
        const rect = el.getBoundingClientRect();
        const viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);
        return !(rect.bottom < 0 || rect.top - viewHeight >= 0);
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

    const handleScroll = () => {
        // 581.63 is the height of the footer at 1839 px browser width
        const footer = document.querySelector("footer");
        const footerInView = checkInView(footer) + 48;

        const header1 = document.querySelector(".usda-page-header");
        const bbox = header1.getBoundingClientRect();

        const siteHeader = document.querySelector(".site-header__wrapper");
        const top = checkInView(header1) < 0 ? 0 : bbox.bottom;
        const padding = 40;
        const headingInView = top + padding;

        const element = document.querySelector(".usda-page-header");

        console.log("header in view", top, padding, checkInView(header1), checkInView(siteHeader));

        const header = headingInView;
        const stickyHeader = 148;
        const nonScrollableElements = 172;
        document.querySelector(".search-collapsible-sidebar-container").style.top = `${top + padding}px`;

        if (element?.classList?.contains("usda-page-header--sticky")) {
            if (footerInView < 0) {
                setWindowHeight(window.innerHeight - header + padding);
                setSidebarHeight(window.innerHeight - header - nonScrollableElements + padding);
            }
            else {
                const newSidebarHeight = window.innerHeight - header - nonScrollableElements - footerInView + padding;
                if (newSidebarHeight < 1) {
                    document.querySelector(".collapsible-sidebar--header").style.display = "none";
                } else {
                    document.querySelector(".collapsible-sidebar--header").style.display = "block";
                }
                setWindowHeight(window.innerHeight - header - footerInView + padding);
                setSidebarHeight(newSidebarHeight);
            }
        }
        else {
            // document.querySelector(".search-collapsible-sidebar-container").style.top = `188px`;
            setWindowHeight((window.innerHeight - stickyHeader) + window.scrollY);
            setSidebarHeight(((window.innerHeight - stickyHeader) - nonScrollableElements) + window.scrollY);
        }
    };

    const keyHandler = (e, func) => {
        e.preventDefault();
        if (e.key === "Enter") {
            func(e);
        }
    };

    const handleResize = throttle(() => {
        const newWidth = window.innerWidth;
        if (windowWidth !== newWidth) {
            setWindowWidth(newWidth);
        }
    }, 50);

    useEffect(() => {
        handleScroll();
        window.addEventListener('scroll', (e) => handleScroll(e));
        return () => window.removeEventListener('scroll', handleScroll);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        handleResize();
        window.addEventListener('resize', (e) => handleResize(e));
        return () => window.removeEventListener('resize', handleResize);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="search-collapsible-sidebar-container search-sidebar">
            <div
                style={{ height: windowHeight }}
                className={`search-sidebar collapsible-sidebar ${initialPageLoad ? 'is-initial-loaded' : ''} ${isOpened ? 'opened' : ''}`}>
                <div
                    className="collapsible-sidebar--toggle"
                    onClick={(e) => toggleOpened(e)}
                    onKeyDown={(e) => keyHandler(e, toggleOpened)}
                    role="button"
                    tabIndex="0">
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
                    sidebarHeight={sidebarHeight}
                    setLevel3={setLevel3}
                    goBack={goBack} />

                <div className="sidebar-bottom-submit">
                    <SearchSidebarSubmitContainer />
                </div>
            </div>
        </div>
    );
};

export default CollapsibleSidebar;
