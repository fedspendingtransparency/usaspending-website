/**
 * AgencyListContainer-test.jsx
 * Created by michaelbray on 2/6/17.
 */

import React from 'react';
import { mount, shallow } from 'enzyme';
import sinon from 'sinon';
import { OrderedMap } from 'immutable';

import AgencyListContainer from 'containers/search/filters/AgencyListContainer';

import { mockAgencies } from './mockAgencies';
import { mockSecondaryResults } from './mockLocalSearch';

jest.mock('helpers/searchHelper', () => require('../searchHelper'));
jest.mock('js-search', () => require('./mockLocalSearch'));
jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;

const setup = (props) => mount(<AgencyListContainer {...props} />);
const setupShallow = (props) => shallow(<AgencyListContainer {...props} />);

const initialFilters = {
    agencyType: 'awarding'
};

jest.useFakeTimers();

describe('AgencyListContainer', () => {
    describe('Handling text input', () => {
        it('should call the queryAutocompleteAgencies method 300ms after text input', () => {
            // setup the agency list container and call the function to type a single letter
            const agencyListContainer = setup(initialFilters);

            const searchQuery = {
                target: {
                    value: 'N'
                }
            };

            agencyListContainer.instance().queryAutocompleteAgencies = jest.fn();

            // Call handleTextInput function
            agencyListContainer.instance().handleTextInput(searchQuery);

            // Run fake timer for input delay
            jest.runTimersToTime(1000);

            // everything should be updated now
            expect(agencyListContainer.instance().queryAutocompleteAgencies).toHaveBeenCalledTimes(1);
            expect(agencyListContainer.instance().queryAutocompleteAgencies).toHaveBeenCalledWith('N');
        });

        it('should not search when only one character has been input', () => {
            // setup the agency list container and call the function to type a single letter
            const agencyListContainer = setup(initialFilters);
            agencyListContainer.instance().parseAutocompleteAgencies = jest.fn();
            agencyListContainer.instance().queryAutocompleteAgencies('N');

            expect(agencyListContainer.instance().parseAutocompleteAgencies).toHaveBeenCalledTimes(0);
        });

        it('should make an autocomplete API call when more than one character has '
            + 'been input in the autocomplete text field', async () => {
             // setup the agency list container and call the function to type a single letter
            const agencyListContainer = setup(initialFilters);
            agencyListContainer.instance().parseAutocompleteAgencies = jest.fn();
            agencyListContainer.instance().queryAutocompleteAgencies('N');

            await agencyListContainer.instance().agencySearchRequest.promise;

            expect(agencyListContainer.instance().parseAutocompleteAgencies).toHaveBeenCalledTimes(1);
        });

        it('should populate autocomplete list after performing the search', async () => {
            // setup the agency list container
            const agencyListContainer = setup(initialFilters);

            agencyListContainer.instance().queryAutocompleteAgencies('office of government')
            await agencyListContainer.instance().agencySearchRequest.promise;

            expect(cfdaListContainer.state().autocompleteAgencies.length).toEqual(mockSecondaryResults.length);
        });

    //     it('should toggle Funding agencies that have been either selected or deselected', () => {
    //         const agency = {
    //             id: 1788,
    //             create_date: "2017-01-12T19:56:30.517000Z",
    //             update_date: "2017-01-12T19:56:30.517000Z",
    //             toptier_agency: {
    //                 toptier_agency_id: 268,
    //                 create_date: "2017-01-31T21:25:39.810344Z",
    //                 update_date: "2017-01-31T21:25:39.936439Z",
    //                 cgac_code: "097",
    //                 fpds_code: "9700",
    //                 name: "DEPT OF DEFENSE"
    //             },
    //             subtier_agency: {
    //                 subtier_agency_id: 1654,
    //                 create_date: "2017-01-31T21:25:39.569918Z",
    //                 update_date: "2017-01-31T21:25:39.691244Z",
    //                 subtier_code: "1700",
    //                 name: "DEPT OF THE NAVY"
    //             },
    //             office_agency: null,
    //             agencyType: 'toptier'
    //         };

    //         const mockReduxActionFunding = jest.fn();
    //         const mockParentActionToggle = jest.fn();

    //         const agencyListContainer = setup(Object.assign({}, initialFilters, {
    //             agencyType: 'Funding',
    //             setAutocompleteFundingAgencies: mockReduxActionFunding,
    //             selectedAgencies: new OrderedMap(),
    //             toggleAgency: mockParentActionToggle
    //         }));

    //         const toggleAgencySpy = sinon.spy(agencyListContainer.instance(), 'toggleAgency');

    //         agencyListContainer.instance().toggleAgency(agency, true);

    //         // Run all ticks
    //         jest.runAllTicks();

    //         // everything should be updated now
    //         expect(toggleAgencySpy.callCount).toEqual(1);
    //         expect(mockReduxActionFunding).toHaveBeenCalled();
    //         expect(mockParentActionToggle).toHaveBeenCalled();

    //         // Reset spy
    //         toggleAgencySpy.reset();
    //     });

    //     it('should toggle Awarding agencies that have been either selected or deselected', () => {
    //         const agency = {
    //             id: 1788,
    //             create_date: "2017-01-12T19:56:30.517000Z",
    //             update_date: "2017-01-12T19:56:30.517000Z",
    //             toptier_agency: {
    //                 toptier_agency_id: 268,
    //                 create_date: "2017-01-31T21:25:39.810344Z",
    //                 update_date: "2017-01-31T21:25:39.936439Z",
    //                 cgac_code: "097",
    //                 fpds_code: "9700",
    //                 name: "DEPT OF DEFENSE"
    //             },
    //             subtier_agency: {
    //                 subtier_agency_id: 1654,
    //                 create_date: "2017-01-31T21:25:39.569918Z",
    //                 update_date: "2017-01-31T21:25:39.691244Z",
    //                 subtier_code: "1700",
    //                 name: "DEPT OF THE NAVY"
    //             },
    //             office_agency: null,
    //             agencyType: 'toptier'
    //         };

    //         const mockReduxActionAwarding = jest.fn();
    //         const mockParentActionToggle = jest.fn();

    //         const agencyListContainer = setup(Object.assign({}, initialFilters, {
    //             agencyType: 'Awarding',
    //             setAutocompleteAwardingAgencies: mockReduxActionAwarding,
    //             selectedAgencies: new OrderedMap(),
    //             toggleAgency: mockParentActionToggle
    //         }));

    //         const toggleAgencySpy = sinon.spy(agencyListContainer.instance(), 'toggleAgency');

    //         agencyListContainer.instance().toggleAgency(agency, true);

    //         // Run all ticks
    //         jest.runAllTicks();

    //         // everything should be updated now
    //         expect(toggleAgencySpy.callCount).toEqual(1);
    //         expect(mockReduxActionAwarding).toHaveBeenCalled();
    //         expect(mockParentActionToggle).toHaveBeenCalled();

    //         // Reset spy
    //         toggleAgencySpy.reset();
    //     });

    //     it('should clear Funding Agencies when the Autocomplete tells it to', () => {
    //         const reduxState = [];

    //         // setup mock redux actions for handling search results
    //         const mockReduxAction = jest.fn((args) => {
    //             expect(args).toEqual(reduxState);
    //         });

    //         const agencyListContainer = setup(Object.assign({}, initialFilters, {
    //             setAutocompleteFundingAgencies: mockReduxAction,
    //             fundingAgencies: [{
    //                 id: 1788,
    //                 create_date: "2017-01-12T19:56:30.517000Z",
    //                 update_date: "2017-01-12T19:56:30.517000Z",
    //                 toptier_agency: {
    //                     toptier_agency_id: 268,
    //                     create_date: "2017-01-31T21:25:39.810344Z",
    //                     update_date: "2017-01-31T21:25:39.936439Z",
    //                     cgac_code: "097",
    //                     fpds_code: "9700",
    //                     name: "DEPT OF DEFENSE"
    //                 },
    //                 subtier_agency: {
    //                     subtier_agency_id: 1654,
    //                     create_date: "2017-01-31T21:25:39.569918Z",
    //                     update_date: "2017-01-31T21:25:39.691244Z",
    //                     subtier_code: "1700",
    //                     name: "DEPT OF THE NAVY"
    //                 },
    //                 office_agency: null,
    //                 agencyType: 'toptier'
    //             }],
    //             selectedAgencies: new OrderedMap(),
    //             agencyType: 'Funding'
    //         }));

    //         // Set up spies
    //         const clearAutocompleteSuggestionsSpy = sinon.spy(agencyListContainer.instance(),
    //             'clearAutocompleteSuggestions');

    //         agencyListContainer.instance().clearAutocompleteSuggestions();

    //         // Run all ticks
    //         jest.runAllTicks();

    //         // Everything should be updated
    //         expect(clearAutocompleteSuggestionsSpy.callCount).toEqual(1);
    //         expect(mockReduxAction).toHaveBeenCalled();

    //         // Reset spies
    //         clearAutocompleteSuggestionsSpy.reset();
    //     });

    //     it('should clear Awarding Agencies when the Autocomplete tells it to', () => {
    //         const reduxState = [];

    //         // setup mock redux actions for handling search results
    //         const mockReduxAction = jest.fn((args) => {
    //             expect(args).toEqual(reduxState);
    //         });

    //         const agencyListContainer = setup(Object.assign({}, initialFilters, {
    //             setAutocompleteAwardingAgencies: mockReduxAction,
    //             awardingAgencies: [{
    //                 id: 1788,
    //                 create_date: "2017-01-12T19:56:30.517000Z",
    //                 update_date: "2017-01-12T19:56:30.517000Z",
    //                 toptier_agency: {
    //                     toptier_agency_id: 268,
    //                     create_date: "2017-01-31T21:25:39.810344Z",
    //                     update_date: "2017-01-31T21:25:39.936439Z",
    //                     cgac_code: "097",
    //                     fpds_code: "9700",
    //                     name: "DEPT OF DEFENSE"
    //                 },
    //                 subtier_agency: {
    //                     subtier_agency_id: 1654,
    //                     create_date: "2017-01-31T21:25:39.569918Z",
    //                     update_date: "2017-01-31T21:25:39.691244Z",
    //                     subtier_code: "1700",
    //                     name: "DEPT OF THE NAVY"
    //                 },
    //                 office_agency: null,
    //                 agencyType: 'toptier'
    //             }],
    //             selectedAgencies: new OrderedMap(),
    //             agencyType: 'Awarding'
    //         }));

    //         // Set up spies
    //         const clearAutocompleteSuggestionsSpy = sinon.spy(agencyListContainer.instance(),
    //             'clearAutocompleteSuggestions');

    //         agencyListContainer.instance().clearAutocompleteSuggestions();

    //         // Run all ticks
    //         jest.runAllTicks();

    //         // Everything should be updated
    //         expect(clearAutocompleteSuggestionsSpy.callCount).toEqual(1);
    //         expect(mockReduxAction).toHaveBeenCalled();

    //         // Reset spies
    //         clearAutocompleteSuggestionsSpy.reset();
    //     });
    // });

    // describe('performSecondarySearch', () => {
    //     it('should perform a secondary local Awarding Agency search after receiving the API results and set the autocomplete redux to those results', async () => {
    //         const mockReduxActionAwarding = jest.fn();
    //         const mockReduxActionFunding = jest.fn();
    //         const container = setupShallow(Object.assign({}, initialFilters, {
    //             setAutocompleteAwardingAgencies: mockReduxActionAwarding,
    //             setAutocompleteFundingAgencies: mockReduxActionFunding,
    //             agencyType: 'Awarding'
    //         }));

    //         container.instance().queryAutocompleteAgencies('abc');

    //         await container.instance().agencySearchRequest.promise;

    //         expect(mockReduxActionAwarding).toHaveBeenCalledTimes(1);
    //         expect(mockReduxActionAwarding.mock.calls[0]).toEqual([mockSecondaryResults]);
    //         expect(mockReduxActionFunding).toHaveBeenCalledTimes(0);
    //     });
    //     it('should perform a secondary local Funding Agency search after receiving the API results and set the autocomplete redux to those results', async () => {
    //         const mockReduxActionAwarding = jest.fn();
    //         const mockReduxActionFunding = jest.fn();
    //         const container = setupShallow(Object.assign({}, initialFilters, {
    //             setAutocompleteAwardingAgencies: mockReduxActionAwarding,
    //             setAutocompleteFundingAgencies: mockReduxActionFunding,
    //             agencyType: 'Funding'
    //         }));

    //         container.instance().queryAutocompleteAgencies('abc');

    //         await container.instance().agencySearchRequest.promise;

    //         expect(mockReduxActionFunding).toHaveBeenCalledTimes(1);
    //         expect(mockReduxActionFunding.mock.calls[0]).toEqual([mockSecondaryResults]);
    //         expect(mockReduxActionAwarding).toHaveBeenCalledTimes(0);
    //     });
    });
});
