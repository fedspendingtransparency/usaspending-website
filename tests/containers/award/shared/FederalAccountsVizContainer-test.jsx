/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, act } from '../../../testResources/test-utils';
import  FederalAccountsVizContainer   from "../../../../src/js/containers/award/shared/FederalAccountsVizContainer";
import { mockAwardFederalAccounts, mockAwardFundingMetaData } from "../../../models/award/mockAwardApi";
import * as idvHelper from "../../../../src/js/helpers/idvHelper";
import * as awardHelper from "../../../../src/js/helpers/awardSummaryHelper";
import BaseFederalAccount from 'models/v2/award/BaseFederalAccount';
import {screen} from "@testing-library/react"

const mockedProps = {
    awardId: '1234',
    category: 'grant',
    totalTransactionObligatedAmount: 12000,


};
jest.mock('../../../../src/js/components/award/shared/federalAccounts/FederalAccountsViz', () => (
    {
    inFlight = false,
    error = false,
    page =1 ,
    limit  = 10,
    sort = "total_transaction_obligated_amounts",
    order = "desc",
    total = 0,
    federalAccounts = [],
    view = "",
    changePage = jest.fn(),
    updateSort = jest.fn(),
    changeView = jest.fn()
}) => (
    <div>
        <h1 data-testid="total">{total}</h1>
        <h1 data-testid="federalAccount">
            {federalAccounts.map((account) => (<p data-testid="account">{account}</p>))}
        </h1>
    </div>
));


beforeEach(() => {
    jest.resetAllMocks();
});
let mockInitialState =
    {award: {id: '123', category: 'idv', totalTransactionObligatedAmount: 100}}



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


    it('should render labels & values', () => {
        render(<FederalAccountsVizContainer {...mockedProps} />,
            {initialState: mockInitialState});
        expect(screen.getAllByRole("button").length).toBe(2)
    })






