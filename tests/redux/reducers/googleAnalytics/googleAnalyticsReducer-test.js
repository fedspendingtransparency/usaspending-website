/**
 * @jest-environment jsdom
 */
import googleAnalyticsReducer from "redux/reducers/googleAnalytics/googleAnalyticsReducer";

describe('isInitialApplicationLoadForDAPGoogleAnalytics', () => {
    let state;
    beforeEach(() => {
        state = googleAnalyticsReducer(undefined, {});
    });
    it('should be true by default', () => {
        expect(state.isInitialApplicationLoadForDAPGoogleAnalytics).toEqual(true);
    });
    it('should SET_IS_INITIAL_APPLICATION_LOAD_FOR_DAP_GOOGLE_ANALYTICS_TO_FALSE', () => {
        state = googleAnalyticsReducer(state, { type: 'SET_IS_INITIAL_APPLICATION_LOAD_FOR_DAP_GOOGLE_ANALYTICS_TO_FALSE' });
        expect(state.isInitialApplicationLoadForDAPGoogleAnalytics).toEqual(false);
    });
});
