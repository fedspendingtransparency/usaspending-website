/**
 * @jest-environment jsdom
 * 
 * BaseCFDA-test.js
 * Created by Jonathan Hill 03/18/20
 */

import { cloneDeep } from 'lodash';
import { calculatePercentage } from 'helpers/moneyFormatter';
import BaseCFDA from 'models/v2/award/BaseCFDA';
import { mockLoan } from './mockAwardApi';

const denominator = 100000;
const firstCFDA = mockLoan.cfda_info[0];
const cfda = new BaseCFDA(firstCFDA, denominator);

describe('Base CFDA', () => {
    describe('Federal Action Obligation Amount Private ', () => {
        it('should be a number given a number', () => {
            const badFirstCFDA = cloneDeep(mockLoan.cfda_info[0]);
            badFirstCFDA.federal_action_obligation_amount = 0;
            const badCFDA = new BaseCFDA(badFirstCFDA, denominator);
            expect(badCFDA._federalActionOblicationAmount).toEqual(0);
        });
        it('should be a empty string given a string', () => {
            const badFirstCFDA = cloneDeep(mockLoan.cfda_info[0]);
            badFirstCFDA.federal_action_obligation_amount = 'bad';
            const badCFDA = new BaseCFDA(badFirstCFDA, denominator);
            expect(badCFDA._federalActionOblicationAmount).toEqual('');
        });
        it('should be a empty string given a object', () => {
            const badFirstCFDA = cloneDeep(mockLoan.cfda_info[0]);
            badFirstCFDA.federal_action_obligation_amount = null;
            const badCFDA = new BaseCFDA(badFirstCFDA, denominator);
            expect(badCFDA._federalActionOblicationAmount).toEqual('');
        });
    });
    describe('Percent of Total Private', () => {
        it('should calculate a fraction', () => {
            expect(cfda._percentOfTotal).toEqual(firstCFDA.federal_action_obligation_amount / denominator);
        });
        it('should be 0 when Obligation Amount is 0', () => {
            const badFirstCFDA = cloneDeep(mockLoan.cfda_info[0]);
            badFirstCFDA.federal_action_obligation_amount = 0;
            const badCFDA = new BaseCFDA(badFirstCFDA, denominator);
            expect(badCFDA._percentOfTotal).toEqual(0);
        });
        it('should be null when Obligation Amount is a string', () => {
            const badFirstCFDA = cloneDeep(mockLoan.cfda_info[0]);
            badFirstCFDA.federal_action_obligation_amount = 'bad';
            const badCFDA = new BaseCFDA(badFirstCFDA, denominator);
            expect(badCFDA._percentOfTotal).toEqual(null);
        });
        it('should be null when Award Obligation Amount is 0', () => {
            const badFirstCFDA = cloneDeep(mockLoan.cfda_info[0]);
            const badCFDA = new BaseCFDA(badFirstCFDA, 0);
            expect(badCFDA._percentOfTotal).toEqual(null);
        });
        it('should be null when Award Obligation Amount is a string', () => {
            const badFirstCFDA = cloneDeep(mockLoan.cfda_info[0]);
            const badCFDA = new BaseCFDA(badFirstCFDA, 'denominator');
            expect(badCFDA._percentOfTotal).toEqual(null);
        });
    });
    describe('Percent of Total', () => {
        it('should return a percent given a number', () => {
            expect(cfda.percentOfTotal).toEqual(calculatePercentage(cfda._federalActionOblicationAmount, denominator));
        });
        it('should return -- when given a string', () => {
            const badFirstCFDA = cloneDeep(mockLoan.cfda_info[0]);
            badFirstCFDA.federal_action_obligation_amount = 'bad';
            const badCFDA = new BaseCFDA(badFirstCFDA, denominator);
            expect(badCFDA.percentOfTotal).toEqual('--');
        });
        it('should return -- when given the divisor is 0', () => {
            const badFirstCFDA = cloneDeep(mockLoan.cfda_info[0]);
            const badCFDA = new BaseCFDA(badFirstCFDA, 0);
            expect(badCFDA.percentOfTotal).toEqual('--');
        });
    });
    describe('CFDA Title Short', () => {
        it('should return a string given a string < 42 characters', () => {
            const badFirstCFDA = cloneDeep(mockLoan.cfda_info[0]);
            badFirstCFDA.cfda_title = 'East Asia and Pacific Grants Program I am ';
            const badCFDA = new BaseCFDA(badFirstCFDA, denominator);
            expect(badCFDA.cfdaTitleShort).toEqual('East Asia and Pacific Grants Program I am ');
        });
        it('should return a truncated string given a string = 42 characters', () => {
            const badFirstCFDA = cloneDeep(mockLoan.cfda_info[0]);
            badFirstCFDA.cfda_title = 'East Asia and Pacific Grants Program I am R';
            const badCFDA = new BaseCFDA(badFirstCFDA, denominator);
            expect(badCFDA.cfdaTitleShort).toEqual('East Asia and Pacific Grants Program I ...');
        });
        it('should return a truncated string given a string > 42 characters', () => {
            const badFirstCFDA = cloneDeep(mockLoan.cfda_info[0]);
            badFirstCFDA.cfda_title = 'East Asia and Pacific Grants Program I am Root';
            const badCFDA = new BaseCFDA(badFirstCFDA, denominator);
            expect(badCFDA.cfdaTitleShort).toEqual('East Asia and Pacific Grants Program I ...');
        });
    });
    describe('Federal Action Oblication Amount Short', () => {
        it('should return a string formatted when obligation is a number', () => {
            expect(cfda.federalActionOblicationAmountShort).toEqual('$2.2M');
        });
        it('should return a string formatted when obligation is not a number', () => {
            const badData = cloneDeep(mockLoan.cfda_info[0]);
            badData.federal_action_obligation_amount = null;
            const badCFDA = new BaseCFDA(badData, 100000000000000);
            expect(badCFDA.federalActionOblicationAmountShort).toEqual('--');
        });
    });
});
