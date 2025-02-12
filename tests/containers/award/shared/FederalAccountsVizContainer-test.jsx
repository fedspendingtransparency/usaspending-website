/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, act } from '../../../testResources/test-utils';
import  FederalAccountsVizContainer   from "../../../../src/js/containers/award/shared/FederalAccountsVizContainer";
import { mockAwardFundingMetaData } from "../../../models/award/mockAwardApi";
import * as idvHelper from "../../../../src/js/helpers/idvHelper";
import * as awardHelper from "../../../../src/js/helpers/awardSummaryHelper";

const mockedProps = {
    awardId: '1234',
    category: 'grant',
    totalTransactionObligatedAmount: 12000,


};

beforeEach(()=>{
    jest.resetAllMocks();
})

describe('getFederalAccounts', () => {
    it('calls idvfederalAccount if category is  idv', () => {
        const idvSpy = jest.spyOn(idvHelper, 'fetchIdvFederalAccounts').mockReturnValue({
            promise: Promise.resolve({ data: mockAwardFundingMetaData}),
            cancel: () => {
                console.log('cancel called')
            }
        });
        const awardSpy = jest.spyOn(awardHelper, 'fetchAwardFederalAccounts').mockReturnValue({
            promise: Promise.resolve({ data: mockAwardFundingMetaData}),
            cancel: () => {
                console.log('cancel called')
            }
        });
        act(()=> {
            render(<FederalAccountsVizContainer {...mockedProps} />,
                {initialState: {award: {id: '123', category: 'idv', totalTransactionObligatedAmount: 100}}});
        })
        expect(idvSpy).toHaveBeenCalledTimes(1);
        expect(awardSpy).not.toHaveBeenCalled();
    });
    it('calls fetchAwardFederalAccount if category is not idv', () => {
        const idvSpy = jest.spyOn(idvHelper, 'fetchIdvFederalAccounts').mockReturnValue({
            promise: Promise.resolve({ data: mockAwardFundingMetaData}),
            cancel: () => {
                console.log('cancel called')
            }
        });
        const awardSpy = jest.spyOn(awardHelper, 'fetchAwardFederalAccounts').mockReturnValue({
            promise: Promise.resolve({ data: mockAwardFundingMetaData}),
            cancel: () => {
                console.log('cancel called')
            }
        });
        act(()=> {
            render(<FederalAccountsVizContainer {...mockedProps} />,
                {initialState: {award: {id: '123', category: 'grant', totalTransactionObligatedAmount: 100}}});
        })
        expect(idvSpy).not.toHaveBeenCalled();
        expect(awardSpy).toHaveBeenCalledTimes(1)
    });
});


describe('parseFEderalAccounts', () => {
    it('parse', () => {
        const idvSpy = jest.spyOn(idvHelper, 'fetchIdvFederalAccounts').mockReturnValue({
            promise: Promise.resolve({ data: mockAwardFundingMetaData}),
            cancel: () => {
                console.log('cancel called')
            }
        });
        const awardSpy = jest.spyOn(awardHelper, 'fetchAwardFederalAccounts').mockReturnValue({
            promise: Promise.resolve({ data: mockAwardFundingMetaData}),
            cancel: () => {
                console.log('cancel called')
            }
        });
        act(()=> {
           const container =  render(<FederalAccountsVizContainer {...mockedProps} />,
                {initialState: {award: {id: '123', category: 'idv', totalTransactionObligatedAmount: 100}}});
        })
        expect(container).toBe("Hello")
    });




});





