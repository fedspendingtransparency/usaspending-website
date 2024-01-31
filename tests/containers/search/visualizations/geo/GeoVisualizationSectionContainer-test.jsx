/**
 * @jest-environment jsdom
 *
 * GeoVisualizationSectionContainer-test.jsx
 * Created by Josue Aguilar 1/16/2024
 */

import React from 'react';
import { mockReduxFilters, mockApiRequestResponse } from './mocks/geoHelper';
import { render, screen, waitFor, act } from '../../../../testResources/test-utils';
import GeoVisualizationSectionContainer
    from "../../../../../src/js/containers/search/visualizations/geo/GeoVisualizationSectionContainer";
import mapBroadcaster from "../../../../../src/js/helpers/mapBroadcaster";
import * as search from "../../../../../src/js/apis/search";

jest.mock('../../../../../src/js/components/search/visualizations/geo/GeoVisualizationSection', () => (childProps) => (<div>{JSON.stringify(childProps)}</div>));

const mockProps = {
    reduxFilter: mockReduxFilters,
    setAppliedFilterCompletion: jest.fn(),
    noApplied: false,
    subaward: false,
    mapLegendToggle: 'totalSpending',
    updateMapLegendToggle: jest.fn(),
    className: 'award-search__geo-toggle'
};

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

    it('runs receivedEntities()', async () => {
        const useRefSpy = jest.spyOn(React, 'useRef').mockReturnValue({ current: { visibleEntities: false } });

        jest.spyOn(search, 'performSpendingByGeographySearch').mockReturnValue({
            promise: Promise.resolve(mockApiRequestResponse)
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
            const test = screen.getByText('"locations":["WA","OR","WI"]', { exact: false });

            expect(test).toBeTruthy();
        });

        expect(useRefSpy).toHaveBeenCalled();
    });
});
