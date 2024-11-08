/**
 * SearchSidebarv2.jsx
 * Created by Andrea Blackwell 11/05/2024
 **/

import React, { useEffect, useState } from 'react';
// import PropTypes from 'prop-types';
import { SearchFilterCategories, FilterCategoryTree } from "dataMapping/search/newSearchFilterCategories";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as SidebarHelper from 'helpers/sidebarHelper';


// these are for the SearchFilter demo
import SearchFilter from "../SearchFilter";
import { SearchSidebarSubmitContainer } from "../../../containers/search/SearchSidebarSubmitContainer";
import { TimePeriodContainer } from "../../../containers/search/filters/TimePeriodContainer";

const SearchSidebar = (props) => {
    const [isOpened, setIsOpened] = useState(true);
    const [drilldown, setDrilldown] = useState(null);
    const [isDrilldown, setIsDrilldown] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [currentLevel, setCurrentLevel] = useState(1);

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

    return (<div className="search-sidebar-slider search-sidebar">
        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
        {/* format second level and third level panels */}
        {/* add transition to drilldown / opening new panels */}
        {/* style with back button */}
        {/* reposition and finish styling the round button and docked/closed position */}
        {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions,jsx-a11y/click-events-have-key-events */}
        <div className="slider-open-toggle" onClick={(e) => toggleOpened(e)}>
            <FontAwesomeIcon className="chevron-left" icon="chevron-left" />
        </div>
        <div className={`search-sidebar slider-container ${isOpened ? 'opened' : ''}`}>
            <div className={`search-sidebar__drilldown search-filters-wrapper ${isDrilldown ? 'opened' : ''}`}>
                <p>drilldown level - {currentLevel}</p>
                {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
                <div onClick={(e) => goBack(e)}>Back</div>
                {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
                <CategoriesList
                    categories={drilldown.children}>
                    setLevel3={setLevel3}
                </CategoriesList>
                <CategoryFilter />
                { drilldown?.component }
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
