/**
 * SpendingByCFDA.jsx
 * Created by Lizzie Salita 6/22/20
 */

import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { financialAssistanceTabs } from 'dataMapping/covid19/covid19';
import { awardTypeGroups } from 'dataMapping/search/awardType';
import { fetchCfdaCount } from 'helpers/disasterHelper';
import MoreOptionsTabs from 'components/sharedComponents/moreOptionsTabs/MoreOptionsTabs';
import SummaryInsightsContainer from 'containers/covid19/SummaryInsightsContainer';
import SpendingByCFDAContainer from 'containers/covid19/assistanceListing/SpendingByCFDAContainer';
import DateNote from '../DateNote';
import { scrollIntoView } from '../../../containers/covid19/helpers/scrollHelper';

const overviewData = [
    {
        type: 'resultsCount',
        label: 'CFDA Programs'
    },
    {
        type: 'awardObligations',
        label: 'Award Obligations',
        dollarAmount: true
    },
    {
        type: 'awardOutlays',
        label: 'Award Outlays',
        dollarAmount: true
    },
    {
        type: 'numberOfAwards',
        label: 'Number of Awards'
    }
];

const SpendingByCFDA = () => {
    const [activeTab, setActiveTab] = useState(financialAssistanceTabs[0].internal);
    const { defCodes } = useSelector((state) => state.covid19);
    const moreOptionsTabsRef = useRef(null);

    const [tabCounts, setTabCounts] = useState({
        all: null,
        grants: null,
        direct_payments: null,
        loans: null,
        other: null
    });

    const changeActiveTab = (tab) => {
        const selectedTab = financialAssistanceTabs.find((item) => item.internal === tab).internal;
        setActiveTab(selectedTab);
    };

    useEffect(() => {
        if (defCodes && defCodes.length > 0) {
            // Make an API request for the count of CFDA for each award type
            // Post-MVP this should be updated to use a new endpoint that returns all the counts
            const promises = financialAssistanceTabs.map((awardType) => {
                const params = {
                    filter: {
                        def_codes: defCodes.map((defc) => defc.code)
                    }
                };
                if (awardType.internal !== 'all') {
                    // Endpoint defaults to all financial assistance types if award_type_codes is not provided
                    params.filter.award_type_codes = awardTypeGroups[awardType.internal];
                }
                return fetchCfdaCount(params).promise;
            });
            // Wait for all the requests to complete and then store the results in state
            Promise.all(promises)
                .then(([allRes, grantsRes, loansRes, directPaymentsRes, otherRes]) => {
                    setTabCounts({
                        all: allRes.data.count,
                        grants: grantsRes.data.count,
                        direct_payments: directPaymentsRes.data.count,
                        loans: loansRes.data.count,
                        other: otherRes.data.count
                    });
                });
        }
    }, [defCodes]);

    const scrollIntoViewTable = (loading, error, errorOrLoadingRef, tableWrapperRef, margin, scrollOptions) => {
        scrollIntoView(loading, error, errorOrLoadingRef, tableWrapperRef, margin, scrollOptions, moreOptionsTabsRef);
    };

    return (
        <div className="body__content assistance-listing">
            <DateNote />
            <h3 className="body__narrative">
                These are the assistance listings that supported the COVID-19 Response with <strong>awards</strong>.
            </h3>
            <p className="body__narrative-description">
                The total federal spending for the COVID-19 Response can be divided into different budget categories, including the different agencies that spent funds, the Federal Spending bills and Federal Accounts that funded the Response, and the different types of items and services that were purchased.
            </p>
            <div ref={moreOptionsTabsRef}>
                <MoreOptionsTabs
                    tabs={financialAssistanceTabs}
                    tabCounts={tabCounts}
                    pickerLabel="More Award Types"
                    changeActiveTab={changeActiveTab} />
            </div>
            <SummaryInsightsContainer
                // pass CFDA count to the summary section so we don't have to make the same API request again
                resultsCount={tabCounts[activeTab]}
                activeTab={activeTab}
                overviewData={overviewData} />
            <SpendingByCFDAContainer
                activeTab={activeTab}
                scrollIntoView={scrollIntoViewTable} />
        </div>
    );
};

export default SpendingByCFDA;
