/**
 * RecipientLocationContainer-test.jsx
 * Created by michaelbray on 2/17/17.
 */

import React from 'react';
import { mount } from 'enzyme';
import sinon from 'sinon';
import { OrderedMap } from 'immutable';

import { RecipientLocationContainer } from
    'containers/search/filters/recipient/RecipientLocationContainer';

import * as SearchHelper from 'helpers/searchHelper';
import * as recipientActions from 'redux/actions/search/recipientActions';

const setup = (props) => mount(<RecipientLocationContainer {...props} />);

const initialFilters = {
    autocompleteRecipientLocations: []
};

// force Jest to use native Node promises
// see: https://facebook.github.io/jest/docs/troubleshooting.html#unresolved-promises
global.Promise = require.requireActual('promise');

const apiResponse = [
    {
        place_type: "COUNTY",
        matched_ids: [22796],
        place: "McLean",
        parent: "KENTUCKY"
    }
];

// we don't want to actually hit the API because tests should be fully controlled, so we will mock
// the SearchHelper functions
const mockSearchHelper = (functionName, event, expectedResponse) => {
    jest.useFakeTimers();
    // override the specified function
    SearchHelper[functionName] = jest.fn(() => {
        // Axios normally returns a promise, replicate this, but return the expected result
        const networkCall = new Promise((resolve, reject) => {
            process.nextTick(() => {
                if (event === 'resolve') {
                    resolve({
                        data: expectedResponse
                    });
                }
                else {
                    reject({
                        data: expectedResponse
                    });
                }
            });
        });

        return {
            promise: networkCall,
            cancel: jest.fn()
        };
    });
};

const unmockSearchHelper = () => {
    jest.useRealTimers();
    jest.unmock('helpers/searchHelper');
};

