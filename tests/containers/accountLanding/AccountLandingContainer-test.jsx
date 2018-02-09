/**
 * AccountLandingContainer-test.jsx
 * Created by Lizzie Salita 2/7/18
 */

import React from 'react';
import { mount, shallow } from 'enzyme';

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
        it('should build the table', () => {
            const container = shallow(<AccountLandingContainer />);

            container.instance().showColumns();

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
            const container = shallow(<AccountLandingContainer />);

            container.instance().parseAccounts(mockData.data);
            expect(container.state().results).toEqual(mockParsed);
        });
    });

    describe('updateSort', () => {
        it('should update the container state', () => {
            const container = shallow(<AccountLandingContainer />);

            // change the sort order
            container.instance().updateSort('managing_agency', 'asc');

            expect(container.state().order).toEqual({
                field: 'managing_agency',
                direction: 'asc'
            });
        });
    });

    describe('onChangePage', () => {
        it('should update the page number when in range', () => {
            const container = shallow(<AccountLandingContainer />);
            // Give the container enough items for two pages
            container.setState({
                totalItems: 75
            });
            // change the page number
            container.instance().onChangePage(2);

            expect(container.state().pageNumber).toEqual(2);
        });
        it('should not update the page number when out of range', () => {
            const container = shallow(<AccountLandingContainer />);
            // Give the container enough items for two pages
            container.setState({
                totalItems: 75
            });
            // try to change the page number
            container.instance().onChangePage(3);

            expect(container.state().pageNumber).toEqual(1);
        });
    });
});
