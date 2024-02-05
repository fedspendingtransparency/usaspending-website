/**
 * @jest-environment jsdom
 *
 * GeoVisualizationSectionContainer-test.jsx
 * Created by Josue Aguilar 1/16/2024
 */

import React from 'react';
import { createStore } from 'redux';
import { Provider } from "react-redux";
import { Set } from 'immutable';

import { mockReduxFilters, mockApiRequestResponse } from './mocks/geoHelper';
import { render, screen, waitFor, act } from '../../../../testResources/test-utils';
import GeoVisualizationSectionContainer
    from "../../../../../src/js/containers/search/visualizations/geo/GeoVisualizationSectionContainer";
import mapBroadcaster from "../../../../../src/js/helpers/mapBroadcaster";
import * as search from "../../../../../src/js/apis/search";
import appliedFiltersReducer from "../../../../../src/js/redux/reducers/search/appliedFiltersReducer";
import SearchAwardsOperation from "../../../../../src/js/models/v1/search/SearchAwardsOperation";

// mocking the child component to stringify the props being passed down.
// This allows us to search the string for proper props
jest.mock('../../../../../src/js/components/search/visualizations/geo/GeoVisualizationSection', () => (childProps) => (<div>{JSON.stringify(childProps)}</div>));

const mockProps = {
    reduxFilter: mockReduxFilters,
    setAppliedFilterCompletion: jest.fn(),
    noApplied: false,
    subaward: false,
    mapLegendToggle: 'totalSpending',
    updateMapLegendToggle: 'totalSpending',
    className: 'award-search__geo-toggle'
};

beforeEach(() => {
    jest.resetAllMocks();
});

