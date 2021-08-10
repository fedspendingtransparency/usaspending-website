/**
 * AwardSpendingSubagency.jsx
 * Created by Afna Saifudeen 8/4/21
 */

import React from 'react';
import PropTypes from 'prop-types';

import { Tabs } from 'data-transparency-ui';
import { useStateWithPrevious } from 'helpers';

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

const AwardSpendingSubagency = () => {
    const [activeTab, setActiveTab] = useStateWithPrevious('all');
    return (
        <div className="body__content agency-budget-category">
            <Tabs types={tabs} switchTab={setActiveTab} active={activeTab} />
        </div>
    );
};

AwardSpendingSubagency.propTypes = propTypes;
export default AwardSpendingSubagency;
