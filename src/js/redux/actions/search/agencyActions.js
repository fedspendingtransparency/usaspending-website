/**
 * Created by Emily Gullo on 12/28/2016
 */

/* eslint-disable import/prefer-default-export */
// We only have one export but want to maintain consistency with other query modules

export const setAutocompleteAgencies = (state) => ({
    type: 'SET_AUTOCOMPLETE_AGENCIES',
    agencies: state
});
/* eslint-enable import/prefer-default-export */
