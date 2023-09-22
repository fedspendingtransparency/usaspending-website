/**
 * @jest-environment jsdom
 * 
 * SearchAwardOperation-test.js
 * Created by Max Kendall on 06/08/2020.
 */

import { OrderedMap } from 'immutable';

import { CheckboxTreeSelections } from "redux/reducers/search/searchFiltersReducer";
import SearchAwardsOperation from "models/v1/search/SearchAwardsOperation";
import { initialState } from "redux/reducers/search/searchFiltersReducer";

describe('SearchAwardsOperation', () => {
    describe('building the request object with toParams', () => {
        // we have two kinds of tas properties on the request object; one for the checkbox
        // tree selections; the other for the non-checkbox tree selections
        it('does not put an empty exclude or count array for tas_codes property when tas-checkbox tree items are selected', () => {
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
            expect(requestObject.tas_codes.counts).toBeFalsy();
        });
        it('does not put an empty require, count, or exclude array for tas_codes property when treasury_account_components are selected', () => {
            const model = new SearchAwardsOperation();
            model.fromState({
                ...initialState,
                treasuryAccounts: new OrderedMap({ 'test': { test: '123' } })
            });
            const requestObject = model.toParams();
            expect(Object.keys(requestObject).includes('treasury_account_components')).toEqual(true);
            expect(Object.keys(requestObject)).toEqual(['time_period', 'treasury_account_components']);
            expect(requestObject.tas_codes).toBeFalsy();
        });
        it('does not put an empty exclude or count array for def_codes property when def code-checkbox tree items are selected', () => {
            const model = new SearchAwardsOperation();
            model.fromState({
                ...initialState,
                defCodes: new CheckboxTreeSelections({
                    require: ["M"],
                    exclude: [],
                    counts: [{ count: 1 }]
                })
            });
            const requestObject = model.toParams();
            expect(Object.keys(requestObject).includes('def_codes')).toEqual(true);
            expect(Array.isArray(requestObject.def_codes)).toEqual(true);
            expect(Object.keys(requestObject)).toEqual(['time_period', 'def_codes']);
            expect(requestObject.def_codes.counts).toBeFalsy();
        });
    });
});
