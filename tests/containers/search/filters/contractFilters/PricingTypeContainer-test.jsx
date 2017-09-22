/**
 * PricingTypeContainer-test.jsx
 * Created by Emily Gullo on 06/27/2017
 */

import React from 'react';
import { shallow } from 'enzyme';

import { PricingTypeContainer }
    from 'containers/search/filters/PricingTypeContainer';

describe('PricingTypeContainer', () => {
    describe('Handle adding and removing pricing type items', () => {
        it('should add a predefined pricing type that has been selected to Redux', () => {
            const mockReduxAction = jest.fn((args) => {
                expect(args).toEqual('B');
            });

            // Set up container with mocked Pricing Type action
            const pricingTypeContainer = shallow(
                <PricingTypeContainer
                    updatePricingType={mockReduxAction} />);

            // Add Select Pricing to redux
            pricingTypeContainer.instance().selectPricingType('B');

            // everything should be updated now
            expect(mockReduxAction).toHaveBeenCalled();
        });
    });
});
