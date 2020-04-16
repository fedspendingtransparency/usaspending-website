/**
 * AccountObjectClassContainer-test.jsx
 * Created by Kevin Li 3/31/17
 */


import React from 'react';
import { mount, shallow } from 'enzyme';
import { OrderedSet } from 'immutable';

import { AccountObjectClassContainer } from
    'containers/account/filters/AccountObjectClassContainer';

import { mockAvailableOC, mockReduxActions } from './mockObjectClass';

// mock the child component by replacing it with a function that returns a null element
jest.mock('components/account/filters/objectClass/ObjectClassFilter', () =>
    jest.fn(() => null));

jest.mock('helpers/accountHelper', () => require('../accountHelper'));

const defaultFilters = {
    accountId: 12
};

describe('AccountObjectClassContainer', () => {
    describe('loadAvailableOCs', () => {
        it('should perform an API request to get the relevant object classes for the current federal account', async () => {
            const container = mount(<AccountObjectClassContainer
                {...defaultFilters}
                {...mockReduxActions} />);
            const mockParse = jest.fn();
            container.instance().parseAvailableOCs = mockParse;

            await container.instance().availableRequest.promise;

            expect(mockParse).toHaveBeenCalledTimes(1);
            expect(mockParse).toHaveBeenCalledWith(mockAvailableOC.results);
        });
    });

    describe('parseAvailableOCs', () => {
        it('should parse the API response to create an object mapping keys to IDs and values to names', () => {
            const setOC = jest.fn();
            const actions = Object.assign({}, mockReduxActions, {
                setAvailableObjectClasses: setOC
            });
            const container = shallow(<AccountObjectClassContainer
                {...defaultFilters}
                {...actions} />);

            container.instance().parseAvailableOCs(mockAvailableOC.results);
            expect(setOC).toHaveBeenCalledTimes(1);
            expect(setOC.mock.calls[0][0].definitions).toEqual({
                '1': 'Major OC 1',
                '10': 'Minor OC 10',
                '20': 'Minor OC 20'
            });
        });
        it('should parse the API response to create an object mapping an array of child IDs to their major ID', () => {
            const setOC = jest.fn();
            const actions = Object.assign({}, mockReduxActions, {
                setAvailableObjectClasses: setOC
            });
            const container = shallow(<AccountObjectClassContainer
                {...defaultFilters}
                {...actions} />);

            container.instance().parseAvailableOCs(mockAvailableOC.results);
            expect(setOC).toHaveBeenCalledTimes(1);
            expect(setOC.mock.calls[0][0].children).toEqual({
                '1': ['10', '20']
            });
        });
        it('should parse the API response and store the response object in Redux', () => {
            const setOC = jest.fn();
            const actions = Object.assign({}, mockReduxActions, {
                setAvailableObjectClasses: setOC
            });
            const container = shallow(<AccountObjectClassContainer
                {...defaultFilters}
                {...actions} />);

            container.instance().parseAvailableOCs(mockAvailableOC.results);
            expect(setOC).toHaveBeenCalledTimes(1);
            expect(setOC.mock.calls[0][0].values).toEqual(mockAvailableOC.results);
        });
    });

    describe('updateFilter', () => {
        it('should just pass the argument up to the associated Redux action', () => {
            const mockAction = jest.fn();
            const actions = Object.assign({}, mockReduxActions, {
                toggleObjectClass: mockAction
            });
            const container = shallow(<AccountObjectClassContainer
                {...defaultFilters}
                {...actions} />);

            container.instance().updateFilter({ value: '123' });
            expect(mockAction).toHaveBeenCalledTimes(1);
            expect(mockAction).toHaveBeenCalledWith('123');
        });
    });

    describe('updateMajorFilter', () => {
        it('should just pass the argument up to the associated Redux action', () => {
            const mockAction = jest.fn();
            const actions = Object.assign({}, mockReduxActions, {
                bulkObjectClassesChange: mockAction
            });
            const container = shallow(<AccountObjectClassContainer
                {...defaultFilters}
                {...actions} />);

            container.instance().updateMajorFilter({
                types: [123, 234],
                direction: 'add'
            });
            expect(mockAction).toHaveBeenCalledTimes(1);
            expect(mockAction).toHaveBeenCalledWith({
                types: [123, 234],
                direction: 'add'
            });
        });
    });
});
