/**
 * SearchAwardOperation-test.js
 * Created by Max Kendall on 06/08/2020.
 */
import { CheckboxTreeSelections } from "redux/reducers/search/searchFiltersReducer";
import SearchAwardsOperation from "models/search/SearchAwardsOperation";
import { initialState } from "redux/reducers/search/searchFiltersReducer";

describe('SearchAwardsOperation', () => {
    describe('building the request object with toParams', () => {
        // we have two kinds of tas properties on the request object; one for the checkbox
        // tree selections; the other for the non-checkbox tree selections
        it('does not put an empty array for tas_components property when tas-checbox tree items are selected', () => {
            const model = new SearchAwardsOperation();
            model.fromState({
                ...initialState,
                tasCodes: new CheckboxTreeSelections({
                    require: [["Service"]],
                    exclude: [],
                    counts: [{ count: 1 }]
                })
            });
            const requestObject = model.toParams();
            expect(Object.keys(requestObject).includes('tas_codes')).toEqual(true);
            expect(Object.keys(requestObject)).toEqual(['time_period', 'tas_codes']);
        });
    });
});
