/**
 * BudgetCategories.jsx
 * Created by James Lee 6/5/20
 */

import React, { useState } from 'react';
import BudgetCategoriesCountTabContainer from 'containers/covid19/budgetCategories/BudgetCategoriesCountTabContainer';
import BudgetCategoriesTableContainer from 'containers/covid19/budgetCategories/BudgetCategoriesTableContainer';

const tabs = [
    {
        type: 'def_codes',
        label: 'DEF Codes',
        description: 'What legislative acts funded this spending?',
        countField: 'def_codes_count'
    },
    {
        type: 'agencies',
        label: 'Agencies',
        description: 'What agencies did the spending?',
        countField: 'agencies_count'
    },
    {
        type: 'object_classes',
        label: 'Object Classes',
        description: 'What types of things did this agency purchase?',
        countField: 'object_classes_count'
    },
    {
        type: 'program_activities',
        label: 'Program Activities',
        description: 'What were the purposes of this agency’s spending?',
        countField: 'program_activities_count'
    },
    {
        type: 'federal_accounts',
        label: 'Federal Accounts',
        description: 'What accounts funded this agency’s spending?',
        subHeading: 'Treasury Accounts',
        countField: 'federal_accounts_count',
        subCountField: 'treasury_accounts_count'
    }
];

const BudgetCategories = () => {
    const [activeTab, setActiveTab] = useState('def_codes');
    const subHeading = tabs.find((tab) => tab.type === activeTab).subHeading;
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
                        <BudgetCategoriesCountTabContainer
                            key={tab.type}
                            {...tab}
                            setActiveTab={setActiveTab}
                            active={activeTab === tab.type} />
                    ))}
                </div>
                <BudgetCategoriesTableContainer
                    type={activeTab}
                    subHeading={subHeading} />
            </div>
        </div>
    );
};

export default BudgetCategories;
