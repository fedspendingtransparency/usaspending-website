/**
 * SearchFilterCategories.jsx
 * Created by Andrea Blackwell November 4, 2024
 */

import React from 'react';

import AwardType from "components/search/filters/awardType/AwardType";
import Agency from "components/search/filters/agency/Agency";
import LocationSection from "components/search/filters/location/LocationSection";
import TimePeriodContainer from "containers/search/filters/TimePeriodContainer";
import AwardIDSearchContainer from "containers/search/filters/awardID/AwardIDSearchContainer";
import TASCheckboxTreeContainer from
    "containers/search/filters/programSource/TASCheckboxTreeContainer";
import RecipientSearchContainer from "containers/search/filters/recipient/RecipientSearchContainer";
import RecipientType from "containers/search/filters/recipient/RecipientType";
import AwardAmountSearch from "components/search/filters/awardAmount/AwardAmountSearch";
import NAICSCheckboxTree from "containers/search/filters/naics/NAICSCheckboxTree";
import PSCCheckboxTreeContainer from "containers/search/filters/psc/PSCCheckboxTreeContainer";
import PricingType from "components/search/filters/PricingType";
import SetAside from "components/search/filters/SetAside";
import ExtentCompeted from "components/search/filters/ExtentCompeted";
import CFDASearchContainer from "containers/search/filters/cfda/CFDASearchContainer";
import DEFCheckboxTreeContainer from "containers/search/filters/def/DEFCheckboxTreeContainer";
import AwardDescriptionFilterContainer from
    "containers/search/filters/AwardDescriptionFilterContainer";

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
        component: <RecipientSearchContainer />
    },
    {
        title: "Award ID",
        component: <AwardIDSearchContainer />
    },
    {
        title: "Time Period",
        component: <TimePeriodContainer />
    },
    {
        title: "Location",
        component: <LocationSection />
    },
    {
        title: 'Agency',
        component: <Agency />
    },
    {
        title: 'Award Type',
        component: <AwardType />
    },
    {
        title: 'Recipient Type',
        component: <RecipientType />
    },
    {
        title: "Award Description",
        component: <AwardDescriptionFilterContainer />
    },
    {
        title: "Award Amount",
        component: <AwardAmountSearch />
    },
    {
        title: 'Assistance Listing',
        component: <CFDASearchContainer />
    },
    {
        title: 'North American Industry Classification System (NAICS)',
        component: <NAICSCheckboxTree />
    },
    {
        title: 'Disaster Emergency Fund Code (DEFC)',
        component: <DEFCheckboxTreeContainer />
    },
    {
        title: 'Treasury Account Symbol (TAS)',
        component: <TASCheckboxTreeContainer />
    },
    {
        title: 'Product and Service Code (PSC)',
        component: <PSCCheckboxTreeContainer />
    },
    {
        title: 'Type of Contract Pricing',
        component: <PricingType />
    },
    {
        title: 'Type of Set Aside',
        component: <SetAside />
    },
    {
        title: 'Extent Competed',
        component: <ExtentCompeted />
    }
];
