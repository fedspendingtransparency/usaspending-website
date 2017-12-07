/**
  * ResultsTableSection.jsx
  * Created by Kevin Li 11/8/16
  **/

import React from 'react';
import PropTypes from 'prop-types';

import ResultsTableHeaderCellContainer from
    'containers/search/table/ResultsTableHeaderCellContainer';

import ResultsTable from './ResultsTable';
import ResultsTableTabs from './ResultsTableTabs';
import ResultsTableMessage from './ResultsTableMessage';

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
        let loadingWrapper = 'loaded-table';
        let message = null;
        if (this.props.inFlight) {
            loadingWrapper = 'loading-table';
            message = <ResultsTableMessage message="Loading data..." />;
        }
        else if (this.props.results.length === 0) {
            // no results
            message = <ResultsTableMessage message="No results matched your criteria." />;
        }

        return (
            <section
                className="search-results-table-section"
                id="results-section-table"
                aria-label="Spending by Award">
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
                    switchTab={this.props.switchTab} />
                <div className={loadingWrapper}>
                    <div
                        className="results-table-width-master"
                        ref={(div) => {
                            // this is an empty div that scales via CSS
                            // the results table width will follow this div's width
                            this.tableWidthController = div;
                        }} />
                    <ResultsTable
                        {...this.props}
                        visibleWidth={this.state.tableWidth}
                        headerCellClass={ResultsTableHeaderCellContainer} />
                </div>
                {message}
            </section>
        );
    }
}

ResultsTableSection.propTypes = propTypes;
