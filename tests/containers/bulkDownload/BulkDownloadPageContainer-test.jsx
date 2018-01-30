/**
 * BulkDownloadPageContainer-test.jsx
 * Created by Lizzie Salita 11/6/17
 */

import React from 'react';
import { mount, shallow } from 'enzyme';
import { List } from 'immutable';
import sinon from 'sinon';

// mock the bulkDownload helper
jest.mock('helpers/bulkDownloadHelper', () => require('./mockBulkDownloadHelper'));

import { BulkDownloadPageContainer } from 'containers/bulkDownload/BulkDownloadPageContainer';
import { mockAgencies, mockSubAgencies, mockActions, mockRedux, mockParams } from './mockData';

// mock the child component by replacing it with a function that returns a null element
jest.mock('components/bulkDownload/BulkDownloadPage', () => jest.fn(() => null));

// spy on specific functions inside the component
const requestDownloadSpy = sinon.spy(BulkDownloadPageContainer.prototype, 'requestDownload');

describe('BulkDownloadPageContainer', () => {
    it('should make an API call when startDownload() is called', () => {
        const container = mount(<BulkDownloadPageContainer
            {...mockActions}
            params={mockParams}
            bulkDownload={mockRedux.bulkDownload} />);

        container.instance().startAwardDownload();

        expect(requestDownloadSpy.callCount).toEqual(1);

        requestDownloadSpy.reset();
    });
});
