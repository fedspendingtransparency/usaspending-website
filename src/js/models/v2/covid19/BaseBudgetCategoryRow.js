/**
 * BaseBudgetCategoryRow.js
 * Created by James Lee 6/05/20
 */

import { formatMoney } from 'helpers/moneyFormatter';
import CoreSpendingTableRow from './CoreSpendingTableRow';

const BaseBudgetCategoryRow = Object.create(CoreSpendingTableRow);

BaseBudgetCategoryRow.populate = function populate(data) {
    // Generate generic object properties using the core model
    this.populateCore(data);
    // Add properties specific to Budget Categories
    this._totalBudgetaryResources = data.total_budgetary_resources || 0;
    this.totalBudgetaryResources = formatMoney(this._totalBudgetaryResources);
    if (this._code && this.description) {
        this.name = `${this._code} - ${this.description}`;
    }
    else {
        this.name = `${this._code}${this.description}` || '--';
    }
};

export default BaseBudgetCategoryRow;
