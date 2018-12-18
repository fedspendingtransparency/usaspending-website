/**
 * BaseFederalAccount.js
 * Created by Justin Le on 12/6/18.
 */


/* eslint-disable object-shorthand */
const BaseFederalAccount = {
    parse(data) {
        this.agencyId = data.agency_identifier || null;
        this.managingAgencyAcronym = data.managing_agency_acronym || "";
        this.managingAgency = data.managing_agency || "";
        this.accountName = data.account_name || null;
        this.accountNumber = data.accountNumber || null;
        this.budgetaryResources = data.budgetaryResources || null;
        this.accountId = data.id || data.account_id || null;
    },
    get accountName() {
        return this.accountNumber();
    },
    get accountNumber() {
        return this.accountNumber;
    },
    get accountID() {
        return this.accountId;
    },

};
/* eslint-enable object-shorthand */

export default BaseFederalAccount;
