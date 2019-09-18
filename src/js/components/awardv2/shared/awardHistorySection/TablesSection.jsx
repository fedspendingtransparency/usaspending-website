/**
 * TablesSection.jsx
 * Created by David Trinh 12/10/18
 **/

import React from 'react';
import PropTypes from 'prop-types';

import TransactionsTableContainer from 'containers/awardV2/table/TransactionsTableContainer';
import FederalAccountTableContainer from 'containers/awardV2/table/FederalAccountTableContainer';
import { federalAccountFundingInfo, transactionHistoryInfo } from '../InfoTooltipContent';
import DetailsTabBar from '../../../award/details/DetailsTabBar';
import ResultsTablePicker from '../../../search/table/ResultsTablePicker';
import { getAwardHistoryCounts } from "../../../../helpers/awardHistoryHelper";

const propTypes = {
    overview: PropTypes.object,
    activeTab: PropTypes.string,
    clickTab: PropTypes.func
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
        tooltipContent: transactionHistoryInfo,
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

    componentDidUpdate(prevProps) {
        // check award changed
        if (this.props.overview.generatedId !== prevProps.overview.generatedId) {
            // reset the tab
            this.props.clickTab('transaction');
        }
    }

    componentWillUnmount() {
        // stop watching for size changes
        window.removeEventListener('resize', this.setTableWidth);
    }

    setTableWidth() {
        const tableWidth = this.tableWidthController.clientWidth - 2;
        this.setState({ tableWidth });
    }

    getTabOptions(award = this.props.overview) {
        const isIdv = award.category === 'idv';
        return tabs
            .filter((tab) => ((isIdv && tab.internal !== 'subaward') || !isIdv))
            .map(async (tab) => {
                // const count = await getAwardHistoryCounts(tab.internal, award.id).promise;
                return { ...tab, count: 10 };
            });
    }

    currentSection() {
        switch (this.props.activeTab) {
            case 'transaction':
                return (
                    <TransactionsTableContainer
                        category={this.props.overview.category}
                        tableWidth={this.state.tableWidth} />
                );
            case 'federal_account':
                return (
                    <FederalAccountTableContainer
                        category={this.props.overview.category}
                        tableWidth={this.state.tableWidth} />
                );
            default:
                return null;
        }
    }

    render() {
        const content = this.currentSection();
        const tabOptions = this.getTabOptions();

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
}

TablesSection.propTypes = propTypes;
