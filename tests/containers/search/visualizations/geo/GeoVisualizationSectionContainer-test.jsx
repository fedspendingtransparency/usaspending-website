/**
 * GeoVisualizationSectionContainer-test.jsx
 * Created by Kevin Li 2/24/17
 */

import React from 'react';
import { mount } from 'enzyme';
import sinon from 'sinon';

import { Set } from 'immutable';

import { GeoVisualizationSectionContainer } from
    'containers/search/visualizations/geo/GeoVisualizationSectionContainer';

import { defaultFilters } from '../../../../testResources/defaultReduxFilters';

jest.mock('helpers/searchHelper', () => require('./mocks/geoHelper'));
jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;

// mock the child component by replacing it with a function that returns a null element
jest.mock('components/search/visualizations/geo/GeoVisualizationSection', () =>
    jest.fn(() => null));

// spy on specific functions inside the component
const fetchDataSpy = sinon.spy(GeoVisualizationSectionContainer.prototype, 'fetchData');

const mockedReduxMeta = {
    visualization: {
        transaction_sum: 50000
    }
};

describe('GeoVisualizationSectionContainer', () => {
    it('should make an API request on mount', async () => {
        // mount the container
        const container = mount(<GeoVisualizationSectionContainer
            reduxFilters={defaultFilters}
            resultsMeta={mockedReduxMeta} />);

        await container.instance().apiRequest.promise;

        // everything should be updated now
        expect(fetchDataSpy.callCount).toEqual(1);

        // reset the spy
        fetchDataSpy.reset();
    });

    it('should make an API request when the Redux filters change', async () => {
        const initialFilters = Object.assign({}, defaultFilters);
        const secondFilters = Object.assign({}, defaultFilters, {
            timePeriodType: 'fy',
            timePeriodFY: new Set(['2014', '2015'])
        });

        // mount the container
        const container =
            mount(<GeoVisualizationSectionContainer
                reduxFilters={initialFilters}
                resultsMeta={mockedReduxMeta} />);

        await container.instance().apiRequest.promise;

        // the first API call should have been called
        expect(fetchDataSpy.callCount).toEqual(1);

        // now update the props
        container.setProps({
            reduxFilters: secondFilters
        });

        // the first API call should have been called
        expect(fetchDataSpy.callCount).toEqual(2);

        // reset the spy
        fetchDataSpy.reset();
    });

    describe('parseData', () => {
        it('should properly resture the API response for the map visualization', async () => {
            // mount the container
            const container = mount(<GeoVisualizationSectionContainer
                reduxFilters={defaultFilters}
                resultsMeta={mockedReduxMeta} />);

            await container.instance().apiRequest.promise;

            const expectedState = {
                data: {
                    values: [123.12, 345.56],
                    states: ['AK', 'AL']
                },
                loading: false
            };

            const actualState = container.state();
            // remove some keys (especially since renderHash is not known)
            delete actualState.scope;
            delete actualState.renderHash;

            expect(actualState).toEqual(expectedState);

            // reset the spy
            fetchDataSpy.reset();
        });
    });

    describe('changeScope', () => {
        it('should set the scope to place of performance when requested', () => {
             // mount the container
            const container = mount(<GeoVisualizationSectionContainer
                reduxFilters={defaultFilters}
                resultsMeta={mockedReduxMeta} />);

            // toggle it back and forth from recipient to pop
            container.instance().changeScope('recipient');
            container.instance().changeScope('pop');
            expect(container.state().scope).toEqual('pop');
        });

        it('should set the scope to recipient when requested', () => {
             // mount the container
            const container = mount(<GeoVisualizationSectionContainer
                reduxFilters={defaultFilters}
                resultsMeta={mockedReduxMeta} />);

            // toggle it back and forth from recipient to pop
            container.instance().changeScope('pop');
            container.instance().changeScope('recipient');
            expect(container.state().scope).toEqual('recipient');
        });
    });
});
