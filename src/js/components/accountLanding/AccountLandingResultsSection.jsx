/**
 * AccountLandingResultsSection.jsx
 * Created by Lizzie Salita 8/4/17
 */

import React from 'react';
import PropTypes from 'prop-types';

import { CSSTransition, TransitionGroup } from 'react-transition-group';

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
        return (
            <div className="results-table-section" id="account-landing-results">
                <TransitionGroup>
                    {(this.props.error || this.props.inFlight) && (
                        <CSSTransition
                            classNames="table-message-fade"
                            timeout={{ exit: 225, enter: 195 }}
                            exit>
                            <>
                                {this.props.error && (
                                    <div className="results-table-message-container full">
                                        <ResultsTableErrorMessage />
                                    </div>
                                )}
                                {this.props.inFlight && (
                                    <div className="results-table-message-container">
                                        <ResultsTableLoadingMessage />
                                    </div>
                                )}
                            </>
                        </CSSTransition>
                    )}
                </TransitionGroup>
                {!this.props.inFlight && !this.props.error && (
                    <AccountLandingTable {...this.props} />
                )}
            </div>
        );
    }
}

AccountLandingResultsSection.propTypes = propTypes;
