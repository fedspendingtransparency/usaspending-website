/**
 * awardAmountHelper-test.js
 * Created by michaelbray on 3/9/17.
 */

import * as AwardAmountHelper from 'helpers/awardAmountHelper';

describe('Award Amount helper functions', () => {
    describe('formatAwardAmountRange', () => {
        it('should return "$0 & Above" for ranges where the min and max are both 0', () => {
            const mockedRange = AwardAmountHelper.formatAwardAmountRange([0, 0]);
            expect(mockedRange).toEqual("$0 & Above");
        });

        it('should return "Under $[Max]" for ranges where the min is 0', () => {
            const mockedRange = AwardAmountHelper.formatAwardAmountRange([0, 10000]);
            expect(mockedRange).toEqual("Under $10k");
        });

        it('should return "$[Min] & Above" for ranges where the max is 0', () => {
            const mockedRange = AwardAmountHelper.formatAwardAmountRange([10000, 0]);
            expect(mockedRange).toEqual("$10k & Above");
        });

        it('should return "$[Min] - $[Max]" for ranges where the max is 0', () => {
            const mockedRange = AwardAmountHelper.formatAwardAmountRange([10000, 20000]);
            expect(mockedRange).toEqual("$10k - $20k");
        });
    });

    describe('formatAwardAmountItemLabel', () => {
        it('should return "$0 - $0" for ranges where the min and max are both 0', () => {
            const mockedRange = AwardAmountHelper.formatAwardAmountItemLabel([0, 0]);
            expect(mockedRange).toEqual("$0 - $0");
        });

        it('should return "$0 & Above" for ranges where the min and max are both 0', () => {
            const mockedRange = AwardAmountHelper.formatAwardAmountItemLabel([0, null]);
            expect(mockedRange).toEqual("$0 & Above");
        });

        it('should return "Under $0" for ranges where the min and max are both 0', () => {
            const mockedRange = AwardAmountHelper.formatAwardAmountItemLabel([null, 0]);
            expect(mockedRange).toEqual("Under $0");
        });

        it('should return "Under $[Max]" for ranges where the min is 0', () => {
            const mockedRange = AwardAmountHelper.formatAwardAmountItemLabel([null, 10000]);
            expect(mockedRange).toEqual("Under $10000");
        });

        it('should return "$[Min] & Above" for ranges where the max is 0', () => {
            const mockedRange = AwardAmountHelper.formatAwardAmountItemLabel([10000, null]);
            expect(mockedRange).toEqual("$10000 & Above");
        });

        it('should return "$[Min] - $[Max]" for ranges where the max is 0', () => {
            const mockedRange = AwardAmountHelper.formatAwardAmountItemLabel([10000, 20000]);
            expect(mockedRange).toEqual("$10000 - $20000");
        });
    });

    describe('ensureInputIsNumeric', () => {
        it('return a number when the input is numeric', () => {
            const response = AwardAmountHelper.ensureInputIsNumeric(100);
            expect(response).toEqual(100);
        });

        it('return 0 when the input is not numeric', () => {
            const response = AwardAmountHelper.ensureInputIsNumeric('a');
            expect(response).toEqual(0);
        });
    });
});
