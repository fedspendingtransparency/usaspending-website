/**
 * SearchResults.jsx
 * Created by Kevin Li 3/20/17
 **/

import React from 'react';

import TopFilterBarContainer from 'containers/search/topFilterBar/TopFilterBarContainer';

import AccountTimeVisualizationContainer from
    'containers/account/visualizations/AccountTimeVisualizationContainer';
import AccountRankVisualizationContainer from
    'containers/account/visualizations/AccountRankVisualizationContainer';


export default class SearchResults extends React.Component {
    render() {
        return (
            <div className="search-results-wrapper">
                <TopFilterBarContainer {...this.props} />
                <div className="search-results">
                    <AccountTimeVisualizationContainer />
                    <AccountRankVisualizationContainer />
                </div>
            </div>
        );
    }
}
