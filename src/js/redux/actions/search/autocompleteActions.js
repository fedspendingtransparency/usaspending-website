/**
 * Created by michaelbray on 12/20/16.
 */

export const setAutocompleteLocations = (state) => ({
    type: 'SET_AUTOCOMPLETE_LOCATIONS',
    locations: state
});

export const setAutocompleteCFDA = (state) => ({
    type: 'SET_AUTOCOMPLETE_CFDA',
    cfda: state
});

export const setAutocompleteNAICS = (state) => ({
    type: 'SET_AUTOCOMPLETE_NAICS',
    naics: state
});
export const setAutocompletePSC = (state) => ({
    type: 'SET_AUTOCOMPLETE_PSC',
    psc: state
});
