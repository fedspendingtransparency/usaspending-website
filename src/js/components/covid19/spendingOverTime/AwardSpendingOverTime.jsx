/**
 * AwardSpendingOverTime.jsx
 * Created by Lizzie Salita 6/9/20
 */

import React, { useState, useEffect } from 'react';
import { fetchNewAwardsCount } from 'helpers/disasterHelper';
import SpendingOverTimeContainer from 'containers/covid19/spendingOverTime/SpendingOverTimeContainer';
import AmountTab from './AmountTab';

const tabs = [
    {
        type: 'obligations',
        label: 'Award Obligations',
        description: 'How much was promised to be spent on COVID-19 response awards?',
        dollarAmount: true
    },
    {
        type: 'outlays',
        label: 'Award Outlays',
        description: 'How much was paid out to COVID-19 response awardees?',
        dollarAmount: true
    },
    {
        type: 'newAwards',
        label: 'New Awards',
        description: 'How many new awards were made in support of COVID-19 response?'
    }
];

const AwardSpendingOverTime = () => {
    const [activeTab, setActiveTab] = useState('obligations');
    const [newAwards, setNewAwards] = useState(0);
    const params = {
        spending_type: 'award',
        // TODO: remove hard-coded values after integration with v2/references/def_codes/ API
        def_codes: ['L', 'M', 'N', 'O', 'P'],
        fiscal_year: 2020
    };
    useEffect(() => {
        const request = fetchNewAwardsCount(params);
        request.promise
            .then((res) => {
                setNewAwards(res.data.count);
            }).catch((err) => {
                console.error(err);
            });
    });
    const amounts = {
        newAwards,
        // TODO - get total Award Obligations and Award Outlays from Redux when overview data is added
        obligations: 866700000000,
        outlays: 753100000000
    };
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
                            amount={amounts[tab.type]}
                            setActiveTab={setActiveTab}
                            active={activeTab === tab.type} />
                    ))}
                </div>
            </div>
            <SpendingOverTimeContainer activeTab={activeTab} />
        </div>
    );
};

export default AwardSpendingOverTime;
