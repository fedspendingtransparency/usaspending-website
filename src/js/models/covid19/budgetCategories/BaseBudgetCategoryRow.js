/**
 * BaseBudgetCategoryRow.js
 * Created by James Lee 6/05/20
 */

import { formatMoney } from 'helpers/moneyFormatter';
import { budgetColumns, budgetColumnFields, budgetDropdownColumns, budgetFields, totalBudgetaryResources } from 'dataMapping/covid19/budgetCategories/BudgetCategoriesTableColumns';

const BaseBudgetCategoryRow = {
    populateOnSpendingCategory(data, spendingCategory) {
        [...budgetDropdownColumns[spendingCategory]].forEach((column) => {
            const defaultValue = typeof (data[budgetFields[spendingCategory][column.title]]) === 'string' ? '' : 0;
            this[`_${column.title}`] = data[budgetFields[spendingCategory][column.title]] || defaultValue;
        });
    },
    populateBase(data, type) {
        let defaultValue = null;
        [...budgetColumns[type]].forEach((column) => {
            if (type === 'def_codes') {
                if (budgetColumnFields[column.title]) {
                    defaultValue = typeof (data[budgetColumnFields[column.title]]) === 'string' ? '' : 0;
                    this[`${column.title}`] = data[budgetColumnFields[column.title]] || defaultValue;
                }
            } else if (column.title === 'name') {
                this[`${column.title}`] = `${data.code} — ${data.description}` || '';
            } else {
                defaultValue = typeof (data[column.title]) === 'string' ? '' : 0;
                this[`${column.title}`] = data[column.title] || defaultValue;
            }
        });
    },
    populateTotalBudgetaryResources(data, type, spendingCategory) {
        if (type !== 'object_classes' && spendingCategory !== 'award_spending') {
            this._totalBudgetaryResources = data.total_budgetary_resources || 0;
        }
    },
    populate(data, type, spendingCategory) {
        this.populateBase(data, type);
        this.populateOnSpendingCategory(data, spendingCategory);
        this.populateTotalBudgetaryResources(data, type, spendingCategory);
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
    },
    get totalBudgetaryResources() {
        return formatMoney(this._totalBudgetaryResources);
    }
    // get faceValueOfLoans() {
    //     return formatMoney(this._faceValueOfLoans);
    // }
};

export default BaseBudgetCategoryRow;
