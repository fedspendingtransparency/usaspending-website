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
        selectedAwardIDs,
        awardAmounts,
        awardType,
        naicsCodes,
        pscCodes,
        pricingType,
        setAside,
        extentCompeted,
        selectedRecipients,
        recipientType,
        selectedAwardingAgencies,
        selectedFundingAgencies,
        tasCodes,
        defCodes
    } = filters;

    const sourcesCount = selectedAwardingAgencies.size +
        selectedFundingAgencies.size +
        tasCodes.counts.length +
        defCodes.counts.length;

    // TODO: Add Award Description (?) to count
    const characteristicsCount = selectedAwardIDs.size +
        awardAmounts.size +
        awardType.size +
        naicsCodes.counts.length +
        pscCodes.counts.length +
        pricingType.size +
        setAside.size +
        extentCompeted.size;

    const itemCount = {
        location: selectedLocations.size + selectedRecipientLocations.size,
        timePeriod: timePeriodType === 'dr' ? timePeriod.size : timePeriodFY.size,
        characteristics: characteristicsCount,
        recipients: selectedRecipients.size + recipientType.size,
        sources: sourcesCount
    };

    useEffect(() => {
        console.log(filters);
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
