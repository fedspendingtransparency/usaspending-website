/**
 * BaseBudgetCategoryRow.js
 * Created by James Lee 6/05/20
 */

import { formatMoney } from 'helpers/moneyFormatter';
import CoreSpendingTableRow from './CoreSpendingTableRow';

const BaseBudgetCategoryRow = Object.create(CoreSpendingTableRow);

BaseBudgetCategoryRow.populate = function populate(data, rowType, isChild = false) {
    // Generate generic object properties using the core model
    this.populateCore(data);
    // Add properties specific to Budget Categories
    this._totalBudgetaryResources = isNaN(data.total_budgetary_resources) ? '--' : data.total_budgetary_resources || 0;
    this.totalBudgetaryResources = this._totalBudgetaryResources === '--' ? '--' : formatMoney(this._totalBudgetaryResources);

    let name = this.description || this.name;

    if (rowType === 'object_class' || rowType === 'federal_account') {
        if (isChild && rowType === 'federal_account') {
            // just display the code for Treasury Accounts
            name = this.code || '--';
        }
        else if (this.code && this.description) {
            name = `${this.code}: ${this.description}`;
        }
        else {
            name = `${this.code}${this.description}` || '--';
        }
    }

    this.name = name;
};

export default BaseBudgetCategoryRow;
