/**
 * BaseAwardSpendingByAgencyRow.js
 * Created by James Lee 6/25/20
 */

import { formatMoney, formatNumber } from 'helpers/moneyFormatter';
import { budgetColumns, budgetColumnFields } from 'dataMapping/covid19/budgetCategories/BudgetCategoriesTableColumns';

const BaseAwardSpendingByAgencyRow = {
    populateBase(data, type, spendingCategory) {
        // let defaultValue = null;
        // budgetColumns[type].forEach((column) => {
        //     if (type === 'def_code') {
        //         if (budgetColumnFields[column.title]) {
        //             defaultValue = typeof (data[budgetColumnFields[column.title]]) === 'string' ? '' : 0;
        //             this[`${column.title}`] = data[budgetColumnFields[column.title]] || defaultValue;
        //         }
        //     } else if (column.title === 'name') {
        //         this[`${column.title}`] = `${data.code} — ${data.description}` || '';
        //     } else {
        //         defaultValue = typeof (data[column.title]) === 'string' ? '' : 0;
        //         this[`${column.title}`] = data[column.title] || defaultValue;
        //     }
        // });
        // if (type !== 'object_class' && spendingCategory === 'total_spending') {
        //     this._totalBudgetaryResources = data.total_budgetary_resources || 0;
        // }
    },
    populate(data, type, spendingCategory) {
        this.populateBase(data, type, spendingCategory);
    }
    // get totalObligation() {
    //     return formatMoney(this._totalObligation);
    // },
    // get totalOutlay() {
    //     return formatMoney(this._totalOutlay);
    // },
    // get awardObligation() {
    //     return formatMoney(this._awardObligation);
    // },
    // get awardOutlay() {
    //     return formatMoney(this._awardOutlay);
    // },
    // get totalBudgetaryResources() {
    //     return formatMoney(this._totalBudgetaryResources);
    // },
    // get faceValueOfLoan() {
    //     return formatMoney(this._faceValueOfLoan);
    // },
    // get countOfLoan() {
    //     return formatNumber(this._countOfLoan);
    // }
};

export default BaseAwardSpendingByAgencyRow;
