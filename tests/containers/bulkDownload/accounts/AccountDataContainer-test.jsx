/**
 * AccountDataContainer-test.jsx
 * Created by Lizzie Salita 4/25/18
 */

import React from 'react';
import { mount, shallow } from 'enzyme';
import { AccountDataContainer } from 'containers/bulkDownload/accounts/AccountDataContainer';
import { mockActions, mockAgencies, mockFederalAccounts, mockBudgetFunctions, mockProps } from '../mockData';

// mock the bulkDownload helper
jest.mock('helpers/bulkDownloadHelper', () => require('../mockBulkDownloadHelper'));

// mock the child component by replacing it with a function that returns a null element
jest.mock('components/bulkDownload/accounts/AccountDataContent', () => jest.fn(() => null));

describe('AccountDataContainer', () => {
    it('should make an API call for the agencies on mount', async () => {
        const container = mount(<AccountDataContainer
            {...mockActions}
            bulkDownload={mockProps} />);

        const expectedState = {
            cfoAgencies: mockAgencies.cfo_agencies,
            otherAgencies: mockAgencies.other_agencies
        };

        await container.instance().agencyListRequest.promise;
        expect(container.state().agencies).toEqual(expectedState);
    });

    describe('setFederalAccountList', () => {
        it('should make an API request when called and update state', async () => {
            const container = shallow(<AccountDataContainer
                {...mockActions}
                bulkDownload={mockProps} />);

            const expectedState = mockFederalAccounts;
            container.instance().setFederalAccountList('02');
            await container.instance().federalAccountListRequest.promise;
            expect(container.state().federalAccounts).toEqual(expectedState);
        });

        it('should append the results to the existing result state if the page number is greater than 1', async () => {
            const container = shallow(<AccountDataContainer
                {...mockActions}
                bulkDownload={mockProps} />);

            container.setState({
                federalAccounts: [{}, {}, {}]
            });

            expect(container.state().federalAccounts.length).toEqual(3);
            await container.instance().setFederalAccountList('02', 2);
            expect(container.state().federalAccounts.length).toEqual(5);
        });
    });
    it('should make an API call for the budget functions on mount', async () => {
        const container = mount(<AccountDataContainer
            {...mockActions}
            bulkDownload={mockProps} />);

        const expectedState = mockBudgetFunctions;

        await container.instance().budgetFunctionListRequest.promise;
        expect(container.state().budgetFunctions).toEqual(expectedState);
    });
});
