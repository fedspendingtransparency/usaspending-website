/**
 * PSCListContainer-test.jsx
 * Created by Emily Gullo 7/26/2017
 */

import React from 'react';
import { mount } from 'enzyme';
import { OrderedMap } from 'immutable';

import PSCListContainer from 'containers/search/filters/psc/PSCListContainer';

import { mockPSC } from './mockPSC';

jest.mock('helpers/searchHelper', () => require('../searchHelper'));
// mock the child component by replacing it with a function that returns a null element
jest.mock('components/sharedComponents/autocomplete/Autocomplete', () =>
    jest.fn(() => null));

jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;

const setup = (props) => mount(<PSCListContainer {...props} />);

const initialFilters = {
    psc: []
};

jest.useFakeTimers();

describe('pscListContainer', () => {
    describe('Handling text input', () => {
        it('should call the queryAutocompletePSC method 300ms after text input', () => {
            // setup the psc list container and call the function to type a single letter
            const pscListContainer = setup(Object.assign({}, initialFilters, {
                selectedPSC: new OrderedMap(),
                selectPSC: jest.fn()
            }));
            pscListContainer.instance().queryAutocompletePSC = jest.fn();

            const searchQuery = {
                target: {
                    value: '1'
                }
            };

            // Call handleTextInput function
            pscListContainer.instance().handleTextInput(searchQuery);

            // // Run fake timer for input delay
            jest.runTimersToTime(1000);

            // everything should be updated now
            expect(pscListContainer.instance().queryAutocompletePSC).toHaveBeenCalledTimes(1);
        });
        it('should not search when only one character has been input', () => {
            // setup mock redux actions for handling search results
            const mockReduxActionPSC = jest.fn();

            // setup the psc list container and call the function to type a single letter
            const pscListContainer = setup(Object.assign({}, initialFilters, {
                selectedPSC: new OrderedMap(),
                selectPSC: jest.fn()
            }));
            pscListContainer.instance().parseAutocompletePSC = jest.fn();

            // Call handleTextInput function
            pscListContainer.instance().queryAutocompletePSC('1');
            expect(pscListContainer.instance().parseAutocompletePSC).toHaveBeenCalledTimes(0);
        });

        it('should make a PSC autocomplete API call when more than one character has '
            + 'been input in the PSC field', async () => {
            // setup mock redux actions for handling search results
            const mockReduxActionPSC = jest.fn();

            // setup the psc list container and call the function to type a single letter
            const pscListContainer = setup(Object.assign({}, initialFilters, {
                selectedPSC: new OrderedMap(),
                selectPSC: jest.fn()
            }));
            pscListContainer.instance().parseAutocompletePSC = jest.fn();

            const searchQuery = {
                target: {
                    value: '10'
                }
            };

            pscListContainer.instance().queryAutocompletePSC('10');

            await pscListContainer.instance().pscSearchRequest.promise;

            // everything should be updated now
            expect(pscListContainer.instance().parseAutocompletePSC).toHaveBeenCalledTimes(1);
        });

        it('should populate PSC after performing the search', async () => {
            // setup mock redux actions for handling search results
            const mockReduxActionPSC = jest.fn();

            // setup the psc list container and call the function to type a single letter
            const pscListContainer = setup(Object.assign({}, initialFilters, {
                selectedPSC: new OrderedMap(),
                selectPSC: jest.fn()
            }));

            pscListContainer.instance().queryAutocompletePSC('33');
            await pscListContainer.instance().pscSearchRequest.promise;

            expect(pscListContainer.state().autocompletePSC.length).toEqual(mockPSC.results.length);
        });

        it('should clear PSC when the Autocomplete tells it to', () => {
            const pscListContainer = setup(Object.assign({}, initialFilters, {
                selectedPSC: new OrderedMap(),
                selectPSC: jest.fn()
            }));

            pscListContainer.setState({
                autocompletePSC: ["mock item"]
            });
            pscListContainer.instance().clearAutocompleteSuggestions();

            // Run all ticks
            jest.runAllTicks();

            expect(pscListContainer.state().autocompletePSC.length).toEqual(0);
        });
    });
});
