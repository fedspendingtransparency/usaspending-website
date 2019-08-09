/**
 * LocationPickerContainer-test.jsx
 * Created by Kevin Li 11/1/17
 */

import React from 'react';
import { shallow } from 'enzyme';

import LocationPickerContainer from 'containers/search/filters/location/LocationPickerContainer';

import { mockPickerRedux } from './mockLocations';
import { mockCountries, mockStates, mockCounties, mockDistricts, mockValidZip, mockInvalidZip, mockCityAutocompleteResponse } from './mockMapHelper';

global.Promise = require.requireActual('promise');

jest.mock('components/search/filters/location/LocationPicker', () =>
    jest.fn(() => null));

jest.mock('helpers/mapHelper', () => require('./mockMapHelper'));

describe('LocationPickerContainer', () => {
    describe('parseCountries', () => {
        it('should be the API response prepended with USA, all foreign counries, and a divider', () => {
            const container = shallow(<LocationPickerContainer {...mockPickerRedux} />);
            container.instance().parseCountries(mockCountries);

            expect(container.state().availableCountries).toEqual([
                {
                    code: 'USA',
                    name: 'UNITED STATES',
                    autoPopulated: false
                }, {
                    code: 'FOREIGN',
                    name: 'ALL FOREIGN COUNTRIES',
                    autoPopulated: false
                }, {
                    code: '',
                    name: '---',
                    autoPopulated: false
                }, {
                    code: 'ABC',
                    name: 'A Big Country',
                    autoPopulated: false
                }
            ]);
        });
    });
    describe('parseStates', () => {
        it('should be the API response prepended with an All states option', () => {
            const container = shallow(<LocationPickerContainer {...mockPickerRedux} />);
            container.instance().parseStates(mockStates);

            expect(container.state().availableStates).toEqual([
                {
                    code: '',
                    fips: '',
                    name: 'All states',
                    autoPopulated: false
                },
                {
                    fips: '00',
                    code: 'IN',
                    name: 'Indiana',
                    autoPopulated: false
                }
            ]);
        });
    });
    describe('parseCounties', () => {
        it('should be the API response prepended with an All counties option', () => {
            const container = shallow(<LocationPickerContainer {...mockPickerRedux} />);
            container.instance().parseCounties(mockCounties);

            expect(container.state().availableCounties).toEqual([
                {
                    code: '',
                    fips: '',
                    state: '',
                    name: 'All counties'
                }, {
                    code: '0000X',
                    fips: '00X',
                    state: 'IN',
                    name: 'St. Joseph county'
                }
            ]);
        });
    });
    describe('parseDistricts', () => {
        it('should be the API response prepended with an All congressional districts option', () => {
            const container = shallow(<LocationPickerContainer {...mockPickerRedux} />);
            container.instance().parseDistricts(mockDistricts);

            expect(container.state().availableDistricts).toEqual([
                {
                    code: '',
                    district: '',
                    name: 'All congressional districts'
                }, {
                    code: '00XX',
                    district: 'XX',
                    name: 'IN-XX'
                }
            ]);
        });
    });

    describe('clearStates', () => {
        it('should clear the available states and reset the selected state to a blank value', () => {
            const container = shallow(<LocationPickerContainer {...mockPickerRedux} />);
            container.setState({
                availableStates: mockStates.states,
                state: mockStates.states[0]
            });

            container.instance().clearStates();

            expect(container.state().availableStates).toEqual([]);
            expect(container.state().state).toEqual({
                code: '',
                fips: '',
                name: '',
                autoPopulated: false
            });
        });
    });
    describe('clearCounties', () => {
        it('should clear the available counties and reset the selected county to a blank value', () => {
            const container = shallow(<LocationPickerContainer {...mockPickerRedux} />);
            container.setState({
                availableCounties: mockCounties.counties,
                county: mockCounties.counties[0]
            });

            container.instance().clearCounties();

            expect(container.state().availableCounties).toEqual([]);
            expect(container.state().county).toEqual({
                code: '',
                fips: '',
                state: '',
                name: ''
            });
        });
    });
    describe('clearDistricts', () => {
        it('should clear the available congressional districts and reset the selected congressional district to a blank value', () => {
            const container = shallow(<LocationPickerContainer {...mockPickerRedux} />);
            container.setState({
                availableDistricts: mockDistricts.districts,
                district: mockDistricts.districts[0]
            });

            container.instance().clearDistricts();

            expect(container.state().availableDistricts).toEqual([]);
            expect(container.state().district).toEqual({
                code: '',
                district: '',
                name: ''
            });
        });
    });

    describe('selectEntity', () => {
        it('should set the state of the relevant to the selected value', () => {
            const container = shallow(<LocationPickerContainer {...mockPickerRedux} />);
            expect(container.state().country).toEqual({
                code: '',
                name: '',
                autoPopulated: false
            });

            container.instance().selectEntity('country', {
                code: 'ABC',
                name: 'A Big Country',
                autoPopulated: false
            });

            expect(container.state().country).toEqual({
                code: 'ABC',
                name: 'A Big Country',
                autoPopulated: false
            });
        });
        it('if level is city, should auto-populate selected state to city\'s state (if different)', () => {
            const container = shallow(<LocationPickerContainer {...mockPickerRedux} />);
            container.instance().setState({ availableStates: [{ code: 'TST' }], country: { code: "USA" } });
            container.instance().selectEntity('city', { name: 'test', code: 'TST' });
            expect(container.state().state.code).toEqual('TST');
            expect(container.state().city.name).toEqual('test');
        });

        it('if level is city, should auto-populate selected country to city\'s country (if different)', () => {
            const container = shallow(<LocationPickerContainer {...mockPickerRedux} />);
            container.instance().setState({
                availableCountries: [{ code: 'GBR' }, { code: 'FOREIGN' }, { code: 'USA' }],
                country: { code: "FOREIGN" }
            });
            container.instance().selectEntity('city', { name: 'test', code: 'GBR' });
            expect(container.state().country.code).toEqual('GBR');
            expect(container.state().city.name).toEqual('test');
        });
    });

    describe('createLocationObject', () => {
        describe('Country selection', () => {
            const container = shallow(<LocationPickerContainer {...mockPickerRedux} />);
            container.setState({
                country: {
                    code: 'ABC',
                    name: 'A Big Country'
                }
            });
            const location = container.instance().createLocationObject();
            it('locationObject.identifier is correct', () => {
                expect(location.identifier).toEqual('ABC');
            });

            it('locationObject.filter is correct', () => {
                expect(location.filter).toEqual({
                    country: 'ABC'
                });
            });
            it('locationObject.display is correct', () => {

            });
        });
        describe('State selection', () => {
            const container = shallow(<LocationPickerContainer {...mockPickerRedux} />);
            container.setState({
                country: {
                    code: 'ABC',
                    name: 'A Big Country'
                },
                state: {
                    code: 'AK',
                    fips: 'XX',
                    name: 'Alaska'
                }
            });
            const location = container.instance().createLocationObject();

            it('locationObject.identifier is correct', () => {
                expect(location.identifier).toEqual('ABC_AK');
            });
            it('locationObject.filter is correct', () => {
                expect(location.filter).toEqual({
                    country: 'ABC',
                    state: 'AK'
                });
            });
            it('locationObject.display is correct', () => {

            });
        });
        describe('City selection', () => {
            const domesticContainer = shallow(<LocationPickerContainer {...mockPickerRedux} />);
            // Test for handling cities w/ commas
            const commaContainer = shallow(<LocationPickerContainer {...mockPickerRedux} />);
            // Test for handling cities w/ a code that doesn't match any countries
            const invalidCountryCodeContainer = shallow(<LocationPickerContainer {...mockPickerRedux} />);

            domesticContainer.setState({
                country: {
                    code: 'USA',
                    name: 'United States'
                },
                city: { name: "Atlanta, GA", code: "GA" },
                state: {
                    name: "Georgia",
                    code: "GA"
                }
            });
            commaContainer.setState({
                country: {
                    code: 'GBR',
                    name: 'United Kingdom'
                },
                city: {
                    code: "GBR",
                    name: "London, Kent"
                }
            });
            invalidCountryCodeContainer.setState({
                country: {
                    code: 'FOREIGN',
                    name: 'ALL FOREIGN COUNTRIES'
                },
                city: {
                    code: "United Kingdom",
                    name: "Londonderry, United Kingdom"
                }
            });

            const domesticLocation = domesticContainer.instance().createLocationObject();
            const commaLocation = commaContainer.instance().createLocationObject();
            const invalidCountryCodeLocation = invalidCountryCodeContainer.instance().createLocationObject();

            it('locationObject.identifier is correct', () => {
                expect(domesticLocation.identifier).toEqual('USA_GA_Atlanta');
                expect(commaLocation.identifier).toEqual('GBR_London, Kent');
                expect(invalidCountryCodeLocation.identifier).toEqual('FOREIGN_Londonderry');
            });
            it('locationObject.filter is correct', () => {
                expect(domesticLocation.filter).toEqual({
                    country: 'USA',
                    state: 'GA',
                    city: 'Atlanta'
                });
                expect(commaLocation.filter).toEqual({
                    country: 'GBR',
                    city: 'London, Kent'
                });
                expect(invalidCountryCodeLocation.filter).toEqual({
                    country: 'United Kingdom',
                    city: 'Londonderry'
                });
            });
            it('locationObject.display is correct', () => {
                expect(domesticLocation.display).toEqual({
                    title: 'Atlanta, GA',
                    entity: 'City',
                    standalone: 'Atlanta, GA'
                });
                expect(commaLocation.display).toEqual({
                    title: 'London, Kent',
                    entity: 'City',
                    standalone: 'London, Kent'
                });
                expect(invalidCountryCodeLocation.display).toEqual({
                    title: 'Londonderry, United Kingdom',
                    entity: 'City',
                    standalone: 'Londonderry, United Kingdom'
                });
            });
        });
        describe('County selection', () => {
            const container = shallow(<LocationPickerContainer {...mockPickerRedux} />);
            container.setState({
                country: {
                    code: 'ABC',
                    name: 'A Big Country'
                },
                state: {
                    code: 'AK',
                    fips: 'XX',
                    name: 'Alaska'
                },
                county: {
                    code: 'XX000',
                    fips: '000',
                    state: 'AK',
                    name: 'Fake County'
                }
            });

            const location = container.instance().createLocationObject();

            it('locationObject.identifier is correct', () => {
                expect(location.identifier).toEqual('ABC_AK_000');
            });
            it('locationObject.filter is correct', () => {
                expect(location.filter).toEqual({
                    country: 'ABC',
                    state: 'AK',
                    county: '000'
                });
            });
            it('locationObject.display is correct', () => {
                expect(location.display).toEqual({
                    standalone: 'Fake County, AK',
                    entity: 'County',
                    title: 'Fake County'
                });
            });
        });
        describe('District selection', () => {
            const container = shallow(<LocationPickerContainer {...mockPickerRedux} />);
            container.setState({
                country: {
                    code: 'ABC',
                    name: 'A Big Country'
                },
                state: {
                    code: 'AK',
                    fips: 'XX',
                    name: 'Alaska'
                },
                district: {
                    code: 'XX',
                    district: '99',
                    name: 'AK-99'
                }
            });

            const location = container.instance().createLocationObject();

            it('locationObject.identifier is correct', () => {
                expect(location.identifier).toEqual('ABC_AK_99');
            });
            it('locationObject.filter is correct', () => {
                expect(location.filter).toEqual({
                    country: 'ABC',
                    state: 'AK',
                    district: '99'
                });
            });
            it('locationObject.display is correct', () => {
                expect(location.display).toEqual({
                    entity: 'Congressional district',
                    title: 'AK-99',
                    standalone: 'AK-99'
                });
            });
        });
    });

    describe('addLocation', () => {
        it('should call the addLocation prop to add the location to Redux', () => {
            const mockAdd = jest.fn();
            const redux = Object.assign({}, mockPickerRedux, {
                addLocation: mockAdd
            });
            const container = shallow(<LocationPickerContainer {...redux} />);
            container.setState({
                country: {
                    code: 'ABC',
                    name: 'A Big Country'
                }
            });

            container.instance().addLocation();
            expect(mockAdd).toHaveBeenCalledTimes(1);
            expect(mockAdd).toHaveBeenCalledWith({
                identifier: 'ABC',
                display: {
                    title: 'A Big Country',
                    entity: 'Country',
                    standalone: 'A Big Country'
                },
                filter: {
                    country: 'ABC'
                }
            });
        });
    });

    describe('validateZip', () => {
        it('should make a Mapbox API request to validate the input', async () => {
            const container = shallow(<LocationPickerContainer {...mockPickerRedux} />);
            container.instance().parseZip = jest.fn();

            container.instance().validateZip('46556');
            expect(container.instance().zipRequest).not.toBeNull();
            await container.instance().zipRequest.promise;

            expect(container.instance().parseZip).toHaveBeenCalledTimes(1);
            expect(container.instance().parseZip).toHaveBeenCalledWith(mockValidZip, '46556');
        });
        it('should not attempt to validate if the input is not five digits and all numeric', () => {
            const container = shallow(<LocationPickerContainer {...mockPickerRedux} />);
            container.instance().parseZip = jest.fn();
            container.instance().invalidZip = jest.fn();

            container.instance().validateZip('W1A 1AA');
            expect(container.instance().zipRequest).toBeNull();
            expect(container.instance().parseZip).toHaveBeenCalledTimes(0);
            expect(container.instance().invalidZip).toHaveBeenCalledTimes(1);
            expect(container.instance().invalidZip).toHaveBeenCalledWith('W1A 1AA');
        });
    });

    describe('parseZip', () => {
        it('should consider a ZIP code to be valid if the Mapbox API responds with at least one Feature object', () => {
            const container = shallow(<LocationPickerContainer {...mockPickerRedux} />);
            container.instance().validZip = jest.fn();
            container.instance().invalidZip = jest.fn();

            container.instance().parseZip(mockValidZip, '46556');
            expect(container.instance().validZip).toHaveBeenCalledTimes(1);
            expect(container.instance().validZip).toHaveBeenCalledWith('46556');
            expect(container.instance().invalidZip).toHaveBeenCalledTimes(0);
        });
        it('should consider a ZIP code to be invalid if Mapbox does not return any features', () => {
            const container = shallow(<LocationPickerContainer {...mockPickerRedux} />);
            container.instance().validZip = jest.fn();
            container.instance().invalidZip = jest.fn();

            container.instance().parseZip(mockInvalidZip, '00000');
            expect(container.instance().invalidZip).toHaveBeenCalledTimes(1);
            expect(container.instance().invalidZip).toHaveBeenCalledWith('00000');
            expect(container.instance().validZip).toHaveBeenCalledTimes(0);
        });
    });

    describe('invalidZip', () => {
        it('should update the state with the invalid ZIP and clear any valid ZIP', () => {
            const container = shallow(<LocationPickerContainer {...mockPickerRedux} />);
            container.setState({
                zip: {
                    valid: '46556',
                    invalid: ''
                }
            });

            expect(container.state().zip.valid).toEqual('46556');
            expect(container.state().zip.invalid).toEqual('');

            container.instance().invalidZip('W1A 1AA');
            expect(container.state().zip.valid).toEqual('');
            expect(container.state().zip.invalid).toEqual('W1A 1AA');
        });
    });

    describe('validZip', () => {
        it('should update the state with the valid ZIP and clear any invalid ZIP', () => {
            const container = shallow(<LocationPickerContainer {...mockPickerRedux} />);
            container.setState({
                zip: {
                    valid: '',
                    invalid: 'W1A 1AA'
                }
            });

            expect(container.state().zip.valid).toEqual('');
            expect(container.state().zip.invalid).toEqual('W1A 1AA');

            container.instance().validZip('46556');
            expect(container.state().zip.valid).toEqual('46556');
            expect(container.state().zip.invalid).toEqual('');
        });
    });

    describe('addZip', () => {
        it('should create an object that contains only a valid ZIP code and US country code to be used as a location filter object', () => {
            const mockAdd = jest.fn();
            const mockRedux = Object.assign({}, mockPickerRedux, {
                addLocation: mockAdd
            });
            const container = shallow(<LocationPickerContainer {...mockRedux} />);
            container.setState({
                zip: {
                    valid: '46556',
                    invalid: ''
                }
            });

            const expectedLocation = {
                identifier: 'USA_46556',
                display: {
                    title: '46556',
                    entity: 'ZIP Code',
                    standalone: '46556'
                },
                filter: {
                    country: 'USA',
                    zip: '46556'
                }
            };

            container.instance().addZip();
            expect(mockAdd).toHaveBeenCalledTimes(1);
            expect(mockAdd).toHaveBeenCalledWith(expectedLocation);
        });

        it('should return early if there is no valid ZIP code in the state', () => {
            const mockAdd = jest.fn();
            const mockRedux = Object.assign({}, mockPickerRedux, {
                addLocation: mockAdd
            });
            const container = shallow(<LocationPickerContainer {...mockRedux} />);

            container.instance().addZip();
            expect(mockAdd).toHaveBeenCalledTimes(0);
        });
    });
    describe('parseCities', () => {
        it('sets availableCities w/ city name and state code unless it is a no results object', () => {
            const container = shallow(<LocationPickerContainer {...mockPickerRedux} />);

            // Important - this response is not from the API, we call parseCities w/ this parameter when results.length === 0
            const emptyAPIResponse = [{ city_name: "No matching results", state_code: "NA-000" }];
            const defaultAPIResponse = mockCityAutocompleteResponse.results;
            const defaultAvailableCitiesState = [{
                name: `${defaultAPIResponse[0].city_name}, ${defaultAPIResponse[0].state_code}`,
                code: defaultAPIResponse[0].state_code
            }];
            const emptyAvailableCitiesState = [{ name: "No matching results", code: "NA-000" }];

            container.instance().parseCities(defaultAPIResponse);
            expect(container.state().availableCities).toEqual(defaultAvailableCitiesState);

            container.instance().parseCities(emptyAPIResponse);
            expect(container.state().availableCities).toEqual(emptyAvailableCitiesState);
        });
    });
});
