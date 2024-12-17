import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import CategoriesList from "./CateogriesList";
import CategoryFilter from "./CategoryFilter";

const propTypes = {
    list: PropTypes.array,
    filter: PropTypes.object,
    isDrilldown: PropTypes.bool,
    windowHeight: PropTypes.number,
    selectedCategory: PropTypes.object,
    setLevel3: PropTypes.func,
    selectedCategoryTitle: PropTypes.string
};

const SearchSidebarDrilldown = ({
    list, filter, isDrilldown, selectedCategory, setLevel3, goBack, sidebarHeight, selectedCategoryTitle
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
                    setLevel3={setLevel3} />}

                {filter && <CategoryFilter
                    height={sidebarHeight}
                    iconName={selectedCategory.iconName}
                    iconColor={selectedCategory.iconColor}
                    iconBackgroundColor={selectedCategory.iconBackgroundColor}
                    title={selectedCategoryTitle}
                    description={selectedCategory.description}
                    component={filter} />}
            </div>
        </div>);
};

SearchSidebarDrilldown.propTypes = propTypes;
export default SearchSidebarDrilldown;
