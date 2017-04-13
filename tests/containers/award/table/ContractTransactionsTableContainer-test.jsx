/**
 * ContractTransactionsTableContainer-test.jsx
 * Created by Kevin Li 3/16/17
 */

import React from 'react';
import { mount, shallow } from 'enzyme';
import sinon from 'sinon';

import { ContractTransactionsTableContainer } from
    'containers/award/table/ContractTransactionsTableContainer';
import * as awardActions from 'redux/actions/award/awardActions';
import * as SearchHelper from 'helpers/searchHelper';

import ContractTransaction from 'models/results/transactions/ContractTransaction';

import { mockAward } from '../mockAward';
import mockContractTransaction from './mockContractTransaction';

// mock the child component by replacing it with a function that returns a null element
jest.mock('components/award/table/ContractTransactionsTable', () =>
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

const loadDataSpy = sinon.spy(ContractTransactionsTableContainer.prototype, 'fetchTransactions');

describe('ContractTransactionsTableContainer', () => {
    it('should perform an API request on mount', () => {
        mockSearchHelper('fetchAwardTransaction', 'resolve', mockContractTransaction);

        mount(<ContractTransactionsTableContainer
            {...mockActions}
            award={mockAward} />);

        jest.runAllTicks();

        expect(loadDataSpy.callCount).toBe(1);
        unmockSearchHelper();
        loadDataSpy.reset();
    });

    it('should perform an API request when the award ID changes', () => {
        mockSearchHelper('fetchAwardTransaction', 'resolve', mockContractTransaction);

        const container = mount(<ContractTransactionsTableContainer
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
        it('should correctly parse API data into ContractTransaction objects', () => {
            const expected = new ContractTransaction(mockContractTransaction.results[0]);
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

            const container = shallow(<ContractTransactionsTableContainer
                {...customActions}
                award={mockAward}
                setAwardTransactions={setAwardTransactions}
                appendAwardTransactions={appendAwardTransactions} />);

            container.instance().parseTransactions(mockContractTransaction, true);
            expect(appendAwardTransactions).not.toHaveBeenCalled();
            expect(setAwardTransactions).toHaveBeenCalled();
        });

        it('should append AssistanceTransaction objects when the reset flag is false', () => {
            const expected = new ContractTransaction(mockContractTransaction.results[0]);
            delete expected._jsid;

            const setAwardTransactions = jest.fn();
            const appendAwardTransactions = jest.fn();

            const customActions = Object.assign({}, mockActions);
            delete mockActions.setAwardTransactions;
            delete mockActions.appendAwardTransactions;

            const container = shallow(<ContractTransactionsTableContainer
                {...customActions}
                award={mockAward}
                setAwardTransactions={setAwardTransactions}
                appendAwardTransactions={appendAwardTransactions} />);

            container.instance().parseTransactions(mockContractTransaction, false);
            expect(appendAwardTransactions).toHaveBeenCalled();
            expect(setAwardTransactions).not.toHaveBeenCalled();
        });
    });

    describe('nextTransactionPage', () => {
        it('should increment the page number when there are more pages available', () => {
            loadDataSpy.reset();

            mockSearchHelper('fetchAwardTransaction', 'resolve', mockContractTransaction);

            const modifiedProps = Object.assign({}, mockAward, {
                transactionMeta: {
                    page: 1,
                    nextPage: true
                }
            });

            const container = shallow(<ContractTransactionsTableContainer
                {...mockActions}
                award={modifiedProps} />);

            container.instance().nextTransactionPage();
            expect(loadDataSpy.withArgs(2).callCount).toBe(1);
            loadDataSpy.reset();
        });
        it('should do nothing when there are no more pages to load', () => {
            mockSearchHelper('fetchAwardTransaction', 'resolve', mockContractTransaction);

            const modifiedProps = Object.assign({}, mockAward, {
                transactionMeta: {
                    page: 5,
                    nextPage: false
                }
            });

            const container = shallow(<ContractTransactionsTableContainer
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

            const container = shallow(<ContractTransactionsTableContainer
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

            const container = shallow(<ContractTransactionsTableContainer
                {...mockActions}
                award={modifiedProps} />);
            const output = container.instance().formatSort();

            expect(output).toEqual('field');
        });
    });
});
