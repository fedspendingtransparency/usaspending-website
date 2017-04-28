/**
 * SearchResults.jsx
 * Created by Kevin Li 3/20/17
 **/

import React from 'react';

import AccountTopFilterBarContainer from
    'containers/account/topFilterBar/AccountTopFilterBarContainer';

import AccountTimeVisualizationContainer from
    'containers/account/visualizations/AccountTimeVisualizationContainer';
import AccountRankVisualizationContainer from
    'containers/account/visualizations/AccountRankVisualizationContainer';
import AccountAwardsContainer from 'containers/account/awards/AccountAwardsContainer';


export default class SearchResults extends React.Component {
    render() {
        return (
            <div className="search-results-wrapper">
                <AccountTopFilterBarContainer {...this.props} />
                <div className="search-results">
                    <AccountTimeVisualizationContainer />
                    <AccountRankVisualizationContainer />
                    <AccountAwardsContainer />
                </div>
            </div>
        );
    }
}
