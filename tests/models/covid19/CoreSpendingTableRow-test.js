/**
 * @jest-environment jsdom
 * 
 * CoreSpendingTableRow-test.js
 * Created by Lizzie Salita 7/8/20
 */

import CoreSpendingTableRow from 'models/v2/covid19/CoreSpendingTableRow';
import { mockRowData } from './mockData';

const row = Object.create(CoreSpendingTableRow);
row.populateCore(mockRowData);

describe('COVID-19 spending table row', () => {
    describe('name column properties', () => {
        it('should store the id', () => {
            expect(row._id).toEqual('43');
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
    describe('award count of awards properties', () => {
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
    describe('setters work correctly', () => {
        it('should set the outlay', () => {
            row.outlay = null;
            expect(row._outlay).toEqual(null);
        });
        it('should set the obligation', () => {
            row.obligation = null;
            expect(row._obligation).toEqual(null);
        });
    });
});
