/**
 * CFDAListContainer-test.jsx
 * Created by Emily Gullo 7/26/2017
 */

import React from 'react';
import { mount } from 'enzyme';
import sinon from 'sinon';
import { OrderedMap } from 'immutable';

import { CFDAListContainer } from 'containers/search/filters/cfda/CFDAListContainer';

import { mockCFDA } from './mockCFDA';
import { mockLocalCFDA } from './mockLocalCFDA';

jest.mock('helpers/searchHelper', () => require('../searchHelper'));
jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;

const setup = (props) => mount(<CFDAListContainer {...props} />);

const initialFilters = {
    cfda: []
};

describe('CFDAListContainer', () => {
    describe('Handling text input', () => {
        it('should handle text input after 300ms', () => {
            // setup the cfda list container and call the function to type a single letter
            const cfdaListContainer = setup(Object.assign({}, initialFilters, {
                setAutocompleteCFDA: jest.fn(),
                selectedCFDA: new OrderedMap(),
                autocompleteCFDA: [],
                selectCFDA: jest.fn()
            }));

            const searchQuery = {
                target: {
                    value: '1'
                }
            };

            const handleTextInputSpy = sinon.spy(cfdaListContainer.instance(),
                'handleTextInput');

            // Call handleTextInput function
            cfdaListContainer.instance().handleTextInput(searchQuery);

            // Run fake timer for input delay
            jest.useFakeTimers().runTimersToTime(1000);

            // the mocked SearchHelper waits 1 tick to resolve the promise, so wait for the tick
            jest.runAllTicks();

            // everything should be updated now
            expect(handleTextInputSpy.callCount).toEqual(1);

            // reset the spies
            handleTextInputSpy.reset();
        });

        it('should call the queryAutocompleteCFDA method 300ms after text input', () => {
            // setup the cfda list container and call the function to type a single letter
            const cfdaListContainer = setup(Object.assign({}, initialFilters, {
                setAutocompleteCFDA: jest.fn(),
                selectedCFDA: new OrderedMap(),
                autocompleteCFDA: [],
                selectCFDA: jest.fn()
            }));
            const searchQuery = {
                target: {
                    value: 'N'
                }
            };

            const handleTextInputSpy = sinon.spy(cfdaListContainer.instance(),
                'handleTextInput');
            const queryAutocompleteCFDASpy = sinon.spy(cfdaListContainer.instance(),
                'queryAutocompleteCFDA');

            // Call handleTextInput function
            cfdaListContainer.instance().handleTextInput(searchQuery);

            // Run fake timer for input delay
            jest.useFakeTimers().runTimersToTime(1000);

            // everything should be updated now
            expect(handleTextInputSpy.callCount).toEqual(1);
            expect(queryAutocompleteCFDASpy.callCount).toEqual(1);

            // reset the spies
            handleTextInputSpy.reset();
            queryAutocompleteCFDASpy.reset();
        });

        it('should not search when only one character has been input', () => {
            // setup mock redux actions for handling search results
            const mockReduxActionCFDA = jest.fn();

            // setup the cfda list container and call the function to type a single letter
            const cfdaListContainer = setup(Object.assign({}, initialFilters, {
                setAutocompleteCFDA: jest.fn(),
                selectedCFDA: new OrderedMap(),
                autocompleteCFDA: [],
                selectCFDA: jest.fn()
            }));

            const queryAutocompleteCFDASpy = sinon.spy(cfdaListContainer.instance(),
                'queryAutocompleteCFDA');
            const handleTextInputSpy = sinon.spy(cfdaListContainer.instance(),
                'handleTextInput');

            const searchQuery = {
                target: {
                    value: '1'
                }
            };

            // Call handleTextInput function
            cfdaListContainer.instance().handleTextInput(searchQuery);

            // Run fake timer for input delay
            jest.useFakeTimers().runTimersToTime(1000);

            // everything should be updated now
            expect(handleTextInputSpy.callCount).toEqual(1);
            expect(queryAutocompleteCFDASpy.callCount).toEqual(1);
            expect(mockReduxActionCFDA).toHaveBeenCalledTimes(0);

            // reset the mocks and spies
            handleTextInputSpy.reset();
            queryAutocompleteCFDASpy.reset();
        });

        it('should make a CFDA autocomplete API call when more than one character has '
            + 'been input in the CFDA field', async () => {
            // setup mock redux actions for handling search results
            const mockReduxActionCFDA = jest.fn();

            // setup the cfda list container and call the function to type a single letter
            const cfdaListContainer = setup(Object.assign({}, initialFilters, {
                setAutocompleteCFDA: mockReduxActionCFDA,
                selectedCFDA: new OrderedMap(),
                autocompleteCFDA: [],
                selectCFDA: jest.fn()
            }));

            // set up spies
            const handleTextInputSpy = sinon.spy(cfdaListContainer.instance(),
                'handleTextInput');
            const queryAutocompleteCFDASpy = sinon.spy(cfdaListContainer.instance(),
                'queryAutocompleteCFDA');

            const searchQuery = {
                target: {
                    value: '10'
                }
            };

            // Call handleTextInput function
            cfdaListContainer.instance().handleTextInput(searchQuery);

            // Run fake timer for input delay
            jest.useFakeTimers().runTimersToTime(1000);

            await cfdaListContainer.instance().cfdaSearchRequest.promise;

            // everything should be updated now
            expect(handleTextInputSpy.callCount).toEqual(1);
            expect(queryAutocompleteCFDASpy.calledWith(handleTextInputSpy));
            expect(mockReduxActionCFDA).toHaveBeenCalledTimes(2);
            expect(mockReduxActionCFDA.mock.calls[0]).toEqual([[]]);
            expect(mockReduxActionCFDA.mock.calls[1]).toEqual([mockCFDA.results]);

            // Reset spies
            handleTextInputSpy.reset();
            queryAutocompleteCFDASpy.reset();
        });

        it('should populate CFDA after performing the search', async () => {
            // setup mock redux actions for handling search results
            const mockReduxActionCFDA = jest.fn();

            // setup the cfda list container and call the function to type a single letter
            const cfdaListContainer = setup(Object.assign({}, initialFilters, {
                setAutocompleteCFDA: mockReduxActionCFDA,
                autocompleteCFDA: [],
                selectedCFDA: new OrderedMap(),
                selectCFDA: jest.fn()
            }));

            // Set up spies
            const queryAutocompleteCFDASpy = sinon.spy(cfdaListContainer.instance(),
                'queryAutocompleteCFDA');
            const parseAutocompleteCFDASpy = sinon.spy(cfdaListContainer.instance(),
                'parseAutocompleteCFDA');

            cfdaListContainer.instance().queryAutocompleteCFDA('10');
            await cfdaListContainer.instance().cfdaSearchRequest.promise;

            // everything should be updated now
            expect(queryAutocompleteCFDASpy.callCount).toEqual(1);
            expect(parseAutocompleteCFDASpy.calledWith(queryAutocompleteCFDASpy));
            expect(mockReduxActionCFDA).toHaveBeenCalledTimes(1);
            expect(mockReduxActionCFDA.mock.calls[0]).toEqual([mockLocalCFDA]);

            // Reset spies
            queryAutocompleteCFDASpy.reset();
            parseAutocompleteCFDASpy.reset();
        });

        it('should clear CFDA when the Autocomplete tells it to', () => {
            const reduxState = [];

            // setup mock redux actions for handling search results
            const mockReduxAction = jest.fn((args) => {
                expect(args).toEqual(reduxState);
            });

            const cfdaListContainer = setup(Object.assign({}, initialFilters, {
                setAutocompleteCFDA: mockReduxAction,
                autocompleteCFDA: mockLocalCFDA,
                selectedCFDA: new OrderedMap()
            }));

            // Set up spies
            const clearAutocompleteSuggestionsSpy = sinon.spy(cfdaListContainer.instance(),
                'clearAutocompleteSuggestions');

            cfdaListContainer.instance().clearAutocompleteSuggestions();

            // Run all ticks
            jest.runAllTicks();

            // Everything should be updated
            expect(clearAutocompleteSuggestionsSpy.callCount).toEqual(1);
            expect(mockReduxAction).toHaveBeenCalled();

            // Reset spies
            clearAutocompleteSuggestionsSpy.reset();
        });
    });
});
