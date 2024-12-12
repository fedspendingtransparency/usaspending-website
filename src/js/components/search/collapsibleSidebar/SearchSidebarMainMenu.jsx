import React from "react";
import PropTypes from 'prop-types';
import { SearchFilterCategories } from "dataMapping/search/searchFilterCategories";
import CategoryHeader from "./CategoryHeader";

const propTypes = {
    isDrilldown: PropTypes.bool,
    sidebarHeight: PropTypes.number,
    setLevel2: PropTypes.func
};

const SearchSidebarMainMenu = ({ isDrilldown, sidebarHeight, setLevel2 }) => (
    <div className={`collapsible-sidebar--main-menu ${isDrilldown ? '' : 'opened'}`}>
        <div className="collapsible-sidebar--header">
            <span>Search by...</span>
        </div>
        <div className="collapsible-sidebar--search-filters-list" style={{ height: sidebarHeight }}>
            {SearchFilterCategories.map((item) => (<CategoryHeader
                item={item}
                iconName={item.iconName}
                iconColor={item.iconColor}
                iconBackgroundColor={item.iconBackgroundColor}
                title={item.title}
                description={item.description}
                itemCount={item.itemCount}
                selectedItems={item.selectedItems}
                selectCategory={setLevel2}
                isClickable
                showDescription />))}
        </div>
    </div>
);

SearchSidebarMainMenu.propTypes = propTypes;
export default SearchSidebarMainMenu;
