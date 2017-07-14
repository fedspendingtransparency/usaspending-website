/**
 * RecipientLocationContainer-test.jsx
 * Created by michaelbray on 2/17/17.
 */

jest.mock('helpers/searchHelper', () => {
    const helper = require('./mocks/searchHelper');
    return helper;
});

import React from 'react';
import { mount } from 'enzyme';
import sinon from 'sinon';
import { OrderedMap } from 'immutable';

import { RecipientLocationContainer } from
    'containers/search/filters/recipient/RecipientLocationContainer';

import * as recipientActions from 'redux/actions/search/recipientActions';

const setup = (props) => mount(<RecipientLocationContainer {...props} />);

const initialFilters = {
    autocompleteRecipientLocations: []
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
                autocompleteRecipientLocations: [],
                toggleRecipientLocation: jest.fn()
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
                autocompleteRecipientLocations: [],
                toggleRecipientLocation: jest.fn()
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
                autocompleteRecipientLocations: [],
                toggleRecipientLocation: jest.fn()
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
                autocompleteRecipientLocations: [],
                toggleRecipientLocation: jest.fn()
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

        it('should populate Recipients after performing the search', async () => {
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
            const mockReduxAction = jest.fn();

            // Set up the Container and call the function to type a single letter
            const recipientLocationContainer = setup({
                reduxFilters: initialFilters,
                setAutocompleteRecipientLocations: mockReduxAction,
                autocompleteRecipientLocations: reduxState,
                selectedRecipientLocations: new OrderedMap(),
                toggleRecipientLocation: jest.fn()
            });

            // Set up spies
            const queryAutocompleteRecipientLocationsSpy =
                sinon.spy(recipientLocationContainer.instance(),
                    'queryAutocompleteRecipientLocations');

            recipientLocationContainer.instance().queryAutocompleteRecipientLocations('Booz Allen');
            await recipientLocationContainer.instance().recipientLocationSearchRequest.promise;

            expect(queryAutocompleteRecipientLocationsSpy.callCount).toEqual(1);
            expect(mockReduxAction).toBeCalled();

            // Reset spies
            queryAutocompleteRecipientLocationsSpy.reset();
        });
    });
});
