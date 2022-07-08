/**
 * AggregatedAwardAmountsTableWrapper.jsx
 * Created by Andrea Blackwell 07/08/2022
 **/

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Tabs } from "data-transparency-ui";

import AwardAmountsTable from "../../shared/awardAmounts/AwardAmountsTable";
import { AWARD_AMOUNT_TYPE_PROPS } from "../../../../propTypes";

const propTypes = {
    showFileC: PropTypes.bool,
    children: PropTypes.node,
    awardAmountType: AWARD_AMOUNT_TYPE_PROPS,
    awardData: PropTypes.shape({}),
    spendingScenario: PropTypes.string
};

const tabConfig = [
    {
        internal: 'overall',
        label: "Overall Spending"
    },
    {
        internal: 'infrastructure',
        label: "Infrastructure Spending"
    }
];

const AggregatedAwardAmountsTableWrapper = (props) => {
    const [activeTab, setActiveTab] = useState(tabConfig[0].internal);
    const { awardData } = props;

    const showInfrastructureTabs = () => (awardData._fileCObligatedInfrastructure > 0 || awardData._fileCOutlayInfrastructure > 0) && awardData._fileCObligated === 0 && awardData._fileCOutlay === 0;
    const switchTab = (tab) => {
        setActiveTab(tab);
    };

    return (
        <div className="award-amounts__content">
            <div style={{ display: showInfrastructureTabs() ? `block` : `none` }}>
                <Tabs
                    tablessStyle
                    active={activeTab}
                    switchTab={switchTab}
                    types={tabConfig} />
            </div>
            <AwardAmountsTable
                {...props}
                infrastructureSpending={activeTab} />
        </div>
    );
};

AggregatedAwardAmountsTableWrapper.propTypes = propTypes;

export default AggregatedAwardAmountsTableWrapper;
