/**
 * RankVisualizationWrapperContainer-test.jsx
 * Created by michaelbray on 4/7/17.
 */

import React from 'react';
import { mount } from 'enzyme';
import { RankVisualizationWrapperContainer } from
    'containers/search/visualizations/rank/RankVisualizationWrapperContainer';
import { Set } from 'immutable';
import { defaultFilters } from '../../../../testResources/defaultReduxFilters';
import { mockActions } from '../time/mockData';

// mock the search helper
jest.mock('helpers/searchHelper', () => require('./spendingByCategoryHelper'));

// mock the child components by replacing them with a function that returns a null element
jest.mock('components/search/visualizations/rank/sections/SpendingByAgencySection', () =>
    jest.fn(() => null));
jest.mock('components/search/visualizations/rank/sections/SpendingByRecipientSection', () =>
    jest.fn(() => null));
jest.mock('components/search/visualizations/rank/sections/SpendingByCFDASection', () =>
    jest.fn(() => null));
jest.mock('components/search/visualizations/rank/sections/SpendingByIndustryCodeSection', () =>
    jest.fn(() => null));
jest.mock('components/search/visualizations/rank/RankVisualizationTitle', () =>
    jest.fn(() => null));

describe('RankVisualizationWrapperContainer', () => {
    it('should make an API request on mount', async () => {
        const container = mount(<RankVisualizationWrapperContainer
            reduxFilters={defaultFilters}
            {...mockActions} />);

        const fetchData = jest.fn();
        container.instance().fetchData = fetchData;

        container.instance().componentDidMount();
        await container.instance().apiRequest.promise;

        expect(fetchData).toHaveBeenCalledTimes(1);
    });
    it('should make an API request when the Redux filters change', async () => {
        const secondFilters = Object.assign({}, defaultFilters, {
            timePeriodType: 'fy',
            timePeriodFY: new Set(['2014', '2015'])
        });

        const container = mount(<RankVisualizationWrapperContainer
            reduxFilters={defaultFilters}
            {...mockActions} />);

        const fetchData = jest.fn();
        container.instance().fetchData = fetchData;

        container.instance().componentDidMount();
        await container.instance().apiRequest.promise;

        expect(fetchData).toHaveBeenCalledTimes(1);

        // the page number should be equal to 1
        expect(container.state().page).toEqual(1);

        // now update the props
        container.setProps({
            reduxFilters: secondFilters
        });

        // fetchData should have been called again
        expect(fetchData).toHaveBeenCalledTimes(2);

        // the page number should still be equal to 1
        expect(container.state().page).toEqual(1);

        // setAppliedFilterCompletion should have been called
        expect(mockActions.setAppliedFilterCompletion).toHaveBeenLastCalledWith(true);
    });
    it('should make an API request when the sub-awards toggle changes', async () => {
        const container = mount(<RankVisualizationWrapperContainer
            reduxFilters={defaultFilters}
            {...mockActions} />);

        const fetchData = jest.fn();
        container.instance().fetchData = fetchData;

        container.instance().componentDidMount();
        await container.instance().apiRequest.promise;

        expect(fetchData).toHaveBeenCalledTimes(1);

        // the page number should be equal to 1
        expect(container.state().page).toEqual(1);

        // now update the props
        container.setProps({
            subaward: true
        });

        // fetchData should have been called again
        expect(fetchData).toHaveBeenCalledTimes(2);

        // the page number should still be equal to 1
        expect(container.state().page).toEqual(1);
    });
    it('should handle generating the visualization on render', () => {
        const container = mount(<RankVisualizationWrapperContainer
            reduxFilters={defaultFilters}
            {...mockActions} />);

        const generateVisualization = jest.fn();
        container.instance().generateVisualization = generateVisualization;

        container.instance().componentDidMount();

        expect(generateVisualization).toHaveBeenCalled();
    });

    describe('changeSpendingBy', () => {
        it('should change the spendingBy to the provided value and update to the default scope', () => {
            const container = mount(<RankVisualizationWrapperContainer
                reduxFilters={defaultFilters}
                {...mockActions} />);

            container.instance().componentDidMount();

            // the default scope should be awarding agency
            expect(container.state().spendingBy).toEqual('awardingAgency');
            expect(container.state().scope).toEqual('awarding_agency');

            // change the scope to industry code
            container.instance().changeSpendingBy('industryCode');
            expect(container.state().spendingBy).toEqual('industryCode');
            expect(container.state().scope).toEqual('psc');
        });
    });
    
    describe('parseData', () => {
        it('should properly restructure the API data for the rank visualization', async () => {
            // mount the container
            const container = mount(<RankVisualizationWrapperContainer
                reduxFilters={defaultFilters}
                {...mockActions} />);

            container.instance().componentDidMount();
            await container.instance().apiRequest.promise;

            // validate the state contains the correctly parsed values
            const expectedState = {
                spendingBy: 'awardingAgency',
                loading: false,
                error: false,
                labelSeries: ['First Agency (FA)', 'Second Agency (SA)'],
                dataSeries: ['456', '123'],
                linkSeries: [],
                descriptions: ['Spending by First Agency (FA): $456', 'Spending by Second Agency (SA): $123'],
                page: 1,
                scope: 'awarding_agency',
                next: null,
                previous: null,
                hasNextPage: false,
                hasPreviousPage: false
            };

            expect(container.state()).toEqual(expectedState);
        });
        it('should add to the linkSeries for Spending by Recipient', async () => {
            // mount the container
            const container = mount(<RankVisualizationWrapperContainer
                reduxFilters={defaultFilters}
                {...mockActions} />);

            // change the scope to industry code
            container.instance().changeSpendingBy('recipient');

            container.instance().componentDidMount();
            await container.instance().apiRequest.promise;

            // The mock helper is returning agency results,
            // so when recipient ids are missing they should resolve to empty strings
            const expectedLinkSeries = ['', ''];

            expect(container.state().linkSeries).toEqual(expectedLinkSeries);
        });
    });

    describe('nextPage', () => {
        it('should trigger a new API call with an incremented page number', () => {
            // mount the container
            const container = mount(<RankVisualizationWrapperContainer
                reduxFilters={defaultFilters}
                {...mockActions} />);

            container.instance().componentDidMount();

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
            const container = mount(<RankVisualizationWrapperContainer
                reduxFilters={defaultFilters}
                {...mockActions} />);

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
            const container = mount(<RankVisualizationWrapperContainer
                reduxFilters={defaultFilters}
                {...mockActions} />);

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
            const container = mount(<RankVisualizationWrapperContainer
                reduxFilters={initialFilters}
                {...mockActions} />);

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
        it('should change the scope to the provided value', () => {
            const container = mount(<RankVisualizationWrapperContainer
                reduxFilters={defaultFilters}
                {...mockActions} />);

            // the default scope should be toptier
            expect(container.state().scope).toEqual('awarding_agency');

            // change the scope to subtier
            container.instance().changeScope('awarding_subagency');
            expect(container.state().scope).toEqual('awarding_subagency');
        });

        it('should reset the page number to 1 when the scope changes', () => {
            const container = mount(<RankVisualizationWrapperContainer
                reduxFilters={defaultFilters}
                {...mockActions} />);
            container.setState({
                page: 5
            });

            // the default scope should be toptier
            expect(container.state().scope).toEqual('awarding_agency');
            expect(container.state().page).toEqual(5);

            // change the scope to subtier
            container.instance().changeScope('awarding_subagency');
            expect(container.state().scope).toEqual('awarding_subagency');
            expect(container.state().page).toEqual(1);
        });
    });
});
