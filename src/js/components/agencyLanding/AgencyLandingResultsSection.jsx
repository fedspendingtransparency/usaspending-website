/**
 * AgencyLandingResultsSection.jsx
 * Created by Lizzie Salita 7/11/17
 */

import React from 'react';
import PropTypes from 'prop-types';

import ResultsTableMessage from 'components/search/table/ResultsTableMessage';
import AgencyLandingTable from './table/AgencyLandingTable';

const propTypes = {
    inFlight: PropTypes.bool,
    results: PropTypes.array,
    columns: PropTypes.array,
    agencySearchString: PropTypes.string
};

export default class AgencyLandingResultsSection extends React.Component {
    render() {
        let loadingWrapper = '';
        let message = null;
        if (this.props.inFlight) {
            loadingWrapper = 'loading-table';
            message = <ResultsTableMessage message="Loading data..." />;
        }
        else if (this.props.results.length === 0) {
            // no results
            if (this.props.agencySearchString) {
                message = (
                    <div className="results-table-message">
                        No results found for &ldquo; <span>{this.props.agencySearchString}</span> &rdquo;.
                    </div>
                );
            }
            else {
                message = <ResultsTableMessage message="No results found." />;
            }
        }

        return (
            <div className="agency-landing-results" id="agency-landing-results">
                <div className={loadingWrapper}>
                    <AgencyLandingTable
                        {...this.props} />
                </div>
                {message}
            </div>
        );
    }
}

AgencyLandingResultsSection.propTypes = propTypes;
