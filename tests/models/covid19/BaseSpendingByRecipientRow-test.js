/**
 * @jest-environment jsdom
 * 
 * BaseSpendingByRecipientRow-test.js
 * Created by Lizzie Salita 7/9/20
 */

import BaseSpendingByRecipientRow from 'models/v2/covid19/BaseSpendingByRecipientRow';
import { mockRecipientData } from './mockData';

const row = Object.create(BaseSpendingByRecipientRow);
row.populate(mockRecipientData);

describe('COVID-19 Spending by Recipient row', () => {
    describe('CoreSpendingTableRow properties', () => {
        describe('name column properties', () => {
            it('should store the id', () => {
                expect(row._id).toEqual(['hash-R', 'hash-C']);
            });
            it('should store the code', () => {
                expect(row.code).toEqual('090');
            });
            it('should store the description', () => {
                expect(row.description).toEqual('Description text');
            });
        });
        describe('obligation properties', () => {
            it('should store the raw obligated amount', () => {
                expect(row._obligation).toEqual(89000000.01);
            });
            it('should store the formatted obligated amount', () => {
                expect(row.obligation).toEqual('$89,000,000');
            });
        });
        describe('outlay properties', () => {
            it('should store the raw outlayed amount', () => {
                expect(row._outlay).toEqual(70000000.98);
            });
            it('should store the formatted outlayed amount', () => {
                expect(row.outlay).toEqual('$70,000,001');
            });
        });
        describe('count of awards properties', () => {
            it('should store the raw number of awards', () => {
                expect(row._awardCount).toEqual(5400);
            });
            it('should store the formatted number of awards', () => {
                expect(row.awardCount).toEqual('5,400');
            });
        });
        describe('face value of loan properties', () => {
            it('should store the raw face value', () => {
                expect(row._faceValueOfLoan).toEqual(56000001.02);
            });
            it('should store the formatted face value', () => {
                expect(row.faceValueOfLoan).toEqual('$56,000,001');
            });
        });
    });
    describe('recipient-specific properties', () => {
        it('should store the child recipient id', () => {
            expect(row._childId).toEqual('hash-C');
        });
        it('should store the recipient id', () => {
            expect(row._recipientId).toEqual('hash-R');
        });

        const noIdData = {
            ...mockRecipientData,
            id: []
        };
        const noIdRow = Object.create(BaseSpendingByRecipientRow);
        noIdRow.populate(noIdData);

        it('should return falsy if an id does not exist', () => {
            expect(noIdRow._childId).toBeFalsy();
            expect(noIdRow._recipientId).toBeFalsy();
        });
    });
});
