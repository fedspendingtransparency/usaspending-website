/**
 * RecipientNameDUNSContainer-test.jsx
 * Created by michaelbray on 2/17/17.
 */

import React from 'react';
import { mount } from 'enzyme';
import sinon from 'sinon';
import { OrderedMap } from 'immutable';

import { RecipientNameDUNSContainer } from
    'containers/search/filters/recipient/RecipientNameDUNSContainer';

const setup = (props) => mount(<RecipientNameDUNSContainer {...props} />);

jest.mock('helpers/searchHelper', () => require('../searchHelper'));
jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;

describe('RecipientNameDUNSContainer', () => {
    describe('Handling text input', () => {
        it('should handle text input after 300ms', () => {
            // Set up the Container and call the function to type a single letter
            const recipientNameDUNSContainer = setup({
                setAutocompleteRecipients: jest.fn(),
                toggleRecipient: jest.fn(),
                selectedRecipients: new OrderedMap(),
                autocompleteRecipients: []
            });

            const searchQuery = {
                target: {
                    value: 'B'
                }
            };

            const handleTextInputSpy = sinon.spy(recipientNameDUNSContainer.instance(),
                'handleTextInput');

            // Call handleTextInput function
            recipientNameDUNSContainer.instance().handleTextInput(searchQuery);

            // Run fake timer for input delay
            jest.useFakeTimers().runTimersToTime(1000);

            // the mocked SearchHelper waits 1 tick to resolve the promise, so wait for the tick
            jest.runAllTicks();

            // everything should be updated now
            expect(handleTextInputSpy.callCount).toEqual(1);

            // reset the spies
            handleTextInputSpy.reset();
        });

        it('should call the queryAutocompleteRecipients method 300ms ' +
            'after text input', () => {
            // Set up the Container and call the function to type a single letter
            const recipientNameDUNSContainer = setup({
                setAutocompleteRecipients: jest.fn(),
                toggleRecipient: jest.fn(),
                selectedRecipients: new OrderedMap(),
                autocompleteRecipients: []
            });
            const searchQuery = {
                target: {
                    value: 'B'
                }
            };

            const handleTextInputSpy = sinon.spy(recipientNameDUNSContainer.instance(),
                'handleTextInput');
            const queryAutocompleteRecipientsSpy = sinon.spy(recipientNameDUNSContainer.instance(),
                'queryAutocompleteRecipients');

            // Call handleTextInput function
            recipientNameDUNSContainer.instance().handleTextInput(searchQuery);

            // Run fake timer for input delay
            jest.useFakeTimers().runTimersToTime(1000);

            // the mocked SearchHelper waits 1 tick to resolve the promise, so wait for the tick
            jest.runAllTicks();

            // everything should be updated now
            expect(handleTextInputSpy.callCount).toEqual(1);
            expect(queryAutocompleteRecipientsSpy.callCount).toEqual(1);

            // reset the spies
            handleTextInputSpy.reset();
            queryAutocompleteRecipientsSpy.reset();
        });

        it('should not search when only two characters have been input', () => {
            const mockParseApi = jest.fn();

            // Set up the Container and call the function to type a single letter
            const recipientNameDUNSContainer = setup({
                setAutocompleteRecipients: jest.fn(),
                toggleRecipient: jest.fn(),
                selectedRecipients: new OrderedMap(),
                autocompleteRecipients: []
            });

            const queryAutocompleteRecipientsSpy = sinon.spy(recipientNameDUNSContainer.instance(),
                'queryAutocompleteRecipients');
            const handleTextInputSpy = sinon.spy(recipientNameDUNSContainer.instance(),
                'handleTextInput');

            const searchQuery = {
                target: {
                    value: 'Bo'
                }
            };

            recipientNameDUNSContainer.instance().parseApiResponse = mockParseApi;

            recipientNameDUNSContainer.instance().handleTextInput(searchQuery);

            // Run fake timer for input delay
            jest.useFakeTimers().runTimersToTime(1000);

            // everything should be updated now
            expect(handleTextInputSpy.callCount).toEqual(1);
            expect(queryAutocompleteRecipientsSpy.callCount).toEqual(1);
            expect(mockParseApi).toHaveBeenCalledTimes(0);
            expect(recipientNameDUNSContainer.instance().recipientSearchRequest).toBeFalsy();

            // reset the mocks and spies
            handleTextInputSpy.reset();
            queryAutocompleteRecipientsSpy.reset();
        });

        it('should search when three or more characters have been input ' +
            'into the Recipient Name/DUNS field', () => {
            // setup mock redux actions for handling search results
            const mockReduxAction = jest.fn();

            // Set up the Container and call the function to type a single letter
            const recipientNameDUNSContainer = setup({
                setAutocompleteRecipients: mockReduxAction,
                toggleRecipient: jest.fn(),
                selectedRecipients: new OrderedMap(),
                autocompleteRecipients: []
            });

            // set up spies
            const handleTextInputSpy = sinon.spy(recipientNameDUNSContainer.instance(),
                'handleTextInput');
            const queryAutocompleteRecipientsSpy = sinon.spy(recipientNameDUNSContainer.instance(),
                'queryAutocompleteRecipients');

            const searchQuery = {
                target: {
                    value: 'Boo'
                }
            };
            recipientNameDUNSContainer.instance().handleTextInput(searchQuery);

            // Run fake timer for input delay
            jest.useFakeTimers().runTimersToTime(300);

            // Run fake timer for input delay
            jest.runAllTicks();

            // everything should be updated now
            expect(handleTextInputSpy.callCount).toEqual(1);
            expect(queryAutocompleteRecipientsSpy.calledWith(handleTextInputSpy));

            // Reset spies
            handleTextInputSpy.reset();
            queryAutocompleteRecipientsSpy.reset();
        });

        it('should populate Recipients after performing the search', async () => {
            // setup mock redux actions for handling search results
            const mockReduxAction = jest.fn();

            // Set up the Container and call the function to type a single letter
            const recipientNameDUNSContainer = setup({
                setAutocompleteRecipients: mockReduxAction,
                toggleRecipient: jest.fn(),
                autocompleteRecipients: [],
                selectedRecipients: new OrderedMap()
            });

            // Set up spies
            const queryAutocompleteRecipientsSpy = sinon.spy(recipientNameDUNSContainer.instance(),
                'queryAutocompleteRecipients');

            recipientNameDUNSContainer.instance().queryAutocompleteRecipients('Booz Allen');
            await recipientNameDUNSContainer.instance().recipientSearchRequest.promise;

            expect(queryAutocompleteRecipientsSpy.callCount).toEqual(1);
            expect(mockReduxAction).toHaveBeenCalledTimes(1);

            // Reset spies
            queryAutocompleteRecipientsSpy.reset();
        });

        it('should not populate Recipients when searching a Recipient that has already been ' +
            'searched and selected', async () => {
            // setup mock redux actions for handling search results
            const mockReduxAction = jest.fn();

            // Set up the Container and call the function to type a single letter
            const recipientNameDUNSContainer = setup({
                setAutocompleteRecipients: mockReduxAction,
                toggleRecipient: jest.fn(),
                autocompleteRecipients: [],
                selectedRecipients: new OrderedMap({
                    "Booz Allen": {
                        search_text: "Booz Allen",
                        recipient_id_list: [
                            2232,
                            2260
                        ]
                    }
                })
            });

            // Set up spies
            const queryAutocompleteRecipientsSpy = sinon.spy(recipientNameDUNSContainer.instance(),
                'queryAutocompleteRecipients');

            recipientNameDUNSContainer.instance().queryAutocompleteRecipients('Booz Allen');
            await recipientNameDUNSContainer.instance().recipientSearchRequest.promise;

            expect(queryAutocompleteRecipientsSpy.callCount).toEqual(1);
            expect(mockReduxAction).toHaveBeenCalledTimes(0);

            // Reset spies
            queryAutocompleteRecipientsSpy.reset();
        });
    });
});
