import * as sidebarActions from '../../actions/sidebar/sidebarActions'

export const initialState = {
    sidebarContent: 'filters'
};

const sidebarReducer = (state = initialState, action) => {
    switch (action.type) {
        case sidebarActions.SET_SIDEBAR_CONTENT: {
            return {...state, sidebarContent: action.sidebarContent }
        }
        default: return state;
    }
};

export default sidebarReducer;