/**
 * RecipientLandingResultsSection.jsx
 * Created by David Trinh 7/3/18
 */

import React from 'react';
import PropTypes from 'prop-types';

import { CSSTransition, TransitionGroup } from 'react-transition-group';

import ResultsTableLoadingMessage from 'components/search/table/ResultsTableLoadingMessage';
import ResultsTableErrorMessage from 'components/search/table/ResultsTableErrorMessage';
import RecipientLandingTable from './table/RecipientLandingTable';

const propTypes = {
    inFlight: PropTypes.bool,
    error: PropTypes.bool,
    results: PropTypes.array,
    columns: PropTypes.array,
    searchString: PropTypes.string,
    order: PropTypes.object,
    updateSort: PropTypes.func
};

export default class RecipientLandingResultsSection extends React.Component {
    render() {
        return (
            <div className="results-table-section">
                <TransitionGroup>
                    {(this.props.inFlight || this.props.error) && (
                        <CSSTransition
                            classNames="table-message-fade"
                            timeout={{ exit: 225, enter: 195 }}
                            exit>
                            <>
                                {this.props.inFlight && (
                                    <div className="results-table-message-container">
                                        <ResultsTableLoadingMessage />
                                    </div>
                                )}
                                {this.props.error && (
                                    <div className="results-table-message-container full">
                                        <ResultsTableErrorMessage />
                                    </div>
                                )}
                            </>
                        </CSSTransition>
                    )}
                </TransitionGroup>
                <RecipientLandingTable {...this.props} />
            </div>
        );
    }
}

RecipientLandingResultsSection.propTypes = propTypes;
