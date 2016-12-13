/**
 * SearchResults.jsx
 * Created by Emily Gullo 10/14/2016
 **/

import React from 'react';

import ResultsTableContainer from 'containers/search/table/ResultsTableContainer';
import TopFilterBarContainer from 'containers/search/topFilterBar/TopFilterBarContainer';

import TimeVisualizationSection from './visualizations/time/TimeVisualizationSection';

export default class SearchResults extends React.Component {
    render() {
        return (
            <div className="search-results-wrapper">
                <TopFilterBarContainer />
                <div className="search-results">
                    <TimeVisualizationSection />
                    <ResultsTableContainer />
                </div>
            </div>
        );
    }
}
