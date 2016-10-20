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
                <h3>View All: Prime Awards</h3>
                <Table/>
                <h3>Historical Spending</h3>
                <BarChart/>
                <h3>Spending by Geography</h3>
                <Map/>
                <h3>Top 5</h3>
                <BarChart/>
            </div>
        );
    }
}
