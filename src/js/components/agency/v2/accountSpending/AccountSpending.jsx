/**
 * AccountSpending.jsx
 * Created by Lizzie Salita 5/8/20
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';

import CountTab from '../CountTab';

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
            <div className="count-tabs">
                <div className="count-tabs__questions">
                    {tabs.map((tab) => (
                        <div key={tab.id}>
                            {tab.description}
                        </div>
                    ))}
                </div>
                <div className="count-tabs__buttons">
                    {tabs.map((tab) => (
                        <CountTab
                            key={tab.id}
                            agencyId={agencyId}
                            fy={fy}
                            {...tab}
                            setActiveTab={setActiveTab}
                            active={activeTab === tab.id} />
                    ))}
                </div>
            </div>
        </div>
    );
};

AccountSpending.propTypes = propTypes;
export default AccountSpending;
