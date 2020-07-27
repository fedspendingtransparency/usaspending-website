/**
 * BudgetCategories.jsx
 * Created by James Lee 6/5/20
 */

import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import BudgetCategoriesTableContainer from 'containers/covid19/budgetCategories/BudgetCategoriesTableContainer';
import DateNote from 'components/covid19/DateNote';
import { fetchDisasterSpendingCount } from 'helpers/disasterHelper';
import MoreOptionsTabs from '../../sharedComponents/moreOptionsTabs/MoreOptionsTabs';
import OverviewData from '../OverviewData';
import { scrollIntoView } from '../../../containers/covid19/helpers/scrollHelper';

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
    const moreOptionsTabsRef = useRef(null);

    const { defCodes, overview } = useSelector((state) => state.covid19);
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
            const countRequest = fetchDisasterSpendingCount(activeTab, params);
            countRequest.promise
                .then((res) => {
                    setCount(res.data.count);
                });
        }
    }, [activeTab, defCodes]);

    const amounts = {
        count,
        totalBudgetaryResources: overview._totalBudgetAuthority,
        totalObligations: overview._totalObligations,
        totalOutlays: overview._totalOutlays
    };

    const scrollIntoViewTable = (loading, error, errorOrLoadingRef, tableWrapperRef, margin, scrollOptions) => {
        scrollIntoView(loading, error, errorOrLoadingRef, tableWrapperRef, margin, scrollOptions, moreOptionsTabsRef);
    };

    return (
        <div className="body__content budget-categories">
            <DateNote />
            <h3 className="body__narrative">This is how the <strong>total spending</strong> of the COVID-19 Response was categorized.</h3>
            <p className="body__narrative-description">
                The total federal spending for the COVID-19 Response can be divided into different budget categories, including the different agencies that spent funds, the Federal Spending bills and Federal Accounts that funded the Response, and the different types of items and services that were purchased.
            </p>
            <div ref={moreOptionsTabsRef}>
                <MoreOptionsTabs tabs={tabs} changeActiveTab={changeActiveTab} hideCounts />
            </div>
            <div className="overview-data-group">
                {overviewData.map((data) => (
                    <OverviewData
                        key={data.label}
                        {...data}
                        amount={amounts[data.type]} />
                ))}
            </div>
            <div className="budget-categories__content">
                <BudgetCategoriesTableContainer
                    type={activeTab}
                    subHeading={tabs.filter((tab) => tab.internal === activeTab)[0].subHeading}
                    scrollIntoView={scrollIntoViewTable} />
            </div>
        </div>
    );
};

export default BudgetCategories;
