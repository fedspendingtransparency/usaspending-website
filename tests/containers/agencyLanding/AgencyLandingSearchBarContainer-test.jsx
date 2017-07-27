/**
 * AgencyLandingContainer-test.jsx
 * Created by Lizzie Salita 7/18/17
 */

import React from 'react';
import { mount, shallow } from 'enzyme';
import sinon from 'sinon';
import Immutable from 'immutable';

import { AgencyLandingSearchBarContainer } from
    'containers/agencyLanding/AgencyLandingSearchBarContainer';
import { AgencyLandingSearchBar } from
    'components/agencyLanding/AgencyLandingSearchBar';
import * as agencyLandingActions from 'redux/actions/agencyLanding/agencyLandingActions';

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
                autocompleteAgencies: []
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

        it('should call the queryAutocompleteAgencies method after text input', () => {
            // setup the search bar container and call the function to type a single letter
            const searchBarContainer = setup({
                setAgencySearchString: jest.fn(),
                setNoResults: jest.fn(),
                setAutocompleteAgencies: agencyLandingActions.setAutocompleteAgencies,
                autocompleteAgencies: []
            });

            const searchQuery = {
                target: {
                    value: 'N'
                }
            };

            const handleTextInputSpy = sinon.spy(searchBarContainer.instance(),
                'handleTextInput');
            const queryAutocompleteAgenciesSpy = sinon.spy(searchBarContainer.instance(),
                'queryAutocompleteAgencies');

            // Call handleTextInput function
            searchBarContainer.instance().handleTextInput(searchQuery);

            // Run fake timer for input delay
            jest.useFakeTimers().runTimersToTime(1000);

            // everything should be updated now
            expect(handleTextInputSpy.callCount).toEqual(1);
            expect(queryAutocompleteAgenciesSpy.callCount).toEqual(1);

            // reset the spies
            handleTextInputSpy.reset();
            queryAutocompleteAgenciesSpy.reset();
        });
        it('should not search when only one character has been input', () => {
            // setup mock redux actions for handling search results
            const mockReduxAction = jest.fn();

            // setup the agency list container and call the function to type a single letter
            const searchBarContainer = setup({
                setAgencySearchString: jest.fn(),
                setNoResults: jest.fn(),
                setAutocompleteAgencies: mockReduxAction,
                autocompleteAgencies: []
            });

            const queryAutocompleteAgenciesSpy = sinon.spy(searchBarContainer.instance(),
                'queryAutocompleteAgencies');
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
            expect(queryAutocompleteAgenciesSpy.callCount).toEqual(1);
            // The redux action is called once in handleTextInput to reset
            expect(mockReduxAction).toHaveBeenCalledTimes(1);

            // reset the mocks and spies
            handleTextInputSpy.reset();
            queryAutocompleteAgenciesSpy.reset();
        });

        it('should perform the search when more than one character has been entered', () => {
            // setup mock redux actions for handling search results
            const mockReduxAction = jest.fn();

            // setup the agency list container and call the function to type an input string
            const searchBarContainer = setup({
                setAgencySearchString: jest.fn(),
                setNoResults: jest.fn(),
                setAutocompleteAgencies: mockReduxAction,
                autocompleteAgencies: []
            });

            // set up spies
            const handleTextInputSpy = sinon.spy(searchBarContainer.instance(),
                'handleTextInput');
            const queryAutocompleteAgenciesSpy = sinon.spy(searchBarContainer.instance(),
                'queryAutocompleteAgencies');

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
            expect(queryAutocompleteAgenciesSpy.calledWith(handleTextInputSpy));

            // Reset spies
            handleTextInputSpy.reset();
            queryAutocompleteAgenciesSpy.reset();
        });

        it('should populate Agencies after performing the search', async () => {
            // Setup redux state
            const reduxState = [1, 2];

            // setup mock redux actions for handling search results
            const mockReduxAction = jest.fn((args) => {
                expect(args).toEqual(reduxState);
            });

            // setup the agency list container and call the function to type a single letter
            const searchBarContainer = setup({
                setAgencySearchString: jest.fn(),
                setNoResults: jest.fn(),
                setAutocompleteAgencies: mockReduxAction,
                autocompleteAgencies: reduxState
            });

            // Set up spies
            const queryAutocompleteAgenciesSpy = sinon.spy(searchBarContainer.instance(),
                'queryAutocompleteAgencies');
            const performSecondarySearchSpy = sinon.spy(searchBarContainer.instance(),
                'performSecondarySearch');

            searchBarContainer.instance().queryAutocompleteAgencies('Department of');
            await searchBarContainer.instance().agencySearchRequest.promise;

            expect(queryAutocompleteAgenciesSpy.callCount).toEqual(1);
            expect(performSecondarySearchSpy.calledWith(queryAutocompleteAgenciesSpy));
            expect(mockReduxAction).toHaveBeenCalled();

            // Reset spies
            queryAutocompleteAgenciesSpy.reset();
            performSecondarySearchSpy.reset();
        });
    });
});