describe('RecipientLocationContainer', () => {
    describe('Handling text input', () => {
        it('should handle text input after 300ms', () => {
            // Set up the Container and call the function to type a single letter
            const recipientLocationContainer = setup({
                reduxFilters: initialFilters,
                setAutocompleteRecipientLocations:
                    recipientActions.setAutocompleteRecipientLocations,
                selectedRecipientLocations: new OrderedMap(),
                autocompleteRecipientLocations: []
            });

            const searchQuery = {
                target: {
                    value: 'B'
                }
            };

            const handleTextInputSpy = sinon.spy(recipientLocationContainer.instance(),
                'handleTextInput');

            // Call handleTextInput function
            recipientLocationContainer.instance().handleTextInput(searchQuery);

            // Run fake timer for input delay
            jest.useFakeTimers().runTimersToTime(1000);

            // the mocked SearchHelper waits 1 tick to resolve the promise, so wait for the tick
            jest.runAllTicks();

            // everything should be updated now
            expect(handleTextInputSpy.callCount).toEqual(1);

            // reset the spies
            handleTextInputSpy.reset();
        });

        it('should call the queryAutocompleteRecipientLocations method 300ms ' +
            'after text input', () => {
            // Set up the Container and call the function to type a single letter
            const recipientLocationContainer = setup({
                reduxFilters: initialFilters,
                setAutocompleteRecipientLocations:
                    recipientActions.setAutocompleteRecipientLocations,
                selectedRecipientLocations: new OrderedMap(),
                autocompleteRecipientLocations: []
            });
            const searchQuery = {
                target: {
                    value: 'B'
                }
            };

            const handleTextInputSpy = sinon.spy(recipientLocationContainer.instance(),
                'handleTextInput');
            const queryAutocompleteRecipientLocationsSpy = sinon
                .spy(recipientLocationContainer.instance(), 'queryAutocompleteRecipientLocations');

            // Call handleTextInput function
            recipientLocationContainer.instance().handleTextInput(searchQuery);

            // Run fake timer for input delay
            jest.useFakeTimers().runTimersToTime(1000);

            // the mocked SearchHelper waits 1 tick to resolve the promise, so wait for the tick
            jest.runAllTicks();

            // everything should be updated now
            expect(handleTextInputSpy.callCount).toEqual(1);
            expect(queryAutocompleteRecipientLocationsSpy.callCount).toEqual(1);

            // reset the spies
            handleTextInputSpy.reset();
            queryAutocompleteRecipientLocationsSpy.reset();
        });

        it('should not search when only one character has been input', () => {
            // setup mock redux actions for handling search results
            const mockReduxAction = jest.fn();

            // Set up the Container and call the function to type a single letter
            const recipientLocationContainer = setup({
                reduxFilters: initialFilters,
                setAutocompleteRecipientLocations: mockReduxAction,
                selectedRecipientLocations: new OrderedMap(),
                autocompleteRecipientLocations: []
            });

            const queryAutocompleteRecipientLocationsSpy = sinon
                .spy(recipientLocationContainer.instance(),
                'queryAutocompleteRecipientLocations');
            const handleTextInputSpy = sinon.spy(recipientLocationContainer.instance(),
                'handleTextInput');

            const searchQuery = {
                target: {
                    value: 'B'
                }
            };
            recipientLocationContainer.instance().handleTextInput(searchQuery);

            // Run fake timer for input delay
            jest.useFakeTimers().runTimersToTime(1000);

            // everything should be updated now
            expect(handleTextInputSpy.callCount).toEqual(1);
            expect(queryAutocompleteRecipientLocationsSpy.callCount).toEqual(1);
            expect(mockReduxAction).toHaveBeenCalledTimes(1);

            // reset the mocks and spies
            handleTextInputSpy.reset();
            queryAutocompleteRecipientLocationsSpy.reset();
        });

        it('should search when more than one character has been input ' +
            'into the Recipient Name/DUNS field', () => {
            // setup mock redux actions for handling search results
            const mockReduxAction = jest.fn();

            // Set up the Container and call the function to type a single letter
            const recipientLocationContainer = setup({
                reduxFilters: initialFilters,
                setAutocompleteRecipientLocations: mockReduxAction,
                selectedRecipientLocations: new OrderedMap(),
                autocompleteRecipientLocations: []
            });

            // set up spies
            const handleTextInputSpy = sinon.spy(recipientLocationContainer.instance(),
                'handleTextInput');
            const queryAutocompleteRecipientLocationsSpy = sinon
                .spy(recipientLocationContainer.instance(), 'queryAutocompleteRecipientLocations');

            const searchQuery = {
                target: {
                    value: 'Booz Allen'
                }
            };
            recipientLocationContainer.instance().handleTextInput(searchQuery);

            // Run fake timer for input delay
            jest.useFakeTimers().runTimersToTime(300);

            // Run fake timer for input delay
            jest.runAllTicks();

            // everything should be updated now
            expect(handleTextInputSpy.callCount).toEqual(1);
            expect(queryAutocompleteRecipientLocationsSpy.calledWith(handleTextInputSpy));

            // Reset spies
            handleTextInputSpy.reset();
            queryAutocompleteRecipientLocationsSpy.reset();
        });

        it('should populate Recipients after performing the search', () => {
            // Setup redux state
            const reduxState = [{
                '22796_McLean_COUNTY': {
                    place_type: "COUNTY",
                    matched_ids: [22796],
                    place: "McLean",
                    parent: "KENTUCKY",
                    identifier: "22796_McLean_COUNTY"
                }
            }];

            // setup mock redux actions for handling search results
            const mockReduxAction = jest.fn((args) => {
                expect(args).toEqual(reduxState);
            });

            // Set up the Container and call the function to type a single letter
            const recipientLocationContainer = setup({
                reduxFilters: initialFilters,
                setAutocompleteRecipientLocations: mockReduxAction,
                autocompleteRecipientLocations: reduxState,
                selectedRecipientLocations: new OrderedMap()
            });

            // Mock the search helper to resolve with the mocked response
            mockSearchHelper('fetchLocations', 'resolve', apiResponse);

            // Run fake timer for input delay
            jest.useFakeTimers().runTimersToTime(10000);

            // Run all ticks
            jest.runAllTicks();

            // Set up spies
            const queryAutocompleteRecipientLocationsSpy =
                sinon.spy(recipientLocationContainer.instance(),
                    'queryAutocompleteRecipientLocations');
            const parseAutocompleteRecipientLocationsSpy = sinon
                .spy(recipientLocationContainer.instance(),
                'parseAutocompleteRecipientLocations');

            recipientLocationContainer.instance().queryAutocompleteRecipientLocations('Booz Allen');

            // Run all ticks
            jest.runAllTicks();

            expect(queryAutocompleteRecipientLocationsSpy.callCount).toEqual(1);
            expect(parseAutocompleteRecipientLocationsSpy
                .calledWith(queryAutocompleteRecipientLocationsSpy));
            expect(mockReduxAction).toHaveBeenCalled();

            // Reset the mock
            unmockSearchHelper();

            // Reset spies
            queryAutocompleteRecipientLocationsSpy.reset();
            parseAutocompleteRecipientLocationsSpy.reset();
        });
    });
});
