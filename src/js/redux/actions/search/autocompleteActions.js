/**
 * Created by michaelbray on 12/20/16.
 */

/* eslint-disable import/prefer-default-export */
// We only have one export but want to maintain consistency with other query modules
export const setAutocompleteLocations = (state) => ({
    type: 'SET_AUTOCOMPLETE_LOCATIONS',
    locations: state
});
/* eslint-enable import/prefer-default-export */
