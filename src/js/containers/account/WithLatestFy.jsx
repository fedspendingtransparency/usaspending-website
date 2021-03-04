import React, { useEffect, useRef, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { isCancel } from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { get } from 'lodash';

import { setSubmissionPeriods } from 'redux/actions/account/accountActions';
import { getLatestPeriodAsMoment, getLatestPeriod, fetchAllSubmissionDates } from 'helpers/accountHelper';
import {
    isPeriodVisible,
    isPeriodSelectable,
    getLastPeriodWithinQuarterByPeriod,
    getPeriodWithTitleById
} from "helpers/aboutTheDataHelper";

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

export const useQueryParams = () => Object.fromEntries(new URLSearchParams(useLocation().search));

/*
    * useValidTimeBasedQueryParams
    * this function enforces validation logic for fiscal years and fiscal periods in the URL as query params
    * by using the latest submission periods as a reference.
*/
export const useValidTimeBasedQueryParams = (currentUrlFy, currentUrlPeriod = null, requiredParams = ['fy', 'period']) => {
    const history = useHistory();
    const existingParams = useQueryParams();
    const [, submissionPeriods, latestSubmission] = useLatestAccountData();
    const { year: latestFy, period: latestPeriod } = latestSubmission;
    const [{ period, fy }, setYearAndPeriod] = useState({ period: '', fy: '' });

    const updateUrl = (newParamsAsObj) => {
        const newQueryParams = Object
            .entries(newParamsAsObj)
            .filter(([, value]) => value !== '' && value)
            .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), existingParams);
        setYearAndPeriod(newParamsAsObj);
        history.replace({
            pathname: ``,
            search: `?${new URLSearchParams(newQueryParams).toString()}`
        });
    };

    const handleTimeChange = (y, p = null) => {
        if (y && p) {
            updateUrl({ fy: `${y}`, period: `${p}` });
        }
        else if (y) {
            updateUrl({ fy: `${y}` });
        }
        else if (p) {
            updateUrl({ period: `${p}` });
        }
    };

    useEffect(() => {
        // Handles defining undefined params
        const isDataReadyForLatest = (submissionPeriods.size && latestFy && latestPeriod);
        const periodAndFyRequired = (requiredParams.includes('fy') && requiredParams.includes('period'));
        if (isDataReadyForLatest && requiredParams.some((p) => !existingParams[p])) {
            if (periodAndFyRequired && !existingParams.fy && existingParams.period) {
                handleTimeChange(latestFy);
            }
            // only need to update the fy
            else if (periodAndFyRequired && existingParams.fy && !existingParams.period) {
                handleTimeChange(null, latestPeriod);
            }
            // only need to update the period
            else if (periodAndFyRequired && !existingParams.fy && !existingParams.period) {
                handleTimeChange(latestFy, latestPeriod);
            }
            else if (isDataReadyForLatest && requiredParams.includes('fy') && !existingParams.fy) {
                handleTimeChange(latestFy);
            }
            else if (isDataReadyForLatest && requiredParams.includes('period') && !existingParams.period) {
                handleTimeChange(null, latestPeriod);
            }
        }
    }, [history, latestFy, latestPeriod, submissionPeriods.size, currentUrlFy, currentUrlPeriod]);


    useEffect(() => {
        // Handles validating defined params
        if (submissionPeriods.size && latestFy && latestPeriod && requiredParams.every((p) => existingParams[p])) {
            const availablePeriodsInFy = submissionPeriods.toJS().filter(({ submission_fiscal_year: y }) => parseInt(currentUrlFy, 10) === y);
            if (availablePeriodsInFy.length && currentUrlPeriod) {
                // fy selection is valid but what about the period? 🤔
                const validPeriod = isPeriodVisible(availablePeriodsInFy, currentUrlPeriod)
                    ? currentUrlPeriod
                    : `${latestPeriod}`;
                const selectablePeriod = isPeriodSelectable(availablePeriodsInFy, validPeriod)
                    ? validPeriod
                    : getLastPeriodWithinQuarterByPeriod(validPeriod);
                handleTimeChange(currentUrlFy, selectablePeriod);
            }
            else if (currentUrlPeriod) {
                // invalid time selection, use the latest available fy/period 👌
                handleTimeChange(latestFy, latestPeriod);
            }
            else if (availablePeriodsInFy.length) {
                handleTimeChange(currentUrlFy);
            }
            else {
                handleTimeChange(latestFy);
            }
        }
    }, [submissionPeriods, currentUrlFy, currentUrlPeriod, latestPeriod, latestFy]);

    if (requiredParams.length === 1 && requiredParams[0] === 'fy') return [fy, updateUrl];

    return [
        fy,
        period && latestPeriod ? getPeriodWithTitleById(period, latestPeriod) : period,
        updateUrl
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
