/**
 * RecipienSearchContainer-test.jsx
 * Created by michaelbray on 2/17/17.
 */

import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';

import { RecipientSearchContainer } from
    'containers/search/filters/recipient/RecipientSearchContainer';

const initialFilters = {
    selectedRecipients: {},
    recipientDomesticForeign: 'all',
    selectedRecipientLocations: {},
    recipientType: {}
};

const recipient = {
    search_text: "Booz Allen",
    recipient_id_list: [
        2232,
        2260
    ]
};

const location = {
    place_type: "CITY",
    matched_ids: [43315],
    place: "MCLEANSBORO",
    parent: null
};

describe('RecipientSearchContainer', () => {
    describe('Handling adding and removing recipients', () => {
        it('should add a Recipient that has been selected to Redux', () => {
            const mockReduxAction = jest.fn((args) => {
                expect(args).toEqual({
                    search_text: "Booz Allen",
                    recipient_id_list: [
                        2232,
                        2260
                    ]
                });
            });

            // Set up container with mocked action
            const recipientSearchContainer = shallow(
                <RecipientSearchContainer
                    reduxFilters={initialFilters}
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
                expect(args).toEqual({
                    search_text: "Booz Allen",
                    recipient_id_list: [
                        2232,
                        2260
                    ]
                });
            });

            // Set up container with mocked action
            const recipientSearchContainer = shallow(
                <RecipientSearchContainer
                    reduxFilters={initialFilters}
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

    describe('Handling toggling location type', () => {
        it('should toggle the Show Only selection in Redux', () => {
            const mockReduxAction = jest.fn((args) => {
                expect(args).toEqual('all');
            });

            // Set up container with mocked action
            const recipientSearchContainer = shallow(
                <RecipientSearchContainer
                    reduxFilters={initialFilters}
                    updateRecipientDomesticForeignSelection={mockReduxAction} />);

            const toggleDomesticForeignSpy = sinon.spy(recipientSearchContainer.instance(),
                'toggleDomesticForeign');

            // Add Show Only selection to Redux
            recipientSearchContainer.instance().toggleDomesticForeign({
                target: {
                    value: 'all'
                }
            });

            // Everything should be updated now
            expect(toggleDomesticForeignSpy.callCount).toEqual(1);
            expect(mockReduxAction).toHaveBeenCalled();

            // Reset the spy
            toggleDomesticForeignSpy.reset();
        });
    });

    describe('Handling adding and removing recipient locations', () => {
        it('should add a Recipient Location that has been selected to Redux', () => {
            const mockReduxAction = jest.fn((args) => {
                expect(args).toEqual({
                    place_type: "CITY",
                    matched_ids: [43315],
                    place: "MCLEANSBORO",
                    parent: null
                });
            });

            // Set up container with mocked action
            const recipientSearchContainer = shallow(
                <RecipientSearchContainer
                    reduxFilters={initialFilters}
                    updateRecipientLocations={mockReduxAction} />);

            const toggleRecipientLocationSpy = sinon.spy(recipientSearchContainer.instance(),
                'toggleRecipientLocation');

            // Add Recipient Location to Redux
            recipientSearchContainer.instance().toggleRecipientLocation(location);

            // Everything should be updated now
            expect(toggleRecipientLocationSpy.callCount).toEqual(1);
            expect(mockReduxAction).toHaveBeenCalled();

            // Reset the spy
            toggleRecipientLocationSpy.reset();
        });

        it('should remove a Recipient Location that has been deselected from Redux', () => {
            const mockReduxAction = jest.fn((args) => {
                expect(args).toEqual({
                    place_type: "CITY",
                    matched_ids: [43315],
                    place: "MCLEANSBORO",
                    parent: null
                });
            });

            // Set up container with mocked action
            const recipientSearchContainer = shallow(
                <RecipientSearchContainer
                    reduxFilters={initialFilters}
                    updateRecipientLocations={mockReduxAction} />);

            const toggleRecipientLocationSpy = sinon.spy(recipientSearchContainer.instance(),
                'toggleRecipientLocation');

            // Add Recipient Location to Redux
            recipientSearchContainer.instance().toggleRecipientLocation(location);

            // Remove Recipient Location from Redux
            recipientSearchContainer.instance().toggleRecipientLocation(location);

            // Everything should be updated now
            expect(toggleRecipientLocationSpy.callCount).toEqual(2);
            expect(mockReduxAction).toHaveBeenCalledTimes(2);

            // Reset the spy
            toggleRecipientLocationSpy.reset();
        });
    });

    describe('Handling adding and removing recipient types', () => {
        it('should add a Recipient Type that has been selected to Redux', () => {
            const mockReduxAction = jest.fn((args) => {
                expect(args).toEqual('small_business');
            });

            // Set up container with mocked Program Activity action
            const recipientSearchContainer = shallow(
                <RecipientSearchContainer
                    reduxFilters={initialFilters}
                    toggleRecipientType={mockReduxAction} />);

            const toggleRecipientTypeSpy = sinon.spy(recipientSearchContainer.instance(),
                'toggleRecipientType');

            // Add Recipient Type to redux
            recipientSearchContainer.instance().toggleRecipientType('small_business');

            // everything should be updated now
            expect(toggleRecipientTypeSpy.callCount).toEqual(1);
            expect(mockReduxAction).toHaveBeenCalled();

            // reset the spy
            toggleRecipientTypeSpy.reset();
        });

        it('should remove a Recipient Type that has been deselected from Redux', () => {
            const mockReduxAction = jest.fn((args) => {
                expect(args).toEqual('small_business');
            });

            // Set up container with mocked Program Activity action
            const recipientSearchContainer = shallow(
                <RecipientSearchContainer
                    reduxFilters={initialFilters}
                    toggleRecipientType={mockReduxAction} />);

            const toggleRecipientTypeSpy = sinon.spy(recipientSearchContainer.instance(),
                'toggleRecipientType');

            // Add Recipient Type to redux
            recipientSearchContainer.instance().toggleRecipientType('small_business');

            // Remove Recipient Type from redux
            recipientSearchContainer.instance().toggleRecipientType('small_business');

            // everything should be updated now
            expect(toggleRecipientTypeSpy.callCount).toEqual(2);
            expect(mockReduxAction).toHaveBeenCalledTimes(2);

            // reset the spy
            toggleRecipientTypeSpy.reset();
        });

        it('should add bulk Recipient Types that has been selected to Redux', () => {
            const mockReduxAction = jest.fn((args) => {
                expect(args).toEqual({
                    recipientTypes: [
                        'small_business',
                        'other_than_small_business'
                    ],
                    direction: 'add'
                });
            });

            // Set up container with mocked Program Activity action
            const recipientSearchContainer = shallow(
                <RecipientSearchContainer
                    reduxFilters={initialFilters}
                    bulkRecipientTypeChange={mockReduxAction} />);

            const bulkRecipientTypeChangeSpy = sinon.spy(recipientSearchContainer.instance(),
                'bulkRecipientTypeChange');

            // Add Recipient Type to redux
            recipientSearchContainer.instance().bulkRecipientTypeChange({
                recipientTypes: [
                    'small_business',
                    'other_than_small_business'
                ],
                direction: 'add'
            });

            // everything should be updated now
            expect(bulkRecipientTypeChangeSpy.callCount).toEqual(1);
            expect(mockReduxAction).toHaveBeenCalled();

            // reset the spy
            bulkRecipientTypeChangeSpy.reset();
        });

        it('should remove bulk Recipient Types that has been deselected from Redux', () => {
            const mockReduxAction = jest.fn((args) => {
                expect(args).toEqual({
                    recipientTypes: [
                        'small_business',
                        'other_than_small_business'
                    ],
                    direction: 'remove'
                });
            });

            // Set up container with mocked Program Activity action
            const recipientSearchContainer = shallow(
                <RecipientSearchContainer
                    reduxFilters={initialFilters}
                    bulkRecipientTypeChange={mockReduxAction} />);

            const bulkRecipientTypeChangeSpy = sinon.spy(recipientSearchContainer.instance(),
                'bulkRecipientTypeChange');

            // Remove a Bulk Recipient Type from redux
            recipientSearchContainer.instance().bulkRecipientTypeChange({
                recipientTypes: [
                    'small_business',
                    'other_than_small_business'
                ],
                direction: 'remove'
            });

            // everything should be updated now
            expect(bulkRecipientTypeChangeSpy.callCount).toEqual(1);
            expect(mockReduxAction).toHaveBeenCalledTimes(1);

            // reset the spy
            bulkRecipientTypeChangeSpy.reset();
        });
    });
});
