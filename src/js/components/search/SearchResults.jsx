/**
 * SearchResults.jsx
 * Created by Emily Gullo 10/14/2016
 **/

import React from 'react';

import ResultsTableContainer from 'containers/search/table/ResultsTableContainer';
import TopFilterBarContainer from 'containers/search/topFilterBar/TopFilterBarContainer';

import TimeVisualizationSectionContainer from
    'containers/search/visualizations/time/TimeVisualizationSectionContainer';
import RankVisualizationSectionContainer from
    'containers/search/visualizations/rank/RankVisualizationSectionContainer';

export default class SearchResults extends React.Component {
    render() {
        return (
            <div className="search-results-wrapper">
                <TopFilterBarContainer {...this.props} />
                <div className="search-results">
                    <TimeVisualizationSectionContainer />
                    <RankVisualizationSectionContainer />
                    <ResultsTableContainer />
                </div>
            </div>
        );
    }
}
