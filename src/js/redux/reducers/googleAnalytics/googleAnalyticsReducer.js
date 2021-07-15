/**
 * googleAnalyticsReducer.js
 * Created by Jonathan Hill 07/15/2021
*/

export const initialState = {
    isInitialApplicationLoadForDAPGoogleAnalytics: true
};

const googleAnalyticsReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_IS_INITIAL_APPLICATION_LOAD_FOR_DAP_GOOGLE_ANALYTICS_TO_FALSE': {
            return Object.assign({}, state, { isInitialApplicationLoadForDAPGoogleAnalytics: false });
        }
        default:
            return state;
    }
};

export default googleAnalyticsReducer;
