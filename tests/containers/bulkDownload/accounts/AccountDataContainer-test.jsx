/**
 * @jest-environment jsdom
 *
 * AccountDataContainer-test.jsx
 * Created by Josue Aguilar 10/20/2023
 */

import React from 'react';
import { mockProps } from "../mockData";
import { render, screen, act } from '../../../testResources/test-utils';
import { AccountDataContainer } from "../../../../src/js/containers/bulkDownload/accounts/AccountDataContainer";
import AccountDataContent from "../../../../src/js/components/bulkDownload/accounts/AccountDataContent";

const mockBulkDownload = mockProps.bulkDownload;

jest.mock('../../../../src/js/components/bulkDownload/accounts/AccountDataContent');

beforeEach(() => {
    jest.clearAllMocks();
});

const mockADCContainerProps = {
    updateDownloadFilter: jest.fn(),
    clearDownloadFilters: jest.fn(),
    bulkDownload: mockBulkDownload,
    clickedDownload: jest.fn(),
    setDefCodes: jest.fn()
};

describe('AccountDataContainer tests', () => {
    it('renders ADC with appropriate props', () => {
        act(() => {
            render(<AccountDataContainer {...mockADCContainerProps} />);
        });
        expect(AccountDataContent).toBeCalled();
    });

    // it('populates the agency list', () => {
    //     act(() => {
    //         render(<AccountDataContainer {...mockADCContainerProps} />);
    //     });
    //
    //     let state =
    //
    //     expect(dropdown).toBeTruthy();
    // });
});
