import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { isEmpty } from 'lodash';
import { fetchAgencySlugs } from 'apis/agency';
import { setAgencySlugs } from 'redux/actions/agency/agencyActions';

export const mapSlugToTopTierCode = (results) => (
    results.reduce((acc, agency) => {
    /* eslint-disable camelcase */
        const { agency_slug, toptier_code } = agency;
        return { ...acc, [agency_slug]: toptier_code };
    /* eslint-enable camelcase */
    }, {})
);

export const mapTopTierCodeToOutlay = (results) => (
    results.reduce((acc, agency) => {
        /* eslint-disable camelcase */
        const { toptier_code, outlay_amount } = agency;
        return { ...acc, [toptier_code]: outlay_amount };
        /* eslint-enable camelcase */
    }, {})
);

export const mapTopTierCodeToSlug = (results) => (
    results.reduce((acc, agency) => {
    /* eslint-disable camelcase */
        const { agency_slug, toptier_code } = agency;
        return { ...acc, [toptier_code]: agency_slug };
    /* eslint-enable camelcase */
    }, {})
);

export const mapIdToSlug = (results) => (
    results.reduce((acc, agency) => {
    /* eslint-disable camelcase */
        const { agency_slug, agency_id } = agency;
        return { ...acc, [`${agency_id}`]: agency_slug };
    /* eslint-enable camelcase */
    }, {})
);

export const useAgencySlugs = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const { agencySlugs, topTierCodes, agencyIds } = useSelector((state) => state.agency);
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
                    const slugsMapping = mapSlugToTopTierCode(data.results);
                    const outlayMapping = mapTopTierCodeToOutlay(data.results);
                    const topTierCodesMapping = mapTopTierCodeToSlug(data.results);
                    const idMapping = mapIdToSlug(data.results);
                    dispatch(setAgencySlugs(slugsMapping, topTierCodesMapping, idMapping, outlayMapping));
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
    }, [agencySlugs, topTierCodes, agencyIds]);

    return [agencySlugs, topTierCodes, agencyIds, loading, error];
};

const withAgencySlugs = (WrappedComponent) => (props) => {
    const [agencySlugs, , agencyIds, loading, error] = useAgencySlugs();
    return (
        <WrappedComponent
            {...props}
            agencySlugs={agencySlugs}
            agencyIds={agencyIds}
            loading={loading}
            error={error} />
    );
};

export default withAgencySlugs;
