import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { determineSpendingScenarioByAwardType } from 'helpers/awardAmountHelper';
import { getToolTipBySectionAndAwardType } from 'dataMapping/award/tooltips';
import ResultsTableTabs from 'components/search/table/ResultsTableTabs';

import AwardSection from '../AwardSection';
import AwardSectionHeader from '../AwardSectionHeader';
import AwardAmountsChart from './AwardAmountsChart';
import AwardAmountsTable from './AwardAmountsTable';
import JumpToSectionButton from './JumpToSectionButton';
import { AWARD_OVERVIEW_AWARD_AMOUNTS_SECTION_PROPS, AWARD_TYPE_PROPS } from '../../../../propTypes';

const propTypes = {
    awardType: AWARD_TYPE_PROPS,
    awardOverview: AWARD_OVERVIEW_AWARD_AMOUNTS_SECTION_PROPS,
    jumpToTransactionHistoryTable: PropTypes.func
};

const tabTypes = [
    {
        internal: 'overall',
        label: 'Overall Spending'
    },
    {
        internal: 'infrastructure',
        label: 'Infrastructure Spending'
    }
];

// how do know if there's covid spending an
const AwardAmountsSection = ({
    awardOverview,
    awardType,
    jumpToTransactionHistoryTable
}) => {
    const spendingScenario = determineSpendingScenarioByAwardType(awardType, awardOverview);
    const tooltip = getToolTipBySectionAndAwardType('awardAmounts', awardType);
    const [active, setActive] = useState(tabTypes[0].internal);

    const switchTab = (tab) => {
        setActive(tab);
    };

    const showInfrastructureTabs = () => {
        return (awardOverview._combinedOutlay > 0 || awardOverview._totalOutlay > 0)
            && (awardOverview._fileCOutlayInfrastructure > 0 || awardOverview._fileCObligatedInfrastructure > 0);
    };

    return (
        <AwardSection type="column" className="award-viz award-amounts">
            <div className="award__col__content">
                <AwardSectionHeader title="$ Award Amounts" tooltip={tooltip} />
                <div className="award-amounts__content">
                     <div style={{ display: showInfrastructureTabs() ? `block` : `none` }}>
                        <ResultsTableTabs
                            types={tabTypes}
                            active={active}
                            switchTab={switchTab}
                            hideCounts />
                     </div>
                    <AwardAmountsChart
                        awardOverview={awardOverview}
                        awardType={awardType}
                        spendingScenario={spendingScenario}
                        infrastructureSpending={active} />
                    <AwardAmountsTable
                        showFileC={(
                            (
                                awardOverview._fileCObligated !== 0 ||
                                awardOverview._fileCOutlay !== 0
                            )
                        )}
                        awardData={awardOverview}
                        awardAmountType={awardType}
                        spendingScenario={spendingScenario} />
                </div>
            </div>
            <JumpToSectionButton icon="table" linkText="View Transaction History" onClick={jumpToTransactionHistoryTable} />
        </AwardSection>
    );
};

AwardAmountsSection.propTypes = propTypes;
export default AwardAmountsSection;
