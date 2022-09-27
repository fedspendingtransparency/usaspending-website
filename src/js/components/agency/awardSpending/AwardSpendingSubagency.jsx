/**
 * AwardSpendingSubagency.jsx
 * Created by Afna Saifudeen 8/4/21
 */

import React, { useRef } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import { Tabs } from 'data-transparency-ui';
import SubAgencySummaryContainer from 'containers/agency/awardSpending/SubAgencySummaryContainer';
import SubagencyTableContainer from 'containers/agency/awardSpending/SubagencyTableContainer';
import { useStateWithPrevious } from 'helpers';
import Note from 'components/sharedComponents/Note';
import AwardSpendingIntro from "./AwardSpendingIntro";

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
    const { overview, subagencyCount } = useSelector((state) => state.agency);
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
            <AwardSpendingIntro name={overview.name} />
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
            <Note message={(
                <>
                The sub-agencies presented in this section represent
                awarding organizations and were sourced from the General Services
                Administration (GSA) Federal Hierarchy (available at{ ' ' }
                    <a
                        href="https://sam.gov/content/hierarchy"
                        target="_blank"
                        rel="noopener noreferrer">
                        https://sam.gov/content/hierarchy
                    </a>
                ). This award hierarchy establishes the relationship between a
                department or independent agency’s sub-tiers and its offices and is used
                by federal agencies as the authoritative source for managing federal
                funding and awarding organizations.
                </>)} />
        </div>
    );
};

AwardSpendingSubagency.propTypes = propTypes;
export default AwardSpendingSubagency;
