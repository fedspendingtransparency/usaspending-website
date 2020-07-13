import BaseBudgetCategoryRow from "../../../../src/js/models/covid19/budgetCategories/BaseBudgetCategoryRow";

export const mockBaseBudgetCategoryRow = {
    id: 41,
    code: "012",
    description: "Description text of 012, for humans",
    children: [],
    count: 2,
    obligation: 50.12,
    outlay: 10.13,
    total_budgetary_resources: 99.99,
    face_value_of_loan: 123.12
};

const types = ['federal_account', 'def_code', 'agency', 'object_class'];
const spendingCategories = ['total_spending', 'award_spending', 'loan_spending'];


describe('BaseBudgetCategoryRow', () => {
    types.forEach((type) => {
        spendingCategories.forEach((spendingCategory) => {
            const baseBudgetCategoryRow = Object.create(BaseBudgetCategoryRow);
            baseBudgetCategoryRow.populate(mockBaseBudgetCategoryRow);

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
                    it('should store the raw count of loan', () => {
                        expect(baseBudgetCategoryRow._count).toEqual(2);
                    });
                    it('should store the face value of loan', () => {
                        expect(baseBudgetCategoryRow.faceValueOfLoan).toEqual("$123");
                    });
                    it('should store the raw count of loan', () => {
                        expect(baseBudgetCategoryRow.count).toEqual("2");
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

                it('should store the name as a combination of code and description', () => {
                    expect(baseBudgetCategoryRow.name).toEqual('012 — Description text of 012, for humans');
                });
            });
        });
    });
});
