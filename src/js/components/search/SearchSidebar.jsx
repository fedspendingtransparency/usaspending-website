/**
 * SearchSidebar.jsx
 * Created by Emily Gullo 10/14/2016
 **/

import React from 'react';
import SearchOption from './SearchOption';

const defaultProps = {
    options: [
        'Search',
        'Time Period',
        'Location',
        'Budget Categories',
        'Agencies',
        'Recipient Information',
        'Award Type',
        'Award ID',
        'Award Amount',
        'Contract Specific Details'
    ]
};

const propTypes = {
    options: React.PropTypes.arrayOf(React.PropTypes.string)
};

export default class SearchSidebar extends React.Component {
    render() {
        const optionsList = this.props.options.map((name, i) =>
            <SearchOption name={name} key={i} />
        );

        return (
            <div className="search-sidebar">
                <h6 className="sidebar-header">Filter by:</h6>
                <div className="search-filters-wrapper">
                    {optionsList}
                </div>
            </div>
        );
    }
}

SearchSidebar.defaultProps = defaultProps;
SearchSidebar.propTypes = propTypes;
