/**
 * SearchSidebar.jsx
 * Created by Kevin Li 3/20/17
 */

import React from 'react';

import FilterSidebar from 'components/sharedComponents/filterSidebar/FilterSidebar';

import AccountTimePeriodContainer from 'containers/account/filters/AccountTimePeriodContainer';
import AccountObjectClassContainer from 'containers/account/filters/AccountObjectClassContainer';

const filters = {
    options: [
        'Time Period',
        'Object Class',
        'Program Activity',
        'Treasury Account Symbol (TAS)'
    ],
    components: [
        AccountTimePeriodContainer,
        AccountObjectClassContainer,
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
