import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import { setAccountDataAsOfDate } from 'redux/actions/account/accountActions';
import { getLatestPeriodAsMoment, fetchAllSubmissionDates } from 'helpers/accountHelper';

const WithLatestFy = ({
    children,
    propName = 'dataAsOf',
    format = null
}) => {
    const [submissionPeriods, setSubmissionPeriods] = useState([]);
    const { dataAsOf } = useSelector((state) => state.account);
    const request = useRef();
    const dispatch = useDispatch();

    useEffect(() => {
        if (!dataAsOf) {
            request.current = fetchAllSubmissionDates();
            request.current.promise
                .then(({ data: { available_periods: periods } }) => {
                    setSubmissionPeriods(periods);
                    dispatch(setAccountDataAsOfDate(getLatestPeriodAsMoment(periods)));
                    request.current = null;
                })
                .catch((e) => {
                    console.error('Error fetching active periods: ', e);
                    request.current = null;
                });
        }

        return () => {
            if (request.current) {
                request.current.cancel();
            }
        };
    }, []);

    if (format) {
        return React.cloneElement(children, {
            [propName]: dataAsOf !== null
                ? dataAsOf.format(format)
                : dataAsOf
        });
    }

    return React.cloneElement(children, { [propName]: dataAsOf, submissionPeriods });
};

WithLatestFy.propTypes = {
    children: PropTypes.node.isRequired,
    format: PropTypes.string,
    propName: PropTypes.string
};

export default WithLatestFy;

// TODO: Refactor existing consumers of WithLatestFy to use this custom hook
export const useLatestAccountData = () => {
    const [submissionPeriods, setSubmissionPeriods] = useState([]);
    const { dataAsOf } = useSelector((state) => state.account);
    const request = useRef();
    const dispatch = useDispatch();

    useEffect(() => {
        if (!dataAsOf) {
            request.current = fetchAllSubmissionDates();
            request.current.promise
                .then(({ data: { available_periods: periods } }) => {
                    setSubmissionPeriods(periods);
                    dispatch(setAccountDataAsOfDate(getLatestPeriodAsMoment(periods)));
                    request.current = null;
                })
                .catch((e) => {
                    console.error('Error fetching active periods: ', e);
                    request.current = null;
                });
        }

        return () => {
            if (request.current) {
                request.current.cancel();
            }
        };
    }, []);

    return [dataAsOf, submissionPeriods];
};
