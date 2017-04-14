/**
 * AccountAwardsSection.jsx
 * Created by Kevin Li 4/13/17
 */

import React from 'react';

import ResultsTableTabs from 'components/search/table/ResultsTableTabs';
import ResultsTable from 'components/search/table/ResultsTable';
import AccountAwardsHeaderCellContainer from
    'containers/account/awards/AccountAwardsHeaderCellContainer';

const propTypes = {
    inFlight: React.PropTypes.bool,
    tableTypes: React.PropTypes.array,
    currentType: React.PropTypes.string,
    switchTab: React.PropTypes.func
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
        const tableWidth = this.tableWidthController.clientWidth - 2;
        this.setState({ tableWidth });
    }

    render() {
        let loadingWrapper = '';
        if (this.props.inFlight) {
            loadingWrapper = 'loading-table';
        }

        return (
            <div className="account-awards-table-section" id="award-section-table">
                <h3>Spending by Award</h3>
                <hr className="results-divider" />
                <ResultsTableTabs
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
            </div>
        );
    }
}

AccountAwardsSection.propTypes = propTypes;
