/**
 * RecipienSearchContainer-test.jsx
 * Created by michaelbray on 2/17/17.
 */

import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import { Set } from 'immutable'

import { RecipientSearchContainer } from
    'containers/search/filters/recipient/RecipientSearchContainer';

const initialFilters = {
    selectedRecipients: new Set([]),
    appliedRecipients: new Set([])
};

const recipient = "Booz Allen";


describe('RecipientSearchContainer', () => {
    describe('Handling adding and removing recipients', () => {
        it('should add a Recipient that has been selected to Redux', () => {
            const mockReduxAction = jest.fn((args) => {
                expect(args).toEqual("Booz Allen");
            });

            // Set up container with mocked action
            const recipientSearchContainer = shallow(
                <RecipientSearchContainer
                    {...initialFilters}
                    updateSelectedRecipients={mockReduxAction} />);

            const toggleRecipientSpy = sinon.spy(recipientSearchContainer.instance(),
                'toggleRecipient');

            // Add Recipient to redux
            recipientSearchContainer.instance().toggleRecipient(recipient);

            // Everything should be updated now
            expect(toggleRecipientSpy.callCount).toEqual(1);
            expect(mockReduxAction).toHaveBeenCalled();

            // Reset the spy
            toggleRecipientSpy.reset();
        });

        it('should remove a Recipient that has been deselected from Redux', () => {
            const mockReduxAction = jest.fn((args) => {
                expect(args).toEqual("Booz Allen");
            });

            // Set up container with mocked action
            const recipientSearchContainer = shallow(
                <RecipientSearchContainer
                    {...initialFilters}
                    updateSelectedRecipients={mockReduxAction} />);

            const toggleRecipientSpy = sinon.spy(recipientSearchContainer.instance(),
                'toggleRecipient');

            // Add Recipient to redux
            recipientSearchContainer.instance().toggleRecipient(recipient);

            // Remove Recipient from Redux
            recipientSearchContainer.instance().toggleRecipient(recipient);

            // Everything should be updated now
            expect(toggleRecipientSpy.callCount).toEqual(2);
            expect(mockReduxAction).toHaveBeenCalledTimes(2);

            // Reset the spy
            toggleRecipientSpy.reset();
        });
    });
    describe('dirtyFilters', () => {
        it('should return an ES6 Symbol when the staged filters do not match with the applied filters', () => {
            const container = shallow(
                <RecipientSearchContainer
                    appliedRecipients={new Set([])}
                    selectedRecipients={new Set(['a'])}
                    updateSelectedRecipients={jest.fn()} />
            );

            const changed = container.instance().dirtyFilters();
            expect(changed).toBeTruthy();
            expect(typeof changed).toEqual('symbol');
        });
        it('should return null when the staged filters match with the applied filters', () => {
            const container = shallow(
                <RecipientSearchContainer
                    appliedRecipients={new Set(['a'])}
                    selectedRecipients={new Set(['a'])}
                    updateSelectedRecipients={jest.fn()} />
            );

            const changed = container.instance().dirtyFilters();
            expect(changed).toBeFalsy();
        });
    });
});
