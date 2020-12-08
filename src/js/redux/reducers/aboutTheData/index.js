/**
 * aboutTheDataReducer.js
 * Created by Max Kendall 12/8/2020
*/

export const initialState = {
    details: [],
    dates: [],
    totals: [],
    detailsSort: ['desc', 'current_total_budget_authority_amount'],
    datesSort: ['desc', 'current_total_budget_authority_amount']
};

/* eslint-disable import/prefer-default-export */
export default (state = initialState, action) => {
    switch (action.type) {
        case 'SET_ABOUT_THE_DATA_DETAILS': {
            if (action.append) {
                return {
                    ...state,
                    details: state.details.concat(action.payload)
                };
            }
            return {
                ...state,
                details: action.payload
            };
        }
        case 'SET_ABOUT_THE_DATA_DATES': {
            if (action.append) {
                return {
                    ...state,
                    dates: state.dates.concat(action.payload)
                };
            }
            return {
                ...state,
                dates: action.payload
            };
        }
        case 'SET_ABOUT_THE_DATA_TOTALS': {
            return {
                ...state,
                totals: action.payload
            };
        }
        case 'SET_ABOUT_THE_DATA_DETAIL_SORT':
            return {
                ...state,
                detailsSort: action.payload
            };
        case 'SET_ABOUT_THE_DATA_DATES_SORT':
            return {
                ...state,
                datesSort: action.payload
            };

        default:
            return state;
    }
};

