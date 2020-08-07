/**
 * BudgetCategories.jsx
 * Created by James Lee 6/5/20
 */

import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import kGlobalConstants from 'GlobalConstants';
import BudgetCategoriesTableContainer from 'containers/covid19/budgetCategories/BudgetCategoriesTableContainer';
import DateNote from 'components/covid19/DateNote';
import { fetchDisasterSpendingCount } from 'helpers/disasterHelper';
import MoreOptionsTabs from 'components/sharedComponents/moreOptionsTabs/MoreOptionsTabs';
import GlossaryLink from 'components/sharedComponents/GlossaryLink';
import { scrollIntoView } from 'containers/covid19/helpers/scrollHelper';
import OverviewData from '../OverviewData';
import ReadMore from '../ReadMore';

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
    const [inFlight, setInFlight] = useState(true);
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

    useEffect(() => {
        if (!count) {
            setInFlight(true);
        }
        else if (count) {
            setInFlight(false);
        }
    }, [count, setInFlight]);

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
            <h3 className="body__narrative">How is <strong>total COVID-19 spending</strong> categorized?</h3>
            <div className="body__narrative-description">
                <p>
                    In this section, we present the total amount of COVID-19 funding divided into three high-level budget categories: the <span className="glossary-term">Agencies</span> <GlossaryLink currentUrl="disaster/covid-19" term="agency" /> who are authorizing the funds to be spent; the <span className="glossary-term">Federal Accounts</span> <GlossaryLink currentUrl="disaster/covid-19" term="federal-account" /> from which agencies authorize spending; and the <span className="glossary-term">Object Classes</span> <GlossaryLink currentUrl="disaster/covid-19" term="object-class" /> of the goods and services purchased with this funding.
                </p>
                <ReadMore>
                    {kGlobalConstants.CARES_ACT_RELEASED_2 && (
                        <p>
                            This section includes both award spending (detailed in the sections below) and non-award spending, such as internal federal agency expenses.
                        </p>
                    )}
                    <p>
                        In the chart below, see how much is available to be spent (Total Budgetary Resources), how much has been promised to be spent (Total Obligations), and how much has actually been paid out (Total Outlays).
                    </p>
                    <div className="sba-note-container">
                        <p>Please note that Small Business Administration (SBA) loan programs are categorized as follows:</p>
                        <ul>
                            <li className="outer-list">&#32;Federal Account 073-1154 Business Loans Program Account, Small Business Administration:
                                (1) &#32;Paycheck Protection Program (PPP) loans constitute the majority of this account
                                (2) &#32;EIDL loans constitute the minority of this account
                            </li>
                            <li className="outer-list">&#32;Federal Account 073-1152 Disaster Loans Program Account, Small Business Administration:
                                &#32;EIDL loans constitute the entirety of this account
                            </li>
                        </ul>
                    </div>
                </ReadMore>
            </div>
            <div ref={moreOptionsTabsRef}>
                <MoreOptionsTabs tabs={tabs} changeActiveTab={changeActiveTab} hideCounts />
            </div>
            <div className="overview-data-group">
                {overviewData.map((data) => (
                    <OverviewData
                        key={data.label}
                        {...data}
                        isLoading={(
                            data.type === 'count' &&
                            inFlight
                        )}
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
