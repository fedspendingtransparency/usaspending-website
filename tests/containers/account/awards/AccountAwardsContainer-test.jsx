/**
 * AccountAwardsContainer-test.jsx
 * Created by Kevin Li 4/14/17
 */

import React from 'react';
import { mount, shallow } from 'enzyme';
import { OrderedSet } from 'immutable';

import { AccountAwardsContainer } from 'containers/account/awards/AccountAwardsContainer';

import { mockReduxAccount } from '../mockAccount';
import { defaultFilters } from '../defaultFilters';
import { mockCount } from './mockResponses';

// force Jest to use native Node promises
// see: https://facebook.github.io/jest/docs/troubleshooting.html#unresolved-promises
global.Promise = require.requireActual('promise');

// mock the child component by replacing it with a function that returns a null element
jest.mock('components/search/table/ResultsTableSection', () =>
    jest.fn(() => null));

// canvas elements are not available in Jest, so mock the text measurement helper
jest.mock('helpers/textMeasurement', () => (
    {
        measureText: jest.fn(() => 100),
        measureTableHeader: jest.fn(() => 220)
    }
));

jest.mock('helpers/searchHelper', () => require('./mockSearchHelper'));

describe('AccountAwardsContainer', () => {
    it('should pick a default tab when the Redux filters change', () => {
        const props = {
            account: mockReduxAccount,
            filters: defaultFilters
        };

        const container = mount(<AccountAwardsContainer {...props} />);
        container.instance().pickDefaultTab = jest.fn();

        // change the filters
        const newFilters = Object.assign({}, defaultFilters, {
            objectClass: new OrderedSet(['10'])
        });

        container.setProps({
            filters: newFilters
        });

        expect(container.instance().pickDefaultTab).toHaveBeenCalledTimes(1);
    });

    describe('parseTabCounts', () => {
        it('should aggregate the award type counts into higher level categories', () => {
            const props = {
                account: mockReduxAccount,
                filters: defaultFilters
            };
            const container = shallow(<AccountAwardsContainer {...props} />);
            container.instance().componentDidMount();
            container.instance().parseTabCounts(mockCount);

            expect(container.state().counts).toEqual({
                contracts: 2,
                direct_payments: 0,
                grants: 0,
                idvs: 0,
                loans: 0,
                other: 0
            });
        });
    });

    describe('loadColumns', () => {
        const props = {
            account: mockReduxAccount,
            filters: defaultFilters
        };
        it('should generate a column object in React state for every table type', () => {
            const expectedKeys = ['contracts', 'grants', 'direct_payments', 'loans', 'other', 'subcontracts', 'subgrants'];
            const container = shallow(<AccountAwardsContainer {...props} />);

            container.instance().loadColumns();
            const columnKeys = Object.keys(container.state().columns);
            expect(expectedKeys.every((key) => columnKeys.indexOf(key) > -1) &&
                columnKeys.every((key) => expectedKeys.indexOf(key) > -1)).toBeTruthy();
        });

        it('should generate a column object that contains an array representing the order columns should appear in the table', () => {
            const container = shallow(<AccountAwardsContainer {...props} />);

            container.instance().loadColumns();
            const column = container.state().columns.contracts;
            expect({}.hasOwnProperty.call(column, 'visibleOrder')).toBeTruthy();
        });
    });

    describe('createColumn', () => {
        const props = {
            account: mockReduxAccount,
            filters: defaultFilters
        };
        it('should return a column object', () => {
            const container = shallow(<AccountAwardsContainer {...props} />);

            const mockColumnData = {
                title: 'Test Column',
                displayName: 'Test Display Name',
                subtitle: '(Test Subtitle)',
                background: '#eeeeee'
            };

            const output = container.instance().createColumn(mockColumnData);
            expect(output).toEqual({
                columnName: 'Test Column',
                displayName: 'Test Display Name',
                width: 220,
                defaultDirection: 'desc',
                background: '#eeeeee',
                subtitle: '(Test Subtitle)'
            });
        });
        it('should respect a provided custom width', () => {
            const container = shallow(<AccountAwardsContainer {...props} />);

            const mockColumnData = {
                title: 'Test Column',
                displayName: 'Test Display Name',
                customWidth: 123
            };

            const output = container.instance().createColumn(mockColumnData);
            expect(output.width).toEqual(123);
        });
        it('should default to the empty string when no subtitle is provided', () => {
            const container = shallow(<AccountAwardsContainer {...props} />);

            const mockColumnData = {
                title: 'Test Column',
                displayName: 'Test Display Name'
            };

            const output = container.instance().createColumn(mockColumnData);
            expect(output.subtitle).toBeFalsy();
            expect(output.subtitle).toEqual('');
        });
        it('should default to the empty string when no background color is provided', () => {
            const container = shallow(<AccountAwardsContainer {...props} />);

            const mockColumnData = {
                title: 'Test Column',
                displayName: 'Test Display Name'
            };

            const output = container.instance().createColumn(mockColumnData);
            expect(output.background).toBeFalsy();
            expect(output.background).toEqual('');
        });
    });

    describe('performSearch', () => {
        it('should overwrite any existing results if newSearch is true', async () => {
            const props = {
                account: mockReduxAccount,
                filters: defaultFilters
            };
            const container = shallow(<AccountAwardsContainer {...props} />);
            container.setState({
                results: [{}, {}, {}]
            });
            container.instance().componentDidMount();
            expect(container.state().results.length).toEqual(3);

            container.instance().performSearch(true);

            await container.instance().searchRequest.promise;

            expect(container.state().results.length).toEqual(1);
        });
        it('should append to any existing results if newSearch is false', async () => {
            const props = {
                account: mockReduxAccount,
                filters: defaultFilters
            };
            const container = shallow(<AccountAwardsContainer {...props} />);
            container.setState({
                results: [{}, {}, {}],
                page: 2
            });
            container.instance().componentDidMount();
            expect(container.state().results.length).toEqual(3);

            container.instance().performSearch(false);

            await container.instance().searchRequest.promise;

            expect(container.state().results.length).toEqual(4);
        });
    });

    describe('switchTab', () => {
        it('should update the state to the new tab', () => {
            const props = {
                account: mockReduxAccount,
                filters: defaultFilters
            };
            const container = shallow(<AccountAwardsContainer {...props} />);
            container.instance().componentDidMount();
            container.instance().switchTab('grants');
            expect(container.state().tableType).toEqual('grants');
        });

        it('should update the sort to the default sort of the new tab if the existing sort field doesn\'t exist in that tab', () => {
            const props = {
                account: mockReduxAccount,
                filters: defaultFilters
            };

            const container = shallow(<AccountAwardsContainer {...props} />);
            container.instance().componentDidMount();
            container.instance().switchTab('loans');

            expect(container.state().sort).toEqual({
                field: 'Loan Value',
                direction: 'desc'
            });
        });

        it('should trigger a new reset search', () => {
            const props = {
                account: mockReduxAccount,
                filters: defaultFilters
            };
            const container = shallow(<AccountAwardsContainer {...props} />);
            container.instance().performSearch = jest.fn();
            container.instance().componentDidMount();
            container.instance().switchTab('loans');

            expect(container.instance().performSearch).toHaveBeenCalledTimes(1);
            expect(container.instance().performSearch).toHaveBeenCalledWith(true);
        });
    });

    describe('loadNextPage', () => {
        it('should load the next page when there are more pages available', () => {
            const props = {
                account: mockReduxAccount,
                filters: defaultFilters
            };
            const container = shallow(<AccountAwardsContainer {...props} />);
            container.instance().performSearch = jest.fn();
            container.setState({
                lastPage: false,
                inFlight: false
            });

            container.instance().loadNextPage();
            expect(container.state().page).toEqual(2);
            expect(container.instance().performSearch).toHaveBeenCalledTimes(1);
            expect(container.instance().performSearch).toHaveBeenCalledWith();
        });
        it('should not load any pages if there are no more pages available', () => {
            const props = {
                account: mockReduxAccount,
                filters: defaultFilters
            };
            const container = shallow(<AccountAwardsContainer {...props} />);
            container.instance().performSearch = jest.fn();
            container.setState({
                lastPage: true,
                inFlight: false
            });

            container.instance().loadNextPage();
            expect(container.state().page).toEqual(1);
            expect(container.instance().performSearch).toHaveBeenCalledTimes(0);
        });
        it('should not load any pages if there are requests already in-flight', () => {
            const props = {
                account: mockReduxAccount,
                filters: defaultFilters
            };
            const container = shallow(<AccountAwardsContainer {...props} />);
            container.instance().performSearch = jest.fn();
            container.setState({
                hasNext: true,
                inFlight: true
            });

            container.instance().loadNextPage();
            expect(container.state().page).toEqual(1);
            expect(container.instance().performSearch).toHaveBeenCalledTimes(0);
        });
    });
    describe('updateSort', () => {
        it('should change the state to the provided values', () => {
            const props = {
                account: mockReduxAccount,
                filters: defaultFilters
            };
            const container = shallow(<AccountAwardsContainer {...props} />);
            container.instance().componentDidMount();
            container.instance().updateSort('field', 'asc');

            expect(container.state().sort).toEqual({
                field: 'field',
                direction: 'asc'
            });
        });
        it('should trigger a new reset search', () => {
            const props = {
                account: mockReduxAccount,
                filters: defaultFilters
            };
            const container = shallow(<AccountAwardsContainer {...props} />);
            container.instance().performSearch = jest.fn();

            container.instance().updateSort('field', 'asc');

            expect(container.instance().performSearch).toHaveBeenCalledTimes(1);
            expect(container.instance().performSearch).toHaveBeenCalledWith(true);
        });
    });
});
