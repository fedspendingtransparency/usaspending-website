/**
 * LocationPickerContainer-test.jsx
 * Created by Kevin Li 11/1/17
 */

import React from 'react';
import { shallow } from 'enzyme';

import LocationPickerContainer from 'containers/search/filters/location/LocationPickerContainer';

import { mockPickerRedux } from './mockLocations';
import { _mockCountries, _mockStates, _mockCounties, _mockDistricts } from './mockMapHelper';

global.Promise = require.requireActual('promise');

jest.mock('components/search/filters/location/LocationPicker', () =>
    jest.fn(() => null));

jest.mock('helpers/mapHelper', () => require('./mockMapHelper'));

describe('LocationPickerContainer', () => {
    describe('parseCountries', () => {
        it('should be the API response prepended with USA, all foreign counries, and a divider', () => {
            const container = shallow(<LocationPickerContainer {...mockPickerRedux} />);
            container.instance().parseCountries(_mockCountries);

            expect(container.state().availableCountries).toEqual([
                {
                    code: 'USA',
                    name: 'UNITED STATES'
                }, {
                    code: 'FOREIGN',
                    name: 'ALL FOREIGN COUNTRIES'
                }, {
                    code: '',
                    name: '---'
                }, {
                    code: 'ABC',
                    name: 'A Big Country'
                }
            ]);
        });
    });
    describe('parseStates', () => {
        it('should be the API response prepended with an All states option', () => {
            const container = shallow(<LocationPickerContainer {...mockPickerRedux} />);
            container.instance().parseStates(_mockStates);

            expect(container.state().availableStates).toEqual([
                {
                    code: '',
                    fips: '',
                    name: 'All states'
                }, {
                    fips: '00',
                    code: 'IN',
                    name: 'Indiana'
                }
            ]);
        });
    });
    describe('parseCounties', () => {
        it('should be the API response prepended with an All counties option', () => {
            const container = shallow(<LocationPickerContainer {...mockPickerRedux} />);
            container.instance().parseCounties(_mockCounties);

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
            container.instance().parseDistricts(_mockDistricts);

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
                availableStates: _mockStates.states,
                state: _mockStates.states[0]
            });

            container.instance().clearStates();

            expect(container.state().availableStates).toEqual([]);
            expect(container.state().state).toEqual({
                code: '',
                fips: '',
                name: ''
            });
        });
    });
    describe('clearCounties', () => {
        it('should clear the available counties and reset the selected county to a blank value', () => {
            const container = shallow(<LocationPickerContainer {...mockPickerRedux} />);
            container.setState({
                availableCounties: _mockCounties.counties,
                county: _mockCounties.counties[0]
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
                availableDistricts: _mockDistricts.districts,
                district: _mockDistricts.districts[0]
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
                name: ''
            });

            container.instance().selectEntity('country', {
                code: 'ABC',
                name: 'A Big Country'
            });

            expect(container.state().country).toEqual({
                code: 'ABC',
                name: 'A Big Country'
            });
        });
    });

    describe('createLocationObject', () => {
        describe('location identifiers', () => {
            it('should create an identifier that is equal to the country code if only a country is selected', () => {
                const container = shallow(<LocationPickerContainer {...mockPickerRedux} />);
                container.setState({
                    country: {
                        code: 'ABC',
                        name: 'A Big Country'
                    }
                });

                const location = container.instance().createLocationObject();
                expect(location.identifier).toEqual('ABC');
            });
            it('should create an identifier that contains the country code and state code if a state is selected', () => {
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
                expect(location.identifier).toEqual('ABC_AK');
            });
            it('should create an identifier that contains the country, state, and county codes if a county is selected', () => {
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
                expect(location.identifier).toEqual('ABC_AK_000');
            });
            it('should create an identifier that contains the country, state, and district codes if a district is selected', () => {
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
                expect(location.identifier).toEqual('ABC_AK_99');
            });
        });

        describe('API filter object', () => {
            it('should create a filter object that contains only the country code if only a country is selected', () => {
                const container = shallow(<LocationPickerContainer {...mockPickerRedux} />);
                container.setState({
                    country: {
                        code: 'ABC',
                        name: 'A Big Country'
                    }
                });

                const location = container.instance().createLocationObject();
                expect(location.filter).toEqual({
                    country: 'ABC'
                });
            });
            it('should create filter object that contains the country code and state code if a state is selected', () => {
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
                expect(location.filter).toEqual({
                    country: 'ABC',
                    state: 'AK'
                });
            });
            it('should create a filter object that contains the country, state, and county codes if a county is selected', () => {
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
                expect(location.filter).toEqual({
                    country: 'ABC',
                    state: 'AK',
                    county: '000'
                });
            });
            it('should create a filter object that contains the country, state, and district codes if a district is selected', () => {
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
                expect(location.filter).toEqual({
                    country: 'ABC',
                    state: 'AK',
                    district: '99'
                });
            });
        });


        it('should generate a standalone title for counties in county, state format', () => {
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
            expect(location.display.standalone).toEqual('Fake County, AK');
        });

        it('should generate a display object with title, standalone title, and entity values that are used for location tags', () => {
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
            expect(location.display).toEqual({
                title: 'Fake County',
                entity: 'County',
                standalone: 'Fake County, AK'
            });
        });

        it('should output an object with identifier code, display object, and an object formatted for the API', () => {
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
            expect(location).toEqual({
                identifier: 'ABC_AK_000',
                display: {
                    title: 'Fake County',
                    entity: 'County',
                    standalone: 'Fake County, AK'
                },
                filter: {
                    country: 'ABC',
                    state: 'AK',
                    county: '000'
                }
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
});
