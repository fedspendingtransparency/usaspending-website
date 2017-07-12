/**
 * SearchSidebar.jsx
 * Created by Emily Gullo 10/14/2016
 **/

import React from 'react';

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
import CFDASearchContainer from 'containers/search/filters/cfda/CFDASearchContainer';

import { Filter as FilterIcon } from 'components/sharedComponents/icons/Icons';
import FilterSidebar from 'components/sharedComponents/filterSidebar/FilterSidebar';
import MobileFilterHeader from 'components/search/mobile/MobileFilterHeader';

const filters = {
    options: [
        'Search',
        'Time Period',
        'Place of Performance',
        'Budget Categories',
        'Agencies',
        'Recipients',
        'Award Type',
        'Award ID',
        'Award Amount',
        'Other Award Items'
    ],
    components: [
        KeywordContainer,
        TimePeriodContainer,
        LocationSearchContainer,
        BudgetCategorySearchContainer,
        AgencyContainer,
        RecipientSearchContainer,
        AwardTypeContainer,
        AwardIDSearchContainer,
        AwardAmountSearchContainer,
        CFDASearchContainer
    ]
};

const propTypes = {
    mobile: React.PropTypes.bool
};

const defaultProps = {
    mobile: false
};

export default class SearchSidebar extends React.Component {
    render() {
        const expanded = [];
        filters.options.forEach(() => {
            // collapse if mobile, otherwise expand
            if (this.props.mobile) {
                expanded.push(false);
            }
            else {
                expanded.push(true);
            }
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
