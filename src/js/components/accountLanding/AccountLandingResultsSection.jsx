/**
 * AccountLandingResultsSection.jsx
 * Created by Lizzie Salita 8/4/17
 */

import React from 'react';
import PropTypes from 'prop-types';

import ResultsTableMessage from 'components/search/table/ResultsTableMessage';
import AccountLandingTable from './table/AccountLandingTable';

const propTypes = {
    inFlight: PropTypes.bool,
    results: PropTypes.array,
    columns: PropTypes.array,
    accountSearchString: PropTypes.string,
    order: PropTypes.object,
    updateSort: PropTypes.func
};

export default class AccountLandingResultsSection extends React.Component {
    render() {
        let loadingWrapper = '';
        let message = null;
        if (this.props.inFlight) {
            loadingWrapper = 'loading-table';
            message = <ResultsTableMessage message="Loading data..." />;
        }
        else if (this.props.results.length === 0) {
            // no results
            if (this.props.accountSearchString) {
                message = (
                    <div className="results-table-message">
                        No results found for &ldquo; <span>{this.props.accountSearchString}</span> &rdquo;.
                    </div>
                );
            }
            else {
                message = <ResultsTableMessage message="No results found." />;
            }
        }

        return (
            <div className="account-landing-results" id="account-landing-results">
                <div className={loadingWrapper}>
                    <AccountLandingTable
                        {...this.props} />
                </div>
                {message}
            </div>
        );
    }
}

AccountLandingResultsSection.propTypes = propTypes;
