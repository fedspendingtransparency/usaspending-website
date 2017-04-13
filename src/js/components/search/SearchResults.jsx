/**
 * SearchResults.jsx
 * Created by Emily Gullo 10/14/2016
 **/

import React from 'react';

import ResultsTableContainer from 'containers/search/table/ResultsTableContainer';
import TopFilterBarContainer from 'containers/search/topFilterBar/TopFilterBarContainer';

import TimeVisualizationSectionContainer from
    'containers/search/visualizations/time/TimeVisualizationSectionContainer';
import RankVisualizationWrapperContainer from
    'containers/search/visualizations/rank/RankVisualizationWrapperContainer';
import GeoVisualizationSectionContainer from
    'containers/search/visualizations/geo/GeoVisualizationSectionContainer';

export default class SearchResults extends React.Component {
    render() {
        return (
            <div className="search-results-wrapper">
                <TopFilterBarContainer {...this.props} />
                <div className="search-results">
                    <TimeVisualizationSectionContainer />
                    <RankVisualizationWrapperContainer />
                    <GeoVisualizationSectionContainer />
                    <ResultsTableContainer />
                </div>
            </div>
        );
    }
}
