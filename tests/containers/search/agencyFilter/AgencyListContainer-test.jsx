/**
 * AgencyListContainer-test.jsx
 * Created by michaelbray on 2/6/17.
 */

import React from 'react';
import { mount } from 'enzyme';
import sinon from 'sinon';

import { AgencyListContainer } from 'containers/search/filters/AgencyListContainer';
import * as SearchHelper from 'helpers/searchHelper';

const setup = (props) => mount(<AgencyListContainer {...props} />);

const initialFilters = {
    fundingAgencies: [],
    awardingAgencies: [],
    selectedAgencies: {},
    autocompleteAgencies: []
};

// force Jest to use native Node promises
// see: https://facebook.github.io/jest/docs/troubleshooting.html#unresolved-promises
global.Promise = require.requireActual('promise');

const apiResponse = {
    matched_objects: {
        subtier_agency__name: [{
            id: 1788,
            create_date: "2017-01-12T19:56:30.517000Z",
            update_date: "2017-01-12T19:56:30.517000Z",
            toptier_agency: {
                toptier_agency_id: 268,
                create_date: "2017-01-31T21:25:39.810344Z",
                update_date: "2017-01-31T21:25:39.936439Z",
                cgac_code: "097",
                fpds_code: "9700",
                name: "DEPT OF DEFENSE"
            },
            subtier_agency: {
                subtier_agency_id: 1654,
                create_date: "2017-01-31T21:25:39.569918Z",
                update_date: "2017-01-31T21:25:39.691244Z",
                subtier_code: "1700",
                name: "DEPT OF THE NAVY"
            },
            office_agency: null
        }, {
            id: 1789,
            create_date: "2017-01-12T19:56:30.522000Z",
            update_date: "2017-01-12T19:56:30.522000Z",
            toptier_agency: {
                toptier_agency_id: 268,
                create_date: "2017-01-31T21:25:39.810344Z",
                update_date: "2017-01-31T21:25:39.936439Z",
                cgac_code: "097",
                fpds_code: "9700",
                name: "DEPT OF DEFENSE"
            },
            subtier_agency: {
                subtier_agency_id: 1655,
                create_date: "2017-01-31T21:25:39.569918Z",
                update_date: "2017-01-31T21:25:39.691244Z",
                subtier_code: "1708",
                name: "IMMEDIATE OFFICE OF THE SECRETARY OF THE NAVY"
            },
            office_agency: null
        }]
    }
};

// we don't want to actually hit the API because tests should be fully controlled, so we will mock
// the SearchHelper functions
const mockSearchHelper = (functionName, event, expectedResponse) => {
    jest.useFakeTimers();
    // override the specified function
    SearchHelper[functionName] = jest.fn(() => {
        // Axios normally returns a promise, replicate this, but return the expected result
        const networkCall = new Promise((resolve, reject) => {
            process.nextTick(() => {
                if (event === 'resolve') {
                    resolve({
                        data: expectedResponse
                    });
                }
                else {
                    reject({
                        data: expectedResponse
                    });
                }
            });
        });

        return {
            promise: networkCall,
            cancel: jest.fn()
        };
    });
};

const unmockSearchHelper = () => {
    jest.useRealTimers();
    jest.unmock('helpers/searchHelper');
};

