/**
 * SummaryInsightsContainer.jsx
 * Created by Jonathan Hill 07/07/20
 */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { awardTypeGroups, awardTypeGroupLabels } from 'dataMapping/search/awardType';
import { fetchAwardAmounts, fetchAwardCount, fetchRecipientCount } from 'helpers/disasterHelper';
import OverviewData from 'components/covid19/OverviewData';

const propTypes = {
    activeFilter: PropTypes.string
};

const overviewData = [
    {
        type: 'numberOfRecipients',
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

const SummaryInsightsContainer = ({ activeFilter }) => {
    const [awardOutlays, setAwardOutlays] = useState(null);
    const [awardObligations, setAwardObligations] = useState(null);
    const [numberOfAwards, setNumberOfAwards] = useState(null);
    const [numberOfRecipients, setNumberOfRecipients] = useState(null);
    const defCodes = useSelector((state) => state.covid19.defCodes);

    useEffect(() => {
        // Reset any existing counts
        setAwardOutlays(null);
        setAwardObligations(null);
        setNumberOfAwards(null);
        setNumberOfRecipients(null);

        const params = {
            filter: {
                def_codes: defCodes.map((defc) => defc.code)
            }
        };
        if (activeFilter !== 'all') {
            params.filter.award_type_codes = awardTypeGroups[activeFilter];
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
        fetchRecipientCount(params).promise
            .then((res) => {
                setNumberOfRecipients(res.data.count);
            });
    }, [defCodes, activeFilter]);

    const amounts = {
        numberOfRecipients,
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
                    subtitle={`for all ${(awardTypeGroupLabels[activeFilter] || 'awards').toLowerCase()}`}
                    amount={amounts[data.type]} />
            ))}
        </div>
    );
};

SummaryInsightsContainer.propTypes = propTypes;
export default SummaryInsightsContainer;
