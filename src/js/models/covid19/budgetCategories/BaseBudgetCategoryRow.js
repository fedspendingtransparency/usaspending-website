/**
 * BaseBudgetCategoryRow.js
 * Created by James Lee 6/05/20
 */

import { formatMoney } from 'helpers/moneyFormatter';
import { budgetColumns, budgetColumnFields, budgetDropdownColumns, budgetFields } from 'dataMapping/covid19/budgetCategories/BudgetCategoriesTableColumns';

const BaseBudgetCategoryRow = {
    populateOnSpendingCategory(data, spendingCategory) {
        [...budgetDropdownColumns[spendingCategory]].forEach((column) => {
            this[`_${column.title}`] = data[budgetFields[spendingCategory][column.title]];
        });
    },
    populateBase(data, type) {
        [...budgetColumns[type]].forEach((column) => {
            if (type === 'def_codes') {
                if (budgetColumnFields[column.title]) {
                    this[`${column.title}`] = data[budgetColumnFields[column.title]];
                }
            } else if (column.title === 'name') {
                this[`${column.title}`] = `${data.code} - ${data.description}`;
            } else {
                this[`${column.title}`] = data[column.title];
            }
        });
    },
    populate(data, type, spendingCategory) {
        this.populateBase(data, type);
        this.populateOnSpendingCategory(data, spendingCategory);
    },
    get totalObligation() {
        return formatMoney(this._totalObligation);
    },
    get totalOutlay() {
        return formatMoney(this._totalOutlay);
    },
    get awardObligation() {
        return formatMoney(this._awardObligation);
    },
    get awardOutlay() {
        return formatMoney(this._awardOutlay);
    }
    // get faceValueOfLoans() {
    //     return formatMoney(this._faceValueOfLoans);
    // }
};

export default BaseBudgetCategoryRow;
