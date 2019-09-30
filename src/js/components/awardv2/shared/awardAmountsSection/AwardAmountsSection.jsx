import React from 'react';
import PropTypes from 'prop-types';

import AwardSection from '../AwardSection';
import AwardSectionHeader from '../AwardSectionHeader';
import AwardAmountsChart from './charts/AwardAmountsChart';
import AwardAmountsTable from './AwardAmountsTable';
import { AWARD_OVERVIEW_AWARD_AMOUNTS_SECTION_PROPS, AWARD_TYPE_PROPS } from '../../../../propTypes';
import { determineSpendingScenario, getAscendingSpendingCategoriesByAwardType } from '../../../../helpers/awardAmountHelper';
import JumpToSectionButton from './JumpToSectionButton';
import { ContractAwardAmountsInfo, GrantAwardAmountsInfo, LoanAwardAmountsInfo } from '../InfoTooltipContent';

const propTypes = {
    awardType: AWARD_TYPE_PROPS,
    awardOverview: AWARD_OVERVIEW_AWARD_AMOUNTS_SECTION_PROPS,
    jumpToTransactionHistoryTable: PropTypes.func
};

const tooltipByAwardType = {
    contract: ContractAwardAmountsInfo,
    grant: GrantAwardAmountsInfo,
    loan: LoanAwardAmountsInfo
};

const AwardAmountsSection = ({
    awardOverview,
    awardType,
    jumpToTransactionHistoryTable
}) => {
    const spendingScenario = determineSpendingScenario(...getAscendingSpendingCategoriesByAwardType(awardType, awardOverview));
    const tooltip = tooltipByAwardType[awardType];
    return (
        <AwardSection type="column" className="award-viz award-amounts">
            <div className="award__col__content">
                <AwardSectionHeader title="$ Award Amounts" tooltip={tooltip} />
                <div className="award-amounts__content">
                    <AwardAmountsChart
                        awardOverview={awardOverview}
                        awardType={awardType}
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
};

AwardAmountsSection.propTypes = propTypes;
export default AwardAmountsSection;
