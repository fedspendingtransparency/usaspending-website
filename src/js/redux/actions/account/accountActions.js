/**
 * accountActions.js
 * Created by Kevin Li 3/17/17
 */

export const setSelectedAccount = (state) => ({
    type: 'SET_SELECTED_ACCOUNT',
    account: state
});

export const setAccountTAS = (state) => ({
    type: 'SET_ACCOUNT_TAS_ITEMS',
    tas: state
});

export const appendAccountTAS = (state) => ({
    type: 'APPEND_ACCOUNT_TAS_ITEMS',
    tas: state
});

export const resetAccount = () => ({
    type: 'RESET_ACCOUNT'
});
