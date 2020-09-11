/**
 * awardReducer.js
 * Created by Lizzie Salita 12/4/18
 **/

export const initialState = {
    id: '',
    category: '',
    overview: null,
    idvDetails: null,
    totalTransactionObligatedAmount: 0
};

const awardReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_AWARD': {
            return Object.assign({}, state, {
                id: action.overview.generatedId,
                category: action.overview.category,
                overview: action.overview
            });
        }
        case 'SET_IDV_DETAILS': {
            return Object.assign({}, state, {
                idvDetails: action.details
            });
        }
        case 'SET_TOTAL_TRANSACTION_OBLIGATED_AMOUNT': {
            return Object.assign({}, state, {
                totalTransactionObligatedAmount: action.total
            });
        }
        case 'RESET_AWARD': {
            return Object.assign({}, initialState);
        }
        default:
            return state;
    }
};

export default awardReducer;
