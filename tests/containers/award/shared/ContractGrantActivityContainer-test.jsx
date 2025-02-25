/**
 * @jest-environment jsdom
 */

import React from 'react';
import { screen } from '@testing-library/react';
import ContractGrantActivityContainer from "../../../../src/js/containers/award/shared/ContractGrantActivityContainer";
import { render, act } from '../../../testResources/test-utils';

const mockJumpToTransactionHistoryTable = jest.fn();

const mockedProps = {
    awardId: '1234',
    awardType: 'grant',
    dates: { },
    totalObligation: 12000,
    jumpToTransactionHistoryTable: mockJumpToTransactionHistoryTable
};

jest.mock("../../../../src/js/components/award/shared/federalAccounts/FederalAccountsViz", ()=> jest.fn(() => null))

describe('ContractGrantActivityContainer', () => {
    it('expects label and items', () => {
        render(<ContractGrantActivityContainer {...mockedProps} />);
        expect(screen.getByLabelText("Grant Activity")).toBeTruthy();
    })

    it('view transaction table button', () => {
        render(<ContractGrantActivityContainer {...mockedProps} />);
        expect(screen.getByRole("button")).toHaveLength(1);
    })


});
