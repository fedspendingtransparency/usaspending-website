/**
 * AwardSpendingOverTime.jsx
 * Created by Lizzie Salita 6/9/20
 */

import React, { useState } from 'react';
import SpendingOverTimeContainer from 'containers/covid19/spendingOverTime/SpendingOverTimeContainer';
import AmountTab from './AmountTab';

const tabs = [
    {
        type: 'obligations',
        label: 'Award Obligations',
        description: 'How much was promised to be spent on COVID-19 response awards?'
    },
    {
        type: 'outlays',
        label: 'Award Outlays',
        description: 'How much was paid out to COVID-19 response awardees?'
    }
];

const AwardSpendingOverTime = () => {
    const [activeTab, setActiveTab] = useState('obligations');
    // TODO - get total Award Obligations and Award Outlays from Redux when overview data is added
    return (
        <div className="body__content spending-over-time">
            <h3 className="body__narrative">This is how <strong>awards</strong> supporting the COVID-19 Response were funded over time.</h3>
            <p className="body__narrative-description">
                The Federal Government’s COVID-19 Response spending took place over a series of months. Analyzing spending over time can reveal trends in spending for different award types and the creation of new awards.
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
                        <AmountTab
                            key={tab.type}
                            {...tab}
                            amount={123456}
                            setActiveTab={setActiveTab}
                            active={activeTab === tab.type} />
                    ))}
                </div>
                <SpendingOverTimeContainer activeTab={activeTab} />
            </div>
        </div>
    );
};

export default AwardSpendingOverTime;
