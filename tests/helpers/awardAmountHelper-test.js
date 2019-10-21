/**
 * awardAmountHelper-test.js
 * Created by michaelbray on 3/9/17.
 */

import {
    formatAwardAmountRange,
    determineSpendingScenario,
    generatePercentage,
    getAscendingSpendingCategoriesByAwardType,
    determineSpendingScenarioAsstAwards,
    determineSpendingScenarioByAwardType
} from 'helpers/awardAmountHelper';

const grantAwardAmounts = {
    _totalObligation: 0,
    _nonFederalFunding: 10,
    _totalFunding: 100
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
    describe('generatePercentage', () => {
        it('should format the given value as a percentage, rounded to 2 decimal places', () => {
            expect(generatePercentage(0.23456)).toEqual('23.46%');
        });
    });

    describe('getAscendingSpendingCategoriesByAwardType', () => {
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

    describe('determineSpendingScenario', () => {
        it.each([
            ['normal', 50, 75, 100],
            ['exceedsBigger', 76, 75, 100],
            ['exceedsBiggest', 101, 75, 100],
            ['insufficientData', -5, 75, 100],
            [null, 0, 0, 0],
            ['insufficientData', 50, 101, 100]
        ])(
            ('Scenario should be %s when small is %s, bigger is %s, and biggest is %s'),
            (result, small, bigger, biggest) => {
                const scenario = determineSpendingScenario(small, bigger, biggest);
                expect(scenario).toEqual(result);
            }
        );
    });

    describe('determineSpendingScenarioByAwardType', () => {
        it.each([
            ['idv', { _totalObligation: 1, _baseExercisedOptions: 75, _baseAndAllOptions: 100 }],
            ['contract', { _totalObligation: 1, _baseExercisedOptions: 75, _baseAndAllOptions: 100 }],
            ['loan', { _subsidy: 1, _faceValue: 75 }]
        ])(
            ('Scenario is parsed for %s award type'),
            (awardType, awardObj) => {
                const result = determineSpendingScenarioByAwardType(awardType, awardObj);
                expect(result).toEqual('normal');
            }
        );
    });

    describe('determineSpendingScenarioAsstAwards', () => {
        it('should return insufficientData with any negative values', () => {
            const totalObligationNegative = determineSpendingScenarioAsstAwards({ ...grantAwardAmounts, _totalObligation: -1 });
            const totalFundingNegative = determineSpendingScenarioAsstAwards({ ...grantAwardAmounts, _totalFunding: -1 });
            const nonFederalFundingNegative = determineSpendingScenarioAsstAwards({ ...grantAwardAmounts, _nonFederalFunding: -1 });
            expect(totalObligationNegative).toEqual('insufficientData');
            expect(totalFundingNegative).toEqual('insufficientData');
            expect(nonFederalFundingNegative).toEqual('insufficientData');
        });
        it('should return insufficientData when totalFunding is not the sum of nonFederalFunding and totalObligation', () => {
            const mockedScenario = determineSpendingScenarioAsstAwards(grantAwardAmounts);
            expect(mockedScenario).toEqual('insufficientData');
        });
        it('should return normal when totalFunding is the sum of nonFederalFunding and totalObligated', () => {
            const mockedScenario = determineSpendingScenarioAsstAwards({ ...grantAwardAmounts, _totalFunding: 10 });
            expect(mockedScenario).toEqual('normal');
        });
        it('should return normal when totalObligation is less than totalFunding and nonFederalFunding is zero', () => {
            const mockedScenario = determineSpendingScenarioAsstAwards({ ...grantAwardAmounts, _totalObligation: 10, _nonFederalFunding: 0 });
            expect(mockedScenario).toEqual('normal');
        });
    });
});

