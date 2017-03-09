/**
 * Created by michaelbray on 3/2/17.
 */

/* eslint-disable import/prefer-default-export */
// We only have one export but want to maintain consistency with other actions
export const setAutocompleteAwardIDs = (state) => ({
    type: 'SET_AUTOCOMPLETE_AWARD_IDS',
    awardIDs: state
});
/* eslint-enable import/prefer-default-export */
