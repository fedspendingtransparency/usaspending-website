/**
 * BudgetCategories.jsx
 * Created by James Lee 6/5/20
 */

import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import BudgetCategoriesTableContainer from 'containers/covid19/budgetCategories/BudgetCategoriesTableContainer';
import DateNote from 'components/covid19/DateNote';
import { fetchDisasterSpendingCount, fetchOverview } from 'helpers/disasterHelper';
import BaseOverview from 'models/v2/covid19/BaseOverview';
import MoreOptionsTabs from '../../sharedComponents/moreOptionsTabs/MoreOptionsTabs';
import OverviewData from '../OverviewData';


const tabs = [
    {
        internal: 'agency',
        label: 'Agencies',
        subHeading: 'Sub-Agencies'
    },
    {
        internal: 'federal_account',
        label: 'Federal Accounts',
        subHeading: 'Treasury Account Symbol (TAS)'
    },
    {
        internal: 'object_class',
        label: 'Object Classes',
        subHeading: 'Object Class'
    }
];

const BudgetCategories = () => {
    const [activeTab, setActiveTab] = useState(tabs[0].internal);
    const [count, setCount] = useState(null);
    const [totalBudgetaryResources, setTotalBudgetaryResources] = useState(null);
    const [totalObligations, setTotalObligations] = useState(null);
    const [totalOutlays, setTotalOutlays] = useState(null);

    const defCodes = useSelector((state) => state.covid19.defCodes);
    const overviewData = [
        {
            type: 'count',
            label: `Number of ${tabs.filter((tab) => tab.internal === activeTab)[0].label}`
        },
        {
            type: 'totalBudgetaryResources',
            label: 'Total Budgetary Resources',
            dollarAmount: true
        },
        {
            type: 'totalObligations',
            label: 'Total Obligations',
            dollarAmount: true
        },
        {
            type: 'totalOutlays',
            label: 'Total Outlays',
            dollarAmount: true
        }
    ];

    // TODO - Remove hard coded values
    const dateString = "June 30, 2020";

    const changeActiveTab = (tab) => {
        const tabInternal = tabs.filter((item) => item.internal === tab)[0].internal;

        setActiveTab(tabInternal);
    };

    useEffect(() => {
        if (defCodes && defCodes.length > 0) {
            // Reset any existing results
            setCount(null);

            const params = {
                filter: {
                    def_codes: defCodes.map((defc) => defc.code)
                }
            };
            const countRequest = fetchDisasterSpendingCount(activeTab.internal, params);
            countRequest.promise
                .then((res) => {
                    setCount(res.data.count);
                });
        }

        const overviewRequest = fetchOverview();
        overviewRequest.promise.then((res) => {
            const newOverview = Object.create(BaseOverview);
            newOverview.populate(res.data);
            setTotalBudgetaryResources(newOverview._totalBudgetAuthority);
            setTotalObligations(newOverview._totalObligations);
            setTotalOutlays(Math.abs(newOverview._totalOutlays));
        });
    }, [activeTab, defCodes]);

    const amounts = {
        count,
        totalBudgetaryResources,
        totalObligations,
        totalOutlays
    };

    return (
        <div className="body__content">
            <DateNote dateString={dateString} />
            <h3 className="body__narrative">This is how the <strong>total spending</strong> of the COVID-19 Response was categorized.</h3>
            <p className="body__narrative-description">
                The total federal spending for the COVID-19 Response can be divided into different budget categories, including the different agencies that spent funds, the Federal Spending bills and Federal Accounts that funded the Response, and the different types of items and services that were purchased.
            </p>
            <MoreOptionsTabs tabs={tabs} changeActiveTab={changeActiveTab} hideCounts />
            <div className="overview-data-group">
                {overviewData.map((data) => (
                    <OverviewData
                        key={data.label}
                        {...data}
                        amount={amounts[data.type]} />
                ))}
            </div>
            <BudgetCategoriesTableContainer
                type={activeTab}
                subHeading={tabs.filter((tab) => tab.internal === activeTab)[0].subHeading} />
        </div>
    );
};

export default BudgetCategories;
