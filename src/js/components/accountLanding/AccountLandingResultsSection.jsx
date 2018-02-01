/**
 * AccountLandingResultsSection.jsx
 * Created by Lizzie Salita 8/4/17
 */

import React from 'react';
import PropTypes from 'prop-types';

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
        let loadingWrapper = 'results-table-section__loading-wrapper';
        let message = null;
        if (this.props.inFlight) {
            loadingWrapper = 'results-table-section__loading-wrapper results-table-section__loading-wrapper_loading';
            message = (
                <div className="results-table-section__message">
                    Loading data...
                </div>
            );
        }
        else if (this.props.results.length === 0) {
            // no results
            if (this.props.accountSearchString) {
                message = (
                    <div className="results-table-section__message">
                        No results found for &ldquo;
                        <span className="results-table-section__search-string">
                            {this.props.accountSearchString}
                        </span> &rdquo;.
                    </div>
                );
            }
            else {
                message = (
                    <div className="results-table-section__message">
                        No results found.
                    </div>
                );
            }
        }

        return (
            <div className="results-table-section" id="account-landing-results">
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
