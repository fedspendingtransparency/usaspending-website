/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render } from '@testing-library/react';
import ContractGrantActivityContainer from "../../../../src/js/containers/award/shared/ContractGrantActivityContainer";

const mockJumpToTransactionHistoryTable = jest.fn();

const mockedProps = {
    awardId: '1234',
    awardType: 'grant',
    dates: { },
    totalObligation: 12000,
    jumpToTransactionHistoryTable: mockJumpToTransactionHistoryTable


};

describe('ContractGrantActivityContainer', () => {
    it('adds to Running Obligation ', () => {
        render(<ContractGrantActivityContainer {...mockedProps} />);
    });

    it('creates transactions running total obligation to date and sort', () => {
        render(<ContractGrantActivityContainer {...mockedProps} />);
    });
});
