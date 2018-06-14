/**
 * Created by Lizzie Salita 8/23/17
 */

export const setRecipientOverview = (state) => ({
    type: 'SET_RECIPIENT_OVERVIEW',
    overview: state
});

export const setRecipientFiscalYear = (state) => ({
    type: 'SET_RECIPIENT_FY',
    fy: state
});

export const resetRecipient = () => ({
    type: 'RESET_RECIPIENT'
});
