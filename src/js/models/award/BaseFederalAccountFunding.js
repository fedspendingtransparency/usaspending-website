/**
 * BaseFederalAccountFunding.js
 * Created by Kwadwo Opoku-Debrah 03/04/19
 */

import { formatMoney } from 'helpers/moneyFormatter';

const BaseFederalAccount = {
    populateBase(data) {
        this.reportingFiscalYear = data.reporting_fiscal_year || null;
        this.reportingFiscalQuarter = data.reporting_fiscal_quarter || null;
        this.id = data.piid || 0;
        this.awardId = data.award_id || '';
        this.generatedId = data.generated_unique_award_id || '';
        this._mainAccountCode = data.main_account_code || 0;
        this.agency = data.funding_agency_name || '';
        this.fundingAgencyId = data.funding_agency_id || '';
        this.awardingAgencyId = data.awarding_agency_id || '';
        this.awardingAgencyName = data.awarding_agency_name || '';
        this.fedAccount = data.account_title || '';
        this._programActivityCode = data.program_activity_code || '';
        this._programActivityName = data.program_activity_name || '';
        this._agencyId = data.agency_id || '';
        this._objectClassName = data.object_class_name || '';
        this._objectClass = data.object_class || '';
        this._fundingObligated = parseFloat(data.transaction_obligated_amount) || 0;
    },

    populate(data, category) {
        if (category === 'idv') {
            this.populateBase(data);
        }
        else {
            this.populateBase(data);
            /** TODO:
             * IMO we shouldn't have to do this.
             * The API should return consistent key/value pairs federal account code.
             * This was an oversight during API contract disucssions.
             */
            this.federalAccountCode = data.federal_account;
        }
    }
};

Object.defineProperty(BaseFederalAccount, 'fundingObligated', {
    get() {
        return formatMoney(this._fundingObligated);
    }
});
Object.defineProperty(BaseFederalAccount, 'submissionDate', {
    get() {
        if (this.reportingFiscalYear && this.reportingFiscalQuarter) {
            return `FY ${this.reportingFiscalYear} Q${this.reportingFiscalQuarter}`;
        }
        return '--';
    }
});
Object.defineProperty(BaseFederalAccount, 'programActivity', {
    get() {
        if (this._programActivityCode && this._programActivityName) {
            return `${this._programActivityCode} - ${this._programActivityName}`;
        }
        else if (this._program_activityCode || this._programActivityName) {
            return `${this._programActivityCode}${this._programActivityName}`;
        }
        return '--';
    }
});
Object.defineProperty(BaseFederalAccount, 'objectClass', {
    get() {
        if (this._objectClassName && this._objectClass) {
            return `${this._objectClass} - ${this._objectClassName}`;
        }
        else if (this._objectClassName || this._objectClass) {
            return `${this._objectClassName}${this._objectClass}`;
        }
        return '--';
    }
});
Object.defineProperty(BaseFederalAccount, 'accountNumber', {
    get() {
        if (this._agencyId && this._mainAccountCode) {
            return `${this._agencyId}-${this._mainAccountCode}`;
        }
        return '';
    }
});

export default BaseFederalAccount;
