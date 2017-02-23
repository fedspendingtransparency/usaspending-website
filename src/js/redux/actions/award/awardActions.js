/**
 * Created by Emily Gullo on 01/23/2017
 */

/* eslint-disable import/prefer-default-export */
// We only have one export but want to maintain consistency with other query modules
export const setSelectedAward = (state) => ({
    type: 'SET_SELECTED_AWARD',
    selectedAward: state
});
/* eslint-enable import/prefer-default-export */
