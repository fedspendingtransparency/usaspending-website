/**
 * @jest-environment jsdom
 *
 * GeoVisualizationSectionContainer-test.jsx
 * Created by Josue Aguilar 1/16/2024
 */

import React from 'react';
import { mockReduxFilters } from './mocks/geoHelper';
import { render, screen } from '../../../../testResources/test-utils';
import GeoVisualizationSectionContainer
    from "../../../../../src/js/containers/search/visualizations/geo/GeoVisualizationSectionContainer";

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
});
