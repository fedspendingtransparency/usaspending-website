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
    const {
        selectedLocations,
        selectedRecipientLocations,
        timePeriodType,
        time_period: timePeriod,
        timePeriodFY,
        selectedRecipients,
        recipientType,
        selectedAwardingAgencies,
        selectedFundingAgencies,
        tasCodes,
        defCodes
    } = filters;

    const tasCounts = tasCodes._map._root.entries.filter(
        (array) => array[0] === 'counts'
    )[0][1].length;
    const defCounts = defCodes._map._root.entries.filter(
        (array) => array[0] === 'counts'
    )[0][1].length;

    const sourcesCount = selectedAwardingAgencies.size +
        selectedFundingAgencies.size +
        tasCounts +
        defCounts;

    const itemCount = {
        location: selectedLocations.size + selectedRecipientLocations.size,
        timePeriod: timePeriodType === 'dr' ? timePeriod.size : timePeriodFY.size,
        characteristics: 0,
        recipients: selectedRecipients.size + recipientType.size,
        sources: sourcesCount
    };

    useEffect(() => {
        console.log(tasCounts);
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
