import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Tabs } from "data-transparency-ui";

import { determineSpendingScenarioByAwardType, generateDefcTabs } from 'helpers/awardAmountHelper';
import { getToolTipBySectionAndAwardType } from 'dataMapping/award/tooltips';

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

const AwardAmountsSection = ({
    awardOverview,
    awardType,
    jumpToTransactionHistoryTable
}) => {
    const [active, setActive] = useState("overall");

    const spendingScenario = determineSpendingScenarioByAwardType(awardType, awardOverview, active === "infrastructure");
    const tooltip = getToolTipBySectionAndAwardType('awardAmounts', awardType);

    const switchTab = (tab) => {
        setActive(tab);
    };

    const tabTypes = generateDefcTabs(awardOverview);

    return (
        <AwardSection type="column" className="award-viz award-amounts">
            <div className="award__col__content">
                <AwardSectionHeader title="$ Award Amounts" tooltip={tooltip} />
                <div className="award-amounts__content">
                    {tabTypes.length > 0 &&
                        <div style={{ paddingBottom: '20px' }}>
                            <Tabs
                                active={active}
                                switchTab={switchTab}
                                types={tabTypes} />
                        </div>
                    }
                    <AwardAmountsChart
                        awardOverview={awardOverview}
                        awardType={awardType}
                        spendingScenario={spendingScenario}
                        fileCType={active} />
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
                        fileCType={active} />
                </div>
            </div>
            <JumpToSectionButton icon="table" linkText="View Transaction History" onClick={jumpToTransactionHistoryTable} />
        </AwardSection>
    );
};

AwardAmountsSection.propTypes = propTypes;
export default AwardAmountsSection;
