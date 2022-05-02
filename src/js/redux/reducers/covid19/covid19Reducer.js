/**
 * covid19Reducer.js
 * Created by Jonathan Hill 06/11/20
 */

export const initialState = {
    defCodes: [],
    overview: {},
    allAwardTypeTotals: {},
    assistanceTotals: {},
    spendingByAgencyTotals: {},
    recipientTotals: {},
    isRecipientMapLoaded: false,
    defcParams: []
};

const covid19Reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_DEF_CODES': {
            return Object.assign({}, state, { defCodes: action.defCodes });
        }
        case 'SET_COVID_OVERVIEW': {
            return Object.assign({}, state, { overview: action.overview });
        }
        case 'RESET_COVID_OVERVIEW': {
            return Object.assign({}, state, { overview: initialState.overview });
        }
        case 'SET_COVID_AWARD_AMOUNTS': {
            return Object.assign({}, state, { allAwardTypeTotals: action.totals });
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
        case 'SET_IS_RECIPIENT_MAP_LOADED': {
            return Object.assign({}, state, { isRecipientMapLoaded: action.payload });
        }
        case 'SET_DEFC_PARAMS': {
            return Object.assign({}, state, { defcParams: action.defcParams });
        }
        default: return state;
    }
};

export default covid19Reducer;
