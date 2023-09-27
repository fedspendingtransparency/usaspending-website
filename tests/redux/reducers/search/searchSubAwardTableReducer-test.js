/**
 * @jest-environment jsdom
 */
import searchFiltersReducer from 'redux/reducers/search/searchSubAwardTableReducer';


describe('Search Sub Award Table Reducer', () => {
    it('should set the isSubAwardIdClicked to be true', () => {
        const action = { type: 'SUBAWARD_ID_CLICKED', value: true };
        const originalState = { searchSubAwardTable: { isSubAwardIdClicked: false }};
        const newState = searchFiltersReducer(originalState, action);
        expect(newState.isSubAwardIdClicked).toEqual(true);
    });
    it('should set the isSubAwardIdClicked to be true', () => {
        const action = { type: 'SUBAWARD_ID_CLICKED', value: false };
        const originalState = { searchSubAwardTable: { isSubAwardIdClicked: true }};
        const newState = searchFiltersReducer(originalState, action);
        expect(newState.isSubAwardIdClicked).toEqual(false);
    });
});
