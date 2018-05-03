/**
 * AwardIDSearchContainer-test.jsx
 * Created by michaelbray on 3/7/17.
 */

import React from 'react';
import { shallow } from 'enzyme';
import { OrderedMap } from 'immutable';

import { AwardIDSearchContainer } from 'containers/search/filters/awardID/AwardIDSearchContainer';

const initialFilters = {
    selectedAwardIDs: new OrderedMap(),
    appliedAwardIDs: new OrderedMap()
};

const awardID = '1234';

describe('AwardIDSearchContainer', () => {
    describe('Handling adding and removing award IDs', () => {
        it('should add an Award ID that has been selected to Redux', () => {
            const mockReduxAction = jest.fn();

            // Set up container with mocked award ID action
            const awardIDSearchContainer = shallow(
                <AwardIDSearchContainer
                    {...initialFilters}
                    updateGenericFilter={mockReduxAction} />);

            // Add Award ID to redux
            awardIDSearchContainer.instance().toggleAwardID(awardID);

            // everything should be updated now
            expect(mockReduxAction).toHaveBeenCalledTimes(1);
            const reduxArgs = mockReduxAction.mock.calls[0][0];
            expect(reduxArgs).toEqual({
                type: 'selectedAwardIDs',
                value: new OrderedMap({
                    '1234': '1234'
                })
            });
        });

        it('should remove an Award ID that has been deselected from Redux', () => {
            const mockReduxAction = jest.fn();

            const appliedFilters = {
                selectedAwardIDs: new OrderedMap({
                    '1234': '1234'
                })
            };

            // Set up container with mocked award ID action
            const awardIDSearchContainer = shallow(
                <AwardIDSearchContainer
                    {...appliedFilters}
                    updateGenericFilter={mockReduxAction} />);

            // remove Award ID to redux
            awardIDSearchContainer.instance().toggleAwardID(awardID);

            // everything should be updated now
            expect(mockReduxAction).toHaveBeenCalledTimes(1);
            expect(mockReduxAction).toHaveBeenCalledWith({
                type: 'selectedAwardIDs',
                value: new OrderedMap()
            });
        });

        it('should not overwrite any existing Award ID in Redux', () => {
            const mockReduxAction = jest.fn();

            const appliedFilters = {
                selectedAwardIDs: new OrderedMap({
                    '1234': '1234'
                })
            };

            // Set up container with mocked award ID action
            const awardIDSearchContainer = shallow(
                <AwardIDSearchContainer
                    {...appliedFilters}
                    updateGenericFilter={mockReduxAction} />);

            // remove Award ID to redux
            awardIDSearchContainer.instance().toggleAwardID('5555');

            // everything should be updated now
            expect(mockReduxAction).toHaveBeenCalledTimes(1);
            expect(mockReduxAction).toHaveBeenCalledTimes(1);
            const reduxArgs = mockReduxAction.mock.calls[0][0];
            expect(reduxArgs).toEqual({
                type: 'selectedAwardIDs',
                value: new OrderedMap({
                    '1234': '1234',
                    '5555': '5555'
                })
            });
        });
    });
    describe('dirtyFilters', () => {
        it('should return an ES6 Symbol when the staged filters do not match with the applied filters', () => {
            const container = shallow(
                <AwardIDSearchContainer
                    {...initialFilters}
                    updateGenericFilter={jest.fn()} />
            );

            container.setProps({
                selectedAwardIDs: new OrderedMap({ a: 'a' })
            });

            const changed = container.instance().dirtyFilters();
            expect(changed).toBeTruthy();
            expect(typeof changed).toEqual('symbol');
        });
        it('should return null when the staged filters match with the applied filters', () => {
            const container = shallow(
                <AwardIDSearchContainer
                    {...initialFilters}
                    updateGenericFilter={jest.fn()} />
            );

            const changed = container.instance().dirtyFilters();
            expect(changed).toBeFalsy();
        });
    });
});
