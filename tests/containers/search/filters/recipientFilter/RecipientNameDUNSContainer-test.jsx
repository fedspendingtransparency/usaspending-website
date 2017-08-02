/**
 * RecipientNameDUNSContainer-test.jsx
 * Created by michaelbray on 2/17/17.
 */

import React from 'react';
import { mount, shallow } from 'enzyme';
import sinon from 'sinon';
import { OrderedMap } from 'immutable';

import { RecipientNameDUNSContainer } from
    'containers/search/filters/recipient/RecipientNameDUNSContainer';

import { mockAutocompleteRedux, expectedAutocomplete } from './mockRecipients';

const setup = (props) => mount(<RecipientNameDUNSContainer {...props} />);
const setupShallow = (props) => shallow(<RecipientNameDUNSContainer {...props} />);

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

        it('should not search when only one character has been input', () => {
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
                    value: 'B'
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

        it('should search when more than one character has been input ' +
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
                    value: 'Booz Allen'
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
            const parseAutocompleteRecipientsSpy = sinon.spy(recipientNameDUNSContainer.instance(),
                'parseAutocompleteRecipients');

            recipientNameDUNSContainer.instance().queryAutocompleteRecipients('Booz Allen');
            await recipientNameDUNSContainer.instance().recipientSearchRequest.promise;


            expect(queryAutocompleteRecipientsSpy.callCount).toEqual(1);
            expect(parseAutocompleteRecipientsSpy.calledWith(queryAutocompleteRecipientsSpy));
            expect(mockReduxAction).toHaveBeenCalledTimes(1);

            // Reset spies
            queryAutocompleteRecipientsSpy.reset();
            parseAutocompleteRecipientsSpy.reset();
        });
    });

    describe('parseAutocompleteRecipients', () => {
        it('should display the parent DUNS when available', () => {
            const container = setupShallow({
                setAutocompleteRecipients: jest.fn(),
                toggleRecipient: jest.fn(),
                selectedRecipients: new OrderedMap(),
                autocompleteRecipients: []
            });

            container.instance().parseAutocompleteRecipients([mockAutocompleteRedux[0]]);

            expect(container.state().autocompleteRecipients[0]).toEqual(expectedAutocomplete[0]);
        });
        it('should display the recipient DUNS when there is no parent DUNS', () => {
            const container = setupShallow({
                setAutocompleteRecipients: jest.fn(),
                toggleRecipient: jest.fn(),
                selectedRecipients: new OrderedMap(),
                autocompleteRecipients: []
            });

            container.instance().parseAutocompleteRecipients([mockAutocompleteRedux[1]]);

            expect(container.state().autocompleteRecipients[0]).toEqual(expectedAutocomplete[1]);
        });
    });

    describe('parseResults', () => {
        it('should put parent recipient results at the front of the array', () => {
            const mockRedux = jest.fn();

            const container = setupShallow({
                setAutocompleteRecipients: mockRedux,
                toggleRecipient: jest.fn(),
                selectedRecipients: new OrderedMap(),
                autocompleteRecipients: []
            });

            const parent = [1, 2];
            const normal = [3, 4];

            container.instance().parseResults(parent, normal);

            expect(mockRedux).toHaveBeenCalledTimes(1);
            expect(mockRedux.mock.calls[0][0]).toEqual([1, 2, 3, 4]);
        });
        it('should remove already selected recipients from the array', () => {
            const mockRedux = jest.fn();

            const container = setupShallow({
                setAutocompleteRecipients: mockRedux,
                toggleRecipient: jest.fn(),
                selectedRecipients: new OrderedMap({
                    1111: {
                        legal_entity_id: 1111,
                        recipient_name: "MEGA CONGLOMERATE CORP",
                        parent_recipient_unique_id: "001122334"
                    }
                }),
                autocompleteRecipients: []
            });

            const parent = [
                {
                    legal_entity_id: 1111,
                    recipient_name: "MEGA CONGLOMERATE CORP",
                    parent_recipient_unique_id: "001122334"
                }
            ];

            container.instance().parseResults(parent, []);

            expect(mockRedux).toHaveBeenCalledTimes(1);
            expect(mockRedux.mock.calls[0][0]).toEqual([]);
        });
    });
});
