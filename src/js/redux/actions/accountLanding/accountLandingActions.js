/**
 * accountLandingActions.js
 * Created by Lizzie Salita 8/4/17
 */

export const setAccountsOrder = (state) => ({
    type: 'SET_ACCOUNTS_ORDER',
    order: state
});

export const setPageNumber = (state) => ({
    type: 'SET_PAGE_NUMBER',
    number: state
});
