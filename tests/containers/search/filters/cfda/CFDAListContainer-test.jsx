/**
 * CFDAListContainer-test.jsx
 * Created by Emily Gullo 7/26/2017
 */

import React from 'react';
import { mount } from 'enzyme';
import { OrderedMap } from 'immutable';

import CFDAListContainer from 'containers/search/filters/cfda/CFDAListContainer';

import { mockCFDA } from './mockCFDA';

jest.mock('helpers/searchHelper', () => require('../searchHelper'));
jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;

const setup = (props) => mount(<CFDAListContainer {...props} />);

const initialFilters = {
    cfda: []
};

jest.useFakeTimers();

describe('CFDAListContainer', () => {
    describe('Handling text input', () => {
        it('should not search when only one character has been input', () => {
            // setup the cfda list container and call the function to type a single letter
            const cfdaListContainer = setup(Object.assign({}, initialFilters, {
                selectedCFDA: new OrderedMap(),
                selectCFDA: jest.fn()
            }));
            cfdaListContainer.instance().parseAutocompleteCFDA = jest.fn();

            // Call handleTextInput function
            cfdaListContainer.instance().queryAutocompleteCFDA('1');
            expect(cfdaListContainer.instance().parseAutocompleteCFDA).toHaveBeenCalledTimes(0);
        });

        it('should make a CFDA autocomplete API call when more than one character has '
            + 'been input in the CFDA field', async () => {
            // setup the cfda list container and call the function to type a single letter
            const cfdaListContainer = setup(Object.assign({}, initialFilters, {
                selectedCFDA: new OrderedMap(),
                selectCFDA: jest.fn()
            }));
            cfdaListContainer.instance().parseAutocompleteCFDA = jest.fn();

            const searchQuery = {
                target: {
                    value: '10'
                }
            };

            cfdaListContainer.instance().queryAutocompleteCFDA('10');

            await cfdaListContainer.instance().cfdaSearchRequest.promise;

            // everything should be updated now
            expect(cfdaListContainer.instance().parseAutocompleteCFDA).toHaveBeenCalledTimes(1);
        });

        it('should populate CFDA after performing the search', async () => {
            // setup the cfda list container and call the function to type a single letter
            const cfdaListContainer = setup(Object.assign({}, initialFilters, {
                selectedCFDA: new OrderedMap(),
                selectCFDA: jest.fn()
            }));

            cfdaListContainer.instance().queryAutocompleteCFDA('10');
            await cfdaListContainer.instance().cfdaSearchRequest.promise;

            expect(cfdaListContainer.state().autocompleteCFDA.length).toEqual(mockCFDA.results.length);
        });

        it('should clear CFDA when the Autocomplete tells it to', () => {
            const cfdaListContainer = setup(Object.assign({}, initialFilters, {
                selectedCFDA: new OrderedMap(),
                selectCFDA: jest.fn()
            }));

            cfdaListContainer.setState({
                autocompleteCFDA: [{
                    name: 'mock item'
                }]
            });
            cfdaListContainer.instance().clearAutocompleteSuggestions();

            // Run all ticks
            jest.runAllTicks();

            expect(cfdaListContainer.state().autocompleteCFDA.length).toEqual(0);
        });
    });
});
