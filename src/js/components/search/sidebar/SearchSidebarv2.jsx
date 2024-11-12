/**
 * SearchSidebarv2.jsx
 * Created by Andrea Blackwell 11/05/2024
 **/

import React, { useEffect, useState } from 'react';
import { SearchFilterCategories, FilterCategoryTree } from "dataMapping/search/newSearchFilterCategories";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import SearchFilter from "../SearchFilter";
import { SearchSidebarSubmitContainer } from "../../../containers/search/SearchSidebarSubmitContainer";
import CategoriesList from "./CateogriesList";
import CategoryFilter from "./CategoryFilter";

const SearchSidebar = () => {
    const [isOpened, setIsOpened] = useState(true);
    const [drilldown, setDrilldown] = useState(null);
    const [isDrilldown, setIsDrilldown] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [currentLevel, setCurrentLevel] = useState(1);
    const [initialPageLoad, setInitialPageLoad] = useState(true);

    const toggleOpened = (e) => {
        e.preventDefault();
        setIsOpened((prevState) => !prevState);
    };

    // const tooltipDirection = () => {
    //     if (window.innerWidth <= mediumScreen) {
    //         return "bottom";
    //     }
    //     return "right";
    // };

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
        console.log(currentLevel);
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

        if (currentLevel === 1) {
            console.log("log an error message");
        }
    };

    const keyHandler = (e, func) => {
        e.preventDefault();
        if (e.key === "Enter") {
            func(e);
        }
    };

    useEffect(() => {
        if (!isOpened && initialPageLoad) {
            setInitialPageLoad(false);
        }
    }, [initialPageLoad, isOpened]);

    return (
        <div className="search-sidebar-slider search-sidebar">
            <div className={`search-sidebar slider-container ${initialPageLoad ? 'initial-load' : ''} ${isOpened ? 'opened' : ''}`}>
                <div
                    className="slider-open-toggle"
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
                <div className={`search-sidebar__drilldown search-filters-wrapper ${isDrilldown ? 'opened' : ''}`}>
                    <div className="search-sidebar--header">
                        <div
                            className="sidebar-back-btn"
                            onClick={(e) => goBack(e)}
                            onKeyDown={(e) => keyHandler(e, goBack)}
                            role="button"
                            tabIndex="0">
                            <FontAwesomeIcon className="chevron" icon="chevron-left" />&nbsp;Back (level {currentLevel})
                        </div>
                        {drilldown?.children && <CategoriesList
                            categories={drilldown.children}
                            setLevel3={setLevel3} />}
                    </div>
                    {drilldown?.component && <CategoryFilter component={drilldown.component} />}
                </div>

                <div className={`search-sidebar__main-menu ${isDrilldown ? '' : 'opened'}`}>
                    <div className="search-sidebar--header">
                        <span>Search by...</span>
                    </div>
                    {SearchFilterCategories.map((item) => (<SearchFilter
                        item={item}
                        iconName={item.iconName}
                        iconColor={item.iconColor}
                        iconBackgroundColor={item.iconBackgroundColor}
                        title={item.title}
                        description={item.description}
                        itemCount={item.itemCount}
                        selectedItems={item.selectedItems}
                        selectCategory={setLevel2} />))}
                </div>
                <div className="sidebar-bottom-submit v2">
                    <SearchSidebarSubmitContainer />
                </div>
            </div>
        </div>);
};

// SearchSidebar.propTypes = propTypes;
// SearchSidebar.defaultProps = defaultProps;

export default SearchSidebar;
