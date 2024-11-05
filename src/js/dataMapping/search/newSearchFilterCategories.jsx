/**
 * SearchFilterCategories.jsx
 * Andrea Blackwell
 * November 4, 2024
 */

import React from 'react';
import LocationSection from "../../components/search/filters/location/LocationSection";

export const SearchFilterCategories = [
    {
        categoryKey: 'location',
        iconName: 'map-marked-alt',
        iconColor: '#34a37e',
        iconBackgroundColor: '#dbf6ed',
        title: 'Location',
        description: 'Find awards by recipient location or where work is being done',
        itemCount: 3,
        // eslint-disable-next-line react/react-in-jsx-scope
        filterComponent: <LocationSection />,
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
        filterComponent: <LocationSection />,
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
        filterComponent: <LocationSection />,
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
        filterComponent: <LocationSection />,
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
        filterComponent: <LocationSection />,
        selectedItems: [
            'Sample chip 1',
            'Sample chip 2'
        ]
    }
];

export default SearchFilterCategories;
