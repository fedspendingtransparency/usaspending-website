/**
 * @jest-environment jsdom
 *
 * LocationAutocompleteContainer-test.jsx
 * Created by JD House 11/10/2026
 *
 */

import React from 'react';
import { render, act } from '@testing-library/react';
import { useDispatch, useSelector } from 'react-redux';

import LocationAutocompleteContainer from 'containers/search/filters/location/LocationAutocompleteContainer';
import LocationAutocomplete from 'components/search/filters/location/LocationAutocomplete';
import useFetchLocationAutocomplete from 'containers/search/filters/location/useFetchLocationAutocomplete';
import useFetchAllCountries from 'containers/search/resultsView/useFetchAllCountries';
import { createLocationObject } from 'helpers/search/locationAutocompleteHelper';
import {
    addPOPLocationObject,
    addRecipientLocationObject,
    updateDomesticForeignSelection,
    updateRecipientDomesticForeignSelection
} from 'redux/actions/search/searchFilterActions';

jest.mock('react-redux', () => ({
    useDispatch: jest.fn(),
    useSelector: jest.fn()
}));
jest.mock('components/search/filters/location/LocationAutocomplete', () => jest.fn(() => null));
jest.mock('containers/search/filters/location/useFetchLocationAutocomplete', () => jest.fn());
jest.mock('containers/search/resultsView/useFetchAllCountries', () => jest.fn());
jest.mock('hooks/useStateData', () => ({
    useFipsIdByStateName: jest.fn(() => ({ fips: 'byName' })),
    useStateFIPSByAbbreviation: jest.fn(() => ({ fips: 'byAbbr' }))
}));
jest.mock('helpers/search/locationAutocompleteHelper', () => ({
    createLocationObject: jest.fn()
}));
jest.mock('redux/actions/search/searchFilterActions', () => ({
    addPOPLocationObject: jest.fn((l) => ({ type: 'POP', l })),
    addRecipientLocationObject: jest.fn((l) => ({ type: 'RECIPIENT', l })),
    updateDomesticForeignSelection: jest.fn((s) => ({ type: 'DF', s })),
    updateRecipientDomesticForeignSelection: jest.fn((s) => ({ type: 'RDF', s }))
}));

const dispatch = jest.fn();
const countries = [{ code: 'USA' }];
const lastProps = () => {
    const { calls } = LocationAutocomplete.mock;
    return calls[calls.length - 1][0];
};

const setup = (activeTab = 'place_of_performance', filters = {}) => {
    useSelector.mockImplementation((selector) => selector({
        filters: {
            recipientDomesticForeign: 'all',
            locationDomesticForeign: 'all',
            ...filters
        }
    }));
    return render(<LocationAutocompleteContainer activeTab={activeTab} />);
};

describe('LocationAutocompleteContainer', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        jest.useFakeTimers();
        useDispatch.mockReturnValue(dispatch);
        useFetchAllCountries.mockReturnValue({ countries });
        useFetchLocationAutocomplete.mockReturnValue({
            locations: [{ id: 1 }],
            noResults: false,
            isLoading: false
        });
    });

    afterEach(() => {
        jest.useRealTimers();
    });

    it('passes hook results and initial state to LocationAutocomplete', () => {
        setup('recipient');

        expect(lastProps()).toEqual(expect.objectContaining({
            activeTab: 'recipient',
            locations: [{ id: 1 }],
            noResults: false,
            isLoading: false,
            readyToStage: false
        }));
        expect(useFetchLocationAutocomplete).toHaveBeenLastCalledWith('');
    });

    it('debounces text input by 1 second before updating the search text', () => {
        setup();

        act(() => {
            lastProps().handleTextInput({ target: { value: 'tex' } });
            lastProps().handleTextInput({ target: { value: 'texas' } });
        });
        act(() => (jest.advanceTimersByTime(999)));
        expect(useFetchLocationAutocomplete).toHaveBeenLastCalledWith('');

        act(() => (jest.advanceTimersByTime(1)));
        expect(useFetchLocationAutocomplete).toHaveBeenLastCalledWith('texas');
    });

    it('sets readyToStage when an item is selected', () => {
        setup();

        act(() => (lastProps().selectItem('item', true, { title: 'Texas' })));

        expect(lastProps().readyToStage).toBe(true);
    });

    it('resets readyToStage when new text is typed', () => {
        setup();

        act(() => (lastProps().selectItem('item', true, {})));
        act(() => {
            lastProps().handleTextInput({ target: { value: 'abc' } });
            jest.advanceTimersByTime(1000);
        });

        expect(lastProps().readyToStage).toBe(false);
    });

    it('clearAutocompleteSuggestions clears search text and readyToStage', () => {
        setup();

        act(() => {
            lastProps().handleTextInput({ target: { value: 'abc' } });
            jest.advanceTimersByTime(1000);
        });
        act(() => (lastProps().selectItem('item', true, {})));
        act(() => (lastProps().clearAutocompleteSuggestions()));

        expect(useFetchLocationAutocomplete).toHaveBeenLastCalledWith('');
        expect(lastProps().readyToStage).toBe(false);
    });

    it('addLocation dispatches a POP location object and clears state', () => {
        const selected = { title: 'Texas' };
        createLocationObject.mockImplementation((item, c, cb) => cb({ built: true }));
        setup('place_of_performance');

        act(() => (lastProps().selectItem('item', true, selected)));
        act(() => (lastProps().addLocation()));

        expect(createLocationObject).toHaveBeenCalledWith(
            selected, countries, expect.any(Function), { fips: 'byName' }, { fips: 'byAbbr' }
        );
        expect(addPOPLocationObject).toHaveBeenCalledWith({ built: true });
        expect(addRecipientLocationObject).not.toHaveBeenCalled();
        expect(dispatch).toHaveBeenCalledWith({ type: 'POP', l: { built: true } });
        expect(lastProps().readyToStage).toBe(false);
    });

    it('addLocation dispatches a recipient location object on the recipient tab', () => {
        createLocationObject.mockImplementation((item, c, cb) => cb({ built: true }));
        setup('recipient');

        act(() => (lastProps().selectItem('item', true, {})));
        act(() => (lastProps().addLocation()));

        expect(addRecipientLocationObject).toHaveBeenCalledWith({ built: true });
        expect(addPOPLocationObject).not.toHaveBeenCalled();
    });

    it.each([
        ['place_of_performance', { locationDomesticForeign: 'all' }, updateDomesticForeignSelection, 'foreign'],
        ['place_of_performance', { locationDomesticForeign: 'foreign' }, updateDomesticForeignSelection, 'all'],
        ['recipient', { recipientDomesticForeign: 'all' }, updateRecipientDomesticForeignSelection, 'foreign'],
        ['recipient', { recipientDomesticForeign: 'foreign' }, updateRecipientDomesticForeignSelection, 'all']
    ])('setIsForeign on %s tab with %o dispatches scope', (tab, filters, action, scope) => {
        setup(tab, filters);

        act(() => (lastProps().setIsForeign()));

        expect(action).toHaveBeenCalledWith(scope);
        expect(dispatch).toHaveBeenCalledTimes(1);
    });
});
