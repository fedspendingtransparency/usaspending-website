import React from 'react';
import PropTypes from 'prop-types';

import AwardSection from '../AwardSection';
import AwardSectionHeader from '../AwardSectionHeader';
import AwardAmountsChart from './charts/AwardAmountsChart';
import AwardAmountsTable from './AwardAmountsTable';
import { AWARD_OVERVIEW_AWARD_AMOUNTS_SECTION_PROPS, TOOLTIP_PROPS, AWARD_TYPE_PROPS } from '../../../../propTypes';
import { determineSpendingScenario } from '../../../../helpers/aggregatedAmountsHelper';
import JumpToSectionButton from './JumpToSectionButton';

const propTypes = {
    awardType: AWARD_TYPE_PROPS,
    awardOverview: AWARD_OVERVIEW_AWARD_AMOUNTS_SECTION_PROPS,
    tooltipProps: TOOLTIP_PROPS,
    jumpToTransactionHistoryTable: PropTypes.func
};

const financialAssistanceAwardTypes = ['grant', 'direct payment', 'loan', 'other'];

export default class AwardAmounts extends React.Component {
    render() {
        const { awardOverview, awardType, jumpToTransactionHistoryTable } = this.props;
        const spendingScenario = financialAssistanceAwardTypes.includes(awardType)
            ? 'normal'
            : determineSpendingScenario(awardOverview);
        return (
            <AwardSection type="column" className="award-viz award-amounts">
                <div className="award__col__content">
                    <AwardSectionHeader title="$ Award Amounts" />
                    <div className="award-amounts__content">
                        <AwardAmountsChart
                            awardOverview={this.props.awardOverview}
                            awardType={this.props.awardType}
                            spendingScenario={spendingScenario} />
                        <AwardAmountsTable
                            awardData={awardOverview}
                            awardType={awardType}
                            spendingScenario={spendingScenario} />
                    </div>
                </div>
                <JumpToSectionButton icon="table" linkText="View Transaction History" onClick={jumpToTransactionHistoryTable} />
            </AwardSection>
        );
    }
}

AwardAmounts.propTypes = propTypes;
