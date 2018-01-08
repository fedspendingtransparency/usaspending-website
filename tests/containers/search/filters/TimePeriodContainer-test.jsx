/**
 * TimePeriodContainer-test.jsx
 * Created by Kevin Li 9/14/17
 */

import React from 'react';
import { shallow } from 'enzyme';
import { Set } from 'immutable';

import { TimePeriodContainer } from 'containers/search/filters/TimePeriodContainer';
import { mockRedux, mockActions } from './mockTimePeriod';

jest.mock('helpers/fiscalYearHelper', () => require('./fiscalYearHelper'));

// mock the child component by replacing it with a function that returns a null element
jest.mock('components/search/filters/timePeriod/TimePeriod', () =>
    jest.fn(() => null));

describe('TimePeriodContainer', () => {
    describe('generateTimePeriods', () => {
        it('should generate the fiscal years from the earliest available FY to the current FY in descending order', () => {
            const container = shallow(<TimePeriodContainer
                {...mockRedux}
                {...mockActions} />);
            container.instance().generateTimePeriods();

            expect(container.state().timePeriods).toEqual([
                '1990',
                '1989',
                '1988',
                '1987',
                '1986',
                '1985',
                '1984'
            ]);
        });
    });

    describe('changeTab', () => {
        it('should change the active tab state', () => {
            const container = shallow(<TimePeriodContainer
                {...mockRedux}
                {...mockActions} />);

            expect(container.state().activeTab).toEqual('fy');

            const mockUpdate = jest.fn();
            container.instance().updateFilter = mockUpdate;

            container.instance().changeTab('dr');
            expect(container.state().activeTab).toEqual('dr');
        });
    });

    describe('updateFilter', () => {
        it('should merge the existing filter values with the new inbound values', () => {
            const mockUpdate = jest.fn();
            const actions = Object.assign({}, mockActions, {
                updateTimePeriod: mockUpdate
            });

            const container = shallow(<TimePeriodContainer
                {...mockRedux}
                {...actions} />);

            container.setState({
                activeTab: 'dr'
            });

            container.instance().updateFilter({
                startDate: '1984-01-01',
                endDate: '1984-01-30'
            });

            expect(mockUpdate).toHaveBeenCalledTimes(1);
            expect(mockUpdate).toHaveBeenCalledWith({
                dateType: 'dr',
                startDate: '1984-01-01',
                endDate: '1984-01-30',
                fy: []
            });
        });
        it('should use null start and end date arguments when updating a fiscal year', () => {
            const mockUpdate = jest.fn();
            const actions = Object.assign({}, mockActions, {
                updateTimePeriod: mockUpdate
            });

            const container = shallow(<TimePeriodContainer
                {...mockRedux}
                {...actions} />);

            container.setState({
                activeTab: 'fy'
            });

            container.instance().updateFilter({
                fy: ['2017']
            });

            expect(mockUpdate).toHaveBeenCalledTimes(1);
            expect(mockUpdate).toHaveBeenCalledWith({
                dateType: 'fy',
                startDate: null,
                endDate: null,
                fy: ['2017']
            });
        });
    });
    describe('dirtyFilters', () => {
        it('should return an ES6 Symbol when the staged filters do not match with the applied filters', () => {
            const container = shallow(<TimePeriodContainer
                {...mockRedux}
                {...mockActions} />);

            const appliedFilters = Object.assign({}, mockRedux.appliedFilters, {
                timePeriodFY: new Set(['2017'])
            });

            container.setProps({
                appliedFilters,
                filterTimePeriodFY: new Set([])
            });

            const changed = container.instance().dirtyFilters();
            expect(changed).toBeTruthy();
            expect(typeof changed).toEqual('symbol');
        });
        it('should return null when the staged filters match with the applied filters', () => {
            const container = shallow(<TimePeriodContainer
                {...mockRedux}
                {...mockActions} />);

            const changed = container.instance().dirtyFilters();
            expect(changed).toBeFalsy();
        });
    });
});
