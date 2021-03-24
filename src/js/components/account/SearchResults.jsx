/**
 * SearchResults.jsx
 * Created by Kevin Li 3/20/17
 **/

import React from 'react';
import PropTypes from 'prop-types';

import AccountTopFilterBarContainer from
    'containers/account/topFilterBar/AccountTopFilterBarContainer';

import AccountTimeVisualizationContainer from
    'containers/account/visualizations/AccountTimeVisualizationContainer';
import AccountRankVisualizationContainer from
    'containers/account/visualizations/AccountRankVisualizationContainer';
import AccountAwardsContainer from 'containers/account/awards/AccountAwardsContainer';
import Note, { dodNote } from 'components/sharedComponents/Note';

const propTypes = {
    showNote: PropTypes.bool
};

export default class SearchResults extends React.Component {
    render() {
        return (
            <div className="search-results-wrapper">
                <AccountTopFilterBarContainer {...this.props} />
                <div className="search-results">
                    <AccountTimeVisualizationContainer />
                    <AccountRankVisualizationContainer />
                    <AccountAwardsContainer />
                    {this.props.showNote && <Note message={dodNote} />}
                </div>
            </div>
        );
    }
}

SearchResults.propTypes = propTypes;
