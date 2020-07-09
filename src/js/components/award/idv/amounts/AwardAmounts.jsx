/**
 * AwardAmounts.jsx
 * Created by Lizzie Salita 10/12/18
 **/

import React from 'react';
import PropTypes from 'prop-types';
import { TooltipWrapper } from 'data-transparency-ui';

import { determineSpendingScenarioByAwardType } from 'helpers/awardAmountHelper';
import GlobalConstants from 'GlobalConstants';
import BaseAwardAmounts from 'models/v2/award/BaseAwardAmounts';
import IdvAwardAmountsSectionContainer from 'containers/award/idv/IdvAwardAmountsSectionContainer';
import ResultsTableTabs from 'components/search/table/ResultsTableTabs';
import ResultsTablePicker from 'components/search/table/ResultsTablePicker';
import AwardAmountsTable from 'components/award/shared/awardAmountsSection/AwardAmountsTable';
import { awardAmountsInfo } from '../../shared/InfoTooltipContent';

const propTypes = {
    overview: PropTypes.object,
    jumpToSection: PropTypes.func
};

export default class AwardAmounts extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            active: 'awards'
        };

        this.switchTab = this.switchTab.bind(this);
    }
    switchTab(tab) {
        this.setState({
            active: tab
        });
    }
    render() {
        const tabTypes = [
            {
                enabled: true,
                internal: 'awards',
                label: 'Award Orders Under this IDV'
            },
            {
                enabled: true,
                internal: 'idv',
                label: 'This IDV'
            }
        ];

        const awards = Object.create(BaseAwardAmounts);
        awards.populate(this.props.overview, 'idv');
        const content = this.state.active === 'awards' ? (
            <IdvAwardAmountsSectionContainer
                jumpToSection={this.props.jumpToSection} />
        ) : (
            <AwardAmountsTable
                showFileC={(GlobalConstants.CARES_ACT_RELEASED && awards._showFileC)}
                awardData={awards}
                awardAmountType="idv"
                spendingScenario={determineSpendingScenarioByAwardType("idv", awards)} />
        );
        const tabsClassName = 'idv-award-amounts-tabs';
        return (
            <div className="award__col award-viz award-amounts">
                <div className="award-viz__heading">
                    <h3 className="award-viz__title">
                        $ Award Amounts
                    </h3>
                    <TooltipWrapper
                        className="award-section-tt"
                        icon="info"
                        wide
                        tooltipComponent={awardAmountsInfo} />
                </div>
                <hr />
                <div className="award-viz__tabs">
                    <ResultsTableTabs
                        types={tabTypes}
                        active={this.state.active}
                        switchTab={this.switchTab}
                        tabsClassName={tabsClassName}
                        hideCounts />
                    <ResultsTablePicker
                        types={tabTypes}
                        active={this.state.active}
                        switchTab={this.switchTab} />
                </div>
                {content}
            </div>
        );
    }
}
AwardAmounts.propTypes = propTypes;
