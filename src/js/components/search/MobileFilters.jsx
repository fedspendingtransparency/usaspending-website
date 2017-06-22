/**
 * MobileFilters.jsx
 * Created by Kevin Li 6/22/17
 */

import React from 'react';

import SearchSidebar from './SearchSidebar';

export default class MobileFilters extends React.Component {
    render() {
        return (
            <div className="mobile-search-sidebar">
                <SearchSidebar mobile />
            </div>
        );
    }
}
