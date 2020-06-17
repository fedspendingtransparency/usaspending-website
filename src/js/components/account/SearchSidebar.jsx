/**
 * SearchSidebar.jsx
 * Created by Kevin Li 3/20/17
 */

import React from 'react';

import { Filter as FilterIcon } from 'components/sharedComponents/icons/Icons';
import FilterSidebar from 'components/sharedComponents/filterSidebar/FilterSidebar';

import AccountTimePeriodContainer from 'containers/account/filters/AccountTimePeriodContainer';
import AccountObjectClassContainer from 'containers/account/filters/AccountObjectClassContainer';
import AccountProgramActivityContainer
    from 'containers/account/filters/AccountProgramActivityContainer';

const filters = {
    options: [
        { title: 'Time Period' },
        { title: 'Object Class' },
        { title: 'Program Activity' },
        { title: 'Treasury Account Symbol (TAS)' }
    ],
    components: [
        AccountTimePeriodContainer,
        AccountObjectClassContainer,
        AccountProgramActivityContainer,
        null
    ]
};

export default class SearchSidebar extends React.Component {
    render() {
        return (
            <div className="search-sidebar">
                <div className="sidebar-header">
                    <span className="filter-icon">
                        <FilterIcon />
                    </span>
                    <h6>Filter by:</h6>
                </div>
                <FilterSidebar {...filters} />
            </div>
        );
    }
}
