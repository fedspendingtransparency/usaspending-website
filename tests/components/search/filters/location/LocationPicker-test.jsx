/**
 * LocationPickerContainer-test.jsx
 * Created by Maxwell Kendall 6/24/19
 */

import React from 'react';
import { shallow } from 'enzyme';

import LocationPicker from "../../../../../src/js/components/search/filters/location/LocationPicker";
import { mockRedux, mockPickerRedux, getSelectedLocationProps, getLoadLocationMethods, getClearLocationMethods } from "../../../../containers/search/filters/location/mockLocations";
import { defaultLocationValues } from "../../../../../src/js/containers/search/filters/location/LocationPickerContainer";

describe('componentDidMount', () => {
    const defaultProps = {
        availableDistricts: [],
        availableCities: [],
        availableStates: [],
        availableCountries: [],
        selectEntity: jest.fn(),
        createLocationObject: jest.fn(),
        ...mockRedux,
        ...mockPickerRedux,
        ...getSelectedLocationProps(),
        ...getLoadLocationMethods(),
        ...getClearLocationMethods()
    };

    const createWrapperWithProps = (propKey, propValue) => (
        shallow(<LocationPicker {...{ ...defaultProps, [propKey]: { ...defaultLocationValues[propKey], ...propValue } }} />)
    );

    beforeEach(() => {
        jest.resetAllMocks();
    });

    describe('When the selected country changes to USA...', () => {
        const wrapper = createWrapperWithProps('country', { code: "USA" });
        it('loads states and clears the selected city', () => {
            wrapper.instance().componentDidUpdate(defaultProps);
            expect(defaultProps.loadStates).toHaveBeenCalledTimes(1);
            expect(defaultProps.clearCitiesAndSelectedCity).toHaveBeenCalledTimes(1);
        });
    });
    describe('When the previous selected country was USA...', () => {
        it('clears states and cities', () => {
            const wrapper = shallow(<LocationPicker {...defaultProps} />).instance();
            wrapper.componentDidUpdate({ ...defaultProps, country: { ...defaultProps.country, code: "USA" } });
            expect(defaultProps.clearStates).toHaveBeenCalledTimes(1);
            expect(defaultProps.clearCitiesAndSelectedCity).toHaveBeenCalledTimes(1);
        });
    });

    describe('When the previous selected country was not USA and the next selected country is not USA...', () => {
        it('clears states and cities', () => {
            const wrapper = createWrapperWithProps('country', { code: "GBR" }).instance();
            wrapper.componentDidUpdate({ ...defaultProps, country: { ...defaultProps.country, code: "UKR" } });
            expect(defaultProps.clearStates).not.toHaveBeenCalled();
            expect(defaultProps.loadStates).not.toHaveBeenCalled();
            expect(defaultProps.clearCitiesAndSelectedCity).toHaveBeenCalledTimes(1);
        });
    });

    describe('When a new state is selected', () => {
        it('loads county and district data', () => {
            const wrapper = createWrapperWithProps('state', { code: "GA" }).instance();
            wrapper.componentDidUpdate({ ...defaultProps, state: { ...defaultProps.state, code: "SC" } });
            expect(defaultProps.loadCounties).toHaveBeenCalledTimes(1);
            expect(defaultProps.loadDistricts).toHaveBeenCalledTimes(1);
        });

        it('does not clear the selected city if it is within the newly selected state', () => {
            const wrapper = shallow(<LocationPicker {...{
                ...defaultProps,
                country: { ...defaultProps.country, code: "USA" },
                state: { ...defaultProps.state, code: "GA" },
                city: { ...defaultProps.city, code: "GA" }
            }} />);
            wrapper.instance().componentDidUpdate({ ...defaultProps, country: { ...defaultProps.country, code: "USA" }, state: { ...defaultProps.state, code: "SC" }, city: { ...defaultProps.city, code: "SC" } });
            expect(defaultProps.clearCitiesAndSelectedCity).not.toHaveBeenCalled();
        });

        jest.resetAllMocks();

        it('clears the selected city if it is outside of the new newly selected state', () => {
            const wrapper2 = shallow(<LocationPicker {...{ ...defaultProps, state: { ...defaultProps.state, code: "GA" }, city: { ...defaultProps.city, code: "SC" } }} />);
            wrapper2.instance().componentDidUpdate({ ...defaultProps, state: { ...defaultProps.state, code: "SC" }, city: { ...defaultProps.city, code: "SC" } });
            expect(defaultProps.clearCitiesAndSelectedCity).toHaveBeenCalledTimes(1);
        });
    });

    describe('When a state is de-selected (All states becomes selected)', () => {
        it('always clears counties and districts', () => {
            const wrapper = shallow(<LocationPicker {...{ ...defaultProps, state: { ...defaultProps.state, name: 'All states' } }} />).instance();
            wrapper.componentDidUpdate({ ...defaultProps, state: { ...defaultProps.state, code: "GA" } });
            expect(defaultProps.clearCounties).toHaveBeenCalled();
            expect(defaultProps.clearDistricts).toHaveBeenCalled();
            expect(defaultProps.clearCitiesAndSelectedCity).toHaveBeenCalled();
        });

        jest.resetAllMocks();

        it('does not clear the city drop down options and city search string when previous state was auto-populated', () => {
            // Extra detail about this scenario:
            // (1) the previous state would've been auto-populated by a city selection
            // (2) the new state selection would only be "All States", effectively clearing the state selection
            // (3) this should only happen when the city is deselected, so there's no need to clear the selected city in this case.
            const wrapper = shallow(<LocationPicker {...{ ...defaultProps, state: { ...defaultProps.state, name: 'All states' } }} />).instance();
            wrapper.componentDidUpdate({ ...defaultProps, state: { ...defaultProps.state, code: "GA", autoPopulated: true } });
            expect(defaultProps.clearCounties).toHaveBeenCalled();
            expect(defaultProps.clearDistricts).toHaveBeenCalled();
            expect(defaultProps.clearCitiesAndSelectedCity).not.toHaveBeenCalled();
        });

        jest.resetAllMocks();

        it('clears city selection, city drop down options, and city search string when previous state selection was manually selected', () => {
            const wrapper = shallow(<LocationPicker {...{ ...defaultProps, state: { ...defaultProps.state, name: 'All states' } }} />).instance();
            wrapper.componentDidUpdate({ ...defaultProps, state: { ...defaultProps.state, code: "GA" } });
            expect(defaultProps.clearCounties).toHaveBeenCalled();
            expect(defaultProps.clearDistricts).toHaveBeenCalled();
            expect(defaultProps.clearCitiesAndSelectedCity).toHaveBeenCalled();
        });
    });

    describe('When the selected city is deselected', () => {
        it('clears the selected state if the previous state selection was auto-populated', () => {
            const wrapper = shallow(<LocationPicker {...{ ...defaultProps, state: { ...defaultProps.state, code: 'GA', autoPopulated: true } }} />).instance();
            wrapper.componentDidUpdate({ ...defaultProps, city: { ...defaultProps.city, name: "Atlanta" }, state: { ...defaultProps.state, code: 'GA', autoPopulated: true } });
            expect(defaultProps.selectEntity).toHaveBeenCalledWith('state', defaultProps.state);
        });

        jest.resetAllMocks();

        it('persists the selected state if (a) the city is within the state and (b) the state was selected manually', () => {
            const wrapper = shallow(<LocationPicker {...{ ...defaultProps, state: { ...defaultProps.state, code: 'GA' } }} />).instance();
            wrapper.componentDidUpdate({ ...defaultProps, city: { ...defaultProps.city, name: "Atlanta" }, state: { ...defaultProps.state, code: 'GA' } });
            expect(defaultProps.selectEntity).not.toHaveBeenCalled();
        });

        it('clears the selected country if it was auto-populated', () => {
            const countrySelection = { ...defaultProps.country, code: 'GBR', autoPopulated: true };
            const citySelection = { ...defaultProps.city, name: "London" };
            const wrapper = shallow(<LocationPicker {...{ ...defaultProps, country: countrySelection }} />).instance();
            wrapper.componentDidUpdate({ ...defaultProps, city: citySelection, country: countrySelection });
            expect(defaultProps.selectEntity).toHaveBeenCalledWith('country', { code: "FOREIGN", name: "ALL FOREIGN COUNTRIES", autoPopulated: true });
        });

        jest.resetAllMocks();

        it('persists the selected country if (a) the city is within the country and (b) the country was manually selected', () => {
            const previousCountry = { ...defaultProps.country, code: 'FOREIGN', autoPopulated: true };
            const currentCountry = { ...defaultProps.country, code: 'GBR', autoPopulated: false };
            const citySelection = { ...defaultProps.city, name: "London", code: 'GBR' };
            const wrapper = shallow(<LocationPicker {...{ ...defaultProps, city: citySelection, country: currentCountry }} />).instance();
            wrapper.componentDidUpdate({ ...defaultProps, city: citySelection, country: previousCountry });
            expect(defaultProps.selectEntity).not.toHaveBeenCalled();
        });
    });
});
