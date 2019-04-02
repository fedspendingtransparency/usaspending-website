/**
 * AwardDataContainer-test.jsx
 * Created by Lizzie Salita 11/6/17
 */

import React from 'react';
import { mount } from 'enzyme';
import { AwardDataContainer } from 'containers/bulkDownload/awards/AwardDataContainer';
import {mockActions, mockAgencies, mockRedux} from '../mockData';

// mock the bulkDownload helper
jest.mock('helpers/bulkDownloadHelper', () => require('../mockBulkDownloadHelper'));

// mock the child component by replacing it with a function that returns a null element
jest.mock('components/bulkDownload/awards/AwardDataContent', () => jest.fn(() => null));

describe('AwardDataContainer', () => {
    it('should make an API call for the agencies on mount', async () => {
        const container = mount(<AwardDataContainer
            {...mockActions}
            bulkDownload={mockRedux} />);

        const expectedState = {
            cfoAgencies: mockAgencies.cfo_agencies,
            otherAgencies: mockAgencies.other_agencies
        };

        await container.instance().agencyListRequest.promise;

        expect(container.state().agencies).toEqual(expectedState);
    });
});
