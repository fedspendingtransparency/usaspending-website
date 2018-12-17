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
        this.totals = {
            available: data.totals.available || false,
            obligated: data.totals.obligated || '',
            unobligated: data.totals.unobligated || '',
            budgetAuthority: data.totals.budgetAuthority || '',
            outlay: data.total.outlay || "Not available",
            balanceBroughtForward: data.totals.balanceBroughtForward || 0,
            otherBudgetaryResources: data.totals.otherBudgetaryResources || 0,
            appropriations: data.totals.appropriations || 0
        };
    },
    get agencyId() {
        return this.agencyId;
    },
    get accountName() {
        return this.accountNumber();
    },
    get accountNumber() {
        return this.accountNumber;
    },
    get accountID() {
        return this.accountId;
    }

};
/* eslint-enable object-shorthand */

export default BaseFederalAccount;
