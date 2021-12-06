/**
 * AccountContainer-test.jsx
 * Created by Kevin Li 3/27/17
 */

import React from 'react';
import { mount, shallow } from 'enzyme';
import sinon from 'sinon';

import { AccountContainer } from 'containers/account/AccountContainer';
import FederalAccount from 'models/v1/account/FederalAccount';

import { mockAccount, mockReduxAccount, mockSnapshot } from './mockAccount';

jest.mock('apis/account', () => require('./accountHelper'));
jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;

// spy on specific functions inside the component
const loadAccountSpy = sinon.spy(AccountContainer.prototype, 'loadData');
const loadFiscalYearSnapshotSpy = sinon.spy(AccountContainer.prototype, 'loadFiscalYearSnapshot');

const parameters = {
    params: {
        accountNumber: '123-4567'
    }
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

const stripModelId = (model) => {
    const stripped = Object.assign({}, model);
    delete stripped._jsid;
    return stripped;
};

describe('AccountContainer', () => {
    afterEach(() => {
        loadAccountSpy.reset();
        loadFiscalYearSnapshotSpy.reset();
    });
    it('should make an API call for the selected account on mount', async () => {
        const container = mount(<AccountContainer
            latestPeriod={{ year: 2020 }}
            match={parameters}
            setSelectedAccount={jest.fn()}
            account={mockReduxAccount} />);

        await container.instance().accountRequest.promise;
        await container.instance().fiscalYearSnapshotRequest.promise;

        expect(loadAccountSpy.callCount).toEqual(1);
        expect(loadFiscalYearSnapshotSpy.callCount).toEqual(1);
    });

    it('should make an API call when the account number parameter changes', async () => {
        const container = mount(<AccountContainer
            latestPeriod={{ year: 2020 }}
            match={parameters}
            setSelectedAccount={jest.fn()}
            account={mockReduxAccount} />);

        await container.instance().accountRequest.promise;
        await container.instance().fiscalYearSnapshotRequest.promise;

        expect(loadAccountSpy.callCount).toEqual(1);
        expect(loadFiscalYearSnapshotSpy.callCount).toEqual(1);

        container.setProps({
            match: {
                params: {
                    accountNumber: '765-4321'
                }
            }
        });

        await container.instance().accountRequest.promise;
        await container.instance().fiscalYearSnapshotRequest.promise;

        expect(loadAccountSpy.callCount).toEqual(2);
        expect(loadFiscalYearSnapshotSpy.callCount).toEqual(2);
    });

    it('should not make an API call for FY Snapshot data if the latest FY is not available', async () => {
        const container = mount(<AccountContainer
            latestPeriod={{ year: null }}
            match={parameters}
            setSelectedAccount={jest.fn()}
            account={mockReduxAccount} />);

        await container.instance().accountRequest.promise;

        expect(loadAccountSpy.callCount).toEqual(1);
        expect(loadFiscalYearSnapshotSpy.callCount).toEqual(0);
    });

    it('should make an API call for FY Snapshot data when the latest FY becomes available', () => {
        const container = shallow(<AccountContainer
            latestPeriod={{ year: 1999 }}
            match={parameters}
            setSelectedAccount={jest.fn()}
            account={mockReduxAccount} />);

        const prevProps = {
            latestPeriod: { year: null },
            account: mockAccount,
            match: parameters
        };

        container.instance().componentDidUpdate(prevProps);

        expect(loadFiscalYearSnapshotSpy.callCount).toEqual(1);
    });

    describe('parseAccount', () => {
        it('should parse the returned account and send to the Redux store', () => {
            const expected = new FederalAccount(mockAccount);
            const reduxAction = jest.fn();

            const container = shallow(<AccountContainer
                latestPeriod={{ year: 2020 }}
                setSelectedAccount={reduxAction} />);
            container.instance().parseAccount(mockAccount);
            expect(reduxAction).toHaveBeenCalledTimes(1);

            const args = reduxAction.mock.calls[0][0];
            expect(stripModelId(args)).toEqual(stripModelId(expected));
        });
    });

    describe('parseFYSnapshot', () => {
        it('should parse the returned fiscal year snapshot and add the data to the Redux account object', () => {
            const initialModel = new FederalAccount(mockAccount);
            initialModel.totals = {
                available: false,
                obligated: 0,
                unobligated: 0,
                budgetAuthority: 0,
                outlay: 0,
                balanceBroughtForward: 0,
                otherBudgetaryResources: 0,
                appropriations: 0
            };

            const reduxAction = jest.fn();

            const container = shallow(<AccountContainer
                submissionPeriods={[]}
                latestPeriod={{ year: 2020 }}
                setSelectedAccount={reduxAction}
                account={initialModel} />);

            container.instance().parseFYSnapshot(mockSnapshot);
            expect(reduxAction).toHaveBeenCalledTimes(1);

            const arg = reduxAction.mock.calls[0][0];
            expect(arg.totals).toEqual(mockReduxAccount.totals);
        });
        it('should indicate the FY values are not available when no snapshot data is returned', () => {
            const initialModel = new FederalAccount(mockAccount);
            initialModel.totals = {
                available: false,
                obligated: 0,
                unobligated: 0,
                budgetAuthority: 0,
                outlay: 0,
                balanceBroughtForward: 0,
                otherBudgetaryResources: 0,
                appropriations: 0
            };

            const reduxAction = jest.fn();

            const container = shallow(<AccountContainer
                submissionPeriods={[]}
                latestPeriod={{ year: 2020 }}
                setSelectedAccount={reduxAction}
                account={initialModel} />);

            container.instance().parseFYSnapshot({});
            expect(reduxAction).toHaveBeenCalledTimes(1);

            const arg = reduxAction.mock.calls[0][0];
            expect(arg.totals.available).toBeFalsy();
        });
    });
});
