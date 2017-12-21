/**
  * ResultsTableSection.jsx
  * Created by Kevin Li 11/8/16
  **/

import React from 'react';
import PropTypes from 'prop-types';

import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';

import ResultsTable from './ResultsTable';
import ResultsTableTabs from './ResultsTableTabs';
import ResultsTableMessage from './ResultsTableMessage';
import ResultsTableLoadingMessage from './ResultsTableLoadingMessage';
import ResultsTableNoResults from './ResultsTableNoResults';

const propTypes = {
    inFlight: PropTypes.bool,
    tableTypes: PropTypes.array,
    currentType: PropTypes.string,
    switchTab: PropTypes.func,
    results: PropTypes.array,
    columns: PropTypes.object,
    counts: PropTypes.object,
    toggleColumnVisibility: PropTypes.func,
    reorderColumns: PropTypes.func
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
        let showTable = '';
        if (this.props.inFlight) {
            message = (
                <div className="results-table-message-container">
                    <ResultsTableLoadingMessage />
                </div>
            );
        }
        else if (this.props.results.length === 0) {
            // no results
            showTable = 'hide';
            message = (
                <div className="results-table-message-container">
                    <ResultsTableNoResults />
                </div>
            );
        }

        return (
            <div className="search-results-table-section" id="results-section-table">
                <div className="table-section-header">
                    <h2 className="visualization-title">
                        Spending by Award
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
                    <div className={showTable}>
                        <div
                            className="results-table-width-master"
                            ref={(div) => {
                                // this is an empty div that scales via CSS
                                // the results table width will follow this div's width
                                this.tableWidthController = div;
                            }} />
                        <ResultsTable
                            {...this.props}
                            visibleWidth={this.state.tableWidth} />
                    </div>
                </div>
            </div>
        );
    }
}

ResultsTableSection.propTypes = propTypes;
