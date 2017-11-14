/**
 * AwardDataContainer-test.jsx
 * Created by Lizzie Salita 11/6/17
 */

import React from 'react';
import { mount, shallow } from 'enzyme';
import { List } from 'immutable';
import sinon from 'sinon';

// mock the bulkDownload helper
jest.mock('helpers/bulkDownloadHelper', () => require('../mockBulkDownloadHelper'));

import { AwardDataContainer } from 'containers/bulkDownload/awards/AwardDataContainer';
import { mockAgencies, mockSubAgencies, mockActions, mockRedux } from '../mockData';

// mock the child component by replacing it with a function that returns a null element
jest.mock('components/bulkDownload/awards/AwardDataContent', () => jest.fn(() => null));

// spy on specific functions inside the component
const setAgencyListSpy = sinon.spy(AwardDataContainer.prototype, 'setAgencyList');

describe('AwardDataContainer', () => {
    it('should make an API call for the agencies on mount', async () => {
        const container = mount(<AwardDataContainer
            {...mockActions}
            bulkDownload={mockRedux} />);

        await container.instance().agencyListRequest.promise;

        expect(setAgencyListSpy.callCount).toEqual(1);

        setAgencyListSpy.reset();
    });
});
