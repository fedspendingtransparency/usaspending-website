/**
 * @jest-environment jsdom
 *
 * BulkDownloadBottomBarContainer-test.jsx
 * Created by Josue Aguilar 10/20/2023
 */

import React from 'react';
import { fireEvent, waitFor, act } from "@testing-library/react";
import { mockProps } from './mockData';
import { render, screen } from '../../testResources/test-utils';
import { BulkDownloadBottomBarContainer } from "../../../src/js/containers/bulkDownload/modal/BulkDownloadBottomBarContainer";
import * as BulkDownloadHelper from '../../../src/js/helpers/bulkDownloadHelper';

const mockBulkDownload = mockProps.bulkDownload;

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

    it('shows download ready message', async () => {
        mockPropTypes.bulkDownload.download.pendingDownload = true;
        mockPropTypes.bulkDownload.download.showCollapsedProgress = true;
        mockPropTypes.bulkDownload.download.expectedFile = 'test.zip';

        jest.spyOn(BulkDownloadHelper, 'requestBulkDownloadStatus').mockReturnValue({
            promise: Promise.resolve({ data: { status: 'finished' } }),
            cancel: () => {}
        });

        render(<BulkDownloadBottomBarContainer {...mockPropTypes} />);

        await waitFor(() => {
            const BottomBarDom = screen.getByText('Your file is ready for download.');
            expect(BottomBarDom).toBeTruthy();

            setTimeout(() => {
                expect(BottomBarDom).toBeFalsy();
            }, 5001);
        });
    });

    it('shows error message and closes bottom bar', async () => {
        mockPropTypes.bulkDownload.download.pendingDownload = true;
        mockPropTypes.bulkDownload.download.showCollapsedProgress = true;
        mockPropTypes.bulkDownload.download.expectedFile = 'test.zip';

        jest.spyOn(BulkDownloadHelper, 'requestBulkDownloadStatus').mockReturnValue({
            promise: Promise.resolve({
                data: {
                    status: 'failed',
                    message: 'error test message'
                }
            }),
            cancel: () => {}
        });

        render(<BulkDownloadBottomBarContainer {...mockPropTypes} />);

        waitFor(() => {
            const BottomBarDom = screen.getByText('An error occurred while generating your file.');
            expect(BottomBarDom).toBeTruthy();

            setTimeout(() => {
                expect(BottomBarDom).toBeFalsy();
            }, 5001);
        });
    });

    it('shows windowWillClose message before closing', () => {
        mockPropTypes.bulkDownload.download.pendingDownload = true;
        mockPropTypes.bulkDownload.download.showCollapsedProgress = true;

        window.removeEventListener = jest.fn();

        render(<BulkDownloadBottomBarContainer {...mockPropTypes} />);

        act(() => {
            fireEvent(window, new Event('beforeunload'));
        });

        expect(window.removeEventListener).toBeCalled();
    });
});
