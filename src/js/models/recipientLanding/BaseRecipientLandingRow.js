/**
 * BaseRecipientLandingRow.js
 * Created by David Trinh on 7/3/18
 */

import { formatMoney } from 'helpers/moneyFormatter';

/* eslint-disable object-shorthand */
const BaseRecipientLandingRow = {
    parse: function (data) {
        this.accountId = data.account_id || '';
        this.accountNumber = data.account_number || '';
        this._managingAgency = data.managing_agency || '';
        this._managingAgencyAcronym = data.managing_agency_acronym || '';
        this.accountName = data.account_name || '';
        this._budgetaryResources = data.budgetary_resources || 0;
    },
    get managingAgency() {
        if (!this._managingAgencyAcronym) {
            return this._managingAgency;
        }
        return `${this._managingAgency} (${this._managingAgencyAcronym})`;
    },
    get budgetaryResources() {
        return formatMoney(this._budgetaryResources);
    }
};
/* eslint-enable object-shorthand */

export default BaseRecipientLandingRow;
