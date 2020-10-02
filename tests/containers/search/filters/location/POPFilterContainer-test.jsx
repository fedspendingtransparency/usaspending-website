/**
 * POPFilterContainer-test.jsx
 * Created by Kevin Li 11/1/17
 */

import React from 'react';
import { shallow } from 'enzyme';
import { OrderedMap } from 'immutable';

import { POPFilterContainer } from 'containers/search/filters/location/POPFilterContainer';

import { mockRedux } from './mockLocations';

global.Promise = jest.requireActual('promise');

jest.mock('components/search/filters/location/SelectedLocations', () =>
    jest.fn(() => null));
jest.mock('containers/search/filters/location/LocationPickerContainer', () =>
    jest.fn(() => null));

describe('POPFilterContainer', () => {
    describe('addLocation', () => {
        it('should pass to the location argument to the reducer action', () => {
            const mockAdd = jest.fn();
            const redux = Object.assign({}, mockRedux, {
                addPOPLocationObject: mockAdd
            });

            const container = shallow(<POPFilterContainer
                {...redux} />);
            container.instance().addLocation('abc');

            expect(mockAdd).toHaveBeenCalledTimes(1);
            expect(mockAdd).toHaveBeenCalledWith('abc');
        });
    });
    describe('removeLocation', () => {
        it('should call the Redux updateGenericFilter action with an updated location set that excludes the specified location', () => {
            const mockGeneric = jest.fn();
            const selected = new OrderedMap({
                USA_NY_001: 'MOCK LOCATION OBJECT'
            });

            const redux = Object.assign({}, mockRedux, {
                selectedLocations: selected,
                updateGenericFilter: mockGeneric
            });

            const container = shallow(<POPFilterContainer
                {...redux} />);
            expect(container.instance().props.selectedLocations.count()).toEqual(1);

            container.instance().removeLocation('USA_NY_001');
            expect(mockGeneric).toHaveBeenCalledTimes(1);
            expect(mockGeneric).toHaveBeenCalledWith({
                type: 'selectedLocations',
                value: new OrderedMap()
            });
        });
    });
});
