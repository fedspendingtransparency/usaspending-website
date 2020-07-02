/**
 * SummaryInsightsContainer.jsx
 * Created by Lizzie Salita 6/24/20
 */

import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { fetchCfdaCount, fetchAwardAmounts, fetchAwardCount } from 'helpers/disasterHelper';
import OverviewData from 'components/covid19/OverviewData';

const overviewData = [
    {
        type: 'cfdaCount',
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

const SummaryInsightsContainer = () => {
    const [cfdaCount, setCfdaCount] = useState(null);
    const [awardOutlays, setAwardOutlays] = useState(null);
    const [awardObligations, setAwardObligations] = useState(null);
    const [numberOfAwards, setNumberOfAwards] = useState(null);
    const defCodes = useSelector((state) => state.covid19.defCodes);

    useEffect(() => {
        const params = {
            filter: {
                def_codes: defCodes.map((defc) => defc.code)
                // TODO - add award type codes
            }
        };
        fetchCfdaCount(params).promise
            .then((res) => {
                setCfdaCount(res.data.count);
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
        cfdaCount,
        awardOutlays,
        awardObligations,
        numberOfAwards
    };

    return (
        <div className="overview-data-group">
            {overviewData.map((data) => (
                <OverviewData
                    key={data.label}
                    {...data}
                    // TODO - use the active award type in the subtitle
                    subtitle="for all awards"
                    amount={amounts[data.type]} />
            ))}
        </div>
    );
};

export default SummaryInsightsContainer;
