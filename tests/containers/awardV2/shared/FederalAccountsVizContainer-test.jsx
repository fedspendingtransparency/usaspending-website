/**
 * FederalAccountsVizContainer-test.js
 * Created by Max Kendall 2/21/19
 * */

import React from 'react';
import { mount, shallow } from 'enzyme';

import { FederalAccountsVizContainer } from '../../../../src/js/containers/awardV2/shared/FederalAccountsVizContainer';

jest.mock('helpers/idvHelper', () => require('../idv/mockIdvHelper'));

const setup = (props) => mount(<FederalAccountsVizContainer {...props} />);
const shallowSetup = (props) => shallow(<FederalAccountsVizContainer {...props} />);

describe('FederalAccountsVizContainer', () => {
    const getFederalAccounts = jest.fn();

    describe('componentDidMount', () => {
        it('should not make an api call', async () => {
            const container = setup({
                awardId: '123',
                category: 'idv',
                totalTransactionObligatedAmount: 0
            });
            container.instance().getFederalAccounts = getFederalAccounts;
            await container.instance().componentDidMount();
            expect(getFederalAccounts).toHaveBeenCalledTimes(0);
        });
    });

    describe('componentDidUpdate', () => {
        it('should make an api call when totalTransactionObligatedAmount changes', async () => {
            const container = setup({
                awardId: '123',
                category: 'idv',
                totalTransactionObligatedAmount: 0
            });
            container.instance().getFederalAccounts = getFederalAccounts;
            container.setProps({ totalTransactionObligatedAmount: 12345 });
            expect(container.instance().getFederalAccounts).toHaveBeenCalled();
        });
    });

    describe('updateSort', () => {
        it('should update the sort & order state & fetch sorted accounts', async () => {
            const container = shallowSetup({
                awardId: '123',
                category: 'idv',
                totalTransactionObligatedAmount: 12345
            });
            container.instance().getFederalAccounts = getFederalAccounts;
            container.instance().updateSort('account_title', 'asc');

            const { state } = container.instance();

            expect(state.sort).toEqual('account_title');
            expect(state.order).toEqual('asc');
            expect(container.instance().getFederalAccounts).toHaveBeenCalled();
        });
    });

    describe('changePage', () => {
        it('should update the page state & fetch more accounts', async () => {
            const container = shallowSetup({
                awardId: '123',
                category: 'idv',
                totalTransactionObligatedAmount: 12345
            });
            container.instance().getFederalAccounts = getFederalAccounts;
            container.instance().changePage(2);

            expect(container.instance().state.page).toEqual(2);
            expect(container.instance().getFederalAccounts).toHaveBeenCalled();
        });
    });
});
