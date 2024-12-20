/**
 * SearchSidebarDrilldown.jsx
 * Created by Andrea Blackwell 11/05/2024
 **/

import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import CategoriesList from "./CateogriesList";
import CategoryFilter from "./CategoryFilter";

const propTypes = {
    list: PropTypes.array,
    filter: PropTypes.object,
    isDrilldown: PropTypes.bool,
    sidebarHeight: PropTypes.number,
    selectedCategory: PropTypes.object,
    setLevel3: PropTypes.func,
    goBack: PropTypes.func,
    itemCount: PropTypes.object
};

const SearchSidebarDrilldown = ({
    list, filter, isDrilldown, selectedCategory, setLevel3, goBack, sidebarHeight, itemCount
}) => {
    const keyHandler = (e, func) => {
        e.preventDefault();
        if (e.key === "Enter") {
            func(e);
        }
    };

    return (
        <div className={`collapsible-sidebar--drilldown search-filters-wrapper ${isDrilldown ? 'opened' : ''}`}>
            <div className="collapsible-sidebar--header">
                <div
                    className="collapsible-sidebar--back-btn"
                    onClick={(e) => goBack(e)}
                    onKeyDown={(e) => keyHandler(e, goBack)}
                    role="button"
                    tabIndex="0">
                    <FontAwesomeIcon className="chevron" icon="chevron-left" />Back
                </div>
            </div>
            <div className="collapsible-sidebar--content">
                {list && <CategoriesList
                    height={sidebarHeight}
                    iconName={selectedCategory.iconName}
                    iconColor={selectedCategory.iconColor}
                    iconBackgroundColor={selectedCategory.iconBackgroundColor}
                    title={selectedCategory.title}
                    description={selectedCategory.description}
                    categories={list}
                    setLevel3={setLevel3}
                    itemCount={itemCount[selectedCategory.categoryKey]} />}

                {filter && <CategoryFilter
                    height={sidebarHeight}
                    iconName={selectedCategory.iconName}
                    iconColor={selectedCategory.iconColor}
                    iconBackgroundColor={selectedCategory.iconBackgroundColor}
                    title={selectedCategory.title}
                    description={selectedCategory.description}
                    component={filter} />}
            </div>
        </div>);
};

SearchSidebarDrilldown.propTypes = propTypes;
export default SearchSidebarDrilldown;
