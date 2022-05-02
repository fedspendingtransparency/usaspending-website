/**
 * BaseFederalAccountLandingRow.js
 * Created by Lizzie Salita on 2/8/18
 */

import { formatMoney } from 'helpers/moneyFormatter';

/* eslint-disable object-shorthand */
const BaseFederalAccountLandingRow = {
    parse: function (data) {
        this.accountId = data.account_id || '';
        this.accountNumber = data.account_number || '';
        this._managingAgency = data.managing_agency || '';
        this._managingAgencyAcronym = data.managing_agency_acronym || '';
        this.accountName = data.account_name || '';
        this._budgetaryResources = data.budgetary_resources;
    },
    get managingAgency() {
        if (!this._managingAgencyAcronym) {
            return this._managingAgency;
        }
        return `${this._managingAgency} (${this._managingAgencyAcronym})`;
    },
    get budgetaryResources() {
        return this._budgetaryResources == null ? '--' : formatMoney(this._budgetaryResources);
    }
};
/* eslint-enable object-shorthand */

export default BaseFederalAccountLandingRow;
