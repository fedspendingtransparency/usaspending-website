/**
 * LocationSectionContainer.jsx
 * Created by Kevin Li 1/5/18
 */

import React from 'react';
import { shallow } from 'enzyme';
import { OrderedMap } from 'immutable';

import { LocationSectionContainer } from 'containers/search/filters/location/LocationSectionContainer';

// mock the child component by replacing it with a function that returns a null element
jest.mock('components/search/filters/location/LocationSection', () =>
    jest.fn(() => null));

const mockRedux = {
    selectedLocations: new OrderedMap(),
    selectedRecipientLocations: new OrderedMap(),
    appliedLocations: new OrderedMap(),
    appliedRecipientLocations: new OrderedMap()
};

describe('LocationSectionContainer', () => {
    describe('dirtyFilters', () => {
        it('should return an ES6 Symbol when the staged filters do not match with the applied filters', () => {
            const container = shallow(
                <LocationSectionContainer
                    {...mockRedux} />
            );

            container.setProps({
                selectedRecipientLocations: new OrderedMap({'a': 'a'})
            });

            const changed = container.instance().dirtyFilters();
            expect(changed).toBeTruthy();
            expect(typeof changed).toEqual('symbol');
        });
        it('should return null when the staged filters match with the applied filters', () => {
            const container = shallow(
                <LocationSectionContainer
                    {...mockRedux} />
            );

            const changed = container.instance().dirtyFilters();
            expect(changed).toBeFalsy();
        });
    });
});
