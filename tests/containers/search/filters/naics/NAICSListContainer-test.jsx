/**
 * NAICSListContainer-test.jsx
 * Created by Emily Gullo 7/26/2017
 */

import React from 'react';
import { mount } from 'enzyme';
import { OrderedMap } from 'immutable';

import NAICSListContainer from 'containers/search/filters/naics/NAICSListContainer';

import { mockNAICS } from './mockNAICS';

jest.mock('helpers/searchHelper', () => require('../searchHelper'));
jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;

const setup = (props) => mount(<NAICSListContainer {...props} />);

const initialFilters = {
    naics: []
};

jest.useFakeTimers();

describe('naicsListContainer', () => {
    describe('Handling text input', () => {
           it('should call the queryAutocompleteNAICS method 300ms after text input', () => {
            // setup the naics list container and call the function to type a single letter
            const naicsListContainer = setup(Object.assign({}, initialFilters, {
                selectedNAICS: new OrderedMap(),
                selectNAICS: jest.fn()
            }));
            naicsListContainer.instance().queryAutocompleteNAICS = jest.fn();

            const searchQuery = {
                target: {
                    value: '3'
                }
            };
            
            // Call handleTextInput function
            naicsListContainer.instance().handleTextInput(searchQuery);

            // // Run fake timer for input delay
            jest.runTimersToTime(1000);

            // everything should be updated now
            expect(naicsListContainer.instance().queryAutocompleteNAICS).toHaveBeenCalledTimes(1);
        });

        it('should not search when only one character has been input', () => {
            // setup the naics list container and call the function to type a single letter
            const naicsListContainer = setup(Object.assign({}, initialFilters, {
                selectedNAICS: new OrderedMap(),
                selectNAICS: jest.fn()
            }));
            naicsListContainer.instance().parseAutocompleteNAICS = jest.fn();

            // Call handleTextInput function
            naicsListContainer.instance().queryAutocompleteNAICS('1');
            expect(naicsListContainer.instance().parseAutocompleteNAICS).toHaveBeenCalledTimes(0);
        });

        it('should make a NAICS autocomplete API call when more than one character has '
            + 'been input in the NAICS field', async () => {
            // setup the naics list container and call the function to type a single letter
            const naicsListContainer = setup(Object.assign({}, initialFilters, {
                selectedNAICS: new OrderedMap(),
                selectNAICS: jest.fn()
            }));
            naicsListContainer.instance().parseAutocompleteNAICS = jest.fn();

            naicsListContainer.instance().queryAutocompleteNAICS('10');

            await naicsListContainer.instance().naicsSearchRequest.promise;

            // everything should be updated now
            expect(naicsListContainer.instance().parseAutocompleteNAICS).toHaveBeenCalledTimes(1);
        });

        it('should populate NAICS after performing the search', async () => {
            // setup the naics list container and call the function to type a single letter
            const naicsListContainer = setup(Object.assign({}, initialFilters, {
                selectedNAICS: new OrderedMap(),
                selectNAICS: jest.fn()
            }));

            naicsListContainer.instance().queryAutocompleteNAICS('33');
            await naicsListContainer.instance().naicsSearchRequest.promise;

            expect(naicsListContainer.state().autocompleteNAICS.length).toEqual(mockNAICS.results.length);
        });

        it('should clear NAICS when the Autocomplete tells it to', () => {
            const naicsListContainer = setup(Object.assign({}, initialFilters, {
                selectedNAICS: new OrderedMap(),
                selectNAICS: jest.fn()
            }));

            naicsListContainer.setState({
                autocompleteNAICS: [{
                    name: "fake"
                }]
            });
            naicsListContainer.instance().clearAutocompleteSuggestions();

            // Run all ticks
            jest.runAllTicks();

            expect(naicsListContainer.state().autocompleteNAICS.length).toEqual(0);
        });
    });
});
