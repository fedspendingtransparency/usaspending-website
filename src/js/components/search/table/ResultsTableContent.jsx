/**
  * ResultsTable.jsx
  * Created by Kevin Li 11/8/16
  **/

import React from 'react';

import ResultsTable from './ResultsTable';
import ResultsTableTabs from './ResultsTableTabs';

const propTypes = {
    results: React.PropTypes.array,
    inFlight: React.PropTypes.bool
};

export default class ResultsTableContent extends React.Component {

    render() {
        let loadingWrapper = 'loaded-table';
        if (this.props.inFlight) {
            loadingWrapper = 'loading-table';
        }

        return (
            <div className="search-results-table-section">
                <h3>Spending by Award Type</h3>
                <hr className="results-divider" />
                <ResultsTableTabs
                    types={this.props.tableTypes}
                    active={this.props.currentType}
                    switchTab={this.props.switchTab} />
                <div className={loadingWrapper}>
                    <ResultsTable {...this.props} />
                </div>
            </div>
        );
    }
}

ResultsTableContent.propTypes = propTypes;
