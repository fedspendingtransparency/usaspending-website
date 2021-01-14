import React, { useEffect, useRef, useState } from 'react';
import { isCancel } from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import { setSubmissionPeriods } from 'redux/actions/account/accountActions';
import { getLatestPeriodAsMoment, getLatestPeriod, fetchAllSubmissionDates } from 'helpers/accountHelper';

// TODO: Refactor existing consumers of WithLatestFy to use this custom hook
export const useLatestAccountData = () => {
    const dispatch = useDispatch();
    const { submissionPeriods } = useSelector((state) => state.account);
    const [{ latestMoment, latestPeriod }, setLatestData] = useState({ latestPeriod: getLatestPeriod([]), latestMoment: null });
    const request = useRef();

    useEffect(() => {
        if (!submissionPeriods.size) {
            request.current = fetchAllSubmissionDates();
            request.current.promise
                .then(({ data: { available_periods: periods } }) => {
                    dispatch(setSubmissionPeriods(periods));
                    getLatestPeriodAsMoment(periods);
                    setLatestData({
                        latestMoment: getLatestPeriodAsMoment(periods),
                        latestPeriod: getLatestPeriod(periods)
                    });
                    request.current = null;
                })
                .catch((e) => {
                    if (!isCancel(e)) {
                        console.error('Error fetching active periods: ', e);
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
        latestPeriod
    ];
};

const WithLatestFy = ({
    children,
    propName = 'latestSubmissionDate',
    format = null
}) => {
    const [latestPeriodAsMoment, submissionPeriods, latestPeriod] = useLatestAccountData();

    if (format) {
        return React.cloneElement(children, {
            [propName]: latestPeriodAsMoment
                ? latestPeriodAsMoment.format(format)
                : latestPeriodAsMoment,
            submissionPeriods: submissionPeriods.toJS(),
            latestPeriod
        });
    }

    return React.cloneElement(children, {
        [propName]: latestPeriodAsMoment,
        submissionPeriods: submissionPeriods.toJS(),
        latestPeriod
    });
};

WithLatestFy.propTypes = {
    children: PropTypes.node.isRequired,
    format: PropTypes.string,
    propName: PropTypes.string
};

export default WithLatestFy;
