import { OrderedMap } from 'immutable';

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
