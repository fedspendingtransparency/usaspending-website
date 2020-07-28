/**
 * AwardSpendingAgency.jsx
 * Created by James Lee 6/18/20
 */

import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { fetchAgencyCount } from 'helpers/disasterHelper';
import DateNote from 'components/covid19/DateNote';
import { areCountsDefined } from 'helpers/covid19Helper';
import { awardTypeTabs } from 'dataMapping/covid19/covid19';
import { awardTypeGroups } from 'dataMapping/search/awardType';
import AwardSpendingAgencyTableContainer from 'containers/covid19/awardSpendingAgency/AwardSpendingAgencyTableContainer';
import SummaryInsightsContainer from 'containers/covid19/SummaryInsightsContainer';
import ReadMore from '../ReadMore';

import MoreOptionsTabs from '../../sharedComponents/moreOptionsTabs/MoreOptionsTabs';

const overviewData = [
    {
        type: 'resultsCount',
        label: 'Number of Agencies'
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

const initialTabState = {
    all: null,
    contracts: null,
    idvs: null,
    grants: null,
    direct_payments: null,
    loans: null,
    other: null
};

const AwardSpendingAgency = () => {
    const { defCodes } = useSelector((state) => state.covid19);
    const [inFlight, setInFlight] = useState(true);
    const [tabCounts, setTabCounts] = useState(initialTabState);

    const [activeTab, setActiveTab] = useState(
        {
            internal: awardTypeTabs[0].internal,
            subtitle: awardTypeTabs[0].label
        }
    );


    useEffect(() => {
        if (defCodes && defCodes.length > 0) {
            let params = {};

            // Make an API request for the count of Agency for each award type
            // Post-MVP this should be updated to use a new endpoint that returns all the counts
            const promises = awardTypeTabs.map((awardType) => {
                params = {
                    filter: {
                        def_codes: defCodes.map((defc) => defc.code)
                    }
                };
                if (awardType.internal === 'all') {
                    params.filter.award_type_codes = [].concat(...Object.values(awardTypeGroups));
                } else {
                    params.filter.award_type_codes = awardTypeGroups[awardType.internal];
                }
                return fetchAgencyCount(params).promise;
            });
            // Wait for all the requests to complete and then store the results in state
            Promise.all(promises)
                .then(([allRes, grantsRes, loansRes, directPaymentsRes, otherRes, contractsRes, idvsRes]) => {
                    setTabCounts({
                        all: allRes.data.count,
                        contracts: contractsRes.data.count,
                        idvs: idvsRes.data.count,
                        grants: grantsRes.data.count,
                        direct_payments: directPaymentsRes.data.count,
                        loans: loansRes.data.count,
                        other: otherRes.data.count
                    });
                });
        }
    }, [defCodes, activeTab]);

    useEffect(() => {
        const countState = areCountsDefined(tabCounts);
        if (!countState) {
            setInFlight(true);
        }
        else if (countState) {
            setInFlight(false);
        }
    }, [tabCounts, setInFlight]);

    const changeActiveTab = (tab) => {
        const tabSubtitle = awardTypeTabs.find((item) => item.internal === tab).label;
        const tabInternal = awardTypeTabs.find((item) => item.internal === tab).internal;

        setActiveTab({
            internal: tabInternal,
            subtitle: tabSubtitle
        });
    };

    return (
        <div className="body__content spending-by-agency">
            <DateNote />
            <h3 className="body__narrative">
                <strong>Which federal agencies</strong> issued awards using funds from COVID-19 spending?
            </h3>
            <div className="body__narrative-description">
                <p>
                    Federal agencies receive funding from Congress and they issue awards to recipients using those funds. In this section we show which agencies and sub-agencies have awarded funds in response to the COVID-19 pandemic, as well as a breakdown of their obligated and outlayed funds.
                </p>
                <ReadMore>
                    <p>
                        <em>Please note that agencies without COVID-19 appropriated funds are not represented here. Additionally, award amounts do not include the Small Business Administration (SBA)&apos;s Paycheck Protection Program.</em>
                    </p>
                </ReadMore>
            </div>
            <MoreOptionsTabs tabs={awardTypeTabs} tabCounts={tabCounts} pickerLabel="More Award Types" changeActiveTab={changeActiveTab} />
            <SummaryInsightsContainer
                resultsCount={tabCounts[activeTab.internal]}
                overviewData={overviewData}
                activeTab={activeTab.internal}
                areCountsLoading={inFlight} />
            <div className="spending-by-agency__content">
                <AwardSpendingAgencyTableContainer type={activeTab.internal} subHeading="Sub-Agencies" />
            </div>
        </div>
    );
};

export default AwardSpendingAgency;
