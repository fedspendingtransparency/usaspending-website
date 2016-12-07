/**
  * ResultsTable.jsx
  * Created by Kevin Li 11/8/16
  **/

import React from 'react';

import ResultsTable from './ResultsTableCustom';
import ResultsTableTabs from './ResultsTableTabs';

const propTypes = {
    inFlight: React.PropTypes.bool,
    tableTypes: React.PropTypes.array,
    currentType: React.PropTypes.string,
    switchTab: React.PropTypes.func
};

export default class ResultsTableContent extends React.Component {
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
        const tableWidth = this.tableWidthController.clientWidth - 2;
        this.setState({ tableWidth });
    }

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
                    <div
                        className="results-table-width-master"
                        ref={(div) => {
                            this.tableWidthController = div;
                        }} />
                    <ResultsTable {...this.props} visibleWidth={this.state.tableWidth} />
                </div>
            </div>
        );
    }
}

ResultsTableContent.propTypes = propTypes;
