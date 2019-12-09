
import searchFiltersReducer from 'redux/reducers/search/searchSubAwardTableReducer';


describe('Search Sub Award Table Reducer', () => {
    it('should set the subAwardIDClicked to be true', () => {
        const action = { type: 'UPDATE_SUB_AWARD_CLICK', value: true };
        const originalState = { searchSubAwardTable: { subAwardIDClicked: false }};
        const newState = searchFiltersReducer(originalState, action);
        expect(newState.subAwardIDClicked).toEqual(true);
    });
    it('should set the subAwardIDClicked to be true', () => {
        const action = { type: 'UPDATE_SUB_AWARD_CLICK', value: false };
        const originalState = { searchSubAwardTable: { subAwardIDClicked: true }};
        const newState = searchFiltersReducer(originalState, action);
        expect(newState.subAwardIDClicked).toEqual(false);
    });
});
