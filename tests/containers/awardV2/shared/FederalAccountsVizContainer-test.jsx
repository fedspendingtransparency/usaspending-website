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

    it('componentDidMount -- makes api call then updates state', async () => {
        const container = setup({
            awardId: '123',
            category: 'idv'
        });
        container.instance().getFederalAccounts = getFederalAccounts;
        await container.instance().componentDidMount();
        expect(getFederalAccounts).toHaveBeenCalled();
    });

    it('componentDidUpdate -- makes api call w/ new award id', async () => {
        const container = setup({
            awardId: '123',
            category: 'idv'
        });
        container.instance().getFederalAccounts = getFederalAccounts;
        container.setProps({ awardId: '456' });
        expect(container.instance().getFederalAccounts).toHaveBeenCalled();
    });

    it('updateSort -- should update the sort & order state & fetch sorted accounts', async () => {
        const container = shallowSetup({
            awardId: '123',
            category: 'idv'
        });
        container.instance().getFederalAccounts = getFederalAccounts;
        container.instance().updateSort('account_title', 'asc');

        const { state } = container.instance();

        expect(state.sort).toEqual('account_title');
        expect(state.order).toEqual('asc');
        expect(container.instance().getFederalAccounts).toHaveBeenCalled();
    });

    it('changePage -- should update the page state & fetch more accounts', async () => {
        const container = shallowSetup({
            awardId: '123',
            category: 'idv'
        });
        container.instance().getFederalAccounts = getFederalAccounts;
        container.instance().changePage(2);

        expect(container.instance().state.page).toEqual(2);
        expect(container.instance().getFederalAccounts).toHaveBeenCalled();
    });
});
