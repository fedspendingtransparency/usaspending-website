/**
 * CollapsibleSidebar.jsx
 * Created by Andrea Blackwell 11/05/2024
 **/

import React, { useEffect, useState } from 'react';
import { FilterCategoryTree } from "dataMapping/search/newSearchFilterCategories";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { throttle } from "lodash";

import { SearchSidebarSubmitContainer } from "../../../containers/search/SearchSidebarSubmitContainer";
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

    const setLevel3 = (e, component) => {
        e.preventDefault();
        setDrilldown(component);
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
                document.querySelector(".full-search-sidebar").style.width = "25%";
            }
            if (document.querySelector(".results-view")) {
                document.querySelector(".results-view").style.width = "75%";
            }
        } else {
            if (document.querySelector(".full-search-sidebar")) {
                document.querySelector(".full-search-sidebar").style.width = "0%";
            }
            if (document.querySelector(".results-view")) {
                console.log("here");
                document.querySelector(".results-view").style.width = "99%";
            }
        }
    }, [isOpened]);

    useEffect(() => {
        if (!isOpened && initialPageLoad) {
            setInitialPageLoad(false);
        }
    }, [initialPageLoad, isOpened]);

    const handleScroll = () => {
        console.log(window.innerHeight);
        console.log("on scroll detected");
        console.log(window.scrollY);
        const element = document.querySelector(".usda-page-header");
        if (element?.classList?.contains("usda-page-header--sticky")) {
            document.querySelector(".search-collapsible-sidebar-container").style.top = "100px";
            setWindowHeight(window.innerHeight - 60);
            setSidebarHeight(window.innerHeight - 60 - 168);
        }
        else {
            document.querySelector(".search-collapsible-sidebar-container").style.top = `${188 - window.scrollY}px`;
            setWindowHeight(window.innerHeight - 148 + window.scrollY);
            setSidebarHeight(window.innerHeight - 148 - 168 + window.scrollY);
        }
    };

    const keyHandler = (e, func) => {
        e.preventDefault();
        if (e.key === "Enter") {
            func(e);
        }
    };

    useEffect(() => {
        handleScroll();
        window.addEventListener('scroll', (e) => handleScroll(e));
        return () => window.removeEventListener('scroll', handleScroll);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        const handleResize = throttle(() => {
            const newWidth = window.innerWidth;
            if (windowWidth !== newWidth) {
                setWindowWidth(newWidth);
            }
        }, 50);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [windowWidth]);

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
                    setLevel3={setLevel3}
                    goBack={goBack} />

                <div className="sidebar-bottom-submit">
                    <SearchSidebarSubmitContainer />
                </div>
            </div>
        </div>);
};

export default CollapsibleSidebar;
