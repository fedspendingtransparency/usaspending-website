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
        it('should not search when two or fewer characters have been input', () => {
            const mockReduxAction = jest.fn();

            // Set up the Container and call the function to type a single letter
            const recipientNameDUNSContainer = setup({
                toggleRecipient: mockReduxAction, selectedRecipients: new OrderedMap()
            });

            const queryRecipientsSpy = sinon.spy(recipientNameDUNSContainer.instance(),
                'queryRecipients');
            const handleTextInputSpy = sinon.spy(recipientNameDUNSContainer.instance(),
                'handleTextInput');

            recipientNameDUNSContainer.instance().handleTextInput({
                target: {
                    value: 'Bo'
                }
            });

            // Run fake timer for input delay
            jest.runAllTicks();

            recipientNameDUNSContainer.instance().queryRecipients();

            // everything should be updated now
            expect(handleTextInputSpy.callCount).toEqual(1);
            expect(queryRecipientsSpy.callCount).toEqual(1);
            expect(mockReduxAction).toHaveBeenCalledTimes(0);
            expect(recipientNameDUNSContainer.instance().recipientSearchRequest).toBeFalsy();

            // reset the mocks and spies
            handleTextInputSpy.reset();
            queryRecipientsSpy.reset();
        });

        it('should search when three or more characters have been input ' +
            'into the Recipient Name/DUNS field', async () => {
            // setup mock redux actions for handling search results
            const mockReduxAction = jest.fn();

            // Set up the Container and call the function to type a single letter
            const recipientNameDUNSContainer = setup({
                toggleRecipient: mockReduxAction, selectedRecipients: new OrderedMap()
            });

            // set up spies
            const handleTextInputSpy = sinon.spy(recipientNameDUNSContainer.instance(),
                'handleTextInput');
            const queryRecipientsSpy = sinon.spy(recipientNameDUNSContainer.instance(),
                'queryRecipients');

            const searchQuery = {
                target: {
                    value: 'Booz Allen'
                }
            };

            recipientNameDUNSContainer.instance().handleTextInput(searchQuery);

            // Run fake timer for input delay
            jest.runAllTicks();

            recipientNameDUNSContainer.instance().queryRecipients();
            await recipientNameDUNSContainer.instance().recipientSearchRequest.promise;

            // everything should be updated now
            expect(handleTextInputSpy.callCount).toEqual(1);
            expect(queryRecipientsSpy.callCount).toEqual(1);
            expect(mockReduxAction).toHaveBeenCalledTimes(1);

            // Reset spies
            handleTextInputSpy.reset();
            queryRecipientsSpy.reset();
        });
    });

    describe('Adding a Recipient to Redux', () => {
        it('should automatically add a Recipient to Redux after parsing a valid response', async () => {
            // setup mock redux actions for handling search results
            const mockReduxAction = jest.fn();

            // Set up the Container and call the function to type a single letter
            const recipientNameDUNSContainer = setup({
                toggleRecipient: mockReduxAction,
                selectedRecipients: new OrderedMap()
            });

            // Set up spies
            const queryRecipientsSpy = sinon.spy(recipientNameDUNSContainer.instance(),
                'queryRecipients');

            recipientNameDUNSContainer.instance().handleTextInput({
                target: {
                    value: 'Booz Allen'
                }
            });

            // Run fake timer for input delay
            jest.runAllTicks();

            recipientNameDUNSContainer.instance().queryRecipients();
            await recipientNameDUNSContainer.instance().recipientSearchRequest.promise;

            expect(queryRecipientsSpy.callCount).toEqual(1);
            expect(mockReduxAction).toHaveBeenCalledTimes(1);

            // Reset spies
            queryRecipientsSpy.reset();
        });

        it('should not add a duplicate Recipient to Redux', async () => {
            // setup mock redux actions for handling search results
            const mockReduxAction = jest.fn();

            // Set up the Container and call the function to type a single letter
            const recipientNameDUNSContainer = setup({
                toggleRecipient: mockReduxAction,
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

            // Set up spy
            const queryRecipientsSpy = sinon.spy(recipientNameDUNSContainer.instance(),
                'queryRecipients');

            recipientNameDUNSContainer.instance().handleTextInput({
                target: {
                    value: 'Booz Allen'
                }
            });

            // Run fake timer for input delay
            jest.runAllTicks();

            recipientNameDUNSContainer.instance().queryRecipients();
            await recipientNameDUNSContainer.instance().recipientSearchRequest.promise;

            expect(queryRecipientsSpy.callCount).toEqual(1);
            expect(mockReduxAction).toHaveBeenCalledTimes(0);

            // Reset spy
            queryRecipientsSpy.reset();
        });
    });
});
