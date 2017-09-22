/**
 * RankVisualizationSectionContainer-test.jsx
 * Created by Kevin Li 2/12/17
 */

import React from 'react';
import { mount } from 'enzyme';
import sinon from 'sinon';

import { Set } from 'immutable';

import { SpendingByAwardingAgencyVisualizationContainer } from
    'containers/search/visualizations/rank/SpendingByAwardingAgencyVisualizationContainer';
import SpendingByAgencySection from
    'components/search/visualizations/rank/sections/SpendingByAgencySection';

import { defaultFilters } from '../../../../testResources/defaultReduxFilters';
import { mockComponent, unmockComponent } from '../../../../testResources/mockComponent';

jest.mock('helpers/searchHelper', () => require('./mocks/awardingAgencyHelper'));
jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;

// spy on specific functions inside the component
const fetchDataSpy = sinon.spy(SpendingByAwardingAgencyVisualizationContainer.prototype, 'fetchData');

describe('SpendingByAwardingAgencyVisualizationContainer', () => {
    beforeAll(() => {
        // we need to use mount() on the container to get the lifecycle logic, but enzyme doesn't
        // support the child component's SVG manipulation methods. This replaces all the child
        // component's lifecycle methods with mocked functions to avoid traversal into the SVG
        // components.
        mockComponent(SpendingByAgencySection);
    });

    it('should make an API request on mount', async () => {
        // mount the container
        const container =
            mount(<SpendingByAwardingAgencyVisualizationContainer reduxFilters={defaultFilters} />);

        await container.instance().apiRequest.promise;

        // everything should be updated now
        expect(fetchDataSpy.callCount).toEqual(1);

        // the page number should be equal to 1
        expect(container.state().page).toEqual(1);

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
            mount(<SpendingByAwardingAgencyVisualizationContainer reduxFilters={initialFilters} />);

        await container.instance().apiRequest.promise;

        // the first API call should have been called
        expect(fetchDataSpy.callCount).toEqual(1);

        // the page number should be equal to 1
        expect(container.state().page).toEqual(1);

        // now update the props
        container.setProps({
            reduxFilters: secondFilters
        });

        // the first API call should have been called
        expect(fetchDataSpy.callCount).toEqual(2);

        // the page number should still be equal to 1
        expect(container.state().page).toEqual(1);

        // reset the spy
        fetchDataSpy.reset();
    });

    describe('parseData', () => {
        it('should properly restructure the API data for the rank visualization', async () => {
            // mount the container
            const container = mount(<SpendingByAwardingAgencyVisualizationContainer
                reduxFilters={defaultFilters} />);

            await container.instance().apiRequest.promise;

            // validate the state contains the correctly parsed values
            const expectedState = {
                loading: false,
                labelSeries: ['First Agency (FA)', 'Second Agency (SA)'],
                dataSeries: [456, 123],
                descriptions: ['Spending by First Agency (FA): $456', 'Spending by Second Agency (SA): $123'],
                page: 1,
                agencyScope: 'agency',
                hasNextPage: false,
                hasPreviousPage: false,
                next: null,
                previous: null
            };

            expect(container.state()).toEqual(expectedState);
        });
    });

    describe('nextPage', () => {
        it('should trigger a new API call with an incremented page number', () => {
            // mount the container
            const container = mount(<SpendingByAwardingAgencyVisualizationContainer
                reduxFilters={defaultFilters} />);

            // initial state should be page 1
            expect(container.state().page).toEqual(1);

            // Tell container it has a nextPage
            container.state().hasNextPage = true;

            // Attempt to go to the next page
            container.instance().nextPage();

            // updated state should be page 2
            expect(container.state().page).toEqual(2);
        });
    });

    describe('previousPage', () => {
        it('should trigger a new API call with a decremented page number', () => {
            // mount the container
            const container = mount(<SpendingByAwardingAgencyVisualizationContainer
                reduxFilters={defaultFilters} />);

            container.setState({
                page: 5,
                has_previous_page: true,
                previous: "checksum"
            });

            // we have simulated a starting state of page 5
            expect(container.state().page).toEqual(5);

            container.instance().previousPage();
            // updated state should be one less page
            expect(container.state().page).toEqual(4);
        });

        it('should never use a page number less than 1', () => {
            // mount the container
            const container = mount(<SpendingByAwardingAgencyVisualizationContainer
                reduxFilters={defaultFilters} />);

            container.setState({
                page: 1
            });

            // we have simulated a starting state of page 5
            expect(container.state().page).toEqual(1);

            container.instance().previousPage();
            // updated state should be 1
            expect(container.state().page).toEqual(1);
        });
    });

    describe('newSearch', () => {
        it('when Redux filters change, the page number should reset to 1', () => {
            const initialFilters = Object.assign({}, defaultFilters);
            const secondFilters = Object.assign({}, defaultFilters, {
                timePeriodType: 'fy',
                timePeriodFY: new Set(['2014', '2015'])
            });

            // mount the container
            const container = mount(<SpendingByAwardingAgencyVisualizationContainer
                reduxFilters={initialFilters} />);

            container.setState({
                page: 5,
                has_previous_page: true,
                previous: "checksum"
            });

            // assume we are starting on page 5
            expect(container.state().page).toEqual(5);

            // now update the props
            container.setProps({
                reduxFilters: secondFilters
            });

            // the page number should be reset to 1
            expect(container.state().page).toEqual(1);
        });
    });

    describe('changeScope', () => {
        it('should change the agency scope to the provided value', () => {
            const container = mount(<SpendingByAwardingAgencyVisualizationContainer
                reduxFilters={defaultFilters} />);

            // the default scope should be toptier
            expect(container.state().agencyScope).toEqual('agency');

            // change the scope to subtier
            container.instance().changeScope('subagency');
            expect(container.state().agencyScope).toEqual('subagency');
        });

        it('should reset the page number to 1 when the agency scope changes', () => {
            const container = mount(<SpendingByAwardingAgencyVisualizationContainer
                reduxFilters={defaultFilters} />);
            container.setState({
                page: 5
            });

            // the default scope should be toptier
            expect(container.state().agencyScope).toEqual('agency');
            expect(container.state().page).toEqual(5);

            // change the scope to subtier
            container.instance().changeScope('subagency');
            expect(container.state().agencyScope).toEqual('subagency');
            expect(container.state().page).toEqual(1);
        });
    });

    afterAll(() => {
        // restore the mocked component's lifecycle functions
        unmockComponent(SpendingByAgencySection);
    });
});
