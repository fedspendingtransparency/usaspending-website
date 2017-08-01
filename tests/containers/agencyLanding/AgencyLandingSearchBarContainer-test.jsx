/**
 * AgencyLandingContainer-test.jsx
 * Created by Lizzie Salita 7/18/17
 */

import React from 'react';
import { mount, shallow } from 'enzyme';
import sinon from 'sinon';
import Immutable from 'immutable';
import { Agency } from 'redux/reducers/agencyLanding/agencyLandingReducer';

import { AgencyLandingSearchBarContainer } from
    'containers/agencyLanding/AgencyLandingSearchBarContainer';
import { AgencyLandingSearchBar } from
    'components/agencyLanding/AgencyLandingSearchBar';
import * as agencyLandingActions from 'redux/actions/agencyLanding/agencyLandingActions';
import { mockAgencies } from './mockToptierAgencies';

jest.mock('helpers/agencyLandingHelper', () => require('./agencyLandingHelper'));
jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;

const setup = (props) => mount(<AgencyLandingSearchBarContainer {...props} />);

describe('AgencyLandingSearchBarContainer', () => {
    describe('Handling text input', () => {
        it('should handle text input after 300ms', () => {
            // setup the search bar container and call the function to type a single letter
            const searchBarContainer = setup({
                setAgencySearchString: jest.fn(),
                setNoResults: jest.fn(),
                setAutocompleteAgencies: agencyLandingActions.setAutocompleteAgencies,
                autocompleteAgencies: [],
                agencies: mockAgencies
            });

            const searchQuery = {
                target: {
                    value: 'N'
                }
            };

            const handleTextInputSpy = sinon.spy(searchBarContainer.instance(),
                'handleTextInput');

            // Call handleTextInput function
            searchBarContainer.instance().handleTextInput(searchQuery);

            // Run fake timer for input delay
            jest.useFakeTimers().runTimersToTime(1000);

            // the mocked SearchHelper waits 1 tick to resolve the promise, so wait for the tick
            jest.runAllTicks();

            // everything should be updated now
            expect(handleTextInputSpy.callCount).toEqual(1);

            // reset the spies
            handleTextInputSpy.reset(); 
        });

        it('should call the performSecondarySearch method after text input', () => {
            // setup the search bar container and call the function to type a single letter
            const searchBarContainer = setup({
                setAgencySearchString: jest.fn(),
                setNoResults: jest.fn(),
                setAutocompleteAgencies: agencyLandingActions.setAutocompleteAgencies,
                autocompleteAgencies: [],
                agencies: mockAgencies
            });

            const searchQuery = {
                target: {
                    value: 'N'
                }
            };

            const handleTextInputSpy = sinon.spy(searchBarContainer.instance(),
                'handleTextInput');
            const performSecondarySearchSpy = sinon.spy(searchBarContainer.instance(),
                'performSecondarySearch');

            // Call handleTextInput function
            searchBarContainer.instance().handleTextInput(searchQuery);

            // Run fake timer for input delay
            jest.useFakeTimers().runTimersToTime(1000);

            // everything should be updated now
            expect(handleTextInputSpy.callCount).toEqual(1);
            expect(performSecondarySearchSpy.callCount).toEqual(1);

            // reset the spies
            handleTextInputSpy.reset();
            performSecondarySearchSpy.reset();
        });
        it('should not search when only one character has been input', () => {
            // setup mock redux actions for handling search results
            const mockReduxAction = jest.fn();

            // setup the agency list container and call the function to type a single letter
            const searchBarContainer = setup({
                setAgencySearchString: jest.fn(),
                setNoResults: jest.fn(),
                setAutocompleteAgencies: mockReduxAction,
                autocompleteAgencies: [],
                agencies: mockAgencies
            });

            const performSecondarySearchSpy = sinon.spy(searchBarContainer.instance(),
                'performSecondarySearch');
            const handleTextInputSpy = sinon.spy(searchBarContainer.instance(),
                'handleTextInput');

            const searchQuery = {
                target: {
                    value: 'N'
                }
            };

            // Call handleTextInput function
            searchBarContainer.instance().handleTextInput(searchQuery);

            // Run fake timer for input delay
            jest.useFakeTimers().runTimersToTime(1000);

            // everything should be updated now
            expect(handleTextInputSpy.callCount).toEqual(1);
            expect(performSecondarySearchSpy.callCount).toEqual(1);
            // The redux action is called once in handleTextInput to reset
            expect(mockReduxAction).toHaveBeenCalledTimes(1);

            // reset the mocks and spies
            handleTextInputSpy.reset();
            performSecondarySearchSpy.reset();
        });

        it('should perform the search when more than one character has been entered', () => {
            // setup mock redux actions for handling search results
            const mockReduxAction = jest.fn();

            // setup the agency list container and call the function to type an input string
            const searchBarContainer = setup({
                setAgencySearchString: jest.fn(),
                setNoResults: jest.fn(),
                setAutocompleteAgencies: mockReduxAction,
                autocompleteAgencies: [],
                agencies: mockAgencies
            });

            // set up spies
            const handleTextInputSpy = sinon.spy(searchBarContainer.instance(),
                'handleTextInput');
            const performSecondarySearchSpy = sinon.spy(searchBarContainer.instance(),
                'performSecondarySearch');

            const searchQuery = {
                target: {
                    value: 'Department of'
                }
            };

            // Call handleTextInput function
            searchBarContainer.instance().handleTextInput(searchQuery);

            // Run fake timer for input delay
            jest.useFakeTimers().runTimersToTime(1000);

            // everything should be updated now
            expect(handleTextInputSpy.callCount).toEqual(1);
            expect(performSecondarySearchSpy.calledWith(handleTextInputSpy));

            // Reset spies
            handleTextInputSpy.reset();
            performSecondarySearchSpy.reset();
        });

        it('should populate Agencies with matching results after performing the search', () => {
            // Setup redux state
            // Only Agencies 1 & 3 have agency names with the substring we are using
            const reduxState = [
                new Agency({
                    "agency_id": 1,
                    "agency_name": ["", <span>Agen</span>, "cy 1"],
                    "budget_authority_amount": "1234567",
                    "percentage_of_total_budget_authority": "0.01211"
                }).toJS(),
                new Agency({
                    "agency_id": 3,
                    "agency_name": ["", <span>Agen</span>, "cy 3"],
                    "budget_authority_amount": "2345678",
                    "percentage_of_total_budget_authority": "0.02322"
                }).toJS()
            ];

            // setup mock redux actions for handling search results
            const mockReduxAction = jest.fn((args) => {
                expect(args[0].agency_id).toEqual(1);
                expect(args[1].agency_id).toEqual(3);
            });

            // setup the agency list container and call the function to type a single letter
            const searchBarContainer = setup({
                setAgencySearchString: jest.fn(),
                setNoResults: jest.fn(),
                setAutocompleteAgencies: mockReduxAction,
                autocompleteAgencies: reduxState,
                agencies: mockAgencies
            });

            // Set up spies
            const performSecondarySearchSpy = sinon.spy(searchBarContainer.instance(),
                'performSecondarySearch');

            searchBarContainer.instance().performSecondarySearch('Agen');

            expect(performSecondarySearchSpy.callCount).toEqual(1);
            expect(mockReduxAction).toHaveBeenCalled();

            // Reset spies
            performSecondarySearchSpy.reset();
        });
    });
});
