/**
 * SearchFilterCategories.jsx
 * Created by Andrea Blackwell November 4, 2024
 */

import React from 'react';

import AwardTypeV2 from "components/search/filters/awardType/AwardTypeV2";
import LocationSection from "../../components/search/filters/location/LocationSection";
import TimePeriodContainer from "../../containers/search/filters/TimePeriodContainer";
import AwardIDSearchContainer from "../../containers/search/filters/awardID/AwardIDSearchContainer";
import AgencyContainer from "../../containers/search/filters/AgencyContainer";
import TASCheckboxTreeContainer from
    "../../containers/search/filters/programSource/TASCheckboxTreeContainer";
import RecipientSearchContainer from
    "../../containers/search/filters/recipient/RecipientSearchContainer";
import RecipientTypeContainer from
    "../../containers/search/filters/recipient/RecipientTypeContainer";
import AwardAmountSearchContainer from
    "../../containers/search/filters/awardAmount/AwardAmountSearchContainer";
import NAICSCheckboxTree from "../../containers/search/filters/naics/NAICSCheckboxTree";
import PSCCheckboxTreeContainer from "../../containers/search/filters/psc/PSCCheckboxTreeContainer";
import PricingTypeContainer from "../../containers/search/filters/PricingTypeContainer";
import SetAsideContainer from "../../containers/search/filters/SetAsideContainer";
import ExtentCompetedContainer from "../../containers/search/filters/ExtentCompetedContainer";
import CFDASearchContainer from "../../containers/search/filters/cfda/CFDASearchContainer";
import DEFCheckboxTreeContainer from "../../containers/search/filters/def/DEFCheckboxTreeContainer";
import AwardDescriptionFilterContainer from
    "../../containers/search/filters/AwardDescriptionFilterContainer";

export const SearchFilterCategories = [
    {
        categoryKey: 'timePeriod',
        iconName: 'calendar-alt',
        iconColor: '#1A4480',
        iconBackgroundColor: '#edf5ff',
        title: 'Time Period',
        description: 'Find awards by specific date or date range',
        slug: 'time-period-category',
        titleCapital: 'TIME PERIOD'
    },
    {
        categoryKey: 'location',
        iconName: 'map-marked-alt',
        iconColor: '#34a37e',
        iconBackgroundColor: '#dbf6ed',
        title: 'Location',
        description: 'Find awards by recipient location or where work is being done',
        slug: 'location-category',
        titleCapital: 'LOCATION'
    },
    {
        categoryKey: 'sources',
        iconName: 'university',
        iconColor: '#009ec1',
        iconBackgroundColor: '#e5faff',
        title: 'Sources',
        description: 'Find awards by the source of funding (agency, Treasury Account Symbol, or Disaster Emergency Fund Code)',
        slug: 'sources-category',
        titleCapital: 'SOURCES'
    },
    {
        categoryKey: 'recipients',
        iconName: 'building',
        iconColor: '#1b2b85',
        iconBackgroundColor: '#edf0ff',
        title: 'Recipients',
        description: 'Find awards by business, nonprofit, other organization, and more',
        slug: 'recipients-category',
        titleCapital: 'RECIPIENTS'
    },
    {
        categoryKey: 'characteristics',
        iconName: 'cubes',
        iconColor: '#ff580a',
        iconBackgroundColor: '#fff3ea',
        title: 'Characteristics',
        description: 'Find awards by award type, ID, industry code, and more',
        slug: 'characteristics-category',
        titleCapital: 'CHARACTERISTICS'
    }
];

export const searchFilterCategoryTree = [
    {
        title: 'Recipient',
        component: <RecipientSearchContainer searchV2 />
    },
    {
        title: "Award ID",
        component: <AwardIDSearchContainer searchV2 />
    },
    {
        title: "Time Period",
        component: <TimePeriodContainer searchV2 />
    },
    {
        title: "Location",
        component: <LocationSection />
    },
    {
        title: 'Agency',
        component: <AgencyContainer searchV2 />
    },
    {
        title: 'Award Type',
        component: <AwardTypeV2 />
    },
    {
        title: 'Recipient Type',
        component: <RecipientTypeContainer searchV2 />
    },
    {
        title: "Award Description",
        component: <AwardDescriptionFilterContainer />
    },
    {
        title: "Award Amount",
        component: <AwardAmountSearchContainer searchV2 />
    },
    {
        title: 'Assistance Listing',
        component: <CFDASearchContainer searchV2 />
    },
    {
        title: 'North American Industry Classification System (NAICS)',
        component: (
            <>
                <div className="search-option">
                    <NAICSCheckboxTree searchV2 />
                </div>
            </>
        )
    },
    {
        title: 'Disaster Emergency Fund Code (DEFC)',
        component: <DEFCheckboxTreeContainer />
    },
    {
        title: 'Treasury Account Symbol (TAS)',
        component: <TASCheckboxTreeContainer showInfo={false} searchV2 />
    },
    {
        title: 'Product and Service Code (PSC)',
        component: (
            <>
                <div className="search-option">
                    <PSCCheckboxTreeContainer searchV2 />
                </div>
            </>
        )
    },
    {
        title: 'Type of Contract Pricing',
        component: <PricingTypeContainer searchV2 />
    },
    {
        title: 'Type of Set Aside',
        component: <SetAsideContainer searchV2 />
    },
    {
        title: 'Extent Competed',
        component: <ExtentCompetedContainer searchV2 />
    }
];
