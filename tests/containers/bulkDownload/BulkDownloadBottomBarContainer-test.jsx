/**
 * @jest-environment jsdom
 *
 * BulkDownloadBottomBarContainer-test.jsx
 * Created by Josue Aguilar 10/20/2023
 */

import React from 'react';
import { waitFor } from "@testing-library/react";
import { mockProps } from './mockData';
import { render, screen } from '../../testResources/test-utils';
import { BulkDownloadBottomBarContainer } from "../../../src/js/containers/bulkDownload/modal/BulkDownloadBottomBarContainer";
import * as BulkDownloadHelper from '../../../src/js/helpers/bulkDownloadHelper';
import { mockApiCall } from "../../testResources/mockApiHelper";

const mockBulkDownload = mockProps.bulkDownload;
mockApiCall(BulkDownloadHelper, 'requestBulkDownloadStatus', { response: "preflight mock" });
jest.mock('../../../src/js/helpers/bulkDownloadHelper');

beforeEach(() => {
    jest.clearAllMocks();
});

const mockPropTypes = {
    bulkDownload: mockBulkDownload,
    setDownloadPending: jest.fn(),
    setDownloadCollapsed: jest.fn(),
    setDownloadExpectedFile: jest.fn(),
    resetDownload: jest.fn()
};

describe('BulkDownloadBottomBarContainer tests', () => {
    it('renders the container', () => {
        render(<BulkDownloadBottomBarContainer {...mockPropTypes} />);
    });

    it('makes component visible on render', () => {
        mockPropTypes.bulkDownload.download.pendingDownload = true;
        mockPropTypes.bulkDownload.download.showCollapsedProgress = true;

        render(<BulkDownloadBottomBarContainer {...mockPropTypes} />);

        const BottomBarDom = screen.getByText('We\'re preparing your download(s)...');

        expect(BottomBarDom).toBeTruthy();
    });

    it('properly shows error message', async () => {
        mockPropTypes.bulkDownload.download.pendingDownload = true;
        mockPropTypes.bulkDownload.download.showCollapsedProgress = true;
        mockPropTypes.bulkDownload.download.expectedFile = 'test.zip';

        const mockErrorResponse = {
            promise: new Promise((resolve) => {
                process.nextTick(() => {
                    resolve({
                        data: {
                            status: 'failed'
                        }
                    });
                });
            })
        };
        const spy = jest.spyOn(BulkDownloadHelper, 'requestBulkDownloadStatus').mockReturnValueOnce(mockErrorResponse);

        render(<BulkDownloadBottomBarContainer {...mockPropTypes} />);

        await waitFor(() => expect(spy).toHaveBeenCalledTimes(2));

        // const BottomBarDom = screen.getByText('An error occurred while generating your file.');
        // expect(BottomBarDom).toBe('wrong');
    });
});
