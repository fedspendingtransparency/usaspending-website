/**
 * AccountProgramActivityContainer-test.jsx
 * Created by michaelbray on 4/19/17.
 */

import React from 'react';
import { mount, shallow } from 'enzyme';
import sinon from 'sinon';
import { OrderedSet } from 'immutable';

import { AccountProgramActivityContainer } from
    'containers/account/filters/AccountProgramActivityContainer';

const initialFilters = {
    selectedProgramActivities: new OrderedSet(),
    availableProgramActivities: [],
    account: {
        id: 2525
    }
};

const account = {
    id: 2525
};

jest.mock('helpers/accountHelper', () => require('../accountHelper'));
jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;

describe('AccountProgramActivityContainer', () => {
    describe('updateFilter', () => {
        it('should add a Program Activity that has been selected to Redux', async () => {
            const mockReduxAction = jest.fn((args) => {
                expect(args).toEqual('810');
            });

            // Set up container with mocked Program Activity action
            const accountProgramActivityContainer = mount(
                <AccountProgramActivityContainer
                    reduxFilters={initialFilters}
                    toggleProgramActivity={mockReduxAction}
                    resetProgramActivity={jest.fn()}
                    setAvailableProgramActivities={jest.fn()}
                    account={account} />);

            await accountProgramActivityContainer.instance().searchRequest.promise;

            const updateFilterSpy = sinon.spy(accountProgramActivityContainer.instance(),
                'updateFilter');

            // Add Program Activity to redux
            accountProgramActivityContainer.instance().updateFilter('810');

            // everything should be updated now
            expect(updateFilterSpy.callCount).toEqual(1);
            expect(mockReduxAction).toHaveBeenCalled();

            // reset the spy
            updateFilterSpy.reset();
        });

        it('should remove a Program Activity that has been deselected from Redux', async () => {
            const mockReduxAction = jest.fn((args) => {
                expect(args).toEqual('810');
            });

            // Set up container with mocked Program Activity action
            const accountProgramActivityContainer = mount(
                <AccountProgramActivityContainer
                    reduxFilters={initialFilters}
                    toggleProgramActivity={mockReduxAction}
                    resetProgramActivity={jest.fn()}
                    setAvailableProgramActivities={jest.fn()}
                    account={account} />);

            await accountProgramActivityContainer.instance().searchRequest.promise;

            const updateFilterSpy = sinon.spy(accountProgramActivityContainer.instance(),
                'updateFilter');

            // Add Program Activity to redux
            accountProgramActivityContainer.instance().updateFilter('810');

            // Remove Program Activity from redux
            accountProgramActivityContainer.instance().updateFilter('810');

            // everything should be updated now
            expect(updateFilterSpy.callCount).toEqual(2);
            expect(mockReduxAction).toHaveBeenCalledTimes(2);

            // reset the spy
            updateFilterSpy.reset();
        });
    });

    describe('populateProgramActivities', () => {
        it('should fetch program activities on load', async () => {
            const accountProgramActivityContainer = mount(
                <AccountProgramActivityContainer
                    reduxFilters={initialFilters}
                    toggleProgramActivity={jest.fn()}
                    resetProgramActivity={jest.fn()}
                    setAvailableProgramActivities={jest.fn()}
                    account={account} />);

            // set up spy
            const populateProgramActivitiesSpy = sinon.spy(
                accountProgramActivityContainer.instance(), 'populateProgramActivities');

            accountProgramActivityContainer.instance().componentDidMount();

            await accountProgramActivityContainer.instance().searchRequest.promise;

            // everything should be updated now
            expect(populateProgramActivitiesSpy.callCount).toEqual(1);

            // Reset spy
            populateProgramActivitiesSpy.reset();
        });
    });

    describe('parseResultData', () => {
        it('should parse retrieved program activities', async () => {
            const accountProgramActivityContainer = shallow(
                <AccountProgramActivityContainer
                    reduxFilters={initialFilters}
                    toggleProgramActivity={jest.fn()}
                    resetProgramActivity={jest.fn()}
                    setAvailableProgramActivities={jest.fn()}
                    account={account} />);

            // set up spy
            const populateProgramActivitiesSpy = sinon.spy(
                accountProgramActivityContainer.instance(), 'populateProgramActivities');
            const parseResultDataSpy = sinon.spy(
                accountProgramActivityContainer.instance(), 'parseResultData');

            accountProgramActivityContainer.instance().populateProgramActivities();

            await accountProgramActivityContainer.instance().searchRequest.promise;

            // everything should be updated now
            expect(populateProgramActivitiesSpy.callCount).toEqual(1);
            expect(parseResultDataSpy.calledWith(populateProgramActivitiesSpy));

            // Reset spy
            populateProgramActivitiesSpy.reset();
        });
    });
});
