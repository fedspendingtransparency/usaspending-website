/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, act } from '../../../testResources/test-utils';
import FederalAccountsSummaryContainer from "../../../../src/js/containers/award/shared/FederalAccountsSummaryContainer";
import { mockAwardFundingMetaData } from "../../../models/award/mockAwardApi";
import * as idvHelper from '../../../../src/js/helpers/idvHelper';
import * as awardHelper from '../../../../src/js/helpers/awardSummaryHelper';

const mockJumpToFederalAccountHistory = jest.fn();
const mockSetTotalTransactionObligatedAmount = jest.fn();
const mockedProps = {
    awardId: '18',
    category: 'grant', // comes from redux
    jumpToFederalAccountsHistory: mockJumpToFederalAccountHistory,
    setTotalTransactionObligatedAmount: mockSetTotalTransactionObligatedAmount


};


beforeEach(() => {
    jest.resetAllMocks();
});

describe('getAwardMetaData', () => {
    it('calls idFunding if category is  idv', () => {
        const idvSpy = jest.spyOn(idvHelper, 'fetchIdvFundingSummary').mockReturnValue({
            promise: Promise.resolve({ data: mockAwardFundingMetaData }),
            cancel: () => {
                console.log('cancel called');
            }
        });
        const awardSpy = jest.spyOn(awardHelper, 'fetchAwardFundingSummary').mockReturnValue({
            promise: Promise.resolve({ data: mockAwardFundingMetaData }),
            cancel: () => {
                console.log('cancel called');
            }
        });
        act(() => {
            render(
                <FederalAccountsSummaryContainer {...mockedProps} />,
                { initialState: { award: { id: '123', category: 'idv' } } }
            );
        });
        expect(idvSpy).toHaveBeenCalledTimes(1);
        expect(awardSpy).toHaveBeenCalledTimes(0);
    });

    it('calls awardFunding if category is awardFunding idv', () => {
        const idvSpy = jest.spyOn(idvHelper, 'fetchIdvFundingSummary').mockReturnValue({
            promise: Promise.resolve({ data: mockAwardFundingMetaData }),
            cancel: () => {
                console.log('cancel called');
            }
        });
        const awardSpy = jest.spyOn(awardHelper, 'fetchAwardFundingSummary').mockReturnValue({
            promise: Promise.resolve({ data: mockAwardFundingMetaData }),
            cancel: () => {
                console.log('cancel called');
            }
        });
        act(() => {
            render(
                <FederalAccountsSummaryContainer {...mockedProps} />,
                { initialState: { award: { id: '123', category: 'grant' } } }
            );
        });
        expect(idvSpy).not.toHaveBeenCalled();
        expect(awardSpy).toHaveBeenCalledTimes(1);
    });
});
