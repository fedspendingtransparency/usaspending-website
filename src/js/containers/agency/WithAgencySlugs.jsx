import React from 'react';
import useAgencySlugs from "../../hooks/useAgencySlugs";

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
