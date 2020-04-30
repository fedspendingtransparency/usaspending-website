/**
 * SearchSidebar.jsx
 * Created by Emily Gullo 10/14/2016
 **/

import React from 'react';
import PropTypes from 'prop-types';

import SearchSidebarSubmitContainer from 'containers/search/SearchSidebarSubmitContainer';

import KeywordContainer from 'containers/search/filters/KeywordContainer';
import AwardTypeContainer from 'containers/search/filters/AwardTypeContainer';
import TimePeriodContainer from 'containers/search/filters/TimePeriodContainer';
import AgencyContainer from 'containers/search/filters/AgencyContainer';
import LocationSectionContainer from 'containers/search/filters/location/LocationSectionContainer';
import RecipientSearchContainer from 'containers/search/filters/recipient/RecipientSearchContainer';
import ProgramSourceContainer from 'containers/search/filters/programSource/ProgramSourceContainer';
import RecipientTypeContainer from 'containers/search/filters/recipient/RecipientTypeContainer';
import AwardIDSearchContainer from 'containers/search/filters/awardID/AwardIDSearchContainer';
import AwardAmountSearchContainer from
    'containers/search/filters/awardAmount/AwardAmountSearchContainer';
import CFDASearchContainer from 'containers/search/filters/cfda/CFDASearchContainer';
import NAICSSearchContainer from 'containers/search/filters/naics/NAICSSearchContainer';
import NAICSContainer from 'containers/search/filters/naics/NAICSContainer';
import PSCSearchContainer from 'containers/search/filters/psc/PSCSearchContainer';
import PSCCheckboxTreeContainer from 'containers/search/filters/psc/PSCCheckboxTreeContainer';
import PricingTypeContainer from 'containers/search/filters/PricingTypeContainer';
import SetAsideContainer from 'containers/search/filters/SetAsideContainer';
import ExtentCompetedContainer from 'containers/search/filters/ExtentCompetedContainer';

import KeywordHover from 'components/search/filters/keyword/KeywordHover';

import { Filter as FilterIcon } from 'components/sharedComponents/icons/Icons';
import FilterSidebar from 'components/sharedComponents/filterSidebar/FilterSidebar';
import * as SidebarHelper from 'helpers/sidebarHelper';

import kGlobalConstants from 'GlobalConstants';

const NaicsComponent = kGlobalConstants.DEV ? NAICSContainer : NAICSSearchContainer;
const naicsTitle = kGlobalConstants.DEV ?
    'North American Industry Classification System (NAICS)' :
    'NAICS Code';
const PscComponent = kGlobalConstants.DEV ? PSCCheckboxTreeContainer : PSCSearchContainer;
const tasTitle = kGlobalConstants.DEV ? 'Treasury Account Symbol (TAS)' : 'Program Source (TAS)';

const filters = {
    options: [
        'Keyword',
        'Time Period',
        'Award Type',
        'Agency',
        tasTitle,
        'Location',
        'Recipient',
        'Recipient Type',
        'Award Amount',
        'Award ID',
        'CFDA Program',
        naicsTitle,
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
        ProgramSourceContainer,
        LocationSectionContainer,
        RecipientSearchContainer,
        RecipientTypeContainer,
        AwardAmountSearchContainer,
        AwardIDSearchContainer,
        CFDASearchContainer,
        NaicsComponent,
        PscComponent,
        PricingTypeContainer,
        SetAsideContainer,
        ExtentCompetedContainer
    ],
    accessories: [
        KeywordHover,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null
    ],
    glossaryEntries: [
        null,
        null,
        null,
        null,
        'treasury-account-symbol-tas',
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        'productservice-code-psc',
        null,
        null
    ]
};

const propTypes = {
    mobile: PropTypes.bool,
    filters: PropTypes.object,
    requestsComplete: PropTypes.bool,
    hash: PropTypes.string
};

const defaultProps = {
    mobile: false
};

export default class SearchSidebar extends React.Component {
    render() {
        const expanded = [];
        filters.options.forEach((filter) => {
            // Collapse all by default, unless the filter has a selection made
            if (filter === 'Time Period') {
                // time period is always expanded
                expanded.push(true);
            }
            else {
                expanded.push(SidebarHelper.filterHasSelections(this.props.filters, filter));
            }
        });

        return (
            <div
                className="search-sidebar"
                role="search"
                aria-label="Filters">
                <div className="sidebar-header">
                    <span className="filter-icon">
                        <FilterIcon />
                    </span>
                    <h2 className="sidebar-title">Filters</h2>
                </div>
                <div className="sidebar-top-submit">
                    <SearchSidebarSubmitContainer />
                </div>
                <FilterSidebar
                    {...filters}
                    expanded={expanded}
                    hash={this.props.hash} />
                <div className="sidebar-bottom-submit">
                    <SearchSidebarSubmitContainer />
                </div>
            </div>
        );
    }
}

SearchSidebar.propTypes = propTypes;
SearchSidebar.defaultProps = defaultProps;
