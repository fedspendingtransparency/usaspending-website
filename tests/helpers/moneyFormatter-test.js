/**
 * moneyFormatter-test.js
 * Created by Kevin Li 1/25/17
 */

import { formatMoney, calculatePercentage } from 'helpers/moneyFormatter';

describe('Money Formatter helper functions', () => {
    describe('formatMoney', () => {
        it('should round monetary values to the nearest dollar', () => {
            const formattedDown = formatMoney(123.45);
            expect(formattedDown).toEqual('$123');

            const formattedUp = formatMoney(123.75);
            expect(formattedUp).toEqual('$124');

            const formattedHalf = formatMoney(123.50);
            expect(formattedHalf).toEqual('$124');
        });

        it('should format positive values to $XXX,XXX format', () => {
            const formatted = formatMoney(12345678.23);
            expect(formatted).toEqual('$12,345,678');
        });

        it('should format negative values to -$XXX,XXX format', () => {
            const formatted = formatMoney(-12345678.23);
            expect(formatted).toEqual('-$12,345,678');
        });

        it('should handle zero values as $0', () => {
            const formatted = formatMoney(0);
            expect(formatted).toEqual('$0');
        });
    });
    describe('calculatePercentage', () => {
        it('should return a percentage', () => {
            expect(calculatePercentage(50, 100)).toEqual('50.0%');
        });
        it('should return a custom return message when bad data is passed', () => {
            expect(calculatePercentage(50, 0, 'Happy Troll Dance')).toEqual('Happy Troll Dance');
        });
        it('should return a -- when denominator is zero', () => {
            expect(calculatePercentage(50, 0)).toEqual('--');
        });
        it('should return a -- when denominator is not a number', () => {
            expect(calculatePercentage(50, null)).toEqual('--');
            expect(calculatePercentage(50, 'null')).toEqual('--');
            expect(calculatePercentage(50, '')).toEqual('--');
        });
        it('should return a -- when numerator is not a number', () => {
            expect(calculatePercentage(null, 100)).toEqual('--');
            expect(calculatePercentage('null', 100)).toEqual('--');
            expect(calculatePercentage('', 100)).toEqual('--');
        });
    });
});
