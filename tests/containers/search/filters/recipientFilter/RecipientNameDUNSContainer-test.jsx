/**
 * RecipientNameDUNSContainer-test.jsx
 * Created by michaelbray on 2/17/17.
 */

import React from 'react';
import { mount } from 'enzyme';
import sinon from 'sinon';
import { Set } from 'immutable';

import { RecipientNameDUNSContainer } from
    'containers/search/filters/recipient/RecipientNameDUNSContainer';

const setup = (props) => mount(<RecipientNameDUNSContainer {...props} />);

jest.mock('helpers/searchHelper', () => require('../searchHelper'));
jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;

describe('RecipientNameDUNSContainer', () => {
    describe('Adding a Recipient to Redux', () => {
        it('should not add a filter to Redux when two or fewer characters have been input', () => {
            const mockReduxAction = jest.fn();

            // Set up the Container and call the function to type fewer than three characters
            const recipientNameDUNSContainer = setup({
                toggleRecipient: mockReduxAction, selectedRecipients: new Set()
            });

            // set up spy
            const searchRecipientSpy = sinon.spy(recipientNameDUNSContainer.instance(),
                'searchRecipient');

            recipientNameDUNSContainer.instance().handleTextInput({
                target: {
                    value: 'Bo'
                }
            });

            // Run fake timer for input delay
            jest.runAllTicks();

            recipientNameDUNSContainer.instance().searchRecipient();

            // everything should be updated now
            expect(searchRecipientSpy.callCount).toEqual(1);
            expect(mockReduxAction).toHaveBeenCalledTimes(0);

            // reset the spy
            searchRecipientSpy.reset();
        });

        it('should add a filter to Redux when three or more characters have been input ' +
            'into the Recipient Name/DUNS field', () => {
            // setup mock redux action
            const mockReduxAction = jest.fn();

            // Set up the Container and call the function to type more than 2 characters
            const recipientNameDUNSContainer = setup({
                toggleRecipient: mockReduxAction, selectedRecipients: new Set()
            });

            // set up spy
            const searchRecipientSpy = sinon.spy(recipientNameDUNSContainer.instance(),
                'searchRecipient');

            const searchQuery = {
                target: {
                    value: 'Booz Allen'
                }
            };

            recipientNameDUNSContainer.instance().handleTextInput(searchQuery);

            // Run fake timer for input delay
            jest.runAllTicks();

            recipientNameDUNSContainer.instance().searchRecipient();

            // everything should be updated now
            expect(searchRecipientSpy.callCount).toEqual(1);
            expect(mockReduxAction).toHaveBeenCalledTimes(1);

            // Reset spy
            searchRecipientSpy.reset();
        });
        it('should not search for a Recipient that already exists in Redux', () => {
            // setup mock redux actions for handling search results
            const mockReduxAction = jest.fn();

            // Set up the Container and call the function to type a single letter
            const recipientNameDUNSContainer = setup({
                toggleRecipient: mockReduxAction,
                selectedRecipients: new Set(["Booz Allen"])
            });

            // set up spy
            const searchRecipientSpy = sinon.spy(recipientNameDUNSContainer.instance(),
                'searchRecipient');

            recipientNameDUNSContainer.instance().handleTextInput({
                target: {
                    value: 'Booz Allen'
                }
            });

            // Run fake timer for input delay
            jest.runAllTicks();

            recipientNameDUNSContainer.instance().searchRecipient();

            expect(searchRecipientSpy.callCount).toEqual(1);
            expect(mockReduxAction).toHaveBeenCalledTimes(0);

            // Reset spy
            searchRecipientSpy.reset();
        });
    });
});
