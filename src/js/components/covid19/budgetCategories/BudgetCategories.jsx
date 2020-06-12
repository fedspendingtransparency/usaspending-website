/**
 * BudgetCategories.jsx
 * Created by James Lee 6/5/20
 */

import React, { useState, useEffect } from 'react';
import BudgetCategoriesCountTabContainer from 'containers/covid19/budgetCategories/BudgetCategoriesCountTabContainer';
import BudgetCategoriesTableContainer from 'containers/covid19/budgetCategories/BudgetCategoriesTableContainer';
import DateNote from 'components/covid19/DateNote';
import { fetchDefCodes } from '../../../helpers/covid19/budgetCategoriesHelper';

const tabs = [
    {
        type: 'federal_account',
        label: 'Federal Accounts',
        description: 'What accounts funded this response?',
        subHeading: 'Treasury Accounts',
        countField: 'count',
        subCountField: 'child_count'
    },
    {
        type: 'def_code',
        label: 'Public Laws',
        description: 'What legislative acts funded this spending?',
        countField: 'count'
    },
    {
        type: 'agency',
        label: 'Agencies',
        description: 'What agencies did the spending?',
        countField: 'count'
    },
    {
        type: 'object_class',
        label: 'Object Classes',
        description: 'What items or services were purchased',
        countField: 'count'
    }
];

const BudgetCategories = () => {
    const [activeTab, setActiveTab] = useState('federal_account');
    const [defCodes, setDefCodes] = useState([]);
    const subHeading = tabs.find((tab) => tab.type === activeTab).subHeading;

    // TODO - Remove hard coded values
    const fy = 2020;
    const dateString = "June 30, 2020";

    // TODO - remove this temporary def codes fetch when it's put into redux
    useEffect(() => {
        const requestDefCodes = fetchDefCodes();
        requestDefCodes.promise.then((res) => {
            setDefCodes(res.data.codes.filter((code) => code.disaster === 'covid_19'));
        });
    }, []);

    return (
        <div className="body__content">
            <DateNote dateString={dateString} />
            <h3 className="body__narrative">This is how the <strong>total spending</strong> of the COVID-19 Response was categorized.</h3>
            <p className="body__narrative-description">
                The total federal spending for the COVID-19 Response can be divided into different budget categories, including the different agencies that spent funds, the Federal Spending bills and Federal Accounts that funded the Response, and the different types of items and services that were purchased.
            </p>
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
                            fy={fy}
                            defCodes={defCodes} />
                    ))}
                </div>
                <BudgetCategoriesTableContainer
                    type={activeTab}
                    subHeading={subHeading}
                    fy={fy}
                    defCodes={defCodes} />
            </div>
        </div>
    );
};

export default BudgetCategories;
