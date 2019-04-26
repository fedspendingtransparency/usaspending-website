/**
 * GeoVisualizationSectionContainer-test.jsx
 * Created by Lizzie Salita 5/18/18
 */

import React from 'react';
import { mount } from 'enzyme';

import { GeoVisualizationSectionContainer } from
        'containers/state/visualizations/geo/GeoVisualizationSectionContainer';
import MapBroadcaster from 'helpers/mapBroadcaster';
import { mockActions, mockRedux, mockGeoApi } from "../../mockData";

// mock the child component by replacing it with a function that returns a null element
jest.mock('components/state/visualizations/geo/GeoVisualizationSection', () =>
    jest.fn(() => null));

describe('GeoVisualizationSectionContainer', () => {
    it('should wait for the map to be loaded before making any API requests', () => {
        jest.useFakeTimers();

        const container = mount(<GeoVisualizationSectionContainer
            {...mockRedux}
            {...mockActions} />);

        const fetchData = jest.fn();
        container.instance().fetchData = fetchData;

        const prepareFetch = jest.fn();
        container.instance().prepareFetch = prepareFetch;

        expect(fetchData).toHaveBeenCalledTimes(0);
        expect(prepareFetch).toHaveBeenCalledTimes(0);
        expect(container.state().loadingTiles).toBeTruthy();

        MapBroadcaster.emit('mapReady');
        // there is a 300ms delay before the prepareFetch function is called
        jest.runAllTimers();

        expect(prepareFetch).toHaveBeenCalledTimes(1);
        expect(container.state().loadingTiles).toBeFalsy();
    });

    it('should remeasure the map in preparation of an API change whenever the Redux filters change', () => {
        const container = mount(<GeoVisualizationSectionContainer
            {...mockRedux}
            {...mockActions} />);

        const prepareFetch = jest.fn();
        container.instance().prepareFetch = prepareFetch;

        expect(prepareFetch).toHaveBeenCalledTimes(0);

        // now update the props
        const stateProfile = Object.assign({}, mockRedux.stateProfile, {
            fy: '2014'
        });

        container.setProps({
            stateProfile
        });

        // the first API call should have been called
        expect(prepareFetch).toHaveBeenCalledTimes(1);
    });

    it('should reset the map layer when the state id changes', () => {
        const container = mount(<GeoVisualizationSectionContainer
            {...mockRedux}
            {...mockActions} />);

        const changeMapLayer = jest.fn();
        container.instance().changeMapLayer = changeMapLayer;

        // update the state
        container.setState({
            mapLayer: 'congressionalDistrict'
        });

        expect(changeMapLayer).toHaveBeenCalledTimes(0);

        // update the props
        const stateProfile = Object.assign({}, mockRedux.stateProfile, {
            id: '13'
        });

        container.setProps({
            stateProfile
        });

        // changeMapLayer should have been called
        expect(changeMapLayer).toHaveBeenCalledTimes(1);
    });

    describe('mapLoaded', () => {
        it('should set the loadingTiles state to false', () => {
            const container = mount(<GeoVisualizationSectionContainer
                {...mockRedux}
                {...mockActions} />);
            container.instance().mapLoaded();

            expect(container.state().loadingTiles).toBeFalsy();
        });
        it('should call the prepareFetch method', () => {
            jest.useFakeTimers();
            const container = mount(<GeoVisualizationSectionContainer
                {...mockRedux}
                {...mockActions} />);
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
                {...mockRedux}
                {...mockActions} />);
            container.setState({
                loadingTiles: true
            });

            container.instance().prepareFetch();

            expect(mockListener).toHaveBeenCalledTimes(0);

            // unattach the mock listener
            MapBroadcaster.off(attached.event, attached.id);
        });
    });

    describe('parseData', () => {
        it('should properly parse the API response for the map visualization', () => {
            const container = mount(<GeoVisualizationSectionContainer
                {...mockRedux}
                {...mockActions} />);

            container.instance().parseData(mockGeoApi);

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
            expect(container.state().data).toEqual(expectedState);
        });
    });

    describe('changeMapLayer', () => {
        it('should update the mapLayer state when a new map tileset is requested', () => {
            const container = mount(<GeoVisualizationSectionContainer
                {...mockRedux}
                {...mockActions} />);
            expect(container.state().mapLayer).toEqual('county');

            container.instance().changeMapLayer('district');
            expect(container.state().mapLayer).toEqual('district');
        });
        it('should make a new renderHash when a new map tileset is requested', () => {
            const container = mount(<GeoVisualizationSectionContainer
                {...mockRedux}
                {...mockActions} />);
            const originalHash = `${container.state().renderHash}`;

            container.instance().changeMapLayer('district');
            expect(container.state().renderHash).not.toEqual(originalHash);
        });
        it('should update the mapLayer state when a new map tileset is requested', () => {
            const container = mount(<GeoVisualizationSectionContainer
                {...mockRedux}
                {...mockActions} />);
            container.setState({
                loadingTiles: false
            });

            expect(container.state().loadingTiles).toBeFalsy();

            container.instance().changeMapLayer('district');
            expect(container.state().loadingTiles).toBeTruthy();
        });
        it('should request a map measurement operation', () => {
            const container = mount(<GeoVisualizationSectionContainer
                {...mockRedux}
                {...mockActions} />);
            const mockPrepare = jest.fn();
            container.instance().prepareFetch = mockPrepare;

            expect(mockPrepare).toHaveBeenCalledTimes(0);

            container.instance().changeMapLayer('district');
            expect(mockPrepare).toHaveBeenCalledTimes(1);
        });
    });
});
