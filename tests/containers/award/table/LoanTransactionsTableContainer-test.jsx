/**
 * LoanTransactionsTableContainer-test.jsx
 * Created by Emily Gullo 04/24/2017
 */

import React from 'react';
import { mount, shallow } from 'enzyme';
import sinon from 'sinon';

import { LoanTransactionsTableContainer } from
    'containers/award/table/LoanTransactionsTableContainer';
import * as awardActions from 'redux/actions/award/awardActions';
import * as SearchHelper from 'helpers/searchHelper';

import LoanTransaction from 'models/results/transactions/LoanTransaction';

import { mockAward } from '../mockAward';
import mockLoanTransaction from './mockLoanTransaction';

// mock the child component by replacing it with a function that returns a null element
jest.mock('components/award/table/LoanTransactionsTable', () =>
    jest.fn(() => null));

// force Jest to use native Node promises
// see: https://facebook.github.io/jest/docs/troubleshooting.html#unresolved-promises
global.Promise = require.requireActual('promise');

const mockActions = {};

// replace all the award actions with mocked functions
Object.keys(awardActions).forEach((key) => {
    mockActions[key] = jest.fn();
});

const mockSearchHelper = (functionName, event, expectedResponse) => {
    jest.useFakeTimers();
    // override the specified function
    SearchHelper[functionName] = jest.fn(() => {
        // Axios normally returns a promise, replicate this, but return the expected result
        const networkCall = new Promise((resolve, reject) => {
            process.nextTick(() => {
                if (event === 'resolve') {
                    resolve({
                        data: expectedResponse
                    });
                }
                else {
                    reject({
                        data: expectedResponse
                    });
                }
            });
        });

        return {
            promise: networkCall,
            cancel: jest.fn()
        };
    });
};

const unmockSearchHelper = () => {
    jest.useRealTimers();
    jest.unmock('helpers/searchHelper');
};

const loadDataSpy = sinon.spy(LoanTransactionsTableContainer.prototype, 'fetchTransactions');

describe('LoanTransactionsTableContainer', () => {
    it('should perform an API request on mount', () => {
        mockSearchHelper('fetchAwardTransaction', 'resolve', mockLoanTransaction);

        mount(<LoanTransactionsTableContainer
            {...mockActions}
            award={mockAward} />);

        jest.runAllTicks();

        expect(loadDataSpy.callCount).toBe(1);
        unmockSearchHelper();
        loadDataSpy.reset();
    });

    it('should perform an API request when the award ID changes', () => {
        mockSearchHelper('fetchAwardTransaction', 'resolve', mockLoanTransaction);

        const container = mount(<LoanTransactionsTableContainer
            {...mockActions}
            award={mockAward} />);

        jest.runAllTicks();

        expect(loadDataSpy.callCount).toBe(1);

        container.setProps({
            award: Object.assign({}, mockAward, {
                selectedAward: {
                    id: 1
                }
            })
        });

        jest.runAllTicks();

        expect(loadDataSpy.callCount).toBe(2);
        unmockSearchHelper();
        loadDataSpy.reset();
    });

    describe('parseTransactions', () => {
        it('should correctly parse API data into ALoanTransaction objects', () => {
            const expected = new LoanTransaction(mockLoanTransaction.results[0]);
            delete expected._jsid;

            const setAwardTransactions = jest.fn((args) => {
                const output = args[0];
                delete output._jsid;
                expect(args).toHaveLength(1);
                expect(output).toEqual(expected);
            });
            const appendAwardTransactions = jest.fn();

            const customActions = Object.assign({}, mockActions);
            delete mockActions.setAwardTransactions;
            delete mockActions.appendAwardTransactions;

            const container = shallow(<LoanTransactionsTableContainer
                {...customActions}
                award={mockAward}
                setAwardTransactions={setAwardTransactions}
                appendAwardTransactions={appendAwardTransactions} />);

            container.instance().parseTransactions(mockLoanTransaction, true);
            expect(appendAwardTransactions).not.toHaveBeenCalled();
            expect(setAwardTransactions).toHaveBeenCalled();
        });

        it('should append LoanTransaction objects when the reset flag is false', () => {
            const expected = new LoanTransaction(mockLoanTransaction.results[0]);
            delete expected._jsid;

            const setAwardTransactions = jest.fn();
            const appendAwardTransactions = jest.fn();

            const customActions = Object.assign({}, mockActions);
            delete mockActions.setAwardTransactions;
            delete mockActions.appendAwardTransactions;

            const container = shallow(<LoanTransactionsTableContainer
                {...customActions}
                award={mockAward}
                setAwardTransactions={setAwardTransactions}
                appendAwardTransactions={appendAwardTransactions} />);

            container.instance().parseTransactions(mockLoanTransaction, false);
            expect(appendAwardTransactions).toHaveBeenCalled();
            expect(setAwardTransactions).not.toHaveBeenCalled();
        });
    });

    describe('nextTransactionPage', () => {
        it('should increment the page number when there are more pages available', () => {
            loadDataSpy.reset();

            mockSearchHelper('fetchAwardTransaction', 'resolve', mockLoanTransaction);

            const modifiedProps = Object.assign({}, mockAward, {
                transactionMeta: {
                    page: 1,
                    nextPage: true
                }
            });

            const container = shallow(<LoanTransactionsTableContainer
                {...mockActions}
                award={modifiedProps} />);

            container.instance().nextTransactionPage();
            expect(loadDataSpy.withArgs(2).callCount).toBe(1);
            loadDataSpy.reset();
        });
        it('should do nothing when there are no more pages to load', () => {
            mockSearchHelper('fetchAwardTransaction', 'resolve', mockLoanTransaction);

            const modifiedProps = Object.assign({}, mockAward, {
                transactionMeta: {
                    page: 5,
                    nextPage: false
                }
            });

            const container = shallow(<LoanTransactionsTableContainer
                {...mockActions}
                award={modifiedProps} />);

            container.instance().nextTransactionPage();
            expect(loadDataSpy.notCalled).toBeTruthy();
            loadDataSpy.reset();
        });
    });

    describe('formatSort', () => {
        it('should add a - sign before the sorted field for descending order', () => {
            const modifiedProps = Object.assign({}, mockAward, {
                transactionSort: {
                    direction: 'desc',
                    field: 'field'
                }
            });

            const container = shallow(<LoanTransactionsTableContainer
                {...mockActions}
                award={modifiedProps} />);
            const output = container.instance().formatSort();

            expect(output).toEqual('-field');
        });

        it('should just return the field name for ascending order', () => {
            const modifiedProps = Object.assign({}, mockAward, {
                transactionSort: {
                    direction: 'asc',
                    field: 'field'
                }
            });

            const container = shallow(<LoanTransactionsTableContainer
                {...mockActions}
                award={modifiedProps} />);
            const output = container.instance().formatSort();

            expect(output).toEqual('field');
        });
    });
});
