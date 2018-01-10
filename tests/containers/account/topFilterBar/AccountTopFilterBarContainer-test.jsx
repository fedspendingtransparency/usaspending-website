/**
 * AccountTopFilterBarContainer-test.jsx
 * Created by Kevin Li 3/27/17
 */

import React from 'react';
import { mount, shallow } from 'enzyme';
import { Set, OrderedSet } from 'immutable';
import sinon from 'sinon';

import { AccountTopFilterBarContainer } from
    'containers/account/topFilterBar/AccountTopFilterBarContainer';

import { defaultFilters } from '../defaultFilters';

const prepareFiltersSpy = sinon.spy(AccountTopFilterBarContainer.prototype, 'prepareFilters');

// mock the child component by replacing it with a function that returns a null element
jest.mock('components/account/topFilterBar/LegacyTopFilterBar', () =>
    jest.fn(() => null));

describe('AccountTopFilterBarContainer', () => {
    it('should parse the Redux filters on mount', () => {
        const filters = Object.assign({}, defaultFilters);
        const props = {
            reduxFilters: filters
        };

        mount(<AccountTopFilterBarContainer {...props} />);

        expect(prepareFiltersSpy.callCount).toEqual(1);
        prepareFiltersSpy.reset();
    });

    it('should reparse the Redux filters when the values change', () => {
        const filters = Object.assign({}, defaultFilters);
        const firstProps = {
            reduxFilters: filters
        };

        const container = mount(<AccountTopFilterBarContainer {...firstProps} />);

        expect(prepareFiltersSpy.callCount).toEqual(1);

        container.setProps({
            reduxFilters: Object.assign({}, defaultFilters, {
                dateType: 'dr'
            })
        });

        expect(prepareFiltersSpy.callCount).toEqual(2);
        prepareFiltersSpy.reset();
    });

    describe('prepareFilters', () => {
        it('should update the container state with the parsed filters', () => {
            const filters = Object.assign({}, defaultFilters, {
                dateType: 'fy',
                fy: new Set(['2017', '2016'])
            });
            const props = {
                reduxFilters: filters
            };

            const container = shallow(<AccountTopFilterBarContainer {...props} />);
            container.instance().prepareFilters(props.reduxFilters);

            expect(container.state().filters).toHaveLength(1);
        });
    });

    describe('prepareTimeFilter', () => {
        it('should update the container state with the selected fiscal years', () => {
            const filters = Object.assign({}, defaultFilters, {
                dateType: 'fy',
                fy: new Set(['2017', '2016'])
            });

            const container = shallow(<AccountTopFilterBarContainer />);
            const parsed = container.instance().prepareTimeFilter(filters);

            expect(parsed).toEqual({
                code: 'timePeriodFY',
                name: 'Time Period',
                values: ['2017', '2016']
            });
        });

        it('should update the container state with the selected date range', () => {
            const filters = Object.assign({}, defaultFilters, {
                dateType: 'dr',
                startDate: '2015-01-01',
                endDate: '2015-12-31'
            });

            const container = shallow(<AccountTopFilterBarContainer />);
            const parsed = container.instance().prepareTimeFilter(filters);

            expect(parsed).toEqual({
                code: 'timePeriodDR',
                name: 'Time Period',
                values: ['01/01/2015 to 12/31/2015']
            });
        });

        it('should not return anything when no date filters are supplied', () => {
            const container = shallow(<AccountTopFilterBarContainer />);
            const parsed = container.instance().prepareTimeFilter(defaultFilters);

            expect(parsed).toBeNull();
        });
    });

    describe('prepareObjectClass', () => {
        it('should update the container state with the selected object classes', () => {
            const filters = Object.assign({}, defaultFilters, {
                objectClass: new OrderedSet(['10', '20'])
            });

            const container = shallow(<AccountTopFilterBarContainer />);
            const parsed = container.instance().prepareObjectClass(filters);

            expect(parsed).toEqual({
                code: 'objectClass',
                name: 'Object Class',
                values: ['10', '20']
            });
        });

        it('should not return anything when no object classes are supplied', () => {
            const container = shallow(<AccountTopFilterBarContainer />);
            const parsed = container.instance().prepareObjectClass(defaultFilters);

            expect(parsed).toBeNull();
        });
    });

    describe('prepareProgramActivity', () => {
        it('should update the container state with the selected program activities', () => {
            const filters = Object.assign({}, defaultFilters, {
                programActivity: new OrderedSet(['810', '161'])
            });

            const container = shallow(<AccountTopFilterBarContainer />);
            const parsed = container.instance().prepareProgramActivity(filters);

            expect(parsed).toEqual({
                code: 'programActivity',
                name: 'Program Activity',
                values: ['810', '161']
            });
        });

        it('should not return anything when no program activities are supplied', () => {
            const container = shallow(<AccountTopFilterBarContainer />);
            const parsed = container.instance().prepareProgramActivity(defaultFilters);

            expect(parsed).toBeNull();
        });
    });

    describe('clearAllFilters', () => {
        it('should trigger a Redux action', () => {
            const reduxAction = jest.fn();
            const container = shallow(<AccountTopFilterBarContainer
                resetAccountFilters={reduxAction} />);

            container.instance().clearAllFilters();
            expect(reduxAction).toHaveBeenCalled();
        });
    });
});
