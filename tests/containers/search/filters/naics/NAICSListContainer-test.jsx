/**
 * NAICSListContainer-test.jsx
 * Created by Emily Gullo 7/26/2017
 */

import React from 'react';
import { mount } from 'enzyme';
import sinon from 'sinon';
import { OrderedMap } from 'immutable';

import { NAICSListContainer } from 'containers/search/filters/naics/NAICSListContainer';

import { mockNAICS } from './mockNAICS';
import { mockLocalNAICS } from './mockLocalNAICS';

jest.mock('helpers/searchHelper', () => require('../searchHelper'));
jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;

const setup = (props) => mount(<NAICSListContainer {...props} />);

const initialFilters = {
    naics: []
};

describe('naicsListContainer', () => {
    describe('Handling text input', () => {
        it('should handle text input after 300ms', () => {
            // setup the naics list container and call the function to type a single letter
            const naicsListContainer = setup(Object.assign({}, initialFilters, {
                setAutocompleteNAICS: jest.fn(),
                selectedNAICS: new OrderedMap(),
                autocompleteNAICS: [],
                selectNAICS: jest.fn()
            }));

            const searchQuery = {
                target: {
                    value: '1'
                }
            };

            const handleTextInputSpy = sinon.spy(naicsListContainer.instance(),
                'handleTextInput');

            // Call handleTextInput function
            naicsListContainer.instance().handleTextInput(searchQuery);

            // Run fake timer for input delay
            jest.useFakeTimers().runTimersToTime(1000);

            // the mocked SearchHelper waits 1 tick to resolve the promise, so wait for the tick
            jest.runAllTicks();

            // everything should be updated now
            expect(handleTextInputSpy.callCount).toEqual(1);

            // reset the spies
            handleTextInputSpy.reset();
        });

        it('should call the queryAutocompleteNAICS method 300ms after text input', () => {
            // setup the naics list container and call the function to type a single letter
            const naicsListContainer = setup(Object.assign({}, initialFilters, {
                setAutocompleteNAICS: jest.fn(),
                selectedNAICS: new OrderedMap(),
                autocompleteNAICS: [],
                selectNAICS: jest.fn()
            }));
            const searchQuery = {
                target: {
                    value: '3'
                }
            };

            const handleTextInputSpy = sinon.spy(naicsListContainer.instance(),
                'handleTextInput');
            const queryAutocompleteNAICSSpy = sinon.spy(naicsListContainer.instance(),
                'queryAutocompleteNAICS');

            // Call handleTextInput function
            naicsListContainer.instance().handleTextInput(searchQuery);

            // Run fake timer for input delay
            jest.useFakeTimers().runTimersToTime(1000);

            // everything should be updated now
            expect(handleTextInputSpy.callCount).toEqual(1);
            expect(queryAutocompleteNAICSSpy.callCount).toEqual(1);

            // reset the spies
            handleTextInputSpy.reset();
            queryAutocompleteNAICSSpy.reset();
        });

        it('should not search when only one character has been input', () => {
            // setup mock redux actions for handling search results
            const mockReduxActionNAICS = jest.fn();

            // setup the naics list container and call the function to type a single letter
            const naicsListContainer = setup(Object.assign({}, initialFilters, {
                setAutocompleteNAICS: jest.fn(),
                selectedNAICS: new OrderedMap(),
                autocompleteNAICS: [],
                selectNAICS: jest.fn()
            }));

            const queryAutocompleteNAICSSpy = sinon.spy(naicsListContainer.instance(),
                'queryAutocompleteNAICS');
            const handleTextInputSpy = sinon.spy(naicsListContainer.instance(),
                'handleTextInput');

            const searchQuery = {
                target: {
                    value: '1'
                }
            };

            // Call handleTextInput function
            naicsListContainer.instance().handleTextInput(searchQuery);

            // Run fake timer for input delay
            jest.useFakeTimers().runTimersToTime(1000);

            // everything should be updated now
            expect(handleTextInputSpy.callCount).toEqual(1);
            expect(queryAutocompleteNAICSSpy.callCount).toEqual(1);
            expect(mockReduxActionNAICS).toHaveBeenCalledTimes(0);

            // reset the mocks and spies
            handleTextInputSpy.reset();
            queryAutocompleteNAICSSpy.reset();
        });

        it('should make a NAICS autocomplete API call when more than one character has '
            + 'been input in the NAICS field', async () => {
            // setup mock redux actions for handling search results
            const mockReduxActionNAICS = jest.fn();

            // setup the naics list container and call the function to type a single letter
            const naicsListContainer = setup(Object.assign({}, initialFilters, {
                setAutocompleteNAICS: mockReduxActionNAICS,
                selectedNAICS: new OrderedMap(),
                autocompleteNAICS: [],
                selectNAICS: jest.fn()
            }));

            // set up spies
            const handleTextInputSpy = sinon.spy(naicsListContainer.instance(),
                'handleTextInput');
            const queryAutocompleteNAICSSpy = sinon.spy(naicsListContainer.instance(),
                'queryAutocompleteNAICS');

            const searchQuery = {
                target: {
                    value: '33'
                }
            };

            // Call handleTextInput function
            naicsListContainer.instance().handleTextInput(searchQuery);

            // Run fake timer for input delay
            jest.useFakeTimers().runTimersToTime(1000);

            await naicsListContainer.instance().naicsSearchRequest.promise;

            // everything should be updated now
            expect(handleTextInputSpy.callCount).toEqual(1);
            expect(queryAutocompleteNAICSSpy.calledWith(handleTextInputSpy));
            expect(mockReduxActionNAICS).toHaveBeenCalledTimes(2);
            expect(mockReduxActionNAICS.mock.calls[0]).toEqual([[]]);
            expect(mockReduxActionNAICS.mock.calls[1]).toEqual([mockNAICS.results]);

            // Reset spies
            handleTextInputSpy.reset();
            queryAutocompleteNAICSSpy.reset();
        });

        it('should populate NAICS after performing the search', async () => {
            // setup mock redux actions for handling search results
            const mockReduxActionNAICS = jest.fn();

            // setup the naics list container and call the function to type a single letter
            const naicsListContainer = setup(Object.assign({}, initialFilters, {
                setAutocompleteNAICS: mockReduxActionNAICS,
                autocompleteNAICS: [],
                selectedNAICS: new OrderedMap(),
                selectNAICS: jest.fn()
            }));

            // Set up spies
            const queryAutocompleteNAICSSpy = sinon.spy(naicsListContainer.instance(),
                'queryAutocompleteNAICS');
            const parseAutocompleteNAICSSpy = sinon.spy(naicsListContainer.instance(),
                'parseAutocompleteNAICS');

            naicsListContainer.instance().queryAutocompleteNAICS('33');
            await naicsListContainer.instance().naicsSearchRequest.promise;

            // everything should be updated now
            expect(queryAutocompleteNAICSSpy.callCount).toEqual(1);
            expect(parseAutocompleteNAICSSpy.calledWith(queryAutocompleteNAICSSpy));
            expect(mockReduxActionNAICS).toHaveBeenCalledTimes(1);
            expect(mockReduxActionNAICS.mock.calls[0]).toEqual([mockLocalNAICS]);

            // Reset spies
            queryAutocompleteNAICSSpy.reset();
            parseAutocompleteNAICSSpy.reset();
        });

        it('should clear NAICS when the Autocomplete tells it to', () => {
            const reduxState = [];

            // setup mock redux actions for handling search results
            const mockReduxAction = jest.fn((args) => {
                expect(args).toEqual(reduxState);
            });

            const naicsListContainer = setup(Object.assign({}, initialFilters, {
                setAutocompleteNAICS: mockReduxAction,
                autocompleteNAICS: mockLocalNAICS,
                selectedNAICS: new OrderedMap()
            }));

            // Set up spies
            const clearAutocompleteSuggestionsSpy = sinon.spy(naicsListContainer.instance(),
                'clearAutocompleteSuggestions');

            naicsListContainer.instance().clearAutocompleteSuggestions();

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
