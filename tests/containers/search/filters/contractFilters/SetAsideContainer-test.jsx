/**
 * SetAsideContainer-test.jsx
 * Created by Emily Gullo on 06/27/2017
 */

import React from 'react';
import { shallow } from 'enzyme';
import { Set } from 'immutable';

import { SetAsideContainer }
    from 'containers/search/filters/SetAsideContainer';

const initialFilters = {
    setAside: new Set(),
    appliedSetAside: new Set()
};

describe('SetAsideContainer', () => {
    describe('Handle adding and removing set aside items', () => {
        it('should add a predefined set aside that has been selected to Redux', () => {
            const mockReduxAction = jest.fn((args) => {
                expect(args).toEqual('8AN');
            });

            // Set up container with mocked Set Aside action
            const setAsideContainer = shallow(
                <SetAsideContainer
                    {...initialFilters}
                    updateSetAside={mockReduxAction} />);

            // Add Select Pricing to redux
            setAsideContainer.instance().selectSetAside('8AN');

            // everything should be updated now
            expect(mockReduxAction).toHaveBeenCalledTimes(1);
            expect(mockReduxAction).toHaveBeenCalledWith('8AN');
        });
    });
    describe('dirtyFilters', () => {
        it('should return an ES6 Symbol when the staged filters do not match with the applied filters', () => {
            const container = shallow(
                <SetAsideContainer
                    {...initialFilters}
                    updateSetAside={jest.fn()} />
            );

            container.setProps({
                setAside: new Set(['a'])
            });

            const changed = container.instance().dirtyFilters();
            expect(changed).toBeTruthy();
            expect(typeof changed).toEqual('symbol');
        });
        it('should return null when the staged filters match with the applied filters', () => {
            const container = shallow(
                <SetAsideContainer
                    {...initialFilters}
                    updateSetAside={jest.fn()} />
            );

            const changed = container.instance().dirtyFilters();
            expect(changed).toBeFalsy();
        });
    });
});
