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
import { AWARD_V2_AGGREGATED_AMOUNTS_PROPS } from '../../../../propTypes';
import AwardAmountsTable from '../../shared/awardAmountsSection/AwardAmountsTable';
import AwardAmountsChart from '../../shared/awardAmountsSection/charts/AwardAmountsChart';
import JumpToSectionButton from '../../shared/awardAmountsSection/JumpToSectionButton';

const propTypes = {
    awardAmounts: AWARD_V2_AGGREGATED_AMOUNTS_PROPS,
    inFlight: PropTypes.bool,
    error: PropTypes.bool,
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
                <AwardAmountsChart awardOverview={awardAmounts} awardType="idv" spendingScenario={spendingScenario} />
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
                <JumpToSectionButton linkText="View award orders table" onClick={this.jumpToReferencedAwardsTable} icon="table" />
                <AwardAmountsTable awardType="idv" awardData={awardAmounts} spendingScenario={spendingScenario} />
            </div>
        );
    }
}

AggregatedAwardAmounts.propTypes = propTypes;

