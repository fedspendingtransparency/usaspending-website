/**
 * SearchSidebar.jsx
 * Created by Emily Gullo 10/14/2016
 **/

import React from 'react';

import AwardTypeContainer from 'containers/search/filters/AwardTypeContainer';
import TimePeriodContainer from 'containers/search/filters/TimePeriodContainer';
import AgencyContainer from 'containers/search/filters/AgencyContainer';
import LocationSearchContainer from 'containers/search/filters/location/LocationSearchContainer';
import BudgetCategorySearchContainer
    from 'containers/search/filters/budgetCategory/BudgetCategorySearchContainer';
import RecipientSearchContainer from 'containers/search/filters/recipient/RecipientSearchContainer';
import KeywordContainer from 'containers/search/filters/KeywordContainer';
import AwardIDSearchContainer from 'containers/search/filters/awardID/AwardIDSearchContainer';
import AwardAmountSearchContainer from
    'containers/search/filters/awardAmount/AwardAmountSearchContainer';

import FilterSidebar from 'components/sharedComponents/filterSidebar/FilterSidebar';

const filters = {
    options: [
        'Search',
        'Time Period',
        'Place of Performance',
        'Budget Categories',
        'Agencies',
        'Recipients',
        'Award Type',
        'Award ID',
        'Award Amount',
        'Other Award Items'
    ],
    components: [
        KeywordContainer,
        TimePeriodContainer,
        LocationSearchContainer,
        BudgetCategorySearchContainer,
        AgencyContainer,
        RecipientSearchContainer,
        AwardTypeContainer,
        AwardIDSearchContainer,
        AwardAmountSearchContainer,
        null
    ]
};

export default class SearchSidebar extends React.Component {
    render() {
        return (
            <FilterSidebar {...filters} />
        );
    }
}
