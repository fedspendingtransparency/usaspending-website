/**
 * @jest-environment jsdom
 * 
 * awardAmountHelper-test.js
 * Created by michaelbray on 3/9/17.
 */

import {
    formatAwardAmountRange,
    generatePercentage,
    getAscendingSpendingCategoriesByAwardType,
    determineSpendingScenarioAsstAwards,
    determineFileCSpendingScenario,
    determineSpendingScenarioByAwardType
} from 'helpers/awardAmountHelper';

const grantAwardAmounts = {
    _totalObligation: 0,
    _nonFederalFunding: 10,
    _totalFunding: 100
};
const loanAwardAmounts = {
    _subsidy: 0,
    _faceValue: 10,
    _totalOutlay: 1000
};
const contractAwardAmounts = {
    _totalObligation: 0,
    _baseExercisedOptions: 10,
    _baseAndAllOptions: 100,
    _totalOutlay: 1000
};
const idvAwardAmounts = contractAwardAmounts;

const fileCAmounts = {
    _fileCObligated: 0,
    _fileCOutlay: 0
};

const buildContract = (amounts) => ({ _totalObligation: amounts[0], _baseExercisedOptions: amounts[1], _baseAndAllOptions: amounts[2], ...fileCAmounts });
const buildLoan = (amounts) => ({ _subsidy: amounts[0], _faceValue: amounts[1], ...fileCAmounts });
const buildAsst = (amounts) => ({ _totalObligation: amounts[0], _nonFederalFunding: amounts[1], _totalFunding: amounts[2], ...fileCAmounts });

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

            it('should return "$0 & Under" for ranges where the min is null and max is zero', () => {
                const mockedRange = formatAwardAmountRange([null, 0], 0);
                expect(mockedRange).toEqual("$0 & Under");
            });

            it('should return "$[Max] & Under" for ranges where the min is null', () => {
                const mockedRange = formatAwardAmountRange([null, 10000], 0);
                expect(mockedRange).toEqual("$10,000 & Under");
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

            it('should return "$0 & Under" for ranges where the min is null and max is zero', () => {
                const mockedRange = formatAwardAmountRange([null, 0], 2);
                expect(mockedRange).toEqual("$0.00 & Under");
            });

            it('should return "$[Max] & Under" for ranges where the min is 0', () => {
                const mockedRange = formatAwardAmountRange([null, 10000], 2);
                expect(mockedRange).toEqual("$10,000.00 & Under");
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
        it('contract -- returns the right spending category values in what in normal circumstances would be ascending order', () => {
            const spendingCategoriesInAscendingOrder = getAscendingSpendingCategoriesByAwardType("contract", contractAwardAmounts);
            expect(spendingCategoriesInAscendingOrder).toEqual([0, 10, 100, 1000]);
        });
        it('idv -- returns the right spending category values in what in normal circumstances would be ascending order', () => {
            const spendingCategoriesInAscendingOrder = getAscendingSpendingCategoriesByAwardType("idv", idvAwardAmounts);
            expect(spendingCategoriesInAscendingOrder).toEqual([0, 10, 100, 1000]);
        });
        it('Award Type: direct payment or other -- returns empty array', () => {
            let spendingCategoriesInAscendingOrder = getAscendingSpendingCategoriesByAwardType("direct payments", {});
            expect(spendingCategoriesInAscendingOrder).toEqual([]);
            spendingCategoriesInAscendingOrder = getAscendingSpendingCategoriesByAwardType("other", {});
            expect(spendingCategoriesInAscendingOrder).toEqual([]);
        });
    });

    describe('determineSpendingScenarioByAwardType: Contracts and IDVs', () => {
        it.each([
            ['normal', 'idv', 1, 75, 100],
            ['normal', 'contract', 1, 75, 100],
            ['exceedsBigger', 'idv', 76, 75, 100],
            ['exceedsBigger', 'contract', 76, 75, 100],
            ['exceedsBiggest', 'idv', 101, 75, 100],
            ['exceedsBiggest', 'contract', 101, 75, 100],
            // no exceedsBiggest bc there's only two spending categories
            ['insufficientData', 'idv', -5, 75, 100],
            ['insufficientData', 'contract', -5, 75, 100],
            ['insufficientData', 'idv', 5, -75, 100],
            ['insufficientData', 'contract', 5, -75, 100],
            ['insufficientData', 'idv', 5, 75, -100],
            ['insufficientData', 'contract', 5, 75, -100],
            ['insufficientData', 'idv', 0, 0, 0],
            ['insufficientData', 'contract', 0, 0, 0],
            ['insufficientData', 'idv', 5, 101, 100],
            ['insufficientData', 'contract', 5, 101, 100]
        ])(
            ('Scenario is considered %s for %s awards when the *normative* ascending category values are %s (obligated), %s (current funding), %s (potential funding)'),
            (result, awardType, firstSpendingCategory, secondSpendingCategory, thirdSpendingCategory) => {
                const awardAmountObj = buildContract([firstSpendingCategory, secondSpendingCategory, thirdSpendingCategory]);
                const scenario = determineSpendingScenarioByAwardType(awardType, awardAmountObj);
                expect(scenario).toEqual(result);
            }
        );
    });

    describe('determineSpendingScenarioByAwardType: Loan Awards', () => {
        it.each([
            ['normal', 'loan', 1, 75],
            ['insufficientData', 'loan', 76, 75],
            ['insufficientData', 'loan', 101, 75],
            ['insufficientData', 'loan', -5, 75],
            ['insufficientData', 'loan', 5, -75],
            ['insufficientData', 'loan', 0, 0],
            ['insufficientData', 'loan', 101, 100]
        ])(
            ('Scenario is considered %s for loan awards when the *normative* ascending category values are %s (subsidy), %s (faceValue)'),
            (result, awardType, firstSpendingCategory, secondSpendingCategory) => {
                const awardAmountObj = buildLoan([firstSpendingCategory, secondSpendingCategory]);
                const scenario = determineSpendingScenarioByAwardType(awardType, awardAmountObj);
                expect(scenario).toEqual(result);
            }
        );
    });

    describe('determineSpendingScenarioByAwardType: Asst awards (other, insurance, direct payments, grant)', () => {
        it.each([
            ['normal', 'grant', 25, 75, 100],
            ['normal', 'grant', 76, 0, 100],
            ['insufficientData', 'grant', 101, 75, 100],
            ['insufficientData', 'grant', -5, 75, 100],
            ['insufficientData', 'grant', 5, -75, 100],
            ['insufficientData', 'grant', 5, 75, -100],
            ['insufficientData', 'grant', 0, 0, 0],
            ['insufficientData', 'grant', 5, 101, 10]
        ])(
            ('Scenario is considered %s for asst awards when the *normative* case is %s (obligation) + %s (non federal funding) = %s (total funding'),
            (result, awardType, firstSpendingCategory, secondSpendingCategory, thirdSpendingCategory) => {
                const awardAmountObj = buildAsst([firstSpendingCategory, secondSpendingCategory, thirdSpendingCategory]);
                const scenario = determineSpendingScenarioByAwardType(awardType, awardAmountObj);
                expect(scenario).toEqual(result);
            }
        );
    });
    describe('determineFileCSpendingScenario', () => {
        it.each([
            ['normal', 51, 50, 99, [1, 2]],
            ['normal', 100, 50, 99, [1, 2]],
            ['insufficientData', 1, 50, 99, [2, 1]],
            ['normal', 1, 50, 99, [0, 0]],
            ['normal', 1, 50, 99, [0, 1]],
            ['normal', 1, 50, 99, [1, 1]],
            ['insufficientData', 1, 50, 99, [-1, 1]]
        ])(
            ('returns %s for contracts when normative ascending values are %s, %s, %s'),
            (expected, asc1, asc2, asc3, fileCData) => {
                const awardAmountObj = { ...buildContract([asc1, asc2, asc3]), _fileCObligated: fileCData[1], _fileCOutlay: fileCData[0] };
                expect(determineFileCSpendingScenario('contract', awardAmountObj)).toEqual(expected);
            }
        );
    });
});

