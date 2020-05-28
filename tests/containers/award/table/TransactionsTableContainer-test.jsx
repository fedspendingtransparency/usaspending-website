/**
 * TransactionsTableContainer-test.jsx
 * Created by Kevin Li 12/18/17
 */

import React from 'react';
import { mount, shallow } from 'enzyme';

import BaseContractTransaction from 'models/v2/award/transactions/BaseContractTransaction';
import { TransactionsTableContainer } from 'containers/award/table/TransactionsTableContainer';

import mockContractTransaction from '../mockContractTransaction';


// mock the search helper
jest.mock('helpers/searchHelper', () => require('../mockSearchHelper'));

// mock the child component by replacing it with a function that returns a null element
jest.mock('components/award/table/TransactionsTable', () =>
    jest.fn(() => null));

// force Jest to use native Node promises
// see: https://facebook.github.io/jest/docs/troubleshooting.html#unresolved-promises
global.Promise = require.requireActual('promise');

const mockRedux = {
    award:
    {
        id: '2342342',
        category: 'idv',
        overview: {
            generatedId: '2342342'
        }
    }
};

describe('TransactionsTableContainer-test', () => {
    it('should reload the data when the award ID changes', () => {
        const container = mount(
            <TransactionsTableContainer
                {...mockRedux} />
        );

        container.instance().fetchTransactions = jest.fn();

        container.setProps({
            award: {
                id: '22'
            }
        });

        expect(container.instance().fetchTransactions).toHaveBeenCalledTimes(1);
        expect(container.instance().fetchTransactions).toHaveBeenCalledWith(1, true);
    });

    describe('parseTransactions', () => {
        it('should parse the API response into ContractTransaction objects for idv awards', () => {
            const redux = Object.assign({}, mockRedux, {
                category: 'contract'
            });

            const container = shallow(
                <TransactionsTableContainer
                    {...redux} />
            );
            container.instance().parseTransactions(mockContractTransaction, true);

            const expectedResult = Object.create(BaseContractTransaction);
            expectedResult.populate(mockContractTransaction.results[0]);
            const actualResult = container.state().transactions[0];

            expect(container.state().transactions.length).toEqual(1);
            expect(actualResult).toEqual(expectedResult);
        });
        it('should append results to the existing list when reset is false', () => {
            const container = shallow(
                <TransactionsTableContainer
                    {...mockRedux} />
            );
            container.setState({
                transactions: ["mock item"]
            });

            container.instance().parseTransactions(mockContractTransaction, false);
            expect(container.state().transactions.length).toEqual(2);
        });
    });

    describe('nextTransactionPage', () => {
        it('should load the next page of data when available', () => {
            const container = shallow(
                <TransactionsTableContainer
                    {...mockRedux} />
            );

            container.setState({
                nextPage: true,
                inFlight: false,
                page: 1
            });
            container.instance().fetchTransactions = jest.fn();

            container.instance().nextTransactionPage();

            expect(container.instance().fetchTransactions).toHaveBeenCalledTimes(1);
            expect(container.instance().fetchTransactions).toHaveBeenCalledWith(2, false);
        });

        it('should not load more data when it is on the last page', () => {
            const container = shallow(
                <TransactionsTableContainer
                    {...mockRedux} />
            );

            container.setState({
                nextPage: false,
                inFlight: false,
                page: 2
            });
            container.instance().fetchTransactions = jest.fn();

            container.instance().nextTransactionPage();

            expect(container.instance().fetchTransactions).toHaveBeenCalledTimes(0);
        });

        it('should not load more data when it there are existing requests in flight', () => {
            const container = shallow(
                <TransactionsTableContainer
                    {...mockRedux} />
            );

            container.setState({
                nextPage: false,
                inFlight: true,
                page: 2
            });
            container.instance().fetchTransactions = jest.fn();

            container.instance().nextTransactionPage();

            expect(container.instance().fetchTransactions).toHaveBeenCalledTimes(0);
        });
    });

    describe('changeSort', () => {
        it('should update the state to the new sort values', () => {
            const container = shallow(
                <TransactionsTableContainer
                    {...mockRedux} />
            );

            container.instance().fetchTransactions = jest.fn();

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
            const container = shallow(
                <TransactionsTableContainer
                    {...mockRedux} />
            );

            container.instance().fetchTransactions = jest.fn();

            container.instance().changeSort({
                field: 'test',
                direction: 'asc'
            });

            expect(container.instance().fetchTransactions).toHaveBeenCalledTimes(1);
            expect(container.instance().fetchTransactions).toHaveBeenCalledWith(1, true);
        });
    });
});
