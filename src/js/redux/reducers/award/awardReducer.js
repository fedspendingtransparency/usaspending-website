/**
 * awardReducer.js
 * Created by Emily Gullo 01/23/2017
 **/

import _ from 'lodash';

const initialState = {
    selectedAward: null,
    transactions: [],
    transactionMeta: {
        count: 0,
        page: 0,
        totalPages: 0
    },
    renderHash: null,
    groupHash: null,
    transactionSort: {
        field: "modification_number",
        direction: "asc"
    }
};

const awardReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_SELECTED_AWARD': {
            return Object.assign({}, state, {
                selectedAward: action.selectedAward
            });
        }
        case 'SET_AWARD_TRANSACTIONS': {
            return Object.assign({}, state, {
                transactions: action.transactions
            });
        }
        case 'APPEND_AWARD_TRANSACTIONS': {
            return Object.assign({}, state, {
                transactions: _.concat(state.transactions, action.transactions)
            });
        }
        case 'SET_TRANSACTIONS_META': {
            return Object.assign({}, state, {
                transactionMeta: action.meta
            });
        }
        case 'SET_TRANSACTION_SORT': {
            return Object.assign({}, state, {
                transactionSort: action.value
            });
        }
        case 'UPDATE_TXN_RENDER_HASH': {
            return Object.assign({}, state, {
                renderHash: _.uniqueId()
            });
        }
        case 'UPDATE_TXN_GROUP_HASH': {
            return Object.assign({}, state, {
                groupHash: _.uniqueId()
            });
        }
        case 'RESET_AWARD_DATA': {
            return Object.assign({}, initialState);
        }
        default:
            return state;
    }
};

export default awardReducer;
