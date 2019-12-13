/**
 * recipientReducer.js
 * Created by Lizzie Salita 8/23/17
 **/

import BaseRecipientOverview from 'models/recipient/BaseRecipientOverview';

const recipientOverview = Object.create(BaseRecipientOverview);
recipientOverview.populate({});

export const initialState = {
    id: '',
    fy: 'latest',
    overview: recipientOverview,
    children: []
};

const recipientReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_RECIPIENT_OVERVIEW':
            return Object.assign({}, state, {
                id: action.overview.id,
                overview: action.overview
            });
        case 'SET_RECIPIENT_FY':
            return Object.assign({}, state, {
                fy: action.fy
            });
        case 'SET_RECIPIENT_CHILDREN':
            return Object.assign({}, state, {
                children: action.children
            });
        case 'RESET_AGENCY':
            return Object.assign({}, initialState);
        default:
            return state;
    }
};

export default recipientReducer;
