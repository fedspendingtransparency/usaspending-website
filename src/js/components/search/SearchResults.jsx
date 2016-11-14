/**
 * SearchResults.jsx
 * Created by Emily Gullo 10/14/2016
 **/

import React from 'react';

import ResultsTableContainer from 'containers/search/table/ResultsTableContainer';

import SearchSummary from './SearchSummary';

export default class SearchResults extends React.Component {
    render() {
        return (
            <div className="search-results">
                <SearchSummary />
                <h3>View All: Prime Awards</h3>
                <ResultsTableContainer />
            </div>
        );
    }
}
