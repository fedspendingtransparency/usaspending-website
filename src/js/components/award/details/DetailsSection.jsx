/**
 * DetailsSection.jsx
 * Created by Elizabeth Dabbs 2/22/17
 **/

import React from 'react';
import PropTypes from 'prop-types';
import { concat } from 'lodash';

import TransactionsTableContainer from 'containers/award/table/TransactionsTableContainer';
import FinancialSystemTableContainer from 'containers/award/table/FinancialSystemTableContainer';

import SubawardsContainer from 'containers/award/subawards/SubawardsContainer';

import DetailsTabBar from './DetailsTabBar';
import ContractAdditionalDetails from './additional/ContractAdditionalDetails';
import ResultsTablePicker from '../../search/table/ResultsTablePicker';

const propTypes = {
    selectedAward: PropTypes.object,
    activeTab: PropTypes.string,
    clickTab: PropTypes.func
};

const commonTabs = [
    {
        label: 'Transaction History',
        internal: 'transaction',
        enabled: true
    },
    {
        label: 'Sub-Awards',
        internal: 'subaward',
        enabled: true
    },
    {
        label: 'Financial System Details',
        internal: 'financial',
        enabled: true
    }
];

export default class DetailsSection extends React.Component {
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
        if (this.props.selectedAward.internalId !== prevProps.selectedAward.internalId) {
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

    currentSection() {
        const category = this.props.selectedAward.category;
        switch (this.props.activeTab) {
            case 'transaction':
                return (
                    <TransactionsTableContainer
                        category={category}
                        tableWidth={this.state.tableWidth} />
                );

            case 'subaward':
                return (
                    <SubawardsContainer
                        tableWidth={this.state.tableWidth} />
                );

            case 'financial':
                return (
                    <FinancialSystemTableContainer
                        {...this.props}
                        tableWidth={this.state.tableWidth} />
                );

            case 'additional':
                if (category === 'contract' || category === 'idv') {
                    return (
                        <ContractAdditionalDetails
                            selectedAward={this.props.selectedAward} />
                    );
                }
                return null;

            default:
                return null;
        }
    }

    render() {
        const content = this.currentSection();

        const tabs = concat([], commonTabs);

        if (this.props.selectedAward.category === 'contract'
            || this.props.selectedAward.category === 'idv') {
            tabs.push({
                label: 'Additional Details',
                internal: 'additional',
                enabled: true
            });
        }

        return (
            <div className="contract-details-table-section" id="details-table-section">
                <DetailsTabBar
                    tabOptions={tabs}
                    activeTab={this.props.activeTab}
                    clickTab={this.props.clickTab} />
                <ResultsTablePicker
                    types={tabs}
                    active={this.props.activeTab}
                    switchTab={this.props.clickTab} />
                <div
                    className="details-table-width-master"
                    ref={(div) => {
                        // this is an empty div that scales via CSS
                        // the results table width will follow this div's width
                        this.tableWidthController = div;
                    }} />
                <div className="contract-details-table">
                    {content}
                </div>
            </div>
        );
    }
}

DetailsSection.propTypes = propTypes;
