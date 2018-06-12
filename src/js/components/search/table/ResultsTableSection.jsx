/**
  * ResultsTableSection.jsx
  * Created by Kevin Li 11/8/16
  **/

import React from 'react';
import PropTypes from 'prop-types';

import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';

import ResultsTable from './ResultsTable';
import ResultsTableTabs from './ResultsTableTabs';
import ResultsTableLoadingMessage from './ResultsTableLoadingMessage';
import ResultsTableNoResults from './ResultsTableNoResults';
import ResultsTableErrorMessage from './ResultsTableErrorMessage';

const propTypes = {
    inFlight: PropTypes.bool,
    error: PropTypes.bool,
    tableTypes: PropTypes.array,
    currentType: PropTypes.string,
    switchTab: PropTypes.func,
    results: PropTypes.array,
    columns: PropTypes.object,
    counts: PropTypes.object,
    toggleColumnVisibility: PropTypes.func,
    reorderColumns: PropTypes.func,
    subaward: PropTypes.bool
};

export default class ResultsTableSection extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            tableWidth: 0
        };

        this.setTableWidth = this.setTableWidth.bind(this);
    }
    componentDidMount() {
        // set the initial table width
        this.setTableWidth();
        // watch the window for size changes
        window.addEventListener('resize', this.setTableWidth);
    }

    componentWillUnmount() {
        // stop watching for size changes
        window.removeEventListener('resize', this.setTableWidth);
    }

    setTableWidth() {
        const tableWidth = this.tableWidthController.clientWidth - 1;
        this.setState({ tableWidth });
    }

    render() {
        let message = null;
        let table = (
            <ResultsTable
                {...this.props}
                visibleWidth={this.state.tableWidth} />
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
        else if (this.props.results.length === 0) {
            // no results
            table = null;
            message = (
                <div className="results-table-message-container full">
                    <ResultsTableNoResults />
                </div>
            );
        }

        const type = this.props.subaward ? 'Sub-Award' : 'Prime Award';

        return (
            <div className="search-results-table-section" id="results-section-table">
                <div className="table-section-header">
                    <h2 className="visualization-title">
                        Spending by {type}
                    </h2>
                </div>
                <hr className="results-divider" />
                <ResultsTableTabs
                    types={this.props.tableTypes}
                    active={this.props.currentType}
                    counts={this.props.counts}
                    switchTab={this.props.switchTab}
                    disabled={this.props.inFlight} />
                <div className="results-table-content">
                    <CSSTransitionGroup
                        transitionName="table-message-fade"
                        transitionLeaveTimeout={225}
                        transitionEnterTimeout={195}
                        transitionLeave>
                        {message}
                    </CSSTransitionGroup>
                    <div
                        className="results-table-width-master"
                        ref={(div) => {
                            // this is an empty div that scales via CSS
                            // the results table width will follow this div's width
                            this.tableWidthController = div;
                        }} />
                    {table}
                </div>
            </div>
        );
    }
}

ResultsTableSection.propTypes = propTypes;
