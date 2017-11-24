/**
 * awardReducer.js
 * Created by Emily Gullo 01/23/2017
 **/

import { concat, uniqueId } from 'lodash';

const initialState = {
    selectedAward: null,
    transactions: [],
    transactionMeta: {
        page: 0,
        nextPage: false
    },
    renderHash: null,
    groupHash: null,
    transactionSort: {
        field: "action_date",
        direction: "desc"
    },
    finSysData: [],
    finSysMeta: {
        page: 0,
        nextPage: false
    },
    finSysSort: {
        field: "certified_date",
        direction: "desc"
    },
    subawards: [],
    subawardMeta: {
        hasNext: false,
        page: 1,
        render: '',
        group: ''
    },
    subawardSort: {
        field: "subaward_number",
        direction: "desc"
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
                transactions: concat(state.transactions, action.transactions)
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
                renderHash: uniqueId()
            });
        }
        case 'UPDATE_TXN_GROUP_HASH': {
            return Object.assign({}, state, {
                groupHash: uniqueId()
            });
        }
        case 'SET_AWARD_FINSYS_DATA': {
            return Object.assign({}, state, {
                finSysData: action.data
            });
        }
        case 'APPEND_AWARD_FINSYS_DATA': {
            return Object.assign({}, state, {
                finSysData: concat(state.finSysData, action.data)
            });
        }
        case 'SET_FINSYS_META': {
            return Object.assign({}, state, {
                finSysMeta: action.meta
            });
        }
        case 'SET_FINSYS_SORT': {
            return Object.assign({}, state, {
                finSysSort: action.value
            });
        }
        case 'RESET_FINSYS': {
            return Object.assign({}, state, {
                finSysData: [],
                finSysMeta: initialState.finSysMeta,
                finSysSort: initialState.finSysSort
            });
        }
        case 'SET_AWARD_SUBAWARDS': {
            return Object.assign({}, state, {
                subawards: action.subawards
            });
        }
        case 'APPEND_AWARD_SUBAWARDS': {
            return Object.assign({}, state, {
                subawards: concat(state.subawards, action.subawards)
            });
        }
        case 'SET_SUBAWARD_META': {
            const meta = Object.assign({}, state.subawardMeta, action.meta);
            return Object.assign({}, state, {
                subawardMeta: meta
            });
        }
        case 'SET_SUBAWARD_SORT': {
            return Object.assign({}, state, {
                subawardSort: action.sort
            });
        }
        case 'RESET_SUBAWARD': {
            return Object.assign({}, state, {
                subawards: [],
                subawardMeta: initialState.subawardMeta,
                subawardSort: initialState.subawardSort
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
