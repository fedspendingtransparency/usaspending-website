/**
 * AwardSpendingAgency.jsx
 * Created by James Lee 6/18/20
 */

import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { fetchAwardCount, fetchAwardAmounts, fetchAgencyCount } from 'helpers/disasterHelper';
import DateNote from 'components/covid19/DateNote';
import { awardTypeTabs } from 'dataMapping/covid19/covid19';
import { awardTypeGroups } from 'dataMapping/search/awardType';
import AwardSpendingAgencyTableContainer from 'containers/covid19/awardSpendingAgency/AwardSpendingAgencyTableContainer';
import MoreOptionsTabs from '../../sharedComponents/moreOptionsTabs/MoreOptionsTabs';
import OverviewData from '../OverviewData';

const overviewData = [
    {
        type: 'agencyCount',
        label: 'Number of Agencies'
    },
    {
        type: 'awardOutlays',
        label: 'Award Outlays',
        dollarAmount: true
    },
    {
        type: 'awardObligations',
        label: 'Award Obligations',
        dollarAmount: true
    },
    {
        type: 'numberOfAwards',
        label: 'Number of Awards'
    }
];

const AwardSpendingAgency = () => {
    const [agencyCount, setAgencyCount] = useState(null);
    const [awardOutlays, setAwardOutlays] = useState(null);
    const [awardObligations, setAwardObligations] = useState(null);
    const [numberOfAwards, setNumberOfAwards] = useState(null);

    const [activeTab, setActiveTab] = useState(
        {
            internal: awardTypeTabs[0].internal,
            subtitle: awardTypeTabs[0].label
        }
    );

    const [tabCounts, setTabCounts] = useState({
        all: null,
        contracts: null,
        idvs: null,
        grants: null,
        direct_payments: null,
        loans: null,
        other: null
    });

    const defCodes = useSelector((state) => state.covid19.defCodes);
    const dateString = "June 30, 2020";

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
                    const allAwardTypeGroups = [];
                    params.filter.award_type_codes = allAwardTypeGroups.concat(...Object.values(awardTypeGroups));
                } else {
                    params.filter.award_type_codes = awardTypeGroups[awardType.internal];
                }
                return fetchAgencyCount(params).promise;
            });
            // Wait for all the requests to complete and then store the results in state
            Promise.all(promises)
                .then(([allRes, contractsRes, idvsRes, grantsRes, directPaymentsRes, loansRes, otherRes]) => {
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

            params = {
                filter: {
                    def_codes: defCodes.map((defc) => defc.code)
                }
            };
            if (activeTab.internal === 'all') {
                const allAwardTypeGroups = [];
                params.filter.award_type_codes = allAwardTypeGroups.concat(...Object.values(awardTypeGroups));
            } else {
                params.filter.award_type_codes = awardTypeGroups[activeTab.internal];
            }

            fetchAwardAmounts(params).promise
                .then((res) => {
                    setAwardObligations(res.data.obligation);
                    setAwardOutlays(res.data.outlay);
                });
            fetchAwardCount(params).promise
                .then((res) => {
                    setNumberOfAwards(res.data.count);
                });
        }
    }, [defCodes, activeTab]);

    useEffect(() => {
        setAgencyCount(tabCounts[activeTab.internal]);
    }, [tabCounts]);

    const amounts = {
        agencyCount,
        awardOutlays,
        awardObligations,
        numberOfAwards
    };

    const changeActiveTab = (tab) => {
        const tabSubtitle = awardTypeTabs.find((item) => item.internal === tab).label;
        const tabInternal = awardTypeTabs.find((item) => item.internal === tab).internal;

        setActiveTab({
            internal: tabInternal,
            subtitle: tabSubtitle
        });
    };

    return (
        <div className="body__content award-spending">
            <DateNote dateString={dateString} />
            <h3 className="body__narrative">These are the federal agencies who spent COVID-19 Response funding on <strong>awards.</strong></h3>
            <p className="body__narrative-description">
                Federal agencies allocate award funds. Agencies receive funding from the Federal Government, which they award to recipients in order to respond to the COVID-19 pandemic.
            </p>
            <MoreOptionsTabs tabs={awardTypeTabs} tabCounts={tabCounts} pickerLabel="More Award Types" changeActiveTab={changeActiveTab} />
            <div className="overview-data-group">
                {overviewData.map((data) => (
                    <OverviewData
                        key={data.label}
                        {...data}
                        subtitle={`for all ${activeTab.subtitle}`}
                        amount={amounts[data.type]} />
                ))}
            </div>
            <div className="award-spending__content">
                <AwardSpendingAgencyTableContainer type={activeTab.internal} subHeading="Sub-Agencies" />
            </div>
        </div>
    );
};

export default AwardSpendingAgency;
