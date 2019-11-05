/**
 * AwardHistory.jsx
 * Created by David Trinh 12/10/2018
 **/

import React from 'react';
import PropTypes from 'prop-types';

import { tabs, awardTypesWithSubawards } from 'dataMapping/awardsv2/awardHistorySection';
import { getToolTipBySectionAndAwardType } from 'dataMapping/awardsv2/tooltips';
import TransactionsTableContainer from 'containers/awardV2/table/TransactionsTableContainer';
import FederalAccountTableContainer from 'containers/awardV2/table/FederalAccountTableContainer';
import SubawardsContainer from 'containers/awardV2/table/SubawardsContainer';
import ResultsTablePicker from 'components/search/table/ResultsTablePicker';
import { AwardLoop } from 'components/sharedComponents/icons/Icons';
import DetailsTabBar from 'components/award/details/DetailsTabBar';
import AwardSectionHeader from 'components/awardv2/shared/AwardSectionHeader';

import { getAwardHistoryCounts } from "../../../helpers/awardHistoryHelper";

const propTypes = {
    overview: PropTypes.object,
    setActiveTab: PropTypes.func,
    activeTab: PropTypes.string,
    awardId: PropTypes.string
};

export class AwardHistory extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tabs: [],
            tableWidth: 0
        };
        this.countRequest = null;
        this.setTableWidth = this.setTableWidth.bind(this);
        this.currentSection = this.currentSection.bind(this);
    }

    componentDidMount() {
        // set the initial table width
        this.setTableWidth();
        // watch the window for size changes
        window.addEventListener('resize', this.setTableWidth);
        this.setTableTabsAndGetCounts();
    }

    componentDidUpdate(prevProps) {
        // check award changed
        if (this.props.overview.generatedId !== prevProps.overview.generatedId) {
            // reset the tab
            this.props.setActiveTab('transaction');
            this.setTableTabsAndGetCounts();
        }
    }

    componentWillUnmount() {
        // stop watching for size changes
        window.removeEventListener('resize', this.setTableWidth);
    }

    setTableWidth() {
        if (!this.tableWidthController) return;
        const tableWidth = this.tableWidthController.clientWidth - 2;
        this.setState({ tableWidth });
    }

    setTableTabsAndGetCounts(award = this.props.overview) {
        if (this.countRequest) {
            this.countRequest.cancel();
        }

        const tabsWithCounts = tabs(award.category)
            .filter((tab) => {
                if (tab.internal === 'subaward' && !awardTypesWithSubawards.includes(award.category)) {
                    return false;
                }
                return true;
            })
            .map(async (tab) => {
                const isIdv = (award.category === 'idv');
                this.countRequest = getAwardHistoryCounts(tab.internal, award.generatedId, isIdv);
                try {
                    const { data } = await this.countRequest.promise;
                    if (isIdv && tab.internal === 'federal_account') {
                        // response object for idv federal account endpoint is { count: int }
                        return { ...tab, count: data.count };
                    }
                    // response object for all other count endpoints are { [tab.internal + s] int }
                    return { ...tab, count: data[`${tab.internal}s`] };
                }
                catch (error) {
                    console.log(`Error fetching ${tab.internal} counts: ${error}`);
                    return { ...tab, count: 'N/A' };
                }
            });

        return Promise.all(tabsWithCounts)
            .then((result) => {
                this.setState({ tabs: result }, this.setTableWidth);
                this.countRequest = null;
            });
    }

    currentSection(
        activeTab = this.props.activeTab,
        overview = this.props.overview,
        tableWidth = this.state.tableWidth,
        awardId = this.props.awardId
    ) {
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
                        awardId={awardId} />
                );
            default:
                return null;
        }
    }

    render() {
        const {
            overview,
            setActiveTab,
            activeTab
        } = this.props;
        const tabOptions = this.state.tabs;
        const sectionTitle = (overview.category === 'idv')
            ? "Award History for this IDV"
            : "Award History";
        const tooltip = getToolTipBySectionAndAwardType('awardHistory', overview.category);

        return (
            <div id="award-award-history" className="award-viz award-history">
                <AwardSectionHeader
                    title={sectionTitle}
                    icon={<AwardLoop alt="Award History" />}
                    tooltip={tooltip}
                    tooltipWide={(overview.category === 'contract')} />
                <div className="tables-section">
                    <DetailsTabBar
                        tabOptions={tabOptions}
                        activeTab={activeTab}
                        clickTab={setActiveTab} />
                    <ResultsTablePicker
                        types={tabOptions}
                        active={activeTab}
                        switchTab={setActiveTab} />
                    <div
                        className="tables-width-master"
                        ref={(div) => {
                            // this is an empty div that scales via CSS
                            // the results table width will follow this div's width
                            this.tableWidthController = div;
                        }} />
                    <div className="tables-content">
                        {this.currentSection()}
                    </div>
                </div>
            </div>
        );
    }
}

AwardHistory.propTypes = propTypes;

export default AwardHistory;
