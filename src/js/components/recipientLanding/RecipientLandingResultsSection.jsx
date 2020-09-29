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
        let message = null;
        let table = (
            <RecipientLandingTable
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
            <div className="results-table-section">
                <TransitionGroup>
                    <CSSTransition
                        classNames="table-message-fade"
                        transitionLeaveTimeout={225}
                        transitionEnterTimeout={195}
                        exit>
                        {message}
                    </CSSTransition>
                </TransitionGroup>
                {table}
            </div>
        );
    }
}

RecipientLandingResultsSection.propTypes = propTypes;
