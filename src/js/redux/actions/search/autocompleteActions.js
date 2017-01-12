/**
 * Created by michaelbray on 12/20/16.
 */

/* eslint-disable import/prefer-default-export */
// We only have one export but want to maintain consistency with other query modules
export const setAutocompleteLocations = (state) => ({
    type: 'SET_AUTOCOMPLETE_LOCATIONS',
    locations: state
});

export const setAutocompleteAwardingAgencies = (state) => ({
    type: 'SET_AUTOCOMPLETE_AWARDING_AGENCIES',
    awardingAgencies: state
});

export const setAutocompleteFundingAgencies = (state) => ({
    type: 'SET_AUTOCOMPLETE_FUNDING_AGENCIES',
    fundingAgencies: state
});
/* eslint-enable import/prefer-default-export */
