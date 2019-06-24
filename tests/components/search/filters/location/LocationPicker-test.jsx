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
            expect(defaultProps.loadStates).toHaveBeenCalled();
            expect(defaultProps.clearCitiesAndSelectedCity).toHaveBeenCalled();
        });
    });
    describe('When the previous selected country was USA...', () => {
        it('clears states and cities', () => {
            const wrapper = shallow(<LocationPicker {...defaultProps} />).instance();
            wrapper.componentDidUpdate({ ...defaultProps, country: { ...defaultProps.country, code: "USA" } });
            expect(defaultProps.clearStates).toHaveBeenCalled();
            expect(defaultProps.clearCitiesAndSelectedCity).toHaveBeenCalled();
        });
    });

    describe('When the previous selected / next selected country was/is not USA...', () => {
        it('clears states and cities', () => {
            const wrapper = createWrapperWithProps('country', { code: "GBR" }).instance();
            wrapper.componentDidUpdate({ ...defaultProps, country: { ...defaultProps.country, code: "UKR" } });
            expect(defaultProps.clearStates).not.toHaveBeenCalled();
            expect(defaultProps.loadStates).not.toHaveBeenCalled();
            expect(defaultProps.clearCitiesAndSelectedCity).toHaveBeenCalled();
        });
    });

    describe('When the selected state changes to a specific state...', () => {
        it('loads county and district data', () => {
            const wrapper = createWrapperWithProps('state', { code: "GA" }).instance();
            wrapper.componentDidUpdate({ ...defaultProps, state: { ...defaultProps.state, code: "SC" } });
            expect(defaultProps.loadCounties).toHaveBeenCalledTimes(1);
            expect(defaultProps.loadDistricts).toHaveBeenCalledTimes(1);
        });
        it('only clears the previously selected city if it is outside of the current state', () => {
            const wrapper = shallow(<LocationPicker {...{ ...defaultProps, state: { ...defaultProps.state, code: "GA" }, city: { ...defaultProps.city, code: "GA" } }} />);
            wrapper.instance().componentDidUpdate({ ...defaultProps, state: { ...defaultProps.state, code: "SC" }, city: { ...defaultProps.city, code: "SC" } });
            expect(defaultProps.clearCitiesAndSelectedCity).not.toHaveBeenCalled();

            jest.resetAllMocks();

            const wrapper2 = shallow(<LocationPicker {...{ ...defaultProps, state: { ...defaultProps.state, code: "GA" }, city: { ...defaultProps.city, code: "SC" } }} />);
            wrapper2.instance().componentDidUpdate({ ...defaultProps, state: { ...defaultProps.state, code: "SC" }, city: { ...defaultProps.city, code: "SC" } });
            expect(defaultProps.clearCitiesAndSelectedCity).toHaveBeenCalled();
        });
    });

    describe('When the selected state changes to \'Select a state/All States\'...', () => {
        it('always clears counties and districts', () => {
            const wrapper = shallow(<LocationPicker {...{ ...defaultProps, state: { ...defaultProps.state, name: 'All states' } }} />).instance();
            wrapper.componentDidUpdate({ ...defaultProps, state: { ...defaultProps.state, code: "GA" } });
            expect(defaultProps.clearCounties).toHaveBeenCalled();
            expect(defaultProps.clearDistricts).toHaveBeenCalled();
            expect(defaultProps.clearCitiesAndSelectedCity).toHaveBeenCalled();
        });
        
        jest.resetAllMocks();
        
        it('only clears the selected city when previous state was manually selected', () => {
            const wrapper = shallow(<LocationPicker {...{ ...defaultProps, state: { ...defaultProps.state, name: 'All states' } }} />).instance();
            wrapper.componentDidUpdate({ ...defaultProps, state: { ...defaultProps.state, code: "GA", autoPopulated: true } });
            expect(defaultProps.clearCounties).toHaveBeenCalled();
            expect(defaultProps.clearDistricts).toHaveBeenCalled();
            expect(defaultProps.clearCitiesAndSelectedCity).not.toHaveBeenCalled();

            jest.resetAllMocks();

            const wrapper2 = shallow(<LocationPicker {...{ ...defaultProps, state: { ...defaultProps.state, name: 'All states' } }} />).instance();
            wrapper2.componentDidUpdate({ ...defaultProps, state: { ...defaultProps.state, code: "GA", autoPopulated: false } });
            expect(defaultProps.clearCounties).toHaveBeenCalled();
            expect(defaultProps.clearDistricts).toHaveBeenCalled();
            expect(defaultProps.clearCitiesAndSelectedCity).toHaveBeenCalled();
        });
    });

    describe('When the selected city changes ', () => {
        it('clears the selected state if the previous state was auto-populated', () => {
            const wrapper = shallow(<LocationPicker {...{ ...defaultProps, state: { ...defaultProps.state, code: 'GA', autoPopulated: true } }} />).instance();
            wrapper.componentDidUpdate({ ...defaultProps, city: { ...defaultProps.city, name: "Atlanta" }, state: { ...defaultProps.state, code: 'GA', autoPopulated: true } });
            expect(defaultProps.selectEntity).toHaveBeenCalledWith('state', defaultProps.state);
        });

        jest.resetAllMocks();

        it('clears the selected state if the previous state was auto-populated', () => {
            const wrapper = shallow(<LocationPicker {...{ ...defaultProps, state: { ...defaultProps.state, code: 'GA', autoPopulated: false } }} />).instance();
            wrapper.componentDidUpdate({ ...defaultProps, city: { ...defaultProps.city, name: "Atlanta" }, state: { ...defaultProps.state, code: 'GA', autoPopulated: false } });
            expect(defaultProps.selectEntity).not.toHaveBeenCalled();
        });
    });
});
