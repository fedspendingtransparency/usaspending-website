/**
 * SummaryInsightsContainer.jsx
 * Created by Jonathan Hill 07/07/20
 */

import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { isEqual } from 'lodash';

import { awardTypeGroups, awardTypeGroupLabels } from 'dataMapping/search/awardType';
import { fetchAwardAmounts, fetchAwardCount, fetchDisasterSpendingCount } from 'helpers/disasterHelper';
import { useInFlightList } from 'helpers/covid19Helper';
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

const initialInFlightState = overviewData.map((d) => d.type);

const SummaryInsightsContainer = ({ activeFilter }) => {
    const awardAmountRequest = useRef();
    const awardCountRequest = useRef();
    const recipientCountRequest = useRef();
    const [awardOutlays, setAwardOutlays] = useState(null);
    const [awardObligations, setAwardObligations] = useState(null);
    const [numberOfAwards, setNumberOfAwards] = useState(null);
    const [numberOfRecipients, setNumberOfRecipients] = useState(null);
    const [inFlightList, , removeFromInFlight, resetInFlight] = useInFlightList(initialInFlightState);
    const defCodes = useSelector((state) => state.covid19.defCodes);

    useEffect(() => {
        // implement fetch/cancel pattern
        if (recipientCountRequest.current) {
            recipientCountRequest.current.cancel();
        }
        if (awardAmountRequest.current) {
            awardAmountRequest.current.cancel();
        }
        if (awardCountRequest.current) {
            awardCountRequest.current.cancel();
        }
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
        awardAmountRequest.current = fetchAwardAmounts(params);
        awardCountRequest.current = fetchAwardCount(params);
        recipientCountRequest.current = fetchDisasterSpendingCount('recipient', params);

        awardAmountRequest.current.promise
            .then((res) => {
                setAwardObligations(res.data.obligation);
                setAwardOutlays(res.data.outlay);
            });
        awardCountRequest.current.promise
            .then((res) => {
                setNumberOfAwards(res.data.count);
            });
        recipientCountRequest.current.promise
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

    useEffect(() => {
        if (!awardOutlays && !awardObligations && !numberOfAwards) {
            if (!isEqual(inFlightList, initialInFlightState)) {
                resetInFlight();
            }
        }
        else if (inFlightList) {
            inFlightList.forEach((inFlight) => {
                if (inFlight === 'awardObligations' && awardObligations) {
                    removeFromInFlight('awardObligations');
                }
                else if (inFlight === 'awardOutlays' && awardOutlays) {
                    removeFromInFlight('awardOutlays');
                }
                else if (inFlight === 'numberOfAwards' && numberOfAwards) {
                    removeFromInFlight('numberOfAwards');
                }
                else if (inFlight === 'numberOfRecipients' && numberOfRecipients) {
                    removeFromInFlight('numberOfRecipients');
                }
            });
        }
    }, [
        awardOutlays,
        awardObligations,
        numberOfAwards,
        numberOfRecipients,
        inFlightList,
        removeFromInFlight,
        resetInFlight
    ]);

    let subtitle = `for ${activeFilter === 'all' ? 'All' : 'all'} ${(awardTypeGroupLabels[activeFilter] || 'Awards')}`;
    if (activeFilter === 'other') {
        subtitle = 'for all Other Financial Assistance';
    }

    return (
        <div className="overview-data-group">
            {overviewData.map((data) => (
                <OverviewData
                    {...data}
                    key={data.label}
                    subtitle={subtitle}
                    amount={amounts[data.type]}
                    isLoading={inFlightList.includes(data.type)} />
            ))}
        </div>
    );
};

SummaryInsightsContainer.propTypes = propTypes;
export default SummaryInsightsContainer;
