import React, { useEffect } from "react";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { SearchFilterCategories } from "dataMapping/search/searchFilterCategories";
import CategoryHeader from "./CategoryHeader";

const propTypes = {
    isDrilldown: PropTypes.bool,
    sidebarHeight: PropTypes.number,
    setLevel2: PropTypes.func,
    filters: PropTypes.object
};

const SearchSidebarMainMenu = ({
    isDrilldown, sidebarHeight, setLevel2, filters
}) => {
    const { selectedLocations } = filters;

    const itemCount = {
        location: selectedLocations.size,
        timePeriod: 0,
        characteristics: 0,
        recipients: 0,
        sources: 0
    };

    useEffect(() => {
        console.log(filters);
    }, [filters]);

    return (
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
                    itemCount={itemCount[item.categoryKey]}
                    selectedItems={item.selectedItems}
                    selectCategory={setLevel2}
                    isClickable
                    showDescription />))}
            </div>
        </div>
    );
};

SearchSidebarMainMenu.propTypes = propTypes;
export default connect(
    (state) => ({
        filters: state.filters
    })
)(SearchSidebarMainMenu);
