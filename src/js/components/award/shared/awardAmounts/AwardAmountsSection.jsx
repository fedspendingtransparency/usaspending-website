import React, { useState, useEffect } from 'react';
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
    const spendingScenario = determineSpendingScenarioByAwardType(awardType, awardOverview, active === "infrastructure");
    const tooltip = getToolTipBySectionAndAwardType('awardAmounts', awardType);

    const [active, setActive] = useState(null);

    const switchTab = (tab) => {
        setActive(tab);
    };

    // Filter out cases where award has both covid and infrastructure spending (ie. only show covid chart for now)

    const tabTypes = generateDefcTabs(awardOverview);

    useEffect(() => {
        if (tabTypes.length > 0) {
            setActive(tabTypes[0].internal);
        }
    }, [tabTypes]);

    return (
        <AwardSection type="column" className="award-viz award-amounts">
            <div className="award__col__content">
                <AwardSectionHeader title="$ Award Amounts" tooltip={tooltip} />
                <div className="award-amounts__content">
                    {active &&
                        <div style={{ paddingBottom: '20px' }}>
                            <Tabs
                                active={active}
                                switchTab={switchTab}
                                types={tabTypes}/>
                        </div>
                    }
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
                        infrastructureSpending={active}
                        fileCType={active} />
                </div>
            </div>
            <JumpToSectionButton icon="table" linkText="View Transaction History" onClick={jumpToTransactionHistoryTable} />
        </AwardSection>
    );
};

AwardAmountsSection.propTypes = propTypes;
export default AwardAmountsSection;
