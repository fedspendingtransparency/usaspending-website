/**
 * Created by michaelbray on 1/26/17.
 */

export const setAutocompleteAwardingAgencies = (state) => ({
    type: 'SET_AUTOCOMPLETE_AWARDING_AGENCIES',
    agencies: state.agencies
});

export const setAutocompleteFundingAgencies = (state) => ({
    type: 'SET_AUTOCOMPLETE_FUNDING_AGENCIES',
    agencies: state.agencies
});

