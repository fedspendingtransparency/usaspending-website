/**
 * AccountTimePeriodContainer-test.jsx
 * Created by Kevin Li 3/27/17
 */

import React from 'react';
import { shallow } from 'enzyme';
import moment from 'moment';
import { Set } from 'immutable';

import { AccountTimePeriodContainer } from 'containers/account/filters/AccountTimePeriodContainer';

// mock the child component by replacing it with a function that returns a null element
jest.mock('components/search/filters/timePeriod/TimePeriod', () =>
    jest.fn(() => null));

const defaultFilters = {
    filterTimePeriodType: 'fy',
    filterTimePeriodFY: new Set(),
    filterTimePeriodStart: null,
    filterTimePeriodEnd: null
};

describe('AccountTimePeriodContainer', () => {
    describe('generateTimePeriods', () => {
        it('generate the current available fiscal years', () => {
            const mockedDate = moment('2015-04-01', 'YYYY-MM-DD').toDate();
            moment.now = () => (mockedDate);

            const container = shallow(<AccountTimePeriodContainer />);
            container.instance().generateTimePeriods();

            // override the moment's library's internal time to a known mocked date
            const expectedYears = ['2015', '2014', '2013', '2012', '2011', '2010', '2009'];

            expect(container.state().timePeriods).toEqual(expectedYears);
        });
    });

    describe('updateFilter', () => {
        it('should trigger a Redux action with the new filter values', (done) => {
            const expected = {
                dateType: 'dr',
                fy: new Set(),
                startDate: '2012-01-01',
                endDate: '2012-12-31'
            };

            const reduxAction = jest.fn((args) => {
                expect(args).toEqual(expected);
                done();
            });
            const container = shallow(<AccountTimePeriodContainer
                {...defaultFilters}
                updateTimePeriod={reduxAction} />);

            container.instance().updateFilter({
                dateType: 'dr',
                startDate: '2012-01-01',
                endDate: '2012-12-31'
            });
            expect(reduxAction).toHaveBeenCalled();
        });
    });

    describe('changeTab', () => {
        it('should change the Redux dateType', (done) => {
            const expected = {
                dateType: 'dr',
                fy: new Set(),
                startDate: null,
                endDate: null
            };

            const reduxAction = jest.fn((args) => {
                expect(args).toEqual(expected);
                done();
            });
            const container = shallow(<AccountTimePeriodContainer
                {...defaultFilters}
                updateTimePeriod={reduxAction} />);

            container.instance().changeTab('dr');
            expect(reduxAction).toHaveBeenCalled();
        });
    });
});
