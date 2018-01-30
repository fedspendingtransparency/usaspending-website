/**
 * AccountContainer-test.jsx
 * Created by Kevin Li 3/27/17
 */

import React from 'react';
import { mount, shallow } from 'enzyme';
import sinon from 'sinon';

import { AccountContainer } from 'containers/account/AccountContainer';
import FederalAccount from 'models/account/FederalAccount';

import { mockAccount, mockBalances, mockReduxAccount } from './mockAccount';

jest.mock('helpers/accountHelper', () => require('./accountHelper'));
jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;

// spy on specific functions inside the component
const loadAccountSpy = sinon.spy(AccountContainer.prototype, 'loadData');
const loadBalancesSpy = sinon.spy(AccountContainer.prototype, 'loadBalances');

const parameters = {
    accountId: 2507
};

// mock the child component by replacing it with a function that returns a null element
jest.mock('components/account/Account', () =>
    jest.fn(() => null));

jest.mock('components/account/InvalidAccount', () =>
    jest.fn(() => null));

jest.mock('components/account/LoadingAccount', () =>
    jest.fn(() => null));

// mock the GlossaryButtonWrapper container because there's no Redux store to connect to
jest.mock('containers/glossary/GlossaryButtonWrapperContainer', () =>
    jest.fn(() => null));

// also mock the Glossary container for the same reason
jest.mock('containers/glossary/GlossaryContainer', () =>
    jest.fn(() => null));

describe('AccountContainer', () => {
    it('should make an API call for the selected account on mount', async () => {
        const mockRedux = {
            account: mockReduxAccount
        };

        const container = mount(<AccountContainer
            params={parameters}
            setSelectedAccount={jest.fn()}
            account={mockRedux} />);

        await container.instance().accountRequest.promise;
        await container.instance().balanceRequests.promise;

        expect(loadAccountSpy.callCount).toEqual(1);
        expect(loadBalancesSpy.callCount).toEqual(1);

        loadAccountSpy.reset();
        loadBalancesSpy.reset();
    });

    it('should make an API call when the award ID parameter changes', async () => {
        const mockRedux = {
            account: mockReduxAccount
        };

        const container = mount(<AccountContainer
            params={parameters}
            setSelectedAccount={jest.fn()}
            account={mockRedux} />);

        await container.instance().accountRequest.promise;
        await container.instance().balanceRequests.promise;

        expect(loadAccountSpy.callCount).toEqual(1);
        expect(loadBalancesSpy.callCount).toEqual(1);

        container.setProps({
            params: {
                accountId: 2508
            }
        });

        await container.instance().accountRequest.promise;
        await container.instance().balanceRequests.promise;

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
