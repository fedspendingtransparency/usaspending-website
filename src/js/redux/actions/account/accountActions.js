/**
 * accountActions.js
 * Created by Kevin Li 3/17/17
 */

export const setSelectedAccount = (state) => ({
    type: 'SET_SELECTED_ACCOUNT',
    account: state
});

export const setAccountAwards = (state) => ({
    type: 'SET_ACCOUNT_AWARD_ITEMS',
    awards: state.awards,
    hasNext: state.hasNext
});

export const appendAccountAwards = (state) => ({
    type: 'APPEND_ACCOUNT_AWARD_ITEMS',
    awards: state.awards,
    page: state.page,
    hasNext: state.hasNext
});

export const setAccountAwardType = (state) => ({
    type: 'SET_ACCOUNT_AWARD_TYPE',
    awardType: state
});

export const setAccountAwardOrder = (state) => ({
    type: 'SET_ACCOUNT_AWARD_ORDER',
    order: state
});

export const resetAccount = () => ({
    type: 'RESET_ACCOUNT'
});
