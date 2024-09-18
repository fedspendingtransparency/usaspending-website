import { Set } from 'immutable';

export const awardingAgencyResponseParse = ({ results }) => {
    // filter down to only top tier codes
    const onlyTopTierCodes = results.map((res) => ({
        id: res.toptier_agency.toptier_code,
        name: res.toptier_agency.name,
        filters: []
    }));
    const setTiers = new Set(onlyTopTierCodes.map(JSON.stringify));
    const uniqueTopTiers = Array.from(setTiers).map(JSON.parse);

    // organize each sub tier into their top tier
    results.forEach((res) => {
        const category = uniqueTopTiers.find(
            (topTier) => topTier.id === res.toptier_agency.toptier_code
        );

        category.filters.push(res.id);
    });

    return uniqueTopTiers;
};

export const awardingAgencyCodes = (({ results }) => {
    const codesObj = {};


    /* eslint-disable camelcase */
    results.forEach(({ id, subtier_agency }) => {
        codesObj[id] = subtier_agency.name;
    });
    /* eslint-enable camelcase */

    return codesObj;
});
