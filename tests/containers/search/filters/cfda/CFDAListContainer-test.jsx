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
                setAutocompleteCFDA: jest.fn()
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
                setAutocompleteCFDA: jest.fn()
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
                setAutocompleteCFDA: jest.fn()
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
            expect(mockReduxActionCFDA).toHaveBeenCalledTimes(1);
            expect(mockReduxActionCFDA.mock.calls[0]).toEqual([mockCFDA.results]);

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
            expect(mockReduxActionCFDA.mock.calls[0]).toEqual([mockCFDA]);

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
                autocompleteCFDA: [{
                    program_number: '10.106',
                    popular_name: 'Disaster Relief Appropriations Act, EFRP',
                    program_title: 'Disaster Relief Appropriations Act, Emergency Forest Restoration Program'
                },
                {
                    program_number: '10.108',
                    popular_name: '(LIP)',
                    program_title: 'Livestock Indemnity Program-2014 Farm Bill'
                },
                {
                    program_number: '10.103',
                    popular_name: '',
                    program_title: '2009 Aquaculture Grant Program'
                },
                {
                    program_number: '10.110',
                    popular_name: '(ELAP)',
                    program_title: 'Emergency Assistance for Livestock, Honeybees and Farm-Raised Fish Program-2014 Farm Bill'
                },
                {
                    program_number: '10.104',
                    popular_name: '',
                    program_title: 'Poultry Loss Contract Grant Assistance Program'
                },
                {
                    program_number: '10.102',
                    popular_name: '(EFRP)',
                    program_title: 'Emergency Forest Restoration Program '
                },
                {
                    program_number: '10.101',
                    popular_name: '',
                    program_title: 'Hawaii Sugar Disaster Program'
                },
                {
                    program_number: '10.105',
                    popular_name: 'Disaster Relief Appropriations Act, ECP',
                    program_title: 'Disaster Relief Appropriations Act, Emergency Conservation Program'
                },
                {
                    program_number: '10.109',
                    popular_name: '(LFP)',
                    program_title: 'Livestock Forage Program-2014 Farm Bill'
                },
                {
                    program_number: '10.163',
                    popular_name: '',
                    program_title: 'Market Protection and Promotion'
                }],
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
