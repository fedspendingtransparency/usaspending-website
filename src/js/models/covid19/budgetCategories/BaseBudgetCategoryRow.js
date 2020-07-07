/**
 * BaseBudgetCategoryRow.js
 * Created by James Lee 6/05/20
 */

import { formatMoney, formatNumber } from 'helpers/moneyFormatter';

const BaseBudgetCategoryRow = {
    populate(data) {
        this.name = `${data.code} — ${data.description}` || '';
        this._obligation = data.obligation || 0;
        this._outlay = data.outlay || 0;
        this._totalBudgetaryResources = data.total_budgetary_resources || 0;
        this._faceValueOfLoan = data.face_value_of_loan || 0;
        this._count = data.count || 0;
    },
    get obligation() {
        return formatMoney(this._obligation);
    },
    get outlay() {
        return formatMoney(this._outlay);
    },
    get totalBudgetaryResources() {
        return formatMoney(this._totalBudgetaryResources);
    },
    get faceValueOfLoan() {
        return formatMoney(this._faceValueOfLoan);
    },
    get count() {
        return formatNumber(this._count);
    }
};

export default BaseBudgetCategoryRow;