describe('AgencyListContainer', () => {
    describe('Handling text input', () => {
        it('should handle text input after 300ms', () => {
            // setup the top bar container and call the function to type a single letter
            const agencyListContainer = setup({ reduxFilters: initialFilters });
            const searchQuery = {
                target: {
                    value: 'N'
                }
            };

            const handleTextInputSpy = sinon.spy(agencyListContainer.instance(),
                'handleTextInput');

            // Call handleTextInput function
            agencyListContainer.instance().handleTextInput(searchQuery);

            // Run fake timer for input delay
            jest.useFakeTimers().runTimersToTime(1000);

            // the mocked SearchHelper waits 1 tick to resolve the promise, so wait for the tick
            jest.runAllTicks();

            // everything should be updated now
            expect(handleTextInputSpy.callCount).toEqual(1);

            // reset the spies
            handleTextInputSpy.reset();
        });

        it('should call the queryAutocompleteAgencies method 300ms after text input', () => {
            // setup the top bar container and call the function to type a single letter
            const agencyListContainer = setup({ reduxFilters: initialFilters });
            const searchQuery = {
                target: {
                    value: 'N'
                }
            };

            const handleTextInputSpy = sinon.spy(agencyListContainer.instance(),
                'handleTextInput');
            const queryAutocompleteAgenciesSpy = sinon.spy(agencyListContainer.instance(),
                'queryAutocompleteAgencies');

            // Call handleTextInput function
            agencyListContainer.instance().handleTextInput(searchQuery);

            // Run fake timer for input delay
            jest.useFakeTimers().runTimersToTime(1000);

            // the mocked SearchHelper waits 1 tick to resolve the promise, so wait for the tick
            jest.runAllTicks();

            // everything should be updated now
            expect(handleTextInputSpy.callCount).toEqual(1);
            expect(queryAutocompleteAgenciesSpy.callCount).toEqual(1);

            // reset the spies
            handleTextInputSpy.reset();
            queryAutocompleteAgenciesSpy.reset();
        });

        it('should not search when only one character has been input', () => {
            // setup mock redux actions for handling search results
            const mockReduxActionAwarding = jest.fn();
            const mockReduxActionFunding = jest.fn();

            // setup the top bar container and call the function to type a single letter
            const agencyListContainer = setup({
                reduxFilters: initialFilters,
                setAutocompleteFundingAgencies: mockReduxActionFunding,
                setAutocompleteAwardingAgencies: mockReduxActionAwarding
            });

            const queryAutocompleteAgenciesSpy = sinon.spy(agencyListContainer.instance(),
                'queryAutocompleteAgencies');
            const handleTextInputSpy = sinon.spy(agencyListContainer.instance(),
                'handleTextInput');

            const searchQuery = {
                target: {
                    value: 'N'
                }
            };
            agencyListContainer.instance().handleTextInput(searchQuery);

            // Run fake timer for input delay
            jest.useFakeTimers().runTimersToTime(1000);

            // everything should be updated now
            expect(handleTextInputSpy.callCount).toEqual(1);
            expect(queryAutocompleteAgenciesSpy.callCount).toEqual(1);
            expect(mockReduxActionFunding).toHaveBeenCalledTimes(0);
            expect(mockReduxActionAwarding).toHaveBeenCalledTimes(0);

            // reset the mocks and spies
            handleTextInputSpy.reset();
            queryAutocompleteAgenciesSpy.reset();
        });

        it('should search and populate Funding Agencies when more than one character has ' +
            'been input in the Funding Agency field', () => {
            // setup mock redux actions for handling search results
            const mockReduxActionFunding = jest.fn((args) => {
                expect(args).toEqual([
                    {
                        id: 1788,
                        create_date: "2017-01-12T19:56:30.517000Z",
                        update_date: "2017-01-12T19:56:30.517000Z",
                        toptier_agency: {
                            toptier_agency_id: 268,
                            create_date: "2017-01-31T21:25:39.810344Z",
                            update_date: "2017-01-31T21:25:39.936439Z",
                            cgac_code: "097",
                            fpds_code: "9700",
                            name: "DEPT OF DEFENSE"
                        },
                        subtier_agency: {
                            subtier_agency_id: 1654,
                            create_date: "2017-01-31T21:25:39.569918Z",
                            update_date: "2017-01-31T21:25:39.691244Z",
                            subtier_code: "1700",
                            name: "DEPT OF THE NAVY"
                        },
                        office_agency: null
                    }, {
                        id: 1789,
                        create_date: "2017-01-12T19:56:30.522000Z",
                        update_date: "2017-01-12T19:56:30.522000Z",
                        toptier_agency: {
                            toptier_agency_id: 268,
                            create_date: "2017-01-31T21:25:39.810344Z",
                            update_date: "2017-01-31T21:25:39.936439Z",
                            cgac_code: "097",
                            fpds_code: "9700",
                            name: "DEPT OF DEFENSE"
                        },
                        subtier_agency: {
                            subtier_agency_id: 1655,
                            create_date: "2017-01-31T21:25:39.569918Z",
                            update_date: "2017-01-31T21:25:39.691244Z",
                            subtier_code: "1708",
                            name: "IMMEDIATE OFFICE OF THE SECRETARY OF THE NAVY"
                        },
                        office_agency: null
                    }
                ]);
            });

            // setup the top bar container and call the function to type a single letter
            const agencyListContainer = setup({
                reduxFilters: initialFilters,
                agencyType: 'Funding',
                setAutocompleteFundingAgencies: mockReduxActionFunding,
                selectedAgencies: {}
            });

            // mock the search helper to resolve with the mocked response
            mockSearchHelper('fetchAgencies', 'resolve', apiResponse);

            const queryAutocompleteAgenciesSpy = sinon.spy(agencyListContainer.instance(),
                'queryAutocompleteAgencies');
            const handleTextInputSpy = sinon.spy(agencyListContainer.instance(),
                'handleTextInput');

            const searchQuery = {
                target: {
                    value: 'Na'
                }
            };
            agencyListContainer.instance().handleTextInput(searchQuery);

            // Run fake timer for input delay
            jest.useFakeTimers().runTimersToTime(1000);

            // Run fake timer for input delay
            jest.runAllTicks();

            expect(handleTextInputSpy.callCount).toEqual(1);
            expect(queryAutocompleteAgenciesSpy.callCount).toEqual(1);
            expect(mockReduxActionFunding).toHaveBeenCalled();

            // reset the mock
            unmockSearchHelper();
        });

        it('should search and populate Awarding Agencies when more than one character has ' +
            'been input in the Awarding Agency field', () => {
            // setup mock redux actions for handling search results
            const mockReduxActionAwarding = jest.fn((args) => {
                expect(args).toEqual([
                    {
                        id: 1788,
                        create_date: "2017-01-12T19:56:30.517000Z",
                        update_date: "2017-01-12T19:56:30.517000Z",
                        toptier_agency: {
                            toptier_agency_id: 268,
                            create_date: "2017-01-31T21:25:39.810344Z",
                            update_date: "2017-01-31T21:25:39.936439Z",
                            cgac_code: "097",
                            fpds_code: "9700",
                            name: "DEPT OF DEFENSE"
                        },
                        subtier_agency: {
                            subtier_agency_id: 1654,
                            create_date: "2017-01-31T21:25:39.569918Z",
                            update_date: "2017-01-31T21:25:39.691244Z",
                            subtier_code: "1700",
                            name: "DEPT OF THE NAVY"
                        },
                        office_agency: null
                    }, {
                        id: 1789,
                        create_date: "2017-01-12T19:56:30.522000Z",
                        update_date: "2017-01-12T19:56:30.522000Z",
                        toptier_agency: {
                            toptier_agency_id: 268,
                            create_date: "2017-01-31T21:25:39.810344Z",
                            update_date: "2017-01-31T21:25:39.936439Z",
                            cgac_code: "097",
                            fpds_code: "9700",
                            name: "DEPT OF DEFENSE"
                        },
                        subtier_agency: {
                            subtier_agency_id: 1655,
                            create_date: "2017-01-31T21:25:39.569918Z",
                            update_date: "2017-01-31T21:25:39.691244Z",
                            subtier_code: "1708",
                            name: "IMMEDIATE OFFICE OF THE SECRETARY OF THE NAVY"
                        },
                        office_agency: null
                    }
                ]);
            });

            // setup the top bar container and call the function to type a single letter
            const agencyListContainer = setup({
                reduxFilters: initialFilters,
                agencyType: 'Awarding',
                setAutocompleteAwardingAgencies: mockReduxActionAwarding,
                selectedAgencies: {}
            });

            // mock the search helper to resolve with the mocked response
            mockSearchHelper('fetchAgencies', 'resolve', apiResponse);

            const queryAutocompleteAgenciesSpy = sinon.spy(agencyListContainer.instance(),
                'queryAutocompleteAgencies');
            const handleTextInputSpy = sinon.spy(agencyListContainer.instance(),
                'handleTextInput');

            const searchQuery = {
                target: {
                    value: 'Na'
                }
            };
            agencyListContainer.instance().handleTextInput(searchQuery);

            // Run fake timer for input delay
            jest.useFakeTimers().runTimersToTime(1000);

            // Run fake timer for input delay
            jest.runAllTicks();

            expect(handleTextInputSpy.callCount).toEqual(1);
            expect(queryAutocompleteAgenciesSpy.callCount).toEqual(1);
            expect(mockReduxActionAwarding).toHaveBeenCalled();

            // reset the mock
            unmockSearchHelper();
        });
    });
});
