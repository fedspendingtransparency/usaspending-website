import { OrderedMap } from 'immutable';

export const mockActions = {
    selectLocation: jest.fn(),
    setAutocompleteLocations: jest.fn()
};

export const mockRedux = {
    selectedLocations: new OrderedMap(),
    locationDomesticForeign: 'all',
    autocompleteLocations: []
};

export const mockApi = [
    {
        place_type: 'CITY',
        place: 'PAWNEE',
        parent: 'INDIANA',
        matched_ids: [1, 2, 3]
    }
];
