/**
 * awardAmountHelper-test.js
 * Created by michaelbray on 3/9/17.
 */

import {
    formatAwardAmountRange,
    determineSpendingScenario,
    generatePercentage,
    getAscendingSpendingCategoriesByAwardType
} from 'helpers/awardAmountHelper';

const grantAwardAmounts = {
    _totalObligation: 0,
    _nonFederalFunding: 10,
    _baseAndAllOptions: 100
};
const loanAwardAmounts = {
    _subsidy: 0,
    _faceValue: 10
};
const contractAwardAmounts = {
    _totalObligation: 0,
    _baseExercisedOptions: 10,
    _baseAndAllOptions: 100
};
const idvAwardAmounts = contractAwardAmounts;

describe('Award Amounts Advanced Search Filter Helper', () => {
    describe('Format Labels', () => {
        describe('No Decimal Places', () => {
            it('should return "$0 - $0" for ranges where the min and max are both 0', () => {
                const mockedRange = formatAwardAmountRange([0, 0], 0);
                expect(mockedRange).toEqual("$0 - $0");
            });

            it('should return "$0 & Above" for ranges where the min is zero and max is null', () => {
                const mockedRange = formatAwardAmountRange([0, null], 0);
                expect(mockedRange).toEqual("$0 & Above");
            });

            it('should return "Under $0" for ranges where the min is null and max is zero', () => {
                const mockedRange = formatAwardAmountRange([null, 0], 0);
                expect(mockedRange).toEqual("Under $0");
            });

            it('should return "Under $[Max]" for ranges where the min is null', () => {
                const mockedRange = formatAwardAmountRange([null, 10000], 0);
                expect(mockedRange).toEqual("Under $10,000");
            });

            it('should return "$[Min] & Above" for ranges where the max is null', () => {
                const mockedRange = formatAwardAmountRange([10000, null], 0);
                expect(mockedRange).toEqual("$10,000 & Above");
            });

            it('should return "$[Min] - $[Max]" for a range with min and max', () => {
                const mockedRange = formatAwardAmountRange([10000, 20000], 0);
                expect(mockedRange).toEqual("$10,000 - $20,000");
            });
        });

        describe('Show Two Decimal Places', () => {
            it('should return "$0 - $0" for ranges where the min and max are both 0', () => {
                const mockedRange = formatAwardAmountRange([0, 0], 2);
                expect(mockedRange).toEqual("$0.00 - $0.00");
            });

            it('should return "$0 & Above" for ranges where the min is 0 and max is null', () => {
                const mockedRange = formatAwardAmountRange([0, null], 2);
                expect(mockedRange).toEqual("$0.00 & Above");
            });

            it('should return "Under $0" for ranges where the min is null and max is zero', () => {
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

            it('should return "$[Min] - $[Max]" for a range with a min and max', () => {
                const mockedRange = formatAwardAmountRange([10000, 20000], 2);
                expect(mockedRange).toEqual("$10,000.00 - $20,000.00");
            });
        });
    });
});

describe('Award Summary Page, Award Amount Section helper functions', () => {
    describe('determineSpendingScenario', () => {
        it('should return "normal" when small amount is less than bigger current and biggest', () => {
            const _totalObligation = 50;
            const _baseExercisedOptions = 75;
            const _baseAndAllOptions = 100;

            const mockedScenario = determineSpendingScenario(_totalObligation, _baseExercisedOptions, _baseAndAllOptions);
            expect(mockedScenario).toEqual("normal");
        });

        it('should return "exceedsBigger" when small exceeds bigger', () => {
            const _totalObligation = 75;
            const _baseExercisedOptions = 50;
            const _baseAndAllOptions = 100;

            const mockedScenario = determineSpendingScenario(_totalObligation, _baseExercisedOptions, _baseAndAllOptions);
            expect(mockedScenario).toEqual("exceedsBigger");
        });

        it('should return "exceedsBiggest" for when small exceeds biggest', () => {
            const _totalObligation = 100;
            const _baseExercisedOptions = 50;
            const _baseAndAllOptions = 75;

            const mockedScenario = determineSpendingScenario(_totalObligation, _baseExercisedOptions, _baseAndAllOptions);
            expect(mockedScenario).toEqual("exceedsBiggest");
        });

        it('should return "insufficientData" when negative "small" is negative', () => {
            const _totalObligation = -55;
            const _baseExercisedOptions = 75;
            const _baseAndAllOptions = 100;

            const mockedScenario = determineSpendingScenario(_totalObligation, _baseExercisedOptions, _baseAndAllOptions);
            expect(mockedScenario).toEqual("insufficientData");
        });

        it('should return null when all values are zero', () => {
            const _totalObligation = 0;
            const _baseExercisedOptions = 0;
            const _baseAndAllOptions = 0;

            const mockedScenario = determineSpendingScenario(_totalObligation, _baseExercisedOptions, _baseAndAllOptions);
            expect(mockedScenario).toEqual(null);
        });

        it('should return "insufficientData" when bigger amount exceeds biggest amount', () => {
            const _totalObligation = 50;
            const _baseExercisedOptions = 100;
            const _baseAndAllOptions = 75;

            const mockedScenario = determineSpendingScenario(_totalObligation, _baseExercisedOptions, _baseAndAllOptions);
            expect(mockedScenario).toEqual("insufficientData");
        });
    });
    describe('generatePercentage', () => {
        it('should format the given value as a percentage, rounded to 2 decimal places', () => {
            expect(generatePercentage(0.23456)).toEqual('23.46%');
        });
    });

    describe('getAscendingSpendingCategoriesByAwardType', () => {
        it('grant -- returns the right spending category values in what in normal circumstances would be ascending order', () => {
            const spendingCategoriesInAscendingOrder = getAscendingSpendingCategoriesByAwardType("grant", grantAwardAmounts);
            expect(spendingCategoriesInAscendingOrder).toEqual([0, 10, 100]);
        });
        it('loan -- returns the right spending category values in what in normal circumstances would be ascending order', () => {
            const spendingCategoriesInAscendingOrder = getAscendingSpendingCategoriesByAwardType("loan", loanAwardAmounts);
            expect(spendingCategoriesInAscendingOrder).toEqual([0, 10]);
        });
        it('contract -- returns the right spending category values in what in normal circumstances would be ascending order', () => {
            const spendingCategoriesInAscendingOrder = getAscendingSpendingCategoriesByAwardType("contract", contractAwardAmounts);
            expect(spendingCategoriesInAscendingOrder).toEqual([0, 10, 100]);
        });
        it('idv -- returns the right spending category values in what in normal circumstances would be ascending order', () => {
            const spendingCategoriesInAscendingOrder = getAscendingSpendingCategoriesByAwardType("idv", idvAwardAmounts);
            expect(spendingCategoriesInAscendingOrder).toEqual([0, 10, 100]);
        });
        it('Award Type: direct payment or other -- returns empty array', () => {
            let spendingCategoriesInAscendingOrder = getAscendingSpendingCategoriesByAwardType("direct payments", {});
            expect(spendingCategoriesInAscendingOrder).toEqual([]);
            spendingCategoriesInAscendingOrder = getAscendingSpendingCategoriesByAwardType("other", {});
            expect(spendingCategoriesInAscendingOrder).toEqual([]);
        });
    });
});

