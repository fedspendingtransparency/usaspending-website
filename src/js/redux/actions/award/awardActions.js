/**
 * Created by Emily Gullo on 01/23/2017
 */

export const setSelectedAward = (state) => ({
    type: 'SET_SELECTED_AWARD',
    selectedAward: state
});

export const setAwardTransactions = (state) => ({
    type: 'SET_AWARD_TRANSACTIONS',
    transactions: state
});

export const appendAwardTransactions = (state) => ({
    type: 'APPEND_AWARD_TRANSACTIONS',
    transactions: state
});

export const setTransactionsMeta = (state) => ({
    type: 'SET_TRANSACTIONS_META',
    meta: state
});

export const setTransactionSort = (state) => ({
    type: 'SET_TRANSACTION_SORT',
    value: state
});

export const updateTransactionRenderHash = () => ({
    type: 'UPDATE_TXN_RENDER_HASH'
});

export const updateTransactionGroupHash = () => ({
    type: 'UPDATE_TXN_GROUP_HASH'
});

export const resetAwardData = () => ({
    type: 'RESET_AWARD_DATA'
});
