/**
 * BaseBudgetCategoryRow.js
 * Created by James Lee 6/05/20
 */

import { formatMoney } from 'helpers/moneyFormatter';
import { budgetColumns, budgetColumnFields, budgetDropdownColumns, budgetFields } from 'dataMapping/covid19/budgetCategories/BudgetCategoriesTableColumns';

const BaseBudgetCategoryRow = {
    populateOnSpendingCategory(data, spendingCategory) {
        [...budgetDropdownColumns[spendingCategory]].forEach((column) => {
            this[`_${column.title}`] = data[budgetFields[column.title]];
            console.log(`_${column.title}`);
        });
    },
    populateBase(data, type) {
        [...budgetColumns[type]].forEach((column) => {
            if (budgetColumnFields[column.title]) {
                this[`${column.title}`] = data[budgetColumnFields[column.title]];
            } else {
                this[`${column.title}`] = data[column.title];
            }
        });
    },
    populate(data, type, spendingCategory) {
        this.populateBase(data, type);
        this.populateOnSpendingCategory(data, spendingCategory);
    },
    get totalObligations() {
        return formatMoney(this._totalObligations);
    },
    get totalOutlays() {
        return formatMoney(this._totalOutlays);
    },
    get awardTotalObligations() {
        return formatMoney(this._awardTotalObligations);
    },
    get awardTotalOutlays() {
        return formatMoney(this._awardTotalOutlays);
    }
    // get faceValueOfLoans() {
    //     return formatMoney(this._faceValueOfLoans);
    // }
};

export default BaseBudgetCategoryRow;
