/**
 * GeoVisualizationSectionContainer-test.jsx
 * Created by Kevin Li 2/24/17
 */

import React from 'react';
import { mount, shallow } from 'enzyme';
import sinon from 'sinon';

import { Set } from 'immutable';

import { GeoVisualizationSectionContainer } from
    'containers/search/visualizations/geo/GeoVisualizationSectionContainer';
import MapBroadcaster from 'helpers/mapBroadcaster';

import { defaultFilters } from '../../../../testResources/defaultReduxFilters';
import { geo as mockApi } from '../mockVisualizations';

jest.mock('helpers/searchHelper', () => require('./mocks/geoHelper'));
jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;

// mock the child component by replacing it with a function that returns a null element
jest.mock('components/search/visualizations/geo/GeoVisualizationSection', () =>
    jest.fn(() => null));

// spy on specific functions inside the component
const fetchDataSpy = sinon.spy(GeoVisualizationSectionContainer.prototype, 'fetchData');
const prepareFetchSpy = sinon.spy(GeoVisualizationSectionContainer.prototype, 'prepareFetch');

const mockedReduxMeta = {
    visualization: {
        transaction_sum: 50000
    }
};

describe('GeoVisualizationSectionContainer', () => {
    it('should wait for the map to be loaded before making any API requests', () => {
        jest.useFakeTimers();

        // mount the container
        const container = mount(<GeoVisualizationSectionContainer
            setAppliedFilterCompletion={jest.fn()}
            reduxFilters={defaultFilters}
            resultsMeta={mockedReduxMeta} />);
        expect(fetchDataSpy.callCount).toEqual(0);
        expect(prepareFetchSpy.callCount).toEqual(0);
        expect(container.state().loadingTiles).toBeTruthy();

        MapBroadcaster.emit('mapReady');
        // there is a 300ms delay before the prepareFetch function is called
        jest.runAllTimers();
        expect(prepareFetchSpy.callCount).toEqual(1);
        expect(container.state().loadingTiles).toBeFalsy();

        // reset the spy
        prepareFetchSpy.reset();
    });

    it('should remeasure the map in preparation of an API change whenever the Redux filters change', () => {
        const initialFilters = Object.assign({}, defaultFilters);
        const secondFilters = Object.assign({}, defaultFilters, {
            timePeriodType: 'fy',
            timePeriodFY: new Set(['2014', '2015'])
        });

        // mount the container
        const container =
            mount(<GeoVisualizationSectionContainer
                setAppliedFilterCompletion={jest.fn()}
                reduxFilters={initialFilters}
                resultsMeta={mockedReduxMeta} />);

        // the first API call should have been called
        expect(prepareFetchSpy.callCount).toEqual(0);

        // now update the props
        container.setProps({
            reduxFilters: secondFilters
        });

        // the first API call should have been called
        expect(prepareFetchSpy.callCount).toEqual(1);

        // reset the spy
        prepareFetchSpy.reset();
    });

    describe('changeScope', () => {
        it('should set the scope to place of performance when requested', () => {
            // mount the container
            const container = mount(<GeoVisualizationSectionContainer
                setAppliedFilterCompletion={jest.fn()}
                reduxFilters={defaultFilters}
                resultsMeta={mockedReduxMeta} />);

            // toggle it back and forth from recipient to pop
            container.instance().changeScope('recipient');
            container.instance().changeScope('place_of_performance');
            expect(container.state().scope).toEqual('place_of_performance');
        });

        it('should set the scope to recipient when requested', () => {
            // mount the container
            const container = mount(<GeoVisualizationSectionContainer
                setAppliedFilterCompletion={jest.fn()}
                reduxFilters={defaultFilters}
                resultsMeta={mockedReduxMeta} />);

            // toggle it back and forth from recipient to pop
            container.instance().changeScope('place_of_performance');
            container.instance().changeScope('recipient');
            expect(container.state().scope).toEqual('recipient');
        });

        it('should request a map measurement operation if the scope has changed', () => {
            const container = mount(<GeoVisualizationSectionContainer
                setAppliedFilterCompletion={jest.fn()}
                reduxFilters={defaultFilters}
                resultsMeta={mockedReduxMeta} />);
            const mockPrepare = jest.fn();
            container.instance().prepareFetch = mockPrepare;

            container.setState({
                scope: 'place_of_performance'
            });
            container.instance().changeScope('recipient');
            expect(mockPrepare).toHaveBeenCalledTimes(1);
        });

        it('should not request a map measurement operation if the scope has not changed', () => {
            const container = mount(<GeoVisualizationSectionContainer
                setAppliedFilterCompletion={jest.fn()}
                reduxFilters={defaultFilters}
                resultsMeta={mockedReduxMeta} />);
            const mockPrepare = jest.fn();
            container.instance().prepareFetch = mockPrepare;

            container.setState({
                scope: 'place_of_performance'
            });
            container.instance().changeScope('place_of_performance');
            expect(mockPrepare).toHaveBeenCalledTimes(0);
        });
    });

    describe('mapLoaded', () => {
        it('should set the loadingTiles state to false', () => {
            const container = mount(<GeoVisualizationSectionContainer
                setAppliedFilterCompletion={jest.fn()}
                reduxFilters={defaultFilters}
                resultsMeta={mockedReduxMeta} />);
            container.instance().mapLoaded();

            expect(container.state().loadingTiles).toBeFalsy();
        });
        it('should call the prepareFetch method', () => {
            jest.useFakeTimers();
            const container = mount(<GeoVisualizationSectionContainer
                setAppliedFilterCompletion={jest.fn()}
                reduxFilters={defaultFilters}
                resultsMeta={mockedReduxMeta} />);
            const mockPrepare = jest.fn();
            container.instance().prepareFetch = mockPrepare;

            container.instance().mapLoaded();
            jest.runAllTimers();
            expect(mockPrepare).toHaveBeenCalledTimes(1);
        });
    });

    describe('prepareFetch', () => {
        it('should stop if the tiles are still loading', () => {
            const mockListener = jest.fn();
            // attach the mock listener to the MapBroadcaster
            const attached = MapBroadcaster.on('measureMap', mockListener);

            const container = mount(<GeoVisualizationSectionContainer
                setAppliedFilterCompletion={jest.fn()}
                reduxFilters={defaultFilters}
                resultsMeta={mockedReduxMeta} />);
            container.setState({
                loadingTiles: true
            });

            container.instance().prepareFetch();

            expect(mockListener).toHaveBeenCalledTimes(0);

            // unattach the mock listener
            MapBroadcaster.off(attached.event, attached.id);
        });

        it('should emit a request to measure the current map entities if the tiles have loaded', () => {
            const mockListener = jest.fn();
            // attach the mock listener to the MapBroadcaster
            const attached = MapBroadcaster.on('measureMap', mockListener);

            const container = mount(<GeoVisualizationSectionContainer
                setAppliedFilterCompletion={jest.fn()}
                reduxFilters={defaultFilters}
                resultsMeta={mockedReduxMeta} />);
            container.setState({
                loadingTiles: false
            });

            container.instance().prepareFetch();
            expect(mockListener).toHaveBeenCalledTimes(1);

            // unattach the mock listener
            MapBroadcaster.off(attached.event, attached.id);
        });
    });

    describe('receivedEntities', () => {
        it('should set the state to the returned entities', () => {
            const container = mount(<GeoVisualizationSectionContainer
                setAppliedFilterCompletion={jest.fn()}
                reduxFilters={defaultFilters}
                resultsMeta={mockedReduxMeta} />);
            container.setState({
                visibleEntities: []
            });

            container.instance().receivedEntities(['A', 'B', 'C']);

            expect(container.state().visibleEntities).toEqual(['A', 'B', 'C']);
        });

        it('should make an API call using the returned entities', () => {
            const container = mount(<GeoVisualizationSectionContainer
                setAppliedFilterCompletion={jest.fn()}
                reduxFilters={defaultFilters}
                resultsMeta={mockedReduxMeta} />);
            const mockFetch = jest.fn();
            container.instance().fetchData = mockFetch;

            container.setState({
                visibleEntities: []
            });

            container.instance().receivedEntities(['A', 'B', 'C']);

            expect(mockFetch).toHaveBeenCalledTimes(1);
        });
    });

    describe('Map Toggle Data Key', () => {
        it('should return aggregate amount', () => {
            const container = shallow(<GeoVisualizationSectionContainer
                setAppliedFilterCompletion={jest.fn()}
                reduxFilters={defaultFilters}
                resultsMeta={mockedReduxMeta}
                mapLegendToggle="totalSpending" />);
            const data = container.instance().mapToggleDataKey();
            expect(data).toEqual('aggregated_amount');
        });
        it('should return per capita amount', () => {
            const container = shallow(<GeoVisualizationSectionContainer
                setAppliedFilterCompletion={jest.fn()}
                reduxFilters={defaultFilters}
                resultsMeta={mockedReduxMeta}
                mapLegendToggle="perCapita" />);
            const data = container.instance().mapToggleDataKey();
            expect(data).toEqual('per_capita');
        });
    });

    describe('Values Locations Labels From API Data', () => {
        it('should properly parse the API response for the map visualization', async () => {
            // mount the container
            const container = shallow(<GeoVisualizationSectionContainer
                setAppliedFilterCompletion={jest.fn()}
                reduxFilters={defaultFilters}
                resultsMeta={mockedReduxMeta}
                mapLegendToggle="totalSpending" />);
            container.setState({ rawAPIData: mockApi.results });
            const data = container.instance().valuesLocationsLabelsFromAPIData();

            const expectedState = {
                values: [123.12, 345.56],
                locations: ['AK', 'AL'],
                labels: {
                    AK: {
                        label: 'Alaska',
                        value: 123.12
                    },
                    AL: {
                        label: 'Alabama',
                        value: 345.56
                    }
                }
            };
            expect(data.values).toEqual(expectedState.values);
            expect(data.locations).toEqual(expectedState.locations);
            expect(data.labels).toEqual(expectedState.labels);

            // reset the spy
            fetchDataSpy.reset();
        });
    });

    describe('changeMapLayer', () => {
        it('should update the mapLayer state when a new map tileset is requested', () => {
            const container = mount(<GeoVisualizationSectionContainer
                setAppliedFilterCompletion={jest.fn()}
                reduxFilters={defaultFilters}
                resultsMeta={mockedReduxMeta} />);
            expect(container.state().mapLayer).toEqual('state');

            container.instance().changeMapLayer('county');
            expect(container.state().mapLayer).toEqual('county');
        });
        it('should make a new renderHash when a new map tileset is requested', () => {
            const container = mount(<GeoVisualizationSectionContainer
                setAppliedFilterCompletion={jest.fn()}
                reduxFilters={defaultFilters}
                resultsMeta={mockedReduxMeta} />);
            const originalHash = `${container.state().renderHash}`;

            container.instance().changeMapLayer('county');
            expect(container.state().renderHash).not.toEqual(originalHash);
        });
        it('should update the mapLayer state when a new map tileset is requested', () => {
            const container = mount(<GeoVisualizationSectionContainer
                setAppliedFilterCompletion={jest.fn()}
                reduxFilters={defaultFilters}
                resultsMeta={mockedReduxMeta} />);
            container.setState({
                loadingTiles: false
            });

            expect(container.state().loadingTiles).toBeFalsy();

            container.instance().changeMapLayer('county');
            expect(container.state().loadingTiles).toBeTruthy();
        });
        it('should request a map measurement operation', () => {
            const container = mount(<GeoVisualizationSectionContainer
                setAppliedFilterCompletion={jest.fn()}
                reduxFilters={defaultFilters}
                resultsMeta={mockedReduxMeta} />);
            const mockPrepare = jest.fn();
            container.instance().prepareFetch = mockPrepare;

            expect(mockPrepare).toHaveBeenCalledTimes(0);

            container.instance().changeMapLayer('county');
            expect(mockPrepare).toHaveBeenCalledTimes(1);
        });
    });
});
