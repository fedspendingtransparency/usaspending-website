/**
 * AwardSpendingSubagency.jsx
 * Created by Afna Saifudeen 8/4/21
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Tabs } from 'data-transparency-ui';
import SubAgencySummaryContainer from 'containers/agencyV2/awardSpending/SubAgencySummaryContainer';

const propTypes = {
    fy: PropTypes.string,
    agencyId: PropTypes.string
};

export const tabs = [
    {
        internal: 'all',
        label: 'All Awards'
    },
    {
        internal: 'contracts',
        label: 'Contracts'
    },
    {
        internal: 'idvs',
        label: 'Contract IDVs'
    },
    {
        internal: 'grants',
        label: 'Grants'
    },
    {
        internal: 'loans',
        label: 'Loans'
    },
    {
        internal: 'direct_payments',
        label: 'Direct Payments'
    },
    {
        internal: 'other',
        label: 'Other Financial Assistance'
    }
];

const initialActiveTabState = {
    internal: tabs[0].internal,
    subtitle: tabs[0].label
};

const AwardSpendingSubagency = ({ fy }) => {
    const summaryData = [
        {
            type: 'subagenciesCount',
            title: 'Number of Sub-Agencies'
        },
        {
            type: 'awardObligations',
            title: 'Award Obligations',
            isMonetary: true
        },
        {
            type: 'numberOfTransactions',
            title: 'Number of Transactions'
        },
        {
            type: 'numberOfAwards',
            title: 'Number of New Awards'
        }
    ];
    const [activeTab, setActiveTab] = useState(initialActiveTabState);

    const changeActiveTab = (tab) => {
        const tabSubtitle = tabs.find((item) => item.internal === tab).label;
        const tabInternal = tabs.find((item) => item.internal === tab).internal;

        setActiveTab({
            internal: tabInternal,
            subtitle: tabSubtitle
        });
    };

    return (
        <div className="body__content agency-budget-category">
            <Tabs active={activeTab.internal} types={tabs} switchTab={changeActiveTab} />
            <SubAgencySummaryContainer
                fy={fy}
                summaryData={summaryData}
                activeTab={activeTab.internal} />
        </div>
    );
};

AwardSpendingSubagency.propTypes = propTypes;
export default AwardSpendingSubagency;
