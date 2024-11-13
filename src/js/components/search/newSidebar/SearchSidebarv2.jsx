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
        <div className="search-collapsible-sidebar-container search-sidebar">
            <div className={`search-sidebar collapsible-sidebar ${initialPageLoad ? 'is-initial-loaded' : ''} ${isOpened ? 'opened' : ''}`}>
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
                <div className={`collapsible-sidebar--drilldown search-filters-wrapper ${isDrilldown ? 'opened' : ''}`}>
                    <div className="collapsible-sidebar--header">
                        <div
                            className="collapsible-sidebar--back-btn"
                            onClick={(e) => goBack(e)}
                            onKeyDown={(e) => keyHandler(e, goBack)}
                            role="button"
                            tabIndex="0">
                            <FontAwesomeIcon className="chevron" icon="chevron-left" />&nbsp;Back
                        </div>
                    </div>
                    {drilldown?.children && <CategoriesList
                        iconName={selectedCategory.iconName}
                        iconColor={selectedCategory.iconColor}
                        iconBackgroundColor={selectedCategory.iconBackgroundColor}
                        title={selectedCategory.title}
                        description={selectedCategory.description}
                        categories={drilldown.children}
                        setLevel3={setLevel3} />}

                    {drilldown?.component && <CategoryFilter
                        iconName={selectedCategory.iconName}
                        iconColor={selectedCategory.iconColor}
                        iconBackgroundColor={selectedCategory.iconBackgroundColor}
                        title={selectedCategory.title}
                        description={selectedCategory.description}
                        component={drilldown.component} />}
                </div>

                <div className={`collapsible-sidebar--main-menu ${isDrilldown ? '' : 'opened'}`}>
                    <div className="collapsible-sidebar--header">
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
                <div className="sidebar-bottom-submit">
                    <SearchSidebarSubmitContainer />
                </div>
            </div>
        </div>);
};

export default SearchSidebar;
