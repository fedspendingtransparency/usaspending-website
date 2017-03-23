/**
 * SearchSidebar.jsx
 * Created by Kevin Li 3/20/17
 */

import React from 'react';

import FilterSidebar from 'components/sharedComponents/filterSidebar/FilterSidebar';

import AccountTimePeriodContainer from 'containers/account/filters/AccountTimePeriodContainer';

const filters = {
    options: [
        'Time Period',
        'Object Class',
        'Program Activity',
        'Treasury Account Symbol (TAS)'
    ],
    components: [
        AccountTimePeriodContainer,
        null,
        null,
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
