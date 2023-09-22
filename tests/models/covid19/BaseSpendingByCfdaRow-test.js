/**
 * @jest-environment jsdom
 * 
 * BaseSpendingByCfdaRow-test.js
 * Created by Lizzie Salita 6/24/20
 */

import BaseSpendingByCfdaRow from 'models/v2/covid19/BaseSpendingByCfdaRow';
import { mockCfdaData } from './mockData';

const row = Object.create(BaseSpendingByCfdaRow);
row.populate(mockCfdaData);

describe('COVID-19 spending by CFDA row', () => {
    describe('CoreSpendingTableRow properties', () => {
        describe('name column properties', () => {
            it('should store the code (CFDA number)', () => {
                expect(row.code).toEqual('43.090');
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
    describe('CFDA-specific properties', () => {
        it('should format the name using the code and description', () => {
            expect(row.name).toEqual('43.090: Description text');
        });
        it('should store the resource link value', () => {
            expect(row._link).toEqual('https://beta.sam.gov/fal/25b529f3b5f94b6c939bc0ae8424ae6c/view');
        });
    });
    describe('set name property to description if it exists and there is no code', () => {
        it('should set the name to description', () => {
            const data = {
                code: null,
                description: 'Description text',
                children: [],
                award_count: 5400,
                obligation: 89000000.01,
                outlay: 70000000.98,
                resource_link: 'https://beta.sam.gov/fal/25b529f3b5f94b6c939bc0ae8424ae6c/view',
                face_value_of_loan: 56000001.02
            };

            row.populate(data);
            expect(row.name).toEqual(data.description);
        });
    });
});
