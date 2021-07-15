/**
 * routerHistoryReducer.js
 * Created by Jonathan Hill 07/14/2021
*/

import { List } from "immutable";

export const initialState = {
    history: new List()
};

const routerHistoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_HISTORY': {
            console.log(' State : ', state, action);
            return Object.assign({}, state, { history: state.history.push(action.newRoute) });
        }
        default:
            return state;
    }
};

export default routerHistoryReducer;
