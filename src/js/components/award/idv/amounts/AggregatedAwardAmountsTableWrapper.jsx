/**
 * AggregatedAwardAmountsTableWrapper.jsx
 * Created by Andrea Blackwell 07/08/2022
 **/

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Tabs } from "data-transparency-ui";

import { generateDefcTabs } from 'helpers/awardAmountHelper';

import AwardAmountsTable from "../../shared/awardAmounts/AwardAmountsTable";
import { AWARD_AMOUNT_TYPE_PROPS } from "../../../../propTypes";

const propTypes = {
    showFileC: PropTypes.bool,
    children: PropTypes.node,
    awardAmountType: AWARD_AMOUNT_TYPE_PROPS,
    awardData: PropTypes.shape({}),
    spendingScenario: PropTypes.string
};

const AggregatedAwardAmountsTableWrapper = (props) => {
    const [activeTab, setActiveTab] = useState("overall");
    const { awardData } = props;

    const switchTab = (tab) => {
        setActiveTab(tab);
    };

    const tabTypes = generateDefcTabs(awardData);
    return (
        <div className="award-amounts__table-by-type" data-testid="award-amounts__table-by-type">
            {tabTypes.length > 0 &&
                <Tabs
                    tablessStyle
                    active={activeTab}
                    switchTab={switchTab}
                    types={tabTypes} />}
            <AwardAmountsTable
                {...props}
                fileCType={activeTab} />
        </div>
    );
};

AggregatedAwardAmountsTableWrapper.propTypes = propTypes;

export default AggregatedAwardAmountsTableWrapper;
