/**
 * SearchSidebarSubmitContainer-test.jsx
 * Created by Kevin Li 12/28/17
 */

import React from 'react';
import { mount, shallow } from 'enzyme';
import { Set } from 'immutable';

import { initialState as initialApplied } from 'redux/reducers/search/appliedFiltersReducer'
import { initialState as initialStaged } from 'redux/reducers/search/searchFiltersReducer'

import { SearchSidebarSubmitContainer } from 'containers/search/SearchSidebarSubmitContainer';

import { mockActions, mockRedux } from './mockSubmit';

// mock the child component by replacing it with a function that returns a null element
jest.mock('components/search/SearchSidebarSubmit', () =>
    jest.fn(() => null));

describe('SearchSidebarSubmitContainer', () => {
    describe('compareStores', () => {
        it('should return false if the length of enumerable properties on the applied filter object is different from the length of enumerable properties on the staged filter object', () => {
            const changedStage = Object.assign({}, initialStaged, {
                bonusFilter: 'hello'
            });

            const redux = Object.assign({}, mockRedux, {
                stagedFilters: Object.assign({}, mockRedux.stagedFilters, changedStage)
            });

            const container = shallow(
                <SearchSidebarSubmitContainer
                    {...redux}
                    {...mockActions} />
            );
            const compare = container.instance().compareStores();
            expect(compare).toBeFalsy();
        });

        it('should return false if any item in the staged filter object does not equal the same key value in the applied filter object', () => {
            const changedStage = Object.assign({}, initialStaged, {
                timePeriodFY: new Set(['1995'])
            });

            const redux = Object.assign({}, mockRedux, {
                stagedFilters: Object.assign({}, mockRedux.stagedFilters, changedStage)
            });

            const container = shallow(
                <SearchSidebarSubmitContainer
                    {...redux}
                    {...mockActions} />
            );
            const compare = container.instance().compareStores();
            expect(compare).toBeFalsy();
        });

        it('should return true if all key values are equal in both the staged and applied filter objects', () => {
            const changedStage = Object.assign({}, initialStaged, {
                timePeriodFY: new Set(['1995'])
            });
            const changedApplied = Object.assign({}, initialApplied.filters, {
                timePeriodFY: new Set(['1995'])
            });

            const redux = Object.assign({}, mockRedux, {
                stagedFilters: Object.assign({}, mockRedux.stagedFilters, changedStage),
                appliedFilters: Object.assign({}, mockRedux.appliedFilters, changedApplied),
            });

            const container = shallow(
                <SearchSidebarSubmitContainer
                    {...redux}
                    {...mockActions} />
            );
            const compare = container.instance().compareStores();
            expect(compare).toBeTruthy();
        });
    });
    describe('stagingChanged', () => {
        it('should set the filtersChanged state to true when the stores are not equal', () => {
            const container = shallow(
                <SearchSidebarSubmitContainer
                    {...mockRedux}
                    {...mockActions} />
            );
            container.instance().compareStores = jest.fn(() => false);

            container.instance().stagingChanged();
            expect(container.state().filtersChanged).toBeTruthy();
        });
        it('should set the filtersChanged state to false when the stores are equal and the filtersChanged state was previously true', () => {
            const container = shallow(
                <SearchSidebarSubmitContainer
                    {...mockRedux}
                    {...mockActions} />
            );
            container.instance().compareStores = jest.fn(() => true);
            container.setState({
                filtersChanged: true
            });

            container.instance().stagingChanged();
            expect(container.state().filtersChanged).toBeFalsy();
        });
    });
    describe('applyStagedFilters', () => {
        it('should tell Redux to copy the staged filter set to the applied filter set', () => {
            const actions = Object.assign({}, mockActions, {
                applyStagedFilters: jest.fn()
            });

            const container = shallow(
                <SearchSidebarSubmitContainer
                    {...mockRedux}
                    {...actions} />
            );
            container.instance().applyStagedFilters();

            expect(actions.applyStagedFilters).toHaveBeenCalledTimes(1);
        });

        it('should reset the filtersChanged state to false', () => {
            const container = shallow(
                <SearchSidebarSubmitContainer
                    {...mockRedux}
                    {...mockActions} />
            );
            container.setState({
                filtersChanged: true
            });

            container.instance().applyStagedFilters();

            expect(container.state().filtersChanged).toBeFalsy();
        });
    });
    describe('resetFilters', () => {
        it('should reset all the staged filters to their initial states', () => {
            const actions = Object.assign({}, mockActions, {
                clearStagedFilters: jest.fn()
            });

            const container = shallow(
                <SearchSidebarSubmitContainer
                    {...mockRedux}
                    {...actions} />
            );
            
            container.instance().resetFilters();
            expect(actions.clearStagedFilters).toHaveBeenCalledTimes(1);
        });
        it('should reset all the applied filters to their initial states', () => {
            const actions = Object.assign({}, mockActions, {
                resetAppliedFilters: jest.fn()
            });

            const container = shallow(
                <SearchSidebarSubmitContainer
                    {...mockRedux}
                    {...actions} />
            );
            
            container.instance().resetFilters();
            expect(actions.resetAppliedFilters).toHaveBeenCalledTimes(1);
        });
    });
});