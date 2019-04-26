/**
 * StateLandingContainer-test.jsx
 * Created by Kevin Li 5/23/18
 */

import React from 'react';
import { shallow, mount } from 'enzyme';

import StateLandingContainer from 'containers/stateLanding/StateLandingContainer';
import BaseStateLandingItem from 'models/v2/state/BaseStateLandingItem';

import { fetchStateList } from '../state/mockStateHelper';
import { mockStateList } from '../state/mockData';

// mock the state helper
jest.mock('helpers/stateHelper', () => require('../state/mockStateHelper'));
jest.mock('js-search', () => require('./mockStateSearch'));

// mock the child component by replacing it with a function that returns a null element
jest.mock('components/stateLanding/StateLandingContent', () => jest.fn(() => null));

describe('StateLandingContainer', () => {
    describe('setSearchString', () => {
        it('should update the searchString state value to the provided input', () => {
            const container = shallow(<StateLandingContainer />);
            container.instance().performSearch = jest.fn();

            container.instance().setSearchString('test');
            expect(container.state().searchString).toEqual('test');
        });
        it('should trigger a search operation', () => {
            const container = shallow(<StateLandingContainer />);
            container.instance().performSearch = jest.fn();

            container.instance().setSearchString('test');
            expect(container.instance().performSearch).toHaveBeenCalledTimes(1);
        });
    });

    describe('setSort', () => {
        it('should update the sortField and sortDirection state values to the provided input', () => {
            const container = shallow(<StateLandingContainer />);
            container.instance().performSearch = jest.fn();

            container.instance().setSort('field', 'direction');
            expect(container.state().sortField).toEqual('field');
            expect(container.state().sortDirection).toEqual('direction');
        });
        it('should trigger a search operation', () => {
            const container = shallow(<StateLandingContainer />);
            container.instance().performSearch = jest.fn();

            container.instance().setSort('field', 'direction');
            expect(container.instance().performSearch).toHaveBeenCalledTimes(1);
        });
    });

    describe('loadData', () => {
        it('should make an API call', () => {
            const container = shallow(<StateLandingContainer />);

            container.instance().loadData();
            expect(fetchStateList).toHaveBeenCalledTimes(1);
        });
        it('should call parseData on success', async () => {
            const container = shallow(<StateLandingContainer />);
            container.instance().parseData = jest.fn();

            container.instance().loadData();
            await container.instance().request.promise;

            expect(container.instance().parseData).toHaveBeenCalledTimes(1);
        });
    });

    describe('parseData', () => {
        it('should return an array of BaseStateLandingItem objects', () => {
            const container = shallow(<StateLandingContainer />);
            container.instance().performSearch = jest.fn();
            container.instance().parseData(mockStateList);

            expect(container.state().fullData.length).toEqual(2);
            expect(Object.getPrototypeOf(container.state().fullData[0])).toEqual(BaseStateLandingItem);
        });
        it('should update the loading and error states to false', () => {
            const container = shallow(<StateLandingContainer />);
            container.instance().parseData(mockStateList);

            expect(container.state().loading).toBeFalsy();
            expect(container.state().error).toBeFalsy();
        });
        it('should trigger a search operation', () => {
            const container = shallow(<StateLandingContainer />);
            container.instance().performSearch = jest.fn();
            container.instance().parseData(mockStateList);

            expect(container.instance().performSearch).toHaveBeenCalledTimes(1);
        });
    });

    describe('performSearch', () => {
        it('should return the output of the local search library', () => {
            const container = shallow(<StateLandingContainer />);

            const results = mockStateList.map((data) => {
                const item = Object.create(BaseStateLandingItem);
                item.populate(data);
                return item;
            });

            container.setState({
                fullData: results,
                searchString: 'abcd'
            });

            // we are mocking the local search library so it always returns a static data set of length 1
            container.instance().performSearch();
            expect(container.state().results).toHaveLength(1);
            expect(container.state().results).not.toEqual(container.state().fullData);
        });

        it('should not perform a local search but sort the full data set when the searchString state is empty', () => {
            const container = shallow(<StateLandingContainer />);

            const results = mockStateList.map((data) => {
                const item = Object.create(BaseStateLandingItem);
                item.populate(data);
                return item;
            });

            container.setState({
                fullData: results,
                searchString: ''
            });

            container.instance().performSearch();
            expect(container.state().results).toEqual(container.state().fullData);
        });

        it('should separate states and territories when sorting by name', () => {
            const container = shallow(<StateLandingContainer />);

            const updatedStateList = [
                {
                    fips: '03',
                    code: 'CC',
                    name: 'A Territory',
                    amount: 123.45,
                    type: 'territory'
                }
            ].concat(mockStateList);

            const results = updatedStateList.map((data) => {
                const item = Object.create(BaseStateLandingItem);
                item.populate(data);
                return item;
            });

            container.setState({
                fullData: results,
                searchString: ''
            });

            container.instance().performSearch();

            // Even though 'A Territory' comes alphabetically before 'State A',
            // the territory should come after states
            expect(container.state().results[0].name).toEqual('State A (AA)');
            expect(container.state().results[2].name).toEqual('A Territory (CC)');
        });
    });
});
