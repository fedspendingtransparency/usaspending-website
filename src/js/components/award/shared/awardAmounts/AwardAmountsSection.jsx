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

const AwardAmountsSection = ({
    awardOverview,
    awardType,
    jumpToTransactionHistoryTable
}) => {
    const [active, setActive] = useState(tabTypes[0].internal);
    const spendingScenario = determineSpendingScenarioByAwardType(awardType, awardOverview, active === "infrastructure");
    const tooltip = getToolTipBySectionAndAwardType('awardAmounts', awardType);

    const switchTab = (tab) => {
        setActive(tab);
    };

    // Filter out cases where award has both covid and infrastructure spending (ie. only show covid chart for now)
    const showInfrastructureTabs = () => (awardOverview._fileCObligatedInfrastructure > 0 || awardOverview._fileCOutlayInfrastructure > 0) && awardOverview._fileCObligated === 0 && awardOverview._fileCOutlay === 0;

    return (
        <AwardSection type="column" className="award-viz award-amounts">
            <div className="award__col__content">
                <AwardSectionHeader title="$ Award Amounts" tooltip={tooltip} />
                <div className="award-amounts__content">
                    <div style={{ display: showInfrastructureTabs() ? `block` : `none`, paddingBottom: showInfrastructureTabs() ? '20px' : '' }}>
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
                        spendingScenario={spendingScenario}
                        infrastructureSpending={active} />
                </div>
            </div>
            <JumpToSectionButton icon="table" linkText="View Transaction History" onClick={jumpToTransactionHistoryTable} />
        </AwardSection>
    );
};

AwardAmountsSection.propTypes = propTypes;
export default AwardAmountsSection;
