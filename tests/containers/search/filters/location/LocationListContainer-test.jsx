/**
 * LocationListContainer-test.jsx
 * Created by Kevin Li 9/13/17
 */

import React from 'react';
import { shallow } from 'enzyme';
import { OrderedMap } from 'immutable';

import { LocationListContainer } from 'containers/search/filters/location/LocationListContainer';
import { mockApi, mockRedux, mockActions } from './mockLocations';
import { mockRecipientLocation } from '../recipientFilter/mockRecipients';

jest.mock('helpers/searchHelper', () => require('../searchHelper'));

jest.useFakeTimers();

describe('LocationListContainer', () => {
    describe('parseAutocompleteLocations', () => {
        it('should create an array of location objects', () => {
            const container = shallow(<LocationListContainer
                {...mockRedux}
                {...mockActions} />);
            container.instance().parseAutocompleteLocations(mockApi);

            expect(container.state().autocompleteLocations).toHaveLength(1);

            const autocompleteItem = container.state().autocompleteLocations[0];
            expect(autocompleteItem.data).toEqual(mockApi[0]);
            expect(autocompleteItem.title).toEqual('PAWNEE');
            expect(autocompleteItem.subtitle).toEqual('CITY in INDIANA');
        });
    });

    describe('queryAutocompleteLocations', () => {
        it('should make an API call for autocompleted locations', async () => {
            const mockSet = jest.fn();

            const actions = Object.assign({}, mockActions, {
                setAutocompleteLocations: mockSet
            });

            const container = shallow(<LocationListContainer
                {...mockRedux}
                {...actions} />);

            container.instance().queryAutocompleteLocations('blerg');

            await container.instance().locationSearchRequest.promise;

            expect(mockSet).toHaveBeenCalledTimes(1);
            expect(mockSet).toHaveBeenCalledWith(mockRecipientLocation);
        });

        it('should not display any already-selected locations', async () => {
            const mockSet = jest.fn();

            const actions = Object.assign({}, mockActions, {
                setAutocompleteLocations: mockSet
            });

            const redux = Object.assign({}, mockRedux, {
                selectedLocations: new OrderedMap({
                    '22516,23056_MCLEAN_CITY': {
                        place_type: 'CITY',
                        place: 'MCLEAN',
                        parent: null,
                        matched_ids: [22516, 23056],
                        identifier: '22516,23056_MCLEAN_CITY'
                    }
                })
            });

            const container = shallow(<LocationListContainer
                {...redux}
                {...actions} />);

            container.instance().queryAutocompleteLocations('blerg');

            await container.instance().locationSearchRequest.promise;

            expect(mockSet).toHaveBeenCalledTimes(1);
            expect(mockSet).toHaveBeenCalledWith([]);
        });
    });

    describe('handleTextInput', () => {
        it('should trigger an API call 300ms after text input', async () => {
            const container = shallow(<LocationListContainer
                {...mockRedux}
                {...mockActions} />);

            const mockQuery = jest.fn();
            container.instance().queryAutocompleteLocations = mockQuery;

            container.instance().handleTextInput({
                target: {
                    value: 'blerg'
                }
            });

            // Run fake timer for input delay
            jest.useFakeTimers().runTimersToTime(1000);

            // everything should be updated now
            expect(mockQuery).toHaveBeenCalledTimes(1);
            expect(mockQuery).toHaveBeenCalledWith('blerg');
        });
    });
});
