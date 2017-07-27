/**
 * AccountAwardsSection.jsx
 * Created by Kevin Li 4/13/17
 */

import React from 'react';
import PropTypes from 'prop-types';

import ResultsTableTabs from 'components/search/table/ResultsTableTabs';
import ResultsTable from 'components/search/table/ResultsTable';
import ResultsTableMessage from 'components/search/table/ResultsTableMessage';
import ResultsTablePicker from 'components/search/table/ResultsTablePicker';
import AccountAwardsHeaderCellContainer from
    'containers/account/awards/AccountAwardsHeaderCellContainer';

const propTypes = {
    inFlight: PropTypes.bool,
    tableTypes: PropTypes.array,
    currentType: PropTypes.string,
    switchTab: PropTypes.func,
    results: PropTypes.array,
    counts: PropTypes.object
};

export default class AccountAwardsSection extends React.Component {
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
        // subtract 2px from the width to account for the table borders (2 * 1px on each side)
        const tableWidth = this.tableWidthController.clientWidth - 2;
        this.setState({ tableWidth });
    }

    render() {
        let loadingWrapper = '';
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
            <div className="account-awards-table-section" id="award-section-table">
                <h3>Spending by Award</h3>
                <hr className="results-divider" />
                <ResultsTableTabs
                    types={this.props.tableTypes}
                    active={this.props.currentType}
                    counts={this.props.counts}
                    switchTab={this.props.switchTab} />
                <ResultsTablePicker
                    types={this.props.tableTypes}
                    active={this.props.currentType}
                    switchTab={this.props.switchTab} />
                <div className={loadingWrapper}>
                    <div
                        className="account-awards-table-width-master"
                        ref={(div) => {
                            // this is an empty div that scales via CSS
                            // the results table width will follow this div's width
                            this.tableWidthController = div;
                        }} />
                    <ResultsTable
                        {...this.props}
                        visibleWidth={this.state.tableWidth}
                        headerCellClass={AccountAwardsHeaderCellContainer} />
                </div>
                {message}
            </div>
        );
    }
}

AccountAwardsSection.propTypes = propTypes;
