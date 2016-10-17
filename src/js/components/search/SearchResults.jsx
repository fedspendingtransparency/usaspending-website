/**
 * SearchResults.jsx
 * Created by Emily Gullo 10/14/2016
 **/

import React from 'react';
import SearchSummary from './SearchSummary.jsx';
import BarChart from '../../containers/BarChart.jsx';
import Table from '../../containers/Table.jsx';
import Map from '../../containers/Map.jsx';

export default class SearchResults extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="search-results">
                <SearchSummary/>
                <h2>View All: Prime Awards</h2>
                <Table/>
                <h2>Historical Spending</h2>
                <BarChart/>
                <h2>Spending by Geography</h2>
                <Map/>
                <h2>Top 5</h2>
                <BarChart/>
            </div>
        );
    }
}
