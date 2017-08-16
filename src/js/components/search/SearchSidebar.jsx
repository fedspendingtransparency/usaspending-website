/**
 * SearchSidebar.jsx
 * Created by Emily Gullo 10/14/2016
 **/

import React from 'react';
import PropTypes from 'prop-types';

import AwardTypeContainer from 'containers/search/filters/AwardTypeContainer';
import TimePeriodContainer from 'containers/search/filters/TimePeriodContainer';
import AgencyContainer from 'containers/search/filters/AgencyContainer';
import LocationSearchContainer from 'containers/search/filters/location/LocationSearchContainer';
import BudgetCategorySearchContainer
    from 'containers/search/filters/budgetCategory/BudgetCategorySearchContainer';
import RecipientSearchContainer from 'containers/search/filters/recipient/RecipientSearchContainer';
import KeywordContainer from 'containers/search/filters/KeywordContainer';
import AwardIDSearchContainer from 'containers/search/filters/awardID/AwardIDSearchContainer';
import AwardAmountSearchContainer from
    'containers/search/filters/awardAmount/AwardAmountSearchContainer';
import OtherFilters from 'components/search/filters/otherFilters/OtherFilters';

import { Filter as FilterIcon } from 'components/sharedComponents/icons/Icons';
import FilterSidebar from 'components/sharedComponents/filterSidebar/FilterSidebar';
import MobileFilterHeader from 'components/search/mobile/MobileFilterHeader';
import * as SidebarHelper from 'helpers/sidebarHelper';

const filters = {
    options: [
        'Search',
        'Time Period',
        'Budget Categories',
        'Award Type',
        'Agencies',
        'Recipients',
        'Place of Performance',
        'Award Amount',
        'Award ID',
        'Other Award Items'
    ],
    components: [
        KeywordContainer,
        TimePeriodContainer,
        BudgetCategorySearchContainer,
        AwardTypeContainer,
        AgencyContainer,
        RecipientSearchContainer,
        LocationSearchContainer,
        AwardAmountSearchContainer,
        AwardIDSearchContainer,
        OtherFilters
    ]
};

const propTypes = {
    mobile: PropTypes.bool,
    filters: PropTypes.object
};

const defaultProps = {
    mobile: false
};

export default class SearchSidebar extends React.Component {
    render() {
        const expanded = [];
        filters.options.forEach((filter) => {
            // Collapse all by default, unless the filter has a selection made
            expanded.push(SidebarHelper.filterHasSelections(this.props.filters, filter));
        });

        let mobileHeader = null;
        if (this.props.mobile) {
            mobileHeader = (<MobileFilterHeader {...this.props} />);
        }

        return (
            <div className="search-sidebar">
                <div className="sidebar-header">
                    <span className="filter-icon">
                        <FilterIcon />
                    </span>
                    <h6>Filter by:</h6>
                </div>
                {mobileHeader}
                <FilterSidebar {...filters} expanded={expanded} />
            </div>
        );
    }
}

SearchSidebar.propTypes = propTypes;
SearchSidebar.defaultProps = defaultProps;
