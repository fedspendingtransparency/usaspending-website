/**
 * @jest-environment jsdom
 */

import React from 'react';
import { screen } from '@testing-library/react';
import ContractGrantActivityContainer from "../../../../src/js/containers/award/shared/ContractGrantActivityContainer";
import { render, act } from '../../../testResources/test-utils';
import { areTransactionDatesOrAwardAmountsInvalid } from "../../../../src/js/helpers/contractGrantActivityHelper";
const mockJumpToTransactionHistoryTable = jest.fn();

const mockedProps = {
    awardId: '1234',
    awardType: 'grant',
    dates: { },
    totalObligation: 12000,
    jumpToTransactionHistoryTable: mockJumpToTransactionHistoryTable
};

jest.mock("../../../../src/js/components/award/shared/activity/ContractGrantActivity", ()=> jest.fn(() => null))
jest.mock("../../../../src/js/components/sharedComponents/NoResultsMessage", ()=> jest.fn(() => null))
jest.mock("../../../../src/js/components/search/table/ResultsTableErrorMessage", ()=> jest.fn(() => null))
jest.mock("../../../../src/js/components/search/table/ResultsTableLoadingMessage", ()=> jest.fn(() => null))
jest.mock("../../../../src/js/helpers/contractGrantActivityHelper");



describe('ContractGrantActivityContainer', () => {

    it('has the title', () => {
        render(<ContractGrantActivityContainer {...mockedProps} />);
        expect(screen.getByText("Grant Activity")).toBeTruthy();
    })

    it('view transaction table button', () => {
        render(<ContractGrantActivityContainer {...mockedProps} />);
        expect(screen.getByText("View transactions table")).toBeTruthy()
    });

});
