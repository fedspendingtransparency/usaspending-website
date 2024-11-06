/**
 * SearchFilterCategories.jsx
 * Created by Andrea Blackwell November 4, 2024
 */

import React from 'react';

import TASCheckboxTreeContainer from "../../containers/search/filters/programSource/TASCheckboxTreeContainer";
import { DEFCheckboxTree } from "../../containers/search/filters/def/DEFCheckboxTree";
import { TimePeriodContainer } from "../../containers/search/filters/TimePeriodContainer";
import RecipientContainer from "../../containers/recipient/RecipientContainer";
import RecipientTypeContainer from "../../containers/search/filters/recipient/RecipientTypeContainer";
import AgencyContainer from "../../containers/agency/AgencyContainer";
import LocationAutocompleteContainer from "../../containers/search/filters/location/LocationAutocompleteContainer";

export const SearchFilterCategories = [
    {
        categoryKey: 'location',
        iconName: 'map-marked-alt',
        iconColor: '#34a37e',
        iconBackgroundColor: '#dbf6ed',
        title: 'Location',
        description: 'Find awards by recipient location or where work is being done',
        itemCount: 3,
        selectedItems: [
            'Sample chip 1',
            'Sample chip 2',
            'Sample chip 3'
        ]
    },
    {
        categoryKey: 'timePeriod',
        iconName: 'calendar-alt',
        iconColor: '#1A4480',
        iconBackgroundColor: '#edf5ff',
        title: 'Time Period',
        description: 'Find awards by specific date or date range',
        itemCount: 3,
        selectedItems: [
            'Sample chip 1',
            'Sample chip 2',
            'Sample chip 3'
        ]
    },
    {
        categoryKey: 'characteristics',
        iconName: 'cubes',
        iconColor: '#ff580a',
        iconBackgroundColor: '#fff3ea',
        title: 'Characteristics',
        description: 'Find awards by award type, ID, industry code, and more',
        itemCount: 1,
        selectedItems: [
            'Sample chip 1'
        ]
    },
    {
        categoryKey: 'recipients',
        iconName: 'building',
        iconColor: '#1b2b85',
        iconBackgroundColor: '#edf0ff',
        title: 'Recipients',
        description: 'Find awards by business, nonprofit, other organization, and more',
        itemCount: 2,
        selectedItems: [
            'Sample chip 1',
            'Sample chip 2'
        ]
    },
    {
        categoryKey: 'sources',
        iconName: 'university',
        iconColor: '#009ec1',
        iconBackgroundColor: '#e5faff',
        title: 'Sources',
        description: 'Find awards by the source of funding (agency, Treasury Account Symbol, or Disaster Emergency Fund Code)',
        itemCount: 2,
        selectedItems: [
            'Sample chip 1',
            'Sample chip 2'
        ]
    }
];

export const FilterCategoryTree = {
    location: {
        title: 'Location',
        component: <LocationAutocompleteContainer />
    },
    timePeriod: {
        title: 'Time Period',
        component: <TimePeriodContainer />
    },
    characteristics: {
        children: [
            {
                title: 'Award Description'
            },
            {
                title: 'Award ID'
            },
            {
                title: 'Spending Amount'
            },
            {
                title: 'Contract Award Type'
            },
            {
                title: 'North American Industry Classification System (NAICS)'
            },
            {
                title: 'Product and Service Code (PSC)'
            },
            {
                title: 'Type of Contract Pricing'
            },
            {
                title: 'Type of Set Aside'
            },
            {
                title: 'Extent Competed'
            },
            {
                title: 'Financial Assistance Award Type'
            }

        ]

    },
    recipient: {
        children: [
            {
                title: 'Recipient'
            },
            {
                title: 'Recipient Type'
            }
        ]
    },
    sources: {
        children: [
            {
                title: 'Agency'
            },
            {
                title: 'Treasury Account Symbol (TAS)'
            },
            {
                title: 'COVID-19 Spending'
            },
            {
                title: 'Infrastructure Spending'
            }
        ]
    }
};
