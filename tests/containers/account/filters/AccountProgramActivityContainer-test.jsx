/**
 * AccountProgramActivityContainer-test.jsx
 * Created by michaelbray on 4/19/17.
 */

import React from 'react';
import { shallow } from 'enzyme';
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

describe('AccountProgramActivityContainer', () => {
    describe('updateFilter', () => {
        it('should add a Program Activity that has been selected to Redux', () => {
            const mockReduxAction = jest.fn((args) => {
                expect(args).toEqual('810');
            });

            // Set up container with mocked Program Activity action
            const accountProgramActivityContainer = shallow(
                <AccountProgramActivityContainer
                    reduxFilters={initialFilters}
                    toggleProgramActivity={mockReduxAction}
                    account={account} />);

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

        it('should should a Program Activity that has been deselected from Redux', () => {
            const mockReduxAction = jest.fn((args) => {
                expect(args).toEqual('810');
            });

            // Set up container with mocked Program Activity action
            const accountProgramActivityContainer = shallow(
                <AccountProgramActivityContainer
                    reduxFilters={initialFilters}
                    toggleProgramActivity={mockReduxAction}
                    account={account} />);

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
        it('should fetch program activities on load', () => {
            jest.useFakeTimers();

            const container = shallow(<AccountProgramActivityContainer
                {...initialFilters} />);

            // set up spy
            const populateProgramActivitiesSpy = sinon.spy(
                container.instance(), 'populateProgramActivities');

            container.instance().componentWillMount();

            // Run fake timer for input delay
            jest.runAllTicks();

            // everything should be updated now
            expect(populateProgramActivitiesSpy.callCount).toEqual(1);

            // Reset spy
            populateProgramActivitiesSpy.reset();
        });
    });

    describe('parseResultData', () => {
        it('should parse retrieved program activities', () => {
            jest.useFakeTimers();

            const container = shallow(<AccountProgramActivityContainer
                {...initialFilters} />);

            // set up spy
            const populateProgramActivitiesSpy = sinon.spy(
                container.instance(), 'populateProgramActivities');
            const parseResultDataSpy = sinon.spy(
                container.instance(), 'parseResultData');

            container.instance().populateProgramActivities();

            // Run fake timer for input delay
            jest.runAllTicks();

            // everything should be updated now
            expect(populateProgramActivitiesSpy.callCount).toEqual(1);
            expect(parseResultDataSpy.calledWith(populateProgramActivitiesSpy));

            // Reset spy
            populateProgramActivitiesSpy.reset();
        });
    });
});
