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

import DetailsTabBar from './DetailsTabBar';
import AdditionalDetails from './additional/AdditionalDetails';

const propTypes = {
    award: React.PropTypes.object,
    isContract: React.PropTypes.bool
};

const defaultTab = 'transaction';

export default class DetailsSection extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            tableWidth: 0,
            activeTab: defaultTab
        };

        this.setTableWidth = this.setTableWidth.bind(this);
        this.clickTab = this.clickTab.bind(this);
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
            this.setState({
                activeTab: defaultTab
            });
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

    clickTab(tab) {
        this.setState({
            activeTab: tab
        });
    }

    currentSection() {
        switch (this.state.activeTab) {
            case 'transaction':
                if (this.props.isContract) {
                    return (<ContractTransactionsTableContainer
                        tableWidth={this.state.tableWidth} />);
                }
                return (<AssistanceTransactionsTableContainer
                    tableWidth={this.state.tableWidth} />);

            case 'financial':
                return (<FinancialSystemTableContainer
                    {...this.props}
                    tableWidth={this.state.tableWidth} />);

            case 'additional':
                return (<AdditionalDetails {...this.props} />);

            default:
                return null;
        }
    }

    render() {
        const content = this.currentSection();

        return (
            <div className="contract-details-table-section" id="details-table-section">
                <DetailsTabBar
                    activeTab={this.state.activeTab}
                    clickTab={this.clickTab} />
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
