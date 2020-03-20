/**
 * BaseCFDA-test.js
 * Created by Jonathan Hill 03/18/20
 */

import { cloneDeep } from 'lodash';
import { calculateTreemapPercentage, formatMoney } from 'helpers/moneyFormatter';
import BaseCFDA from 'models/v2/awardsV2/BaseCFDA';
import { mockLoan } from './mockAwardApi';


const firstCFDA = mockLoan.cfda_info[0];
const cfda = new BaseCFDA(firstCFDA, 100000000);

describe('Base CFDA', () => {
    describe('Total Funding Amount Private ', () => {
        it('should be a number given a number', () => {
            const badFirstCFDA = cloneDeep(mockLoan.cfda_info[0]);
            badFirstCFDA.total_funding_amount = 0;
            const badCFDA = Object.create(BaseCFDA);
            badCFDA.populate(badFirstCFDA);
            expect(badCFDA._totalFundingAmount).toEqual(0);
        });
        it('should be a empty string given a string', () => {
            const badFirstCFDA = cloneDeep(mockLoan.cfda_info[0]);
            badFirstCFDA.total_funding_amount = 'bad';
            const badCFDA = Object.create(BaseCFDA);
            badCFDA.populate(badFirstCFDA);
            expect(badCFDA._totalFundingAmount).toEqual('');
        });
        it('should be a empty string given a object', () => {
            const badFirstCFDA = cloneDeep(mockLoan.cfda_info[0]);
            badFirstCFDA.total_funding_amount = null;
            const badCFDA = Object.create(BaseCFDA);
            badCFDA.populate(badFirstCFDA);
            expect(badCFDA._totalFundingAmount).toEqual('');
        });
    });
    describe('Federal Action Obligation Amount Private ', () => {
        it('should be a number given a number', () => {
            const badFirstCFDA = cloneDeep(mockLoan.cfda_info[0]);
            badFirstCFDA.federal_action_obligation_amount = 0;
            const badCFDA = Object.create(BaseCFDA);
            badCFDA.populate(badFirstCFDA);
            expect(badCFDA._federalActionOblicationAmount).toEqual(0);
        });
        it('should be a empty string given a string', () => {
            const badFirstCFDA = cloneDeep(mockLoan.cfda_info[0]);
            badFirstCFDA.federal_action_obligation_amount = 'bad';
            const badCFDA = Object.create(BaseCFDA);
            badCFDA.populate(badFirstCFDA);
            expect(badCFDA._federalActionOblicationAmount).toEqual('');
        });
        it('should be a empty string given a object', () => {
            const badFirstCFDA = cloneDeep(mockLoan.cfda_info[0]);
            badFirstCFDA.federal_action_obligation_amount = null;
            const badCFDA = Object.create(BaseCFDA);
            badCFDA.populate(badFirstCFDA);
            expect(badCFDA._federalActionOblicationAmount).toEqual('');
        });
    });
    describe('Percent of Total Private', () => {
        it('should calculate a fraction', () => {
            expect(cfda._percentOfTotal).toEqual(firstCFDA.total_funding_amount / firstCFDA.federal_action_obligation_amount);
        });
        it('should be 0 when Total Funding Amount is 0', () => {
            const badFirstCFDA = cloneDeep(mockLoan.cfda_info[0]);
            badFirstCFDA.total_funding_amount = 0;
            const badCFDA = Object.create(BaseCFDA);
            badCFDA.populate(badFirstCFDA);
            expect(badCFDA._percentOfTotal).toEqual(0);
        });
        it('should be null when Total Funding Amount is a string', () => {
            const badFirstCFDA = cloneDeep(mockLoan.cfda_info[0]);
            badFirstCFDA.total_funding_amount = 'bad';
            const badCFDA = Object.create(BaseCFDA);
            badCFDA.populate(badFirstCFDA);
            expect(badCFDA._percentOfTotal).toEqual(null);
        });
        it('should be null when Federal Action Obligation Amount is 0', () => {
            const badFirstCFDA = cloneDeep(mockLoan.cfda_info[0]);
            badFirstCFDA.federal_action_obligation_amount = 0;
            const badCFDA = Object.create(BaseCFDA);
            badCFDA.populate(badFirstCFDA);
            expect(badCFDA._percentOfTotal).toEqual(null);
        });
        it('should be null when Federal Action Obligation Amount is a string', () => {
            const badFirstCFDA = cloneDeep(mockLoan.cfda_info[0]);
            badFirstCFDA.federal_action_obligation_amount = 'bad';
            const badCFDA = Object.create(BaseCFDA);
            badCFDA.populate(badFirstCFDA);
            expect(badCFDA._percentOfTotal).toEqual(null);
        });
    });
    describe(' Total Funding Amount', () => {
        it('should format money given a number', () => {
            expect(cfda.totalFundingAmount).toEqual(formatMoney(cfda._totalFundingAmount));
        });
        it('should return -- when given a string', () => {
            const badFirstCFDA = cloneDeep(mockLoan.cfda_info[0]);
            badFirstCFDA.total_funding_amount = 'bad';
            const badCFDA = Object.create(BaseCFDA);
            badCFDA.populate(badFirstCFDA);
            expect(badCFDA.totalFundingAmount).toEqual('--');
        });
    });
    describe('Percent of Total', () => {
        it('should return a percent given a number', () => {
            expect(cfda.percentOfTotal).toEqual(calculateTreemapPercentage(cfda._totalFundingAmount, cfda._federalActionOblicationAmount));
        });
        it('should return -- when given a string', () => {
            const badFirstCFDA = cloneDeep(mockLoan.cfda_info[0]);
            badFirstCFDA.total_funding_amount = 'bad';
            const badCFDA = Object.create(BaseCFDA);
            badCFDA.populate(badFirstCFDA);
            expect(badCFDA.percentOfTotal).toEqual('--');
        });
        it('should return -- when given the divisor is 0', () => {
            const badFirstCFDA = cloneDeep(mockLoan.cfda_info[0]);
            badFirstCFDA.federal_action_obligation_amount = 0;
            const badCFDA = Object.create(BaseCFDA);
            badCFDA.populate(badFirstCFDA);
            expect(badCFDA.percentOfTotal).toEqual('--');
        });
    });
    describe('CFDA Title Short', () => {
        it('should return a string given a string < 42 characters', () => {
            const badFirstCFDA = cloneDeep(mockLoan.cfda_info[0]);
            badFirstCFDA.cfda_title = 'East Asia and Pacific Grants Program I am ';
            const badCFDA = Object.create(BaseCFDA);
            badCFDA.populate(badFirstCFDA);
            expect(badCFDA.cfdaTitleShort).toEqual('East Asia and Pacific Grants Program I am ');
        });
        it('should return a truncated string given a string = 42 characters', () => {
            const badFirstCFDA = cloneDeep(mockLoan.cfda_info[0]);
            badFirstCFDA.cfda_title = 'East Asia and Pacific Grants Program I am R';
            const badCFDA = Object.create(BaseCFDA);
            badCFDA.populate(badFirstCFDA);
            expect(badCFDA.cfdaTitleShort).toEqual('East Asia and Pacific Grants Program I ...');
        });
        it('should return a truncated string given a string > 42 characters', () => {
            const badFirstCFDA = cloneDeep(mockLoan.cfda_info[0]);
            badFirstCFDA.cfda_title = 'East Asia and Pacific Grants Program I am Root';
            const badCFDA = Object.create(BaseCFDA);
            badCFDA.populate(badFirstCFDA);
            expect(badCFDA.cfdaTitleShort).toEqual('East Asia and Pacific Grants Program I ...');
        });
    });
});
