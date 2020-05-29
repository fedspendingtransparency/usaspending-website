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
import DEFCheckboxTree, { NewBadge } from 'containers/search/filters/def/DEFCheckboxTree';

import {
    KeyWordTooltip,
    withAdvancedSearchTooltip,
    DEFTooltip
} from 'components/search/filters/tooltips/AdvancedSearchTooltip';

import { Filter as FilterIcon } from 'components/sharedComponents/icons/Icons';
import FilterSidebar from 'components/sharedComponents/filterSidebar/FilterSidebar';
import * as SidebarHelper from 'helpers/sidebarHelper';

const filters = {
    options: [
        {
            title: 'Keyword',
            tooltip: withAdvancedSearchTooltip({
                icon: "info",
                tooltipComponent: <KeyWordTooltip />
            })
        },
        {
            title: 'Time Period'
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
            title: 'Location'
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
            title: 'Disaster and Emergency Fund (DEF) Code',
            tooltip: withAdvancedSearchTooltip({
                icon: 'info',
                tooltipComponent: <DEFTooltip />
            }),
            className: 'def-sidebar'
        },
        {
            title: 'CFDA Program'
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
        DEFCheckboxTree,
        CFDASearchContainer,
        NAICSCheckboxTree,
        PSCCheckboxTreeContainer,
        PricingTypeContainer,
        SetAsideContainer,
        ExtentCompetedContainer
    ],
    accessories: [
        withAdvancedSearchTooltip(KeyWordTooltip),
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        NewBadge,
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
        null, // def-code
        null,
        null,
        'product-or-service-code-psc',
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
