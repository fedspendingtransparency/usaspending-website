/**
 * FederalAccountsSummaryContainer-test.js
 * Created by Max Kendall 2/21/19
 * */

import React from 'react';
import { mount } from 'enzyme';

import BaseFundingRollup from 'models/v2/awardsV2/BaseFundingRollup';
import { FederalAccountsSummaryContainer } from '../../../../src/js/containers/awardV2/shared/FederalAccountsSummaryContainer';
import { mockAwardFundingMetaData } from '../../../models/awardsV2/mockAwardApi';

jest.mock('helpers/idvHelper', () => require('../idv/mockIdvHelper'));

const setup = (props) => mount(<FederalAccountsSummaryContainer {...props} />);
const setTotalTransactionObligatedAmount = jest.fn();

describe('FederalAccountsSummaryContainer', () => {
    it('should make an API call when componentDidMount is invoked', async () => {
        const container = setup({
            awardId: '123',
            category: 'idv',
            setTotalTransactionObligatedAmount
        });
        const getAwardMetaData = jest.fn();
        container.instance().getAwardMetaData = getAwardMetaData;
        await container.instance().componentDidMount();

        expect(getAwardMetaData).toHaveBeenCalled();
    });
    it('should make a new API call when the award id changes', async () => {
        const container = setup({
            awardId: '123',
            category: 'idv',
            setTotalTransactionObligatedAmount
        });
        const getAwardMetaData = jest.fn();
        container.instance().getAwardMetaData = getAwardMetaData;
        container.setProps({ awardId: '456' });
        expect(getAwardMetaData).toHaveBeenCalled();
    });
    describe('parseFundingRollup', () => {
        it('should set state.summary to an object with BaseFundingRollup in its prototype chain', () => {
            const container = setup({
                awardId: '123',
                category: 'idv',
                setTotalTransactionObligatedAmount
            });
            container.instance().parseFundingRollup(mockAwardFundingMetaData);

            const { state } = container.instance();
            expect(Object.getPrototypeOf(state.summary)).toEqual(BaseFundingRollup);
            expect(state.summary._obligatedAmount)
                .toEqual(mockAwardFundingMetaData.total_transaction_obligated_amount);
            expect(state.summary.awardingAgencyCount).toEqual(mockAwardFundingMetaData.awarding_agency_count);
            expect(state.summary.fundingAgencyCount).toEqual(mockAwardFundingMetaData.funding_agency_count);
            expect(state.summary.federalAccountCount).toEqual(mockAwardFundingMetaData.federal_account_count);
        });
    });
});
