import React, { useEffect, useRef, useState } from 'react';
import { isCancel } from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { get } from 'lodash';

import { setSubmissionPeriods } from 'redux/actions/account/accountActions';
import { getLatestPeriodAsMoment, getLatestPeriod, fetchAllSubmissionDates } from 'helpers/accountHelper';

// TODO: Refactor existing consumers of WithLatestFy to use this custom hook
export const useLatestAccountData = () => {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(true);
    const [errorMsg, setErrorMsg] = useState('');
    const { submissionPeriods } = useSelector((state) => state.account);
    const [{ latestMoment, latestPeriod }, setLatestData] = useState({ latestPeriod: getLatestPeriod([]), latestMoment: null });
    const request = useRef();

    useEffect(() => {
        if (submissionPeriods.size && isLoading) {
            setIsLoading(false);
        }
        if (!submissionPeriods.size) {
            setIsLoading(true);
            setErrorMsg('');
            request.current = fetchAllSubmissionDates();
            request.current.promise
                .then(({ data: { available_periods: periods } }) => {
                    dispatch(setSubmissionPeriods(periods));
                    getLatestPeriodAsMoment(periods);
                    setLatestData({
                        latestMoment: getLatestPeriodAsMoment(periods),
                        latestPeriod: getLatestPeriod(periods)
                    });
                    setIsLoading(false);
                    request.current = null;
                })
                .catch((e) => {
                    if (!isCancel(e)) {
                        console.error('Error fetching active periods: ', e);
                        setErrorMsg(get(e, 'message', 'Error fetching active periods. Please refresh your browser.'));
                        request.current = null;
                    }
                });
        }
        else if (!latestMoment || !latestPeriod) {
            setLatestData({
                latestMoment: getLatestPeriodAsMoment(submissionPeriods.toJS()),
                latestPeriod: getLatestPeriod(submissionPeriods.toJS())
            });
        }

        return () => {
            if (request.current) {
                console.info('cancelling request, fetchAllSubmissionDates');
                request.current.cancel();
            }
        };
    }, [dispatch, submissionPeriods]);

    return [
        latestMoment,
        submissionPeriods,
        latestPeriod,
        isLoading,
        errorMsg
    ];
};

const withLatestFy = (WrappedComponent, format = null) => (props) => {
    const [latestPeriodAsMoment, submissionPeriods, latestPeriod, isLoading, errorMsg] = useLatestAccountData();
    return (
        <WrappedComponent
            {...props}
            isFetchLatestFyLoading={isLoading}
            fetchLatestFyError={errorMsg}
            latestSubmissionDate={(latestPeriodAsMoment && format)
                ? latestPeriodAsMoment.format(format)
                : latestPeriodAsMoment}
            submissionPeriods={submissionPeriods.toJS()}
            latestPeriod={latestPeriod} />
    );
};

export default withLatestFy;
