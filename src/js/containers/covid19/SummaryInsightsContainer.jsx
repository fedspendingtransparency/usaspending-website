/**
 * SummaryInsightsContainer.jsx
 * Created by Lizzie Salita 6/24/20
 */

import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { setTotals } from 'redux/actions/covid19/covid19Actions';
import { awardTypeGroups, awardTypeGroupLabels } from 'dataMapping/search/awardType';
import { fetchAwardAmounts } from 'apis/disaster';
import { InformationBoxes } from "data-transparency-ui";
import { useInFlightList } from 'helpers/covid19Helper';
import { isEqual } from 'lodash';

const propTypes = {
    activeTab: PropTypes.string,
    prevTab: PropTypes.string,
    resultsCount: PropTypes.number,
    overviewData: PropTypes.arrayOf(PropTypes.shape({
        type: PropTypes.string,
        title: PropTypes.string
    })),
    areCountsLoading: PropTypes.bool,
    assistanceOnly: PropTypes.bool,
    spendingByAgencyOnly: PropTypes.bool,
    recipientOnly: PropTypes.bool

};

const SummaryInsightsContainer = ({
    activeTab,
    prevTab,
    resultsCount,
    overviewData,
    areCountsLoading,
    assistanceOnly,
    spendingByAgencyOnly,
    recipientOnly
}) => {
    const awardAmountRequest = useRef();
    const dispatch = useDispatch();
    const [awardOutlays, setAwardOutlays] = useState(null);
    const [awardObligations, setAwardObligations] = useState(null);
    const [numberOfAwards, setNumberOfAwards] = useState(null);
    const initialInFlightState = overviewData.map((d) => d.type);
    const [inFlightList, , removeFromInFlight, resetInFlight] = useInFlightList(initialInFlightState);
    const { defcParams, allAwardTypeTotals } = useSelector((state) => state.covid19, isEqual);

    useEffect(() => {
    // Clear out old values
        setAwardOutlays(null);
        setAwardObligations(null);
        setNumberOfAwards(null);
        if (spendingByAgencyOnly) {
            dispatch(setTotals('SPENDING_BY_AGENCY', {}));
        }
        else if (assistanceOnly) {
            dispatch(setTotals('ASSISTANCE', {}));
        }
        else if (recipientOnly) {
            dispatch(setTotals('RECIPIENT', {}));
        }

        if (awardAmountRequest.current) {
            awardAmountRequest.current.cancel();
        }
        if (defcParams && defcParams.length > 0) {
            const params = {
                filter: {
                    def_codes: defcParams
                }
            };
            if (activeTab === 'all' && assistanceOnly) {
                params.filter.award_type = 'assistance';
            }
            else {
                params.filter.award_type_codes = awardTypeGroups[activeTab];
            }
            awardAmountRequest.current = fetchAwardAmounts(params);
            awardAmountRequest.current.promise
                .then(({
                    data: {
                        obligation,
                        outlay,
                        award_count: awardCount,
                        face_value_of_loan: faceValueOfLoan
                    }
                }) => {
                    setAwardObligations(obligation);
                    setAwardOutlays(outlay);
                    setNumberOfAwards(awardCount);

                    // set totals in redux, we can use totals elsewhere to calculate unlinked data
                    const totals = {
                        obligation,
                        outlay,
                        awardCount,
                        faceValueOfLoan
                    };

                    if (spendingByAgencyOnly) {
                        dispatch(setTotals('SPENDING_BY_AGENCY', totals));
                    }
                    else if (assistanceOnly) {
                        dispatch(setTotals('ASSISTANCE', totals));
                    }
                    else if (recipientOnly) {
                        dispatch(setTotals('RECIPIENT', totals));
                    }
                });
        }
    }, [defcParams, activeTab, allAwardTypeTotals, assistanceOnly, prevTab, spendingByAgencyOnly, recipientOnly, dispatch]);

    useEffect(() => {
        if (awardOutlays === null && awardObligations === null && numberOfAwards === null) {
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
            });
        }
    }, [
        initialInFlightState,
        awardOutlays,
        awardObligations,
        numberOfAwards,
        inFlightList,
        removeFromInFlight,
        resetInFlight
    ]);

    const amounts = {
        resultsCount,
        awardOutlays,
        awardObligations,
        numberOfAwards
    };

    const allAwardsLabel = assistanceOnly ? 'Assistance Awards' : 'Awards';
    let subtitle = `for ${activeTab === 'all' ? 'All' : 'all'} ${(awardTypeGroupLabels[activeTab] || allAwardsLabel)}`;
    if (activeTab === 'other') {
        subtitle = 'for all Other Financial Assistance';
    }

    return (
        <div className="overview-data-group">
            <InformationBoxes
                boxes={overviewData.map((data) => ({
                    ...data,
                    subtitle,
                    amount: amounts[data.type],
                    isLoading: data.type === 'resultsCount' ? areCountsLoading : inFlightList.includes(data.type)
                }))} />
        </div>
    );
};

SummaryInsightsContainer.propTypes = propTypes;
export default SummaryInsightsContainer;
