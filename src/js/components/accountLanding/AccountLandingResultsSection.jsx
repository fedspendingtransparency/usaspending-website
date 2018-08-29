/**
 * AccountLandingResultsSection.jsx
 * Created by Lizzie Salita 8/4/17
 */

import React from 'react';
import PropTypes from 'prop-types';

import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';

import ResultsTableLoadingMessage from 'components/search/table/ResultsTableLoadingMessage';
import ResultsTableErrorMessage from 'components/search/table/ResultsTableErrorMessage';
import AccountLandingTable from './table/AccountLandingTable';

const propTypes = {
    inFlight: PropTypes.bool,
    error: PropTypes.bool,
    results: PropTypes.array,
    columns: PropTypes.array,
    searchString: PropTypes.string,
    order: PropTypes.object,
    updateSort: PropTypes.func
};

export default class AccountLandingResultsSection extends React.Component {
    render() {
        let message = null;
        let table = (
            <AccountLandingTable
                {...this.props} />
        );
        if (this.props.inFlight) {
            message = (
                <div className="results-table-message-container">
                    <ResultsTableLoadingMessage />
                </div>
            );
        }
        else if (this.props.error) {
            table = null;
            message = (
                <div className="results-table-message-container full">
                    <ResultsTableErrorMessage />
                </div>
            );
        }

        return (
            <div className="results-table-section" id="account-landing-results">
                <CSSTransitionGroup
                    transitionName="table-message-fade"
                    transitionLeaveTimeout={225}
                    transitionEnterTimeout={195}
                    transitionLeave>
                    {message}
                </CSSTransitionGroup>
                {table}
            </div>
        );
    }
}

AccountLandingResultsSection.propTypes = propTypes;
