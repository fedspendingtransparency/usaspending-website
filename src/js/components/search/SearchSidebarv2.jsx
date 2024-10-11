/**
 * SearchSidebar.jsx
 * Created by Emily Gullo 10/14/2016
 **/

import React, { useEffect, useState } from 'react';
// import PropTypes from 'prop-types';
import { SearchFilterCategories } from "dataMapping/search/newSearchFilterCategories";


// these are for the SearchFilter demo
import SearchFilter from "./SearchFilter";
import { SearchSidebarSubmitContainer } from "../../containers/search/SearchSidebarSubmitContainer";

const SearchSidebar = () => {
    console.log(SearchFilterCategories);
    return (
        <div className="search-sidebar">
            <div className="search-sidebar--header">Search by...</div>
            {SearchFilterCategories.map((item) => (
                <SearchFilter
                    iconName={item.iconName}
                    iconColor={item.iconColor}
                    iconBackgroundColor={item.iconBackgroundColor}
                    title={item.title}
                    description={item.description}
                    itemCount={item.itemCount}
                    selectedItems={item.selectedItems} />
            ))}
            <div className="sidebar-bottom-submit v2">
                <SearchSidebarSubmitContainer />
            </div>
        </div>
    );
};

// SearchSidebar.propTypes = propTypes;
// SearchSidebar.defaultProps = defaultProps;

export default SearchSidebar;
