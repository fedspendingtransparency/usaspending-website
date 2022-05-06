import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { isCancel } from 'axios';
import moment from 'moment';

import { InformationBoxes } from "data-transparency-ui";
import { awardTypeGroups } from 'dataMapping/search/awardType';
import { fetchSubagencyNewAwardsCount, fetchSubagencySummary } from 'apis/agency';
import BaseAgencySubagencyCount from 'models/v2/agency/BaseAgencySubagencyCount';
import { setDataThroughDates } from 'redux/actions/agency/agencyActions';

const propTypes = {
    fy: PropTypes.string,
    activeTab: PropTypes.string,
    summaryData: PropTypes.arrayOf(PropTypes.shape({
        type: PropTypes.string,
        title: PropTypes.string
    })),
    data: PropTypes.object
};

const SubAgencySummaryContainer = ({
    activeTab,
    fy,
    summaryData,
    data
}) => {
    const numberOfAwardsRequest = useRef(null);
    const summaryRequest = useRef(null);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(false);
    const request = React.useRef(null);
    const [numberOfAwards, setNumberOfAwards] = useState(null);
    const [numberOfTransactions, setNumberOfTransactions] = useState(null);
    const [awardObligations, setAwardObligations] = useState(null);
    const { toptierCode } = useSelector((state) => state.agency.overview);

    useEffect(() => {
        if (request.current) {
            request.current.cancel();
        }
        if (numberOfAwardsRequest.current) {
            numberOfAwardsRequest.current.cancel();
        }
        if (summaryRequest.current) {
            summaryRequest.current.cancel();
        }
    }, []);

    const getNewAwardsCount = async () => {
        if (numberOfAwardsRequest.current) {
            numberOfAwardsRequest.current.cancel();
        }
        if (error) {
            setError(false);
        }
        if (!loading) {
            setLoading(true);
        }
        if (activeTab !== 'all') {
            const params = awardTypeGroups[activeTab];
            numberOfAwardsRequest.current = fetchSubagencyNewAwardsCount(toptierCode, fy, params);
        }
        else {
            numberOfAwardsRequest.current = fetchSubagencyNewAwardsCount(toptierCode, fy);
        }
        numberOfAwardsRequest.current.promise
            .then((res) => {
                const newAwards = Object.create(BaseAgencySubagencyCount);
                newAwards.populate(res.data);
                setNumberOfAwards(newAwards.newAwardCount);
                setLoading(false);
                numberOfAwardsRequest.current = null;
            })
            .catch((e) => {
                if (!isCancel(e)) {
                    console.error(e);
                    setError(true);
                    setLoading(false);
                    numberOfAwardsRequest.current = null;
                }
            });
    };

    const dispatch = useDispatch();
    const getSubagencySummary = async () => {
        if (summaryRequest.current) {
            summaryRequest.current.cancel();
        }
        if (error) {
            setError(false);
        }
        if (!loading) {
            setLoading(true);
        }
        if (activeTab !== 'all') {
            const params = awardTypeGroups[activeTab];
            summaryRequest.current = fetchSubagencySummary(toptierCode, fy, params);
        }
        else {
            summaryRequest.current = fetchSubagencySummary(toptierCode, fy);
        }
        summaryRequest.current.promise
            .then((res) => {
                const subagencySummaryData = Object.create(BaseAgencySubagencyCount);
                subagencySummaryData.populate(res.data);

                // set "Data Through" date for section
                let awardSpendingDataThroughDate = res.data.latest_action_date;
                if (awardSpendingDataThroughDate) {
                    awardSpendingDataThroughDate = moment(awardSpendingDataThroughDate).format('M/D/YYYY');
                }
                else {
                    awardSpendingDataThroughDate = 'no data';
                }
                dispatch(setDataThroughDates({ awardSpendingDataThroughDate }));

                setNumberOfTransactions(subagencySummaryData.transactionCount);
                setAwardObligations(subagencySummaryData.obligations);
                setLoading(false);
                summaryRequest.current = null;
            })
            .catch((e) => {
                if (!isCancel(e)) {
                    console.error(e);
                    setError(true);
                    setLoading(false);
                    summaryRequest.current = null;
                }
            });
    };

    useEffect(() => {
        if (toptierCode && data) {
            getNewAwardsCount();
            getSubagencySummary();
        }
    }, [fy, toptierCode, activeTab]);

    const amounts = {
        awardObligations,
        numberOfTransactions,
        numberOfAwards
    };

    return (
        <div className="overview-data-group">
            <InformationBoxes
                boxes={summaryData.map((sdata) => ({
                    ...sdata,
                    amount: amounts[sdata.type],
                    isLoading: loading
                }))} />
        </div>
    );
};

SubAgencySummaryContainer.propTypes = propTypes;
export default SubAgencySummaryContainer;
