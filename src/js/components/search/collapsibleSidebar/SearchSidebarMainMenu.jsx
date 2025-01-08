/**
 * SearchSidebarMainMenu.jsx
 * Created by Andrea Blackwell 11/05/2024
 **/

import React from "react";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as Icons from 'components/sharedComponents/icons/Icons';
import { SearchFilterCategories } from "dataMapping/search/searchFilterCategories";
import CategoryHeader from "./CategoryHeader";


const propTypes = {
    isDrilldown: PropTypes.bool,
    sidebarHeight: PropTypes.number,
    setLevel2: PropTypes.func,
    itemCount: PropTypes.object,
    setIsOpened: PropTypes.func
};

const SearchSidebarMainMenu = ({
    isDrilldown, sidebarHeight, setLevel2, itemCount, setIsOpened
}) => (
    <div className={`collapsible-sidebar--main-menu ${isDrilldown ? '' : 'opened'}`}>
        <div className="collapsible-sidebar--header">
            <span>Search by...</span>
            <button
                className="close-button"
                id="collapsible-mobile-close-button"
                aria-label="Close Mobile Filters"
                title="Close Mobile Filters"
                onClick={() => {
                    setIsOpened(false);
                }}>
                <Icons.Close alt="Close About The Data" />
            </button>
        </div>
        <div className="collapsible-sidebar--search-filters-list" style={{ height: sidebarHeight }}>
            {SearchFilterCategories.map((item) => (<CategoryHeader
                item={item}
                iconName={item.iconName}
                iconColor={item.iconColor}
                iconBackgroundColor={item.iconBackgroundColor}
                title={item.title}
                description={item.description}
                itemCount={itemCount[item.categoryKey]}
                selectedItems={item.selectedItems}
                selectCategory={setLevel2}
                isClickable
                showDescription />))}
        </div>
    </div>
);

SearchSidebarMainMenu.propTypes = propTypes;
export default connect(
    (state) => ({
        filters: state.filters
    })
)(SearchSidebarMainMenu);
