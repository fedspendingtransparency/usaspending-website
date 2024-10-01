/**
 * SearchFilterDemoData.jsx
 * Created by Brian Petway 09/30/2024
 */

export const SearchFilterDemoData = [
    {
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
    }
];

export default SearchFilterDemoData;
