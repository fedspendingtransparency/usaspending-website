/**
 * StateLandingContent.jsx
 * Created by Kevin Li 5/23/18
 */

import React from 'react';
import PropTypes from 'prop-types';

import LandingSearchBar from 'components/sharedComponents/LandingSearchBar';
import StateLandingTable from './table/StateLandingTable';

const propTypes = {
    setSearchString: PropTypes.func,
    resultsText: PropTypes.string
};

export default class StateLandingContent extends React.Component {
    render() {
        return (
            <div>
                <LandingSearchBar
                    setSearchString={this.props.setSearchString}
                    placeholder="Start typing to find a state or territory..."
                    button="Search States" />
                <div className="results-count">
                    {this.props.resultsText}
                </div>
                <StateLandingTable
                    {...this.props} />
            </div>
        );
    }
}

StateLandingContent.propTypes = propTypes;
