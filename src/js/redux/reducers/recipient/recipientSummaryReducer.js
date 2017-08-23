/**
 * recipientSummaryReducer.js
 * Created by Lizzie Salita 8/23/17
 **/

const initialState = {
    selectedRecipient: null
};

const recipientSummaryReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_SELECTED_RECIPIENT': {
            return Object.assign({}, state, {
                selectedRecipient: action.selectedRecipient
            });
        }
        default:
            return state;
    }
};

export default recipientSummaryReducer;
