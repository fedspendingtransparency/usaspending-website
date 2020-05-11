/**
 * AccountSpending.jsx
 * Created by Lizzie Salita 5/8/20
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import CountTabContainer from 'containers/agency/v2/accountSpending/CountTabContainer';

const propTypes = {
    fy: PropTypes.string,
    agencyId: PropTypes.string
};

const tabs = [
    {
        type: 'budget_function',
        label: 'Total Budget Functions',
        description: 'What were the major categories of spending?',
        subHeading: 'Budget Sub-Functions',
        countField: 'budget_function_count',
        subCountField: 'budget_sub_function_count'
    },
    {
        type: 'program_activity',
        label: 'Total Program Activities',
        description: 'What were the purposes of this agency’s spending?',
        countField: 'program_activity_count'
    },
    {
        type: 'object_class',
        label: 'Total Object Classes',
        description: 'What types of things did this agency purchase?',
        countField: 'object_class_count'
    },
    {
        type: 'federal_account',
        label: 'Total Federal Accounts',
        description: 'What accounts funded this agency’s spending?',
        subHeading: 'Treasury Accounts',
        countField: 'federal_account_count',
        subCountField: 'treasury_account_count'
    }
];

const AccountSpending = ({ agencyId, fy }) => {
    const [activeTab, setActiveTab] = useState('budget_function');
    return (
        <div className="body__content">
            <div className="count-tabs">
                <div className="count-tabs__questions">
                    {tabs.map((tab) => (
                        <div key={tab.type}>
                            {tab.description}
                        </div>
                    ))}
                </div>
                <div className="count-tabs__buttons">
                    {tabs.map((tab) => (
                        <CountTabContainer
                            key={tab.type}
                            agencyId={agencyId}
                            fy={fy}
                            {...tab}
                            setActiveTab={setActiveTab}
                            active={activeTab === tab.type} />
                    ))}
                </div>
            </div>
        </div>
    );
};

AccountSpending.propTypes = propTypes;
export default AccountSpending;
