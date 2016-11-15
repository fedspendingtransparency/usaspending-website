/**
 * SearchResults.jsx
 * Created by Emily Gullo 10/14/2016
 **/

import React from 'react';

import BarChart from 'containers/BarChart';
import ResultsTableContainer from 'containers/search/table/ResultsTableContainer';
import Map from 'containers/Map';

import SearchSummary from './SearchSummary';

export default class SearchResults extends React.Component {
    render() {
        return (
            <div className="search-results">
                <SearchSummary />
                <h3>View All: Prime Awards</h3>
                <ResultsTableContainer />
                <h3>Historical Spending</h3>
                <BarChart />
                <h3>Spending by Geography</h3>
                <Map />
                <h3>Top 5</h3>
                <BarChart />
            </div>
        );
    }
}
