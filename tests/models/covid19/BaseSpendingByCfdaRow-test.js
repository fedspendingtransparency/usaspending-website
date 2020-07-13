/**
 * BaseSpendingByCfdaRow-test.js
 * Created by Lizzie Salita 6/24/20
 */

import BaseSpendingByCfdaRow from 'models/v2/covid19/BaseSpendingByCfdaRow';
import { mockCfdaData } from './mockData';

const row = Object.create(BaseSpendingByCfdaRow);
row.populate(mockCfdaData);

describe('COVID-19 spending by CFDA row', () => {
    describe('name column properties', () => {
        it('should store the id', () => {
            expect(row._id).toEqual('43');
        });
        it('should store the code', () => {
            expect(row._code).toEqual('090');
        });
        it('should store the description', () => {
            expect(row._description).toEqual('Description text');
        });
        it('should format the number using the id and code', () => {
            expect(row._number).toEqual('43.090');
        });
        it('should format the name using the number and description', () => {
            expect(row.name).toEqual('43.090: Description text');
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
            expect(row._count).toEqual(5400);
        });
        it('should store the formatted number of awards', () => {
            expect(row.count).toEqual('5,400');
        });
    });
});
