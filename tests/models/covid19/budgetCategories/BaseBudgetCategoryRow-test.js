import BaseBudgetCategoryRow from "../../../../src/js/models/covid19/budgetCategories/BaseBudgetCategoryRow";

export const mockBaseBudgetCategoryRow = {
    id: 41,
    code: "012",
    description: "Description text of 012, for humans",
    children: [],
    count: 2,
    award_obligation: 50.12,
    award_outlay: 10.13,
    total_budgetary_resources: 99.99
};

const types = ['federal_accounts', 'def_codes', 'agencies', 'object_classes'];
const spendingCategories = ['total_spending', 'award_spending'];


describe('BaseBudgetCategoryRow', () => {
    types.forEach((type) => {
        spendingCategories.forEach((spendingCategory) => {
            const baseBudgetCategoryRow = Object.create(BaseBudgetCategoryRow);
            baseBudgetCategoryRow.populate(mockBaseBudgetCategoryRow, type, spendingCategory);

            describe(`BaseBudgetCategoryRow-${type}`, () => {
                if (spendingCategory === 'total_spending') {
                    it('should store the raw total obligation', () => {
                        expect(baseBudgetCategoryRow._totalObligation).toEqual(0);
                    });
                    it('should store the raw total outlay', () => {
                        expect(baseBudgetCategoryRow._totalOutlay).toEqual(0);
                    });
                    it('should store the formatted gross outlay amount', () => {
                        expect(baseBudgetCategoryRow.totalObligation).toEqual('$0');
                    });
                    it('should store the formatted obligated amount', () => {
                        expect(baseBudgetCategoryRow.totalOutlay).toEqual('$0');
                    });

                    if (type !== 'object_classes') {
                        it('should store the raw total budgetary resources', () => {
                            expect(baseBudgetCategoryRow._totalBudgetaryResources).toEqual(99.99);
                        });
                        it('should store the formatted percent of total obligations', () => {
                            expect(baseBudgetCategoryRow.totalBudgetaryResources).toEqual('$100');
                        });
                    }
                } else {
                    it('should store the raw award obligation', () => {
                        expect(baseBudgetCategoryRow._awardObligation).toEqual(50.12);
                    });
                    it('should store the raw award obligation', () => {
                        expect(baseBudgetCategoryRow._awardOutlay).toEqual(10.13);
                    });
                    it('should store the formatted percent of total obligations', () => {
                        expect(baseBudgetCategoryRow.awardObligation).toEqual('$50');
                    });
                    it('should store the formatted percent of total obligations', () => {
                        expect(baseBudgetCategoryRow.awardOutlay).toEqual('$10');
                    });
                }

                if (type === 'def_codes') {
                    it('should store the defCode', () => {
                        expect(baseBudgetCategoryRow.defCode).toEqual('012');
                    });
                    it('should store the description', () => {
                        expect(baseBudgetCategoryRow.emergencyFundingMandate).toEqual('Description text of 012, for humans');
                    });
                } else {
                    it('should store the name as a combination of code and description', () => {
                        expect(baseBudgetCategoryRow.name).toEqual('012 — Description text of 012, for humans');
                    });
                }
            });
        });
    });
});
