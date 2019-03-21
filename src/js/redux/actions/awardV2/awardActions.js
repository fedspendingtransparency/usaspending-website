/**
 * Created by Lizzie Salita 12/4/18
 */

export const setAward = (overview) => ({
    type: 'SET_AWARD',
    overview
});

export const setCounts = (counts) => ({
    type: 'SET_COUNTS',
    counts
});

export const resetAward = () => ({
    type: 'RESET_AWARD'
});
