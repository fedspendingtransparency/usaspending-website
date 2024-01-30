/**
 * SpendingByRecipientContainer.jsx
 * Created by Lizzie Salita 7/8/20
 */

import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

import { awardTypeTabs } from 'dataMapping/covid19/covid19';
import { awardTypeGroups } from 'dataMapping/search/awardType';
import { fetchDisasterSpendingCount } from 'apis/disaster';
import { areCountsDefined } from 'helpers/covid19Helper';
import SummaryInsightsContainer from 'containers/covid19/SummaryInsightsContainer';
import RecipientTableContainer from 'containers/covid19/recipient/RecipientTableContainer';
import GlossaryLink from 'components/sharedComponents/GlossaryLink';
import Analytics from 'helpers/analytics/Analytics';
import { Tabs } from "data-transparency-ui";
import { scrollIntoView } from 'containers/covid19/helpers/scrollHelper';
import { useStateWithPrevious } from 'helpers';

const overviewData = [
    {
        type: 'resultsCount',
        title: 'Number of Recipients'
    },
    {
        type: 'awardObligations',
        title: (
            <div>
                <span className="glossary-term">Award Obligations</span> <GlossaryLink term="obligation" />
            </div>
        ),
        isMonetary: true
    },
    {
        type: 'awardOutlays',
        title: (
            <div>
                <span className="glossary-term">Award Outlays</span> <GlossaryLink term="outlay" />
            </div>
        ),
        isMonetary: true
    },
    {
        type: 'numberOfAwards',
        title: 'Number of Awards'
    }
];

const SpendingByRecipientContainer = () => {
    const [inFlight, setInFlight] = useState(true);
    const [prevActiveTab, activeTab, setActiveTab] = useStateWithPrevious(awardTypeTabs[0].internal);
    const { defcParams } = useSelector((state) => state.covid19);
    const awardFilterButtonsRef = useRef(null);

    const [tabCounts, setTabCounts] = useState({
        all: null,
        grants: null,
        direct_payments: null,
        loans: null,
        other: null,
        contracts: null,
        idvs: null
    });

    const changeActiveTab = (tab) => {
        const selectedTab = awardTypeTabs.find((item) => item.internal === tab).internal;
        setActiveTab(selectedTab);
        Analytics.event({ event: 'covid_spending_recipient', category: 'COVID-19 - Award Spending by Recipient - Recipients', action: `${activeTab} - click` });
    };

    useEffect(() => {
        if (defcParams && defcParams.length > 0) {
            // Make an API request for the count of Recipients for each award type
            // Post-MVP this should be updated to use a new endpoint that returns all the counts
            const promises = awardTypeTabs.map((awardType) => {
                const params = {
                    filter: {
                        def_codes: defcParams
                    }
                };
                if (awardType.internal !== 'all') {
                    // Endpoint defaults to all award types if award_type_codes is not provided
                    params.filter.award_type_codes = awardTypeGroups[awardType.internal];
                }
                return fetchDisasterSpendingCount('recipient', params).promise;
            });
            // Wait for all the requests to complete and then store the results in state
            Promise.all(promises)
                .then(([allRes, grantsRes, loansRes, directPaymentsRes, otherRes, contractRes, idvRes]) => {
                    setTabCounts({
                        all: allRes.data.count,
                        grants: grantsRes.data.count,
                        direct_payments: directPaymentsRes.data.count,
                        loans: loansRes.data.count,
                        other: otherRes.data.count,
                        contracts: contractRes.data.count,
                        idvs: idvRes.data.count
                    });
                });
        }
    }, [defcParams]);

    const scrollIntoViewTable = (loading, error, errorOrLoadingRef, tableWrapperRef, margin, scrollOptions) => {
        scrollIntoView(loading, error, errorOrLoadingRef, tableWrapperRef, margin, scrollOptions, awardFilterButtonsRef);
    };
    useEffect(() => {
        const countState = areCountsDefined(tabCounts);
        if (!countState) {
            setInFlight(true);
        }
        else if (countState) {
            setInFlight(false);
        }
    }, [tabCounts, setInFlight]);

    return (
        <div className="spending-by-recipient">
            <div ref={awardFilterButtonsRef}>
                <Tabs
                    active={activeTab}
                    types={awardTypeTabs.map((tab) => ({ ...tab, disabled: tabCounts && tab.internal !== 'all' && !tabCounts[tab.internal], count: tabCounts[tab.internal] }))}
                    switchTab={changeActiveTab}
                    tablessStyle />
            </div>
            <SummaryInsightsContainer
                // pass Recipient count to the summary section so we don't have to make the same API request again
                resultsCount={tabCounts[activeTab]}
                activeTab={activeTab}
                areCountsLoading={inFlight}
                overviewData={overviewData}
                recipientOnly />
            <RecipientTableContainer
                activeTab={activeTab}
                prevActiveTab={prevActiveTab}
                scrollIntoView={scrollIntoViewTable} />
        </div>
    );
};

export default SpendingByRecipientContainer;
