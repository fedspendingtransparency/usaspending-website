/**
 * SummaryInsightsContainer.jsx
 * Created by Lizzie Salita 6/24/20
 */

import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { setTotals } from 'redux/actions/covid19/covid19Actions';
import { awardTypeGroups, awardTypeGroupLabels } from 'dataMapping/search/awardType';
import { fetchAwardAmounts } from 'helpers/disasterHelper';
import OverviewData from 'components/covid19/OverviewData';
import { useInFlightList } from 'helpers/covid19Helper';
import { isEqual } from 'lodash';

const propTypes = {
    activeTab: PropTypes.string,
    resultsCount: PropTypes.number,
    overviewData: PropTypes.arrayOf(PropTypes.shape({
        type: PropTypes.string,
        label: PropTypes.string
    })),
    areCountsLoading: PropTypes.bool,
    assistanceOnly: PropTypes.bool,
    spendingByAgencyOnly: PropTypes.bool,
    recipientOnly: PropTypes.bool,
    setAwardAmounts: PropTypes.func

};

const SummaryInsightsContainer = ({
    activeTab,
    resultsCount,
    overviewData,
    areCountsLoading,
    assistanceOnly,
    spendingByAgencyOnly,
    recipientOnly,
    setAwardAmounts
}) => {
    const awardAmountRequest = useRef();
    const dispatch = useDispatch();
    const [awardOutlays, setAwardOutlays] = useState(null);
    const [awardObligations, setAwardObligations] = useState(null);
    const [numberOfAwards, setNumberOfAwards] = useState(null);
    const initialInFlightState = overviewData.map((d) => d.type);
    const [inFlightList, , removeFromInFlight, resetInFlight] = useInFlightList(initialInFlightState);
    const defCodes = useSelector((state) => state.covid19.defCodes);

    useEffect(() => {
        setAwardOutlays(null);
        setAwardObligations(null);
        setNumberOfAwards(null);
        if (awardAmountRequest.current) {
            awardAmountRequest.current.cancel();
        }
        const params = {
            filter: {
                def_codes: defCodes.map((defc) => defc.code)
            }
        };
        if (activeTab !== 'all') {
            params.filter.award_type_codes = awardTypeGroups[activeTab];
        }
        if (assistanceOnly && activeTab === 'all') {
            params.filter.award_type = 'assistance';
        }
        if (defCodes && defCodes.length > 0) {
            awardAmountRequest.current = fetchAwardAmounts(params);
            awardAmountRequest.current.promise
                .then((res) => {
                    setAwardObligations(res.data.obligation);
                    setAwardOutlays(res.data.outlay);
                    setNumberOfAwards(res.data.award_count);

                    /* eslint-disable camelcase */
                    // set totals in redux, we can use totals elsewhere to calculate unlinked data
                    const totals = {
                        obligation: res.data?.obligation,
                        outlay: res.data?.outlay,
                        awardCount: res.data?.award_count,
                        faceValueOfLoan: res.data?.face_value_of_loan
                    };

                    if (spendingByAgencyOnly) {
                        dispatch(setTotals('SPENDING_BY_AGENCY', totals));
                    } else if (assistanceOnly) {
                        dispatch(setTotals('ASSISTANCE', totals));
                    } else if (recipientOnly) {
                        dispatch(setTotals('RECIPIENT', totals));
                    }
                });
        }
    }, [defCodes, activeTab]);

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
            {overviewData.map((data) => (
                <OverviewData
                    key={data.label}
                    {...data}
                    subtitle={subtitle}
                    amount={amounts[data.type]}
                    isLoading={data.type === 'resultsCount' ? areCountsLoading : inFlightList.includes(data.type)} />
            ))}
        </div>
    );
};

SummaryInsightsContainer.propTypes = propTypes;
export default SummaryInsightsContainer;
