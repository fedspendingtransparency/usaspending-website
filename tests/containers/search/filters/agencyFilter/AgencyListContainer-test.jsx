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
    selectedAgencies: new OrderedMap(),
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
            agencyListContainer.instance().queryAutocompleteAgencies('ABC');

            await agencyListContainer.instance().agencySearchRequest.promise;

            expect(agencyListContainer.instance().parseAutocompleteAgencies).toHaveBeenCalledTimes(1);
        });

        it('should populate autocomplete list after performing the search', async () => {
            // setup the agency list container
            const agencyListContainer = setup(initialFilters);

            agencyListContainer.instance().queryAutocompleteAgencies('office of government');
            await agencyListContainer.instance().agencySearchRequest.promise;

            expect(agencyListContainer.state().autocompleteAgencies.length).toEqual(mockSecondaryResults.length);
        });

        it('should not display autocomplete agencies that have already previously selected', () => {
            const agencyListContainer = setup(Object.assign({}, initialFilters, {
                selectedAgencies: new OrderedMap({
                    '14_toptier': {}
                })
            }));
            agencyListContainer.instance().parseAutocompleteAgencies([
                {
                    id: 14,
                    toptier_flag: true,
                    toptier_agency: {
                        cgac_code: "004",
                        fpds_code: "0400",
                        abbreviation: "GPO",
                        name: "Government Publishing Office"
                    },
                    subtier_agency: {
                        subtier_code: "0400",
                        abbreviation: "",
                        name: "Government Publishing Office"
                    },
                    office_agency: null
                }
            ]);

            expect(agencyListContainer.state().autocompleteAgencies.length).toEqual(0);
        });
        it('should move FEMA\'s toptier entry to the end of the list', () => {
            const agencyListContainer = setup(initialFilters);
            agencyListContainer.instance().parseAutocompleteAgencies([
                {
                    id: 14,
                    toptier_flag: true,
                    toptier_agency: {
                        cgac_code: "058",
                        fpds_code: "",
                        abbreviation: "FEMA",
                        name: "Federal Emergency Management Agency"
                    },
                    subtier_agency: {
                        subtier_code: "5800",
                        abbreviation: "FEMA",
                        name: "Federal Emergency Management Agency"
                    },
                    office_agency: null
                }, {
                    id: 15,
                    toptier_flag: false,
                    toptier_agency: {
                        cgac_code: "058",
                        fpds_code: "",
                        abbreviation: "FEMA",
                        name: "Federal Emergency Management Agency"
                    },
                    subtier_agency: {
                        subtier_code: "585D",
                        abbreviation: "",
                        name: "FEMA Region IV"
                    },
                    office_agency: null
                }
            ]);

            expect(agencyListContainer.state().autocompleteAgencies[0].data.toptier_flag).toBeFalsy();
            expect(agencyListContainer.state().autocompleteAgencies[1].data.toptier_flag).toBeTruthy();
        });
        it('should clear the autocomplete list when the Autocomplete tells it to', () => {
            const agencyListContainer = setup(initialFilters);
            agencyListContainer.setState({
                autocompleteAgencies: [{}]
            });

            expect(agencyListContainer.state().autocompleteAgencies.length).toEqual(1);

            agencyListContainer.instance().clearAutocompleteSuggestions();
            expect(agencyListContainer.state().autocompleteAgencies.length).toEqual(0);            
        });
    });

    describe('performSecondarySearch', () => {
        it('should perform a secondary local agency autocomplete operation after receiving the API results and set the autocomplete redux to those results', async () => {
            const container = setupShallow(initialFilters);
            container.instance().parseAutocompleteAgencies = jest.fn();
            container.instance().queryAutocompleteAgencies('abc');

            await container.instance().agencySearchRequest.promise;

            expect(container.instance().parseAutocompleteAgencies).toHaveBeenCalledTimes(1);
            expect(container.instance().parseAutocompleteAgencies).toHaveBeenCalledWith(mockSecondaryResults);
        });
    });
});
