/**
 * AgencyListContainer-test.jsx
 * Created by michaelbray on 2/6/17.
 */

import React from 'react';
import { mount, shallow } from 'enzyme';
import { OrderedMap } from 'immutable';

import AgencyListContainer from 'containers/search/filters/AgencyListContainer';

import { mockSecondaryResults, mockFemaResults, mockResults, mockNullAgencyResults } from './mockLocalSearch';

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
                        toptier_code: "004",
                        abbreviation: "GPO",
                        name: "Government Publishing Office"
                    },
                    subtier_agency: {
                        subtier_code: "0400",
                        abbreviation: "",
                        name: "Government Publishing Office"
                    }
                }
            ]);

            expect(agencyListContainer.state().autocompleteAgencies.length).toEqual(0);
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

    describe('parseAutocompleteAgencies', () => {
        it('should separate toptier and subtier agencies and alphabetize each group', async () => {
            const container = setupShallow(initialFilters);
            container.setState({
                agencySearchString: 'abc'
            });

            container.instance().parseAutocompleteAgencies(mockResults);

            // Toptier agencies should have been moved to the top of the list
            expect(container.state().autocompleteAgencies[0].title).toEqual('Department ABC (ABC)');
            expect(container.state().autocompleteAgencies[1].title).toEqual('Department XYZ (XYZ)');
            expect(container.state().autocompleteAgencies[2].title).toEqual('DEF Agency (DEF)');
            expect(container.state().autocompleteAgencies[2].subtitle).toEqual('Sub-Agency of Department ABC (ABC)');
        });
        it('should not contain null agency abbreviations', async () => {
            const container = setupShallow(initialFilters);
            container.setState({
                agencySearchString: 'abc'
            });

            container.instance().parseAutocompleteAgencies(mockNullAgencyResults);

            // Agency titles/subtitles should not have abbreviations.
            expect(container.state().autocompleteAgencies[0].title).toEqual('QQ Agency ');
            expect(container.state().autocompleteAgencies[0].subtitle).toEqual('Sub-Agency of Department QQ ');
        });
        it('should not change the order of results when searching for FEMA', async () => {
            const container = setupShallow(initialFilters);
            container.setState({
                agencySearchString: 'fema'
            });

            container.instance().parseAutocompleteAgencies(mockFemaResults);

            // Results should stay in the same order with a subtier agency at the top of the list
            expect(container.state().autocompleteAgencies[0].toptier_flag).toBeFalsy;
        });
    });
});
