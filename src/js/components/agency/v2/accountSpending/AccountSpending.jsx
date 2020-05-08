/**
 * AccountSpending.jsx
 * Created by Lizzie Salita 5/8/20
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    fy: PropTypes.string,
    agencyId: PropTypes.string
};

const tabs = [
    {
        id: 'budget_function',
        label: 'Total Budget Functions',
        description: 'What were the major categories of spending?',
        subHeading: 'Budget Sub-Functions'
    },
    {
        id: 'program_activity',
        label: 'Total Program Activities',
        description: 'What were the purposes of this agency’s spending?',
        subHeading: ''
    },
    {
        id: 'object_class',
        label: 'Total Object Classes',
        description: 'What types of things did this agency purchase?',
        subHeading: ''
    },
    {
        id: 'federal_account',
        label: 'Total Federal Accounts',
        description: 'What accounts funded this agency’s spending?',
        subHeading: 'Treasury Accounts'
    }
];

const AccountSpending = ({ agencyId, fy }) => {
    const [activeTab, setActiveTab] = useState('budget_function');
    return (
        <div className="body__content">
            <p>{agencyId}</p>
            <p>{fy}</p>
        </div>
    );
};

AccountSpending.propTypes = propTypes;
export default AccountSpending;
