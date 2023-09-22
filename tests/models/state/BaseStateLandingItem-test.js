/**
 * @jest-environment jsdom
 * 
 * BaseStateLandingItem-test.js
 * Created by Kevin Li 5/23/18
 */

import BaseStateLandingItem from 'models/v2/state/BaseStateLandingItem';

const mockApi = {
    fips: '01',
    code: 'XX',
    name: 'State Name',
    amount: 1234.90
};

describe('BaseStateLandingItem', () => {
    describe('populate', () => {
        it('should populate the model using the API response', () => {
            const item = Object.create(BaseStateLandingItem);
            item.populate(mockApi);

            expect(item.fips).toEqual('01');
            expect(item.code).toEqual('XX');
            expect(item.name).toEqual('State Name (XX)');
            expect(item._amount).toEqual(1234.90);
        });
        it('should use sensible defaults when fields are not provided', () => {
            const item = Object.create(BaseStateLandingItem);
            item.populate({});

            expect(item.fips).toEqual('');
            expect(item.code).toEqual('');
            expect(item.name).toEqual('');
            expect(item._amount).toEqual(0);
        });
    });
    describe('amount', () => {
        it('should return a currency-formatted string', () => {
            const item = Object.create(BaseStateLandingItem);
            item._amount = 1234.90;

            expect(item.amount).toEqual('$1,235');
        });
    });
    describe('percentage', () => {
        it('should return a two-decimal percent of the _amount relative to the provided total argument', () => {
            const item = Object.create(BaseStateLandingItem);
            item._amount = 4520;

            const percent = item.percentage(9000);
            expect(percent).toEqual('50.22%');
        });
        it('should return a --% when an invalid number results', () => {
            const item = Object.create(BaseStateLandingItem);
            item._amount = 'abc';

            const percent = item.percentage(9000);
            expect(percent).toEqual('--%');
        });
    });
});
