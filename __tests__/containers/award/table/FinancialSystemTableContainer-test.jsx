/**
 * FinancialSystemTableContainer-test.jsx
 * Created by Kevin Li 3/9/17
 */

import React from 'react';
import { mount, shallow } from 'enzyme';

import { FinancialSystemTableContainer } from
    'containers/award/table/FinancialSystemTableContainer';

import BaseFinancialSystemDetailsRow from "models/v2/awards/financialSystemDetails/BaseFinancialSystemDetailsRow";

import { mockParams } from '../mockResults';
import mockFinancialSystemDetails from '../mockFinancialSystemDetails';

// mock the search helper
jest.mock('helpers/searchHelper', () => require('./mockSearchHelper'));

// mock the child component by replacing it with a function that returns a null element
jest.mock('components/award/table/FinancialSystemTable', () =>
    jest.fn(() => null));

// force Jest to use native Node promises
// see: https://facebook.github.io/jest/docs/troubleshooting.html#unresolved-promises
global.Promise = require.requireActual('promise');

const mockActions = {};
const mockAward = mockParams.award;

describe('FinancialSystemTableContainer', () => {
    it('should perform an API request when the award ID changes', async () => {
        const container = mount(<FinancialSystemTableContainer
            {...mockActions}
            award={mockAward} />);

        await container.instance().financialRequest.promise;

        container.instance().loadFinancialSystemData = jest.fn();
        container.setProps({
            award: {
                selectedAward: {
                    id: 2
                }
            }
        });

        expect(container.instance().loadFinancialSystemData).toHaveBeenCalledTimes(1);
        expect(container.instance().loadFinancialSystemData).toHaveBeenCalledWith(1, true);
    });

    describe('loadFinancialSystemData', () => {
        it('should correctly parse API data into FinancialSystemItem objects', async () => {
            const container = shallow(<FinancialSystemTableContainer
                {...mockActions}
                award={mockAward} />);

            container.instance().loadFinancialSystemData(1, true);
            await container.instance().financialRequest.promise;

            const expectedResult = Object.create(BaseFinancialSystemDetailsRow);
            expectedResult.populate(mockFinancialSystemDetails.results[0]);

            const stateResult = container.state().data[0];

            expect(container.state().data.length).toEqual(1);
            expect(stateResult).toEqual(expectedResult);
        });

        it('should append the API data to the Redux store when the reset flag is false', async () => {
            const container = shallow(<FinancialSystemTableContainer
                {...mockActions}
                award={mockAward} />);
            container.setState({
                data: [
                    "mock item"
                ]
            });

            container.instance().loadFinancialSystemData(2, false);
            await container.instance().financialRequest.promise;

            expect(container.state().data.length).toEqual(2);
        });
    });

    describe('loadNextPage', () => {
        it('should load the next page of data when available', () => {
            const container = shallow(<FinancialSystemTableContainer
                {...mockActions}
                award={mockAward} />);

            container.setState({
                nextPage: true,
                inFlight: false,
                page: 1
            });
            container.instance().loadFinancialSystemData = jest.fn();

            container.instance().loadNextPage();

            expect(container.instance().loadFinancialSystemData).toHaveBeenCalledTimes(1);
            expect(container.instance().loadFinancialSystemData).toHaveBeenCalledWith(2, false);
        });

        it('should not load more data when it is on the last page', () => {
            const container = shallow(<FinancialSystemTableContainer
                {...mockActions}
                award={mockAward} />);

            container.setState({
                nextPage: false,
                inFlight: false,
                page: 2
            });
            container.instance().loadFinancialSystemData = jest.fn();

            container.instance().loadNextPage();

            expect(container.instance().loadFinancialSystemData).toHaveBeenCalledTimes(0);
        });

        it('should not load more data when it there are existing requests in flight', () => {
            const container = shallow(<FinancialSystemTableContainer
                {...mockActions}
                award={mockAward} />);

            container.setState({
                nextPage: true,
                inFlight: true,
                page: 2
            });
            container.instance().loadFinancialSystemData = jest.fn();

            container.instance().loadNextPage();

            expect(container.instance().loadFinancialSystemData).toHaveBeenCalledTimes(0);
        });
    });

    describe('changeSort', () => {
        it('should update the state to the new sort values', () => {
            const container = shallow(<FinancialSystemTableContainer
                {...mockActions}
                award={mockAward} />);

            container.instance().loadFinancialSystemData = jest.fn();

            container.instance().changeSort({
                field: 'test',
                direction: 'asc'
            });

            expect(container.state().sort).toEqual({
                field: 'test',
                direction: 'asc'
            });
        });

        it('it should make an API request for the first page, resetting existing data', () => {
            const container = shallow(<FinancialSystemTableContainer
                {...mockActions}
                award={mockAward} />);

            container.instance().loadFinancialSystemData = jest.fn();

            container.instance().changeSort({
                field: 'test',
                direction: 'asc'
            });

            expect(container.instance().loadFinancialSystemData).toHaveBeenCalledTimes(1);
            expect(container.instance().loadFinancialSystemData).toHaveBeenCalledWith(1, true);
        });
    });
});
