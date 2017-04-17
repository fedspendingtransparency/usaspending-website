/**
 * DetailsSection.jsx
 * Created by Elizabeth Dabbs 2/22/17
 **/

import React from 'react';

import ContractTransactionsTableContainer from
    'containers/award/table/ContractTransactionsTableContainer';
import AssistanceTransactionsTableContainer from
    'containers/award/table/AssistanceTransactionsTableContainer';
import FinancialSystemTableContainer from 'containers/award/table/FinancialSystemTableContainer';

import SubawardsContainer from 'containers/award/subawards/SubawardsContainer';

import DetailsTabBar from './DetailsTabBar';
import ContractAdditionalDetails from './additional/ContractAdditionalDetails';
import AssistanceAdditionalDetails from './additional/AssistanceAdditionalDetails';

const propTypes = {
    award: React.PropTypes.object,
    isContract: React.PropTypes.bool,
    activeTab: React.PropTypes.string,
    clickTab: React.PropTypes.func
};

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

    componentWillReceiveProps(nextProps) {
        // check award changed
        if (this.props.award.selectedAward.id !== nextProps.award.selectedAward.id) {
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
        switch (this.props.activeTab) {
            case 'transaction':
                if (this.props.isContract) {
                    return (<ContractTransactionsTableContainer
                        tableWidth={this.state.tableWidth} />);
                }
                return (<AssistanceTransactionsTableContainer
                    tableWidth={this.state.tableWidth} />);

            case 'subaward':
                return (<SubawardsContainer
                    tableWidth={this.state.tableWidth} />);

            case 'financial':
                return (<FinancialSystemTableContainer
                    {...this.props}
                    tableWidth={this.state.tableWidth} />);

            case 'additional':
                if (this.props.isContract) {
                    return (<ContractAdditionalDetails {...this.props} />);
                }
                return (<AssistanceAdditionalDetails {...this.props} />);

            default:
                return null;
        }
    }

    render() {
        const content = this.currentSection();

        return (
            <div className="contract-details-table-section" id="details-table-section">
                <DetailsTabBar
                    activeTab={this.props.activeTab}
                    clickTab={this.props.clickTab} />
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
