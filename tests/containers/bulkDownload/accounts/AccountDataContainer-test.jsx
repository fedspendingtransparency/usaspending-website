/**
 * AccountDataContainer-test.jsx
 * Created by Lizzie Salita 4/25/18
 */

import React from 'react';
import { mount, shallow } from 'enzyme';
import { AccountDataContainer } from 'containers/bulkDownload/accounts/AccountDataContainer';
import { mockActions, mockAgencies, mockFederalAccounts, mockRedux } from '../mockData';

// mock the bulkDownload helper
jest.mock('helpers/bulkDownloadHelper', () => require('../mockBulkDownloadHelper'));

// mock the child component by replacing it with a function that returns a null element
jest.mock('components/bulkDownload/accounts/AccountDataContent', () => jest.fn(() => null));

describe('AccountDataContainer', () => {
    it('should make an API call for the agencies on mount', async () => {
        const container = mount(<AccountDataContainer
            {...mockActions}
            bulkDownload={mockRedux} />);

        const expectedState = {
            cfoAgencies: mockAgencies.cfo_agencies,
            otherAgencies: mockAgencies.other_agencies
        };

        await container.instance().agencyListRequest.promise;
        expect(container.state().agencies).toEqual(expectedState);
    });

    describe('setFederalList', () => {
        it('should make an API request when called and update state', async () => {
            const container = shallow(<AccountDataContainer
                {...mockActions}
                bulkDownload={mockRedux} />);

            const expectedState = mockFederalAccounts;
            container.instance().setFederalList('02');
            await container.instance().federalListRequest.promise;
            expect(container.state().federals).toEqual(expectedState);
        });
    });
});