describe('GeoVisualizationSectionContainer tests', () => {
    it('renders the container', () => {
        render(<GeoVisualizationSectionContainer {...mockProps} />);

        const test = screen.getByText('"className":"award-search__geo-toggle"', { exact: false });

        expect(test).toBeTruthy();
    });

    it('runs getFetch(), and returns without making API request', () => {
        const useRefSpy = jest.spyOn(React, 'useRef').mockReturnValue({ current: { visibleEntities: false } });

        render(<GeoVisualizationSectionContainer {...mockProps} />);

        const test = screen.getByText('"loading":false', { exact: false });

        expect(useRefSpy).toHaveBeenCalled();
        expect(test).toBeTruthy();
    });

    it('runs receivedEntities() and getFetch() with proper response', async () => {
        const useRefSpy = jest.spyOn(React, 'useRef').mockReturnValue({ current: { visibleEntities: false } });

        jest.spyOn(search, 'performSpendingByGeographySearch').mockReturnValue({
            promise: Promise.resolve(mockApiRequestResponse[0])
        });
        jest.mock('../../../../../src/js/helpers/mapBroadcaster', () => {
            const EventEmitter = require('events');
            const emitter = new EventEmitter();
            emitter.send = jest.fn();
            emitter.setConfig = jest.fn();
            return emitter;
        });

        render(<GeoVisualizationSectionContainer {...mockProps} />);

        act(() => {
            mapBroadcaster.emit('mapMeasureDone', ["WI", "WA", "OR"], false);
        });

        await waitFor(() => {
            const test = screen.getByText('"locations":["WA","OR","WI"]', { exact: false });

            expect(test).toBeTruthy();
        });

        expect(useRefSpy).toHaveBeenCalled();
    });

    it('runs receivedEntities() and getFetch() with error response', async () => {
        const useRefSpy = jest.spyOn(React, 'useRef').mockReturnValue({ current: { visibleEntities: false } });
        const consoleSpy = jest.spyOn(console, 'log');

        jest.spyOn(search, 'performSpendingByGeographySearch').mockReturnValue({
            promise: Promise.resolve({
                data: {
                    status: 'failed',
                    message: 'test error message'
                }
            })
        });
        jest.mock('../../../../../src/js/helpers/mapBroadcaster', () => {
            const EventEmitter = require('events');
            const emitter = new EventEmitter();
            emitter.send = jest.fn();
            emitter.setConfig = jest.fn();
            return emitter;
        });

        render(<GeoVisualizationSectionContainer {...mockProps} />);

        act(() => {
            mapBroadcaster.emit('mapMeasureDone', ["WI", "WA", "OR"], true);
        });

        await waitFor(() => {
            const test = screen.getByText('"error":true', { exact: false });

            expect(test).toBeTruthy();
        });

        expect(useRefSpy).toHaveBeenCalled();
        expect(consoleSpy).toHaveBeenCalled();
    });
    //
    // it('runs fetchData() and mapScopeLogic()', async () => {
    //     const mockRe = {
    //         appliedFilters: {
    //             filters: {
    //                 ...mockReduxFilters.filters,
    //                 selectedAwardingAgencies: Set([{ name: 'hellow' }]),
    //                 selectedFundingAgencies: Set([{ name: 'hellow' }]),
    //                 selectedLocations: Set([{
    //                     filter: {
    //                         state: true
    //                     }
    //                 }]),
    //                 selectedRecipientLocations: Set([])
    //             }
    //         },
    //         searchView: {
    //             subAward: false
    //         }
    //     };
    //     const mockStore = createStore(appliedFiltersReducer, mockRe);
    //
    //     const useRefSpy = jest.spyOn(React, 'useRef').mockReturnValue({ current: { visibleEntities: false } });
    //
    //     jest.spyOn(search, 'performSpendingByGeographySearch')
    //         .mockReturnValue({ promise: Promise.resolve(mockApiRequestResponse[0]) });
    //
    //     // jest.spyOn(SearchAwardsOperation, 'toParams').mockReturnValue({
    //     //     time_period: [
    //     //         {
    //     //             start_date: "2023-10-01",
    //     //             end_date: "2024-09-30"
    //     //         }
    //     //     ],
    //     //     place_of_performance_locations: [
    //     //         {
    //     //             state: "WI",
    //     //             country: "USA"
    //     //         }
    //     //     ]
    //     // });
    //
    //     const mockFromState = jest.fn(() => ({
    //         keyword: [],
    //         timePeriodType: "fy",
    //         timePeriodFY: [
    //             "2024"
    //         ],
    //         timePeriodRange: [],
    //         dateType: false,
    //         awardType: [],
    //         awardingAgencies: [],
    //         fundingAgencies: [],
    //         tasCheckbox: {
    //             require: [],
    //             exclude: []
    //         },
    //         tasSources: [],
    //         selectedRecipients: [],
    //         recipientDomesticForeign: "all",
    //         selectedRecipientLocations: [],
    //         recipientType: [],
    //         selectedLocations: [
    //             {
    //                 filter: {
    //                     state: "WI",
    //                     country: "USA"
    //                 },
    //                 display: {
    //                     title: "Wisconsin",
    //                     entity: "State",
    //                     standalone: "Wisconsin"
    //                 },
    //                 identifier: "USA_WI"
    //             }
    //         ],
    //         locationDomesticForeign: "all",
    //         awardAmounts: [],
    //         selectedAwardIDs: [],
    //         selectedCFDA: [],
    //         naicsCodes: {
    //             require: [],
    //             exclude: []
    //         },
    //         pscCheckbox: {
    //             require: [],
    //             exclude: []
    //         },
    //         defCodes: {
    //             require: [],
    //             exclude: []
    //         },
    //         pricingType: [],
    //         setAside: [],
    //         extentCompeted: []
    //     }));
    //     const mockToParams = jest.fn(() => ({
    //         time_period: [
    //             {
    //                 start_date: "2023-10-01",
    //                 end_date: "2024-09-30"
    //             }
    //         ],
    //         place_of_performance_locations: [
    //             {
    //                 state: "WI",
    //                 country: "USA"
    //             }
    //         ]
    //     }));
    //     jest.mock('../../../../../src/js/models/v1/search/SearchAwardsOperation', () => jest.fn().mockImplementation(() => ({
    //         fromState: mockFromState,
    //         toParams: mockToParams
    //     })));
    //
    //     jest.mock('../../../../../src/js/helpers/mapBroadcaster', () => {
    //         const EventEmitter = require('events');
    //         const emitter = new EventEmitter();
    //         emitter.send = jest.fn();
    //         emitter.setConfig = jest.fn();
    //         return emitter;
    //     });
    //
    //     render((
    //         <Provider store={mockStore}><GeoVisualizationSectionContainer {...mockProps} /></Provider>
    //     ));
    //
    //     act(() => {
    //         mapBroadcaster.emit('mapMeasureDone', ["WI", "WA", "OR"], false);
    //     });
    //
    //     await waitFor(() => {
    //         const testFirst = screen.getByText('"locations":["WA","OR","WI"]', { exact: false });
    //         expect(testFirst).toBeTruthy();
    //     });
    //
    //     expect(useRefSpy).toHaveBeenCalled();
    // });
});
