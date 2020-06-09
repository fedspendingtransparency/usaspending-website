/**
 * AwardSpendingOverTime.jsx
 * Created by Lizzie Salita 6/9/20
 */

import React, { useState } from 'react';
import AmountTab from './AmountTab';

const tabs = [
    {
        type: 'awardObligations',
        label: 'Award Obligations',
        description: 'How much was promised to be spent on COVID-19 response awards?'
    },
    {
        type: 'awardOutlays',
        label: 'Award Outlays',
        description: 'How much was paid out to COVID-19 response awardees?'
    }
];

const AwardSpendingOverTime = () => {
    const [activeTab, setActiveTab] = useState('awardObligations');
    // TODO - get Award Obligations and Award Outlays from Redux when overview data is added
    return (
        <div className="spending-over-time">
            <h3 className="body__question">How was COVID-19 response funding spent over time?</h3>
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
            </div>
        </div>
    );
};

export default AwardSpendingOverTime;
