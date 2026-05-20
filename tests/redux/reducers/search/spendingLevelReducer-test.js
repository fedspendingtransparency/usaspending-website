/**
 * @jest-environment jsdom
 */
import spendingLevelReducer from "../../../../src/js/redux/reducers/search/spendingLevelReducer";


describe('Search Spending Level For Downloads', () => {
    it('should set the spending level to transactions', () => {
        const action = { type: 'SET_SPENDING', value: ['transactions'] };
        const originalState = [];
        const newState = spendingLevelReducer(originalState, action);
        expect(newState).toEqual(action.value);
    });
    it('set it to blank', () => {
        const action = { type: 'SET_SPENDING', value: [] };
        const originalState = ['transactions'];
        const newState = spendingLevelReducer(originalState, action);
        expect(newState.length).toEqual(0);
    });
});
