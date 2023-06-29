import { OrderedMap } from 'immutable';

import { defaultLocationValues } from "../../../../../src/js/containers/search/filters/location/LocationPickerContainer";

export const mockRedux = {
    addPOPLocationObject: jest.fn(),
    addRecipientLocationObject: jest.fn(),
    updateGenericFilter: jest.fn(),
    selectedLocations: new OrderedMap()
};

export const mockPickerRedux = {
    selectedLocations: new OrderedMap(),
    addLocation: jest.fn(),
    scope: "primary_place_of_performance"
};

export const getSelectedLocationProps = (props = defaultLocationValues) => ({
    country: props.country,
    state: props.state,
    county: props.county,
    city: props.city,
    district_original: props.district,
    zip: props.zip
});

export const getLoadLocationMethods = () => ({
    loadStates: jest.fn(),
    loadCounties: jest.fn(),
    loadDistricts: jest.fn()
});

export const getClearLocationMethods = () => ({
    clearStates: jest.fn(),
    clearCounties: jest.fn(),
    clearDistricts: jest.fn(),
    clearCitiesAndSelectedCity: jest.fn()
});
