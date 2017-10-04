/**
 * LocationSearchContainer-test.jsx
 * Created by Emily Gullo 09/22/2017
 */

import React from 'react';
import { shallow } from 'enzyme';

import { LocationSearchContainer } from
    'containers/search/filters/location/LocationSearchContainer';

import { mockApi } from './mockLocations';

const setupShallow = (props) => shallow(<LocationSearchContainer {...props} />);

const parsedApi = {
    location: {
        matched_ids: [1, 2, 3],
        parent: "INDIANA",
        place: "PAWNEE",
        place_type: "CITY"
    }
};

const toggleValue = {
    target: {
        value: 'foreign'
    }
};

describe('LocationSearchContainer', () => {
    describe('selectLocation', () => {
        it('should update the location name in redux if the passed value is valid', () => {
            const container = setupShallow({
                updateSelectedLocations: jest.fn(),
                updateDomesticForeignSelection: jest.fn()
            });

            // mount the container
            container.instance().selectLocation(mockApi[0], true);
            expect(container.instance().props.updateSelectedLocations).toBeCalled();
            expect(container.instance().props.updateSelectedLocations).toBeCalledWith(parsedApi);
        });
        it('should do nothing if the passed value is null', () => {
            const container = setupShallow({
                updateSelectedLocations: jest.fn(),
                updateDomesticForeignSelection: jest.fn()
            });

            // mount the container
            container.instance().selectLocation(null, true);
            expect(container.instance().props.updateSelectedLocations).not.toBeCalled();
        });
        it('should do nothing if the passed value is not valid', () => {
            const container = setupShallow({
                updateSelectedLocations: jest.fn(),
                updateDomesticForeignSelection: jest.fn()
            });

            // mount the container
            container.instance().selectLocation(mockApi[0], false);
            expect(container.instance().props.updateSelectedLocations).not.toBeCalled();
        });
    });
    describe('removeLocation', () => {
        it('should remove the location name in redux', () => {
            const container = setupShallow({
                updateSelectedLocations: jest.fn(),
                updateDomesticForeignSelection: jest.fn(),
                selectedLocations: {},
                locationDomesticForeign: 'domestic'
            });

            // mount the container
            container.instance().removeLocation(mockApi[0]);
            expect(container.instance().props.updateSelectedLocations).toBeCalled();
            expect(container.instance().props.updateSelectedLocations).toBeCalledWith(parsedApi);
        });
    });
    describe('toggleCountry', () => {
        it('should toggle dometics/foreign in redux', () => {
            const container = setupShallow({
                updateSelectedLocations: jest.fn(),
                updateDomesticForeignSelection: jest.fn(),
                selectedLocations: {},
                locationDomesticForeign: 'domestic'
            });

            // mount the container
            container.instance().toggleCountry(toggleValue);
            expect(container.instance().props.updateDomesticForeignSelection).toBeCalled();
            expect(container.instance().props.updateDomesticForeignSelection).toBeCalledWith('foreign');
        });
    });
});
