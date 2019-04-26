/**
 * PricingTypeContainer-test.jsx
 * Created by Emily Gullo on 06/27/2017
 */

import React from 'react';
import { shallow } from 'enzyme';
import { Set } from 'immutable';

import { PricingTypeContainer }
    from 'containers/search/filters/PricingTypeContainer';

const initialFilters = {
    pricingType: new Set(),
    appliedPricing: new Set()
};

describe('PricingTypeContainer', () => {
    describe('Handle adding and removing pricing type items', () => {
        it('should add a predefined pricing type that has been selected to Redux', () => {
            const mockReduxAction = jest.fn((args) => {
                expect(args).toEqual('B');
            });

            // Set up container with mocked Pricing Type action
            const pricingTypeContainer = shallow(
                <PricingTypeContainer
                    {...initialFilters}
                    updatePricingType={mockReduxAction} />);

            // Add Select Pricing to redux
            pricingTypeContainer.instance().selectPricingType('B');

            // everything should be updated now
            expect(mockReduxAction).toHaveBeenCalledTimes(1);
            expect(mockReduxAction).toHaveBeenCalledWith('B');
        });
    });
    describe('dirtyFilters', () => {
        it('should return an ES6 Symbol when the staged filters do not match with the applied filters', () => {
            const container = shallow(
                <PricingTypeContainer
                    {...initialFilters}
                    updatePricingType={jest.fn()} />
            );

            container.setProps({
                pricingType: new Set(['a'])
            });

            const changed = container.instance().dirtyFilters();
            expect(changed).toBeTruthy();
            expect(typeof changed).toEqual('symbol');
        });
        it('should return null when the staged filters match with the applied filters', () => {
            const container = shallow(
                <PricingTypeContainer
                    {...initialFilters}
                    updatePricingType={jest.fn()} />
            );

            const changed = container.instance().dirtyFilters();
            expect(changed).toBeFalsy();
        });
    });
});
