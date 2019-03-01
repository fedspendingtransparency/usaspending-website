/**
 * Created by Lizzie Salita 12/4/18
 */

export const setAward = (state) => ({
    type: 'SET_AWARD',
    overview: state
});

export const setCounts = (state) => ({
    type: 'SET_COUNTS',
    counts: state
});

export const setAggregatedAmounts = (state) => ({
    type: 'SET_AMOUNTS',
    amounts: state
});

export const resetAward = () => ({
    type: 'RESET_AWARD'
});
