/**
 * SummaryInsightsContainer.jsx
 * Created by Jonathan Hill 07/07/20
 */

import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { isCancel } from 'axios';
import { useSelector } from 'react-redux';
import { isEqual } from 'lodash';
import { awardTypeGroups, awardTypeGroupLabels } from 'dataMapping/search/awardType';
import { fetchAwardAmounts, fetchDisasterSpendingCount } from 'apis/disaster';
import { useInFlightList } from 'helpers/covid19Helper';
import { InformationBoxes } from "data-transparency-ui";
import GlossaryLink from 'components/sharedComponents/GlossaryLink';

const propTypes = {
    activeFilter: PropTypes.string
};

const overviewData = [
    {
        type: 'numberOfRecipients',
        title: 'Number of Recipients'
    },
    {
        type: 'awardObligations',
        title: (
            <div>
                <span className="glossary-term">Award Obligations</span> <GlossaryLink term="obligation" />
            </div>
        ),
        isMonetary: true
    },
    {
        type: 'awardOutlays',
        title: (
            <div>
                <span className="glossary-term">Award Outlays</span> <GlossaryLink term="outlay" />
            </div>
        ),
        isMonetary: true
    },
    {
        type: 'numberOfAwards',
        title: 'Number of Awards'
    }
];

const initialInFlightState = overviewData.map((d) => d.type);

const SummaryInsightsContainer = ({ activeFilter }) => {
    const awardAmountRequest = useRef();
    const recipientCountRequest = useRef();
    const [awardOutlays, setAwardOutlays] = useState(null);
    const [awardObligations, setAwardObligations] = useState(null);
    const [numberOfAwards, setNumberOfAwards] = useState(null);
    const [numberOfRecipients, setNumberOfRecipients] = useState(null);
    const [inFlightList, , removeFromInFlight, resetInFlight] = useInFlightList(initialInFlightState);
    const { allAwardTypeTotals, defcParams } = useSelector((state) => state.covid19);

    useEffect(() => {
        if (defcParams && defcParams.length > 0) {
            // implement fetch/cancel pattern
            if (recipientCountRequest.current) {
                recipientCountRequest.current.cancel();
            }
            if (awardAmountRequest.current) {
                awardAmountRequest.current.cancel();
            }
            const params = {
                filter: {
                    def_codes: defcParams,
                    ...activeFilter === 'all'
                        ? {}
                        : { award_type_codes: awardTypeGroups[activeFilter] }
                }
            };

            recipientCountRequest.current = fetchDisasterSpendingCount('recipient', params);

            // Reset any existing counts
            setAwardOutlays(null);
            setAwardObligations(null);
            setNumberOfAwards(null);
            setNumberOfRecipients(null);
            awardAmountRequest.current = fetchAwardAmounts(params);
            awardAmountRequest.current.promise
                .then((res) => {
                    setAwardObligations(res.data.obligation);
                    setAwardOutlays(res.data.outlay);
                    setNumberOfAwards(res.data.award_count);
                });
            recipientCountRequest.current.promise
                .then((res) => {
                    setNumberOfRecipients(res.data.count);
                }).catch((e) => {
                    if (isCancel(e)) {
                        // Got cancelled
                    }
                    else {
                        // Request failed
                        console.log(e);
                    }
                });
        }
    }, [activeFilter, Object.keys(allAwardTypeTotals).length, defcParams]);

    const amounts = {
        numberOfRecipients,
        awardOutlays,
        awardObligations,
        numberOfAwards
    };

    useEffect(() => {
        if (awardOutlays === null && awardObligations === null && numberOfAwards === null && numberOfRecipients === null) {
            if (!isEqual(inFlightList, initialInFlightState)) {
                resetInFlight();
            }
        }
        else if (inFlightList) {
            inFlightList.forEach((inFlight) => {
                if (inFlight === 'awardObligations' && awardObligations !== null) {
                    removeFromInFlight('awardObligations');
                }
                else if (inFlight === 'awardOutlays' && awardOutlays !== null) {
                    removeFromInFlight('awardOutlays');
                }
                else if (inFlight === 'numberOfAwards' && numberOfAwards !== null) {
                    removeFromInFlight('numberOfAwards');
                }
                else if (inFlight === 'numberOfRecipients' && numberOfRecipients !== null) {
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
            <InformationBoxes
                boxes={overviewData.map((data) => ({
                    ...data,
                    subtitle,
                    amount: amounts[data.type],
                    isLoading: inFlightList.includes(data.type)
                }))} />
        </div>
    );
};

SummaryInsightsContainer.propTypes = propTypes;
export default SummaryInsightsContainer;
