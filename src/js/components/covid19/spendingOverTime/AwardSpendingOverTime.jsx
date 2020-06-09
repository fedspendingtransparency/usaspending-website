/**
 * AwardSpendingOverTime.jsx
 * Created by Lizzie Salita 6/9/20
 */

import React, { useState } from 'react';
import { awardTypeGroupLabels } from 'dataMapping/search/awardType';
import { Table } from 'data-transparency-ui';
import AmountTab from './AmountTab';

const tabs = [
    {
        type: 'awardObligations',
        label: 'Award Obligations',
        description: 'How much was promised to be spent on COVID-19 response awards?',
        term: 'Obligations'
    },
    {
        type: 'awardOutlays',
        label: 'Award Outlays',
        description: 'How much was paid out to COVID-19 response awardees?',
        term: 'Outlays'
    }
];

const mockData = [
    ['March 2020', '$123,456', '$123,456', '$123,456', '$123,456', '$123,456', '$123,456'],
    ['April 2020', '$123,456', '$123,456', '$123,456', '$123,456', '$123,456', '$123,456'],
    ['May 2020', '$123,456', '$123,456', '$123,456', '$123,456', '$123,456', '$123,456']
];

const AwardSpendingOverTime = () => {
    const [activeTab, setActiveTab] = useState('awardObligations');
    // TODO - get total Award Obligations and Award Outlays from Redux when overview data is added
    const term = tabs.find((tab) => tab.type === activeTab).term;
    const awardTypes = Object.keys(awardTypeGroupLabels);
    // Generate a column for each award type
    const columns = awardTypes.map((awardType) => (
        {
            displayName: `Total ${term} for ${awardTypeGroupLabels[awardType]}`,
            title: awardType
        }
    ));
    // Add a column for the time period
    columns.unshift(
        {
            displayName: 'Month',
            title: 'period'
        }
    );

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
                <Table
                    columns={columns}
                    rows={mockData} />
            </div>
        </div>
    );
};

export default AwardSpendingOverTime;
