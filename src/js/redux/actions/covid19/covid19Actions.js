/**
 * covid19Actions.js
 * Created by Jonathan Hill 06/11/20
 */

export const setDEFCodes = (defCodes) => ({
    type: 'SET_DEF_CODES',
    defCodes
});

export const setOverview = (overview) => ({
    type: 'SET_COVID_OVERVIEW',
    overview
});

export const setLatestSubmissionDate = (latestSubmissionDate) => ({
    type: 'SET_LATEST_SUBMISSION_DATE',
    latestSubmissionDate
});

export const setTotals = (awardType, totals) => ({
    type: `SET_COVID_AWARD_AMOUNTS${awardType && '_'}${awardType}`,
    totals
});
