/**
 * SpendingByCFDA.jsx
 * Created by Lizzie Salita 6/22/20
 */

import React, { useState } from 'react';
import { financialAssistanceTabs } from 'dataMapping/covid19/covid19';
import RedirectModal from 'components/sharedComponents/RedirectModal';
import MoreOptionsTabs from 'components/sharedComponents/moreOptionsTabs/MoreOptionsTabs';
import SummaryInsightsContainer from 'containers/covid19/assistanceListing/SummaryInsightsContainer';
import SpendingByCFDAContainer from 'containers/covid19/assistanceListing/SpendingByCFDAContainer';

const SpendingByCFDA = () => {
    const [isRedirectModalMounted, setIsRedirectModalMounted] = useState(false);
    const [redirectModalURL, setRedirectModalURL] = useState('');
    const [activeTab, setActiveTab] = useState(financialAssistanceTabs[0].internal);

    const onRedirectModalClick = (e) => {
        setRedirectModalURL(e.currentTarget.value);
        setIsRedirectModalMounted(true);
    };

    const closeRedirectModal = () => {
        setRedirectModalURL('');
        setIsRedirectModalMounted(false);
    };

    // TODO - Remove mock counts and replace with API call for counts
    const mockCounts = {
        all: 123123123,
        contracts: 2856942,
        idvs: 65718,
        grants: 262180,
        direct_payments: 3173522,
        loans: 955562
    };

    const changeActiveTab = (tab) => {
        const selectedTab = financialAssistanceTabs.filter((item) => item.internal === tab)[0].internal;
        setActiveTab(selectedTab);
    };

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
                tabCounts={mockCounts}
                pickerLabel="More Award Types"
                changeActiveTab={changeActiveTab} />
            <SummaryInsightsContainer activeTab={activeTab} />
            <SpendingByCFDAContainer onRedirectModalClick={onRedirectModalClick} />
            <RedirectModal
                mounted={isRedirectModalMounted}
                hideModal={closeRedirectModal}
                url={redirectModalURL} />
        </div>
    );
};

export default SpendingByCFDA;
