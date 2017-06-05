/**
 * AgencyListContainer-test.jsx
 * Created by michaelbray on 2/6/17.
 */

import React from 'react';
import { mount } from 'enzyme';
import sinon from 'sinon';
import { OrderedMap } from 'immutable';

import { AgencyListContainer } from 'containers/search/filters/AgencyListContainer';
import * as SearchHelper from 'helpers/searchHelper';
import * as agencyActions from 'redux/actions/search/agencyActions';

const setup = (props) => mount(<AgencyListContainer {...props} />);

const initialFilters = {
    fundingAgencies: [],
    awardingAgencies: []
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
            // setup the agency list container and call the function to type a single letter
            const agencyListContainer = setup({
                reduxFilters: initialFilters,
                setAutocompleteAwardingAgencies: agencyActions.setAutocompleteAwardingAgencies,
                setAutocompleteFundingAgencies: agencyActions.setAutocompleteFundingAgencies
            });

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
            // setup the agency list container and call the function to type a single letter
            const agencyListContainer = setup({
                reduxFilters: initialFilters,
                setAutocompleteAwardingAgencies: agencyActions.setAutocompleteAwardingAgencies,
                setAutocompleteFundingAgencies: agencyActions.setAutocompleteFundingAgencies
            });
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

            // setup the agency list container and call the function to type a single letter
            const agencyListContainer = setup({
                reduxFilters: initialFilters,
                setAutocompleteFundingAgencies: mockReduxActionFunding,
                setAutocompleteAwardingAgencies: mockReduxActionAwarding,
                agencyType: 'Funding'
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
            expect(mockReduxActionFunding).toHaveBeenCalledTimes(1);
            expect(mockReduxActionAwarding).toHaveBeenCalledTimes(0);

            // reset the mocks and spies
            handleTextInputSpy.reset();
            queryAutocompleteAgenciesSpy.reset();
        });

        it('should search Funding Agencies when more than one character has ' +
            'been input in the Funding Agency field', () => {
            // setup mock redux actions for handling search results
            const mockReduxActionFunding = jest.fn();

            // setup the agency list container and call the function to type a single letter
            const agencyListContainer = setup({
                reduxFilters: initialFilters,
                agencyType: 'Funding',
                setAutocompleteFundingAgencies: mockReduxActionFunding,
                selectedAgencies: new OrderedMap()
            });

            // set up spies
            const handleTextInputSpy = sinon.spy(agencyListContainer.instance(),
                'handleTextInput');
            const queryAutocompleteAgenciesSpy = sinon.spy(agencyListContainer.instance(),
                'queryAutocompleteAgencies');

            const searchQuery = {
                target: {
                    value: 'The Navy'
                }
            };
            agencyListContainer.instance().handleTextInput(searchQuery);

            // Run fake timer for input delay
            jest.useFakeTimers().runTimersToTime(300);

            // Run fake timer for input delay
            jest.runAllTicks();

            // everything should be updated now
            expect(handleTextInputSpy.callCount).toEqual(1);
            expect(queryAutocompleteAgenciesSpy.calledWith(handleTextInputSpy));

            // Reset spies
            handleTextInputSpy.reset();
            queryAutocompleteAgenciesSpy.reset();
        });

        it('should populate Funding Agencies after performing the search', () => {
            // Setup redux state
            const reduxState = [
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
                },
                {
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
                }];

            // setup mock redux actions for handling search results
            const mockReduxActionFunding = jest.fn((args) => {
                expect(args).toEqual(reduxState);
            });

            // setup the agency list container and call the function to type a single letter
            const agencyListContainer = setup({
                reduxFilters: initialFilters,
                agencyType: 'Funding',
                setAutocompleteFundingAgencies: mockReduxActionFunding,
                fundingAgencies: reduxState,
                selectedAgencies: new OrderedMap()
            });

            // Mock the search helper to resolve with the mocked response
            mockSearchHelper('fetchAgencies', 'resolve', apiResponse);

            // Run fake timer for input delay
            jest.useFakeTimers().runTimersToTime(10000);

            // Run all ticks
            jest.runAllTicks();

            // Set up spies
            const queryAutocompleteAgenciesSpy = sinon.spy(agencyListContainer.instance(),
                'queryAutocompleteAgencies');
            const parseAutocompleteAgenciesSpy = sinon.spy(agencyListContainer.instance(),
                'parseAutocompleteAgencies');

            agencyListContainer.instance().queryAutocompleteAgencies('The Navy');

            // Run all ticks
            jest.runAllTicks();

            expect(queryAutocompleteAgenciesSpy.callCount).toEqual(1);
            expect(parseAutocompleteAgenciesSpy.calledWith(queryAutocompleteAgenciesSpy));
            expect(mockReduxActionFunding).toHaveBeenCalled();

            // Reset the mock
            unmockSearchHelper();

            // Reset spies
            queryAutocompleteAgenciesSpy.reset();
            parseAutocompleteAgenciesSpy.reset();
        });

        it('should search Awarding Agencies when more than one character has ' +
            'been input in the Awarding Agency field', () => {
            // setup mock redux actions for handling search results
            const mockReduxActionAwarding = jest.fn();

            // setup the agency list container and call the function to type a single letter
            const agencyListContainer = setup({
                reduxFilters: initialFilters,
                agencyType: 'Awarding',
                setAutocompleteAwardingAgencies: mockReduxActionAwarding,
                selectedAgencies: new OrderedMap()
            });

            const handleTextInputSpy = sinon.spy(agencyListContainer.instance(),
                'handleTextInput');
            const queryAutocompleteAgenciesSpy = sinon.spy(agencyListContainer.instance(),
                'queryAutocompleteAgencies');

            const searchQuery = {
                target: {
                    value: 'The Navy'
                }
            };
            agencyListContainer.instance().handleTextInput(searchQuery);

            // Run fake timer for input delay
            jest.useFakeTimers().runTimersToTime(300);

            // Run fake timer for input delay
            jest.runAllTicks();

            // everything should be updated now
            expect(handleTextInputSpy.callCount).toEqual(1);
            expect(queryAutocompleteAgenciesSpy.calledWith(handleTextInputSpy));

            // Reset spies
            handleTextInputSpy.reset();
            queryAutocompleteAgenciesSpy.reset();
        });

        it('should populate Awarding Agencies after performing the search', () => {
            // Setup redux state
            const reduxState = [
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
                },
                {
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
                }];

            // setup mock redux actions for handling search results
            const mockReduxActionAwarding = jest.fn((args) => {
                expect(args).toEqual(reduxState);
            });

            // setup the agency list container and call the function to type a single letter
            const agencyListContainer = setup({
                reduxFilters: initialFilters,
                agencyType: 'Awarding',
                setAutocompleteAwardingAgencies: mockReduxActionAwarding,
                awardingAgencies: reduxState,
                selectedAgencies: new OrderedMap()
            });

            // mock the search helper to resolve with the mocked response
            mockSearchHelper('fetchAgencies', 'resolve', apiResponse);

            // Run all ticks
            jest.runAllTicks();

            // Set up spies
            const queryAutocompleteAgenciesSpy = sinon.spy(agencyListContainer.instance(),
                'queryAutocompleteAgencies');
            const parseAutocompleteAgenciesSpy = sinon.spy(agencyListContainer.instance(),
                'parseAutocompleteAgencies');

            agencyListContainer.instance().queryAutocompleteAgencies('The Navy');

            // Run all ticks
            jest.runAllTicks();

            // everything should be updated now
            expect(queryAutocompleteAgenciesSpy.callCount).toEqual(1);
            expect(parseAutocompleteAgenciesSpy.calledWith(queryAutocompleteAgenciesSpy));
            expect(mockReduxActionAwarding).toHaveBeenCalled();

            // Reset the mock
            unmockSearchHelper();

            // Reset spies
            queryAutocompleteAgenciesSpy.reset();
            parseAutocompleteAgenciesSpy.reset();
        });

        it('should toggle Funding agencies that have been either selected or deselected', () => {
            const agency = {
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
                office_agency: null,
                agencyType: 'toptier'
            };

            const mockReduxActionFunding = jest.fn();
            const mockParentActionToggle = jest.fn();

            const agencyListContainer = setup({
                reduxFilters: initialFilters,
                agencyType: 'Funding',
                setAutocompleteFundingAgencies: mockReduxActionFunding,
                selectedAgencies: new OrderedMap(),
                toggleAgency: mockParentActionToggle
            });

            const toggleAgencySpy = sinon.spy(agencyListContainer.instance(), 'toggleAgency');

            agencyListContainer.instance().toggleAgency(agency, true);

            // Run all ticks
            jest.runAllTicks();

            // everything should be updated now
            expect(toggleAgencySpy.callCount).toEqual(1);
            expect(mockReduxActionFunding).toHaveBeenCalled();
            expect(mockParentActionToggle).toHaveBeenCalled();

            // Reset spy
            toggleAgencySpy.reset();
        });

        it('should toggle Awarding agencies that have been either selected or deselected', () => {
            const agency = {
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
                office_agency: null,
                agencyType: 'toptier'
            };

            const mockReduxActionAwarding = jest.fn();
            const mockParentActionToggle = jest.fn();

            const agencyListContainer = setup({
                reduxFilters: initialFilters,
                agencyType: 'Awarding',
                setAutocompleteAwardingAgencies: mockReduxActionAwarding,
                selectedAgencies: new OrderedMap(),
                toggleAgency: mockParentActionToggle
            });

            const toggleAgencySpy = sinon.spy(agencyListContainer.instance(), 'toggleAgency');

            agencyListContainer.instance().toggleAgency(agency, true);

            // Run all ticks
            jest.runAllTicks();

            // everything should be updated now
            expect(toggleAgencySpy.callCount).toEqual(1);
            expect(mockReduxActionAwarding).toHaveBeenCalled();
            expect(mockParentActionToggle).toHaveBeenCalled();

            // Reset spy
            toggleAgencySpy.reset();
        });

        it('should clear Funding Agencies when the Autocomplete tells it to', () => {
            const reduxState = [];

            // setup mock redux actions for handling search results
            const mockReduxAction = jest.fn((args) => {
                expect(args).toEqual(reduxState);
            });

            const agencyListContainer = setup({
                reduxFilters: initialFilters,
                setAutocompleteFundingAgencies: mockReduxAction,
                fundingAgencies: [{
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
                    office_agency: null,
                    agencyType: 'toptier'
                }],
                selectedAgencies: new OrderedMap(),
                agencyType: 'Funding'
            });

            // Set up spies
            const clearAutocompleteSuggestionsSpy = sinon.spy(agencyListContainer.instance(),
                'clearAutocompleteSuggestions');

            agencyListContainer.instance().clearAutocompleteSuggestions();

            // Run all ticks
            jest.runAllTicks();

            // Everything should be updated
            expect(clearAutocompleteSuggestionsSpy.callCount).toEqual(1);
            expect(mockReduxAction).toHaveBeenCalled();

            // Reset spies
            clearAutocompleteSuggestionsSpy.reset();
        });

        it('should clear Awarding Agencies when the Autocomplete tells it to', () => {
            const reduxState = [];

            // setup mock redux actions for handling search results
            const mockReduxAction = jest.fn((args) => {
                expect(args).toEqual(reduxState);
            });

            const agencyListContainer = setup({
                reduxFilters: initialFilters,
                setAutocompleteAwardingAgencies: mockReduxAction,
                awardingAgencies: [{
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
                    office_agency: null,
                    agencyType: 'toptier'
                }],
                selectedAgencies: new OrderedMap(),
                agencyType: 'Awarding'
            });

            // Set up spies
            const clearAutocompleteSuggestionsSpy = sinon.spy(agencyListContainer.instance(),
                'clearAutocompleteSuggestions');

            agencyListContainer.instance().clearAutocompleteSuggestions();

            // Run all ticks
            jest.runAllTicks();

            // Everything should be updated
            expect(clearAutocompleteSuggestionsSpy.callCount).toEqual(1);
            expect(mockReduxAction).toHaveBeenCalled();

            // Reset spies
            clearAutocompleteSuggestionsSpy.reset();
        });
    });
});
