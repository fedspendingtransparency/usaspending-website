/**
 * AwardSpendingSubagency.jsx
 * Created by Afna Saifudeen 8/4/21
 */

import React, { useRef } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import { Tabs } from 'data-transparency-ui';
import SubAgencySummaryContainer from 'containers/agencyV2/awardSpending/SubAgencySummaryContainer';
import SubagencyTableContainer from 'containers/agencyV2/awardSpending/SubagencyTableContainer';
import { useStateWithPrevious } from 'helpers';
import AwardSpendingNotes from './AwardSpendingNotes';

const propTypes = {
    fy: PropTypes.string
};

export const awardTabs = [
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

const summaryData = [
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

const initialActiveTabState = {
    internal: awardTabs[0].internal,
    subtitle: awardTabs[0].label
};

const AwardSpendingSubagency = ({ fy }) => {
    const { subagencyCount } = useSelector((state) => state.agencyV2);
    const [prevActiveTab, activeTab, setActiveTab] = useStateWithPrevious(initialActiveTabState);

    const moreOptionsTabsRef = useRef(null);

    const subagencyData = subagencyCount;

    const changeActiveTab = (tab) => {
        const tabSubtitle = awardTabs.find((item) => item.internal === tab).label;
        const tabInternal = awardTabs.find((item) => item.internal === tab).internal;

        setActiveTab({
            internal: tabInternal,
            subtitle: tabSubtitle
        });
    };

    return (
        <div className="body__content">
            <div ref={moreOptionsTabsRef}>
                <Tabs active={activeTab.internal} types={awardTabs} switchTab={changeActiveTab} />
            </div>
            <SubAgencySummaryContainer
                fy={fy}
                summaryData={summaryData}
                data={subagencyData}
                activeTab={activeTab.internal} />
            <SubagencyTableContainer
                fy={fy}
                type={activeTab.internal}
                prevType={prevActiveTab.internal}
                subHeading="Offices" />
            <AwardSpendingNotes />
        </div>
    );
};

AwardSpendingSubagency.propTypes = propTypes;
export default AwardSpendingSubagency;
