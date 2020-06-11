/**
 * BudgetCategories.jsx
 * Created by James Lee 6/5/20
 */

import React, { useState, useEffect } from 'react';
import BudgetCategoriesCountTabContainer from 'containers/covid19/budgetCategories/BudgetCategoriesCountTabContainer';
import BudgetCategoriesTableContainer from 'containers/covid19/budgetCategories/BudgetCategoriesTableContainer';

const tabs = [
    {
        type: 'federal_accounts',
        label: 'Federal Accounts',
        description: 'What accounts funded this response?',
        subHeading: 'Treasury Accounts',
        countField: 'federal_account_count',
        subCountField: 'treasury_account_count'
    },
    {
        type: 'def_codes',
        label: 'Public Laws',
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
        description: 'What items or services were purchased',
        countField: 'object_class_count'
    }
];

const BudgetCategories = () => {
    const [activeTab, setActiveTab] = useState('federal_accounts');
    const [defCodes, setDefCodes] = useState([]);
    const subHeading = tabs.find((tab) => tab.type === activeTab).subHeading;

    // TODO - Uncomment below when API is done
    // useEffect(() => {
    // const requestDefCodes = fetchDefCodes();
    // requestDefCodes.promise.then((res) => {
    //     setDefCodes(res.data.codes.filter((code) => code.disaster === 'covid_19'));
    // });
    // }, []);

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
                            active={activeTab === tab.type}
                            fy={2020}
                            defCodes={defCodes} />
                    ))}
                </div>
                <BudgetCategoriesTableContainer
                    type={activeTab}
                    subHeading={subHeading}
                    fy={2020}
                    defCodes={defCodes} />
            </div>
        </div>
    );
};

export default BudgetCategories;
