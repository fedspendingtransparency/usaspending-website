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
import {LocationSectionContainer} from "../../containers/search/filters/location/LocationSectionContainer";

const SearchSidebar = () => {
    const [hide, setHide] = useState(false);
    const [drilldown, setDrilldown] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(false);

    const toggleHide = (e) => {
        e.preventDefault();
        setHide((prevState) => !prevState);
    };

    const toggleDrilldown = (e) => {
        e.preventDefault();
        setDrilldown((prevState) => !prevState);
    };

    let component = <p>hello</p>;
    const selectCategory = (e, item) => {
        setSelectedCategory(item);
        setDrilldown(true);
        component = item?.filterComponent;
    };

    console.log(SearchFilterCategories);
    return <>
        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
        <div onClick={(e) => toggleHide(e)}>hide / show</div>
        {/* need to add filter category tree with each category mapping to components */}
        {/* style with round button and docked/closed position */}
        {/* style with back button */}
        {/* add individual filter layout */}

        <div className="search-sidebar" id="slide" style={hide ? { display: 'none' } : null}>
            {drilldown ? <p>hello</p> :
                <>
                    <div className="search-sidebar--header">Search by...</div>
                    {SearchFilterCategories.map((item) => (<SearchFilter
                        item={item}
                        iconName={item.iconName}
                        iconColor={item.iconColor}
                        iconBackgroundColor={item.iconBackgroundColor}
                        title={item.title}
                        description={item.description}
                        itemCount={item.itemCount}
                        selectedItems={item.selectedItems}
                        selectCategory={selectCategory} />))}
                </>
            }
            <div className="sidebar-bottom-submit v2">
                <SearchSidebarSubmitContainer />
            </div>
        </div>
    </>;
};

// SearchSidebar.propTypes = propTypes;
// SearchSidebar.defaultProps = defaultProps;

export default SearchSidebar;
