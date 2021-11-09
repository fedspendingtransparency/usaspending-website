import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { isEmpty } from 'lodash';
import { fetchAgencySlugs } from 'apis/agencyV2';
import { setAgencySlugs } from 'redux/actions/agencyV2/agencyV2Actions';

export const parseAgencySlugs = (results) => (
    results.reduce((acc, agency) => {
        /* eslint-disable camelcase */
        const { agency_slug, toptier_code } = agency;
        return { ...acc, [agency_slug]: toptier_code };
        /* eslint-enable camelcase */
    }, {})
);

export const useAgencySlugs = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const { agencySlugs } = useSelector((state) => state.agencyV2);
    const request = useRef();

    useEffect(() => {
        if (!isEmpty(agencySlugs) && loading) {
            setLoading(false);
        }
        if (isEmpty(agencySlugs)) {
            setLoading(true);
            setError(false);
            request.current = fetchAgencySlugs();
            request.current.promise
                .then(({ data }) => {
                    const slugsMapping = parseAgencySlugs(data.results);
                    dispatch(setAgencySlugs(slugsMapping));
                    setLoading(false);
                    setError(false);
                    request.current = null;
                })
                .catch((e) => {
                    setLoading(false);
                    setError(true);
                    console.error(e);
                    request.current = null;
                });
        }
        return () => {
            if (request.current) {
                request.current.cancel();
            }
        };
    }, [agencySlugs]);

    return [agencySlugs, loading, error];
};

const withAgencySlugs = (WrappedComponent) => (props) => {
    const [agencySlugs, loading, error] = useAgencySlugs();
    return (
        <WrappedComponent
            {...props}
            agencySlugs={agencySlugs}
            loading={loading}
            error={error} />
    );
};

export default withAgencySlugs;
