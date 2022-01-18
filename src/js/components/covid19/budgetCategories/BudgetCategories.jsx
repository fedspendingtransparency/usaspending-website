/**
 * BudgetCategories.jsx
 * Created by James Lee 6/5/20
 */

import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import BudgetCategoriesTableContainer from 'containers/covid19/budgetCategories/BudgetCategoriesTableContainer';
import DateNote from 'components/covid19/DateNote';
import { fetchDisasterSpendingCount } from 'apis/disaster';
import { Tabs, InformationBoxes } from 'data-transparency-ui';
import GlossaryLink from 'components/sharedComponents/GlossaryLink';
import { scrollIntoView } from 'containers/covid19/helpers/scrollHelper';
import Analytics from 'helpers/analytics/Analytics';
import Note from 'components/sharedComponents/Note';

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

const propTypes = {
    publicLaw: PropTypes.string
};

const BudgetCategories = ({ publicLaw }) => {
    const [activeTab, setActiveTab] = useState(tabs[0].internal);
    const [count, setCount] = useState(null);
    const [inFlight, setInFlight] = useState(true);
    const moreOptionsTabsRef = useRef(null);

    const { defcParams, overview } = useSelector((state) => state.covid19);
    const overviewData = [
        {
            type: 'count',
            title: `Number of ${tabs.filter((tab) => tab.internal === activeTab)[0].label}`
        },
        {
            type: 'totalBudgetaryResources',
            title: 'Total Budgetary Resources',
            isMonetary: true
        },
        {
            type: 'totalObligations',
            title: 'Total Obligations',
            isMonetary: true
        },
        {
            type: 'totalOutlays',
            title: 'Total Outlays',
            isMonetary: true
        }
    ];

    const changeActiveTab = (tab) => {
        const tabInternal = tabs.filter((item) => item.internal === tab)[0].internal;

        setActiveTab(tabInternal);
        Analytics.event({ category: 'COVID-19 - Profile', action: `Total Spending - ${activeTab}` });
    };

    useEffect(() => {
        if (defcParams && defcParams.length > 0) {
            // Reset any existing results
            setCount(null);

            const params = {
                filter: {
                    def_codes: defcParams
                }
            };
            const countRequest = fetchDisasterSpendingCount(activeTab, params);
            countRequest.promise
                .then((res) => {
                    setCount(res.data.count);
                });
        }
    }, [activeTab, defcParams]);

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
            {publicLaw === 'american-rescue-plan' ?
                <h4 className="body__narrative">How is <strong>total spending</strong> from the American Rescue Plan categorized?</h4>
                :
                <h4 className="body__narrative">How is <strong>total COVID-19 spending</strong> categorized?</h4>
            }
            <div className="body__narrative-description">
                {publicLaw === 'american-rescue-plan' ?
                    <p>
                        In this section, we provide the total amount of American Rescue Plan funding broken down into three categories: the <span className="glossary-term">Agencies</span> <GlossaryLink term="agency" /> who are authorizing the funds to be spent; the <span className="glossary-term">Federal Accounts</span> <GlossaryLink term="federal-account" /> from which agencies authorize spending; and the <span className="glossary-term">Object Classes</span> <GlossaryLink term="object-class" /> of the goods and services purchased with this funding.
                    </p>
                    :
                    <p>
                        In this section, we present the total amount of COVID-19 funding broken down by three categories: the <span className="glossary-term">Agencies</span> <GlossaryLink term="agency" /> who are authorizing the funds to be spent; the <span className="glossary-term">Federal Accounts</span> <GlossaryLink term="federal-account" /> from which agencies authorize spending; and the <span className="glossary-term">Object Classes</span> <GlossaryLink term="object-class" /> of the goods and services purchased with this funding.
                    </p>
                }
            </div>
            <div ref={moreOptionsTabsRef}>
                <Tabs active={activeTab} types={tabs} switchTab={changeActiveTab} />
            </div>
            <div className="overview-data-group">
                <InformationBoxes
                    boxes={overviewData.map((data) => ({
                        ...data,
                        isLoading: (data.type === 'count' && inFlight) || !amounts[data.type],
                        amount: amounts[data.type]
                    }))} />
            </div>
            <div className="budget-categories__content">
                <BudgetCategoriesTableContainer
                    type={activeTab}
                    subHeading={tabs.filter((tab) => tab.internal === activeTab)[0].subHeading}
                    scrollIntoView={scrollIntoViewTable} />
            </div>
            {publicLaw === 'american-rescue-plan' ?
                <Note message={(
                    <>
                        This table uses data tagged with Disaster Emergency Fund Code (DEFC) V, which was designated for Non-emergency P.L. 117-2, American Rescue Plan Act of 2021.
                    </>
                )} /> : <div />
            }
        </div>
    );
};

BudgetCategories.propTypes = propTypes;
export default BudgetCategories;
