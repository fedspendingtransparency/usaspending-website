/**
 * SearchResults.jsx
 * Created by Kevin Li 3/20/17
 **/

import React from 'react';

import TopFilterBarContainer from 'containers/search/topFilterBar/TopFilterBarContainer';

import AccountTimeVisualizationContainer from
    'containers/account/visualizations/AccountTimeVisualizationContainer';
import RankVisualizationSectionContainer from
    'containers/search/visualizations/rank/RankVisualizationSectionContainer';


export default class SearchResults extends React.Component {
    render() {
        return (
            <div className="search-results-wrapper">
                <TopFilterBarContainer {...this.props} />
                <div className="search-results">
                    <AccountTimeVisualizationContainer />
                </div>
            </div>
        );
    }
}
