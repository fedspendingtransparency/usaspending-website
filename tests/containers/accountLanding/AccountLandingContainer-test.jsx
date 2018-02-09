/**
 * AccountLandingContainer-test.jsx
 * Created by Lizzie Salita 2/7/18
 */

import React from 'react';
import { mount } from 'enzyme';

import * as FiscalYearHelper from 'helpers/fiscalYearHelper';
import AccountLandingContainer from 'containers/accountLanding/AccountLandingContainer';

import { mockData, mockParsed } from './mockFederalAccounts';

jest.mock('helpers/accountLandingHelper', () => require('./accountLandingHelper'));

// mock the child component by replacing it with a function that returns a null element
jest.mock('components/accountLanding/AccountLandingContent', () =>
    jest.fn(() => null));

describe('AccountLandingContainer', () => {
    it('should make an API request on mount', async () => {
        // mount the container
        const container = mount(<AccountLandingContainer />);
        const parseAccounts = jest.fn();
        container.instance().parseAccounts = parseAccounts;

        await container.instance().accountsRequest.promise;

        expect(parseAccounts).toHaveBeenCalledTimes(1);
    });

    describe('showColumns', () => {
        it('should build the table', async () => {
            // mount the container
            const container = mount(<AccountLandingContainer />);

            await container.instance().accountsRequest.promise;

            // validate the state contains the correctly parsed values
            const fy = FiscalYearHelper.defaultFiscalYear();
            const expectedState = [
                {
                    columnName: "accountNumber",
                    defaultDirection: "desc",
                    displayName: "Account Number"
                },
                {
                    columnName: "accountName",
                    defaultDirection: "asc",
                    displayName: "Account Name"
                },
                {
                    columnName: "managingAgency",
                    defaultDirection: "asc",
                    displayName: "Managing Agency"
                },
                {
                    columnName: "budgetaryResources",
                    defaultDirection: "desc",
                    displayName: `${fy} Budgetary Resources`
                }
            ];

            expect(container.state().columns).toEqual(expectedState);
        });
    });

    describe('parseAccounts', () => {
        it('should parse the API response and update the container state', () => {
            const container = mount(<AccountLandingContainer />);

            container.instance().parseAccounts(mockData.data);
            expect(container.state().results).toEqual(mockParsed);
        });
    });

    describe('updateSort', () => {
        it('should update the state and make an API request', async () => {
            // mount the container
            const container = mount(<AccountLandingContainer />);
            const parseAccounts = jest.fn();
            container.instance().parseAccounts = parseAccounts;

            await container.instance().accountsRequest.promise;
            expect(parseAccounts).toHaveBeenCalledTimes(1);

            // change the sort order
            container.instance().updateSort('managing_agency', 'asc');

            await container.instance().accountsRequest.promise;
            expect(container.state().order).toEqual({
                field: 'managing_agency',
                direction: 'asc'
            });
            expect(parseAccounts).toHaveBeenCalledTimes(2);
        })
    });

    describe('onChangePage', () => {
        it('should update the state and make an API request', async () => {
            // mount the container
            const container = mount(<AccountLandingContainer />);
            const parseAccounts = jest.fn();
            container.instance().parseAccounts = parseAccounts;

            await container.instance().accountsRequest.promise;
            expect(parseAccounts).toHaveBeenCalledTimes(1);

            // change the page number
            container.instance().onChangePage(2);

            await container.instance().accountsRequest.promise;
            expect(container.state().pageNumber).toEqual(2);
            expect(parseAccounts).toHaveBeenCalledTimes(2);
        });
    });
});
