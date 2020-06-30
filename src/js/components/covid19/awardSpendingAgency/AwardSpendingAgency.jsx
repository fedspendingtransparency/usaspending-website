/**
 * AwardSpendingAgency.jsx
 * Created by James Lee 6/18/20
 */

import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { fetchAwardCount, fetchAwardAmounts, fetchAgencyCount } from 'helpers/disasterHelper';
import DateNote from 'components/covid19/DateNote';
import { awardSpendingAgencyTableTabs } from 'dataMapping/covid19/awardSpendingAgency/awardSpendingAgencyTableTabs';
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
    const [awardCount, setAwardCount] = useState(null);
    const [awardOutlays, setAwardOutlays] = useState(null);
    const [awardObligations, setAwardObligations] = useState(null);
    const [numberOfAwards, setNumberOfAwards] = useState(null);
    const [activeTabLabel, setActiveTabLabel] = useState(awardSpendingAgencyTableTabs[0].label);
    const defCodes = useSelector((state) => state.covid19.defCodes);

    // TODO - Remove hard coded values
    const dateString = "June 30, 2020";

    // TODO - Remove mock counts and replace with API call for counts
    const mockCounts = {
        all: 123123123,
        contracts: 2856942,
        idvs: 65718,
        grants: 262180,
        direct_payments: 3173522,
        loans: 955562
    };

    useEffect(() => {
        const params = {
            filter: {
                def_codes: defCodes.map((defc) => defc.code)
                // TODO - add award type codes
            }
        };
        fetchAgencyCount(params).promise
            .then((res) => {
                setAwardCount(res.data.count);
            });
        fetchAwardAmounts(params).promise
            .then((res) => {
                setAwardObligations(res.data.obligation);
                setAwardOutlays(res.data.outlay);
            });
        fetchAwardCount(params).promise
            .then((res) => {
                setNumberOfAwards(res.data.count);
            });
    }, [defCodes]);

    const amounts = {
        awardCount,
        awardOutlays,
        awardObligations,
        numberOfAwards
    };

    const changeActiveTab = (tab) => {
        // TODO - update counts and amounts based on which tab selected
        const tabLabel = awardSpendingAgencyTableTabs.filter((item) => item.internal === tab)[0].label;
        setActiveTabLabel(tabLabel);
    };


    return (
        <div className="body__content award-spending">
            <DateNote dateString={dateString} />
            <h3 className="body__narrative">These are the federal agencies who spent COVID-19 Response funding on <strong>awards.</strong></h3>
            <p className="body__narrative-description">
                Federal agencies allocate award funds. Agencies receive funding from the Federal Government, which they award to recipients in order to respond to the COVID-19 pandemic.
            </p>
            <MoreOptionsTabs tabs={awardSpendingAgencyTableTabs} tabCounts={mockCounts} pickerLabel="More Award Types" changeActiveTab={changeActiveTab} />
            <div className="overview-data-group">
                {overviewData.map((data) => (
                    <OverviewData
                        key={data.label}
                        {...data}
                        subtitle={`for all ${activeTabLabel}`}
                        amount={amounts[data.type]} />
                ))}
            </div>
            <div className="award-spending__content" />
        </div>
    );
};

export default AwardSpendingAgency;
