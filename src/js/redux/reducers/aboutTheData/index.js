/**
 * aboutTheDataReducer.js
 * Created by Max Kendall 12/8/2020
*/

export const initialState = {
    searchTerm: '',
    submissionsSearchResults: [],
    publicationsSearchResults: [],
    allSubmissions: [],
    allPublications: [],
    federalTotals: [],
    submissionsSort: ['current_total_budget_authority_amount', 'desc'],
    publicationsSort: ['current_total_budget_authority_amount', 'desc']
};

/* eslint-disable import/prefer-default-export */
export default (state = initialState, action) => {
    switch (action.type) {
        case 'SET_ABOUT_THE_DATA_ALL_SUBMISSIONS': {
            if (action.append) {
                return {
                    ...state,
                    allSubmissions: state.allSubmissions.concat(action.payload)
                };
            }
            return {
                ...state,
                allSubmissions: action.payload
            };
        }
        case 'SET_ABOUT_THE_DATA_SEARCH_TERM': {
            return {
                ...state,
                searchTerm: action.payload
            };
        }
        case 'SET_ABOUT_THE_DATA_SEARCH_RESULTS_SUBMISSIONS': {
            return {
                ...state,
                submissionsSearchResults: action.payload
            };
        }
        case 'SET_ABOUT_THE_DATA_SEARCH_RESULTS_PUBLICATIONS': {
            return {
                ...state,
                publicationsSearchResults: action.payload
            };
        }
        case 'SET_ABOUT_THE_DATA_ALL_PUBLICATIONS': {
            if (action.append) {
                return {
                    ...state,
                    allPublications: state.allPublications.concat(action.payload)
                };
            }
            return {
                ...state,
                allPublications: action.payload
            };
        }
        case 'SET_ABOUT_THE_DATA_TOTALS': {
            return {
                ...state,
                federalTotals: action.payload
            };
        }
        case 'SET_ABOUT_THE_DATA_ALL_SUBMISSIONS_SORT':
            return {
                ...state,
                submissionsSort: action.payload
            };
        case 'SET_ABOUT_THE_DATA_ALL_PUBLICATIONS_SORT':
            return {
                ...state,
                publicationsSort: action.payload
            };

        default:
            return state;
    }
};

