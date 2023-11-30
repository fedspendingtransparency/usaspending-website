/**
 * @jest-environment jsdom
 *
 * BulkDownloadBottomBarContainer-test.jsx
 * Created by Josue Aguilar 10/20/2023
 */

import React from 'react';
import { mockProps } from './mockData';
import { render, screen } from '../../testResources/test-utils';
import { BulkDownloadBottomBarContainer } from "../../../src/js/containers/bulkDownload/modal/BulkDownloadBottomBarContainer";

const mockBulkDownload = mockProps.bulkDownload;

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
});
