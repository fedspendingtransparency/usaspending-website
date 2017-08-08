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
import RecipientSearchContainer from 'containers/search/filters/recipient/RecipientSearchContainer';
import KeywordContainer from 'containers/search/filters/KeywordContainer';
import AwardIDSearchContainer from 'containers/search/filters/awardID/AwardIDSearchContainer';
import AwardAmountSearchContainer from
    'containers/search/filters/awardAmount/AwardAmountSearchContainer';
import OtherFilters from 'components/search/filters/otherFilters/OtherFilters';

import { Filter as FilterIcon } from 'components/sharedComponents/icons/Icons';
import FilterSidebar from 'components/sharedComponents/filterSidebar/FilterSidebar';
import MobileFilterHeader from 'components/search/mobile/MobileFilterHeader';

const filters = {
    options: [
        'Search',
        'Time Period',
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
    constructor(props) {
        super(props);

        this.filterHasSelections.bind(this);
    }

    filterHasSelections(filter) {
        switch (filter) {
            case 'Search':
                if (this.props.filters.keyword !== '') {
                    return true;
                }
                return false;
            case 'Time Period':
                if (this.props.filters.timePeriodFY.toArray().length > 0
                    || (this.props.filters.timePeriodRange
                        && this.props.filters.timePeriodRange.toArray().length === 2)) {
                    return true;
                }
                return false;
            case 'Award Type':
                if (this.props.filters.awardType.toArray().length > 0) {
                    return true;
                }
                return false;
            case 'Agencies':
                if (this.props.filters.selectedFundingAgencies.toArray().length > 0
                    || this.props.filters.selectedAwardingAgencies.toArray().length > 0) {
                    return true;
                }
                return false;
            case 'Recipients':
                if (this.props.filters.selectedRecipients.toArray().length > 0
                    || (this.props.filters.recipientDomesticForeign !== ''
                        && this.props.filters.recipientDomesticForeign !== 'all')
                    || this.props.filters.selectedRecipientLocations.toArray().length > 0
                    || this.props.filters.recipientType.toArray().length > 0) {
                    return true;
                }
                return false;
            case 'Place of Performance':
                if (this.props.filters.selectedLocations.toArray().length > 0
                    || (this.props.filters.locationDomesticForeign !== ''
                    && this.props.filters.locationDomesticForeign !== 'all')) {
                    return true;
                }
                return false;
            case 'Award Amount':
                if (this.props.filters.awardAmounts.toArray().length > 0) {
                    return true;
                }
                return false;
            case 'Award ID':
                if (this.props.filters.selectedAwardIDs.toArray().length > 0) {
                    return true;
                }
                return false;
                // Todo - Mike Bray - Add remaining Other Award Items and convert to individual
                // statements when available
            case 'Other Award Items':
                if (this.props.filters.selectedCFDA.toArray().length > 0
                    || this.props.filters.selectedNAICS.toArray().length > 0
                    || this.props.filters.selectedPSC.toArray().length > 0) {
                    return true;
                }
                return false;
            default:
                return false;
        }
    }

    render() {
        const expanded = [];
        filters.options.forEach((filter) => {
            // Collapse all by default, unless the filter has a selection made
            expanded.push(this.filterHasSelections(filter));
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
