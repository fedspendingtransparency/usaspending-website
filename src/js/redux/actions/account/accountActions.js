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

/**
 * setAccountDataAsOfDate
 * @param {Object} payload: moment representing the latest submission period
 * @returns {Object}: like every redux action creator --> an object w/ a type property and one or more
 * other properties which will constitute the new redux state.
 */
export const setAccountDataAsOfDate = (payload) => ({
    type: 'SET_ACCOUNT_DATA_AS_OF',
    payload
});

export const setSubmissionPeriods = (submissionPeriods) => ({
    type: 'SET_SUBMISSION_PERIODS',
    submissionPeriods
});
