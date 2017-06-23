/**
 * AccountContainer-test.jsx
 * Created by Kevin Li 3/27/17
 */

import React from 'react';
import { mount, shallow } from 'enzyme';
import sinon from 'sinon';

import { AccountContainer } from 'containers/account/AccountContainer';
import * as AccountHelper from 'helpers/accountHelper';
import FederalAccount from 'models/account/FederalAccount';

import { mockAccount, mockBalances, mockReduxAccount } from './mockAccount';

// force Jest to use native Node promises
// see: https://facebook.github.io/jest/docs/troubleshooting.html#unresolved-promises
global.Promise = require.requireActual('promise');

// spy on specific functions inside the component
const loadAccountSpy = sinon.spy(AccountContainer.prototype, 'loadData');
const loadBalancesSpy = sinon.spy(AccountContainer.prototype, 'loadBalances');

const parameters = {
    accountId: 2507
};

// mock the child component by replacing it with a function that returns a null element
jest.mock('components/account/Account', () =>
    jest.fn(() => null));

// mock the GlossaryButtonWrapper container because there's no Redux store to connect to
jest.mock('containers/glossary/GlossaryButtonWrapperContainer', () =>
    jest.fn(() => null));

// also mock the Glossary container for the same reason
jest.mock('containers/glossary/GlossaryContainer', () =>
    jest.fn(() => null));

const mockAccountHelper = (functionName, event, expectedResponse) => {
    jest.useFakeTimers();
    // override the specified function
    AccountHelper[functionName] = jest.fn(() => {
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

const unmockAccountHelper = () => {
    jest.useRealTimers();
    jest.unmock('helpers/accountHelper');
};

describe('AccountContainer', () => {
    it('should make an API call for the selected account on mount', () => {
        mockAccountHelper('fetchFederalAccount', 'resolve', mockAccount);
        mockAccountHelper('fetchTasBalanceTotals', 'resolve', mockBalances.outlay);

        const mockRedux = {
            account: mockReduxAccount
        };

        mount(<AccountContainer
            params={parameters}
            setSelectedAccount={jest.fn()}
            account={mockRedux} />);

        jest.runAllTicks();

        expect(loadAccountSpy.callCount).toEqual(1);
        expect(loadBalancesSpy.callCount).toEqual(1);
        loadAccountSpy.reset();
        loadBalancesSpy.reset();
    });

    it('should make an API call when the award ID parameter changes', () => {
        mockAccountHelper('fetchFederalAccount', 'resolve', mockAccount);
        mockAccountHelper('fetchTasBalanceTotals', 'resolve', mockBalances.outlay);

        const mockRedux = {
            account: mockReduxAccount
        };

        const container = mount(<AccountContainer
            params={parameters}
            setSelectedAccount={jest.fn()}
            account={mockRedux} />);

        jest.runAllTicks();
        expect(loadAccountSpy.callCount).toEqual(1);
        expect(loadBalancesSpy.callCount).toEqual(1);

        container.setProps({
            params: {
                accountId: 2508
            }
        });

        jest.runAllTicks();
        expect(loadAccountSpy.callCount).toEqual(2);
        expect(loadBalancesSpy.callCount).toEqual(2);
        loadAccountSpy.reset();
        loadBalancesSpy.reset();
    });

    describe('parseAccount', () => {
        it('should parse the returned account and send to the Redux store', (done) => {
            const expected = new FederalAccount(mockAccount);
            delete expected._jsid;

            const reduxAction = jest.fn((args) => {
                const model = Object.assign({}, args);
                delete model._jsid;

                expect(model).toEqual(expected);
                done();
            });

            const container = shallow(<AccountContainer setSelectedAccount={reduxAction} />);
            container.instance().parseAccount(mockAccount);
        });
    });

    describe('parseBalances', () => {
        it('should parse the returned balances and add them to the Redux account object', (done) => {
            const initialModel = new FederalAccount(mockAccount);
            delete initialModel._jsid;
            initialModel.totals = {
                outlay: {},
                obligated: {},
                unobligated: {},
                budgetAuthority: {}
            };

            const reduxAction = jest.fn((args) => {
                const model = Object.assign({}, args);
                delete model._jsid;

                expect(model).toEqual(mockReduxAccount);
                done();
            });

            const container = shallow(<AccountContainer
                setSelectedAccount={reduxAction}
                account={initialModel} />);

            container.instance().balanceRequests = [
                {
                    type: 'outlay'
                },
                {
                    type: 'budgetAuthority'
                },
                {
                    type: 'obligated'
                },
                {
                    type: 'unobligated'
                }
            ];

            container.instance().parseBalances([
                {
                    data: mockBalances.outlay
                },
                {
                    data: mockBalances.budgetAuthority
                },
                {
                    data: mockBalances.obligated
                },
                {
                    data: mockBalances.unobligated
                }
            ]);
        });
    });
});
