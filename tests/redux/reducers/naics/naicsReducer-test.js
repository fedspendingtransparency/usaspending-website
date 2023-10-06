/**
 * @jest-environment jsdom
 */
import { List } from 'immutable';

import { naicsReducer, initialState } from 'redux/reducers/search/naicsReducer';
import * as naicsActions from 'redux/actions/search/naicsActions';

import * as mockData from "../../../containers/search/filters/naics/mockNAICS";

describe('Naics Reducer', () => {
    describe('redux.naics.naics', () => {
        it('should set initial state', () => {
            const nodes = mockData.placeholderNodes;
            const action = { payload: nodes, type: 'SET_NAICS_NODES' };
            const updatedNaics = naicsReducer(initialState, action).naics.toJS();
            expect(updatedNaics[0].label).toEqual('Agriculture, Forestry, Fishing and Hunting');
        });
        it('should update specific parent when passed the key for it', () => {
            const actionObj = naicsActions.setNaicsNodes('11', [mockData.reallyBigTree[0]]);
            const currentState = { ...initialState, naics: new List(mockData.placeholderNodes) };
            const updatedNaics = naicsReducer(currentState, actionObj).naics.toJS();
            // populates the children for the specified key
            expect(updatedNaics[0].children[0].label).toEqual("Oilseed and Grain Farming");
            // doesn't update other places in tree, only 11.
            expect(updatedNaics[1].children.length).toEqual(1);
            // cleans the data (actually done in the action setNaics)
            updatedNaics[0].children.forEach((child) => {
                expect(Object.keys(child).includes('label')).toBe(true);
                expect(Object.keys(child).includes('value')).toBe(true);
            });
            expect(updatedNaics[1].children.length).toEqual(1);
        });
    });
    describe('other properties under naics key-space do not and cannot have duplicate values', () => {
        it('naics.expanded: no duplicates', () => {
            const action = { payload: ['11', '11', '1111'], type: 'SET_EXPANDED_NAICS' };
            const updatedExpanded = naicsReducer(initialState, action).expanded.toJS();
            expect(updatedExpanded).toEqual(["11", "1111"]);
        });
        it('naics.checked: no duplicates', () => {
            const action = { payload: ['11', '11', '1111'], type: 'SET_CHECKED_NAICS' };
            const updatedChecked = naicsReducer(initialState, action).checked.toJS();
            expect(updatedChecked).toEqual(['11', '1111']);
        });
        it('naics.unchecked: no duplicates', () => {
            const action = { payload: ['11', '11', '1111'], type: 'SET_UNCHECKED_NAICS' };
            const updatedUncheck = naicsReducer(initialState, action).unchecked.toJS();
            expect(updatedUncheck).toEqual(['11', '1111']);
        });
        it('naics.searchExpanded: no duplicates', () => {
            const action = { payload: ['11', '11', '1111'], type: 'SET_SEARCHED_EXPANDED_NAICS' };
            const updatedSearchExpanded = naicsReducer(initialState, action).searchExpanded.toJS();
            expect(updatedSearchExpanded).toEqual(['11', '1111']);
        });
    });
});
