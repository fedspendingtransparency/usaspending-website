/**
 * RecipientFilterContainer-test.jsx
 * Created by Kevin Li 11/1/17
 */

import React from 'react';
import { shallow } from 'enzyme';
import { OrderedMap } from 'immutable';

import { RecipientFilterContainer } from 'containers/search/filters/location/RecipientFilterContainer';

import { mockRedux } from './mockLocations';

global.Promise = require.requireActual('promise');

jest.mock('components/search/filters/location/SelectedLocations', () =>
    jest.fn(() => null));
jest.mock('containers/search/filters/location/LocationPickerContainer', () =>
    jest.fn(() => null));

describe('RecipientFilterContainer', () => {
    describe('addLocation', () => {
        it('should pass to the location argument to the reducer action', () => {
            const mockAdd = jest.fn();
            const redux = Object.assign({}, mockRedux, {
                addRecipientLocationObject: mockAdd
            });

            const container = shallow(<RecipientFilterContainer
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

            const container = shallow(<RecipientFilterContainer
                {...redux} />);
            expect(container.instance().props.selectedLocations.count()).toEqual(1);

            container.instance().removeLocation('USA_NY_001');
            expect(mockGeneric).toHaveBeenCalledTimes(1);
            expect(mockGeneric).toHaveBeenCalledWith({
                type: 'selectedRecipientLocations',
                value: new OrderedMap()
            });
        });
    });
});
