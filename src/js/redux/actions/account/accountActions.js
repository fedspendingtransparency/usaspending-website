/**
 * accountActions.js
 * Created by Kevin Li 3/17/17
 */

export const setSelectedAccount = (state) => ({
    type: 'SET_SELECTED_ACCOUNT',
    account: state
});

export const resetAccount = () => ({
    type: 'RESET_ACCOUNT'
});

export const setSubmissionPeriods = (submissionPeriods) => ({
    type: 'SET_SUBMISSION_PERIODS',
    submissionPeriods
});
