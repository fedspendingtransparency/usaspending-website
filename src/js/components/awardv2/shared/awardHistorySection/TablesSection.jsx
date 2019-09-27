/**
 * TablesSection.jsx
 * Created by David Trinh 12/10/18
 **/

import React from 'react';
import PropTypes from 'prop-types';

import TransactionsTableContainer from 'containers/awardV2/table/TransactionsTableContainer';
import FederalAccountTableContainer from 'containers/awardV2/table/FederalAccountTableContainer';

import SubawardsContainer from '../../../../containers/award/subawards/SubawardsContainer';
import { federalAccountFundingInfo, transactionHistoryInfo, subAwardsTab } from '../InfoTooltipContent';
import DetailsTabBar from '../../../award/details/DetailsTabBar';
import ResultsTablePicker from '../../../search/table/ResultsTablePicker';
import { getAwardHistoryCounts } from "../../../../helpers/awardHistoryHelper";

const propTypes = {
    overview: PropTypes.object,
    activeTab: PropTypes.string,
    clickTab: PropTypes.func,
    awardId: PropTypes.string
};

const tabs = [
    {
        label: "Transaction History",
        internal: "transaction",
        enabled: true,
        tooltipContent: transactionHistoryInfo,
        tooltipProps: { wide: true }
    },
    {
        label: "Sub-Awards",
        internal: "subaward",
        enabled: true,
        tooltipContent: subAwardsTab,
        tooltipProps: { wide: true }
    },
    {
        label: "Federal Account Funding",
        internal: "federal_account",
        enabled: true,
        tooltipContent: federalAccountFundingInfo,
        tooltipProps: { wide: true }
    }
];

export default class TablesSection extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            tableWidth: 0,
            tabs
        };
        this.countRequest = null;
        this.setTableWidth = this.setTableWidth.bind(this);
    }

    componentDidMount() {
        // set the initial table width
        this.setTableWidth();
        // watch the window for size changes
        window.addEventListener('resize', this.setTableWidth);
        this.getCounts();
    }

    componentDidUpdate(prevProps) {
        // check award changed
        if (this.props.overview.generatedId !== prevProps.overview.generatedId) {
            // reset the tab
            this.props.clickTab('transaction');
            this.getCounts();
        }
    }

    componentWillUnmount() {
        // stop watching for size changes
        window.removeEventListener('resize', this.setTableWidth);
    }

    getCounts(award = this.props.overview) {
        if (this.countRequest) {
            this.countRequest.cancel();
        }

        const isIdvOrLoan = (award.category === 'idv' || award.category === 'loan');
        const tabsWithCounts = tabs
            .filter((tab) => ((!isIdvOrLoan || tab.internal !== 'subaward')))
            .map(async (tab) => {
                this.countRequest = getAwardHistoryCounts(tab.internal, award.generatedId);
                try {
                    const { data } = await this.countRequest.promise;
                    return { ...tab, count: data[`${tab.internal}s`] };
                }
                catch (error) {
                    console.log(`Error fetching ${tab.internal} counts: ${error}`);
                    return { ...tab, count: 'N/A' };
                }
            });

        Promise.all(tabsWithCounts)
            .then((result) => {
                this.setState({ tabs: result });
                this.countRequest = null;
            });
    }

    setTableWidth() {
        const tableWidth = this.tableWidthController.clientWidth - 2;
        this.setState({ tableWidth });
    }

    currentSection(activeTab = this.props.activeTab, overview = this.props.overview, tableWidth = this.state.tableWidth, awardId = this.props.awardId) {
        switch (activeTab) {
            case 'transaction':
                return (
                    <TransactionsTableContainer
                        category={overview.category}
                        tableWidth={tableWidth} />
                );
            case 'federal_account':
                return (
                    <FederalAccountTableContainer
                        category={overview.category}
                        tableWidth={tableWidth} />
                );
            case 'subaward':
                return (
                    <SubawardsContainer
                        tableWidth={tableWidth}
                        isV2
                        awardId={awardId} />
                );
            default:
                return null;
        }
    }

    render() {
        const content = this.currentSection();
        const tabOptions = this.state.tabs;

        if (tabOptions.length > 0) {
            return (
                <div className="tables-section">
                    <DetailsTabBar
                        tabOptions={tabOptions}
                        activeTab={this.props.activeTab}
                        clickTab={this.props.clickTab} />
                    <ResultsTablePicker
                        types={tabOptions}
                        active={this.props.activeTab}
                        switchTab={this.props.clickTab} />
                    <div
                        className="tables-width-master"
                        ref={(div) => {
                            // this is an empty div that scales via CSS
                            // the results table width will follow this div's width
                            this.tableWidthController = div;
                        }} />
                    <div className="tables-content">
                        {content}
                    </div>
                </div>
            );
        }
        return null;
    }
}

TablesSection.propTypes = propTypes;
