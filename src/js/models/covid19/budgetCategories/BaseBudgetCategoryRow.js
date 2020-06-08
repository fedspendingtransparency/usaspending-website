/**
 * BaseBudgetCategoryRow.js
 * Created by James Lee 6/05/20
 */

import { formatMoney } from 'helpers/moneyFormatter';
import { budgetDropdownColumns, budgetFields } from 'dataMapping/covid19/budgetCategories/BudgetCategoriesTableColumns';

const BaseBudgetCategoryRow = {
    populateOnSpendingCategory(data, spendingCategory) {
        [...budgetDropdownColumns[spendingCategory]].forEach((column) => {
            this[`_${column.title}`] = data[budgetFields[column.title]];
        });
    },

    populateDefCodes(data, spendingCategory) {
        this.name = data.emergency_funding_mandate || '';
        this.defCode = data.def_code || '';
        this.emergencyFundingMandate = data.emergency_funding_mandate || '';
        this.populateOnSpendingCategory(data, spendingCategory);
    },

    populate(data, type, spendingCateogry) {
        if (type === 'def_codes') {
            this.populateDefCodes(data, spendingCateogry);
        } else if (type === 'agencies') {
            this.populateAgencies(data, spendingCateogry);
        } else if (type === 'program_activity') {
            this.populateProgramActivity(data, spendingCateogry);
        } else if (type === 'object_class') {
            this.populateObjectClass(data, spendingCateogry);
        } else {
            this.populateFederalAccounts(data, spendingCateogry);
        }
    },
    get totalObligatedAmount() {
        return formatMoney(this._totalObligatedAmount);
    },
    get totalOutlayedAmount() {
        return formatMoney(this._totalOutlayedAmount);
    },
    get awardTotalObligatedAmount() {
        return formatMoney(this._awardTotalObligatedAmount);
    },
    get awardTotalOutlayedAmount() {
        return formatMoney(this._awardTotalOutlayedAmount);
    },
    get faceValueOfLoans() {
        return formatMoney(this._faceValueOfLoans);
    }
};

export default BaseBudgetCategoryRow;
