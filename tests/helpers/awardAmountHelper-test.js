/**
 * awardAmountHelper-test.js
 * Created by michaelbray on 3/9/17.
 */

import { formatAwardAmountRange, formatNumber } from 'helpers/awardAmountHelper';

describe('Award Amounts Advanced Search Filter Helper', () => {
    describe('Format Labels', () => {
        describe('No Decimal Places', () => {
            it('should return "$0 - $0" for ranges where the min and max are both 0', () => {
                const mockedRange = formatAwardAmountRange([0, 0], 0);
                expect(mockedRange).toEqual("$0 - $0");
            });

            it('should return "$0 & Above" for ranges where the min and max are both 0', () => {
                const mockedRange = formatAwardAmountRange([0, null], 0);
                expect(mockedRange).toEqual("$0 & Above");
            });

            it('should return "Under $0" for ranges where the min and max are both 0', () => {
                const mockedRange = formatAwardAmountRange([null, 0], 0);
                expect(mockedRange).toEqual("Under $0");
            });

            it('should return "Under $[Max]" for ranges where the min is 0', () => {
                const mockedRange = formatAwardAmountRange([null, 10000], 0);
                expect(mockedRange).toEqual("Under $10,000");
            });

            it('should return "$[Min] & Above" for ranges where the max is 0', () => {
                const mockedRange = formatAwardAmountRange([10000, null], 0);
                expect(mockedRange).toEqual("$10,000 & Above");
            });

            it('should return "$[Min] - $[Max]" for ranges where the max is 0', () => {
                const mockedRange = formatAwardAmountRange([10000, 20000], 0);
                expect(mockedRange).toEqual("$10,000 - $20,000");
            });
        });

        describe('Show Two Decimal Places', () => {
            it('should return "$0 - $0" for ranges where the min and max are both 0', () => {
                const mockedRange = formatAwardAmountRange([0, 0], 2);
                expect(mockedRange).toEqual("$0.00 - $0.00");
            });

            it('should return "$0 & Above" for ranges where the min and max are both 0', () => {
                const mockedRange = formatAwardAmountRange([0, null], 2);
                expect(mockedRange).toEqual("$0.00 & Above");
            });

            it('should return "Under $0" for ranges where the min and max are both 0', () => {
                const mockedRange = formatAwardAmountRange([null, 0], 2);
                expect(mockedRange).toEqual("Under $0.00");
            });

            it('should return "Under $[Max]" for ranges where the min is 0', () => {
                const mockedRange = formatAwardAmountRange([null, 10000], 2);
                expect(mockedRange).toEqual("Under $10,000.00");
            });

            it('should return "$[Min] & Above" for ranges where the max is 0', () => {
                const mockedRange = formatAwardAmountRange([10000, null], 2);
                expect(mockedRange).toEqual("$10,000.00 & Above");
            });

            it('should return "$[Min] - $[Max]" for ranges where the max is 0', () => {
                const mockedRange = formatAwardAmountRange([10000, 20000], 2);
                expect(mockedRange).toEqual("$10,000.00 - $20,000.00");
            });
        });
    });

    describe('Only Allow Two Decimal Places', () => {
        const normalNumber = 55.67;
        const tooManyLeadingZeros = '00000055.67';
        const tooManyDecimalPlaces = 55.67498464546;
        it('should return and empty string when there is no input', () => {
            const formattedNumber = formatNumber('');
            expect(formattedNumber).toEqual('');
        });

        it('should return the normal number', () => {
            const formattedNumber = formatNumber(normalNumber);
            expect(formattedNumber).toEqual(normalNumber);
        });

        it('should remove the leading zeros number', () => {
            const formattedNumber = formatNumber(tooManyLeadingZeros);
            expect(formattedNumber).toEqual(normalNumber);
        });

        it('should return a number with two decimal places', () => {
            const formattedNumber = formatNumber(tooManyDecimalPlaces);
            expect(formattedNumber).toEqual(normalNumber);
        });
    });
});
