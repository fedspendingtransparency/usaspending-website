/**
 * TopFilterBarContainer-test.js
 * Created by Kevin Li 1/9/17
 */

import React from 'react';
import { mount } from 'enzyme';
import sinon from 'sinon';

import { Set } from 'immutable';

import TopFilterBar from 'components/search/topFilterBar/TopFilterBar';
import TopFilterBarEmpty from 'components/search/topFilterBar/TopFilterBarEmpty';
import { TopFilterBarContainer } from 'containers/search/topFilterBar/TopFilterBarContainer';

const defaultFilters = {
    awardType: new Set(),
    timePeriodType: 'fy',
    timePeriodFY: new Set(),
    timePeriodStart: null,
    timePeriodEnd: null,
    selectedLocations: new Set(),
    locationDomesticForeign: 'all'
};

const setup = (props) =>
    mount(<TopFilterBarContainer {...props} />);

const removeTimePeriodSpy = sinon.spy(TopFilterBarContainer.prototype, 'removeTimePeriod');
const removeFromSetSpy = sinon.spy(TopFilterBarContainer.prototype, 'removeFromSet');
const prepareFiltersSpy = sinon.spy(TopFilterBarContainer.prototype, 'prepareFilters');


describe('TopFilterBarContainer', () => {
    it('should return a TopFilterBarEmpty child component when no filters are applied', () => {
        const filters = Object.assign({}, defaultFilters);
        const props = {
            reduxFilters: filters
        };
        const topBarContainer = setup(props);

        expect(topBarContainer.find(TopFilterBarEmpty)).toHaveLength(1);
        expect(topBarContainer.find(TopFilterBar)).toHaveLength(0);
    });

    it('should return a TopFilterBar child component when there are active filters', () => {
        const filters = Object.assign({}, defaultFilters, {
            timePeriodType: 'fy',
            timePeriodFY: new Set(['2014'])
        });
        const props = {
            reduxFilters: filters
        };

        const topBarContainer = setup(props);

        expect(topBarContainer.find(TopFilterBarEmpty)).toHaveLength(0);
        expect(topBarContainer.find(TopFilterBar)).toHaveLength(1);
    });

    describe('filter preparation', () => {
        it('should update when the Redux filters change', () => {
            const initialFilters = Object.assign({}, defaultFilters, {
                timePeriodType: 'fy',
                timePeriodFY: new Set(['2014'])
            });

            const updatedFilters = Object.assign({}, defaultFilters, {
                timePeriodType: 'fy',
                timePeriodFY: new Set(['2014', '2015'])
            });

            const initialProps = {
                reduxFilters: initialFilters
            };

            const updatedProps = {
                reduxFilters: updatedFilters
            };

            // mount the container
            const topBarContainer = setup(initialProps);

            // change the props
            topBarContainer.setProps(updatedProps);

            // the prepareFilters function should have been called
            expect(prepareFiltersSpy.called).toBeTruthy();
        });

        it('should update component state with Redux time filters when available', () => {
            // mount the container with default props
            const topBarContainer = setup({
                reduxFilters: Object.assign({}, defaultFilters)
            });

            expect(topBarContainer.state().filters).toHaveLength(0);

            const timeFilter = Object.assign({}, defaultFilters, {
                timePeriodType: 'fy',
                timePeriodFY: new Set(['2014', '2015'])
            });

            topBarContainer.setProps({
                reduxFilters: timeFilter
            });

            expect(topBarContainer.state().filters).toHaveLength(1);

            const filterItem = topBarContainer.state().filters[0];
            const expectedFilterState = {
                code: 'timePeriodFY',
                name: 'Time Period',
                values: ['2015', '2014'],
                labels: ['FY 2015', 'FY 2014']
            };

            expect(filterItem).toEqual(expectedFilterState);
        });

        it('should update component state with Redux award type filters when available', () => {
            // mount the container with default props
            const topBarContainer = setup({
                reduxFilters: Object.assign({}, defaultFilters)
            });

            expect(topBarContainer.state().filters).toHaveLength(0);

            const awardFilter = Object.assign({}, defaultFilters, {
                awardType: new Set(['07'])
            });

            topBarContainer.setProps({
                reduxFilters: awardFilter
            });

            expect(topBarContainer.state().filters).toHaveLength(1);

            const filterItem = topBarContainer.state().filters[0];
            const expectedFilterState = {
                code: 'awardType',
                name: 'Award Type',
                values: ['07'],
                labels: ['Direct Loans']
            };

            expect(filterItem).toEqual(expectedFilterState);
        });
    });

    describe('filter removal', () => {
        it('should hide the top filter bar when all filters are cleared', () => {
            const initialFilters = Object.assign({}, defaultFilters, {
                timePeriodType: 'fy',
                timePeriodFY: new Set(['2014'])
            });

            const topBarContainer = setup({
                reduxFilters: initialFilters
            });

            expect(topBarContainer.find(TopFilterBarEmpty)).toHaveLength(0);
            expect(topBarContainer.find(TopFilterBar)).toHaveLength(1);

            // clear the filters
            topBarContainer.setProps({
                reduxFilters: Object.assign({}, defaultFilters)
            });

            expect(topBarContainer.find(TopFilterBarEmpty)).toHaveLength(1);
            expect(topBarContainer.find(TopFilterBar)).toHaveLength(0);
        });

        it('should trigger a Redux action to update the time period when a FY time period filter is removed', () => {
            const initialFilters = Object.assign({}, defaultFilters, {
                timePeriodType: 'fy',
                timePeriodFY: new Set(['2014', '2015'])
            });

            const expectedReduxArguments = {
                dateType: 'fy',
                fy: new Set(['2015']),
                start: null,
                end: null
            };

            // mock the redux action to test that the arguments match what is expected
            const mockReduxAction = jest.fn((args) => {
                expect(args).toEqual(expectedReduxArguments);
            });

            const topBarContainer = setup({
                reduxFilters: initialFilters,
                updateTimePeriod: mockReduxAction
            });

            topBarContainer.instance().removeFilter('timePeriodFY', '2014');

            // the removeFilter function should call removeTimePeriodSpy
            expect(removeTimePeriodSpy.called).toBeTruthy();
            // the removeTimePeriod function should trigger a Redux action to remove the time period
            expect(mockReduxAction).toHaveBeenCalled();
        });

        it('should trigger a Redux action to update the time period when a date range is removed', () => {
            const initialFilters = Object.assign({}, defaultFilters, {
                timePeriodType: 'dr',
                timePeriodStart: '2016-01-01',
                timePeriodEnd: '2016-12-31'
            });

            const expectedReduxArguments = {
                dateType: 'dr',
                fy: new Set([]),
                start: null,
                end: null
            };

            // mock the redux action to test that the arguments match what is expected
            const mockReduxAction = jest.fn((args) => {
                expect(args).toEqual(expectedReduxArguments);
            });

            const topBarContainer = setup({
                reduxFilters: initialFilters,
                updateTimePeriod: mockReduxAction
            });

            topBarContainer.instance().removeFilter('timePeriodDR');

            // the removeTimePeriodSpy function should call removeTimePeriodSpy
            expect(removeTimePeriodSpy.called).toBeTruthy();
            // the removeTimePeriod function should trigger a Redux action to remove the time period
            expect(mockReduxAction).toHaveBeenCalled();
        });

        it('should trigger a Redux action to update the award type when an award type filter is removed', () => {
            const initialFilters = Object.assign({}, defaultFilters, {
                awardType: new Set(['07', '04'])
            });

            const expectedReduxArguments = {
                type: 'awardType',
                value: new Set(['04'])
            };

            // mock the redux action to test that the arguments match what is expected
            const mockReduxAction = jest.fn((args) => {
                expect(args).toEqual(expectedReduxArguments);
            });

            const topBarContainer = setup({
                reduxFilters: initialFilters,
                updateGenericFilter: mockReduxAction
            });

            topBarContainer.instance().removeFilter('awardType', '07');

            // the removeFilter function should call removeFromSet
            expect(removeFromSetSpy.called).toBeTruthy();
            // the removeFromSet function should trigger a Redux action to remove the award type
            expect(mockReduxAction).toHaveBeenCalled();
        });
    });
});
