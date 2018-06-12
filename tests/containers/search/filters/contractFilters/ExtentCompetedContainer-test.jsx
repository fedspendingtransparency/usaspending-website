/**
 * ExtentCompetedContainer-test.jsx
 * Created by Emily Gullo on 06/27/2017
 */

import React from 'react';
import { shallow } from 'enzyme';
import { Set } from 'immutable';

import { ExtentCompetedContainer }
    from 'containers/search/filters/ExtentCompetedContainer';

const initialFilters = {
    extentCompeted: new Set(),
    appliedEC: new Set()
};

describe('ExtentCompetedContainer', () => {
    describe('Handle adding and removing extent competed items', () => {
        it('should add a predefined extent competed that has been selected to Redux', () => {
            const mockReduxAction = jest.fn((args) => {
                expect(args).toEqual('F');
            });

            // Set up container with mocked Extent Competed action
            const extentCompetedContainer = shallow(
                <ExtentCompetedContainer
                    {...initialFilters}
                    updateExtentCompeted={mockReduxAction} />);

            // Add Select Pricing to redux
            extentCompetedContainer.instance().selectExtentCompeted('F');

            // everything should be updated now
            expect(mockReduxAction).toHaveBeenCalledTimes(1);
            expect(mockReduxAction).toHaveBeenCalledWith('F');
        });
    });
    describe('dirtyFilters', () => {
        it('should return an ES6 Symbol when the staged filters do not match with the applied filters', () => {
            const container = shallow(
                <ExtentCompetedContainer
                    {...initialFilters}
                    updateExtentCompeted={jest.fn()} />
            );

            container.setProps({
                extentCompeted: new Set(['a'])
            });

            const changed = container.instance().dirtyFilters();
            expect(changed).toBeTruthy();
            expect(typeof changed).toEqual('symbol');
        });
        it('should return null when the staged filters match with the applied filters', () => {
            const container = shallow(
                <ExtentCompetedContainer
                    {...initialFilters}
                    updateExtentCompeted={jest.fn()} />
            );

            const changed = container.instance().dirtyFilters();
            expect(changed).toBeFalsy();
        });
    });
});
