/**
 * Created by Emily Gullo on 01/23/2017
 */

export const setSelectedAward = (state) => ({
    type: 'SET_SELECTED_AWARD',
    selectedAward: state
});

export const resetAwardData = () => ({
    type: 'RESET_AWARD_DATA'
});
