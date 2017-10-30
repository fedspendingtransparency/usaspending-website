/**
 * SearchSidebar.jsx
 * Created by Emily Gullo 10/14/2016
 **/

import React from 'react';
import PropTypes from 'prop-types';

import AwardTypeContainer from 'containers/search/filters/AwardTypeContainer';
import TimePeriodContainer from 'containers/search/filters/TimePeriodContainer';
import AgencyContainer from 'containers/search/filters/AgencyContainer';
import LocationSection from 'components/search/filters/location/LocationSection';
import RecipientSearchContainer from 'containers/search/filters/recipient/RecipientSearchContainer';
import KeywordContainer from 'containers/search/filters/KeywordContainer';
import AwardIDSearchContainer from 'containers/search/filters/awardID/AwardIDSearchContainer';
import AwardAmountSearchContainer from
    'containers/search/filters/awardAmount/AwardAmountSearchContainer';
import CFDASearchContainer from 'containers/search/filters/cfda/CFDASearchContainer';
import NAICSSearchContainer from 'containers/search/filters/naics/NAICSSearchContainer';
import PSCSearchContainer from 'containers/search/filters/psc/PSCSearchContainer';
import PricingTypeContainer from 'containers/search/filters/PricingTypeContainer';
import SetAsideContainer from 'containers/search/filters/SetAsideContainer';
import ExtentCompetedContainer from 'containers/search/filters/ExtentCompetedContainer';

import { Filter as FilterIcon } from 'components/sharedComponents/icons/Icons';
import FilterSidebar from 'components/sharedComponents/filterSidebar/FilterSidebar';
import * as SidebarHelper from 'helpers/sidebarHelper';

const filters = {
    options: [
        'Search',
        'Time Period',
        'Award Type',
        'Agencies',
        'Recipients',
        'Location',
        'Award Amount',
        'Award ID',
        'CFDA Programs',
        'NAICS Code',
        'Product/Service Code (PSC)',
        'Type of Contract Pricing',
        'Type of Set Aside',
        'Extent Competed'
    ],
    components: [
        KeywordContainer,
        TimePeriodContainer,
        AwardTypeContainer,
        AgencyContainer,
        RecipientSearchContainer,
        LocationSection,
        AwardAmountSearchContainer,
        AwardIDSearchContainer,
        CFDASearchContainer,
        NAICSSearchContainer,
        PSCSearchContainer,
        PricingTypeContainer,
        SetAsideContainer,
        ExtentCompetedContainer
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

        return (
            <div className="search-sidebar">
                <div className="sidebar-header">
                    <span className="filter-icon">
                        <FilterIcon />
                    </span>
                    <h6>Filter by:</h6>
                </div>
                <FilterSidebar {...filters} expanded={expanded} />
            </div>
        );
    }
}

SearchSidebar.propTypes = propTypes;
SearchSidebar.defaultProps = defaultProps;
