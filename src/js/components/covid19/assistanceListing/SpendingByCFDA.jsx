/**
 * SpendingByCFDA.jsx
 * Created by Lizzie Salita 6/22/20
 */

import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { financialAssistanceTabs } from 'dataMapping/covid19/covid19';
import { awardTypeGroups } from 'dataMapping/search/awardType';
import { fetchCfdaCount } from 'helpers/disasterHelper';
import RedirectModal from 'components/sharedComponents/RedirectModal';
import MoreOptionsTabs from 'components/sharedComponents/moreOptionsTabs/MoreOptionsTabs';
import SummaryInsightsContainer from 'containers/covid19/assistanceListing/SummaryInsightsContainer';
import SpendingByCFDAContainer from 'containers/covid19/assistanceListing/SpendingByCFDAContainer';

const SpendingByCFDA = () => {
    const [isRedirectModalMounted, setIsRedirectModalMounted] = useState(false);
    const [redirectModalURL, setRedirectModalURL] = useState('');
    const [activeTab, setActiveTab] = useState(financialAssistanceTabs[0].internal);
    const defCodes = useSelector((state) => state.covid19.defCodes);

    const defaultTabCounts = {
        all: null,
        grants: null,
        direct_payments: null,
        loans: null,
        other: null
    };

    const [tabCounts, setTabCounts] = useState(defaultTabCounts);

    const onRedirectModalClick = (e) => {
        setRedirectModalURL(e.currentTarget.value);
        setIsRedirectModalMounted(true);
    };

    const closeRedirectModal = () => {
        setRedirectModalURL('');
        setIsRedirectModalMounted(false);
    };

    const changeActiveTab = (tab) => {
        const selectedTab = financialAssistanceTabs.filter((item) => item.internal === tab)[0].internal;
        setActiveTab(selectedTab);
    };

    useEffect(() => {
        const counts = defaultTabCounts;
        // Make an API request for the count of CFDA for each award type
        financialAssistanceTabs.forEach((awardType) => {
            const params = {
                filter: {
                    def_codes: defCodes.map((defc) => defc.code)
                }
            };
            if (awardType.internal !== 'all') {
                params.filter.award_type_codes = awardTypeGroups[awardType.internal];
            }
            fetchCfdaCount(params).promise
                .then((res) => {
                    counts[awardType.internal] = res.data.count;
                });
        });
        // Store the counts in state
        setTabCounts(counts);
    }, [defCodes]);

    return (
        <div className="body__content assistance-listing">
            <h3 className="body__narrative">
                These are the assistance listings that supported the COVID-19 Response with <strong>awards</strong>.
            </h3>
            <p className="body__narrative-description">
                The total federal spending for the COVID-19 Response can be divided into different budget categories, including the different agencies that spent funds, the Federal Spending bills and Federal Accounts that funded the Response, and the different types of items and services that were purchased.
            </p>
            <MoreOptionsTabs
                tabs={financialAssistanceTabs}
                tabCounts={tabCounts}
                pickerLabel="More Award Types"
                changeActiveTab={changeActiveTab} />
            <SummaryInsightsContainer
                // pass CFDA count to the summary section so we don't have to make the same API request again
                cfdaCount={tabCounts[activeTab]}
                activeTab={activeTab} />
            <SpendingByCFDAContainer
                onRedirectModalClick={onRedirectModalClick}
                activeTab={activeTab} />
            <RedirectModal
                mounted={isRedirectModalMounted}
                hideModal={closeRedirectModal}
                url={redirectModalURL} />
        </div>
    );
};

export default SpendingByCFDA;
