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
    render() {
        return (
            <div className="search-results">
            	<SearchSummary/>
				<Table/>
				<BarChart/>
				<Map/>
				<BarChart/>
            </div>
        );
    }
}
