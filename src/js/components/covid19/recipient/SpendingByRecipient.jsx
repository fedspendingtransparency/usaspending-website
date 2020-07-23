/**
 * SpendingByRecipient.jsx
 * Created by Lizzie Salita 7/8/20
 */

import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { awardTypeTabs } from 'dataMapping/covid19/covid19';
import { awardTypeGroups } from 'dataMapping/search/awardType';
import { fetchDisasterSpendingCount } from 'helpers/disasterHelper';
import SummaryInsightsContainer from 'containers/covid19/SummaryInsightsContainer';
import SpendingByRecipientContainer from 'containers/covid19/recipient/SpendingByRecipientContainer';
import AwardFilterButtons from './AwardFilterButtons';
import { scrollIntoView } from '../../../containers/covid19/helpers/scrollHelper';

const overviewData = [
    {
        type: 'resultsCount',
        label: 'Number of Recipients'
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

const SpendingByRecipient = () => {
    const [activeTab, setActiveTab] = useState(awardTypeTabs[0].internal);
    const defCodes = useSelector((state) => state.covid19.defCodes);
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
    };

    useEffect(() => {
        // Make an API request for the count of Recipients for each award type
        // Post-MVP this should be updated to use a new endpoint that returns all the counts
        const promises = awardTypeTabs.map((awardType) => {
            const params = {
                filter: {
                    def_codes: defCodes.map((defc) => defc.code)
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
            .then(([allRes, grantsRes, directPaymentsRes, loansRes, otherRes, contractRes, idvRes]) => {
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
    }, [defCodes]);

    const scrollIntoViewTable = (loading, error, errorOrLoadingRef, tableWrapperRef, margin, scrollOptions, startPage, endPage, currentPage) => {
        scrollIntoView(loading, error, errorOrLoadingRef, tableWrapperRef, margin, scrollOptions, startPage, endPage, currentPage, awardFilterButtonsRef);
    };

    return (
        <div className="spending-by-recipient">
            <div ref={awardFilterButtonsRef}>
                <AwardFilterButtons
                    filters={awardTypeTabs}
                    onClick={changeActiveTab}
                    activeFilter={activeTab}
                    tabCounts={tabCounts} />
            </div>
            <SummaryInsightsContainer
                // pass Recipient count to the summary section so we don't have to make the same API request again
                resultsCount={tabCounts[activeTab]}
                activeTab={activeTab}
                overviewData={overviewData} />
            <SpendingByRecipientContainer activeTab={activeTab} scrollIntoView={scrollIntoViewTable} />
        </div>
    );
};

export default SpendingByRecipient;
