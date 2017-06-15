/**
 * agencyReducer.js
 * Created by Kevin Li 6/8/17
 */

import AgencyOverviewModel from 'models/agency/AgencyOverviewModel';

export const initialState = {
    id: '',
    overview: new AgencyOverviewModel()
};

const agencyReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_AGENCY_OVERVIEW':
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

export default agencyReducer;
