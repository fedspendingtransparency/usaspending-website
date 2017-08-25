/**
 * recipientSummaryReducer.js
 * Created by Lizzie Salita 8/23/17
 **/

import RecipientOverviewModel from 'models/recipient/RecipientOverviewModel';

const initialState = {
    id: '',
    overview: new RecipientOverviewModel()
};

const recipientSummaryReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_RECIPIENT_OVERVIEW':
            return Object.assign({}, state, {
                id: action.overview.id,
                overview: action.overview
            });
        case 'RESET_AGENCY':
            return Object.assign({}, initialState);
        default:
            return state;
    }
};

export default recipientSummaryReducer;
