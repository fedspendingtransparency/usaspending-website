/**
 * AggregatedAwardAmounts.jsx
 * Created by David Trinh 2/8/19
 **/

import React from 'react';
import PropTypes from 'prop-types';
import { formatNumber } from 'helpers/moneyFormatter';

import { determineSpendingScenarioByAwardType } from 'helpers/awardAmountHelper';
import ChartError from 'components/search/visualizations/ChartError';
import AwardsBanner from './AwardsBanner';
import { AWARD_AGGREGATED_AMOUNTS_PROPS } from '../../../../propTypes';
import AwardAmountsTable from '../../shared/awardAmounts/AwardAmountsTable';
import AwardAmountsChart from '../../shared/awardAmounts/AwardAmountsChart';
import JumpToSectionButton from '../../shared/awardAmounts/JumpToSectionButton';

const propTypes = {
    awardAmounts: AWARD_AGGREGATED_AMOUNTS_PROPS,
    inFlight: PropTypes.bool,
    error: PropTypes.bool,
    showFileC: PropTypes.bool,
    jumpToSection: PropTypes.func
};


export default class AggregatedAwardAmounts extends React.Component {
    constructor(props) {
        super(props);
        this.jumpToReferencedAwardsTable = this.jumpToReferencedAwardsTable.bind(this);
    }

    jumpToReferencedAwardsTable() {
        this.props.jumpToSection('referenced-awards');
    }

    render() {
        if (this.props.inFlight) {
            // API request is still pending
            return (
                <div className="visualization-message-container">
                    <div className="visualization-loading">
                        <div className="message">
                            Gathering your data...
                        </div>
                    </div>
                </div>);
        }
        else if (this.props.error) {
            return (<ChartError />);
        }

        const { awardAmounts } = this.props;
        const spendingScenario = determineSpendingScenarioByAwardType("idv", awardAmounts);
        return (
            <div className="award-amounts__content">
                <AwardsBanner
                    jumpToReferencedAwardsTable={this.jumpToReferencedAwardsTable} />
                <AwardAmountsChart
                    showCaresActViz={this.props.showFileC}
                    awardOverview={awardAmounts}
                    awardType="idv"
                    spendingScenario={spendingScenario} />
                <div className="award-amounts-children__data-wrapper">
                    <div className="award-amounts-children__data-content">
                        <div>Count of Total Award Orders</div>
                        <span>
                            {formatNumber(awardAmounts.childAwardCount + awardAmounts.grandchildAwardCount)}
                        </span>
                    </div>
                    <div className="award-amounts-children__data-content">
                        <div>Count of Child Award Orders</div>
                        <span>{formatNumber(awardAmounts.childAwardCount)}</span>
                    </div>
                    <div className="award-amounts-children__data-content">
                        <div>Count of Grandchild Award Orders</div>
                        <span>{formatNumber(awardAmounts.grandchildAwardCount)}</span>
                    </div>
                </div>
                <JumpToSectionButton
                    linkText="View award orders table"
                    onClick={this.jumpToReferencedAwardsTable}
                    icon="table" />
                <AwardAmountsTable
                    awardAmountType="idv_aggregated"
                    showFileC={this.props.showFileC}
                    awardData={awardAmounts}
                    spendingScenario={spendingScenario} />
            </div>
        );
    }
}

AggregatedAwardAmounts.propTypes = propTypes;

