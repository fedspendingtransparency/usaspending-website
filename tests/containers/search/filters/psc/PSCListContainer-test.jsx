/**
 * PSCListContainer-test.jsx
 * Created by Emily Gullo 7/26/2017
 */

import React from 'react';
import { mount } from 'enzyme';
import sinon from 'sinon';
import { OrderedMap } from 'immutable';

import { PSCListContainer } from 'containers/search/filters/psc/PSCListContainer';

import { mockPSC } from './mockPSC';
import { mockLocalPSC } from './mockLocalPSC';

jest.mock('helpers/searchHelper', () => require('../searchHelper'));
jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;

const setup = (props) => mount(<PSCListContainer {...props} />);

const initialFilters = {
    psc: []
};

describe('pscListContainer', () => {
    describe('Handling text input', () => {
        it('should handle text input after 300ms', () => {
            // setup the psc list container and call the function to type a single letter
            const pscListContainer = setup(Object.assign({}, initialFilters, {
                setAutocompletePSC: jest.fn(),
                selectedPSC: new OrderedMap(),
                autocompletePSC: [],
                selectPSC: jest.fn()
            }));

            const searchQuery = {
                target: {
                    value: '1'
                }
            };

            const handleTextInputSpy = sinon.spy(pscListContainer.instance(),
                'handleTextInput');

            // Call handleTextInput function
            pscListContainer.instance().handleTextInput(searchQuery);

            // Run fake timer for input delay
            jest.useFakeTimers().runTimersToTime(1000);

            // the mocked SearchHelper waits 1 tick to resolve the promise, so wait for the tick
            jest.runAllTicks();

            // everything should be updated now
            expect(handleTextInputSpy.callCount).toEqual(1);

            // reset the spies
            handleTextInputSpy.reset();
        });

        it('should call the queryAutocompletePSC method 300ms after text input', () => {
            // setup the psc list container and call the function to type a single letter
            const pscListContainer = setup(Object.assign({}, initialFilters, {
                setAutocompletePSC: jest.fn(),
                selectedPSC: new OrderedMap(),
                autocompletePSC: [],
                selectPSC: jest.fn()
            }));
            const searchQuery = {
                target: {
                    value: 'N'
                }
            };

            const handleTextInputSpy = sinon.spy(pscListContainer.instance(),
                'handleTextInput');
            const queryAutocompletePSCSpy = sinon.spy(pscListContainer.instance(),
                'queryAutocompletePSC');

            // Call handleTextInput function
            pscListContainer.instance().handleTextInput(searchQuery);

            // Run fake timer for input delay
            jest.useFakeTimers().runTimersToTime(1000);

            // everything should be updated now
            expect(handleTextInputSpy.callCount).toEqual(1);
            expect(queryAutocompletePSCSpy.callCount).toEqual(1);

            // reset the spies
            handleTextInputSpy.reset();
            queryAutocompletePSCSpy.reset();
        });

        it('should not search when only one character has been input', () => {
            // setup mock redux actions for handling search results
            const mockReduxActionPSC = jest.fn();

            // setup the psc list container and call the function to type a single letter
            const pscListContainer = setup(Object.assign({}, initialFilters, {
                setAutocompletePSC: jest.fn(),
                selectedPSC: new OrderedMap(),
                autocompletePSC: [],
                selectPSC: jest.fn()
            }));

            const queryAutocompletePSCSpy = sinon.spy(pscListContainer.instance(),
                'queryAutocompletePSC');
            const handleTextInputSpy = sinon.spy(pscListContainer.instance(),
                'handleTextInput');

            const searchQuery = {
                target: {
                    value: '1'
                }
            };

            // Call handleTextInput function
            pscListContainer.instance().handleTextInput(searchQuery);

            // Run fake timer for input delay
            jest.useFakeTimers().runTimersToTime(1000);

            // everything should be updated now
            expect(handleTextInputSpy.callCount).toEqual(1);
            expect(queryAutocompletePSCSpy.callCount).toEqual(1);
            expect(mockReduxActionPSC).toHaveBeenCalledTimes(0);

            // reset the mocks and spies
            handleTextInputSpy.reset();
            queryAutocompletePSCSpy.reset();
        });

        it('should make a PSC autocomplete API call when more than one character has '
            + 'been input in the PSC field', async () => {
            // setup mock redux actions for handling search results
            const mockReduxActionPSC = jest.fn();

            // setup the psc list container and call the function to type a single letter
            const pscListContainer = setup(Object.assign({}, initialFilters, {
                setAutocompletePSC: mockReduxActionPSC,
                selectedPSC: new OrderedMap(),
                autocompletePSC: [],
                selectPSC: jest.fn()
            }));

            // set up spies
            const handleTextInputSpy = sinon.spy(pscListContainer.instance(),
                'handleTextInput');
            const queryAutocompletePSCSpy = sinon.spy(pscListContainer.instance(),
                'queryAutocompletePSC');

            const searchQuery = {
                target: {
                    value: '10'
                }
            };

            // Call handleTextInput function
            pscListContainer.instance().handleTextInput(searchQuery);

            // Run fake timer for input delay
            jest.useFakeTimers().runTimersToTime(1000);

            await pscListContainer.instance().pscSearchRequest.promise;

            // everything should be updated now
            expect(handleTextInputSpy.callCount).toEqual(1);
            expect(queryAutocompletePSCSpy.calledWith(handleTextInputSpy));
            expect(mockReduxActionPSC).toHaveBeenCalledTimes(2);
            expect(mockReduxActionPSC.mock.calls[0]).toEqual([[]]);
            expect(mockReduxActionPSC.mock.calls[1]).toEqual([mockPSC.results]);

            // Reset spies
            handleTextInputSpy.reset();
            queryAutocompletePSCSpy.reset();
        });

        it('should populate PSC after performing the search', async () => {
            // setup mock redux actions for handling search results
            const mockReduxActionPSC = jest.fn();

            // setup the psc list container and call the function to type a single letter
            const pscListContainer = setup(Object.assign({}, initialFilters, {
                setAutocompletePSC: mockReduxActionPSC,
                autocompletePSC: [],
                selectedPSC: new OrderedMap(),
                selectPSC: jest.fn()
            }));

            // Set up spies
            const queryAutocompletePSCSpy = sinon.spy(pscListContainer.instance(),
                'queryAutocompletePSC');
            const parseAutocompletePSCSpy = sinon.spy(pscListContainer.instance(),
                'parseAutocompletePSC');

            pscListContainer.instance().queryAutocompletePSC('33');
            await pscListContainer.instance().pscSearchRequest.promise;

            // everything should be updated now
            expect(queryAutocompletePSCSpy.callCount).toEqual(1);
            expect(parseAutocompletePSCSpy.calledWith(queryAutocompletePSCSpy));
            expect(mockReduxActionPSC).toHaveBeenCalledTimes(1);
            expect(mockReduxActionPSC.mock.calls[0]).toEqual([mockLocalPSC]);

            // Reset spies
            queryAutocompletePSCSpy.reset();
            parseAutocompletePSCSpy.reset();
        });

        it('should clear PSC when the Autocomplete tells it to', () => {
            const reduxState = [];

            // setup mock redux actions for handling search results
            const mockReduxAction = jest.fn((args) => {
                expect(args).toEqual(reduxState);
            });

            const pscListContainer = setup(Object.assign({}, initialFilters, {
                setAutocompletePSC: mockReduxAction,
                autocompletePSC: mockLocalPSC,
                selectedPSC: new OrderedMap()
            }));

            // Set up spies
            const clearAutocompleteSuggestionsSpy = sinon.spy(pscListContainer.instance(),
                'clearAutocompleteSuggestions');

            pscListContainer.instance().clearAutocompleteSuggestions();

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
