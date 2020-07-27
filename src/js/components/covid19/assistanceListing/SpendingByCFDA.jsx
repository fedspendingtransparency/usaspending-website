/**
 * SpendingByCFDA.jsx
 * Created by Lizzie Salita 6/22/20
 */

import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { financialAssistanceTabs } from 'dataMapping/covid19/covid19';
import { awardTypeGroups } from 'dataMapping/search/awardType';
import { fetchCfdaCount } from 'helpers/disasterHelper';
import MoreOptionsTabs from 'components/sharedComponents/moreOptionsTabs/MoreOptionsTabs';
import SummaryInsightsContainer from 'containers/covid19/SummaryInsightsContainer';
import SpendingByCFDAContainer from 'containers/covid19/assistanceListing/SpendingByCFDAContainer';
import GlossaryLink from 'components/sharedComponents/GlossaryLink';
import DateNote from '../DateNote';
import ReadMore from '../ReadMore';

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

    return (
        <div className="body__content assistance-listing">
            <DateNote />
            <h3 className="body__narrative">
                <strong>Which CFDA programs (Assistance Listings)</strong> supported the response to COVID-19?
            </h3>
            <div className="body__narrative-description">
                <p>
                    Catalog of Federal Domestic Assistance (CFDA) Programs <GlossaryLink term="cfda-program" currentUrl="disaster/covid-19" /> also known as Assistance Listings, are programs that provide financial assistance to individuals, organizations, businesses, or state, local, or tribal governments. Some examples of Assistance Listings include the Supplemental Nutrition Assistance Program (SNAP) and the Coronavirus Relief Fund. All financial assistance awards must be associated with a CFDA Program, all of which must be explicitly authorized by law.
                </p>
                <ReadMore>
                    <p>
                        In this section, you will see awards that CFDA Programs have funded in response to COVID-19. Financial assistance awards represent the vast majority of COVID-19 appropriated spending.
                    </p>
                    <p>
                        <em>Please note that award amounts do not include the Small Business Administration (SBA)&apos;s Paycheck Protection Program.</em>
                    </p>
                </ReadMore>
            </div>
            <MoreOptionsTabs
                tabs={financialAssistanceTabs}
                tabCounts={tabCounts}
                pickerLabel="More Award Types"
                changeActiveTab={changeActiveTab} />
            <SummaryInsightsContainer
                // pass CFDA count to the summary section so we don't have to make the same API request again
                resultsCount={tabCounts[activeTab]}
                activeTab={activeTab}
                overviewData={overviewData}
                assistanceOnly />
            <SpendingByCFDAContainer
                activeTab={activeTab} />
        </div>
    );
};

export default SpendingByCFDA;
