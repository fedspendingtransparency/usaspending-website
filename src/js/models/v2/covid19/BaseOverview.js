/**
 * BaseOverview.js
 * Created by Jonathan Hill 06/18/20
 */

import { formatMoney } from 'helpers/moneyFormatter';

const BaseOverview = {
    populate(data) {
        data.funding.forEach((code) => {
            this[`_defCode_${code.def_code}_funding`] = code.amount;
        });
        this._totalBudgetAuthority = data.total_budget_authority || null;
        this._totalBudgetAuthorityForBar = this._totalBudgetAuthority + (data.additional ? data.additional.total_budget_authority : 0);
        this._awardObligations = data.spending.award_obligations || null;
        this._awardOutlays = data.spending.award_outlays || null;
        this._totalObligations = data.spending.total_obligations || null;
        this._totalObligationsForBar = this._totalObligations + (data.additional ? data.additional.spending.total_obligations : 0);
        this._totalOutlays = data.spending.total_outlays || null;
        this._totalOutlaysForBar = this._totalOutlays + (data.additional ? data.additional.spending.total_outlays : 0);
        this._otherObligations = data.spending.total_obligations - data.spending.award_obligations;
        this._awardObligationsNotOutlayed = data.spending.award_obligations - data.spending.award_outlays;
        this._remainingBalance = data.total_budget_authority - data.spending.total_obligations;
        this._nonAwardOutLays = data.spending.total_outlays - data.spending.award_outlays;
        // other obligations - non award outlays
        this._nonAwardNotOutlayed = (data.spending.total_obligations - data.spending.award_obligations) - (data.spending.total_outlays - data.spending.award_outlays);
    },
    get totalBudgetAuthority() {
        return this._totalBudgetAuthority ? formatMoney(this._totalBudgetAuthority) : null;
    },
    get awardObligations() {
        return this._awardObligations ? formatMoney(this._awardObligations) : null;
    },
    get awardOutlays() {
        return this._awardOutlays ? formatMoney(this._awardOutlays) : null;
    },
    get totalObligations() {
        return this._totalObligations ? formatMoney(this._totalObligations) : null;
    },
    get totalOutlays() {
        return this._totalOutlays ? formatMoney(this._totalOutlays) : null;
    },
    get otherObligations() {
        return this._otherObligations ? formatMoney(this._otherObligations) : null;
    },
    get awardObligationsNotOutlayed() {
        return this._awardObligationsNotOutlayed ? formatMoney(this._awardObligationsNotOutlayed) : null;
    },
    get remainingBalance() {
        return this._remainingBalance ? formatMoney(this._remainingBalance) : null;
    },
    get nonAwardOutLays() {
        return this._nonAwardOutLays ? formatMoney(this._nonAwardOutLays) : null;
    },
    get nonAwardNotOutlayed() {
        return this._nonAwardNotOutlayed ? formatMoney(this._nonAwardNotOutlayed) : null;
    }
};

export default BaseOverview;
