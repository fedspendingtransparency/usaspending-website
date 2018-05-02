/**
 * stateActions.js
 * Created by Lizzie Salita 5/1/18
 */

export const setStateOverview = (state) => ({
    type: 'SET_STATE_OVERVIEW',
    overview: state
});

export const resetState = () => ({
    type: 'RESET_STATE'
});
