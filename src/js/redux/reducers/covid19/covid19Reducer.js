/**
 * covid19Reducer.js
 * Created by Jonathan Hill 06/11/20
 */

const initialState = {
    defCodes: [],
    overview: {},
    latestSubmissionDate: '',
    assistanceTotals: {},
    spendingByAgencyTotals: {},
    recipientTotals: {}
};

const covid19Reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_DEF_CODES': {
            return Object.assign({}, state, { defCodes: action.defCodes });
        }
        case 'SET_COVID_OVERVIEW': {
            return Object.assign({}, state, { overview: action.overview });
        }
        case 'SET_LATEST_SUBMISSION_DATE': {
            return Object.assign({}, state, { latestSubmissionDate: action.latestSubmissionDate });
        }
        case 'SET_COVID_AWARD_AMOUNTS_ASSISTANCE': {
            return Object.assign({}, state, { assistanceTotals: action.totals });
        }
        case 'SET_COVID_AWARD_AMOUNTS_SPENDING_BY_AGENCY': {
            return Object.assign({}, state, { spendingByAgencyTotals: action.totals });
        }
        case 'SET_COVID_AWARD_AMOUNTS_RECIPIENT': {
            return Object.assign({}, state, { recipientTotals: action.totals });
        }
        default: return state;
    }
};

export default covid19Reducer;
