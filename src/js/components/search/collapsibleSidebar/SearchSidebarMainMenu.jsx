/**
 * SearchSidebarMainMenu.jsx
 * Created by Andrea Blackwell 11/05/2024
 **/

import React from "react";
import PropTypes from 'prop-types';
import * as Icons from 'components/sharedComponents/icons/Icons';
import { SearchFilterCategories } from "dataMapping/search/searchFilterCategories";
import CategoryHeader from "./CategoryHeader";

const propTypes = {
    isDrilldown: PropTypes.bool,
    sidebarContentHeight: PropTypes.number,
    setLevel2: PropTypes.func,
    itemCount: PropTypes.object,
    setShowMobileFilters: PropTypes.func,
    filters: PropTypes.object
};

const SearchSidebarMainMenu = ({
    isDrilldown,
    sidebarContentHeight,
    setLevel2,
    itemCount,
    setShowMobileFilters,
    filters
}) => {
    const selectedItems = {
        location: {
            data: filters.selectedLocations.toArray(),
            removeFilter: () => console.log('here')
        },
        timePeriod: {
            data: [],
            removeFilter: () => console.log('here')
        },
        characteristics: {
            data: [],
            removeFilter: () => console.log('here')
        },
        recipients: {
            data: [],
            removeFilter: () => console.log('here')
        },
        sources: {
            data: [],
            removeFilter: () => console.log('here')
        }
    };

    return (
        <div className={`collapsible-sidebar--main-menu ${isDrilldown ? '' : 'opened'}`}>
            <div className="collapsible-sidebar--header">
                <span>Search by...</span>
                <button
                    className="close-button"
                    id="collapsible-mobile-close-button"
                    aria-label="Close Mobile Filters"
                    title="Close Mobile Filters"
                    onClick={() => {
                        setShowMobileFilters(false);
                    }}>
                    <Icons.Close alt="Close About The Data" />
                </button>
            </div>
            <div className="collapsible-sidebar--search-filters-list" style={{ height: sidebarContentHeight }}>
                {SearchFilterCategories.map((item) => (<CategoryHeader
                    item={item}
                    iconName={item.iconName}
                    iconColor={item.iconColor}
                    iconBackgroundColor={item.iconBackgroundColor}
                    title={item.title}
                    description={item.description}
                    itemCount={itemCount[item.categoryKey]}
                    selectedItems={selectedItems[item.categoryKey]}
                    selectCategory={setLevel2}
                    isClickable
                    showDescription />))}
            </div>
        </div>
    );
};

SearchSidebarMainMenu.propTypes = propTypes;
export default SearchSidebarMainMenu;
