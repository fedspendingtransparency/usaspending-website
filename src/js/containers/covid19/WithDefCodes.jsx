import React, { useEffect, useRef, useState } from 'react';
import { isCancel } from 'axios';
import { useDispatch, useSelector } from 'react-redux';

import { setDEFCodes } from 'redux/actions/covid19/covid19Actions';
import { fetchDEFCodes } from 'apis/disaster';
import { get } from 'lodash';

export const useDefCodes = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const { defCodes } = useSelector((state) => state.covid19);
    const request = useRef();

    useEffect(() => {
        if (loading && defCodes.length) {
            setLoading(false);
        }
        if (!defCodes.length) {
            setLoading(true);
            setError('');
            request.current = fetchDEFCodes();
            request.current.promise
                .then(({ data: { codes } }) => {
                    dispatch(setDEFCodes(codes.filter((c) => c.disaster === 'covid_19' || c.code === '1' || c.code === 'Z')));
                    setLoading(false);
                    request.current = null;
                })
                .catch((e) => {
                    if (!isCancel(e)) {
                        console.error('Error fetching def codes: ', e);
                        setLoading(false);
                        setError(get(e, 'message', 'There was an error. Please try again!'));
                        request.current = null;
                    }
                });
        }
        return () => {
            if (request.current) {
                request.current.cancel();
            }
        };
    }, [dispatch, defCodes]);

    return [error, loading, defCodes];
};

const withDefCodes = (WrappedComponent) => (props) => {
    const [errorMsg, isLoading, defCodes] = useDefCodes();

    return (
        <WrappedComponent
            defCodeFetchError={errorMsg}
            areDefCodesLoading={isLoading}
            defCodes={defCodes}
            {...props} />
    );
};

export default withDefCodes;
