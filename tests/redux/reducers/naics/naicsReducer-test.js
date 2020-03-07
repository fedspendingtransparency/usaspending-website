import { List } from 'immutable';

import { naicsReducer, initialState } from 'redux/reducers/search/naicsReducer/naicsReducer';
import * as naicsActions from 'redux/actions/search/naicsActions';

import * as mockData from "../../../containers/search/filters/naics/mockNAICS";

describe('Naics Reducer', () => {
    describe('redux.naics.naics', () => {
        it('should set initial state', () => {
            const nodes = mockData.placeholderNodes;
            const action = { payload: nodes, type: 'SET_NAICS' };
            const updatedNaics = naicsReducer(initialState, action).naics.toJS();
            expect(updatedNaics[0].label).toEqual('Agriculture, Forestry, Fishing and Hunting');
        });
        it('should update specific parent when passed the key for it', () => {
            const actionObj = naicsActions.setNaics('11', [mockData.reallyBigTree[0]]);
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
        });
    });
    describe('other properties under naics keyspace do not and cannot have duplicate values', () => {
        it('naics.expanded: no duplicates', () => {
            const action = { payload: ['11', '11', '1111'], type: 'SET_EXPANDED' };
            const updatedExpanded = naicsReducer(initialState, action).expanded.toJS();
            expect(updatedExpanded).toEqual(["11", "1111"]);
        });
        it('naics.checked: no duplicates', () => {
            const action = { payload: ['11', '11', '1111'], type: 'SET_CHECKED' };
            const updatedChecked = naicsReducer(initialState, action).checked.toJS();
            expect(updatedChecked).toEqual(['11', '1111']);
        });
        it('naics.unchecked: no duplicates', () => {
            const action = { payload: ['11', '11', '1111'], type: 'SET_UNCHECKED' };
            const updatedUncheck = naicsReducer(initialState, action).unchecked.toJS();
            expect(updatedUncheck).toEqual(['11', '1111']);
        });
        it('naics.searchExpanded: no duplicates', () => {
            const action = { payload: ['11', '11', '1111'], type: 'SET_SEARCH_EXPANDED' };
            const updatedSearchExpanded = naicsReducer(initialState, action).searchExpanded.toJS();
            expect(updatedSearchExpanded).toEqual(['11', '1111']);
        });
    });
    // describe('addChecked persists previous state plus a new value, while setChecked erases previous values', () => {
    //     it('naics.expanded: no duplicates', () => {
    //         const expanded = new List(['11']);
    //         const action = { expanded: expanded.toJS(), type: 'SET_EXPANDED' };
    //         const updatedRedux = naicsReducer(initialState, action);
    //         expect(updatedRedux.expanded).toEqual(expanded);
    //     });
    //     it('naics.checked: no duplicates', () => {
    //         const expanded = new List(['11']);
    //         const action = { expanded: expanded.toJS(), type: 'SET_EXPANDED' };
    //         const updatedRedux = naicsReducer(initialState, action);
    //         expect(updatedRedux.expanded).toEqual(expanded);
    //     });
    //     it('naics.unchecked: no duplicates', () => {
    //         const expanded = new List(['11']);
    //         const action = { expanded: expanded.toJS(), type: 'SET_EXPANDED' };
    //         const updatedRedux = naicsReducer(initialState, action);
    //         expect(updatedRedux.expanded).toEqual(expanded);
    //     });
    // });
});
