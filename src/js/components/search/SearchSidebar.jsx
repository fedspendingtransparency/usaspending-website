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
import NAICSCheckboxTree from 'containers/search/filters/naics/NAICSCheckboxTree';
import PSCCheckboxTreeContainer from 'containers/search/filters/psc/PSCCheckboxTreeContainer';
import PricingTypeContainer from 'containers/search/filters/PricingTypeContainer';
import SetAsideContainer from 'containers/search/filters/SetAsideContainer';
import ExtentCompetedContainer from 'containers/search/filters/ExtentCompetedContainer';
import DEFCheckboxTree from 'containers/search/filters/def/DEFCheckboxTree';
import { mediumScreen } from 'dataMapping/shared/mobileBreakpoints';
import {
    TimePeriodTooltip,
    KeyWordTooltip,
    DEFTooltip,
    LocationTooltip
} from 'components/search/filters/tooltips/AdvancedSearchTooltip';

import { Filter as FilterIcon } from 'components/sharedComponents/icons/Icons';
import FilterSidebar from 'components/sharedComponents/filterSidebar/FilterSidebar';
import * as SidebarHelper from 'helpers/sidebarHelper';
import { TooltipWrapper } from 'data-transparency-ui';
import { FilterTooltip } from '../award/shared/InfoTooltipContent';
import KeywordSearchLink from "./KeywordSearchLink";

const staticFilters = {
    // NOTE: if you update the title here
    // update the switch statement in helpers/sidebarHelper filterHasSelections!
    options: [
        {
            title: 'Keyword',
            tooltip: <KeyWordTooltip />
        },
        {
            title: 'Time Period',
            tooltip: <TimePeriodTooltip />
        },
        {
            title: 'Award Type'
        },
        {
            title: 'Agency'
        },
        {
            title: 'Treasury Account Symbol (TAS)'
        },
        {
            title: 'Location',
            tooltip: <LocationTooltip />
        },
        {
            title: 'Recipient'
        },
        {
            title: 'Recipient Type'
        },
        {
            title: 'Award Amount'
        },
        {
            title: 'Award ID'
        },
        {
            title: 'Assistance Listing (CFDA Program)'
        },
        {
            title: 'Disaster Emergency Fund Code (DEFC)',
            tooltip: <DEFTooltip />
        },
        {
            title: 'North American Industry Classification System (NAICS)'
        },
        {
            title: 'Product or Service Code (PSC)'
        },
        {
            title: 'Type of Contract Pricing'
        },
        {
            title: 'Type of Set Aside'
        },
        {
            title: 'Extent Competed'
        }
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
        DEFCheckboxTree,
        NAICSCheckboxTree,
        PSCCheckboxTreeContainer,
        PricingTypeContainer,
        SetAsideContainer,
        ExtentCompetedContainer
    ],
    accessories: [
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
        null,
        null,
        null
    ],
    glossaryEntries: [
        null,
        'action-date',
        null,
        null,
        'treasury-account-symbol-tas',
        null,
        null,
        null,
        null,
        null,
        null, // def-code
        null,
        'naics',
        'product-or-service-code-psc',
        null,
        null
    ]
};

const propTypes = {
    filters: PropTypes.object
};

const defaultProps = {
    mobile: false
};

const SearchSidebar = ({
    filters
}) => {
    const indexOfUnreleased = staticFilters.options.findIndex((option) => (
        Object.keys(option).includes('isReleased') &&
        !option.isReleased
    ));
    const releasedFilters = indexOfUnreleased === -1
        ? staticFilters
        : Object.entries(staticFilters).reduce((acc, [key, arr]) => ({
            ...acc,
            [key]: arr.filter((item, i) => i !== indexOfUnreleased)
        }), {});
    const expanded = [];
    releasedFilters.options.forEach((filter) => {
    // Collapse all by default, unless the filter has a selection made
        if (filter.title === 'Time Period') {
            // time period is always expanded
            expanded.push(true);
        }
        else {
            expanded.push(SidebarHelper.filterHasSelections(filters, filter));
        }
    });
    const tooltipDirection = () => {
        if (window.innerWidth <= mediumScreen) {
            return "bottom";
        }
        return "right";
    };

    return (
        <div
            className="search-sidebar"
            role="search"
            aria-label="Filters">
            <div className="sidebar-header">
                <div className="sidebar-header_title-advanced-search">
                    <span className="filter-icon">
                        <FilterIcon />
                    </span>
                    <h2 className="sidebar-title_advanced-search">Filters</h2>
                </div>
                <div className="sidebar-paragraph__container">
                    <div className="sidebar-paragraph">Learn which data elements are associated with certain search <div style={{ display: 'inline-table' }}>filters<TooltipWrapper icon="info" tooltipPosition={tooltipDirection()} tooltipComponent={FilterTooltip} /></div></div>
                </div>
            </div>

            <div className="sidebar-top-submit">
                <SearchSidebarSubmitContainer />
            </div>
            <FilterSidebar
                {...releasedFilters}
                expanded={expanded} />
            <div className="sidebar-bottom-submit">
                <SearchSidebarSubmitContainer />
                {window.innerWidth <= mediumScreen &&
                <div className="sidebar-bottom__keyword-link-container">
                    <KeywordSearchLink />
                </div>}
            </div>
        </div>
    );
};

SearchSidebar.propTypes = propTypes;
SearchSidebar.defaultProps = defaultProps;

export default SearchSidebar;
