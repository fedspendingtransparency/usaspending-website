/**
 * Created by Lizzie Salita 12/4/18
 */

export const setAward = (state, id) => ({
    type: 'SET_AWARD',
    overview: state,
    id
});

export const resetAward = () => ({
    type: 'RESET_AWARD'
});
