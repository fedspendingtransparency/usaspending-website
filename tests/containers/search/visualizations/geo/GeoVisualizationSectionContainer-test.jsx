/**
 * @jest-environment jsdom
 *
 * GeoVisualizationSectionContainer-test.jsx
 * Created by Josue Aguilar 1/16/2024
 */

import React from 'react';
import { performSpendingByGeographySearch, mockReduxFilters } from './mocks/geoHelper';
import { render, screen } from '../../../../testResources/test-utils';
import GeoVisualizationSectionContainer
    from "../../../../../src/js/containers/search/visualizations/geo/GeoVisualizationSectionContainer";
import GeoVisualizationSection
    from "../../../../../src/js/components/search/visualizations/geo/GeoVisualizationSection";

jest.mock('../../../../../src/js/components/search/visualizations/geo/GeoVisualizationSection', () => jest.fn(() => null));

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

        const GeoVisDom = screen.getByText('hellow');

        expect(GeoVisDom).toBeTruthy();
    });
});
