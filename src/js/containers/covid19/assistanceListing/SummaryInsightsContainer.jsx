/**
 * SummaryInsightsContainer.jsx
 * Created by Lizzie Salita 6/24/20
 */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { awardTypeGroups, awardTypeGroupLabels } from 'dataMapping/search/awardType';
import { fetchCfdaCount, fetchAwardAmounts, fetchAwardCount } from 'helpers/disasterHelper';
import OverviewData from 'components/covid19/OverviewData';

const propTypes = {
    activeTab: PropTypes.string
};

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

const SummaryInsightsContainer = ({ activeTab }) => {
    const [cfdaCount, setCfdaCount] = useState(null);
    const [awardOutlays, setAwardOutlays] = useState(null);
    const [awardObligations, setAwardObligations] = useState(null);
    const [numberOfAwards, setNumberOfAwards] = useState(null);
    const defCodes = useSelector((state) => state.covid19.defCodes);

    useEffect(() => {
        // Reset any existing counts
        setCfdaCount(null);
        setAwardOutlays(null);
        setAwardObligations(null);
        setNumberOfAwards(null);

        const params = {
            filter: {
                def_codes: defCodes.map((defc) => defc.code)
            }
        };
        if (activeTab !== 'all') {
            params.filter.award_type_codes = awardTypeGroups[activeTab];
        }
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
    }, [defCodes, activeTab]);

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
                    subtitle={`for all ${(awardTypeGroupLabels[activeTab] || 'awards').toLowerCase()}`}
                    amount={amounts[data.type]} />
            ))}
        </div>
    );
};

SummaryInsightsContainer.propTypes = propTypes;
export default SummaryInsightsContainer;
