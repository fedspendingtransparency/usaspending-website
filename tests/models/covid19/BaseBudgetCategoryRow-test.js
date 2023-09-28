/**
 * @jest-environment jsdom
 */
import BaseBudgetCategoryRow from "models/v2/covid19/BaseBudgetCategoryRow";

export const mockBaseBudgetCategoryRow = {
    id: 41,
    code: "012",
    description: "Description text of 012, for humans",
    children: [],
    award_count: 2,
    obligation: 50.12,
    outlay: 10.13,
    total_budgetary_resources: 99.99,
    face_value_of_loan: 123.12
};

const types = ['federal_account', 'agency', 'object_class'];
const spendingCategories = ['total_spending', 'award_spending', 'loan_spending'];

describe('BaseBudgetCategoryRow', () => {
    types.forEach((type) => {
        spendingCategories.forEach((spendingCategory) => {
            const baseBudgetCategoryRow = Object.create(BaseBudgetCategoryRow);
            baseBudgetCategoryRow.populate(mockBaseBudgetCategoryRow, type);

            describe(`BaseBudgetCategoryRow-${type}`, () => {
                if (spendingCategory === 'total_spending') {
                    it('should store the raw total obligation', () => {
                        expect(baseBudgetCategoryRow._obligation).toEqual(50.12);
                    });
                    it('should store the raw total outlay', () => {
                        expect(baseBudgetCategoryRow._outlay).toEqual(10.13);
                    });
                    it('should store the formatted gross outlay amount', () => {
                        expect(baseBudgetCategoryRow.obligation).toEqual('$50');
                    });
                    it('should store the formatted obligated amount', () => {
                        expect(baseBudgetCategoryRow.outlay).toEqual('$10');
                    });

                    if (type !== 'object_class' && spendingCategory === 'total_spending') {
                        it('should store the raw total budgetary resources', () => {
                            expect(baseBudgetCategoryRow._totalBudgetaryResources).toEqual(99.99);
                        });
                        it('should store the formatted percent of total obligations', () => {
                            expect(baseBudgetCategoryRow.totalBudgetaryResources).toEqual('$100');
                        });
                    }
                } else if (spendingCategory === 'loan_spending') {
                    it('should store the raw face value of loan', () => {
                        expect(baseBudgetCategoryRow._faceValueOfLoan).toEqual(123.12);
                    });
                    it('should store the raw award count of loan', () => {
                        expect(baseBudgetCategoryRow._awardCount).toEqual(2);
                    });
                    it('should store the face value of loan', () => {
                        expect(baseBudgetCategoryRow.faceValueOfLoan).toEqual("$123");
                    });
                    it('should store the raw award count of loan', () => {
                        expect(baseBudgetCategoryRow.awardCount).toEqual("2");
                    });
                } else {
                    it('should store the raw award obligation', () => {
                        expect(baseBudgetCategoryRow._obligation).toEqual(50.12);
                    });
                    it('should store the raw award outlay', () => {
                        expect(baseBudgetCategoryRow._outlay).toEqual(10.13);
                    });
                    it('should store the formatted percent of total obligations', () => {
                        expect(baseBudgetCategoryRow.obligation).toEqual('$50');
                    });
                    it('should store the formatted percent of total obligations', () => {
                        expect(baseBudgetCategoryRow.outlay).toEqual('$10');
                    });
                }
                describe('name field', () => {
                    if (type === 'federal_account') {
                        it('should store the name as a combination of code and description for Federal Accounts', () => {
                            expect(baseBudgetCategoryRow.name).toEqual('012: Description text of 012, for humans');
                        });
                    }
                    else if (type === 'object_class') {
                        it('should store the name as a combination of code and description for Major Object Classes', () => {
                            expect(baseBudgetCategoryRow.name).toEqual('012: Description text of 012, for humans');
                        });
                    }
                    else if (type === 'agency') {
                        it('should store the name as just the description for agencies', () => {
                            expect(baseBudgetCategoryRow.name).toEqual('Description text of 012, for humans');
                        });
                    }
                });
            });
        });
    });
    describe('child rows', () => {
        types.forEach((type) => {
            const childBudgetCategoryRow = Object.create(BaseBudgetCategoryRow);
            childBudgetCategoryRow.populate(mockBaseBudgetCategoryRow, type, true);

            describe(`BaseBudgetCategoryRow-${type}`, () => {
                describe('name field', () => {
                    if (type === 'federal_account') {
                        it('should store the name as just the code Treasury Accounts', () => {
                            expect(childBudgetCategoryRow.name).toEqual('012');
                        });
                    }
                    else if (type === 'object_class') {
                        it('should store the name as a combination of code and description for Object Classes', () => {
                            expect(childBudgetCategoryRow.name).toEqual('012: Description text of 012, for humans');
                        });
                    }
                });
            });
        });
    });
    describe('missing name field data', () => {
        it('should just show the description with no colon if code is missing', () => {
            const missingCode = {
                ...mockBaseBudgetCategoryRow,
                code: null
            };
            const missingCodeRow = Object.create(BaseBudgetCategoryRow);
            missingCodeRow.populate(missingCode, 'federal_account');

            expect(missingCodeRow.name).toEqual('Description text of 012, for humans');
        });
        it('should just show the code with no colon if description is missing', () => {
            const missingDescription = {
                ...mockBaseBudgetCategoryRow,
                description: null
            };
            const missingDescriptionRow = Object.create(BaseBudgetCategoryRow);
            missingDescriptionRow.populate(missingDescription, 'object_class');

            expect(missingDescriptionRow.name).toEqual('012');
        });
        it('should show -- if both description and code are missing', () => {
            const missingData = {
                ...mockBaseBudgetCategoryRow,
                code: null,
                description: null
            };
            const missingDataRow = Object.create(BaseBudgetCategoryRow);
            missingDataRow.populate(missingData, 'object_class');

            expect(missingDataRow.name).toEqual('--');
        });
    });
});
