/**
 * recipientSummaryReducer.js
 * Created by Lizzie Salita 8/23/17
 **/

import BaseRecipientOverview from 'models/v2/recipient/BaseRecipientOverview';

const recipientOverview = Object.create(BaseRecipientOverview);
recipientOverview.populate({});

const initialState = {
    id: '',
    fy: 'latest',
    overview: recipientOverview
};

const recipientSummaryReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_RECIPIENT_OVERVIEW':
            return Object.assign({}, state, {
                id: action.overview.duns,
                overview: action.overview
            });
        case 'SET_RECIPIENT_FY':
            return Object.assign({}, state, {
                fy: action.fy
            });
        case 'RESET_AGENCY':
            return Object.assign({}, initialState);
        default:
            return state;
    }
};

export default recipientSummaryReducer;
