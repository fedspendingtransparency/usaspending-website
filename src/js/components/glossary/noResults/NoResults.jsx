/**
 * NoResults.jsx
 * Created by Kevin Li 5/17/17
 */

import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    glossary: PropTypes.object,
    searchLoading: PropTypes.bool
};

export default class NoResults extends React.Component {
    render() {
    // TODO: Kevin Li - temporary text until we implement the feedback form (since people
    // complain when we mention features that aren't there yet)
        let loading = '';
        if (this.props.searchLoading) {
            loading = 'loading';
        }

        return (
            <div className={`glossary-no-results ${loading}`}>
                <h2 className="title">
                    No Results Found
                </h2>

                <div className="no-results-content">
                    <p>No results found for &quot;{this.props.glossary.search.input}.&quot;</p>
                </div>
            </div>
        );
    }
}

NoResults.propTypes = propTypes;
